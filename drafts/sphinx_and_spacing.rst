Sphinx and Spacing
==================

Sphinx is currently my favorite tool for making words pretty. I choose it
whenever the format of a project's documentation is my decision, as well as
using it for my slides and even this blog.

The biggest hurdle I've overcome in learning Sphinx, and the thing that causes
me to hit errors the most often, is spacing. I guess that's appropriate for a
Python tool... 

Here are a few Sphinx errors which I've found are less well-documented around
the web.

.. more::

Broken toctree directive
------------------------

The error will look like::

    ERROR: Error in "toctree" directive: invalid option block.

This happens when you don't separate the options from the entries in the
toctree with a blank line::

    .. toctree::
        :maxdepth: 2
        
        my_page
        my_other_page

However, the options passed to the toctree must come **immediately after** the
toctree directive itself. If you have a space in the wong place::

    .. toctree::
    
        :maxdepth: 2
        
        my_page
        my_other_page

You'll get this error::

    WARNING: toctree contains reference to nonexisting document u':maxdepth: 2'

Code blocks not displaying?
---------------------------

There needs to be a blank line between the ``::`` and the first, indented,
line of code. 

Tinkerer-Specific
=================

Images not showing up
---------------------

When it writes out the path to your image instead of showing the image, make
sure the path started with a ``/``. 

Going::

    .. figure:: _static/pic.jpg

will cause it to look **locally** for your post, as in
``YYYY/MM/DD/_static/pic.jpg``. If you want it to look the ``_static``
directory in the root of the site, you need::

    .. figure:: /_static/pic.jpg





.. author:: default
.. categories:: none
.. tags:: none
.. comments::
