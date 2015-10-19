On Soldering
============

I attempted to volunteer at the registration desk for `PDX B-Sides 2015`_, and 
instead ended up spending most of the day teaching people how to solder. Since
one of my long-term goals is to make PCB badges for a conference, I'm noting
my observations from the experience before I forget. 

Facilities
----------

They used silicone baking mats to solder on, which was an ingenious idea. The
format of everyone sitting around a smallish round table worked pretty well. I
would improve it by putting all the un-kitted components on a lazy susan in
the center. 

There were 3 "real" soldering irons available, which was lifesaving. There
were also several "solder doodle" pens available, which were frustrating to
use on surface mount components because they only went up to maybe 300. I
typically solder around 350-450 (yes, it'll bite me someday), so they were
annoyingly slow to use. 

They also had perhaps a dozen pairs of Really Nice Tweezers on hand. This was
also wonderful. The parts weren't pre-kitted, but their bags were clearly
labeled. If I was divvying out kit bags, I would mark each surface-mount
package with a different color of marker or number of lines to encode what
teeny tiny chip is in which nearly identical-looking segment of white paper
strip. 

We got by with just 1 solder sucker and up to 5 people soldering at once, but
more would have been better. We also went through a lot of solder wick.

The Boards
----------

The solder bridges were a good place to start newbies, but many got confused
by how the bridges on the badger's head were on the top two pads and the
bridges on the leg were on the bottom two. Battery packs were hard to solder
on because of the spring steel leads; if doing this myself I would seek a
battery pack with wire leads and provide double sided tape for attaching it.
Through-hole LEDs were easy to solder, although the silk screen neglected to
mark which lead was positive. 

Peoples' first surface mount soldering would go a lot more smoothly if the
pads had an extra .5mm on either end. 

If I wanted to encourage "badge hacking", I would leave a square inch or so of
the badge as unconnected through-holes ("proto-board"). 

All the pads could have stood to be larger. The legs of the RGB LED were just
too close together to do one at a time with a blunt iron -- I often had to
reflow them with a lake-then-wick technique. 

The Humans
----------

I optimized my advice till I seemed to be saying the same thing over and over. 

Surface-mount: Holding the iron in my non-dominant hand, I make a lake of
solder on one pad. The iron stays out of the way while I slide the component
along the surface of the board, so its end goes into the lake. Once I've slid
it far enough that I can see the other pad, I lift the iron away and keep
holding the part with my tweezers for 1-2 seconds so the solder can cool. Now
I can switch the iron to my dominant hand, poke it in from the other side so
it's touching both the bare pad and the end of the component, and feed a
little solder onto the pad. 

Through-hole: I push the component through the holes, making sure it's in the
right orientation, and bend the leads outward about 15 degrees so it doesn't
fall out. Then I stick the tip of the iron in so it's touching both the pad
and the lead, and feed solder onto the pad opposite the tip of the iron. If
the solder won't melt, you might need to hold the iron down a second or two
longer so the pad heats up, or you might need to add a little solder onto the
tip of the iron to help conduct heat onto the pad and lead. You can visually
tell when a join has enough solder in the right place because the solder forms
a smooth, symmetric cone from the pad onto the lead. If you can see any of the
gold of the pad, it's not a good join and you need to reflow it by heating the
pad and possibly feeding in a little more solder. 

.. _PDX B-Sides 2015: 

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
