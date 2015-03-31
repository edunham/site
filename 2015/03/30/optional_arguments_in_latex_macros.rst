Optional Arguments in LaTeX Macros
==================================

As I've mentioned `before`_, I use LaTeX to typeset my resume. I recently
found a convenient workaround to handle formatting which differs based on
whether or not a macro's argument is present.

.. more::

The solution to testing whether a given macro argument is empty is buried deep
within the `LaTeX community forums`_::

    \newcommand{\maybe}[2]{
        \ifx&#1&
            Argument 1 was blank!
        \else
            Argument 1 was not blank.
        \fi
        Argument 2 was #2. 
    }

The LaTeX wikibook goes into more detail on the `ifx`_ command. It appears
that ``&#1`` is interpereted as a macro for purposes of equality comparison,
then compared against the ``& `` empty macro. 

The `wikibook's TeX category`_ discusses a variety of other ``if`` commands.
Of particular interest is the `ifnum`_ command, which tests whether a value is
equal to a given integer. 


.. _ifnum: http://en.wikibooks.org/wiki/TeX/ifnum
.. _wikibook's TeX category: http://en.wikibooks.org/wiki/Category:TeX
.. _ifx:  http://en.wikibooks.org/wiki/TeX/ifx
.. _LaTeX community forums: http://www.latex-community.org/forum/viewtopic.php?f=5&t=5976
.. _before: http://edunham.net/2015/02/14/resume_improvement_with_latex_macros.html

.. author:: default
.. categories:: none
.. tags:: LaTeX
.. comments::
