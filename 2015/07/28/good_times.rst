Good times
==========

People sometimes say "morning" or "evening" on IRC for a time zone unlike my
own. Here's a bash one-liner that emits the correct time-of-day generalization
based on the datetime settings of the machine you run it on. 

::

    case $(($(date +%H)/6)) in 0|1)m="morning";;2)m="afternoon";;3)m="night";;esac; echo good $m

.. more::

How?
----

First, check if the feature is already implemented. ``man date`` and try not
to giggle.  Search for ``morning``. It's not there.

So we need a `switch/case
<http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_03.html>`_::

    case EXPRESSION in CASE1) COMMAND-LIST;; CASE2) COMMAND-LIST;; ... CASEN) COMMAND-LIST;; esac

And the expression we're switching on will be the current hour::

    date +%H

My first attempt **does not work** because I expect too much of Bash::

    case $(date +%H) in [0-12]) m="morning";;[13-18]) m="afternoon";;[19-21])m="evening";;*)m="night";;esac; echo $m

It fails because the "ranges" are actually just `shell patterns
<http://www.gnu.org/software/bash/manual/bashref.html#Pattern-Matching>`_. 

I could either expand my script to handle all hours, or compress ranges of
hours down into something that can be expressed by patterns. The latter sounds
shorter and easier. I want to divide the current hour by 6, to tell which
quarter of the day I'm in.

A bit of trial and error reveals that a syntax that allows me to do math on
the result of ``date`` is::

    $(( $(date +%H)/6 ))

because it's shorthand for assigning the result of the math into a variable
and using it immediately. This only adds a few characters to the one-liner:: 

    case $(($(date +%H)/6)) in 0|1)m="morning";;2)m="afternoon";;3)m="night";;esac; echo $m

That's it!


.. author:: E. Dunham
.. categories:: none
.. tags:: irc, bash 
.. comments::
