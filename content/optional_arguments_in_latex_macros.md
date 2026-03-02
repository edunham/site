+++
path = "2015/03/30/optional_arguments_in_latex_macros"
title = "Optional Arguments in LaTeX Macros"
date = 2015-03-30

[taxonomies]
tags = ["LaTeX"]

[extra]
author = "E. Dunham"
+++
As I've mentioned [before](http://edunham.net/2015/02/14/resume_improvement_with_latex_macros.html), I use LaTeX to typeset my resume. I recently found a convenient workaround to handle formatting which differs based on whether or not a macro's argument is present.


The solution to testing whether a given macro argument is empty is buried deep within the [LaTeX community forums](http://www.latex-community.org/forum/viewtopic.php?f=5&t=5976):

    \newcommand{\maybe}[2]{
        \ifx&#1&
            Argument 1 was blank!
        \else
            Argument 1 was not blank.
        \fi
        Argument 2 was #2. 
    }

The LaTeX wikibook goes into more detail on the [ifx](http://en.wikibooks.org/wiki/TeX/ifx) command. It appears that `&#1` is interpereted as a macro for purposes of equality comparison, then compared against the `&` empty macro.

The [wikibook's TeX category](http://en.wikibooks.org/wiki/Category:TeX) discusses a variety of other `if` commands. Of particular interest is the [ifnum](http://en.wikibooks.org/wiki/TeX/ifnum) command, which tests whether a value is equal to a given integer.
