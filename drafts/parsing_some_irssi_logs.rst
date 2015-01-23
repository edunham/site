Parsing some Irssi logs
=======================

In a conversation about how to determine who counts as active members of the
OSU Linux Users Group, Mythmon created a quick summary of who has talked in
the ``#osu-lug`` channel on Freenode this year. Sorted by date, it's available
`here`_. It reminded me that I meant to analyze user participation in the
channel for average line length, among other factors. 

Here are a few notes to myself about the yaks I shaved along the way. 

.. more::

Getting logs off my DigitalOcean droplet
----------------------------------------

To make myself a less convenient target for the bad guys on the internet, I
have moved SSH to a nonstandard port on my VPS, along with a few other
precautions. Since sftp is basically just ftp over ssh, I figured something
like my usual command would probably get me in if sftp was enabled, so I
tried ``sftp -p nnnn username@edunham.net``::

    ssh: connect to host nnnn port 22: Invalid argument

Haha, nope, wrong syntax. Oh right, there's that other syntax, ``sftp
username@edunham.net:nnnn``, looks like specifying a port number, right? It
fails silently, so maybe there's something wrong on the server side.


My next guess was that maybe my ssh configuration was overly strict, but the
line::

    Subsystem sftp /usr/lib/openssh/sftp-server

was present in ``/etc/ssh/sshd_config``. I rechecked the ``sftp`` man page,
and delightfully enough, it expects the port number to be specified with
``-P`` rather than ``-p``::

    sftp -P nnnn username@edunham.net

and I've got logs. So far so good.

Getting color codes out of the logs
-----------------------------------

It seems I went through a phase of being overly adventurous with Irssi's log
formatting settings, so my logs going back to September are a bit of a mess.
Time and date stamps are inconsistent, and there are chunks that have a bunch
of nasty control characters in them, like::

    22:30 ^D8/<^Dg ^Dgpop_n_fresh^Dg^D8/>^Dg ^Dels
    22:30 ^D8/<^Dg@^Dghamper^Dg^D8/>^Dg ^Desl

The regex ``%s/\x03//g`` in Vim got the nasty ``^D`` characters out, despite
the fact that `stackoverflow`_ claimed it was actually for ``^C``. 

Stripping joins, parts, and other notifications
-----------------------------------------------

I keep joins and parts on in the lug channel, since we have a large population
of newbies and it's always good to know whether they fell out of the room
immediately before their questions were answered. Additionally, the hostmasks
in join and quit messages contain ONID usernames when students use the
university's provided shell, so it can be a convenient way of associating a
nick with a peer I know from class. 

The log I'm working with is small enough to handle comfortably with Vim, or
else I'd run similar regex on it with a real tool like sed. Lines representing
notifications contain a bunch of digits and punctuation (the timestamp), then
``- ! -``, so let's delete them::

    :g/^[0-9: -]*-!- .*$/d

Now I'm left with lines containing a varied mix of numbers and punctuation, a
nick, and a message::

    21:56 < frostsnow> Thank you, though                                            
    2015-01-21 16:55:02< bryon> good luck                                           

Since timestamps are irrelevant, strip them out. Also remove the space or hat
preceding a nick, since that's irrelevant to this analysis::

    :s/^.*<.//g






.. _stackoverflow: http://stackoverflow.com/questions/970545/how-to-strip-color-codes-used-by-mirc-users
.. _here: http://pastebin.mozilla.org/8301662
.. author:: default
.. categories:: none
.. tags:: none
.. comments::
