Automating Arch, I3, and Terminator to do the right thing at startup
====================================================================

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

(which of course goes as the last line of your ``~/.bash_profile``).

Automatically connecting to one wifi network 
--------------------------------------------

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

Automatically connecting to the right network out of several
------------------------------------------------------------

The ``netctl enable`` stuff works great if the first enabled network is in
range when the system boots, but fails and doesn't try others if it isn't. At
this point I'm not sure whether it's supposed to be possible to autoconnect to
multiple networks with netctl at all. 

When I asked some other Arch users how to get netctl to do the multiple
networks thing, they reported having used network-manager instead::

    yaourt -S networkmanager
    yaourt -S network-manager-applet
    yaourt -S gnome-keyring
    sudo systemctl enable NetworkManager.service
    sudo systemctl start NetworkManager.service

The `wiki page`_ on networkmanager explains how to set up permissions so users
without root can add networks, but that step solves a nonexistant problem for
me since I'm the only person who should be changing network configuration on
my laptop. 

Whenever I need to add a new network, I start ``nm-applet`` through dmenu and
add the network. When I'm at home or school, the networks I've already added
can autoconnect and I don't have to have the ``nm-applet`` icon cluttering up
my toolbar. 

Automatically Starting Stuff in Terminator and I3
-------------------------------------------------

The stuff to start is a terminal with the command to ssh to my VPS and
reconnect to my IRC screen, and Firefox.

Since you can't start terminator with a bash alias in the ``--command``
argument, and my irc alias is long and contains quotes itself, I've created a
custom Terminator profile for launching irc. Either my Google-fu is weak or
you can't have Terminator profiles inherit from one another, so I added a new
``[[irc]]`` profile to my ``.config/terminator/config`` file, with copies of
the settings I care about from my default profile::

  [[irc]]                                                                       
    scrollbar_position = hidden                                                 
    use_system_font = False                                                     
    cursor_shape = ibeam                                                        
    background_image = None                                                     
    show_titlebar = False                                                       
    color_scheme = green_on_black                                               
    font = Mono 10.5                                                            
    use_custom_command = True                                                   
    exit_action = hold                                                          
    custom_command = ssh -t -p XXXX me@myvps.net "screen -dr irc"

Note that the ``-t`` flag to SSH forces it forces it to allocate a psuedo-TTY,
preventing the ``Must be connected to a terminal`` error which would otherwise
occur. 

Adding the following lines to the start of ``~/.i3/config`` causes the desired
behavior when i3 is started::

    exec --no-startup-id i3-msg 'workspace 2; exec firefox'
    exec --no-startup-id i3-msg 'workspace 1; exec terminator -p "irc"'

Note that I exec firefox first and terminator second, so that the terminal
which needs my VPS password to be entered in order to reconnect to irc is in
the active workspace immediately after startup. 

As an added bonus, digging these commands out of my old config reminded me how
to automatically set a background image: Just add the following to
``~/.13/config``::
    
    exec feh --bg-scale ~/background.jpg

Making Terminator pick the right font size
------------------------------------------

The default font size that Terminator has been using causes my screen to be a
little under 160 characters wide. This causes the 80-character lines on which
I standardize my writing to wrap annoyingly, and means I have to manually zoom
out by one ``ctrl-minus`` in each pane when I split my terminal.

The fix is two lines in ``~/.config/terminator/config``:: 

    [profiles]                                                                      
      [[default]]                                                                   
        ...        
        use_system_font = False                                                     
        font = Mono 10.5

You have to manually override the default ``use_system_font=True`` setting for
any font changes in your terminator config to apply. After hearing `good
things`_ about the font Inconsolata, I gave it a try, but found that it looks
unpleasantly blurry at the small sizes that I prefer to use. I'm sure there's
a setting somewhere to fix that, but my needs are met equally well by
switching back to the Mono font as they would be by shaving the font display
yak.

The Results
===========

Based on IRC timestamps, it now takes me roughly 13 seconds and [ctrl+shift+e]
+ [laptop username] + [laptop password] + [vps password] of typing to kill X,
log in, automatically connect to available wifi, and reconnect to IRC. This is
an improvement over my previous process. 


.. _wiki page: https://wiki.archlinux.org/index.php/NetworkManager#Enable_NetworkManager
.. _good things: https://jargonsummary.wordpress.com/2010/12/25/changing-font-size-and-family-of-terminator/
.. _netctl: https://wiki.archlinux.org/index.php/Netctl#Basic_method
.. _ssh-agent tutorial: http://upc.lbl.gov/docs/user/sshagent.shtml
.. _arch wiki: https://wiki.archlinux.org/index.php/SSH_keys#ssh-agent_as_a_wrapper_program
.. _start X at login: https://wiki.archlinux.org/index.php/Start_X_at_login
.. author:: default
.. categories:: none
.. tags:: arch, i3, terminator, solved
.. comments::
