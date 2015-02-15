Persistent Irssi on DigitalOcean
================================

Here's a post I've been meaning to get around to for months: How to set up IRC
on your very own DigitalOcean droplet. 

.. more::

The Hosting Provider
--------------------

I personally keep my `VPS`_ on DigitalOcean because it's pretty cheap and
reliable. The web interface is clean, modern, and eminently usable, and the
community documentation is outstanding. 

I'd recommend DigitalOcean for the community documentation alone if this is
your first time hosting your own server, in the way that I recommend Ubuntu
derivatives as a first Linux distribution because the community and forums
have questions and answers with wording that'll make sense to a less
experienced sysadmin. 
                                                                         

The Price
---------

The smallest virtual servers ("droplets", in DigitalOcean terminology) cost
$5/month USD. That's about the cost of the couple of cups of fancy coffee
you'll forget to go buy because you're so busy chatting with your friends
online, so not too bad. 

If you're a student, you can get $100 of DigitalOcean credit as well as a
bunch of other cool stuff from `GitHub's education pack`_. 

Do I need a domain name?
------------------------

Not for IRC. To keep it simple, I won't go into depth on reverse DNS on IRC
networks in this tutorial. 

Signing up for DigitalOcean
---------------------------

Go to `digitalocean.com <https://www.digitalocean.com/>`_, enter your email
address and desired password, and hit 'create account'. Follow the steps to
set up your account, and you'll end up on a page entitled 'Droplets'. 

Create an SSH key
-----------------

Without SSH keys, you will have to log into your droplet with a root password
that you get via email, which is several different kinds of insecure all at
once. If you're not familiar with SSH keys, don't be afraid. 

TODO: Windows, Mac, Linux ssh keygen


Spin up a droplet
-----------------

In the upper right of the `main page
<https://cloud.digitalocean.com/droplets>`_, click the big blue "Create
Droplet" button. 

The hostname you put into the "name your droplet" box will be visible to other
users on IRC unless you have a cloak, so choose something reasonable.

Select the $5/month size. 

Select the region nearest where you expect to connect from most frequently.

You don't need to check any of the extra boxes under "available settings". 

Under "Select Distribution", go with Ubuntu unless you have a preference
otherwise. I tried CentOS before making my Ubuntu droplet and was reminded of
how out-of-date all of its packages are. Additionally, a lot of the best "I'm
new, what's this?" type of documentation is targeted at Ubuntu users (though
it usually works on Debian as well).

Optional: Secure SSH
--------------------

If you'd like to trade a few minutes of effort now for improved security over
the life of your VPS, the CentOS Wiki has an `excellent tutorial on securing
SSH <http://wiki.centos.org/HowTos/Network/SecuringSSH>`_ whose advice applies
just as well to any other Linux distro.

Optional: Set up UFW
--------------------

Uncomplicated Firewall is also not strictly necessary but a wise idea to set
up. Follow the `DigitalOcean tutorial on UFW
<https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server>`_
to configure your droplet to deny the traffic that you don't need. 

Install Irssi and Screen
------------------------

I personally use Irssi because I like its default settings and dislike
Weechat's poor documentation. However, if writing IRC client extensions in a
language other than Perl is important to you, Weechat would probably be a
better choice. 

::

    $ apt-get install irssi
    $ apt-get install screen

Start Irssi in Screen
---------------------

Normally when you SSH into a server and start a program, the program will be
halted when you disconnect. Screen is a utility that lets you prevent that
behavior. 

You SSH into a server, start a screen, and then the screen keeps running for
as long as the server does. You can disconnect from and reconnect to the
screen whenever you like, and whatever is running within it will keep going
regardless of whether you're connected. 

You might want to check out my post on `starting Screen and Irssi
automatically <http://edunham.net/2015/02/15/starting_screen_irssi_at_boot.html>`_.

Connect to Freenode
-------------------

In Irssi, run the command ``/connect irc.freenode.net``. 

Choose a nickname
-----------------

Some permutation of your first and last names or initials is the safest bet
for professional involvement. Remember that your nickname is the first
impression that you make when you join a channel -- be as careful of its
implications as you would of the design on a garment you wear to a job
interview. 

To change your nick, use the command ``/nick newname``. 

Register your nick on Freenode
------------------------------

To register your nick, you'll need a password and an email address. This
password might appear in plaintext sometimes, so don't use a password that you
use on any other site. 

First, when your name is set to the nick you want to register, ``/msg nickserv
register password email@address.tld``. Nickserv will respond with either an
error message or a confirmation that an email was sent. 

Check your email, and you should have a message with a unique code to confirm
the address. Copy the line that starts with ``/msg nickserv`` from the email
and paste it into your status buffer. 

Paste it into your status buffer and not into a channel because if you had a
space before the first ``/``, the message will be sent to whatever channel you
enter it in instead of creating a private query. The confirmation code does
not allow anyone to hijack your account, but pasting it in a channel makes you
look incompetent. 

Hide your IP address with a cloak
---------------------------------

If you're affiliated with a project that has cloaks, ask one of the project
administrators whether you qualify for one. 

If you don't qualify for a cloak, join ``#freenode`` (while identified to the
account you want cloaked) and request a cloak. Sometimes you might have to ask
several times before a staff member sees your request. Be patient and polite. 

Configure Irssi to automatically connect
----------------------------------------

See my post on `automating Irssi
<http://edunham.net/2015/02/16/automating_irssi.html>`_ for details and links
on how to automatically connect to networks, auto-join channels, restore
channel positions when Irssi starts, ignore unwanted messages, and other neat
stuff. 

Configure logging
-----------------

The command ``/set autolog on`` will cause Irssi to automatically log
everything, saving it to an ``irclogs`` directory in your homedir. This is
extremely useful for finding links and other information in backscroll, and
helps create the illusion of having perfect memory.

Save your configuration
-----------------------

The ``/save`` command will save any changes you've made to Irssi's
configuration. Remember to use it! As with any command, you can get more
information with ``/help save``. 

.. _VPS: http://en.wikipedia.org/wiki/Virtual_private_server
.. _GitHub's education pack: https://education.github.com/
.. author:: default
.. categories:: none
.. tags:: irc, digitalocean, irssi
.. comments::
