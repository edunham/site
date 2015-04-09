Key Remapping
=============

It's one of those mundane things for which I find myself searching a dozen
related queries every time I need to do it, so I'm writing down the steps
where I can find them later. 

.. more::

Get the Keycode
---------------

::
    $ sudo showkey

then press the key that you want.  Showkey will time out after 10 seconds of
inactivity.

On my X230, the thing between my right alt and control had keycode 99. Down by
the X230's arrow keys, the thing on the left is 104 and the thing on the right
is 109. The former functions as page up and the latter as page down. 

On the X201, the button above the left arrow key is 158 and the one above the
right arrow key is 159. Neither does anything. Page-up and page-down are 104
and 109 respectively, and work correctly. The menu key between alt and ctrl on
the right side of the keyboard has keycode 127, and appears to simulate a
right click. The window-key has keycode 125. 


Find or assign its name
-----------------------

`xmodmap`_ assigns keycodes to keysyms. My goal is to cause the menu key to
precisely duplicate the behavior of the window key and the keys above the left
and right arrows to behave identically to page up and page down. This means I
can simply look at the existing keys' xmodmap information and copy it,
changing only the keycode number.::

    $ xmodmap -pke > ~/.Xmodmap

It does not work to simply edit ``~/.Xmodmap`` to change the settings based on
the keycodes found with showkey, since some of the keys that I'm trying to
remap are 

Work Backwards
--------------

In ``.i3/config``, I have the configuration::

    # use window key; Terminator and Irssi need alt                                 
    set $mod Mod4  

In the output of ``xmodmap``, I can see what keysyms ``Mod4`` is bound to::

    mod4        Super_L (0x85),  Super_R (0x86),  Super_L (0xce),  Hyper_L (0xcf)

In the output of ``xmodmap -pke``, 


Tell X to read the new configuration at startup
-----------------------------------------------

As explained in the `xmodmap`_ docs, just add these lines to ``~/.xinitrc``::

    if [ -s ~/.Xmodmap ]; then
        xmodmap ~/.Xmodmap
    fi

Future Work
-----------

If I'm going to be switching my hard drive between laptop models often, it
would be a good idea to configure my ``.xinitrc`` to test which laptop
I'm on and apply the correct xmodmap settings. 

I could either use laptop model number (from ``sudo dmidecode -s
system-version``) or the serial number of a part in the machine (``sudo
dmidecode -s baseboard-serial-number``) to choose which machine I'm on.
Unfortunately, neither ``dmidecode`` nor ``lshw`` appears to provide
information on the specific part number of the keyboard installed in the
laptop, which is what really matters for choosing the right xmodmap. 

.. _xmodmap: https://wiki.archlinux.org/index.php/Xmodmap

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
