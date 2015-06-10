Installing Playpen on Ubuntu
============================

One of the more egregious inconsistencies in Rust's architecture is that
``play.rust-lang.org`` lives on an Arch box, while everything else is Ubuntu.
Before the team has a dedicated operations person, the argument for using Arch
was that `playpen <https://github.com/thestinger/playpen>`_ comes
`pre-packaged <https://www.archlinux.org/packages/community/x86_64/playpen/>`_
for it, whereas one has to build it oneself on Ubuntu.

But standardizing the infrastructure to one OS is a really cool thing to do,
since it requires that much less thought and effort to do any update that
affects every system (I'm looking at you, security patches).

.. more::

The Goal
--------

I want to install `playpen`_ on an Ubuntu host. For testing purposes, it's a
DigitalOcean droplet, but eventually it'll be an AWS EC2 instance.

Additionally, I'd like to automate the installation process to make it
repeatable. For this, I'm using `ansible <http://www.ansible.com/home>`_.

I'm currently using Ubuntu 15.04, since it has the ``libsystemd-dev`` package
available and I'll be updating to the 16.04 LTS when it comes out at the end
of 15.04's life anyways.

The Playbook
------------

::

    ---
    - hosts: play
      remote_user: root
      tasks:
      - name: Create .ssh directory
        file:
            # The ansible_ssh_user is specified in the hosts file
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
      - name: Install prerequisite packages for building playpen
        apt:
            pkg={{ item }}
            state=present
        with_items:
            - make
            - pkg-config
            - clang
            - libglib2.0-dev
            - gcc
            - libseccomp-dev
            - libsystemd-dev
      - name: Make Install Playpen
        # Note: Playpen requires Linux 3.8 or later. 3.16 counts as "later".
        command: make install
            chdir=/home/{{ansible_ssh_user }}/playpen_source/
            creates=/usr/local/bin/playpen

As I update it, you can see the changes `here
<https://github.com/edunham/toy-ansible/blob/master/playpen.yml>`_. It assumes
that you have a hosts file, which groups the hosts which need playpen
installed as ``play`` and specifies the ``ansible_ssh_user`` for them.

My hosts file currently looks like this::

    [server]
    play ansible_ssh_host=104.236.16.38 ansible_ssh_user=root

I apply the playbook like this::

    $ ansible-playbook -i hosts playpen.yml

Setup
-----

I create a DigitalOcean droplet, $5/month tier, specifying Ubuntu 15.04 LTS
and my SSH key.

I add the SSH key to my keyring with ``ssh-add ~/.ssh/keyname``.

I note the droplet's IP address in the DigitalOcean console, and edit my
Ansible hosts file to add it.

I attempt to SSH to root at that IP, to check that it's available and to
install Python (Ansible's only prerequisite on managed nodes). If I get a
``remote host identification has changed`` error, I run ``ssh-keygen -R <ip>``
to remove the old key. This is a pretty common error when you delete a droplet
then recreate another immediately, since DigitalOcean reuses IP addresses.

Run the Playbook
----------------

Once Python is installed on the DigitalOcean droplet and its IP is up to date
in my hosts file, I can install Playpen with::

    $ ansible-playbook -i hosts playpen.yml

Here's a closer look at what it does.  ::

    ---
    - hosts: play
      remote_user: root
      tasks:

This is Ansible boilerplate. It specifies which hosts to run the commands on,
what user to log into those hosts as, and then starts the list of tasks. The
commands I'd have to run by hand every time without Ansible are all listed in
the tasks section, whose breakdown follows.  ::

      - name: Create .ssh directory
        file:
            # The ansible_ssh_user is specified in the hosts file
            path=/.ssh/
            state=directory
            owner={{ ansible_ssh_user }}
            group={{ ansible_ssh_user }}

We're going to do a HTTPS clone from GitHub in a couple steps, but first we
need to tell the host to recognize GitHub's public SSH key. This is that "The
authenticity of host 'whatever' can't be established. Are you sure you want to
continue?" message that you get in the habit of blindly typing ``Y`` to during
the first time you interact with a given server from a clean install... But
you can't just type ``Y``, because it's all automated and awesome, so instead
we teach the server to recognize GitHub so the host isn't unknown. ::

      - name: Install known_hosts file
        copy:
            src=known_hosts
            dest=/.ssh/known_hosts
            owner={{ ansible_ssh_user }}
            group={{ ansible_ssh_user }}

The ``known_hosts`` file in my repo contains a copy of GitHub's public key.
The ``copy`` module simply copies a file from the Ansible repo over onto the
remote server. Now the server getting the install will recognize GitHub when
it tries to clone the Playpen repo, and we can continue. ::

      - name: Clone Playpen
        git:
            repo=https://github.com/thestinger/playpen.git
            dest=/home/{{ ansible_ssh_user }}/playpen_source

The ``git`` module works just like command-line git. This clones the repo, in
this case into ``/home/root/playpen_source`` because that seems like as good a
place as any to put it. ::

      - name: Install prerequisite packages for building playpen
        apt:
            pkg={{ item }}
            state=present
        with_items:
            - make
            - pkg-config
            - clang
            - libglib2.0-dev
            - gcc
            - libseccomp-dev
            - libsystemd-dev

I constructed the list of dependencies by trial and error: Cloned the repo on
a clean Ubuntu install, ran ``make install``, read the errors, installed the
dep that threw the error. Over and over. This is how it feels to be a log
tailer running in an infinite loop. But the good news is that since I did
this, you don't have to! Just copy my list of dependencies if you're lazy, or
try it yourself and you'll get the same thing.

The ``with_items`` directive in Ansible is pretty neat: it iterates over the
list it's handed, and runs the command (in this case, ``apt``) on every item.
It's a nice concise way to install a lot of stuff. ::

      - name: Make Install Playpen
        # Note: Playpen requires Linux 3.8 or later. 3.16 counts as "later".
        command: make install
            chdir=/home/{{ansible_ssh_user }}/playpen_source/
            creates=/usr/local/bin/playpen

This changes directory into ``/home/root/playpen_source/`` and runs ``make
install``. The bit about ``creates`` tells Ansible that
``/usr/local/bin/playpen`` gets generated by this command, so if that file
exists at the start of the run, Ansible doesn't need to bother re-doing the
entire ``make install`` step.

And there we have it!
---------------------

I'm still pretty new to Ansible, so if you have suggestions for improving this
script, `file an issue <https://github.com/edunham/toy-ansible/issues/new>`_
or email me, ``anything <at> edunham <dot> net``!

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
