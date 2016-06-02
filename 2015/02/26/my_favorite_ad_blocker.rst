The SomeoneWhoCares Hosts File
==============================

I've been having intermittent problems with Firefox freezing up, pegging a
CPU, eating all my memory, and freezing my desktop environment over the past
few weeks. The only apparent trend in their occurrence was that they happened
while I was active on HabitRPG and other ridiculously Javascript-heavy sites. 

I disabled AdBlock Plus, and haven't had a similar freeze since then. I also
haven't seen an increase in the amount of annoying ads, even when I visit
questionable websites. This is because I took 30 seconds when first setting up
my Arch installation to take an incredibly easy and effective action against
ads. 

.. more:: 

The way this works is based on the premise that most intrusive ads come from
the same 10,000 or so domains. Wouldn't it be neat if, instead of spending a
bunch of resources looking up the domain of an annoying ad and then loading it
to barrage your screen with distracting and obnoxious content, your computer
just recognized when a page was trying to load an ad and said "nope"?

That's exactly what the `SomeoneWhoCares hosts file`_ does. Since computers
are not implicitly smart, they have to take dozens of tiny actions in order to
load an ad or web page. One of those actions is "look up where to find it",
using the Domain Name System (DNS). 

You can think of DNS as basically the phone book of the internet. Back when
people used land-line phones, it was pretty common to keep a list of useful
numbers pinned to the wall near the handset. It's faster to look up a number
on a little note nearby than to dig through the phone book trying to find it.
A Linux computer keeps a similar short-list of addresses it's expected to need
in a file called ``/etc/hosts``. 

How does this help with removing ads? Well, back in the landline days, did you
ever go through a bad breakup and scratch out your crazy ex's number on the
list on the wall, writing "NO DO NOT CALL THEM" in its place? You can use
``/etc/hosts`` to make your computer do basically the same thing. By putting
advertisers' names in the hosts file with their numbers listed as
``127.0.0.1``, you do the same thing: If your computer wants to talk to a site
that only serves ads, it's told "just call yourself". 

If you were really enterprising, you could set up a server to offer pictures
of kittens in reply to all queries to localhost, so that you'd get kittens
instead of ads. However, I'm lazy, so I'm content to have 404 warnings instead
of banner ads. 

If you want to use the hosts file too, it's super simple::

    $ wget someonewhocares.org/hosts/hosts
    $ sudo cat hosts >> /etc/hosts
    $ rm hosts

The second line uses sudo because regular users don't have permission to
change /etc/hosts. It's safer to concatenate the downloaded hosts file onto
the end of the existing hosts file than to overwrite it, so that any hosts
settings that you start out with will be preserved.


.. _SomeoneWhoCares hosts file: http://someonewhocares.org/hosts/ 


.. author:: E. Dunham
.. categories:: none
.. tags:: security, arch, newbie
.. comments::
