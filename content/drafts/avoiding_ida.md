+++
title = "Avoiding Ida"
date = 2026-02-20
draft = true

[extra]
author = "E. Dunham"
+++
As part of the [OSU Security Club](http://osusec.github.io/), I'll be attending the [Oregon CTF](http://oregonctf.org/en/) this weekend. Although the rest of the Security Club has been learning to use [Ida](https://www.hex-rays.com/products/ida/), my aversion to installing Windows is stronger than my desire to get an advantage in the CTF competition.

However, I'll need tools with features similar to Ida's in order to have a fun learning experience at the CTF. I've done some research, and am playing with several open-source options.


# Radare2

Several resources, including [StackExchange](http://reverseengineering.stackexchange.com/questions/1817/is-there-any-disassembler-to-rival-ida-pro), recommend [Radare2](http://www.radare.org/r/) as an Ida alternative. It's released under GPLv3 and the source is [on GitHub](https://github.com/radare/radare2). There's even a free online [book](http://maijin.github.io/radare2book/) about it!

Although it's available through Yaourt, the build currently fails. To install it:

    $ git clone https://github.com/radare/radare2
    $ yaourt -S valabind # Valabind and Swig dependencies
    $ cd radare2
    $ sys/install.sh

The script threw an error, which turned out to be a typo so I [fixed it](https://github.com/radare/radare2/commit/779b7cb63ea86ff2e065ce6ab8acb8cdbbc6c486). Radare2 now installs successfully from the `sys/install.sh` script.

# Bokken and Pyew

Another recommended pair of tools are Bokken and Pyew:

    $ yaourt -S pyew-hg
    $ yaourt -S bokken-hg

And yet Bokken can find neither Pyew nor Radare, despite the fact that they're installed.

pyew hg clone <https://code.google.com/p/pyew/> git clone <http://github.com/radare/radare2> git clone <http://github.com/radare/radare2-extras>

bokken is pyew gui .. \_Bokken: <https://inguma.eu/projects/bokken>

<https://sysexit.wordpress.com/2011/12/17/installing-inguma-bokken-pyew-and-radare2-in-ubuntu/>

suggests Inguma too, yaourt -S inguma-hg

<https://inguma.eu/projects/inguma>

evan's debugger (edb) <http://www.codef00.com/projects#debugger> packaged for arch
