Multiple languages on TravisCI
==============================

Today I noticed an assumption which was making my life unnecessarily
difficult: I assumed that if my ``.travis.yml`` said ``language: ruby`` on the
first line, I was supposed to only run Ruby code from it. 

Travis lets you run code much more arbitrary than that. 

I did a bunch of tests on a `toy repo`_ to see what would happen if I ignored
my preconceptions about how you can and can't test stuff, and learned some
interesting things: 

* You can install PyPI packages in a test suite that's technically Ruby, or
  gems in a test suite that's technically Python.

* If your project is ``language:ruby``, you need to ``sudo pip install``
  dependencies. If it's ``language:python``, you can just ``gem install``
  dependencies without ``sudo``. 

* If I specify multiple instances of ``language:`` or multiple build
  matrices, Travis uses the language whose build matrix occurs last. If I
  specify a Python matrix and then a Ruby one, the Ruby matrix will be run. 

This is especially useful when testing or deployment requires hitting an API
whose libraries are most up to date in a language other than that of the
project.

.. _toy repo: https://travis-ci.org/edunham/travis-test/builds

.. author:: default
.. categories:: none
.. tags:: travisci
.. comments::
