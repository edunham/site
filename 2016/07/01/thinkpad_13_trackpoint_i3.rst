Thinkpad 13 Trackpoint slowdown in i3 window manager
====================================================

As has been `mentioned on Reddit
<https://www.reddit.com/r/thinkpad/comments/4jku4c/configuring_trackpoint_on_thinkpad_13/>`_,
the Thinkpad 13 trackpoint settings aren't in the same place as those of older
thinkpads. Despite some troubleshooting, I haven't yet found what files to edit
to adjust the trackpoint's speed and sensitivity in Ubuntu 16.04.

The trackpoint has been slightly sluggish/unresponsive when I use the i3
window manager, and has additional intermittent slowdowns when using Chromium
and Firefox in i3.

Although I don't yet know the **right** way to fix trackpoint sensitivity on
this machine, I accidentally discovered a highly effective workaround today:

* Log into Unity (the default desktop that Ubuntu ships with) and configure
  the mouse and input settings as desired
* Log out, and get back into i3wm
* Launch ``unity-settings-daemon``
* And suddenly, the mouse works correctly the way it did in Unity!

I fully realize that this is a nasty hack around identifying and solving the
actual problem, but it succeeds at making the mouse responsive while
minimizing time spent troubleshooting.


.. author:: E. Dunham
.. categories:: none
.. tags:: thinkpad
.. comments::
