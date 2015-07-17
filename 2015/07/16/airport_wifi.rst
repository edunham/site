Airport Wifi
============

Many "free" wifi hotspots give you a limited time per computer. If you're
traveling light and forgot to bring extra devices, it's easy to give a Linux
laptop multiple personalities::

    $ ip link
        1: lo
        2: wlp4s0
        3: enp0s25
    $ ip link set dev wlp4s0 down
    $ macchanger -r wlp4s0
    $ ip link set dev wlp4s0 up

... And then connect to the wifi and jump through its silly captive portal
hoops again! 

Changing your MAC address occasionally can be part of a healthy security diet,
making your device slightly more difficult to track, as well.

.. author:: default
.. categories:: none
.. tags:: wifi, arch 
.. comments::
