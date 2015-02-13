My Second Steps with Javascript
===============================

There are many things to hate about Javascript. I'm not a fan of the language,
and I've been known to laugh at people when they make unqualified claims that
it's "good". 

However, I sometimes find myself wanting to build toys and share them with
everyone who has a web browser. Compared to the security and scaling
implications of making my poor little VPS run a bunch of other people's code
for them, Javascript becomes the only viable option. 

.. more::

Lazy Sysadmin Use Case
----------------------

Sometimes I have an idea which would fit beautifully into a shell script, and
is a useful tool or toy that I'd like to share with the world. Unfortunately,
"the world" consists primarily of people who can't or won't run a shell script
themselves. The lowest common demoninator in this target audience is the
ability to use a web browser. 

One option would be to write the scripts in Bash or Python or PHP and set up
my web server so that it runs the code for visitors to my site, with whatever
inputs they give it. Unfortunately, from a security perspective, the problems
with this idea are second only to handing over all your banking information to
a disinherited royal heir. (Sure, some people do the latter `for fun`_, but
they have a lot more free time than I do.)

There are ways that I could have my server run other people's code in a
"secure" way, but it's a lot easier to simply automate their browsers to run
their calculations for them. 

First Project: Novel Word Calculator
------------------------------------

For `National Novel Writing Month`_, crazy people like myself attempt to write
50,000 words in 30 days. We also write a lot of other words, on forums and
IRC, to encourage one another and sometimes procrastinate on the 50,000. The
NaNoWriMo site lets you track your word count over time, but I had some extra
calculations that I found motivational and wanted to share. 

Novelists have some overlap with other types of nerd, but on the whole, I
couldn't just hand out my custom `python script`_ and say "run it!" unless I
wanted to become tech support for hundreds of novices trying to install Python
on Mac and Windows. 

So, to share it with the world (and procrastinate on that 50,000-word
deadline looming in the distance), I ported it to `javascript`_ and put it `in
a subdomain of my site`_. 

Second Project: GitHub Stalking Tool
------------------------------------

I wrote a cute but useless little `article`_ preaching to the choir about how
licenses are cool, and then wanted an easy way to check whether I was
following my own advice. 

"GitHub has an API, right? JS can do stuff like make API calls, right? This
shouldn't be too hard..."

One week and many hours of confusion later, I have a `piece of code`_ that
works for the originally intended purpose. Learning experiences here have been
that CSS is still hard, JS still tends to defy one's expectations, the API has
a 60 request per hour rate limit unauthenticated, and One Does Not Simply
OAuth. Or more accurately, OAuth requires a server-side program with an
application secret, and everything gets exponentially more complicated from
there. 

Next time I feel like experiencing many hours of frustration, I'll work
through the process of adding OAuth (so that you can log into github and click
a button to automatically add licenses to unlicensed repos, all through my
site), then write up a tutorial. For now, though, `it works okay`_.  


.. _it works okay: http://licensecheck.edunham.net/
.. _piece of code: https://github.com/edunham/pleaselicense
.. _article: http://edunham.net/2015/02/04/please_license_your_code.html
.. _javascript: https://github.com/edunham/toys/blob/master/nano/calc.js
.. _in a subdomain of my site: http://nano.edunham.net/
.. _python script: https://gist.github.com/edunham/a5ff33070b359fcebc1c
.. _National Novel Writing Month: http://nanowrimo.org/
.. _for fun: http://www.419eater.com/

.. author:: default
.. categories:: javascript, foss 
.. tags:: none
.. comments::
