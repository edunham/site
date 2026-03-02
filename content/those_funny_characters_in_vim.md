+++
path = "2015/01/27/those_funny_characters_in_vim"
title = "Those funny characters in Vim"
date = 2015-01-27

[taxonomies]
tags = ["vim", "troubleshooting"]

[extra]
author = "E. Dunham"
+++
![vim showing garbled characters from encoding issues](/pictures/encoding_problem.png)

I copied and pasted some of the lines from a PDF, and now I have a problem which is nearly impossible to Google.


The first potential fix is to set the encoding so it tries to display the characters:

    :e ++enc=utf-8

And it kind of works:

![vim with encoding fixed to UTF-8](/pictures/encoding_fixed.png)

Better. When I re-open the file with the encoding set correctly, my red bar in the 80th character column is one piece instead of being broken by the incorrect displays.

Diamonds with question marks in them are equally difficult to search for, so I asked on IRC. My problem has 2 parts: how to find the un-display-able character I'm addressing, and how to refer to it in a regular expression.

To find the problem character's value, place the cursor on it and use `ga`. According to the [vimdoc](http://vimdoc.sourceforge.net/htmldoc/various.html), you can also use `:ascii`, which might be easier to remember.

![vim ga command showing character hex value](/pictures/character_value.png)

This tells me that the problem character has hex value `bf`.

According to [this helpful post](https://durgaprasad.wordpress.com/2007/09/25/find-replace-non-printable-characters-in-vim/), which didn't show up until I googled "vim regex octal value of character", one can specify octal values in regex by prefacing them with `\%x`. In my case, `:%s/\%xbf/-/g` replaces all those questionmark symbols that used to be some kind of separators in the encoding from which I pasted them.
