Blogging with Tinkerer
======================

I had a `wok <http://wok.mythmon.com/>`_ site here for a while, but I rarely
(okay, never) updated it. My experience with blogging platforms has been
limited to Wordpress (both self-hosted and on wordpress.com), Wok, Pelican,
and an abomination of a Trac plugin that I'd prefer to forget. 

Here's how and why I am now trying `Tinkerer <http://tinkerer.me/index.html>`_.

.. more::

Mythmon wrote Wok to meet his projects' needs, which have customizabity as a
high priority and assume that the user is already comfortable with graphic
design, CSS, and JavaScript. Since Wok's relatively small userbase means
there's no standard template with the look that I had in mind for my personal
site, I had some fun adventures in graphic design before getting frustrated
and setting the project aside indefinitely. 

I've worked on other projects that use Wok, such as the `OSU LUG
<http://lug.oregonstate.edu/>`_ website, and found that it's easy to use as
long as the artistic parts are handled by someone with more sophisticated
aesthetic sensibilities than my own. Although I know an ugly website when I
see it, my ideal user interface is a UNIX terminal, so I never managed to come
up with a satisfying design for my personal site.

I revisited my site recently and, in true sysadmin fashion, decided that the
obvious way to solve the "human isn't happy" problem was to switch to a fancy
new technology and see if that helped. `Staticgen.com
<http://www.staticgen.com/>`_ has an exhaustive list of site generators, which
one can sort by language and rating on GitHub. 

My criteria for a "better" site generator are as follows: 

* **Generate static sites**. The purpose of my personal web site is just
  to disseminate a few pages of information, and the best way to accomplish
  that goal is a few static pages. I see no reason that my poor little
  DigitalOcean droplet should have to do more work than absolutely necessary
  for each visitor to my blog -- generating static pages only when they're
  changed is like caching a dynamic site, taken to the extreme. Plus, refusing
  to run any code input by my site's users (such as database queries, PHP
  scripts, etc.) on my server eliminates an entire category of security
  vulnerabilities.  

* **Take .rst input**. Whenever I have a choice, I prefer to write
  presentations, documentation, and curriculum in `reStructuredText
  <http://docutils.sourceforge.net/rst.html>`_. In my experience, RST strikes
  a good balance between being supported by most documentation-generation
  systems and facilitating easy links, tables, and image embedding. Markdown
  is RST's main competitor and looks a bit simpler in plaintext, but if you
  want to embed an image or table, you're out of luck. It's *possible* to get
  tables and images in markdown, if you don't mind writing raw HTML by hand,
  but it isn't *pleasant*. 

* **Free and Open Source**. Duh; if I improve it, I want to be able to share.
  If I love it and its maintainer gives up on it, I want to be able to keep
  using it anyway. 

* **Written in a language I know or want to learn**. First, because I don't
  want to learn to set up the dependencies for some language that I never
  intend to use again. Second, because I'll inevitably end up getting an error
  message, or trying to hack in some new feature, and find myself digging
  around in the guts of my site generator. Althought the inner workings of
  these things are rarely pretty, it's less painful if I know or at least
  appreciate the language they're written in.

* **Minimize irrelevant features for my use case**. If a program's
  implementation and documentation are cluttered with features that I don't
  expect to ever want, the time I spend sorting support for those features
  from support for the parts I need will be wasted. 

* **Must ship with templates that I like**. Yes, I'm lazy. After my
  misadventure trying to design a site theme from scratch, I'm rebounding
  toward the other extreme and trying to find something that Just Works how I
  want it to, right out of the box. 

* **Neutral or positive reputation among people I respect**. I know, it's not
  *cool* to admit that peer pressure exists, but it does. If everyone whose
  preferences I usually agree with says bad things about a particular blogging
  platform, I expect that it won't be very enjoyable for me to use either, and
  my time invested in learning it is likely to have been wasted. A popular and
  widely used SSG would be a safe bet, but I wouldn't necessarily learn
  anything new by deploying it. However, gaining experience with a promising
  but previously unheard-of tool is advantageous to my social groups, because
  next time someone asks for opinions, I'll have a non-redundant review to
  add.


Ultimately, the feature which set Tinkerer apart from the other SSGs which
meet those criteria is that it feels like a thin layer on top of Sphinx, a
versatile and delightful documentation tool with which I'm already very
familiar. This has allowed me to leverage my existing knowledge and get a site
up in only a couple of hours, rather than fighting with an unfamiliar design
paradigm. 


.. author:: default
.. categories:: none
.. tags:: tinkerer 
.. comments::
