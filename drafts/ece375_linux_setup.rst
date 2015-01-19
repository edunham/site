ECE375 Linux Setup
==================

* get a programmer. I'm using an avr-isp-mk2, inherited from an ECE major
  friend. 

* set jumpers up correctly. docs on this are shit but actually nobody cares --
  http://eecs.oregonstate.edu/education/docs/mega128/userguide.pdf
  http://eecs.oregonstate.edu/education/docs/mega128/starterguide.pdf is from
  2003 so it's like 12 years old now aaugh

* install shit. if you have the OSU programmer you might need osuisp stuff --
  if on arch, yaourt -S avrdude-osuisp2-svn, if not, try
  http://archive.osuosl.org/beaversource/osuisp2.tgz at minimum you need an
  avrdude. ignore instructions where it tells you to install the IDE; you're a
  big kid and get to use your editor of choice here.

* plug in the cable where it fits on the board, and the other end of the cable
  from the programmer where it fits in your laptop. duh.

* incant at avrdude to see if it can talk to the board. gonna have to use
  avrdude as root, since it uses raw usb device avrdude -c avrisp2 -p m128
  http://www.nongnu.org/avrdude/user-manual/avrdude_4.html

* get an error::

  avrdude: Device signature = 0xffffff
  avrdude: Yikes!  Invalid device signature.
         Double check connections and try again, or use -F to override
         this check.



.. author:: default
.. categories:: none
.. tags:: none
.. comments::
