Automating Irssi
================

I use Irssi as my IRC client because I don't need to write my own plugins for
it, and its documentation is excellent even when you're not sure what
questions to ask. If I needed plugins that haven't already been written by
others, and didn't mind either reading the entire manual or constantly asking
for help to solve simple problems, I would switch to Weechat. 

I've configured Irssi to automatically join the networks that I want,
authenticate me to services, then join my preferred channels. The `Irssi
beginner docs`_ are a great reference for client commands to set these
functions up, but if I was doing it over again, it would save a lot of
keystrokes to simply hand-write the config file which those commands end up
generating. Here's how you can do that. 

.. more::

Directory structure
===================

Irssi loads its configuration from the files in  ``~/.irssi/`` by default, and
I've never encountered a reason to put the configs elsewhere::

    $ tree .irssi
    .irssi/
    ├── config
    ├── default.theme
    ├── sasl.auth
    └── scripts
        └── autorun
                └── cap_sasl.pl

.irssi/scripts/autorun/cap_sasl.pl
==================================

This is how you automatically authenticate yourself to services before joining
channels, so that you'll always have your cloak on.

You can read `Freenode's directions`_ on setting this up, or just download
`cap_sasl.pl`_ and put it into ``~/.irssi/scripts/autorun/``. 

When ``cap_sasl.pl`` runs, it will read ``sasl.auth`` and authenticate you as
specified in that file. 

The format of the file is ``networkname``, ``hard tab``, ``nick``,
``password``, ``hard tab``, ``PLAIN``. 

If my username/password combo to authenticate with Freenode's nickserv was 
hello/world, and on work IRC was username/mypass, the ``sasl.auth`` file would
look like this::

    freenode    hello world     PLAIN
    work        username mypass PLAIN

.irssi/config
=============

It's best to edit the config after running Irssi once, since it contains a
bunch of defaults for aliases and display features which I won't discuss here. 

servers
-------

Each server has an address, a nickname ("chatnet"), a port, SSL settings, and
whether it should autoconnect. **You should connect with SSL whenever
possible**, because encrypting all your communications with the server makes
it safer to send your login credentials in plaintext. 

::

    servers = (
      {
        address = "irc.freenode.net";
        chatnet = "freenode";
        port = "6697";
        use_ssl = "yes";
        ssl_verify = "no";
        autoconnect = "yes";
      },
      {
        address = "irc.workplace.com";
        chatnet = "work";
        port = "6697";
        password = "Work Company's Super Seekrit Passphrase";
        use_ssl = "yes";
        ssl_verify = "no";
        autoconnect = "yes";
      }
    );

You can add as many servers as you want, following that format. 

chatnets
--------

Reassure Irssi that each network's nickname does belong to an IRC network::

    chatnets = {
      freenode = { type = "IRC"; };
      work = { type = "IRC"; };
    };

Add a chatnet entry for each network that you refered to when configuring the
servers settings. 

channels
--------

Add one of these for each channel that your client should autojoin::

    channels = (
      { name = "#osu-lug"; chatnet = "freenode"; autojoin = "yes"; },
      { name = "#osuosl"; chatnet = "freenode"; autojoin = "yes"; },
      { name = "#infra"; chatnet = "work"; autojoin = "yes"; },
    );

aliases
-------

You don't need to touch these to set up autoconnects. To learn more about them,
check out `this tutorial`_. 

settings
--------

The ``real_name`` variable is where you set your display name, if Irssi was
unable to find it in your GECOS information. 

hilights
--------

They'll look like this::

    hilights = (
      { text = "edunham"; nick = "yes"; word = "yes"; },
      {
        text = "batsignal";
        color = "%G";
        nick = "yes";
        word = "yes";
        channels = ( "#infra" );
      }
    );

This way, whenever anyone says my name in any channel, I'll get hilighted in
the default color (purpleish). Whenever someone says "batsignal" in the infra
channel, I'll get hilighted in green. 

More information about setting hilights with regexes, coloring, and other cool
tricks can be found by grepping for ``hilight`` in `the manual`_.

ignores
-------

Your ignores list specifies what message types ("levels") should be ignored in
certain channels::

    ignores = (
      { level = "JOINS PARTS QUITS NICKS"; channels = ( "#osuosl" )},
      { level = "JOINS PARTS QUITS"; channels = ( "#infra" ) }
    );

Section 2 of `the manual`_ has more information on levels. 

I personally like to turn off joins and parts in larger or busier channels,
but leave them on in smaller channels where it's important to notice when a
new community member arrives. 

windows
-------

This sets which buffer goes where when Irssi starts. Setting the layout like
this is useful to me because I get accustomed to buffers being in particular
places, and tend to memorize the numbers of important channels so I know
immediately where I've been pinged::

    windows = {
      1 = { immortal = "yes"; name = "(status)"; level = "ALL"; };
      2 = {
        items = (
          { type = "CHANNEL";
            chat_type = "IRC";
            name = "#osu-lug";
            tag = "freenode"; }
        );
      };
      3 = {
        items = (
          { type = "CHANNEL";
            chat_type = "IRC";
            name = "#infra";
            tag = "work"; }
        );
      };
      4 = {
        items = (
          { type = "QUERY"; 
            chat_type = "IRC"; 
            name = "chanserv"; 
            tag = "freenode"; }
        );
      };
      5 = {
        items = (
          { type = "CHANNEL";
            chat_type = "IRC";
            name = "#osuosl";
            tag = "freenode"; }
        );
      };
    };

What next?
==========

Read about `starting Irssi automatically when your VPS boots`_.


.. _starting Irssi automatically when your VPS boots: http://edunham.net/2015/02/15/starting_screen_irssi_at_boot.html
.. _the manual: http://www.irssi.org/documentation/manual
.. _this tutorial: http://linuxreviews.org/software/irc/irssi/#toc4
.. _cap_sasl.pl: https://freenode.net/sasl/cap_sasl.pl
.. _Freenode's directions: https://freenode.net/sasl/sasl-irssi.shtml
.. _Irssi beginner docs: http://irssi.org/beginner/

.. author:: E. Dunham
.. categories:: none
.. tags:: irssi, irc 
.. comments::
