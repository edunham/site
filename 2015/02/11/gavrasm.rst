Installing gavrasm on Arch
==========================

Avra, the AVR assembler that I have been using for my ECE375 assignments,
started throwing cryptic error messages such as "``PRAGMA directives currently
ignored``" from an include file which had previously been working fine. 

In order to sanity check whether the problem is in my code or the compiler, I
installed ``gavrasm``, the assembler which the `ECE375 lab website`_ recommends
for Mac users. 

.. more::

I wrote this up because I couldn't find a simple, no-extra-thinking-required
walkthrough of how to build and install ``gavrasm``.

Broken pkgbuild
---------------

gavrasm is available in the AUR, but its pkgbuild is broken::

    $ yaourt -S gavrasm

    ==> Downloading gavrasm PKGBUILD from AUR...
    x PKGBUILD
    Comment by fatmike  (2011-09-30 09:26)
    Updated and moved fpc to makedepends.

    gavrasm 3.3-1  (Mon Jul 25 01:43:11 PDT 2011)
    ( Unsupported package: Potentially dangerous ! )
    ==> gavrasm dependencies:
     - fpc (already installed)


    ==> Continue building gavrasm ? [Y/n]
    ==> ---------------------------------
    ==> 
    ==> Building and installing package
    ==> ERROR: Missing package() function in
    /tmp/yaourt-tmp-username/aur-gavrasm/./PKGBUILD
    ==> ERROR: Makepkg was unable to build gavrasm.
    ==> Restart building gavrasm ? [y/N]
    ==> --------------------------------
    ==> 

Installing from Source
----------------------

Install fpc, the Free Pascal Compiler::

    $ yaourt -S fpc


Download and unzip the `source`_. Files will end up in a directory with a name
like ``Sourcefiles_v3_4``, rather than a sensible name like ``gavrasm``,
by default. 

Copy the language file to its correct location. If you want the English
version, this is::

    $ cp gavrlang_en.pas gavrlang.pas

If you forget this step, you'll hit an error when compiling:: 

    gavrline.pas(9,28) Fatal: Can't find unit gavrlang used by gavrline

Once you've copied the language file, you're ready to compile::

    $ fpc gavrasm.pas

In order to invoke gavrasm from the command line, copy the resulting
executable into a directory on your ``$PATH``::

    $ sudo cp gavrasm /usr/bin/

That's it! You can now compile assembly with ``$ gavrasm myfile.asm`` anywhere
on your system!


.. _ECE375 lab website: http://web.engr.oregonstate.edu/~johnstay/ece375/
.. _source: http://www.avr-asm-tutorial.net/gavrasm/v34/gavrasm_sources_lin_34.zip


.. author:: default
.. categories:: none
.. tags:: arch, ece375, solved, gavrasm 
.. comments::
