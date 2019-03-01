When searching an error fails
=============================

This blog has seen a dearth of posts lately, in part because my standard post
formula is "a public thing had a poorly documented problem whose solution
seems worth exposing to search engines". In my present role, the tools I
troubleshoot are more often private or so local that the best place to put
such docs has been an internal wiki or their own READMEs.

This change of ecosystem has caused me to spend more time addressing a
different kind of error: Those which one really can't just Google.

Sometimes, especially if it's something that worked fine on another system and
is mysteriously not working any more, the problem can be forehead-slappingly
obvious in retrospect. Here are some general steps to catch an "oops, that was
obvious" fix as soon as possible.


Find the command that yielded the error
---------------------------------------

First, I identify what tool I'm trying to use. Ops tools are often an amalgam
of several disparate tools glued together by a script or automation. This
alias invokes that call to SSH, this internal tool wraps that API with an
appropriate set of arguments by ascertaining them from its context. If I think
that SSH, or the API, is having a problem, the first troubleshooting step is
to figure out exactly what my toolchain fed into it. Then I can run that from
my own terminal, and either observe a more actionable error or have something
that can be compared against some reliable documentation.

Wrappers often elide some or all of the actual error messages that they
receive. I ran into this quite recently when a multi-part shell command run by
a script was silently failing, but running the ssh portion of that command in
isolation yielded a helpful and familiar error that prompted me to add the
appropriate key to my ssh-agent, which in turn allowed the entire script to
run properly.

Make sure the version "should" work
-----------------------------------

Identifying the tool also lets me figure out where that tool's source lives.
Finding the source is essential for the next troubleshooting steps that I
take.::

    $ which toolname
    $ toolname -version #

I look for hints about whether the version of the tool that I'm using is
supposed to be able to do the thing I'm asking it to do. Sometimes my version
of the tool might be too new. This can be the case when the dates on all the
docs that suggest it's supposed to work the way it's failing are more than a
year or so old. If I suspect I might be on too new a version, I can find a
list of releases near the tool's source and try one from around the date of
the docs.

More often, my version of a custom tool has fallen behind. If the date of the
docs claiming the tool should work is recent, and the date of my local version
is old, updating is an obvious next step.

If the tool was installed in a way other than my system package manager, I
also check its README for hints about the versions of any dependencies it
might expect, and make sure that it has those available on the system I'm
running it from.

Look for interference from settings
-----------------------------------

Once I have something that seems like the right version of the tool, I check
the way its README or other docs looked as of the installed version, and note
any config files that might be informing its behavior. Some tooling cares
about settings in an individual file; some cares about certain environment
variables; some cares about a dotfile nearby on the file system; some cares
about configs stored somewhere in the homedir of the user invoking it. Many
heed several of the above, usually prioritizing the nearest (env vars and
local settings) over the more distant (system-wide settings).

Check permissions
-----------------

Issues where the user running a script has inappropriate permissions are
usually obvious on the local filesystem, but verifying that you're trying to
do a task as a user allowed to do it is more complicated in the cloud.
Especially when trying to do something that's never worked before, it can be
helpful to attempt to do the same task as your script manually through the
cloud service's web interface. If it lets you, you narrow down the possible
sources of the problem; if it fails, it often does so with a far more
human-friendly message than when you get the same failure through an API.

Trace the error through the source
----------------------------------

I know where the error came from, I have the right versions of the tool and
its dependencies, no settings are interfering with the tool's operation, and
permissions are set such that the tool should be able to succeed. When all
this normal, generic troubleshooting has failed, it's time to trace the error
through the tool's source.

This is straightforward when I'm fortunate enough to have a copy of that
source: I pick some string from the error message that looks like it'll always
be the same for that particular error, and search it in the source. If there
are dozens of hits, either the tool is aflame with technical debt or I picked
a bad search string.

Locating what ran right before things broke leads to the part of the source
that encodes the particular assumptions that the program makes about its
environment, which can sometimes point out that I failed to meet one.
Sometimes, I find that the error looked unfamiliar because it was actually
escalated from some other program wrapped by the tool that showed it to me, in
which case I restart this troubleshooting process from the beginning on that
tool.

Sometimes, when none of the aforementioned problems is to blame, I discover
that the problem arose from a mismatch between documentation and the program's
functionality. In these cases, it's often the docs that were "right", and the
proper solution is to point out the issue to the tool's developers and
possibly offer a patch. When the code's behavior differs from the docs'
claims, a patch to one or the other is always necessary.


.. author:: E. Dunham
.. categories:: none
.. tags:: troubleshooting
.. comments::
