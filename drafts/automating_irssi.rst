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

The Files
---------

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

cap_sasl.pl
-----------

This is how you automatically authenticate yourself to services before joining
channels, so that you'll always have your cloak on.

You can read `Freenode's directions`_ on setting this up, or just download
`cap_sasl.pl`_ and put it into ``~/.irssi/scripts/autorun/``. 

When ``cap_sasl.pl`` runs, it will read ``sasl.auth`` and authenticate you as
specified in that file. 

The format of the file is ``networkname``, ``hard tab``, ``nick``,
``password``, ``hard tab``, ``PLAIN``. 

So if I have freenode named freenode, my nick is hello and my pass is world,
it'll look like::

    freenode    hello world     PLAIN
    moz         mynick mypass   PLAIN


.. _cap_sasl.pl: https://freenode.net/sasl/cap_sasl.pl
.. _Freenode's directions: https://freenode.net/sasl/sasl-irssi.shtml
.. _Irssi beginner docs: http://irssi.org/beginner/

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
