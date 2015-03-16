Fixing Mplayer
==============

When trying to fix some errors related to installing `BlackArch`_ last week, I
made a poorly thought out decision and deleted some kernel modules that I
didn't think were necessary. This rendered my system impossible to boot or
chroot into for a bit. 

.. more::

The solution to most of that problem was to boot off of a livecd USB, then run
the following commands::

    mount /dev/sda1 /mnt
    pacman -Syu -r /mnt/ linux

At this point, it could not boot because it was missing ``/sbin/init``. This
was solved by reinstalling ``systemd-sysvcompat``. 

However, even after uninstalling and reinstalling mplayer, I got the following
error::

    mplayer: error while loading shared libraries: librtmp.so.1: cannot open shared object file: No such file or directory

In my case, Google did not have a useful fix for the error on the first page. 

``yaourt -Ss librtmp`` reveals that there's a ``librtmp0`` nominally
available, although it was unable to build successfully on my system. 

**The solution was to reinstall ``rtmpdump``**. This restored the necessary
kernel modules, and mplayer works now. 

.. _BlackArch: http://blackarch.org/

.. author:: default
.. categories:: none
.. tags:: arch, mplayer
.. comments::
