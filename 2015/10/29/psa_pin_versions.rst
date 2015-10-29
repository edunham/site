PSA: Pin Versions
=================

Today, the website's build `broke`_. We made no changes to the tests, yet a
wild dependency error emerged::

    Generating... 

      Dependency Error: Yikes! It looks like you don't have redcarpet or one of
    its dependencies installed. In order to use Jekyll as currently configured,
    you'll need to install this gem. The full error message from Ruby is: 'cannot
    load such file -- redcarpet' If you run into trouble, you can find helpful
    resources at http://jekyllrb.com/help/! 

      Conversion error: Jekyll::Converters::Markdown encountered an error while
    converting 'conduct.md':

                        redcarpet

                 ERROR: YOUR SITE COULD NOT BE BUILT:

                        ------------------------------------

                        redcarpet

    The command "jekyll build" exited with 1.

Although Googling the error was unhelpful, a bit more digging revealed that
our last working build had been on Jekyll ``2.5.3`` and the builds breaking on
a Redcarpet error all used ``3.0.0``. 

The moral of the story is that where the ``.travis.yml`` said ``- gem install
jekyll``, it should have said ``- gem install jekyll -v 2.5.3``. 

.. _broke: https://travis-ci.org/rust-lang/rust-www/builds/88167123

.. author:: default
.. categories:: none
.. tags:: jekyll, travisci, rustinfra
.. comments::
