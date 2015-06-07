Playing with Ansible
====================

Although I currently expect that I'll end up choosing Salt for work, I've
gotten `nerdsniped <https://xkcd.com/356/>`_ by the apparent simplicity and
power of Ansible. Since I'm trying to make a habit of narrating my first
encounters with various tools, here's a short novel. 

.. more:: 

Starting Out
------------

Google hands me the `intro doc
<http://docs.ansible.com/intro_getting_started.html>`_ right away. I noticed
this when researcing my config management comparison post as well -- Googling
for a given topic results in more useful docs and less marketing with Ansible
than CFEngine, Puppet, or Chef. 

I install Ansible with ``yaourt -S ansible``. This installs it::

    $ ansible --version
    ansible 1.9.1
      configured module search path = None

I wonder what that search path info is for... I'm sure the docs will tell me
when I need it. 

So, I need an ``/etc/ansible/hosts`` First, I need a host to put in it. Since
I use DigitalOcean for my VPS and have some free credit lying around from the
`GitHub Education Pack <https://education.github.com/>`_, I go spin up a
$5/month droplet to play with. I make sure to check the box to add my SSH key,
and add the key to my agent locally, to avoid hassles in the future. 

Write ``/etc/ansible/hosts``
----------------------------

I grab the droplet's IP address from `the digitalocean console
<https://cloud.digitalocean.com/droplets>`_, then I drop it into
``/etc/ansible/hosts``. I wonder for a minute whether there's any way to alias
the host or generally refer to it by something more friendly than an IP
address, thn I remember that there ways of grouping hosts in order to address
them and the tutorial gets to that later on. 

Oh yeah, and I did that thing I always do and forgot to open the file in
``/etc/`` with sudo, hitting that familiar error::

    E45: 'readonly' option is set (add ! to override)  

The fix is to write with::

    :w !sudo tee %

This says "write the file; shell out to ``sudo tee``, give it the contents of
the whole file (``%``) as an argument" (thanks `stackoverflow
<http://stackoverflow.com/questions/2600783/how-does-the-vim-write-with-sudo-trick-work>`_! 

Ping the Host(s)
----------------

Next tutorial step is ``ansible all -m ping``. I fumbled the typing on the
first try, and learned something from the error::

    $ ansible all -m png
    162.243.134.126 | FAILED => module png not found in configured module paths

This tells me that the ``-m ping`` is actually running a module on it. I took
a look at the `source <https://github.com/ansible/ansible>`_ to see if the
ping module is easy to find to read, but I'm not familiar enough to know
exactly where to find it. A bit more clicking around suggests it's probably
somewhere in `here <https://github.com/ansible/ansible-modules-core>`_. Oh
hey, I found it! It's only in like the `second place I checked
<https://github.com/ansible/ansible-modules-core/blob/devel/system/ping.py>`_.
It's short and easy to read. The docstring is pretty interesting; the
``C(path)`` syntax appears to be some kind of cross-referencing directive. So
we make a module with some boilerplate in it, import the basic utils, then
blindly call ``main()``. This is totally something I could write if I needed
to. 

So, when I spell ``ping`` correctly, I get::

    $ ansible all -m ping
    The authenticity of host '162.243.134.126 (162.243.134.126)' can't be
    established.
    ECDSA key fingerprint is
    SHA256:pMoI7FvPgBiFqosItd7rmlHABpiKWBToM/asCOgbAh8.
    Are you sure you want to continue connecting (yes/no)? 

and then tell it yes. Cool story, standard SSH stuff. 

And then... ::

    $ ansible all -m ping
    162.243.134.126 | FAILED => SSH Error: Permission denied
    (publickey,password).
    while connecting to 162.243.134.126:22
    It is sometimes useful to re-run the command using -vvvv, which prints
    SSH debug output to help diagnose the issue.

Well okay then, I guess that makes sense considering that the user on the 
remote box is root and locally I'm edunham. Let's see... I could totally look
this up, but let's blindly guess that the ``-u`` flag is what's necessary...::

    $ ansible all -u root -m ping
    162.243.134.126 | success >> {
        "changed": false, 
        "ping": "pong"
    }

Ah-ha, it behaves like a proper little Unix utility with guessable flags! Good
social engineering tactic there, Ansible, making me feel all clever... 

Let's install a thing!
----------------------

With this initial success, I'm going to deviate from the tutorial a bit and
see how Ansible handles trying to install a package from source. I've decided
to build a mockup of ``play.rust-lang.org``, since it's one of the SPOFs
that's scaring me the worst about Rust's infrastructure at the moment. It's an
Arch box that hasn't been updated in a while, running Arch because this tool
called `playpen <https://github.com/thestinger/playpen>`_ comes packaged for
Arch but you have to biuld it yourself on Ubuntu. (Yes, the devs were doing
the ops work before I got there). 

So, I want to install playpen from source. First, I guess, I should probably
install Git from the package manager, so that Ansible can clone playpen. 

The tutorial's next step is to run an echo command, so I guess I could
repurpose it into an apt-get command, but that seems very wrong. Let's see
what's next... 

The `inventory <http://docs.ansible.com/intro_inventory.html>`_ section of the
intro comes next, and it explains how to name groups of hosts. Turns out that
happens in ``/etc/ansible/hosts`` as well... I'd really rather not keep the
metadata on how things are grouped up over in ``/etc/``. I feel like it might
be better to put the inventory in the config repo... and `stackoverflow
<http://stackoverflow.com/questions/21958727/where-to-store-ansible-host-file-on-osx>`_
points out that one can pass the ``-i`` flag to specify a custom inventory
location. The best practices doc (thank you, Ansible, for having a best
practices doc that's actually easy to find) has a section on `content
organization
<https://docs.ansible.com/playbooks_best_practices.html#content-organization>`_,
which on the one hand doesn't say much about keeping a copy of the hosts file,
but on the other hand reassures me by not forbidding it either. I'm just a
little bit worried about keeping the grouping metadata of the hosts file from
getting lost, since running commands on the *correct* hosts is a core feature
of any good CM tool. 

So, change workflow a little::
    
    $ cp /etc/ansible/hosts ~/repos/toy-ansible/hosts
    $ cat hosts 
    [server]
    play ansible_ssh_host=162.243.134.126
    $ ansible play -u root -m ping -i hosts 
    play | success >> {
        "changed": false, 
        "ping": "pong"
    }

Okay, now I can keep this metadata in the repository if I want to. Still not
totally sure what best practices will be here for my particular use case;
maybe using DNS; maybe storing the exact IPs in a file that never gets
committed but leaving hosts as a skeleton to document what goes where if
anyone else tries to set up a copy; maybe publishing it and just trusting AWS
firewall to do what i tell it to. Because if ansible gets run from or via the
bastion, I can leave SSH access just as locked down as it's always been. 

So. One PR to `fix confusing wording
<https://github.com/ansible/ansible/pull/11194>`_ later, I'm back to figuring
out the next file to stick in my repo to explain to the Ansible world that
this "play" host needs to have Git installed on it. 

...okay, that's a lot of ``/etc/ansible/whatever`` files and dirs in the
tutorial. Maybe I'm supposed to be keeping all of ``/etc/ansible`` in Git,
rather than my arbitrary repos place? Maybe there's some prefix in an
environment variable that I can set so I odn't have to keep passing ``-i``
every time? 

Okay, tutorial. All this stuff about managing many hosts is cool and I'll come
back to it later, but can we get on with the single host case already?

And no, tutorial, I do NOT want to learn about ad-hoc commands before
playbooks. Okay, you can shut everything down on Christmas, but that will make
people Quite Unhappy. I want to live in a world where special snowflakes and
one-offs are always a bad thing, so I'm jumping straight to the `playbooks
<http://docs.ansible.com/playbooks.html>`_ section. 


Playbooks
---------

Ok, so I'm just really bad at recognizing YAML. I claimed elsewhere that I
didn't recognize the syntax of Ansible playbooks, which is true, but that's my
fault and not theirs. 

Their sample playbook makes sense! Let's try writing something of my own... oh
wait, I don't know what file extension nor location it belongs with. Fine,
guess I've gotta actually keep reading the docs for awhile. 


.. author:: default
.. categories:: none
.. tags:: ansible, let's play
.. comments::
