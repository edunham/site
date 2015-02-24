Making a PDF of Hieroglyph slides
=================================

I build slides for my presentations with Hieroglyph, which makes beautiful
HTML presentations out of raw ReStructuredText. However, HTML slides with my
speaker notes in a JavaScript console are not ideal for redistribution. 

.. more::

Try Building via LaTeX
-----------------------

.. note:: 

    Skip down to the rst2pdf part if you want an easy and effective solution
    to this problem. I'm only writing up the LaTeX stuff in case it's useful
    to people Googling the errors that I hit. 

According to the `Sphinx tutorial`_, the recommended way to build PDFs of
Sphinx documentation is through the `LaTeX builder`_. According to the docs,
this should enable me to simply use ``make latexpdf``. 

I had installed ``texlive-core`` to do basic PDF rendering, but it did not
include certain required packages such as ``titlesec.sty``. At the `Arch
Wiki's suggestion`_, I installed ``texlive-most``. The fonts took a long time
to download, but it will prevent further problems with missing packages.

With ``texlive-most`` installed, it finds the required styles but has a
problem with an errant Unicode character in the input file::

    ! Package inputenc Error: Unicode char \u8:­ not set up for use with LaTeX.

A thread on `StackExchange`_ theorizes that the ``\u8`` represents a "no-break
space" character, so I think it's safe to strip it out entirely. A rather
heavy-handed fix `from elsewhere`_ is to forcibly convert the whole file from
UTF-8 to ASCII:: 

    iconv -c -f utf-8 -t ascii index.rst > index.rst 

After violently taking away its unicode, the file builds a pdf in
``_build/latex/``. However, the pdf is blank except the title and the table of
contents heading.

Rather than traveling further down this gratuitously LaTeX-flavored rabbit
hole, I decided to seek a simpler solution.

.. _Sphinx Tutorial: http://sphinx-doc.org/tutorial.html
.. _LaTeX builder: http://sphinx-doc.org/builders.html#sphinx.builders.latex.LaTeXBuilder
.. _Arch Wiki's suggestion: https://wiki.archlinux.org/index.php/TeX_Live
.. _from elsewhere: http://stackoverflow.com/questions/8562354/remove-unicode-characters-from-textfiles-sed-other-bash-shell-methods
.. _StackExchange: http://tex.stackexchange.com/questions/83440/inputenc-error-unicode-char-u8-not-set-up-for-use-with-latex

Build Directly to PDF 
---------------------

According to the `Sphinx docs`_, there exists a builder which converts rst
directly into pdf. 

To set it up, add the builder in ``conf.py`` by adding this line to the end::

    extensions += ['rst2pdf.pdfbuilder']

Also add the pdf target to the Makefile:: 

    pdf:                                                                            
        $(SPHINXBUILD) -b pdf $(ALLSPHINXOPTS) $(BUILDDIR)/pdf                      
        @echo                                                                       
        @echo "Build finished. The PDF is in $(BUILDDIR)/pdf."

Remember that Makefiles need hard tabs; a tab expanded into spaces will not be
recognized by Make. You can set this behavior up automatically with Vim's
filetype plugin, or just type ``:set noexpandtab`` when editing Makefiles.

Now ``make pdf`` throws the error::

    WARNING: "pdf_documents" config value references unknown document contents

This means that ``rst2pdf`` wants some extra configuration information. `The
manual`_ doesn't discuss Sphinx-specific configuration, but `a Sphinx issue`_ 
explains that you need one more line in ``conf.py``::

    pdf_documents = [('index', u'sample', u'Sample rst2pdf doc', u'Your Name'),]

After adding the ``pdf_documents`` configuration, ``make pdf`` generates an
oddly styled but entirely legible pdf copy of the presentation's content. 

.. _Sphinx docs: http://sphinx-doc.org/builders.html 
.. _The manual: http://ralsina.me/static/manual.pdf
.. _a Sphinx issue: https://bitbucket.org/birkenfeld/sphinx/issue/999/create-pdf-using-rst2pdf


.. author:: default
.. categories:: none
.. tags:: hieroglyph, sphinx, latex
.. comments::
