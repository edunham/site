The Case of the Mixed-Case Tags
===============================

I accidentally discovered the "feature" that Tinkerer tags are somewhat
case-sensitive. 

.. more::

Background
----------

I sometimes write about LaTeX. On one post, I got lazy and typed the tag for
it as ``latex``, while on another, I capitalized it correctly as ``LaTeX``. 

To make this post into an example of the behavior, I am tagging it
``EXAMPLE``. I've added the tag ``example`` to my `first post`_. 

Behavior
--------

Both the uppercase and lowercase versions of the tag appear in the tags
listing in the right sidebar. However, clicking either capitalization will
take you to ``http://edunham.net/tags/example.html``. That tag listing will
only show the posts tagged with the **lowercase** spelling of the tag name
being viewed. 

The Gotcha
----------

If all the posts with a given tag use the same capitalization, they will all
appear on the tag's page. To see this in action, look at the `test tag`_
listing at ``http://edunham.net/tags/test.html``. This is the only post with
that tag, so all posts tagged with any capitalization of "test" have the same
tag, so all of them show up on that page. 

However, if I were to tag another post ``test``, this post would cease
appearing on the `test tag`_ page. This behavior is probably wrong, but what
would one do about it -- preserve case into the tag display page URLs?

In Conclusion
-------------

Be aware that Tinkerer modifies your tag names. Make sure you capitalize each
tag the same way on every post, or the posts with a spelling which deviates
from all lower-case may get lost.

.. _test tag: http://edunham.net/tags/test.html
.. _first post: http://edunham.net/2015/01/13/blogging_with_tinkerer.html
.. author:: default
.. categories:: none
.. tags:: EXAMPLE, tinkerer, TEST
.. comments::
