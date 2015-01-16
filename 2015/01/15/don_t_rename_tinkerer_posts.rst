Don't rename Tinkerer posts
===========================

Or if you must, at least do it correctly. Here's how.

.. more::

When you invoke ``tinker --post``, it creates a file in
``YYYY/MM/DD/postname.rst``, and also adds YYYY/MM/DD/postname to the toctree
in ``master.rst``. 

I learned what happens when you rename things improperly because my very first
post to this blog started out entitled "Blogging with Tinker". I then
remembered that the framework is technically called ``tinkerer`` even though
one always invokes it as ``tinker``, so I changed the .rst file's name. 

If your sphinx-fu_ is strong, the next part will be obvious. If you've finally
carved out some time to play with your personal blog at a silly hour of the
morning after a long day of schoolwork, it'll waste a lot of time and googling
before you figure out why **the post disappeared**. 

When the name of the file does not precisely match the name in the toctree,
you will not get a link to it in your sidebar. Sphinx does throw a helpful
little warning::

    WARNING: document isn't included in any toctree

but when that's right in the middle of a wall of 38 other warnings about how
Sphinx isn't happy with Tinkerer's post templates being only templates and
thus not used anywhere, it's not immediately obvious what changed since the
build worked perfectly.

Should Tinkerer have a ``--rename`` option?
-------------------------------------------

My first impression is no; the inconvenience of implementing and documenting
``--rename``, plus the clunky syntax of spelling out the full paths to the old
and new posts and getting the dates right, seems to be worse than just
mentioning it here. 

My Tinkerer post disappeared!
-----------------------------

If your Tinkerer post is missing, make sure you didn't make the same mistake I
did by renaming it incompletely. **If you move the source file, you have to
update the toctree too**. Sphinx is just doing its job. 

Yes, this section is redundant, but I wanted to make sure this post includes
the same phrases I googled when wondering what was going on. It's such an
obvious error that I'm sure other people have made it, debugged it, gone "duh,
that was obvious!", and then not written anything down. 

.. _sphinx-fu: http://www.catb.org/jargon/html/F/suffix-fu.html

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
