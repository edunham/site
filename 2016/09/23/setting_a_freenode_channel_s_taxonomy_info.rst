Setting a Freenode channel's taxonomy info
==========================================

Some recent flooding in a Freenode channel sent me on a quest to discover
whether the network's services were capable of setting a custom message rate
limit for each channel. As far as I can tell, they are not.

However, the problem caused me to re-read the ChanServ help section::


	/msg chanserv help
	- ***** ChanServ Help *****
	- ...
	- Other commands: ACCESS, AKICK, CLEAR, COUNT, DEOP, DEVOICE,
	-                 DROP, GETKEY, HELP, INFO, QUIET, STATUS,
	-                 SYNC, TAXONOMY, TEMPLATE, TOPIC, TOPICAPPEND,
	-                 TOPICPREPEND, TOPICSWAP, UNQUIET, VOICE,
	-                 WHY
	- ***** End of Help *****

Taxonomy is a cool word. Let's see what ``taxonomy`` means in the context of
IRC::

	/msg chanserv help taxonomy
	- ***** ChanServ Help *****
	- Help for TAXONOMY:
	-
	- The taxonomy command lists metadata information associated
	- with registered channels.
	-
	- Examples:
	-     /msg ChanServ TAXONOMY #atheme
	- ***** End of Help *****

Follow its example::

	/msg chanserv taxonomy #atheme
	- Taxonomy for #atheme:
	- url                       : http://atheme.github.io/
	- ОХЯЕБУ                    : лололол
	- End of #atheme taxonomy.

That's neat; we can elicit a URL and some field with a cryllic and apparently
custom name. But how do we put metadata into a Freenode channel's taxonomy
section? Google has no useful hits (hence this blog post), but further digging
into ChanServ's manual does help::

	/msg chanserv help set

	- ***** ChanServ Help *****
	- Help for SET:
	-
	- SET allows you to set various control flags
	- for channels that change the way certain
	- operations are performed on them.
	-
	- The following subcommands are available:
	- EMAIL           Sets the channel e-mail address.
	- ...
	- PROPERTY        Manipulates channel metadata.
	- ...
	- URL             Sets the channel URL.
	- ...
	- For more specific help use /msg ChanServ HELP SET command.
	- ***** End of Help *****


Set arbirary metadata with ``/msg chanserv set #channel property key value``
----------------------------------------------------------------------------

The commands ``/msg chanserv set #channel email a@b.com`` and ``/msg chanserv
set #channel property email a@b.com`` appear to function identically, with the
former being a convenient wrapper around the latter.

So that's how ``#atheme`` got their fancy cryllic taxonomy: Someone with the
appropriate permissions issued the command ``/msg chanserv set #atheme property
ОХЯЕБУ лололол``.

Behaviors of channel properties
-------------------------------

I've attempted to deduce the rules governing custom metadata items, because I
couldn't find them documented anywhere.


0) Issuing a ``set property`` command with a property name but no value deletes
  the property, removing it from the taxonomy.

1) A property is overwritten each time someone with the appropriate permissions
  issues a ``/set`` command with a matching property name (more on the matching
  in a moment). The property name and value are stored with the same
  capitalization as the command issued.

2) The algorithm which decides whether to overwrite an existing property or
  create a new one is **not case sensitive**. So if you ``set ##test email
  test@example.com`` and then ``set ##test EMAIL foo``, the final taxonomy will
  show no field called ``email`` and one field called ``EMAIL`` with the value
  ``foo``.

3) When displayed, taxonomy items are sorted first in alphabetical order (case
  insensitively), then by length. For instance, properties with the names ``a``,
  ``AA``, and ``aAa`` would appear in that order, because the initial
  alphebetization is case-insensitive.


4) Attempting to place [mIRC color codes](http://www.mirc.com/colors.html) in the
  property name results in the error "Parameters are too long. Aborting."

  However, placing color codes in the value of a custom property works just fine.

Other uses
----------

As a final note, you can also do basically the same thing with Freenode's
NickServ, to set custom information about your nickname instead of about a
channel.

.. author:: E. Dunham
.. categories:: none
.. tags:: irc, freenode
.. comments::
