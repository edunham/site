Recording Screencasts on Arch
=============================

Today I learned that there's a trick to getting sound to work on Arch using
`recordmydesktop`_. 

.. more::

The Issue
---------

::

    yaourt -S recordmydesktop
    recordmydesktop test.ogv

Was met with the classic error::

    Couldn't open PCM device hw:0,0
    Error while opening/configuring soundcard hw:0,0
    Try running with the --no-sound or specify a correct device.

Troubleshooting
---------------

I tried passing all the devices from ``/dev/snd``, and none of them worked. 

To see whether a graphical UI might install some silent dependency, I
installed ``qt-recordmydesktop`` and ran it. This failed to record in the same
way as before, but an advanced settings tab mentioned that ``jackd`` was not
running. 

I then manually tried to start `jack`_ by invoking ``jackd`` at the command
line, and hit a useful error message emitted by `the sanity check`_. 

The Fix
-------

``recordmydesktop`` was unable to work out of the box because the user as whom
I invoked it was not a member of the audio group::

    usermod -a -G audio username

made the error disappear, and now ``recordmydesktop`` works with the default
device. 

Epilogue
--------

My first successful recording, test.ogv, is about 5 seconds of me wondering
aloud where the program went, cursing at it, and typing loudly to ``killall
recordmydesktop``. 


.. _the sanity check: https://github.com/jackaudio/jack1/blob/master/config/os/gnu-linux/sanitycheck.c
.. _jack: http://jackaudio.org/
.. _recordmydesktop: http://recordmydesktop.sourceforge.net/about.php

.. author:: default
.. categories:: none
.. tags:: arch, audio, recordmydesktop
.. comments::
