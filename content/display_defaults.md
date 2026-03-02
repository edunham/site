+++
path = "2015/06/08/display_defaults"
title = "Display Defaults"
date = 2015-06-08

[taxonomies]
tags = ["arch", "arandr", "xrandr"]

[extra]
author = "E. Dunham"
+++
I've been running Arch on my work laptop and it's pretty much working. However, I have a nice external monitor on my desk, and I keep having to manually configure the output to it with `arandr`. Here's how I made it configure itself by default when X starts.


# First, make the layout

Arranging monitors is one of the few places where I prefer using a GUI over the command line. I use `arandr`, a graphical `xrandr` frontend, to organize my monitors.

Once the displays are set as desired, I go to `layout` -&gt; `save as` and save it as `~/.screenlayout/default.sh`. That file contains:

    #!/bin/sh
    xrandr --output VIRTUAL1 --off --output eDP1 --mode 2560x1440 --pos 0x1200
    --rotate normal --output DP1 --off --output HDMI2 --mode 1920x1200 --pos
    312x0 --rotate normal --output HDMI1 --off --output DP2 --off

# Then, execute the command on login

Since `arandr` outputs the `xrandr` command needed to set the layout correctly, I took the lazy way out and just dumped the `xrandr` incantation from `~/.screenlayout/default.sh` into the start of `~/.xinitrc`. I might someday come back and replace it with a more sophisticated script to detect whether the second monitor is plugged in, but it's good enough for now.

# That's it!

Yet I had to dig that knowledge out of the [forums](http://bbs.archbang.org/viewtopic.php?id=2629) and [xrandr wiki page](https://wiki.archlinux.org/index.php/Xrandr). But seriously, `arandr` and `.xinitrc` are all it takes. It was much easier than I expected.
