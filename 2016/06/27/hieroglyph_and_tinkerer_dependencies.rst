Hieroglyph and Tinkerer Dependencies
====================================

In setting up virtualenvs for my slides and blog repos on my new laptop, I've
been reminded that a variety of Sphinx-based tools require system dependencies
as well as the ones in their virtualenvs.

Hieroglyph dependency issues
----------------------------

The error resulting from ``pip install -r requirements.txt`` ended with::

    Command ".../virtualenv/bin/python2 -u -c
    "import setuptools,
    tokenize;__file__='/tmp/pip-build-lzbk_r/Pillow/setup.py';exec(compile(getattr(tokenize,
    'open', open)(__file__).read().replace('\r\n', '\n'), __file__, 'exec'))"
    install --record /tmp/pip-BNDc_6-record/install-record.txt
    --single-version-externally-managed --compile --install-headers
    /home/edunham/repos/slides/rustcommunity/v/include/site/python2.7/Pillow"
    failed with error code 1 in /tmp/pip-build-lzbk_r/Pillow/


Its fix, from `stackoverflow`_, was::

    $ sudo apt-get install libtiff5-dev libjpeg8-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python-tk
    $ pip install -r requirements.txt

Tinkerer depencencies, too!
---------------------------

``pip install -r requirements.txt`` over in my `blog repo`_ yielded::

    Command ".../virtualenv/bin/python2 -u -c "import setuptools,
    tokenize;__file__='/tmp/pip-build-NVLSBY/lxml/setup.py';exec(compile(getattr(tokenize,
    'open', open)(__file__).read().replace('\r\n', '\n'), __file__, 'exec'))"
    install --record /tmp/pip-qD5QIe-record/install-record.txt
    --single-version-externally-managed --compile --install-headers
    /home/edunham/repos/site/v/include/site/python2.7/lxml" failed with error code
    1 in /tmp/pip-build-NVLSBY/lxml/


The fix is again to install the missing system deps, on Ubuntu::

    $ sudo apt-get install libxml2-dev libxslt-dev
    $ pip install -r requirements.txt


That's it! I'm writing this down for SEO on the specific errors at hand, since
the first several useful hits are currently stackoverflow.

If you're a pip developer reading this, please briefly contemplate whether
it'd be worthwhile to have some built-in mechanism to translate common
dependency errors to the appropriate system package names needed based on the
OS on which the command is run.

.. _stackoverflow: http://stackoverflow.com/questions/34631806/fail-during-installation-of-pillow-python-module-in-linux/34631976

.. _blog repo: https://github.com/edunham/site

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
