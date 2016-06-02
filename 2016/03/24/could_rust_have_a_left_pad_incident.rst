Could Rust have a left-pad incident?
====================================

The short answer: No.

What happened with ``left-pad``?
--------------------------------

The Node community had a lot of `drama
<http://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm>`_ this week
when a developer unpublished a package on which a lot of the world
depended.

This was fundamentally possible because NPM offers an `unpublish
<https://docs.npmjs.com/cli/unpublish>`_ feature. Although the docs for
``unpublish`` admonish users that "It is generally considered bad behavior to
remove versions of a library that others are depending on!" in large bold
print, the feature is available.

What's the Rust equivalent?
---------------------------

The Rust package manager, Cargo, is similar to NPM in that it helps users get
the libraries on which their projects depend. Rust's analog to the NPM index
is `crates.io <https://crates.io/>`_.

The best explanation of Cargo's robustness against ``unpublish`` exploits is
`the docs themselves <http://doc.crates.io/crates-io.html>`_:

    **cargo yank**

    Occasions may arise where you publish a version of a crate that actually
    ends up being broken for one reason or another (syntax error, forgot to
    include a file, etc.). For situations such as this, Cargo supports a
    “yank” of a version of a crate.::

        $ cargo yank --vers 1.0.1
        $ cargo yank --vers 1.0.1 --undo

    A yank **does not** delete any code. This feature is not intended for
    deleting accidentally uploaded secrets, for example. If that happens, you
    must reset those secrets immediately.

    The semantics of a yanked version are that no new dependencies can be
    created against that version, but all existing dependencies continue to
    work. One of the major goals of crates.io is to act as a permanent archive
    of crates that does not change over time, and allowing deletion of a
    version would go against this goal. Essentially a yank means that all
    projects with a ``Cargo.lock`` will not break, while any future
    ``Cargo.lock`` files generated will not list the yanked version.

As Cargo author Alex Crichton clarified in `a GitHub comment
<https://github.com/servo/servo/issues/10142#issuecomment-200444583>`_
yesterday, the only way that it's possible to remove code from ``crates.io``
is to compel the Rust tools team to edit the database and S3 bucket.

Even if a crate maintainer leaves the community in anger or legal action is
taken against a crate, this workflow ensures that code deletion is only
possible by a small group of people with the motivation and authority to do it
in the way that's least problematic for users of the Rust language.

For more information on the crates.io package and copyright policies, see
`this internals thread
<https://internals.rust-lang.org/t/crates-io-package-policies/1041>`_.


But I just want to left pad a string in Rust??
----------------------------------------------

Although a `left-pad crate <https://crates.io/crates/left-pad>`_ was created
as a joke, you should probably just use the `format! built-in
<https://doc.rust-lang.org/std/fmt/index.html#fillalignment>`_ from the
standard library.

.. author:: E. Dunham
.. categories:: none
.. tags:: rustlang, cargo
.. comments::
