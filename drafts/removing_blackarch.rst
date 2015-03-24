Removing Blackarch
==================

I installed `Blackarch`_ on top of my ordinary Arch install for `the Oregon
CTF`_ a few weeks ago. 

Now it's taking up a lot of space on my system and I no longer want to have it
around. None of the Google queries I've tried have discussed how to get rid of
it, and I've had to resort to reading the install script to figure out how to
make its repositories go away. Here's what I learned. 

.. more::


    $ pacman -Sl | grep blackarch | cut -f 2 -d " " | xargs sudo pacman -Rsn

To search for blackarch in only the installed packages::

    $ pacman -Q

    $ pacman -Rsn



.. author:: default
.. categories:: none
.. tags:: none
.. comments::
