Searching a FOSS project's history
==================================

I'm curious about whether anyone has tried to build a predictive analytics
plugin for Heka before. To find out, I'm going to stalk the project's entire
recorded history. Since it's a relatively young project (only in its third
year of having a public mailing list), the history is small enough for basic
Linux command-line utilities to handle in a timely manner. 

Here are all the places one can look for project history, and how I used them.

.. more::

Find the Communication Channels
-------------------------------

FOSS projects communicate on IRC, issue trackers, and mailing lists. Sometimes
contributors also discuss things on the phone, via private messages, during
video games, and in person. Although the latter type of interactions are
rarely publicly documented, most of content that's important to a project is
shared with all of its members, and thus easy for even a new contributor to
find. 

When you want a particular piece of information, the question to ask is "if I
was the person who created that information, where would I have put it?"

Find the project's documentation on how to get involved and where to ask
questions. On the front page of the `Heka docs`_, it suggests a mailing list,
issue tracker, github project, and IRC channel. 

Searching the Mailing List Archives
-----------------------------------

Heka's `mailing list archives`_  don't explicitly offer a search feature.
Fortunately, the archives are not overwhelmingly large, so I can just download
them and search them locally. 

Downloading the archives
************************

Examining the page source reveals that the ``.txt.gz`` archives have nicely
standardized names, which allowed me to craft a slightly verbose wget command
to retrieve them all::

 wget https://mail.mozilla.org/pipermail/heka/201{3,4,5}-{January,February,March,April,May,June,July,August,September,October,November,December}.txt.gz

I suspect there's a recursive wget command which would grab all ``.txt.gz``
links from a specified index page, but I didn't know it off the top of my head
so I'll save the rabbit hole of crafting the shortest possible incantation for
later. The command above was fast to research and write, and got all the
tarballs I wanted, so it accomplished its purpose. 

Unzip
*****

After that wget, I have a directory full of ``.txt.gz`` files. I unzip them:: 

 gzip -d *

Grep
****

Now it's easy to look for any keywords that might go with the information I'm
seeking::

 grep -i "predict" *

Searching the Source Code
-------------------------

Since the GitHub link was given in the `heka docs`_, it's trivial to clone a
copy and search for keywords throughout the source and comments::

 git clone git@github.com:mozilla-services/heka.git
 cd heka
 git grep -i predict

Searching the Commit History
----------------------------

The ``git grep`` command used above is designed to search only in the tree and
index, so Git's metadata is left out. If you do a regular recursive grep on a
Git repo, you can get a bunch of redundant or spurious matches from Git's
commit history. 

When it's time to intentionally search the commit history, Git has a tool for
that too::

 git log -S"predict"

The output of the ``git log`` command will by default be a list of commits,
with hash, author, date, and short message. For more detail on a commit, just
``git show`` the hash::

 git show ea2b3c9f12f7f046be9b3bc133ee3eda90e16306

Searching the Issue Tracker
---------------------------

Luckily, the terms I'm searching for are simple case-insensitive strings, so I
can use the search box on the project's `GitHub issue tracker`_. 

If I needed to search with a regular expression, or simply wanted a local copy
of the issue database, my options would be to use a pre-made `GitHub backup
tool`_ or the `API`_.

Seek IRC history
----------------

Some channels are logged publicly. It's always worth a try to join the channel
and examine the ``/topic`` for any hints. IRC channel topics are also good
places to find a community-specific pastebin or etherpad, both of which could
potentially contain information relevant to your search. 

Also, Google.
-------------

In my case, Google helped find several repositories of Heka plugins, on which
I repeated the issue tracker and source code search steps. Google is also the
best way of finding a project's official blog, or simply individual blogs
about the project, if those are available. 

.. _API: https://developer.github.com/v3/issues/
.. _GitHub backup tool: https://github.com/joeyh/github-backup 
.. _GitHub issue tracker: https://github.com/mozilla-services/heka/issues
.. _mailing list archives: https://mail.mozilla.org/pipermail/heka/ 
.. _heka docs: https://hekad.readthedocs.org/en/v0.8.2/index.html
.. author:: default
.. categories:: none
.. tags:: none
.. comments::
