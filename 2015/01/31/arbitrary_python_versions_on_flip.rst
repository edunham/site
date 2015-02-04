Arbitrary Python versions on Flip
=================================

A question in the ``#osu-lug`` channel about running python 2.7 on a school
server (which only has python 2.6.6) made me realize I should know how to do
that but have never tried it.  `Stackoverflow`_ provides instructions for
solving a similar problem, so I'm testing them out to make sure they work for
Python 2.7.7 and Python 3.

.. more::

The Setup
---------

At Oregon State University, students in the engineering department have access
to a trio of servers which, for most purposes, are interchangeable. If you're
running a screen session for IRC, it's important to log in to the same flip
(``flip1.engr.oregonstate.edu``, ``flip2.engr.oregonstate.edu``, or
``flip3.engr.oregonstate.edu``) every time because the session exists in that
particular server's memory. If you only care about stuff stored to disk, you
can just ssh to ``flip.engr.oregonstate.edu`` to be round-robined onto an
available server. Your NFS home directory is shared between all the flip
servers, which is why the same files are also available whenever you log in
with your engineering account to a Windows, Linux, or Mac computer in the
university's computer.

All 3 flips are identical; I happen to be on flip1 at the start of this
tutorial::

    -bash-4.1$ hostname
    flip1.engr.oregonstate.edu

It's running CentOS 6.6 and has Python 2.6.6 and Virtualenv 1.10.1 installed::

    $ python --version
    Python 2.6.6
    $ virtualenv --version
    1.10.1
    $ cat /etc/redhat-release
    CentOS release 6.6 (Final)

**tl;dr:** Just ``ssh`` to ``youronid@flip.engr.oregonstate.edu``. You only
need to specify flip{1-3} if you're doing IRC stuff.

Install Python locally
----------------------

On Flip, run the following commands::

    wget http://www.python.org/ftp/python/2.7.7/Python-2.7.7.tgz
    tar -zxvf Python-2.7.7.tgz

    # then you wait. it may take a few minutes.

    cd Python-2.7.7
    mkdir ~/python27

    # all 3 of the following steps may take awhile.
    ./configure --prefix=$HOME/python27
    make
    make install

Use Python2.7.7
---------------

Instead of invoking ``python`` and getting the old version from your path,
specify which python you want to run your program with::

    ~/python27/bin/python my_awesome_file.py

Or Make a Virtualenv
--------------------

::

    $ virtualenv -p ~/python27/bin/python venv27
    $ source venv27/bin/activate

    (venv27)-bash-4.1$ python --version
    Python 2.7.7


Errors
------

If you get a permission denied error, check that files actually ended up in
your ~/python27 directory. If the directory is empty, run ``make; make
install`` in your Python-2.7.7 directory.

Re-installing solved the failure-to-install issue for me.

Trying it with Python 3, too
============================

Repeating the same process with Python 3.4.2 yields the error::

    ImportError: No module named '_collections_abc'
    ERROR: The executable venv3/bin/python3 is not functioning
    ERROR: It thinks sys.prefix is '/nfs/stak/students/d/dunhame' (should be '/nfs/stak/students/d/dunhame/venv3')
    ERROR: virtualenv is not compatible with this system or executable

So, Flip's virtualenv version is too old. Fortunately, Python3 shipped with
pyvenv::

    $ python3/bin/pyvenv-3.4 venv3
    $ source venv3/bin/activate
    (venv3)$ python --version
    Python 3.4.2

For anyone who wants to copy and paste, the commands for installing Python
3.4.2 are::

    wget https://www.python.org/ftp/python/3.4.2/Python-3.4.2.tgz
    tar -zxvf Python-3.4.2.tgz
    cd Python-3.4.2
    mkdir ~/python3
    ./configure --prefix=$HOME/python3
    make
    make install

.. _Stackoverflow: http://stackoverflow.com/questions/1534210/use-different-python-version-with-virtualenv
.. author:: default
.. categories:: none
.. tags:: school
.. comments::
