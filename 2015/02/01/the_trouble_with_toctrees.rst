The Trouble with Toctrees
=========================

It's a couple weeks and nearly a dozen posts into this Tinkerer experiment, I'm
mostly delighted with it. It's fulfilling its original promise of "write RST,
push button, get pretty blog"... Mostly. There's one problem, though. `I`_
`constantly`_ `forget`_ to add master.rst when committing. 

.. more::

What happens when you forget to ``git add master.rst`` before committing a new
post? The post's identifier, which got added to the toctree in ``master.rst``
when you said ``tinker --post``, doesn't end up in the ``master.rst`` on the
remote server! When you build a sphinx site, only those pages which exist in
some toctree somewhere get links to them. This is the correct behavior, for if
Sphinx tried to auto-detect new pages, it might not make the right guess about
which toctree to include them in. 

However, the inconvenient consequence is that ``master.rst`` has to be
manually added to source control. I didn't touch it to create the post, so I
forget that I have to touch it to successfully push my changes. I firmly
believe that files created by my tools and their sources created by me are
fundamentally different -- the former should never live in version control and
the latter should (almost) always. ``master.rst``, with its changes coming
from a side effect of my manually creating a file, has been in a nasty limbo
between the two states. 

The solution is a `quick and dirty Python script`_ which regenerates
``master.rst`` whenever it's called. The call to this script adds a single
line to the chain of tools which constitutes my "push button, get website
update" command, and will save me many cumulative hours of annoyance and
troubleshooting over the lifetime of my blog. 

Since automatic sorting would always put my pages into alphabetical order,
I've solved the problem before it occurrs by renaming my pages into the form
``01about.rst``, and configuring the script to sort them by casting the first
2 characters of the page name to an int. 

For my use case, remembering to preface my few pages' filenames with the place
in the list where they belong is a small price to pay for privilege of not
feeling stupid due to forgetting to add an unrelated file every time I push a
blog update.

.. _quick and dirty Python script: https://github.com/edunham/site/blob/master/build.py
.. _I: https://github.com/edunham/site/commit/2d9f1115d63c7dde161278da692822d0183c3766
.. _constantly: https://github.com/edunham/site/commit/e676a58df8d6eff46f9176af089650b583c661c9
.. _forget: https://github.com/edunham/site/commit/d043a4b666285ad55440969ca5806c17bda71697

.. author:: default
.. categories:: none
.. tags:: tinkerer
.. comments::
