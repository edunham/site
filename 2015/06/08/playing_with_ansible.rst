Playing with Ansible
====================

Although I currently expect that I'll end up choosing Salt for work, I've
gotten `nerdsniped <https://xkcd.com/356/>`_ by the apparent simplicity and
power of Ansible. Since I'm trying to make a habit of narrating my first
encounters with various tools, here's a short novel of 0 through cloning a
repo.

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
<http://stackoverflow.com/questions/2600783/how-does-the-vim-write-with-sudo-trick-work>`_!)

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

The Next Day
============

So, I come back and find the `playbooks tutorial
<http://docs.ansible.com/playbooks_intro.html>`_ conveniently open in a tab.
Cool, that's what to put in a playbook... but what do I call it? Dig around
for best practices, don't find any, file `another bug
<https://github.com/ansible/ansible/issues/11204>`_, call it ``server.yml``
because who cares. Guess from the sample playbook how to translate from Yum to
Apt.

install Git
-----------

We're going to jump right into trying to install Playpen from source, because
I find I learn the most from doing things wrong.

First, I'll try to install Git. From the tutorial, I'm guessing this should
work::

    ---
    - hosts: play
      remote_user: root
      tasks:
      - name: install Git
        apt:
            pkg=git
            state=latest

Now, the right thing to do here would be see whether it runs, but I'm going to
do the wrong thing and try to figure out how to install Playpen from source as
well. Let's just pretend that changing too many things at once is a test of
the quality of those inevitable error messages I'm going to induce.

shave a yak and install known_hosts
-----------------------------------

There's a post about `installing redis
<https://groups.google.com/forum/#!topic/ansible-project/R4Ho-oqJf3o>`_ on the
Google group, and the guy who wrote most of Ansible chimes in with some advice
on best practices (though the thread is from 2013, so it may be totally
obsolete by now). Looking for the right way to do a ``git clone`` through
Ansible reveals that it `sometimes gets stuck
<http://www.tomaz.me/2013/10/14/solution-for-ansible-git-module-getting-stuck-on-clone.html>`_,
usually when ``known_hosts`` is missing. Looks like I get to learn how to put
a file in place, before learning to git clone.

I'm not totally sure if the boilerplate about ``ansible_ssh_user`` that I'm
copying is actually going to accomplish my goal, but we'll see when I run it.
Since I'm ``edunham`` on the machine where I'm running Ansible and ``root`` on
the remote system, it'll be obvious to which user that variable referred.

Now my ``server.yml`` looks like this::

    ---
    - hosts: play
      remote_user: root
      tasks:
      - name: install Git
        apt:
            pkg=git
            state=latest
      - name: Install known_hosts file
        copy:
            src=known_hosts
            dest=/home/${ansible_ssh_user}/.ssh/known_hosts
            owner=${ansible_ssh_user}
            group=${ansible_ssh_user}

I then moved my laptop's ``~/.ssh/known_hosts`` to a backup location, tried to
pull from github, added the key, and copied the now-much-shorter
``~/.ssh/known_hosts`` into my Ansible repo.

Trial and error and error
-------------------------

After putting my local backup back into place so my laptop knows more hosts
than just GitHub, it's time to see whether Ansible can apply that playbook::

    $ ansible-playbook server.yml

    PLAY [play]
    *******************************************************************
    skipping: no hosts matched

    PLAY RECAP
    ********************************************************************

Huh, I clearly did something wrong... Oh, that's right, it wouldn't know which
host ``play`` is because I moved the ansible ``hosts`` file into the repo!::

     $ ansible-playbook -i hosts server.yml

     PLAY [play]
     *******************************************************************

     GATHERING FACTS
     ***************************************************************
     fatal: [play] => SSH Error: Permission denied (publickey,password).
     while connecting to 162.243.134.126:22
     It is sometimes useful to re-run the command using -vvvv, which
     prints SSH debug output to help diagnose the issue.

     TASK: [install Git]
     ***********************************************************
     FATAL: no hosts matched or all hosts have already failed -- aborting


     PLAY RECAP
     ********************************************************************
     to retry, use: --limit @/home/edunham/server.retry
     play                       : ok=0    changed=0 unreachable=1    failed=0

And that would be a failure to add the relevant ssh key after reboot. I add
the ssh key to my agent, and this time it works::

    $ ansible-playbook -i hosts server.yml

    PLAY [play] *******************************************************************

    GATHERING FACTS ***************************************************************
    ok: [play]

    TASK: [install Git] ***********************************************************
    changed: [play]

    TASK: [Install known_hosts file] **********************************************
    failed: [play] => {"checksum": "926e119d8b84c44f4790c47436967ada72e05ba3", "failed": true}
    msg: Destination directory /home/${ansible_ssh_user}/.ssh does not exist

    FATAL: all hosts have already failed -- aborting

    PLAY RECAP ********************************************************************
               to retry, use: --limit @/home/edunham/server.retry

    play                       : ok=2    changed=1    unreachable=0    failed=1


Okay, the ``ansible_ssh_user`` stuff was indeed screwed up. If I Google a bit
more, I find that I actually skipped something importat in the `inventory
intro <http://docs.ansible.com/intro_inventory.html>`_: setting the user for
the host. So I add ``ansible_ssh_user=root`` to the hosts file, and try
again... and it fails again. Even when I substitute ``root`` for
``${ansible_ssh_user}`` in the playbook, it fails the same way. Looks like
it's not automatically creating the directory for me.

Create a directory
------------------

So, I get to make ``.ssh`` by hand. Cool story. So now that task looks like
this::

  - name: Install known_hosts file
    file:
        path=/home/${ansible_ssh_user}/.ssh/
        state=directory
        owner=${ansible_ssh_user}
        group=${ansible_ssh_user}
    copy:
        src=known_hosts
        dest=/home/${ansible_ssh_user}/.ssh/known_hosts
        owner=${ansible_ssh_user}
        group=${ansible_ssh_user}

for which I'm rewarded with the error ``ERROR: multiple actions specified in
task: 'file' and 'Install known_hosts file'``. So I give a separate name to
each action, try again, and get a new error::

    failed: [play] => {"failed": true, "gid": 0, "group": "root", "mode": "0755",
    "owner": "root", "path": "/home/${ansible_ssh_user}", "size": 4096, "state":
    "directory", "uid": 0}
    msg: chown failed: failed to look up user ${ansible_ssh_user}

At this point, since Google wasn't giving me helpful results in a timely
manner, I pinged a friend on IRC and he suggested an alternate syntax, which
works::

    ---
    - hosts: play
      remote_user: root
      tasks:
      - name: install Git
        apt:
            pkg=git
            state=latest
      - name: Create .ssh directory
        file:
            path=/home/{{ ansible_ssh_user }}/.ssh/
            state=directory
            owner={{ ansible_ssh_user }}
            group={{ ansible_ssh_user }}
      - name: Install known_hosts file
        copy:
            src=known_hosts
            dest=/home/{{ ansible_ssh_user }}/.ssh/known_hosts
            owner={{ ansible_ssh_user }}
            group={{ ansible_ssh_user }}

I'm glad it works like that, because it feels more like all the other
Python-flavored templating that I've touched (Flask, Django, etc.). And it's
definitely a Python habit, but I prefer brain damage.

I wonder if it'd be okay to put spaces around the ``=`` signs... one ``:%s/=/
= /g`` and an ``ansible-playbook`` invocation later, I find that adding spaces
causes it to fail with an erorr like::

    fatal: [play] => a duplicate parameter was found in the argument string ()

Not freaking helpful. But next time I see it, I'll recognize it as too many
spaces rather than just being totally confused.

Time to clone playpen
---------------------

Now I should, in theory, have the ability to clone a repo from github. Time to
test this hypothesis.... I'm starting by reading then copying from the `git
module docs <http://docs.ansible.com/git_module.html>`_.

Let's try it::

  - name: Clone Playpen
    git:
        repo=git@github.com:thestinger/playpen.git
        dest=/home/{{ ansible_ssh_user }}/playpen_source

And it fails, because it got a GitHub host key that wasn't recognized. I guess
there are actually several keys::

    # ssh-keygen -r github.com
    github.com IN SSHFP 1 1 7bc4945739c3552b9de0260f4524e05329587dea
    github.com IN SSHFP 1 2 b040403fc0992ef0bf9144d8aaa25049d8564839821eb592d7338399e456609c
    github.com IN SSHFP 2 1 ce76002677a077bf43dabb446a23e86bb127c8c3
    github.com IN SSHFP 2 2 858dec00d20192cf334f54c96cccd5900f4540c2975e5d24c8236c255618c10c
    github.com IN SSHFP 3 1 261f7e4445378789267eb92c744e9e0d32a5f98d
    github.com IN SSHFP 3 2 a4ca08ec5bcf801885aa8b08b5deeb9a51c006988a5814e833f6ac08e81b021f

In investigating which key I actually added to ``known_hosts``, I discover a
couple of worrisome things:

First, my initial fumbling managed to create a ``/home/${ansible_ssh_user}``
directory, which is empty. Ha ha, I guess? I've manually removed it.

Second, although Ansible claims to have installed the ``known_hosts`` file, I
can't actually see it. Actually after a bit more digging, it turns out that I
was just being dumb at Unix. The system has a ``/.ssh`` created by
DigitalOcean, which contains only my ``authorized_keys`` file. Ansible
successfully created the ``/home/root/.ssh/known_hosts`` file, but ``cd`` as
root takes you to ``/`` rather than to ``/home/root``. Duh.

Turns out that if I throw the ``known_hosts`` file into ``/.ssh``,
I can move on to the next error::

    failed: [play] => {"cmd": "/usr/bin/git ls-remote '' -h refs/heads/HEAD", "failed": true, "rc": 128}
    stderr: Permission denied (publickey).
    fatal: Could not read from remote repository.

    Please make sure you have the correct access rights
    and the repository exists.

    msg: Permission denied (publickey).
    fatal: Could not read from remote repository.

    Please make sure you have the correct access rights
    and the repository exists.

Should've been using the HTTPS url, since I don't want to add a public key
from this machine to anybody's github account, and I'll never need to push
back to the repo from my play server. 

Success!
--------

With that fix, it's now successfully changed! The working playbook looks like
this::

    ---
    - hosts: play
      remote_user: root
      tasks:
      - name: install Git
        apt:
            pkg=git
            state=latest
      - name: Create .ssh directory
        file:
            # The ansible_ssh_user is specified in the hosts file
            # For this host I'm using root, so .ssh location is special
            path=/.ssh/
            state=directory
            owner={{ ansible_ssh_user }}
            group={{ ansible_ssh_user }}
      - name: Install known_hosts file
        copy:
            src=known_hosts
            dest=/.ssh/known_hosts
            owner={{ ansible_ssh_user }}
            group={{ ansible_ssh_user }}
      - name: Clone Playpen
        git:
            repo=https://github.com/thestinger/playpen.git
            dest=/home/{{ ansible_ssh_user }}/playpen_source

Next Up
-------

My next steps will be to install the tools necesassary to build Playpen, and
get Ansible to build it. I probably won't keep up the "let's-play" blog style,
because it exponentially increases the amount of typing involved, and if you
read this far you're either a creepy stalker, thoroughly sick of hearing about
my flailing at Ansible, or possibly both. 

.. author:: default
.. categories:: none
.. tags:: ansible, let's play
.. comments::
