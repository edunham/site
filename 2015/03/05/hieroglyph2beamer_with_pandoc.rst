hieroglyph2beamer with Pandoc
=============================

I've played with getting Sphinx to generate PDFs `before`_, and while
``rst2pdf`` generates a PDF with all the notes and pictures present, the
results aren't as beautifully typeset as I've come to expect from LaTeX. 

This made me wonder whether any tool exists to convert Hieroglyph slides into
`Beamer`_ presentations. 

.. more::

.. note::

    Skip to the end_ if you just want the code for converting Hieroglyph
    sources to Beamer slides. 

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


Allow Page Breaks
-----------------

My slides are somewhat atypical in that all the useful content is in the
speaker notes, and the slides are filled by pictures for people to look at
if they get bored listening to me. 

I typically make a PDF copy of my slides for distribution after a talk, so
it's nice when readers can see my speaker notes. They're currently where all
of my reference URLs and other bonus content reside. Notes are visible by
default in Pandoc's beamer output, but they tend to be pushed off the slides by
the large images. 

Beamer has an ``allowframebreaks`` option, which makes sure all your content
is visible by wrapping it to as many slides as needed. I learned how to inject
a custom preamble from `agoldst's lecture notes repo`_.  

First, put the following lines into ``preamble.tex``::

    \let\oldframe\frame
    \renewcommand\frame[1][allowframebreaks]{\oldframe[#1]}

Then tell Pandoc to include it in the "header":::

    $ ~/.cabal/bin/pandoc -t beamer -H preamble.tex -V fontsize=8pt index.rst -o test.pdf

The Pipe Problem
----------------

Sphinx and Hieroglyph allow the use of pipes (``|``) to force a blank line in
html output, which I often use to align my images aesthetically in my slides.
However, this use of pipes is neither mentioned in the `rst spec`_ nor supported
by Pandoc. 

Although the functionality of ignoring pipes could probably be implemented as
a `filter`_, I decided to take the path of less Haskell-writing and leverage
Pandoc's ability to behave like a nice Unix utility.::

    sed 's/^|$//' index.rst | ~/.cabal/bin/pandoc -t beamer -f rst -o test.pdf -H preamble.tex

Note that in this command I also tell Pandoc the file type it's converting
from, with the ``-f`` option. 

Shrinking Figures A Bit
-----------------------

.. note::

    Pandoc tries to emit its output in the format specified by the extension
    of the output file that you give it. ``-o test.pdf`` renders the Beamer
    slides as a pdf, whereas ``-o test.tex`` simply produces LaTeX which could
    later be rendered into slides. This is helpful for debugging purposes.


The output is getting prettier, but there are still blank slides before some
of the images. It appears that the blank slides are only inserted before the
images whose height is close to the full height of the slide. 

In the LaTeX source of the pandoc-generated beamer slides, figures look
something like this::

    \begin{figure}[htbp]
    \centering
    \includegraphics{_drawn/hello.png}
    \caption{}  
    \end{figure}

I'm using the preamble trick mentioned above to customize each figure. I found
the parameters for scaling only those images which would otherwise be too
large on `stackoverflow`_. Renewing the ``\includegraphics`` command is
`tricky`_, because it has an optional parameter, but it can be done with the
``letltxmacro`` package. I added these lines to my ``preamble.tex``::

    \usepackage{letltxmacro}
    \LetLtxMacro{\OldIncludegraphics}{\includegraphics}
    \renewcommand{\includegraphics}[2][]{\OldIncludegraphics[width=0.5\textwidth,height=0.5\textheight,keepaspectratio,
    #1]{#2}}

Now images are displayed as no larger than half the size of the total text
area on a slide.

.. _end:

All Together Now
================

The Makefile gets these lines. Remember to use hard tabs, not spaces, because
it is a Makefile::

    pdf:                                                                            
        sed "s/^|$$//" index.rst | ~/.cabal/bin/pandoc -t beamer -f rst -V fontsize=8pt -o $(BUILDDIR)/slides.pdf -H preamble.tex
        @echo                                                                       
        @echo "Build finished. The PDF is at $(BUILDDIR)/slides.pdf."               
                 
And the ``preamble.tex`` gets the following::

    % Allow notes to wrap to additional slides.                                     
    \let\oldframe\frame                                                             
    \renewcommand\frame[1][allowframebreaks]{\oldframe[#1]}                         
                                                                                    
    % Prevent spurious blank slides by shrinking images when needed.                
    \usepackage{letltxmacro}                                                        
    \LetLtxMacro{\OldIncludegraphics}{\includegraphics}                             
    \renewcommand{\includegraphics}[2][]{\OldIncludegraphics[width=0.5\textwidth,height=0.5\textheight,keepaspectratio,#1]{#2}}

Now ``make pdf`` turns the ``index.rst`` of Hieroglyph slides into a
relatively beautiful Beamer presentation!
    
.. _agoldst's lecture notes repo: https://github.com/agoldst/tex/tree/master/lecture-slides/notes
.. _tricky: http://tex.stackexchange.com/questions/79724/resize-all-images-in-latex-to-a-percentage-width
.. _stackoverflow: http://tex.stackexchange.com/questions/11954/automatically-scale-big-and-small-graphics-for-beamer-presentations    
.. _rst spec: http://docutils.sourceforge.net/docs/ref/rst/restructuredtext.html
.. _filter: http://johnmacfarlane.net/pandoc/scripting.html
.. _this blog post: http://andrewgoldstone.com/blog/2014/12/24/slides/
.. _resume: https://github.com/edunham/resume
.. _Beamer: http://texdoc.net/texmf-dist/doc/latex/beamer/doc/beameruserguide.pdf
.. _before: http://edunham.net/2015/02/24/making_a_pdf_of_hieroglyph_slides.html
.. author:: default
.. categories:: none
.. tags:: pandoc, hieroglyph, sphinx, rst
.. comments::
