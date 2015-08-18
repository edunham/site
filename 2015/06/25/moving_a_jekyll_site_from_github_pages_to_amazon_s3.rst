Moving a Jekyll site from GitHub Pages to Amazon S3
===================================================

The rust-lang.org web site used to be hosted on GitHub Pages. This gave it
excellent uptime and made deploying changes easy, but did not support HTTPS. 

.. more::

The Options
-----------

I identified 3 major options for how we could alleviate users' anger at not
seeing the little lock icon in their URL bars: 

* Route all requests to the site through our nginx proxy, which has SSL set up

  * This is problematic because it introduces a new single point of failure in
    the system, if the proxy host goes down.

* Stick a CDN, CloudFlare, between the GitHub page and the world. 

  * This will encrypt communications between the CDN and the user, but not
    between CloudFlare and GitHub. This means the lock icon in the URL bar is
    present, but actively lying to the user about the security of the page.

* Move the site to Amazon S3 and have CloudFront distribute content securely
  to users. 

  * This is similar to the GitHub/CloudFlare model, with the important
    difference that there's negligible opportunity to MITM between S3 and
    CloudFront
  * The inconvenience is that I have to rebuild the functionality of GitHub
    pages where pushing to the repo automatically rebuilds the site. 

Since I want to improve security without harming performance, the third option
is distinctly preferable.

New Workflow
------------

The only change visible to site authors will be that content is added to the
``master`` branch rather than to ``gh-pages``. 

Under the hood, there are several pieces to this transition:

* Make Travis rebuild the site on every commit to ``master``, and upload the
  successfully built site to S3
* Send out a CloudFront invalidation when the site is rebuilt, to guarantee
  that users see the newest version of pages
* Update the docs to explain the new workflow, and do some housekeeping like
  adding a custom error page instead of the GitHub pages 404. 

Make Travis build site and upload to S3
---------------------------------------

In S3, create a bucket with a descriptive name for the files to end up in.
Remember that having dots in bucket names won't work with CloudFront, and
bucket names have to be globally unique. Mine is called ``www-rust-lang-org``,
since it exists to hold the www.rust-lang.org site.

Follow the directions to `create an IAM user
<http://docs.aws.amazon.com/IAM/latest/UserGuide/Using_SettingUpUser.html>`_
for Travis. Download the credentials and keep them somewhere safe -- you'll
later encrypt them to allow Travis to use them to push your site to s3. Set
the Travis account's `policies
<http://docs.aws.amazon.com/IAM/latest/UserGuide/policies_using-managed.html>`_
to allow it to upload to the bucket you created, deploy a CloudFront
invalidation, and not touch anything else in your infrastructure. It's `best
practices <http://docs.aws.amazon.com/IAM/latest/UserGuide/IAMBestPracticesAndUseCases.html>`_
to give the account the minimum permissions with which it can get its job
done, to minimize the harm that will occur if someone breaks the encryption of
its credentials. 

On `the Travis site <http://travis-ci.org/>`_, push the button that turns on
CI for your repository. In the repo settings menu of the user interface
(travis-ci.org/owner/repo/settings), make sure that building pull requests is
turned off (or the build will fail on PRs, since for security reasons a PR
cannot decrypt the encrypted environment variables). 

Then follow the `s3 deployment guide
<http://docs.travis-ci.com/user/deployment/s3/>`_ to create your
``.travis.yml`` file. During the interactive prompt for encryption, make sure
that the Travis CLI uses the key for the correct repository, by passing the
``-r owner/repo`` flag. Each repo has a unique keypair, and a value encrypted
with your fork's key cannot be decrypted once your changes are merged to the
organization. A couple quick local tests have revealed that Travis seems to
guess what repo it's encrypting for from the GitHub URL of the current
repository's ``origin`` remote. 

Push or PR your changes to the repo for which the credentials are encrypted,
and verify that the correct files showed up in the bucket.  Then `set up
CloudFront <http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html>`_. 

Make Travis automatically invalidate old pages
----------------------------------------------

The benefit to CloudFront is that it gives excellent availability by caching
pages geographically close to users. The problem with this is that caching is
hard, and can cause users to see stale pages after a site update unless we
inform the CDN that it should invalidate cached copies of changed pages. 

Ideally, I want Travis to send out a CloudFront invalidation immediately after
uploading fresh pages to S3. Travis will be running a Ruby environment because
the site is built with Jekyll, so I found a `ruby gem
<https://github.com/laurilehmijoki/cf-s3-invalidator>`_ which automatically
generates Cloudfront invalidations. 

Since I'll be trusting the gem with credentials to my infrastructure, I
compared its source to the `invalidation API instructions
<http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html>`_
to make sure it wasn't doing anything obviously malicious or incorrect. 

There are 3 new instructions to add to ``.travis.yml`` in order to make that gem
do its thing: decrypting the invalidation instructions, installing the
invalidator, and running the invalidation.

Craft a ``_cf_s3_invalidator.yml`` file according to the instructions in the
`ruby gem`_, then encrypt it with the command::

    travis encrypt-file -r owner/repo  _cf_s3_invalidator.yml --add

The ``--add`` flag dumps the decryption command into the ``before_install``
step of your .travis.yml. Read the output of the travis command in your
terminal, because it's important: You need to add the encrypted file, but not
the original, to git. 

Add these lines to ``.travis.yml`` to install the invalidator and run it when
necessary::

    after_success: cf-s3-inv                                                        
    script: jekyll build  

Custom Error Page
-----------------

To have Jekyll build a custom error page with a picture on it, put your
picture in the directory with your other images and write a simple HTML page
to display the error. Mine looks like `this
<https://github.com/rust-lang/rust-www/blob/master/error.html>`_. 

In the settings for your S3 bucket, specify ``error.html`` as your custom
error page. 

In the settings for your CloudFront distribution, customize which error page
gets returned for various HTTP response codes. 


.. author:: default
.. categories:: none
.. tags:: travis, ruby, aws, s3, cloudfront, github pages
.. comments::
