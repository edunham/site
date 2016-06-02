Don't Starve
============

It was a lazy Sunday afternoon and I wanted to play Don't Starve. This
actually ended up meaning about 3 hours of intermittent troubleshooting and 1
hour of games, because Linux. 

Get the files
-------------

I bought Don't Starve from the Humble Bundle store, although there are other
methods of obtaining it which strike a different balance between cost and
convenience. 

The downloaded file is ``dontstarve_x64_july21.tar.gz``. 

This Just Works
===============

::

    $ yaourt -S libcurl-compat
    $ tar -xvf dontstarve_x64_july21.tar.gz
    $ cd dontstarve/bin
    $ LD_PRELOAD=libcurl.so.3 ./dontstarve

Below the fold is the troubleshooting process I went through to make it look
so easy. Hopefully it'll be of assistance to those searching for the errors
that I ran into!

.. more::

This part has SEO for all the intermediate errors
=================================================

Try to run the script
---------------------

::

    $ cd dontstarve
    $ ./dontstarve.sh
    sh: symbol lookup error: sh: undefined symbol: rl_signal_event_hook
    sh: symbol lookup error: sh: undefined symbol: rl_signal_event_hook
    sh: symbol lookup error: sh: undefined symbol: rl_signal_event_hook
    sh: symbol lookup error: sh: undefined symbol: rl_signal_event_hook
    sh: symbol lookup error: sh: undefined symbol: rl_signal_event_hook
    Fontconfig error: "/etc/fonts/conf.d/10-scale-bitmap-fonts.conf", line 70: non-double matrix element
    Fontconfig error: "/etc/fonts/conf.d/10-scale-bitmap-fonts.conf", line 70: non-double matrix element
    Fontconfig warning: "/etc/fonts/conf.d/10-scale-bitmap-fonts.conf", line 78: saw unknown, expected number

    (updater:2135): Pango-WARNING **: failed to choose a font, expect ugly output. engine-type='PangoRenderFc', script='latin'

    (updater:2135): Pango-WARNING **: failed to choose a font, expect ugly output. engine-type='PangoRenderFc', script='common'
    ./dontstarve.sh: line 2: unexpected EOF while looking for matching ``'
    ./dontstarve.sh: line 4: syntax error: unexpected end of file

Look what doesn't like me! The fonts are sad. Spoiler: You don't actually need
those fonts at all.

Much Frustration
----------------

It turns out that the ``./dontstarve.sh`` in the root of the unzipped
``dontstarve`` directory is solely an updater, which is **totally irrelevant**
if you just want to play whatever version of the game they happened to ship
you. It launches an updater that requests a game key and has hideously broken
fonts and generally sprouts new errors like a Hydra every time you think
you're making progress. 

Try running the correct ``dontstarve`` executable
-------------------------------------------------

The correct script to run actually lives in ``bin/dontstarve.sh``, but if you
try to run it from outside that directory, it can't find other files::

    $ bin/dontstarve.sh
    $ bin/dontstarve.sh: line 3: ./dontstarve: No such file or directory

Cute. So instead::

    $ cd bin
    $ ./dontstarve.sh
    ./dontstarve: /usr/lib/libcurl.so.4: version `CURL_OPENSSL_3' not found (required by ./dontstarve)

OR::

    $ bin/dontstarve # Spoiler, this will still be broken later
    bin/dontstarve: /usr/lib/libcurl.so.4: version `CURL_OPENSSL_3' not found (required by bin/dontstarve)

Fixing the ``libcurl`` error
----------------------------

Get ``libcurl-compat`` from the AUR::

    $ yaourt -S libcurl-compat

At the end of its installation process, it'll give you a helpful little
warning about preloading the library::

    Sometimes you have to preload library!
     e.g. if you see this message:
     /usr/lib/libcurl.so.4: version `CURL_OPENSSL_3' not found'
     Do this:
     LD_PRELOAD=libcurl.so.3 youprogname 

Run ``dontstarve`` with the right ``libcurl``
---------------------------------------------

::

    $ LD_PRELOAD=libcurl.so.3 bin/dontstarve


Hello Segfaults
---------------

And then we get a nice reproduceable segfault, ending in::

    ERROR: Missing Shader 'shaders/font.ksh'.
    Assert failure '0' at ../source/renderlib/OpenGL/HWEffect.cpp(86)

    Assert failure 'BREAKPT:' at ../source/renderlib/OpenGL/HWEffect.cpp(86)

    Assert failure 'datasize + mReadHead <= mBufferLength' at ../source/util/reader.h(28)

    Assert failure 'BREAKPT:' at ../source/util/reader.h(28)

    Segmentation fault (core dumped)

This is **NOT** the cue to go shave a graphics card yak, despite what Googling
the error would lead one to believe. This is the cue to::

    $ cd bin
    $ LD_PRELOAD=libcurl.so.3 ./dontstarve

If it's stupid, but it works, it ain't stupid. Running the executable from the
right directory makes the game work on an X230 and on an X1 Carbon, so in my
(un)professional opinion, it's got nothing to do with special fancy graphics
drivers. 

It works!
---------

Scroll way back up to the top for the short version. Have fun, and Don't
Starve!

P.S.
----

I tried this with the x32 version. It goes all::

    ~/Downloads/dontstarve/bin $ LD_PRELOAD=libcurl.so.3 ./dontstarve
    bash: ./dontstarve: No such file or directory

The script and executable have the same permissions when unzipped from the 32-
or 64-bit tarballs... Just, the 32-bit one doesn't work. There's probably a
good reason for this, possibly related to the fact that I'm running on a
64-bit system, but since the ``x64`` variant of the game runs just fine I
didn't dig into the ``x32``'s malfunctions any deeper. 

.. author:: E. Dunham
.. categories:: none
.. tags:: arch, games, troubleshooting
.. comments::
