SSHFS to public_html
====================

Today, someone asked the ``#osu-lug`` channel how to mount their
``public_html`` directory on OSU's shell server to a location on their local
Linux machine using sshfs. 

.. more::

So I basically googled `a tutorial`_ and parroted it back at them. However, it
would have been even faster to link them to a blog post, so here we go: 

What's SSHFS?
-------------

As the name suggests, `SSHFS`_ is a tool for using the Secure Shell protocol
(``SSH``) to mount a remote file system (``FS``). In other words, it lets you
treat files on a remote server (such as ``shell.onid.oregonstate.edu``) as if
they were on your local machine, so you can use your favorite IDE to work with
them and then see your changes immediately appear on the remote server. 

Setting Up
----------

First, install ``sshfs``. On Ubuntu, this looks like ``sudo apt-get install
sshfs``. On Arch, ``yaourt -S sshfs``. 

Second, check that you're able to SSH to shell. ``username`` will be your ONID
username throughout this discussion. From a terminal::

    $ ssh username@shell.onid.oregonstate.edu

If it accepts your ONID password and logs you in, congratulations! If you get
an error, Google it and try the solutions, or check the `ONID help docs`_. 

Finally, you need an empty directory to which you wish to mount the remote
directory. It's where your files will appear to show up. Let's give it a
descriptive name::

    $ mkdir ~/shell_public_html

Mount the remote directory
--------------------------

The syntax for specifying which directory on the remote host you want to mount
is roughly the same as for ``scp``, so you can give the directory's path
relative to your homedir. In other words, mounting your ``public_html``
directory to the local directory ``shell_public_html`` will look like this::

    $ sshfs username@shell.onid.oregonstate.edu:public_html shell_public_html

And now you can edit files in ``shell_public_html`` and their changes will be
automatically written to your ``public_html`` on
``shell.onid.oregonstate.edu``! 

To test changes, see whether the file you edited locally shows up in
``http://people.oregonstate.edu/~username/``. 

Other Neat Tricks
-----------------

Once you've got that working, you might want to look into: 

* Automatically mounting the directory at boot

* Handling disconnection more gracefully

This `Ubuntu Forums thread`_ discusses some options to solve those problems. 


.. _Ubuntu Forums thread: http://askubuntu.com/questions/43363/how-to-auto-mount-using-sshfs
.. _ONID help docs: http://oregonstate.edu/helpdocs/accounts/onid-osu-network-id/using-your-onid/shell-access-and-unix
.. _SSHFS: https://help.ubuntu.com/community/SSHFS 
.. _a tutorial: https://www.howtoforge.com/mounting-remote-directories-with-sshfs-on-ubuntu-11.10

.. author:: E. Dunham
.. categories:: none
.. tags:: school, sshfs
.. comments::
