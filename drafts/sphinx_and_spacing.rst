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





.. author:: default
.. categories:: none
.. tags:: none
.. comments::
