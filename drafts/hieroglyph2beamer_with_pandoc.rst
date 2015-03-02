hieroglyph2beamer with Pandoc
=============================

I've played with getting Sphinx to generate PDFs `before`_, and while
``rst2pdf`` generates a PDF with all the notes and pictures present, the
results aren't as beautifully typeset as I've come to expect from LaTeX. 

This made me wonder whether any tool exists to convert Hieroglyph slides into
`Beamer`_ presentations. 

.. more::

Why not just write LaTeX?
-------------------------

I sometimes do write LaTeX directly, such as for my `resume`_. LaTeX is the
right choice when a project requires:

* Extremely precise control of spacing, text size, and text position
* Output only to PDF
* Infrequent and relatively minor changes

However, the tradeoff is that one types a lot of boilerplate LaTeX code for a
relatively small amount of output, and the resulting documents are relatively
difficult to modify. 

I find that slides are a better fit with ReStructuredText's strengths:

* Minimal boilerplate
  * Easy to read as plain text
  * Fast to modify
  * Styling is completely divorced from content (HTML vs CSS)
* Supported out of the box almost everywhere I need it
  * Toolchain fits my needs
* Powerful enough to describe image scaling and tables
  * This is my major complaint against Markdown

So, I want to keep writing ReStructuredText, but I want the prettiness of
Beamer slides. It's time to see whether a tool for this has already been built
for me, or whether I'll have to make it myself.

Install Pandoc
--------------

Pip only has pandoc up through 1.0.0a8, which raises an import error if it
can't find a version of itself that starts with 1.12 / 1.13. So, I need system
pandoc. 

Let's see if we can get a system pandoc of a more recent version::

    $ yaourt -S pandoc-static

This takes quite a long time because it brings in a bunch of Haskell toolchain
stuff, ``ghc`` in particular. The amount of memory consumed by Yaourt's
attempt to install Pandoc caused the rather disadvantaged laptop I'm currently
using to freeze up, but ``cabal update; cabal install pandoc`` worked fine. 

Make Slides
-----------

::

    ~/.cabal/bin/pandoc -t beamer index.rst -o test.pdf

It generates pretty Beamer slides, just like that! If you want to get fancier
with it, `this blog post`_ is an interesting read. 

Comparison to Sphinx's ``make latexpdf``
----------------------------------------

1) Pandoc builds slides. ``make latexpdf`` doesn't.

2) ``make latexpdf`` is incredibly loud. Pandoc is silent. Loud, you say?
Running it with its default settings yields more lines of output than there
were lines in the source it's comiling, and that's just silly.::
    
    $ wc -l index.rst
    1053
    $ make latexpdf | wc -l
    1429

3) Pandoc is better at making the images the right size. With its default
settings, each image fills its slide, which is how they look when built by
Hieroglyph.

4) Pandoc goes over twice as fast::

    $ time make latexpdf
    real    2m14.815s
    user    2m12.820s
    sys 0m0.783s

    time ~/.cabal/bin/pandoc -t beamer index.rst -o test.pdf
    real    0m57.835s
    user    0m57.523s
    sys 0m0.233s

Of Notes and Images
-------------------

My slides are somewhat atypical in that all the useful content is in the
speaker notes, and the slides are filled by pictures for people to look at
if they get bored listening to me. 

I typically make a PDF copy of my slides for distribution after a talk, so
it's nice when readers can see my speaker notes. They're currently where all
of my reference URLs and other bonus content reside.

There are a few possible fixes to this problem: 

* Pre-process the rst file to shrink all the ``:scale: xx%`` directives by an
  additional 25% or so
* Break to a new slide after every image
* Break to a new slide before every note block

Any of these could be done in Haskell, following the `Pandoc scripting
guide`_. For sensible people who want it to Just Work, these scripts can also
be written in Python. 


.. _Pandoc scripting guide: http://johnmacfarlane.net/pandoc/scripting.html
.. _this blog post: http://andrewgoldstone.com/blog/2014/12/24/slides/
.. _resume: https://github.com/edunham/resume
.. _Beamer: http://texdoc.net/texmf-dist/doc/latex/beamer/doc/beameruserguide.pdf
.. _before: http://edunham.net/2015/02/24/making_a_pdf_of_hieroglyph_slides.html
.. author:: default
.. categories:: none
.. tags:: pandoc, hieroglyph, sphinx, rst
.. comments::
