Creating and deleting a Git branch named -D
===========================================

``git branch -D`` deletes a Git branch. Yet someone on IRC asked, "I
accidentaly got a git branch named ``-D``. How do I delete it?". I took this
as a personal challenge to create and nuke a ``-D`` branch myself, to explore
this edge case of one of my favorite tools.

.. more::

Making a branch with an illegal name
------------------------------------

You create a branch in Git by typing ``git branch branchname``. If you type
``git branch -D``, the ``-D`` will be passed as an argument to the program by
your shell, because your shell knows that all things starting with ``-`` are
arguments.

You can tell your shell "I just mean a literal ``-``, not an argument" by
escaping it, like ``git branch \-D``. But Git sees what we're up to, and won't
let that fly. It complains ``fatal: '-D' is not a valid branch name.``. So
even when we get the string ``-D`` into Git, the porcelain spits it right back
out at us.

But since this is Unix and Everything's A File(TM), I can create a branch with
a perfectly fine name to get through the porcelain and then change it later.
If I was at the Git wizardry level of `Emily Xie
<https://github.com/emilyxxie/gits_guts_commands>`_ I could just write the
files into ``.git`` without the intermediate step of watching the porcelain do it
first, but I'm not quite that good yet.

So, let's make a branch with a perfectly fine name in a clean repo, then swap
things around under the hood::

    $ mkdir dont
    $ cd dont
    $ git init
    $ git commit --allow-empty -am "initial commit"
    [master (root-commit) da1f6b6] initial commit
    $ git branch
    * master
    $ git checkout -b dashdee
    switched to a new branch 'dashdee'
    $ git branch
    * dashdee
      master
    $ grep -ri dashdee .git/
    .git/HEAD:ref: refs/heads/dashdee
    .git/logs/HEAD:da1f6b67446e83a456c4aeaeef1e256a8531640e da1f6b67446e83a456c4aeaeef1e256a8531640e E. Dunham <github@edunham.net> 1476402564 -0700    checkout: moving from master to dashdee
    $ find -name dashdee
    ./.git/refs/heads/dashdee
    ./.git/logs/refs/heads/dashdee

OK, so we've got this ``dashdee`` branch. Time to give it the name we've
wanted all along::

    $ find .git -type f -print0 | xargs -0 sed -i 's/dashdee/\-D/g'
    $ mv .git/refs/heads/dashdee .git/refs/heads/-D
    $ mv .git/logs/refs/heads/dashdee .git/logs/refs/heads/-D

Look what you've done...
------------------------

Is this what you wanted?::

    $ git branch
    * -D
      master

You are really on a branch named ``-D`` now. You have snuck around the
guardrails, though they were there for a reason::

    $ git commit --allow-empty -am "noooo"
    [-D 18dac23] noooo

Try to make it go away
----------------------

::

    $ git branch -D -D
    fatal: branch name required

It won't give up that easily! You can't escape::

    $ git branch -D \-D
    fatal: branch name required
    $ git branch -D '-D'
    fatal: branch name required
    $ git branch -D '\-D'
    error: branch '\-D' not found.

Notice the two categories of issue we're hitting: In the first 2 examples, the
shell was eating our branch name and not letting it through to Git. In the
third case, we threw so many escapes in that Bash passed a string other than
``-D`` through to Git.

As an aside, I'm using Bash for this. Other shells might be differently quirky::

    $ echo $0
    bash
    $ bash --version
    GNU bash, version 4.3.46(1)-release (x86_64-pc-linux-gnu)
    Copyright (C) 2013 Free Software Foundation, Inc.
    License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

    This is free software; you are free to change and redistribute it.
    There is NO WARRANTY, to the extent permitted by law.

Succeed at making it go away
----------------------------

Bash lets me nuke the branch with::

    $ git branch -D ./-D
    Deleted branch ./-D (was broken).

    $ git branch
    master

However, if your shell is not so eaily duped into passing a string starting
with ``-`` into a program, you can also fix things by manually removing the
file that the ``branch -D`` command would have removed for you::

    $ rm .git/refs/heads/-D
    $ git branch
      master

Clean up
--------

::

    $ cd ..
    $ rm -rf dont

Please don't do this kind of silly thing to any repo you care about. It's just
cruel.

.. author:: E. Dunham
.. categories:: none
.. tags:: git, bash
.. comments::
