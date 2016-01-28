The rabbit hole of server monitoring
====================================

Mildly embarrassing confession time: I've never architected a monitoring +
alerting + metrics visualization stack from the ground up before. I've worked
on a variety of such stacks set up by other people, cobbled together from an
alphabet soup of tools whose elevator pitches all read more or less the same,
and there's always been something to hate about them. My goal right now is not
even to assemble a stack that's free of unpleasantness, but simply to rule out
the worst decisions before I commit any time to implementing them. 

Goals
-----

This work is for the Rust and Servo projects, so my design criteria might
differ slightly from yours: 

* It should be straightforward to automate setting it up, and not require much
  if any care and feeding on a weekly basis. Updates should come through the
  system package manager on most major distros. 

* It should be conceptually simple enough that I can give reasonable answers
  to the math questions which the compiler wizards will probalby ask when I
  show them the system. This could be compensated for by good documentation.

* It should reflect industry best practices, because my personal one of my
  personal goals is to make this infrastructure a project where community 
  sysadmins can build relevant skills.

* Communication between the server and clients of all components should be
  structured in a way that minimizes the attack surface of the system. Sure, I
  do the right things with my hosts' firewalls and AWS's security groups, but
  monitoring daemons are still a new moving part and deserve to be examined
  critically. 

* I need to be able to atriculate why each tool I choose is a better solution
  to the preceding concerns than its direct competitors. That's the blessing
  and curse of such a public project -- all decisions get questioned sooner or
  later!

Alerting
--------

Nagios is the industry standard for alerting. It's the system that everybody
loves to hate, because everybody uses it. It's written in C, and has a whole
universe of community developed plugins available. 

Beyond just having plugins on hand, it's also a giant multi-armed sprawl of
interlinked tools, because it went Enterprise and started selling a solution
to companies, and the feedback loop between marketers and companies tends to
create the opposite of a Unix-spirited utility. 

To build a Nagios-centric tool pile out of open components, you first choose
the agent to run on the hosts being monitored. Traditionally this would be
NPRE for Linux servers, though check_mk automates 

 

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
