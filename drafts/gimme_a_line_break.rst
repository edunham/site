Gimme a (line) break
====================

Specifically, several line breaks in a Sphinx site's tagline. Is it even
possible?

.. more::

::

    also, your tagline makes it sound like YOU are free and open source
    
    yeah, i'm not great at coming up with taglines.
    got any better ideas?
    i was just trying to pun on FOSS
    
    ooh, good pun
    might be more obvious if FOSS were vertically aligned

Okay, let's try to vertically align a tagline. 

The tagline is set in ``conf.py``, just like an ordinary sphinx site::

    # Change this to the tagline of your blog
    tagline = 'Free & Open-source Student Sysadmin'

Will <br> work?
---------------

Nope! Manually sticking the HTML ``<br>`` tag in causes the tag to be
displayed on the page in the output. Cool, if I want to tag myself in HTML,
but less cool if I want to render it.

Are tagline strings parsed as reStructuredText?
-----------------------------------------------

I happen to know that ``conf.py`` is a Sphinx thing, so I tried googling
"sphinx line breaks in project name". This took me to stackoverflow_, where as
usual I skimmed the question to verify that it was probably at least related
to the problem at hand, then dug into the top couple of responses. As usual
with stackoverflow, the question is tangentially related to my current
problem, but the answers suggest a few useful lines of inquiry to try.

Inserting pipes (``|``, vertical bars, capital backslashes, call them what you
will) where I want my lines breaks does not work. Looks like it might not be
raw rst after all?

But wait! A subcomment on stackoverflow points out that two spaces are
required after each pipe. Edit conf.py again, rebuild the site, and, drumroll
please... it still doesn't work!

How about ``\n``?
-----------------

Nope. The \n control character isn't rendered onto the screen like the
``<br>`` was, which is interesting, but no line breaks are shown either.

But wait! I'd swear it's rst...
-------------------------------

Try again, after looking up the rst docs_ and noticing how the pipes are
always the first character of the line in line break examples. 

How about this... ::

    tagline = 'Free & 
    |  Open-source 
    |  Student
    |  Sysadmin'

A nice error, is how::

    Configuration error:
    There is a syntax error in your configuration file: EOL while scanning
    string literal (conf.py, line 14)

Yeah, if I bothered remembering to Python, I'd recall that this is not a valid
way to do multi-line strings. Let's see if triple-quote syntax works (if that
fails, I can try ending each line with a backslash, or putting each line as a
separate string and joining them with ``+``. Triple-quotes or backslashes seem
likelier to work, and backslashes are unpleasant because any whitespace
inadvertantly inserted after them negates their effect. 

Unfortunately, it turns out that even a triple-quoted string with pipes
at the beginnings of the new lines and two spaces after each pipe does not
have the intended effect. Time to dig in the Sphinx internals in the morning.

.. _stackoverflow: http://stackoverflow.com/questions/7033239/how-to-preserve-line-breaks-when-generating-python-docs-using-sphinx

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
