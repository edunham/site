Vim: Open file with cursor at the end
=====================================

As part of a recent quest to automate everything and learn more Vim tricks,
I've been identifying patterns in my use of the editor and attempting to get
them done with fewer keystrokes.

.. more::

The Problem
-----------

I have a file containing notes which I edit several times a day. This takes
quite a few keystrokes::

    vim path/to/where/the/file/is/file.txt
    <shift> G $
    i

And then I'm ready to type. Wouldn't it be nice to have a short alias to do
that for me instead?

Choose Your Own Adventure
-------------------------

You can either keep reading to find out the neat but ultimately irrelevant
stuff I learned along the way, or skip down to `The Answer`_.

Techniques Available
--------------------

There seem to be 4 options to accomplish this sort of task, 3 of which might
be good:

* `Modeline magic`_ can potentially introduce security vulnerabilities by
  allowing arbitrary code to be executed, but on the positive side, it allows
  arbitrary configurations to be set on a per-file basis. To enable modeline
  hacks, add ``set modeline`` to your ``.vimrc`` then put a line of the form
  ``# vim: set expandtab:`` or similar in the file to which you want the
  command to apply.

* `Autocommands`_ allow Vim to execute specific code when it sees a particular
  event in the file to which they apply. To be honest, I've never played with
  autocommands before, and left them till last because they seemed to have the
  steepest of all 3 formidable learning curves. 

* Vim's command line options include ``-c {command}``, which runs the
  specified command after the first file has been read. Or ``--cmd {command}``
  executes it before processing the ``.vimrc`` file. A shorter syntax for
  ``-c`` is ``+{command}``.

* The final option, which is a Wrong Answer(TM) but seems awfully tempting
  after the previously described ones fail a lot, is to accomplish the same
  purpose through circuitous bash tricks. For instance if ``G`` to jump to the
  end of the file fails when embedded in a command but ``:20`` works to jump
  to line 20, I could use the output of ``wc -l`` as a line number.
  Additionally, it might be easier to have Bash concatenate on some newlines
  than to convince Vim to insert them.

Trying Modelines
----------------

First, I added ``set modeline`` to my ``.vimrc``.

Then I added ``# vim: set noexpandtab:`` as the first line in my file. This is
a convenient test that my command syntax is right, since my ``.vimrc``
defaults things to ``expandtab``. It works, in that the tab key inserts hard
tabs when I hit it in that particular file now.

Now, could a gesture possibly work? Switch it to ``# vim: G:``::

    Error detected while processing modelines:
    line    1:
    E518: Unknown option: G
    Press ENTER or type command to continue


Unfortunately, the ``:normal`` command which I discovered later does not work
in modelines -- it seems that, true to their name, they really only do take
mode settings as arguments.

Trying command line syntax
--------------------------

I asked a few people how they solve this problem, and they suggested the ``vim
+999999 file.txt`` trick. Closer examination of the man page reveals that this
works because when the specified line number is absent, it defaults to the
last line of the file. Although with enough 9's it would work fine in
practical applications, it seems icky to me because my notes file could
hypothetically get very long. However, a quick test reveals that ``vim +
file.txt`` does the same thing!

Chaining commands
-----------------

Now I know that ``vim + file.txt`` opens the file with the cursor at the first
character of the final line. The man page contains a promising hint that I
might be able to automate switching to insert mode as well::

       +{command}

       -c {command}
           {command} will be executed after the  first  file  has
           been read.  {command} is interpreted as an Ex command.
           If the {command} contains spaces it must  be  enclosed
           in  double  quotes  (this depends on the shell that is
           used).  Example: Vim "+set si" main.c
           Note: You can use up to 10 "+" or "-c" commands.

I need fewer than 10 commands chained, so this might work. When `looking up`_
how to express "enter insert mode" as a command line option, I discovered the
``:normal`` command. It's the magic bullet for allowing gestures which you'd
do in normal mode to be expressed on the command line. Let's try this::

    vim "+ normal G $" file.txt

opens the file with the cursor at the last character of the last line!
Success! However, ``"+ normal G $ i"`` does not put one into insert mode after
moving to the last character of the file. Time to chain commands! 

The Answer
==========

::

    vim "+normal G$" +startinsert file.txt

Does precisely what I wanted all along! 

Its final form actually lives in my ``~/.bashrc``::

    alias list='vim "+normal G$" +startinsert /absolute/path/to/list.txt'

2 hours saving 10 seconds per file open twice a day is an egregious violation
of the `xkcd rule`_, but it was fun and I learne da lot about Vim automation
in the process.


.. _xkcd rule: http://xkcd.com/1205/
.. _looking up: http://stackoverflow.com/questions/11587124/vim-why-doesnt-normal-i-enter-insert-mode
.. _Autocommands: http://learnvimscriptthehardway.stevelosh.com/chapters/12.html
.. _Modeline magic: http://vim.wikia.com/wiki/Modeline_magic


.. author:: default
.. categories:: none
.. tags:: vim, troubleshooting, solved
.. comments::
