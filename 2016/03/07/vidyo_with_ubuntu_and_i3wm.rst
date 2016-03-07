Vidyo with Ubuntu and i3wm
==========================

Mozilla uses `Vidyo <http://www.vidyo.com/>`_ for virtual meetings across
distributed teams. If it doesn't work on your laptop, you can use the mobile
client or book a meeting room in an office, but neither of those solutions is
optimal when working from home. 

Vidyo users within Mozilla can download a ``.deb`` or ``.rpm`` installer from
`v.mozilla.org <v.mozilla.org>`_. On Ubuntu, it's easy to install the
downloaded package with ``sudo dpkg -i path/to/the/file.deb``. 

The issue is that when you invoke ``VidyoDesktop`` from your launcher of
choice (dmenu for me), i3 does what's usually the right thing and makes the
client fullscreen in a tile. This doesn't allow the interface to pop up a
floating window with the confirm dialog when you try to join a room, so you
can't. 

mod + shift + space
-------------------

Mod was ``alt`` by default last time I installed i3, but I've since remapped
it to the window key (as IRC clients use alt for switching windows). Some
people use caps lock as their mod key. 

``mod + shift + space`` makes the window `floating
<https://i3wm.org/docs/userguide.html#_floating>`_, which allows it to pop up
the confirmation dialog when you try to join a call. 

Float windows by default
------------------------

Alternately, stick the line::

    for_window [class="VidyoDesktop"] floating enable

in your ``~/.i3/config``.

.. author:: default
.. categories:: none
.. tags:: vidyo, ubuntu, i3
.. comments::
