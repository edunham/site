Better remote teaming with distributed standups
===============================================

Agile development's artifact of the daily stand-up meeting is a great idea. In
theory, the whole team should stand together (sitting or eating makes meetings
take too long) for about 5 minutes every morning. Each person should comment
on:

* What they did since yesterday
* What they plan on doing today
* Any blockers, thigns they're waiting on to be able to get work done
* Anything else

And then, 5 minutes later, everybody gets back to work. But do they really?

.. more::

Problems with in-person standups
--------------------------------

When I've participated in stand-up meetings in person, I've noticed a few
major flaws:

* Context switching into and out of the meeting `impacts a maker's schedule
  <http://www.paulgraham.com/makersschedule.html>`_ by substantially more than
  the meeting's planned 5 minutes.

* People naturally tend to **problem-solve** during the meeting, and overcoming
  this urge to be helpful can be difficult and frustrating. However, allowing
  this problem-solving is a waste of most attendees' time and can drag the
  meeting out to over an hour if left unchecked.

* The content of the meeting isn't **recorded**. If I run into an issue
  that I think I recall Jane saying she was blocked on last week, I can either
  interrupt her work to ask her about it, send her an email and wait for her
  to reply, or just fight it myself. I can't look it up anywhere.

* If a team decides to keep notes, this "`office housework
  <https://www.nytimes.com/2015/02/08/opinion/sunday/sheryl-sandberg-and-adam-grant-on-women-doing-office-housework.html?_r=2>`_
  may be distributed inequitably among team members. Or if everyone takes
  turns taking notes, well... not everyone is necessarily skilled at
  note-taking, so there's little guarantee that the notes will be consistently
  useful.

When an international team decides to pursue standup meetings through a
synchronous medium like a phone or video call, it keeps all of these drawbacks
while adding the problem of **time zones**. Let's say your San Francisco-based
company holds your daily standup at the perfectly sensible hour of 10am.
Colleagues in New York City may love this, as it's 1pm their time so they have
plenty of time to prepare for the meeting. But your "perfectly reasonable"
10am standup isn't so reasonable internationally: it's 5pm for a colleague in London,
6pm in Paris, 6am the next day in Auckland, and sleep-worthy hours like
4AM the next day in Sydney and 2am, also the next day, in Tokyo.

Is demanding that some team members stay late at the office every day at the
expense of family and personal commitments, or wake up before sunrise, the
way that you want to treat your team? Is making a request like this, which
disproportionately impacts your international colleagues, consistent with your
values?

The better way: Robots!
-----------------------

If you're familiar with my talks about community automation, you won't be
surprised at my excitement to share another robot which makes life better.

A team I'm on has recently started using a Slack app called `Geekbot
<https://geekbot.io/>`_ to perform asynchronous, inherently logged, on-task
standup meetings. The only thing special about Geekbot is that somebody else
has already done the coding, testing, and debugging -- if your team uses IRC
or another chat client, the basic "ask questions of each team member and post
their answers, once per day" functionality is trivial to implement on any
extensible platform.

These distributed, asynchronous standups are the best standup meetings I've
ever participated in. Why?

* They stay on task. You answer specific questions to the robot in PM, the
  robot posts your answers to a channel, and anyone who wants to chat about
  what you said has to do so outside the main thread of that conversation.

* They're asynchronous. If we added colleagues in any time zone, they could
  configure the bot to ping them at a time they find convenient, and the rest
  of the team could still keep up with their progress as long as everyone keeps
  reporting roughly every 24 hours.

* Others' updates minimize interruption. Rather than dropping what I'm doing
  to take a call for a meeting, I can use my ordinary chat-multitasking skills
  to read my colleagues' updates while waiting on another task to complete.

* They're self-recording. I can look back after lunch and see what I claimed
  I'd get done today; I can search my chat logs for "who was working on that
  component?". I strongly prefer to answer easy questions like this myself
  instead of interrupting others -- I save that for the difficult, interesting
  questions -- so I deeply appreciate this ability to solve my own problems
  with the meeting's inherently perfect notes.

Basically, these robot-powered, distributed standup check-ins are showing all
of the benefits, and none of the major drawbacks, of in-person standup
meetings.


The catch: Culture
------------------

Why is it working? We've had similar standup type platforms before, and they
work poorly if at all. I believe these standups are working better than prior
attempts to automate the process for 2 main reasons:

* The standups are performed in a **convenient location**. Rather than having
  to remember to log into some service which exists only for the standup, it
  comes to you in the chat medium where you were doing the rest of your team
  communication.

* The **team's culture** values filling them out. If someone skips a standup,
  others will ask them where they were or what was going on. If you added a
  bot without adding a culture of appreciating standups, everyone would simply
  ignore or block the bot and nothing would change.

So, assess how your standups are working. Do they take your target amount of
time and stay focused? Can you refer to their contents later as you need to?
If they could use improvement, it's worth investigating how a robot could help
you out.


.. author:: E. Dunham
.. categories:: none
.. tags:: none
.. comments::
