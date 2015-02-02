Making Arch do the right thing at startup
=========================================

I'm currently on my second clean install of Arch Linux. On the whole I've been
glad that I ditched most of my old configuration when I installed Arch to the
new SSD I got for my laptop at the beginning of the school year. However, I'd
been procrastinating on re-implementing a few things which worked last install
without me really knowing which of my many attempts had fixed them. This time,
I know what I'm doing and what questions to ask.

.. more::

Desired Behaviors
-----------------

* Start ssh-agent automatically at login
* Start X automatically at login
* Automatically connect to wifi if I'm at home
* Open a terminal in workspace 1 and Firefox in workspace 2

Preemptive Troubleshooting
--------------------------

Certain types of error when you're testing commands to auto-run at login will
immediately log you out again, with no error message displayed. The easy way
to fix these problems is to have at least one other user account on your
system with sufficient permissions to edit your account's startup scripts.
That way if you end up in such a failure loop, you can just login as them,
alter the offending line, and immediately test logging in as yourself again.

If you're testing automatic behaviors at login for the only account on your
system and the root account doesn't have its own password and things break,
the best ways I've found to get a bad line out of your config files are to
either reboot into a recovery mode or boot any old distro off of a USB drive
if you happen to have an old install disk sitting around.

Starting programs at login
--------------------------

The wonderful Arch Wiki has an entire page on how to `start X at login`_.

In summary, just add ``exec startx`` to the end of ``~/.bash_profile``.

``ssh-agent`` is a special snowflake and causes things to fail silently if you
try to invoke it along the lines of ``exec ssh-agent && exec startx``.
However, the `arch wiki`_ comes to the rescue again, citing a `ssh-agent
tutorial`_ that explains you can run ``ssh-agent`` as a wrapper::

    exec ssh-agent startx

(which of course goes as the last one of your ``~/.bash_profile``).

Automatically connecting to wifi
--------------------------------

The Arch Wiki's page on `netctl`_ has the relevant line buried, as usual, in a
huge wall of otherwise-extraneous information.

Note that I've been manually connecting to networks with ``wifi-menu`` before,
so I already have profiles with saved passwords for the networks to which I
wish to autoconnect.

If the SSID is ``My Network``, there's a file in ``/etc/netctl/`` with a name
something like ``wlp3s0-My Network``.

To make it autoconnect, just give the command::

    sudo netctl enable wlp3s0-My\ Network

Note that if the profile ever changes, such as for a change in password,
you'll have to ``netctl reenable`` it in order to automatically connect.

Automatically Starting Stuff in I3
----------------------------------

The stuff to start is a terminal trying to run my ``irc`` alias (which is
configured in ``~/.bashrc`` to ssh to my VPS and reconnect to my IRC screen),
and Firefox.

Adding the following lines to the start of ``~/.i3/config`` causes the desired
behavior when irc is started::

    exec --no-startup-id i3-msg 'workspace 1; exec terminator --command="irc"'
    exec --no-startup-id i3-msg 'workspace 2; exec firefox'

As an added bonus, digging these commands out of my old config reminded me how
to automatically set a background image: Just add the following to
``~/.13/config``::
    
    exec feh --bg-scale ~/background.jpg

.. _netctl: https://wiki.archlinux.org/index.php/Netctl#Basic_method
.. _ssh-agent tutorial: http://upc.lbl.gov/docs/user/sshagent.shtml
.. _arch wiki: https://wiki.archlinux.org/index.php/SSH_keys#ssh-agent_as_a_wrapper_program
.. _start X at login: https://wiki.archlinux.org/index.php/Start_X_at_login
.. author:: default
.. categories:: none
.. tags:: arch, i3
.. comments::
