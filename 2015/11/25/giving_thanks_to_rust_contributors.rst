Giving Thanks to Rust Contributors
==================================

It's the day before Thanksgiving here in the US, and the time of year when
we're culturally conditioned to be a bit more public than usual in giving
thanks for things.

As always, I'm grateful that I'm working in tech right now, because almost any
job in the tech industry is enough to fulfill all of one's tangible needs like
food and shelter and new toys.  However, plenty of my peers have all those
material needs met and yet still feel unsatisfied with the impact of their
work. I'm grateful to be involved with the Rust project because I know that my
work makes a difference to a project that I care about. 

Rust is satisfying to be involved with because it makes a difference, but that
would not be true without its community. To say thank you, I've put together a
little visualization for insight into one facet of how that community works
its magic:

.. figure:: /_static/orglog_deploy_teaser.png

The stats page is interactive and available at `http://edunham.github.io/rust-org-stats/
<http://edunham.github.io/rust-org-stats/>`_. The pretty graphs take a moment
to render, since they're built in your browser.

There's a whole lot of data on that page, and you can scroll down for a list
of all authors. It's especially great to see the high impact that the month's
new contributors have had, as shown in the group comparison at the bottom of
the "natural log of commits" chart! 

It's made with the little toy I wrote a while ago called `orglog`_, which
builds on `gitstat`_ to help visualize how many people contribute code to a
GitHub organization. It's deployed to GitHub Pages with TravisCI (`eww`_) and
`nightli.es`_ so that the Rust's organization-wide contributor stats will be
automatically rebuilt and updated every day. 

If you'd like to help improve the page, you can contribute to `gitstat`_ or
`orglog`_! 

.. _orglog: https://github.com/edunham/orglog
.. _gitstat: https://github.com/youknowone/gitstat
.. _nightli.es: https://nightli.es/
.. _eww: https://github.com/edunham/orglog/blob/master/out/forcepush.sh

.. author:: E. Dunham
.. categories:: none
.. tags:: gitstat, orglog, rustinfra, travisci 
.. comments::
