Using Notty
===========

I recently got the "Hey, you're a Rust Person!" question of how to install
`notty`_ and interact with it.

A TTY was `originally`_ a teletypewriter. Linux users will have most likely
encountered the concept of TTYs in the context of the TTY1 interface where
you end up if your distro fails to start its window manager. Since you use
``ctrl + alt + f[1,2,...]`` to switch between these interfaces, it's easy to
assume that "TTY" refers to an interactive workspace.

Notty itself is **only** a virtual terminal. Think of it as a library meant
as a building block for creating graphical terminal emulators. This means that
a user who saw it on Hacker News and wants to play around should not ask "how
do I install notty", but rather "how do I run a terminal emulator built on
notty?".

Easy Mode
---------

Get some Rust::

    curl -sf https://raw.githubusercontent.com/brson/multirust/master/blastoff.sh | sh
    multirust update nightly

Get the system dependencies::

    sudo apt-get install libcairo2-dev libgdk-pixbuf2.0 libatk1.0 libsdl-pango-dev libgtk-3-dev

Run Notty::

    git clone https://github.com/withoutboats/notty.git
    cd notty/scaffolding
    multirust run nightly cargo run

And there you have it! As mentioned in the `notty`_ README, "This terminal is
buggy and feature poor and not intended for general use". Notty is meant as a
library for building graphical terminals, and scaffolding is only a
**minimal** proof of concept.

.. more::

Explanation: Getting Rust
-------------------------

Since the Rust language is still under active development, many features are
available in the Nightly version of the compiler which are not yet available
in Stable. If you got Rust from your `package manager`_, you probably are
using Stable. To check, run ``rustc --version`` and see whether the result
says "nightly" in it.

Notty uses some features that're available in Nightly but not Stable. If you
try to compile it with Stable, you'll get an error that makes this obvious::

    Compiling notty v0.1.0 (file:///home/edunham/code/notty)
    src/lib.rs:16:1: 16:16 error: #[feature] may not be used on the stable release channel
    src/lib.rs:16 #![feature(io)]
                  ^~~~~~~~~~~~~~~
    error: aborting due to previous error
    Could not compile `notty`.

When you need to switch between Rust versions frequently, `multirust`_ is the
tool for the job.

Explanation: Getting system dependencies
----------------------------------------

I've reproduced the following error messages in full to help out any confused
new Rustaceans Googling for them:

`Cairo`_ is a graphics library that you can get from your system package
manager. If you try to compile notty's dependencies without it, you'll get an
error::

    Build failed, waiting for other jobs to finish...
    failed to run custom build command for `cairo-sys-rs v0.2.1`
    Process didn't exit successfully:
    `/home/edunham/code/notty/notty-cairo/target/release/build/cairo-sys-rs-1d0cf50d5d2dab2f/build-script-build`
    (exit code: 101)
    --- stderr
    thread '<main>' panicked at '`"pkg-config" "--libs" "--cflags" "cairo"` did
    not exit successfully: exit code: 1
    --- stderr
    Package cairo was not found in the pkg-config search path.
    Perhaps you should add the directory containing `cairo.pc'
    to the PKG_CONFIG_PATH environment variable
    No package 'cairo' found
    ', /home/edunham/.multirust/toolchains/nightly/cargo/registry/src/github.com-0a35038f75765ae4/cairo-sys-rs-0.2.1/build.rs:9
    note: Run with `RUST_BACKTRACE=1` for a backtrace.

The only other gotcha about the dependencies is that errors about ``gdk``
actually mean you need to install the ``libgtk-3-dev`` package::

    failed to run custom build command for `gdk-sys v0.2.1`
    Process didn't exit successfully:
    `/home/edunham/code/notty/scaffolding/target/release/build/gdk-sys-e1b0a13b32593729/build-script-build`
    (exit code: 101)
    --- stderr
    thread '<main>' panicked at '`"pkg-config" "--libs" "--cflags" "gdk-3.0"` did
    not exit successfully: exit code: 1
    --- stderr
    Package gdk-3.0 was not found in the pkg-config search path.
    Perhaps you should add the directory containing `gdk-3.0.pc'
    to the PKG_CONFIG_PATH environment variable
    No package 'gdk-3.0' found
    ', /home/edunham/.multirust/toolchains/nightly/cargo/registry/src/github.com-0a35038f75765ae4/gdk-sys-0.2.1/build.rs:17
    note: Run with `RUST_BACKTRACE=1` for a backtrace.

Running notty
-------------

Compiling and running ``scaffolding`` necessarily builds a bunch of
dependencies, some of which throw various warnings. You also might be able to
crash ``scaffolding`` with an error such as::

    thread '<main>' panicked at 'not yet implemented', .../notty/src/datatypes/mod.rs:160

`This`_, along with everywhere else that ``unimplemented!()`` occurrs in the
notty source code, is an opportunity for you to contribute and help improve
the project!

.. _notty: https://github.com/withoutboats/notty
.. _originally: http://www.cl.cam.ac.uk/~djg11/howcomputerswork/
.. _package manager: http://edunham.net/2015/07/07/rust_packaging_status_across_distros.html
.. _multirust: https://github.com/brson/multirust
.. _Cairo: http://cairographics.org/download/
.. _This: https://github.com/withoutboats/notty/blob/master/src/datatypes/mod.rs#L160

.. author:: E. Dunham
.. categories:: none
.. tags:: rust, notty
.. comments::
