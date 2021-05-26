irssi and libera.chat
=====================

I'm in some channels that are moving from Freenode to Libera. 

My irssi runs on a DigitalOcean droplet, and whenever I try to connect to Libera from that instance, I get the error::

    [libera] !tungsten.libera.chat *** Notice -- You need to identify via SASL to use this server

Libera's [irssi guide](https://libera.chat/guides/irssi) says how to connect with SASL, and down in their [sasl docs](https://libera.chat/guides/sasl) they mention that SASL is required for IP ranges that are easy to run bots on... including my VPS. 

The fix is to pop open an IRC client locally (or use web IRC), connect to Libera without SASL, and register one's nick and password. After verifying one's email address over the regular connection, the network can be reached via SASL from anywhere using the registered nick as the `username` and the nickserv password as the `password`. 

Obvious in retrospect, but poorly SEO'd for how the problem looks at the outset, so that's how I worked around problems reaching Libera from Irssi on a VPS. 

.. author:: E. Dunham
.. categories:: none
.. tags:: irc 
.. comments::
