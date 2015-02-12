Ditching the Terminator+I3 setup
================================

I switched to Terminator before making the plunge into a fully tiling window
manager. Now I've been becoming more aware of the places where my
tiler-within-a-tiler setup causes the programs to step on one anothers' toes,
and as I fix other inefficiencies with my workflow, the problems with my
window manager and terminal emulator are becoming the most annoying aspect of
my laptop.  

Why keep Terminator?
--------------------

If I end up switching back to Terminator at the end of this experiment, I
expect that it will be based on one of these reasons: 

0) This is less relevant in my use case because I have my laptop configured to
hide window borders and I never memorized the keyboard shortcuts, but
Terminator's features for grouping terminals and broadcasting keystrokes to a
group are very cool. 

1) Resizing windows is super easy (control+shift+arrowkey) and it's trivial to
make a window take up the space of the entire Terminator tile (ctrl+shift+x or
ctrl+shift+z). I don't have keyboard shortcuts in my hands yet to resize i3
tiles, and rudimentary Googling suggests that I might have to write the config
to implement those keyboard shortcuts myself. 

2) Terminator profiles are nice. Some of the efficiency of my `current
configuration`_ relies on the availability of different profiles, so I'll
probably have to reimplement that functionality in a bash script if my new
terminal emulator does'nt have a similar feature. However, that won't be too
hard. 

3) Window splitting requires one chord on the keyboard, rather than keeping
track of modal stuff for i3. 

Why keep I3?
------------

* Good docs
* I3bar Just Works (kinda, sorta, ish.. at least it reports battery and time
  on this thinkpad)
* Easy to write the configs -- implementing alt+tab was pretty straightforward
  even when i was totally new. 
* Switching workspaces and moving windows between workspaces take a single
  chord each. Switching the screen from vertical split to horizontal split
  takes a single chord, as well.
* It's easy-enough to set it to hide all window borders, which I like a lot


Why change?
-----------

1) They're heavy. I don't think I need all of Terminator's extra features, but
they eat my battery life by being available all the same. My battery life is
substantially better when not running X than when running i3, and I'd rather
blame that on the WM than on X.

2) Using a tiler within a tiler messes with my head: I occasionally hit i3's
"kill this tile" shortcut when I want to only close a single Terminator pane. 

3) Splitting between two quarter-screen windows and a half-screen window, then
moving the windows between those positions, cannot be done easily and
predictably with my current understanding of the WM. 

4) I don't have keyboard shortcuts to resize windows -- the intended workflow
seems to be "grab the window border with your mouse" which is a little
challenging when you're fond of neither window borders nor mice, and it looks
like keyboard shortcuts require more modal operation. 

5) I haven't bothered learning much about saving and restoring window layouts
in i3. Although the docs make it look like it might be relatively easy, I'm
reluctant to invest the time right now fixing i3 when my
window-resizing-to-replace-terminator situation may force me to switch WMs as
well

6) I've been mildly obsessed with improving the efficiency of my workflow
lately, and the quest for a better terminal emulator might cause me to switch
window managers to one that better meets my needs. 

Terminal Emulator Research
--------------------------

* Apparently some of these use middle click to paste? not my idea of a good
  time, far easier to do by accident than ctrl+shift+v. 

I hear good things about rxvt/urxvt (with unicodE). 

urxvt: unicode, good url matcher extension. all perl stuff... ouch. same as
rxvt-unicode. has tabs.

xterm: good speed+support?

https://wiki.archlinux.org/index.php/St st meant to be lighter, hella
c-flavored. by suckless, which made dmenu, so might be good


.. author:: default
.. categories:: none
.. tags:: none
.. comments::
