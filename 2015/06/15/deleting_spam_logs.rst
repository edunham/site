Deleting spam logs
==================

Some spammers got onto the Mozilla network, scraped a major channel's user
list, and PMed everybody requests to join their network from almost 1,000
different nicks. Here's how I tidied up afterwards. 

.. more::

Close spurious PM buffers
-------------------------

Simple fix from `the irssi docs <http://www.irssi.org/documentation/settings>`_::

    /set autoclose_windows on

This will automatically close any PM buffer where the other person (or bot) is
no longer online. Another cool setting is::

    /set autoclose_query 172800

That will close any private message window that's been silent for more than 2
days. You can tweak the number of seconds higher or lower to fit your use case
and prevent it from deleting real conversations. 

Delete logs by length
---------------------

This particular spammer pasted one or two lines per log, and I happen to know
that I have had no one-line conversations on that network whose logs I wish to
keep. Here's a slightly ugly chunk of shell to delete every log whose length
was between 1 and 5 lines (inclusive)::

    ~/irclogs/moz$ wc -l * | grep "[1-5] [a-zA-Z]" | cut -d " " -f 9 | xargs rm

Pipes are our friends! Just run the commands one at a time to see what they
do: 

* ``wc -l`` counts the lines in the file, with a return of the form ``# filename``

* ``grep`` finds things which match the regular expression. ``[1-5]`` matches any
  single digit between 1 and 5, the space matches a space, and the ``[a-zA-Z]``
  matches the first letter of the name of the log. 

* ``cut`` selects one column of output. The ``-d`` part says that I want the
  columns to be space-delimited, and the ``-f 9`` selects the 9th column from
  the output. It's 9 becuase ``wc`` pads its output with a bunch of spaces
  before the single digit of file length. 

* ``xargs`` takes the thing you piped into it and feeds it as an argument into
  ``rm``. In this case, ``cut`` spits out a list of filenames, so ``rm`` will
  go through and remove each one. 

Delete logs by contents
-----------------------

Since it's the same line in every spam log, I can also delete all PM logs that
contain the spam message::

    ~/irclogs/moz$ grep -l --exclude="#*" "join my irc network irc.cooldudeirc.com " * | xargs rm

* ``grep`` finds all files containing the stated string. The ``-l`` says "only
  return file names, not the part of the contents that matched" and the
  ``--exclude`` pattern makes the search return only private message logs
  (since channel logs start with a ``#``).

* ``xargs`` does the same thing as before. 




.. author:: default
.. categories:: none
.. tags:: irssi, bash
.. comments::
