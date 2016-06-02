Removing Blackarch
==================

I installed `Blackarch`_ on top of my ordinary Arch install for `the Oregon
CTF`_ a few weeks ago. 

Now it's taking up a lot of space on my system and I no longer need it around.


None of the Google queries I've tried have discussed how to get rid of it, and
I've had to resort to reading the install script to figure out how to make its
repositories go away. Here's what I learned. 

.. more::

First, assuming that you used `strap.sh`_ to install all of the blackarch packages
like I did, you can uninstall them simply by chopping the package names out of
the list of all blackarch packages and instructing Pacman to remove them::

    $ pacman -Sl | grep blackarch | cut -f 2 -d " " | xargs sudo pacman -Rn

* ``pacman -Sl`` searches all of the package databases and lists their
  contents. The output will be of the form ``reponame packagename version``.
* ``grep blackarch`` narrows that list to only those packages with blackarch
  in their titles
* ``cut -f 2 -d " "`` says "I want only the second field, and fields are
  delineated by the space character". So far, we've selected the package name
  of each package whose listing contains the string "blackarch". 
* ``xargs`` executes the given command on each item in its standard in. The
  pipes (``|``) each attach stdout of the preceding command to stdin of the
  following one. Xargs is necessary here because Pacman takes its arguments
  only on the command line, and does not gracefully handle taking args on
  stdin. 
* ``pacman -Rn`` says "Remove the given package, and don't worry about backing
  up its files". I passed the ``-n`` flag because one of my main reasons for
  removing blackarch is to save space on my rather small SSD, so I don't want
  to keep around a bunch of backups for the configurations of programs I never
  ended up using. 


Even after removing all Blackarch packages, the Blackarch repository entry
remains in pacman.conf. To remove it, open ``/etc/pacman.conf`` and remove the 
blackarch repo, which will probably be the final two lines of the file. Those
lines will look something like this::

    [blackarch]                                                                     
    Server = http://mirror.team-cymru.org/blackarch/$repo/os/$arch  

And now it's gone. No more packages to update, and no more repo to check every
time updates get installed. 

.. _strap.sh: http://blackarch.org/strap.sh
.. _Blackarch: http://blackarch.org/
.. _the Oregon CTF: http://oregonctf.org/
.. author:: E. Dunham
.. categories:: none
.. tags:: arch, blackarch
.. comments::
