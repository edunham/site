i3 sometimes won't start programs
=================================

Dmenu won't work with meta+d. Terminator won't start with meta+enter. 


This only happens in the morning, when my laptop has been asleep for awhile. 

::

    $ dmenu
    Invalid MIT-MAGIC-COOKIE-1 keycannot open display
    $ sudo dmenu
    Invalid MIT-MAGIC-COOKIE-1 keycannot open display
    $ sudo terminator
    Invalid MIT-MAGIC-COOKIE-1
    key/usr/lib/python2.7/site-packages/gtk-2.0/gtk/__init__.py:57: GtkWarning:
    could not open display
    warnings.warn(str(e), _gtk.Warning)
    You need to run terminator in an X environment. Make sure $DISPLAY is
    properly set
    $ echo $DISPLAY
    :0


    miea@10:46 ~ $ dmesg | tail -n 20 >
    /home/miea/repos/site/dmesg_startstuff_fuckerymiea@10:47 ~ $ 



.. author:: default
.. categories:: none
.. tags:: none
.. comments::
