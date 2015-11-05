Beyond Openhatch
================

`OpenHatch`_ is a wonderful place to help new contributors find their first
open source issues to work on. Their training materials are unparalleled, and
the "projects submit easy bugs with mentors" model makes their list of
introductory issues reliably high-quality. 

However, once you know the basics of how to engage with an open source
project, you're no longer in the target audience for OpenHatch's list. Where
should you look for introductory issues when you want to get involved with a
new project, but you're already familiar with open source in general? 

An excellent `slide deck`_ by Josh Matthews contains several answers to this
question: 

* `issuehub.io`_ scrapes GitHub by labels and language

* `up-for-grabs`_ has an opt-in list of projects looking for new contributors,
  and scrapes their issue trackers for their "jump in", "up for grabs" or
  other "new contributors welcome" tags.

* If you're looking for Mozilla-specific contributions outside of just code,
  `What can I do for Mozilla?`_ can help direct you into any of Mozilla's
  myriad opportunities for involvement.

Additionally, the `servo-starters`_ page has a custom view of easy issues
sorted by Servo's project-specific tags. 

GitHub Tricks
-------------

If you're looking for open issues across all repos owned by a particular user
or organization, you can use the search at `https://github.com/pulls
<https://github.com/pulls>`_ and specify the "user" (or org) in the search
bar. For instance, `this search`_ will find all the unassigned, easy-tagged
issues in the ``rust-lang`` org. Breaking down the search: 

* ``user:rust-lang`` searches all repos owned by ``github.com/rust-lang``. It
  could also be someone's github username. 

* ``is:open`` searches only open issues. 

* ``no:assignee`` will filter out the issues which are obviously claimed. Note
  that some issues without an assignee set may still have a comment saying
  "I'll do this!", if it was claimed by a user who did not have permissions to
  set assignees and then not triaged.

* ``label:E-Easy`` uses my prior knowledge that most repos within
  ``rust-lang`` annotate introductory bugs with the ``E-easy`` tag. When in
  doubt, check the ``contributing.md`` file at the top level in the org's most
  popular repository for an explanation of what various issue labels mean. If
  that information isn't in the contributing file or the README, file a bug!

Am I missing your favorite introductory issue aggregator? Shoot me an email to
``___@edunham.net`` (fill in the blank with anything; the email will get to
me) with a link, and I'll add it here if it looks good!


.. _this search: https://github.com/pulls?utf8=%E2%9C%93&q=is%3Aopen+user%3Arust-lang+no%3Aassignee+label%3AE-Easy+
.. _OpenHatch: https://openhatch.org/
.. _What can I do for Mozilla?: http://up-for-grabs.net/#/
.. _issuehub.io: http://issuehub.io
.. _servo-starters: http://servo.github.io/servo-starters/
.. _slide deck: http://www.joshmatthews.net/fsoss15/
.. _up-for-grabs: http://up-for-grabs.net/

.. author:: default
.. categories:: none
.. tags:: FLOSS
.. comments::
