Subdomains
==========

I have a wildcard CNAME set up so that ``anything.edunham.net`` gets directed
to this server. This way, deploying a new toy is as simple as dropping it into
a directory where Apache has permissions, creating a config file in
``/etc/apache2/sites-available``, enabling the new site, and reloading Apache. 

This is nice in that it keeps their URLs independent of my blog, so that
changes won't accidentally break links to them. It's less nice because, unless
I list them somewhere like here, people might never find them. So here's a
list!

`talks.edunham.net`_
--------------------

Exact, verbatim copies of the slides that I used in various presentations. 

The slides are made with Hieroglyph, so enable JavaScript and hit
``control+c`` to view the presenter console with all the speaker notes. My
slides tend to be mostly pictures, with all the important content in the
notes. 

Slides will be posted here after each talk, and I promise that the URLs to 
each set of slides will keep working for as long as I run this site.

`licensecheck.edunham.net`_
---------------------------


.. figure:: /_static/licensecheck_edunham_net.png
    :scale: 50%
    :align: center

You put in a GitHub username, it tells you which of their public repos
have a LICENSE or COPYING file and which ones do not. 

`Source`_ is on GitHub, and pull requests to make it less ugly are welcome. 
 
`nano.edunham.net`_
-------------------


.. figure:: /_static/nano_edunham_net.png
    :scale: 50%
    :align: center

A simple calculator that I wrote to help National Novel Writing Month
participants do some very specific math about their word counts.

Source is `on GitHub`_. 

.. _licensecheck.edunham.net: http://licensecheck.edunham.net/
.. _nano.edunham.net: http://nano.edunham.net/
.. _talks.edunham.net: http://talks.edunham.net/
.. _Source: https://github.com/edunham/pleaselicense
.. _on GitHub: https://github.com/edunham/toys/tree/master/nano
