Adventures in Mercurial
=======================

I adore Git, but have needed to ramp up my Mercurial (Hg) skills recently to
dig prior work related to my current tasks out of a repo's history. Here are
some things I'm learning:

Command Equivalences
--------------------

As `this tutorial
<https://web.archive.org/web/20150204065617/http://mercurial.selenic.com/wiki/GitConcepts>`_
so helpfully explains, the two VCSes aren't all that dissimilar under their
hoods. I condensed the command comparison table into a single page and printed
it out for quick reference; a PDF is `here
<http://other.edunham.net/git-hg-cheatsheet/githg-cheatsheet.pdf>`_.

Clone
-----

The thing I want to clone lives at
``http://hg.mozilla.org/hgcustom/version-control-tools/file/tip/autoland``.

Trying to clone the full URL yields a 404, but snipping the URL back to the
top-level directory gets me the repo::

    $ hg clone http://hg.mozilla.org/hgcustom/version-control-tools/
    destination directory: version-control-tools
    requesting all changes
    adding changesets
    adding manifests
    adding file changes
    added 4574 changesets with 10874 changes to 1971 files
    updating to bookmark @
    1428 files updated, 0 files merged, 0 files removed, 0 files unresolved
    $ ls
    version-control-tools

Examine Log
-----------

``hg log | less`` shows me that each commit's summary in this repo includes
the part of the codebase it touches, and a bug number.

``hg log | grep autoland: | less`` gives me the summaries of every commit that
touched autoland, but I cannot show a commit from summary alone.

`The Hg book
<http://hgbook.red-bean.com/read/customizing-the-output-of-mercurial.html>`_
helped me construct a filter that will show a unique revision ID onthe same
line as each description.

``hg log --template '{rev} {desc}\n' | grep autoland:`` is much more useful.
It gives me the local ID of each changeset whose description included
"autoland:".

From here, I can use a bit more grep to narrow down the list of matching
messages, then I'm ready to examine commits.

Examining Commits
-----------------

That ``{rev}`` in my filter was the "repository-local changeset revision
number". For these examples I'll examine revision 2589.

``hg status --change 2589`` lists the files that were touched by that
revision, and ``hg export 2589`` yields a full diff of the changes introduced.


This gets me enough information to make an appropriate set of changes, run the
tests, and create my own commits!

.. author:: E. Dunham
.. categories:: git, hg
.. tags:: none
.. comments::
