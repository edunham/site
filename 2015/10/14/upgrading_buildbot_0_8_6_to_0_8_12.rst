Upgrading Buildbot 0.8.6 to 0.8.12
==================================

Here are some quick notes on upgrading Buildbot. 

System Dependencies
-------------------

There are more now. In order to successfully install all of Buildbot's
dependencies with Pip, I needed a few more apt packages::

    python-dev
    python-openssl
    libffi-dev
    libssl-dev

Then for sanity's sake make a virtualenv, and install the following packages.
Note that having too new a ``sqlalchemy`` will `break things
<http://stackoverflow.com/questions/17031471/why-buildbot-throw-importerror-cannot-import-name-exceptions>`_.::

    buildbot==0.8.12
    boto
    pyopenssl
    cryptography
    SQLAlchemy<=0.7.10

Virtualenvs
-----------

Troubleshooting compatibility issues with system packages on a host that runs
several Python services with various dependency versions is predictably
terrible. 

The potential problem with switching to running Buildbot only from a
virtualenv is that developers with access to the buildmaster might want to
restart it and miss the extra step of activating the virtualenv. I addressed
this by adding the command to activate the virtualenv (using the virtualenv's
absolute path) to the ``~/.bashrc`` of the user that we run Buildbot as. This
way, we've gained the benefits of having our dependencies consolidated without
adding the cost of an extra workflow step to remember.

Template changes
----------------

Most of Buildbot's status pages worked fine after the upgrade, but the console
view threw a template error because it couldn't find any variable named
"categories". The fix was to simply copy the new template from
``venv/local/lib/python2.7/site-packages/buildbot/status/web/templates/console.html``
to ``my-buildbot/master/templates/console.html``. 


That's it!
----------

Rust currently has these updates on the development buildmaster, but not yet
(as of 10/14/2015) in prod.

.. author:: default
.. categories:: none
.. tags:: buildbot 
.. comments::
