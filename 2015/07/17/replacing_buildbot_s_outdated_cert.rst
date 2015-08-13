Outage postmortem: Replacing Rust Buildbot's outdated cert
==========================================================

At the end of the day on July 14th, 2015, the certificate that Rust's buildbot
slaves were using to communicate with the buildmaster expired. This `broke
things`_. The problem started at midnight on July 15th, and was only fully
resolved at the end of July 16th. Much of the reason for this outage's
duration was that I was learning about Buildbot as I went along.

Here's how the outage got resolved, just in case anyone (especially future-me)
finds themself Googling a similar problem. 

.. more::

Troubleshooting
---------------

Dave Huseby pointed out the problem on IRC when the slaves that he runs were
unable to connect to the buildmaster::

    16:48:23 <&brson> edunham: dhuseby said this earlier <huseby> it seems like the verify=3 in the stunnel config is the problem
    16:48:39 <&brson> if he changed 'verify' to some other value in the stunnel config it worked

A quick check fo the `stunnel docs`_ shows that ``verify=3`` is the strictest
setting, and will fail if the locally installed cert isn't right. This
supports the hypothesis that our cert might be expired. On the buildmaster, I
found the cert and examined its metadata::

    $ find . -type f -name "*.pem"
    $ openssl x509 -noout -issuer -subject -dates -in certname.pem 

On the old cert, the results contained::

    $ openssl x509 -noout -issuer -subject -dates -in rust-bot-cert.pem 
    issuer= /
        O=Rust Project/
        OU=Bot/
        CN=bot.rust-lang.org/
        emailAddress=admin@rust-lang.org
    subject= /
        O=Rust Project/
        OU=Bot/
        CN=bot.rust-lang.org/
        emailAddress=admin@rust-lang.org
    notBefore=Jul 14 02:28:50 2012 GMT
    notAfter=Jul 14 02:28:50 2015 GMT

This tells me that the cert was created in 2012 and had its expiry set for the
seemingly distant future of 2015. 

Make a New Cert
---------------

To determine whether the old key had a passphrase on it, go ``openssl rsa
-check -in keyname.pem``. It writes the private key to your terminal if
there's no password, or prompt for a passphrase if the key has one. 

The `stunnel docs`_ give most of the relevant incantation. Since no file in
our buildbot directory is named precisely ``stunnel.conf``, ``make cert``
doesn't quite work right. But it works fine to manually run a variant of the
command given in the docs:: 

    $ openssl req -new -x509 -days 3650 -nodes -out cert.pem -keyout key.pem

That prompted me for a variety of information, which I entered where
applicable and left blank where it wasn't. The metadata is primarily for the
benefit of others verifying that a cert belongs to the correct person, which
isn't a relevant concern in our use case. 

I then backed up the old key and cert (although they're no longer usable, they
contain a bunch of metadata that I didn't know whether I'd need later) and
moved the new key and cert to match the old ones' original file names.

Finally, I `updated the repository`_ with the new certificate. 

Make Buildbot spin up AMIs with the new cert
============================================

This was the tricky bit. Since the slave image does not pull updates to its
copy of the Rust Buildbot github repo when it boots, the file had to be
statically edited and then the AMIs re-saved. But Buildbot makes its instance
requests based on AMI ID, and the IDs are unique to a particular image. So the
workflow goes: 

* Figure out which AMI Buildbot will spin up for a given job
* Spin up an instance of the AMI
* Remote into it and manually update the cert
* Save the instance into a new AMI, noting its ID
* Update Buildbot's configuration with the new ID

Figure out which AMI Buildbot will use
--------------------------------------

The AMI IDs used for spot requests are stored in
``/home/rustbuild/rust-buildbot/master/slave-list.txt`` on the buildmaster.
From that file I determined that we only had 4 unique AMIs in use::

    ami-b74fa1f3 -- windows
    ami-7fd23e3b -- generic linux 
    ami-381e197d -- android
    ami-dbac5f9f -- centos5 (builds snapshots that work with ancient Linux)
    
The slave list also told me that all requests would be made for instance type
``c3.2xlarge``. 

Spin up an instance of the AMI
------------------------------

Since there were only 4, I did this manually. If it was a recurring task or
there had been more AMIs, I would have automated this part of the process. 

In the AWS Console, go to EC2, then click the AMIs link under "Images" at the
left. 

Search for the AMI ID in the search box. Only one AMI is found, because IDs
are unique. Then click the big blue Launch button up at the left. 

.. figure:: /_static/amis.png
    :align: center

The only "gotcha" in the ensuing 7-step process is making sure to put the
instance into the correct security group. I spun my temporary instances up
into the same group as a host I know I can get to from the Bastion server with
my credentials, to reduce the number of steps I'd have to troubleshoot if they
were difficult to access.  

It also helps to tag the spot request with the name of the AMI it was created
from, when processing several at once.

Remote into the instance and update the cert
--------------------------------------------

For Linux-flavored instances, this just meant ``ssh rustbuild@00.00.00.00``
(using the instance's public IP, visible in the main instances list) from the
Bastion. I then found the old cert on the host, and verified that
it matched the old cert on the buildmaster. Checking that the certs matched
was as simple as running ``md5sum cert.pem`` on both and visually comparing
the results, and reassured me that I was overwriting the correct file. 

Getting into the Windows hosts requires `using RDP`_ after setting up an SSH
tunnel to the bastion. Since I was on airport wifi at the time, I had a
teammate stick the cert onto the Windows instances instead. 

The cert that ``stunnel`` actually uses on a Windows host with our
configurations actually lives at ``C:\Program Files (x86)\stunnel\cert.pem``,
not in the actual repo like on all the sensible operating systems. Although
there exists a ``C:\bot\cert.pem``, replacing it does not cause ``stunnel`` to
connect successfully.

Save the instance into a new AMI
--------------------------------

Check the box by the instance's name in the EC2 instances list, then follow
the menus around for Actions -> Image -> Create Image. Note the new AMI's ID,
and replace all instances of the old AMI's ID with the new one in the
buildmaster's ``slave-list.txt``.  

Kick Buildbot a bit
===================

After the AMIs and FreeBSD, Bitrig, and Mac builders all had the new cert, I
restarted Buildbot on the buildmaster and reran its script for creating the
stunnels. Althoug it didn't gracefully pick up where it had left off on
partially built pull requests, closing then re-opening the PRs caused it to
notice them and resume building successfully. 

Hopefully TaskCluster gets OSX support soon, so we can start switching off of
Buildbot.

Prevent it from happening again
-------------------------------

After I first published this post, `Gerv`_ pointed out that the correct final
step would be "Add an alarm to the shared IT calendar for a month before the
new cert expires". In my case, the analog to that alarm is "Make sure we move
away from Buildbot in less than a decade". However, if you're reading this
post to solve a similar problem in an infrastructure that will still exist at
the date of the cert's expiry, you should automate a reminder so that you or
your successor doesn't get the same unpleasant surprise. 


.. _Gerv: http://www.gerv.net
.. _broke things: https://internals.rust-lang.org/t/buildbot-is-down-for-a-bit/2365
.. _stunnel docs: https://www.stunnel.org/howto.html
.. _updated the repository: https://github.com/rust-lang/rust-buildbot/pull/21
.. _using RDP: http://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/connecting_to_windows_instance.html

.. author:: default
.. categories:: none
.. tags:: rustinfra, buildbot, aws, ec2
.. comments::
