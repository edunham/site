Starting screen+irssi at boot
=============================

Installing security updates isn't always enough to apply them; you have to
reboot from time to time if you want the benefit of any kernel upgrades that
don't use `live patching`_. 

There's also a small chance that my hosting provider might reboot my VPS
unexpectedly (though I've never had that happen in almost a year of using
DigitalOcean). 

In both cases, I would like my IRC client to get back online as soon as it can
after reboot. 

.. more::

The Easy Way
------------

Create a script in your homedir for starting screen with your desired
settings::

    $ cat ~/startscreen.sh
    #! /bin/bash
    screen -dmS irc bash -c '/usr/bin/irssi'

The first line of the script tells your system to run it with bash. The screen
command says: 

* ``-dm`` tells screen to start in detached mode.
* ``-S irc`` means that the session will be named ``irc``, which is hard-coded
  into a couple of scripts I use to automatically connect to it.
* ``-c /usr/bin/irssi`` tells screen to start irssi in the newly created
  session.

As root, add the following line to ``/etc/rc.local``, substituting the correct
value for ``username``::

    su - username -c "/home/username/startscreen.sh"

Leave ``exit 0`` as the last line in the file. 

``rc.local`` is automatically run at the end of each multiuser runlevel, which
makes it useful for starting programs at boot. 

Without Root
------------

Let's say that you want to get the above behavior on a system to which you do
not have root access. 

Hypothetically, one should be able to just drop the line ``@reboot
/usr/bin/screen -dmS irc -c "/usr/bin/irssi"``  or ``@reboot
/home/username/startscreen.sh`` into one's crontab (``crontab -e``), where it
would be executed at startup. This works for most scripts, but screen doesn't
like to start when it's not attached to a terminal. 

The most common workaround for this, in an *"if it's stupid but it works, it's
not stupid"* kind of way, is to SSH to localhost and then start screen.
Fortunately, a helpful user named znx typed up the instructions for that
process `here`_. Here's a summary, if you're on a new install with no
authorized keys set yet:: 

    $ ssh-keygen # accept all defaults
    $ cp ~/.ssh/id_rsa.pub ~/.ssh/authorized_keys
    $ vim ~/.ssh/config
        Host lo
            HostKeyAlias localhost
            HostName localhost
            IdentityFile /home/username/.ssh/id_localhost
            User username
            Port 22
    $ ssh lo # accept the key this first time
    $ crontab -e # add following line and save
        @reboot ssh lo /home/username/startscreen.sh

With systemd
------------

Check out `mythmon's writeup`_ with how to make your own systemd services and
configure them to run automatically. 

I haven't tried this yet myself, but I expect that any problems repeating it
with screen would be most likely to happen when trying to start a detached
screen without a terminal, and could be circumvented by the ssh-to-localhost
method described above. 

What next?
----------

Having Irssi running is cool, but only really useful if it's connected to
the right newtorks and channels. The `irssi docs`_ and `freenode sasl
guide`_ contain all the necessary information. 


.. _mythmon's writeup: http://www.mythmon.com/posts/2015-02-15-systemd-weechat.html
.. _freenode sasl guide: https://freenode.net/sasl/sasl-irssi.shtml
.. _irssi docs: http://irssi.org/beginner/
.. _here: http://www.linux-noob.com/forums/index.php?/topic/2421-start-screen-irssi-on-boot/#entry11892
.. _live patching: http://linux.slashdot.org/story/15/02/12/1853215/live-patching-now-available-for-linux
.. author:: E. Dunham
.. categories:: none
.. tags:: screen, irssi, digitalocean, irc
.. comments::
