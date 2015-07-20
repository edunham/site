Printing
========

The office printers have instructions for setting them up under Windows, Mac,
and Ubuntu. I had forgotten how to wrangle printers, since the last time I had
to set up new ones was half a decade ago when I first joined the OSL. 

Setting up printers on Arch is easy once you know the right incantations, but
can waste some time if you try to do it by skimming the `huge wiki page
<https://wiki.archlinux.org/index.php/CUPS>`_ rather than either reading it
thoroughly or just following these steps:

**Install the CUPS client**::

    $ yaourt -S libcups

**Make the daemon go**::

    $ sudo systemctl enable org.cups.cupsd.service
    $ sudo systemctl start org.cups.cupsd.service

**Visit the web interface** at `http://localhost:631/`.

Then you have a GUI sufficiently similar to the one in the instructions for
Ubuntu! 

There is no GUI client for CUPS to install. If you find yourself mucking about
with ``gpr``, ``xpp``, ``kdeprint``, or ``/etc/cups/client.conf``, you have
gone way too far down the wrong rabbit hole. 



.. author:: default
.. categories:: none
.. tags:: printers, arch, cups
.. comments::
