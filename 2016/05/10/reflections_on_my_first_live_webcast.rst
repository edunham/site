Reflections on my first live webcast
====================================

This morning, I participated in the O'Reilly `Emerging Languages Webcast`_
with my `"Rust from a Scripting Background"`_ talk. Here's how it went.

Preparation
-----------

I was contacted about a month before my webcast and asked to present my OSCON
talk as part of the event. I explained why my "How to learn Rust" talk didn't
sound like a good fit for the emerging languages webcast, and suggested the
"Starting Rust from a Scripting Background" talk that I gave at my `local Rust
meetup`_ recently as an alternative.

After we agreed on what talk would be suitable, O'Reilly's Online Events
Producers emailed me a contract to e-sign. The contract gives O'Reilly the
opportunity to reuse and redistribute my talk from the webcast, and promises
me a percentage of the proceeds if my recording is sold, licensed, or
otherwise used to make them money.

During the week before the webcast, I did a test call in which an O'Reilly
representative walked me through how to use the webcast software and verified
that my audio was good on the phone I planned to use for the webcast.

A final copy of the slides for the webcast, in my option of PDF or Powerpoint,
was due at 5pm the day before the event.

The Software (worked for me on Ubuntu)
--------------------------------------

O'Reilly Media provided an application called "Presentation Manager XD" from
on24.com that presenters log into during the event.

According to my email from O'Reilly, the requirements for the event are:

* Slides - PowerPoint or PDF only please with no embedded video or audio.
  Screen ratio of 4:3
* Robust Internet connection
* Clear, reliable phone line.
* Windows 7 or 8 running IE 8+, Firefox 22+ or Chrome 27+
* Mac OS 10.6+ running Firefox 22+ or Chrome 27+
* Latest version of Flash Player
* If you plan to share your screen, you will need to install a small
  application - you will be prompted to install it the first time you log
  into the platform.

Some of these requirements are lies. I used Firefox 46.0 on Ubuntu 14.04. I
did rewrite my slides in LibreOffice because it emits better PDFs than the
HTML tools I normally use, but I was also looking for an excuse to rewrite
them to clean up their organization.

I clicked around in the "Presentation Manager XD" UI and downloaded a file
called "ON24-ScreenShare-plugin", then ``chmod +x``'d it and executed it with
``./ON24-ScreenShare-plugin``. This caused Wine to run, install some Gecko
stuff, and start the screenshare plugin sufficiently well to share my screen
to the webcast tool.

I had to re-run the plugin in Wine after logging out of and back into my
window manager, of course. Additionally, the screenshare window's resizing is
finicky. It's fine to grab and drag the highlighted parts of the window's
border with the mouse, but the meta+click command with which one usually moves
windows in i3 causes the sides of the screenshare window to move independently
of each other.

Here's what the webcast UI looked like during streaming, just at the end of
the Kotlin talk while I was getting ready to start mine:

.. figure:: /_static/oreillywebcast.png
    :align: center

The Talk
--------

As previously mentioned, I rewrote my talk in LibreOffice Impress --
ostensibly to get a prettier PDF, but also because it's been a month or two
since I last prepared for it and re-writing helps me refresh my memory and
verify that all my facts are up to date.

GUI-based slide editing is downright painful after using rst-based tools for
so long, especially because LibreOffice has no good way to embed code samples
out of the box. I ended up going with screenshots from the Rust playground,
which were probably better than embedded code samples, but relearning how to
edit slides like a regular person wasn't a pleasant experience.

I took more notes than I normally do, since nobody on the webcast could see
whether I was reciting or reading. I'm glad I did, as having the notes on a
physical page in front of me was reassuring and helped me avoid missing any
important points.

I rehearsed the timing of each section of my slides individually, since it
naturally broke down into 7 or so discrete parts and I had previously
calculated how much of my hour to allocate to each section. Most sections ran
consistently over time when preparing, yet under time during the actual talk.
The lesson here is to rehearse until I'm happy with a section and can make it
the same duration twice in a row.

The experience of presenting a talk in a subjectively empty room made me
realize just what high-bandwidth communication regular conferences are.

Pros:

* No need to worry about eye contact
* All the notes you want
* Can't see anyone sleeping
* Chat channel allowed instant distribution of links
* Chat channel allowed expert attendees to help answer questions
* Presentation software allowed gracefully skipping slides, rather than the
  usual paging back and forth with the arrow keys

Cons:

* Can't take quick surveys by show of hands
* Negligible feedback on how many people are there and their body language of
  engagement/disengagement
* Silences are super awkward
* Can't see the shy attendees, in order to encourage participation

The audience asked fewer questions during the talk than I expected.
Fortunately, they came up with plenty of questions at the end -- extra
fortunate because I overcompensated on time and finished my slides about 15
minutes before the end of my speaking slot!

Q&A was surprisingly relaxing, as it was totally up to me which questions to
answer. I'll admit that I did select in favor of those that I could answer
concisely and eloquently, deferring the questions that didn't make as much
sense to think about them while I answered easier ones.

tl;dr
-----

In my experience, presenting a webcast was lower-stress and comparably
impactful to a conference talk.

For would-be presenters concerned about their or the audience's appearance,
the visual anonymity of a webcast could be a great place to start a speaking
career.

Speakers accustomed to presenting in rooms full of humans should expect
subtle feedback, like nods, smiles, and laughter, to be totally invisible in a
webcast environment.

And if O'Reilly asks you to do a webcast with them, I'd say go for it -- they
made the whole experience as seamless and easy as possible.


.. _Emerging Languages Webcast: http://www.oreilly.com/pub/e/3718
.. _Rust from a Scripting Background: http://talks.edunham.net/oscon-webcast2016/oscon-webcast-final.pdf
.. _local Rust meetup: http://www.meetup.com/pdxrust/


.. author:: default
.. categories:: none
.. tags:: speaking, mozilla, rustlang
.. comments::
