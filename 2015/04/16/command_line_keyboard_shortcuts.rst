Command-line Keyboard Shortcuts
===============================

Just another installment of "How did I not know that already?"

.. note::

Backstory
---------

I came across a copy of the first edition of `How Linux Works`_ recently, and
have been reading through it to see whether I missed anything important in my
hodge-podge of formal and informal open source training. 

It's nice to be reassured that I have the right idea for all the basics that
it's covered so far. Along the way, it's answering a few of those
un-Googleable questions that aren't really a big enough deal to warrant
remembering to ask someone more knowledgeable about them.

Today I Learned
---------------

``Ctrl+A`` jumps the cursor to the beginning of the line, and ``Ctrl+E`` jumps
to the end. (``Home`` and ``End`` also work in my shell, but they're slower
and more awkward since they require moving one's hands from home row)

``Ctrl+W`` deletes the word in which the cursor is currently located (words
being defined as strings separated by spaces), and ``Ctrl+U`` deletes the
entire line. 

Perhaps less usefully, there are also control characters to subsitute for
arrow keys, with easy mneumonics for them: 

+============+=======+===========+
|  Sequence  | Arrow | Mneumonic |
+============+=======+===========+
| ``ctrl+B`` | left  | Back      |
+------------+-------+-----------+
| ``ctrl+F`` | right | Forward   |
+------------+-------+-----------+
| ``ctrl+P`` | up    | Previous  |
+------------+-------+-----------+
| ``ctrl+N`` | down  | Next      |
+------------+-------+-----------+

Other Relevant Facts
--------------------

The book hasn't covered these yet, but if the above was new to you, make sure
you know these things too: 

``Ctrl+R`` enters ``reverse-i-search`` mode, in which you type any substring
of the command you want. As you type, it will match the most recent command in
which the thing you typed appears. 

The up and down arrow keys scroll through your command history. Page-up jumps
to the first command in your history, and page-down jumps to the last. All
that history lives in ``~/.bash_history`` by default, and the ``HISTFILESIZE``
and ``HISTSIZE`` options in ``~/.bashrc`` configure how much history gets
saved. 

``Ctrl+C`` kills the running program, ``Ctrl+D`` sends the ``EOF``
(end-of-file) character, and ``q`` quits you out of pretty much any program
with ``:`` instead of your usualy ``$`` prompt.  

.. _How Linux Works: http://www.nostarch.com/howlinuxworks2

.. author:: default
.. categories:: none
.. tags:: TIL, shell
.. comments::
