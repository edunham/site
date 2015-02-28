Code Coverage in the Monte Tests
================================

My schoolwork is particularly bad this weekend, so I'm procrastinating by
learning to analyze the test coverage of a moderately complex Python codebase.
Specifically, the `reference implementation`_ of the `Monte programming
language`_. This effort is hampered only slightly by the fact that I've never
done much with code coverage tools before, and especially never deployed one
onto a virgin codebase. 

.. more::

Nedbat's tool
-------------

Some cursory searching and reading the resulting blogs points out that the
Ned Batchelder's `coverage`_ is the most-recommended Python code coverage
analyser. You run it on your program; it spits out a report of any lines that
weren't executed and optionally makes that report into pretty HTML. 

Trial --coverage
----------------

I then realized that since Monte's tests are run by Trial, it would probably
make more sense to ask Trial to report coverage statistics. Sure enough,
there's a ``--coverage`` option in ``trial --help``:: 

    --coverage           Generate coverage information in the coverage file in
                         the directory specified by the temp-directory
                         option.

Wow, that's... almost helpful. This is the only reference to the
``temp-directory`` option in the entire help, but maybe the output of running
the command will tell me what ``temp-directory`` is being used::
    
    $ trial --coverage monte.test.test_runtime    
    ...
    PASSED (successes=231)
    Setting coverage directory to /full/path/to/pwd/_trial_temp/coverage.
 
    $ ls _trial_temp/coverage/ | wc -l
    175

Well, it ran whatever ``coverage`` function it's using on **everything**: the
code I wanted coverage for, and all of its dependencies. But the ``.cover``
filenames are formatted in a way that makes it easy to tell what they are::
    
    ...
    monte.ast.cover
    ...
    twisted.web.sux.cover
    ...

How to read .cover files
------------------------

The ``.cover`` files looked like scary nonsense at first when I opened them,
because they had a bunch of seemingly random numbers and unfamiliar code. I
stared at them for a while and realized that a ``.cover`` file is exactly the
source of the file it reports on, but with each line prefaced by the number of
times it was run. (That's what I get for learning this stuff on parts of a
codebase that I've barely touched!)

The closest thing I could find to an explanation of the ``.cover`` files was a
`twisted man page`_ in the Mac OSX 10.9 docs. I don't have a man page for
Trial on my own system, perhaps because it's installed in a virtualenv rather
than through my OS's package manager. 

The official Trial docs mention that the coverage tool exists, but provide no
help on how to do things with its output. 

The moral of the story is that you should grep through the ``.cover`` file for
instances of ``>>>>``, which point at lines that were never run. 

Getting Prettier Output
-----------------------

After reading the Twisted developers `arguing about including coverage.py`_ and
explaining its use `on the mailing list`_, I realized that Nedbat's
`coverage`_ is probably the "right answer" after all. 

The easiest way to run ``coverage`` is to just wrap it around trial::

    $ coverage run `which trial` monte.test.test_runtime

This initially has the same problem of testing all the imported files, whose
coverage doesn't matter to me right now. Fortunately, ``coverage`` has actual
documentation on how to use it to omit files in certain directories:: 

    $ coverage run `which trial` monte.test.test_runtime 
    $ coverage report --omit=venv/lib/*
    $ coverage html -i --omit=venv/lib/*
    $ firefox htmlcov/index.html

Note that the ``-i`` flag is necessary because of `an issue`_ where
``coverage`` thinks it should have source for files that it actually
shouldn't, in my case::

    $ coverage html --omit=v/lib/*
    No source for code: '/pymeta_generated_code/pymeta_grammar__CycleRenamer.py'




.. _an issue: http://stackoverflow.com/questions/2386975/no-source-for-code-message-in-coverage-py
.. _on the mailing list: http://twistedmatrix.com/pipermail/twisted-python/2012-April/025487.html
.. _arguing about including coverage.py: https://twistedmatrix.com/trac/ticket/4374
.. _twisted man page: https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/trial.1.html
.. _reference implementation: https://github.com/monte-language/monte
.. _Monte programming language: http://monte.readthedocs.org/en/latest/
.. _coverage: http://nedbatchelder.com/code/coverage/
.. author:: default
.. categories:: none
.. tags:: monte, coverage, python, testing
.. comments::
