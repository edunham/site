Why an ops career
=================

*Disclaimers: Not all tasks that come to a person in an ops role meet my
definition of ops tasks. Advanced ops teams move on from simple problems and
choose more complex problems to solve, for a variety of reasons. This post
contains generalizations, and all generalizations have counter-examples. This
post also refers to feelings, and humans often experience different feelings
in response to similar stimuli, so yours might not be like mine.*

It's been a great "family reunion" of FOSS colleagues and peers in the OSCON
hallway track this week. I had a conversation recently in which I was asked
"Why did you choose ops as a career path?", and this caused me to notice that
I've never blogged about this rationale before.

.. more::

I work in roles revolving around software and engineering because they fall
into a cultural sweet spot offering smart and interesting colleagues,
opportunities for great work-life balance, and exemplary compensation. I also
happen to have taken the opportunity to spend over a decade building my skills
and reputation in this industry, which helps me keep the desirable roles and
avoid the undesirable ones. Yet, many people in my field prefer software
development over operations work.

I've chosen, and stuck with, ops because it gives me the sensation of having
better-defined success conditions than I get when developing code for others. When I
tackle an ops problem, it is usually a task which I could tediously,
miserably, but correctly perform by hand. This base case of "if all else
fails, the desired thing can be done by hand" frames a problem more concretely
and measurably than any written description of someone's hopes and dreams
about a piece of software.

Of course, performing ops tasks by hand does not scale. Often, the speed with
which a given task is performed is part of its success criteria. And if you
ask a human to perform the same task 20 times, you'll likely get 21 subtly
different outputs. This is why we automate: Automation brings computers'
strengths of speed and lack of boredom to the equation.

**Automation tasks are necessarily framed in terms of the specific behaviors,
described in technical terms, that computers are supposed to be performing.**
The constraints of the infrastructure provide a rigorously
defined abstraction layer between psychology and code. This
vocabulary of infrastructure expresses the constraints for ops work such that
even if I'm not the end user of a piece of automation code, I can experience a high
level of confidence that I understand what the person requesting it believed
that they wanted when they made the request.

Automation is unlike software engineering tasks with success conditions that
hinge on human emotions and behavior. Any success condition with psychology
integral to it becomes time-consuming, if not impossible, to test against.
Throw in psychological effects that incline a human to have slightly different
reactions to the same thing depending on when and how you show it to them, and
you lose even basic repeatability from the simple task of testing whether your
code is "good enough". For software engineering tasks with human behavior and
emotions in their success criteria, I cannot consistently prove to myself that
success is even possible. Although I enjoy recreationally tackling
potentially-impossible challenges from time to time, I do not enjoy the
pressure and uncertainty that come from betting my career and compensation on
such puzzles.

Even systems built solely from understandable components develop complexity
and challenges. Emergent behaviors arise, perhaps necessarily, from complex
systems. In ops work, I feel a certainty that each component is independently
predictable when broken down small enough, and that it would be possible with
enough work to rebuild the entire system incrementally from such "atoms" of
predictability. Of course it is almost never worth the time and effort to
actually rebuild the system from scratch, but simply knowing that it would be
possible gives me confidence that the problems I encounter with my systems can
be solved. (To reiterate, "can be solved" bears little relation to "is worth
solving", but it does affect the way I feel about tasks.) Contrast this
"certainty of solvability" to the problems encountered when developing
software for other people: "the customer doesn't like this!", "users aren't
clicking where we want them to!". Those problems hinge on human components
that would usually be highly unpleasant, unethical, and illegal to disassemble
and debug. Software problems tightly coupled to psychology do not make me feel
like I can be certain that *any* amount of effort would guarantee a solution.

No workflow can, nor should, eliminate the bigger-picture
questions about what we want to be building, or how we want to go about
building it. However, I find that the structure of roles that companies
typically categorize as "ops work" supports decoupling the questions without
answers from the questions with answers, and offloading the half you don't
want to deal with onto someone who enjoys them more.

.. author:: E. Dunham
.. categories:: none
.. tags:: career
.. comments::
