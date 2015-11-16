Git: Move one file and its history between branches
===================================================

One of the projects I work on is a cool toy for welcoming new contributors
which forked back in September 2014. The Rust and Servo forks have developed
more or less independently to suit each project's needs, which means that
transferring changes between them is always an interesting Git exercise. 

Today, I wanted to add a README to the `servo fork`_. The `rust fork`_ has a
README already, and I wondered how hard it would be to keep the file's history
to give contributors credit for who wrote what. 

The forks turned out to have diverged so far that only one commit from the
rust fork was applicable to the servo fork. I used ``git blame`` to find the
commit hash that I wanted, then ``git cherry-pick --no-commit abc123`` to get
the changes and ``git add README.md; git commit`` to keep only the README
changes from that commit. 

However, I also asked on IRC whether a more general, elegant solution to this
problem was hidden somewhere in Git. `Mythmon`_ proposed a tidy one-liner::

    git checkout branch-B -- README.md; git add README.md; git commit -m "Steal README from commit $(git rev-parse branch-A | cut -b 1-8)

This asssumes that I want the entire contents of the README from branch B,
along with its history, to end up on branch A. 

Let's try this in a toy repo. I'll set it up in 2 branches of the same repo,
though these could easily be two remote forks with some shared history:: 

    $ git init
    $ echo "hello" > foo.txt
    $ git add foo.txt
    $ git commit -am "first file"
    $ git checkout -b baz
    $ echo "first change" > qux.txt
    $ git add qux.txt
    $ echo "hey look, a side effect" > ohno.txt
    $ git add ohno.txt
    $ git commit -am "first change in baz branch"
    $ echo "second change" >> qux.txt
    $ git commit -am "second change in baz branch"
    $ git checkout master
    $ echo "this is important" > ohno.txt
    $ git add ohno.txt
    $ git commit -am "super important code"

Now I have two branches that won't just merge, because some conflicting things
happened over in ``ohno.txt``. We don't care about it, and the important stuff
in ``master`` cannot get overwritten by the indicental changes off in ``baz``. 
Yet I want to bring ``qux.txt`` and its history into the master branch. 

Let's use that one-liner, piece by piece::

    git checkout baz -- qux.txt

Check out the version of ``qux.txt`` that's currently on branch ``baz``. See
`here`_ for more details on the syntax::

    git add qux.txt

Add the changes.::

    git commit -m "Steal qux.txt from commit $(git rev-parse master | cut -b
1-8)"
 

.. _here: http://nicolasgallagher.com/git-checkout-specific-files-from-another-branch/
.. _servo fork: https://github.com/servo/highfive
.. _rust fork: https://github.com/nrc/highfive
.. _Mythmon: http://www.mythmon.com/

.. author:: default
.. categories:: none
.. tags:: git 
.. comments::
