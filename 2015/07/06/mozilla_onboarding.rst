Mozilla Onboarding
==================

On April 16th, I threw an application toward `this job posting
<https://web.archive.org/web/20150316234909/https://careers.mozilla.org/en-US/position/oymA0fwe>`_
on careers.mozilla.org. I doubted whether I'd be qualified, but I reminded
myself that most people apply to jobs where they meet only 80% of the
critiera. I could, with some creative redefinition ("of course an internship
at Intel is a year of relevant experience!"), meet every listed criterion. So
I applied, since the worst they could say was no. 

Here's a rundown my experience getting interviewed and onboarded, which might
be of interest to current Mozilla employees curious about how things have
changed since they joined, and to anyone interested in working there. 

.. more::

Application
-----------

The recruiter replied to my application only 3 hours after I submitted it.
This was certainly an improvement since the 6 months of ultimately fruitless
bureaucratic limbo when I applied for a Mozilla internship a few years ago! 

I found out later that the 3-hour turnaround time included a member of the
Servo team reading my resume and verifying that my background looked relevant
to their interests, which makes it all the more impressive. 

Phone Screens
-------------

On April 20th, I had a quick phone chat with my recruiter. It was totally
non-tecnical, and I summarized it to my friends afterward as "Did you read
your own resume? Did you read the job description? Ok, cool!". I'm sure they
were screening for other stuff as well, perhaps basic social skills and an
acceptable level of fluency in spoken English, but that screen was not nearly
as scary as I'd been prepared for. 

My first techncial phone screen was on 4/22. A second recruiter organized the
details of the call, and I talked with Brian Anderson about my background and
the Rust programming language's DevOps needs. He was particularly interested
in my work with Chef and Jenkins in production at my Urban Airship job. After
this phone screen, the title on the job posting got changed from "Operations
Engineer" to "DevOps Engineer". 

On 4/24, I talked with Lars Bergstrom about the Servo project's needs.
Learning about the place that project was at compared to Rust started giving
me some perspective into the similarities between the DevOps Engineer role and
my work juggling systems administration for a variety of open source projects
at the OSU Open Source Lab. 

My final phone screen was with Jack Moffitt, on 4/29. This conversation was
less a review of my experiences and more a brainstorming session about
techniques for speeding up the run time of Rust's continuous integration
tests. Although I wasn't familiar with the specific scenario yet, I was able
to apply my knowledge of CI and Git techniques to propose some possible
solutions that the team hadn't considered yet. 

The On-Site Interviews
----------------------

I interviewd on-site at Mozilla's San Francisco office on May 4th. My day was
scheduled from 10am to 3pm, and I spoke with 5 different Mozilians from
various teams. Ordinarily these interviews would have been scheduled at least
a week later, but a friend and I had been planning a road trip down to the bay
area anyway, so we shifted the dates a bit to fit with the interviews.

Again, I asked the recruiters whether they had any advice on what to expect
from the whiteboarding component of the interviews, and again they gave no
answer.

Two interviews were with managers higher up in Mozilla Research's
organizational hierarchy. One was very concerned about community and avoiding
the problems of "not invented here", and felt unfamiliar with most "DevOps"
related terminology. In that interview, I drew pictures on the whiteboard to
explain the similarities between public and private clouds, and we talked a
lot about open source community. The other manager wasn't hesitant to air her
concerns about my relative lack of corporate experience, which gave me a
chance to explain the applicability of my open source leadership background
and OSU Open Source Lab experience to the DevOps Engineer role. 

My technical interview with a Rust team member during my onsite interviews was
more of a friendly chat about the infrastructure and how to improve its
performance. After the first couple of interviews, I went to lunch with a
variety of research and devops team members. We chatted about the
infrastructure, and I enjoyed the chance to get to know my prospective
coworkers in a less formal setting. I find it important to interact with
people in a setting where it's socially appropriate for them to complain about
their jobs -- the nature of those complaints (or lack thereof) is one of the
most useful cues about a project's real culture rather than the polite facade
it necessarily puts on for newcomers. 

After lunch, I had the only interview that I'd consider particularly
technical. My interviewer framed a question about designing an algorithm to
copy a linked list in memory and asked me to describe a solution (psuedocode
optional), rather than worrying about the details of writing in any specific
language. The question had a trick to it and I would have solved it much
faster if I'd seen it before, but my interviewer fed me hints and helped me
stay on the right track. This collaborative approach made the interview feel
like I was solving a real problem with a co-worker, rather than the "we want
to see what you're like when we terrify you to the breaking point" of some
other companies' interview styles. The tone of that interview cemented my
impression that Mozilla had the collaborative, non-malicious culture that I
was looking for. 

My final interview was with a TaskCluster developer. Since we'd already spoken
at lunch (and apparently I'd made a sufficient impression of my technical
skills), he told me "Instead of an interview, I'm going to sell you
TaskCluster". We then went through a slide deck on how TaskCluster is designed
and its intent to replace BuildBot, and I got a lot of my introductory
questions about the tool out of the way. 

The Offer
---------

On May 6th, I had a quick phone chat with my original recruiter to discuss
compensation. I had already talked with a manager for my prospective role
about Mozilla's bonus and benefits package, which allowed me to do the math on
what kind of base salary would result in a total compensation package
comparable to the other offers I had on the table. I discussed these numbers
and my reasoning behind them with my recruiter. When doing the math on base
salary, I also privately calculated the ranges of offer for which I would want
to try to negotiate higher, and what ranges I'd be happy to simply accept
without haggling. 

On May 8th, we had another call during which my recruiter disclosed my
specific offer. The number is comfortably competitive for my skills and role
-- although it doesn't precisely match my other offers in salary, the
difference is less than the benefit to my career of working at a company that
understands and values open source. 

I received my offer letter on May 12th, verified that the confidentiality
agreement was sane (it protects the user data that Mozilla gathers with
peoples' permission, rather than trying to restrict employees' open source
contributions), and signed and returned the paperwork.

Later that day, the Mozilla onboarding system started sending me emails. It
walked me through setting up accounts, ordering my work laptop, filing tax
paperwork, and all the other bureaucratic minutae associated with starting a
new job. The system handed out onboarding tasks in small groups on a set
schedule, all with friendly and enthusiastic messages explaining what was
going on with that set of forms. This made the whole process much easier than
other places I've onboarded, where one spends several hours shut in a room
with an HR person doing paperwork on the first day. 

Time Passes...
--------------

Between my offer and start date, I found a new place and moved into it, as
well as completing the onboarding tasks as they trickled out of the automated
onboarding system. I picked up my laptop from Mozilla IT on May 22, then took
it home and installed Arch Linux. I `tried Windows
<http://edunham.net/2015/05/23/oh_windows.html>`_ just to give it a chance,
but it rapidly failed my informal tests of usability. 

When I came into the office to pick up my laptop, our wonderful front desk
ninja of all trades Katt took my photo and issued me a badge. This was
somewhat surprising, as nobody had warned me that I'd be getting photographed
that day, but it was ultimately convenient since it provided me with a badge
to enter the office on my first day.

I also sent my SSH and GPG public keys to a coworker who started setting up my
access to the systems I now administer.

First Day
---------

My first day was actually a Tuesday, 5/26, since that Monday was memorial day.
I attended a mandatory IT orientation in which they explained fancy new
technologies such as IRC and gmail filters, from 8:30 to 11am. It could have
been a lot shorter if they'd packaged it as wiki pages or individual videos to
allow us to skip or skim the topics we already knew, but I guess they find it
important to put a personal touch on the orientation by having a real live
human present it. I'm sure that if I was more extraverted or less symbiotic
with my computer, I would have appreciated it a lot more. 

The things that people say about a "firehose of information" are all true.
There's a comprehensive but somewhat obsolete wiki, a less thorough but closer
to up to date jira, and a bunch of public documentation as well. I've been
careful to sign up for only those mailing lists which coworkers tell me are
directly relevant to my job right now, or else the deluge of facts would be
even worse. 

First Month Retrospective
-------------------------

I've learned that there are benefits and drawbacks to working at a company
that I associate with the most friendly and knowledgeable people I've ever
met. The benefits are that my coworkers are amazing and inspire me to be the
best professional and open source community member that I can. The "drawback",
if one can call it that, is that everyone suddenly assumes I'm just as
friendly and knowledgeable as everyone else. The title of "Mozilla Employee"
seems at times to be a glowing crown emblazoned with "Ask Me Firefox
Questions", but I've so far been able to redirect everyone onto my more
knowledgeable peers to get their problems solved. And on the whole, there's no
better way of becoming that archetype of friendliness and knowledge than to
suddenly have the entire world expecting me to embody it. 

I've always struggled, as I'm sure you might as well, with accurately
assessing my own techncial comptence. At Mozilla, I never feel like the
smartest person in the room, and yet I bring specialized knowledge to my team
that it would lack without me. This balance keeps me constantly learning,
while reassuring me that my contributions are valuable, which is close to
optimal for my overall happiness. 

The Rust and Servo teams and communities have been incredibly welcoming to me,
and they communicate in ways that I find easy to work with. 

.. author:: default
.. categories:: none
.. tags:: mozilla, interviews
.. comments::
