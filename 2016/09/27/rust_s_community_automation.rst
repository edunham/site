Rust's Community Automation
===========================

Here's the text version, with clickable links, of my Automacon lightning talk
today.

.. more::

Intro
-----

I'm a DevOps engineer at Mozilla Research and a member of the Rust Community
subteam, but the conclusions and suggestions in this talk are my own
observations and opinions.

The slides are a result of trying to write my own CSS for `sliderust
<https://github.com/kmcallister/sliderust>`_... Sorry about the ugliness.

I have 10 minutes, so this is not the time to teach you any Rust. Check out
`rust-lang.org <https://www.rust-lang.org/en-US/>`_, the `Rust Community
Resources <https://rust-community.github.io/resources/>`_, or your city's Rust
meetup to get started with the language.

What we *are* going to cover is how Rust automates some community tasks, and
what you can learn from our automation.

Community
---------

I define "community", in this context, as "the human interaction work
necessary for a project's success". This work is done by a wide variety of
people in many situations. Every interaction, from helping a new contributor
to discussing a proposed code change to criticizing someone's behavior,
affects the overall climate of a project's community.

Automation
----------

To me, "automation" means "offloading peoples' work onto a system".
This can be a computer system, but I think it can also mean changes to the
social systems that guide peoples' behavior.


So, community automation is a combination of:

* Building tools to do things the humans used to have to
* Tweaking the social systems to minimize the overhead they create

Scoping the Problem
-------------------

While not all things can be automated and not all factors of the community are
under the project leadership's control, it's not totally hopeless.

Choices made and automation deployed by project leaders can help control:

* Which contributors feel welcome or unwelcome in a project
* What code makes it into the project's tree
* Robots!

Moderation
----------

Our robots and social systems to improve workflow and contributor experience
all rely on community members' cooperation. To create a community of people
who want to work constructively together and not be jerks to each other, Rust
defines behavior expectations `code of conduct
<https://rust-community.github.io/resources/>`_. The important thing to note
about the CoC is that half the document is a clear explanation of how the
policies in it will be enforced. This would be impossible without the
dedication of the amazing `mod team
<https://www.rust-lang.org/en-US/team.html#Moderation-team>`_.

The process of moderation cannot and should not be left to a computer, but we
can use technology to make our mods' work as easy as possible. We leave the
human tasks to humans, but let our technologies do the rest.

In this case, while the mods need to step in when a human has a complaint
about something, we can automate the process of telling peole that the rules
exist. You can't join the IRC channel, post on the Discourse forums, or even
read the Rust subreddit without being made aware that you're expected to
follow the CoC's guidelines in official Rust spaces.

Depending on the forums where your project communicates, try to automate the
process of excluding obvious spammers and trolls. Not everybody has the skills
or interest to be an excellent moderator, so when you find them, avoid wasting
their time on things that a computer could do for them!

It didn't fit in the talk, but `this Slashdot post
<https://developers.slashdot.org/comments.pl?sid=8652809&cid=51352141>`_ is
one of my favorite examples of somebody being filtered out of participating in
the Rust community due to their personal convictions about how project
leadership should work. While we do miss out on that person's potential
technical contributions, we also save all of the time that might be spent
hashing out our disagreements with them if we had a less clear set of
community guideines.

Robots
======

This lightning talk highlighted 4 categories of robots:

* Maintaining code quality
* Engaging in social pleasantries
* Guiding new contributors
* Widening the contributor pipeline

Longer versions of this talk also touch on `automatically testing compiler
releases <https://github.com/brson/taskcluster-crater>`_, but that's more than
10 minutes of content on its own.

The Not Rocket Science Rule of Software Engineering
---------------------------------------------------

To my knowledge, `this blog post
<http://graydon.livejournal.com/186550.html>`_ by Rust's inventor Graydon
Hoare is the first time that this basic principle has been put so succinctly:

  Automatically maintain a repository of code that always passes all the tests.

This policy guides the Rust compiler's development workflow, and has trickled
down into libraries and projects using the language.


Bors
----

The name Bors has been handed down from Graydon's `original autolander bot
<https://github.com/graydon/bors>`_ to an instance of `Homu
<https://github.com/servo/homu>`_, and is often verbed to refer to the simple
actions he does:

1) Notice when a human says "r+" on a PR
2) Create a branch that looks like master will after the change is applied
3) Test that branch
4) Fastforward the master branch to the tested state, if it passed.

Keep your tree green
--------------------

Saying "we can't break the tests any more" is a pretty significant cultural
change, so be prepeared for some resistance. With that disclaimer, the path to
following the Not Rocket Science Rule is pretty simple:

1) Write tests that fail when your code is bad and pass when it's good
2) Run the tests on every change
3) Only merge code if it passes all the tests
4) Fix the tests whenever thy're wrong.

This strategy encourages people to maintain the tests, because a broken test
becomes everyone's problem and interrupts their workflow until it's fixed.

I believe that tests are necessary for all code that people work on. If the
code was fully and perfectly correct, it wouldn't need changes -- we only
write code when something is wrong, whether that's "It crashes" or "It lacks
such-and-such a feature". And regardless of the changes you're making, tests
are essential for catching any regressions you might accidentally introduce.


Automating social pleasantries
------------------------------

Have you ever submitted an issue or change request to a project, then not
heard back for several months? It feels bad to be ignored, and the project
loses out on potential contributors.

Rust automates basic social pleasantries with a robot called `Highfive
<https://github.com/nrc/highfive>`_. Her tasks are easy to explain, though the
implementaion details can be tricky:

1) Notice when a change is submitted by a new contributor, then welcome them
2) Assign reviewers, based on what code changed, to all PRs
3) Nag the reviewer if they seem to have forgotten about their assignment

If you don't want a dedicated greeter-bot, you can get many of these features
from your code management system:

* Use issue and pull request templates to guide potential contributors to the
  docs that can help them improve their report or request.

* Configure notifications so you find out when someone is trying to interact
  with your project. This could mean muting all the noise notifications so the
  signal ones are available, or intermittently polling the repositories that
  you maintain (a daily cron job or weekly calendar reminder works just fine).

Guide new contributors
----------------------

In open source projects, "I'm new; what can I work on?" is a common inquiry.
In internal projects, you'll often meet colleagues from elsewhere in your
organization who ask you to teach them something about the project or the
skills you use when working on it.

The Rust-implemented browser engine `Servo <https://servo.org/>`_ is actually
a slightly better example of this than the compiler itself, since the smaller
and younger codebase has more introductory-level issues remaining. The site
`starters.servo.org <http://starters.servo.org/>`_ automatically scrapes the
organization's issue trackers for easy and unclaimed issues.

Issue triage is often unrewarding, but using the tags for a project like this
creates a greater incentive to keep them up to date.

When filing introductory issues, try to include links to the relevant
documentation, instructions for reproducing the bug, and a suggestion of what
file you would look in first if you tackled the problem yourself.

Automating mentorship
---------------------

Mentorship is a highly personalized process in which one human transfers their
skills to another. However, large projects often have more contributors
seeking the same basic skills than mentors with time to teach them.

The parts of mentorship which don't explicitly require a human mentor can be
offloaded onto technology.

The first way to automate mentorship tasks is to maintain correct and
up-to-date documentation. Correct docs train humans to consult them before
interrupting an expert, whereas docs that are frequently outdated or wrong
condition their users to skip them entirely.

Use tools like `octohatrack <https://github.com/labhr/octohatrack>`_ and your
project status updates to identify and recognize contributors who help with
docs and issue triage. Docs contributions may actually save more developer and
community time than new code features, so respect them accordingly.

Finally, maintain a list of introductory or mentored issues -- even if that's
just a Google Doc or Etherpad.

Bear in mind that an introductory issue doesn't necessarily mean "suitable for
someone who has never coded before". Someone with great skills in a scripting
language might be looking for a place to help with an embedded codebase, or a
UX designer might want to get involved with a web framework that they've used.
Introductory issues should be clear about what knowledge a contributor should
acquire in order to try them, but they don't have to all be "easy".

Automating the pipeline
-----------------------

Drive-by fixes are to being a core contributor as interviews are to full
time jobs. Just as a company attempts to interview as many qualified
candidates as it can, you can recruit more contributors by making your
introductory issues widely available.

Before publicizing your project, make sure you have a ``CONTRIBUTING.txt`` or
good ``README`` outlining where a new contributor should start, or you'll be
barraged with the same few questions over and over.

There are a variety of sites, which I call issue aggregators, where people who
already know a bit about open source development can go to find a new project
to work on. I keep a list on `this page
<http://edunham.net/pages/issue_aggregators.html>`, `pull requests welcome
<https://github.com/edunham/site/blob/master/pages/issue_aggregators.rst>` if
I'm missing anything. Submitting your introductory issues to these sites
broadens your pipeline, and may free up humans' recruiting time
to focus on peole who need more help getting up to speed.

If you're working on internal rather than public projects, issue aggregators
are less relevant. However, if you have the resources, it's worthwhile to
consider the recruiting device of open sourcing an internal tool that would be
useful to others. If an engineer uses and improves that tool, you get a tool
improvement and they get some mentorship. In the long term, you also get a
unique opportunity to improve that engineer's opinion of your organization
while networking with your engineers, which can make them more likely to want
to work for you later.


Follow Up
---------

For questions, you're welcome to chat with me on Twitter (@QEDunham), email
(automacon <at> edunham <dot> net), or IRC (edunham on irc.freenode.net and
irc.mozilla.org).

Slides from the talk are `here <http://talks.edunham.net/automacon2>`_.

.. author:: E. Dunham
.. categories:: none
.. tags:: conferences, rust
.. comments::
