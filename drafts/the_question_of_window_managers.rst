The Question of Window Managers
===============================

My first Linux CD was Kubuntu, back in 2009 or so. My little Dell Latitude
D410 laptop got terribly sad under the strain of being asked to run KDE, so I
spent the next several years picking distros that came with XFCE built in. 

I switched to Terminator for my terminal emulator around 2012, when the
increased complexity of my coding projects made basic tiling features
essential to productivity. A full-screened Terminator window on one monitor
and web browser on the other got me comfortable with managing multiple
workspaces, and I found myself becoming frustrated that I couldn't just have
Firefox replace one pane of Terminator's layout. 

Motivated by annoyance at Terminator's failure to be a complete window
manager, I switched to I3 about 18 months ago. I chose I3 because it looked
like the easiest and most newbie-friendly tiler available, and there were
several other users at the OSL so I could pester them with questions if I got
stuck. 

Now, I3 has helped me develop a much more refined idea of how I want my window
manager to behave, and "it's easy for newbies" is no longer a compelling
reason to keep it around. 

Basic Criteria
--------------

Here's how I'll select which WMs to examine more rigorously, and the traits
that I expect I'll judge them on.

Minimum for consideration
~~~~~~~~~~~~~~~~~~~~~~~~~

1) The project should look alive and decently documented. This includes having
a nontrivial user base, which I do judge partly by whether I've heard of it
before. Potential exceptions for super new pojects, if they seem special.

2) If I've heard things about it from people I know, the reviews should not
all be negative. For instance, I know some people who hate Awesome and others
who are happy with it, so it won't be ruled out by this criterion. 

3) It should either be configured in a language I'm willing to write, or have
incredibly good defaults. 

4) Absent extreme extenuating circumstances, it should Just Work when
installed with Yaourt. 

What I'm Judging
~~~~~~~~~~~~~~~~

.. note:: 
    I tend to ask "What's it like?" about features, because I want a WM with
    the least unpleasant user experience. I consider my experience with a
    feature to be good if either it works out of the box, or it's easy to find
    the documentation about and then change the configuration for. 

1) What's it like to set it up?

2) How much memory and how many processes does it take to...
    * start?
    * idle? 
    * open a new terminal?
    * move my terminal between workspaces?

3) What are the keyboard shortcuts like for...
    * opening a terminal
    * starting arbitrary programs
    * moving programs between workspaces
    * rearranging tiles within a workspace
    * resizing tiles within a workspace

4) Does it look ok? If not, what's it like to customize the appearance? 
    * minimal wasted pixels
    * ok fonts on any built-in tools

5) What's it take to get my battery, network, current time, and system load in
a corner of the screen? (not all WMs have a built-in thing like i3bar)

6) Do I want to keep it? Why?

Evaluation Process
------------------

There's a "right way" to try a new window manager. Install Xnest or Xephyr --
both are tools that let you have multiple Xsessions (those things in which you
run a window manager) at the same time. 

Since I'll be documenting the installation and configuration process for each
WM, it'll be relatively easy to retrace my steps and clean up stray files when
uninstalling. 



The Candidates
--------------



.. author:: default
.. categories:: none
.. tags:: none
.. comments::
