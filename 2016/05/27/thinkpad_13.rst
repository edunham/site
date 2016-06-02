2ish weeks with the Thinkpad 13
===============================

I recently got a Thinkpad 13 to try replacing my X230 as a personal
laptop. Here's the relevant specs from my order confirmation:

=========================== =======================
Battery                     3cell 42Wh
System Unit                 13&S2 IG i5-6200U NvPro
Camera                      720p HD Camera
AC Adapter and Power Cord   45W 2pin US
Processor                   Intel Core i5-6200U MB
Hard drive                  128GB SSD SATA3
Keyboard Language           KYB SR ENG
Publication Language        PUB ENG
Total memory                4GB DDR4 2133 SoDIMM
OS DPK                      W10 Home
Pointing device             3+2BCP NoFPR SR
Preload Language            W10 H64-ENG
Preload OS                  Windows 10 Home 64
Preload Type                Standard Image
TPM Setting                 Software TPM Enabled
Display Panel               13&S2 FHD IPS AG AL SR
WiFi wireless LAN adapters  Intel 8260AC+BT 2x2 vPro
=========================== =======================

I picked mediocre CPU and RAM because the RAM's easy to upgrade, and I'm
curious about whether I actually need top-of-the-line CPUs to have an
acceptable experience on a personal laptop.

Why the 13?
-----------

I had a few hard requirements for my next personal laptop:

* Trackpoint with buttons
* Decent key travel (the X1 carbon has `1.86mm` and typing on it for too long
  made my hands hurt)
* USBC port
* Under $1,000

Plus a few nice-to-haves:

* Small and light are nice, including charger
* Screen not much worse than 1920x2280px
* Good battery life
* Metal case and design for durability make me happy
* My house is already full of Thinkpad chargers, so a laptop that uses them
  helps reduce additional clutter

I'll be the first to admit that this is an atypical set of priorities. My
laptop is home to Git, Vim, and a variety of tools for interacting with the
internet, so the superficial I/O differences matter more to me than the
machine's internal specs.

Things I like about the 13
--------------------------

* `2.1mm`_ key travel is everything I hoped for. At least, I've used it all
  day and my hands don't hurt.

* Battery life is pretty decent, and battery will be easy to replace when it
  starts to fail.

* Light-enough weight. Lighter charger than other Thinkpads I've had.

* Smallest Thinkpad charger that I've ever seen.

* Case screws are all captive.

* Mystery hole in the bottom case turns out to be a highly convenient hard
  shutdown button.

* Hinges feel pretty solid and hold the screen up nicely.

* No keyboard backlight. I dislike them.

* 4GB of RAM is a single stick, easy to add more (and I'll need to for a
  smoother web browsing experience; neither Firefox nor Chromium is
  particularly happy with only 4GB)

* A vanilla Ubuntu 16.04 iso Just Worked for installing Linux. It must have
  shipped with whatever magic signatures were required to play nice with the
  new security measures, because the install process was delightfully
  non-thought-provoking.

* ~7mm plastic bezel between buttons and trackpad reduces likelihood of
  accidentally moving cursor when clicking. 

.. figure:: _static/13-button-bezel.jpg

Nitpicks about the 13
---------------------

* Color.

When I purchased mine at the end of April, only the silver chassis had a metal
lid and shipped with a nice screen by default (the higher-res screen is
available in the all-plastic black model for an additional charge). So now I
own a non-black laptop for the first time since my Dell Latitude D410 in high
school. The screen bezel and keys are black, though, and if I really cared I
could probably paint the rest of it.

* Power button.

.. figure:: /_static/13-power-button.jpg

It feels horribly... squishy? There's no satisfying ``click`` to tell me when
I've pushed it far enough. Holding it for 10 seconds only sometimes shuts the
laptop off (though there's a reset switch on the mobo accessible by a
paperclip-hole in the bottom panel which forces shutdown instantly when
pushed). There's a circle on the pwoer button that looks like it might be an
LED, but it never lights up. 

* Cutesy font.

.. figure:: /_static/13-lenovo-font.jpg

This is a tiny nitpick, but they've changed the Lenovo logo on the lid,
pre-BIOS boot screen, and screen bezel from the already-mediocre font to a
super condescending, childish, roundy one. Fortunately the lid one is easily
hidden under some stickers.

* Bottom panel held on by clips as well as screws.

More on this one in the disassembly section below, but I'm afraid they'll
break with how often I take my laptops apart.

* Mouse buttons feel cheap and plastic-ey.

They feel like thin plastic shells instead of solid buttons like on older
Thinkpads. I'm not sure precisely why they feel that way, but it's a reminder
that you're using a lower-end machine.

* Longest side is about 1cm greater than the short side of a TSA xray tub.

My X240 fits perfectly along the short end of the tub, leaving room for my
shoes beside it. I have to use two tubs or separate my pair of shoes when
putting the 13 through the scanner. (see, I wasn't kidding when I said
"nitpicks")

* The Trackpoint top is not interchangeable with those of older Thinkpads.

.. figure:: /_static/13-trackpoints.jpg

The round part is the same size, but the square hole in the bottom is about
2mm to a side rather than the 4mm of the one on an x220 keyboard. Plus the
cylinder bit is about 2mm long rather than the x220's 3.5mm, so even with an
adapter for the square hole, older trackpoints would risk leaving marks on the
screen.

* The fan is a little loud.

I anticipate that this will get a lot less annoying when I upgrade to 16 or
32GB of ram and maybe tune it in software using ``thinkfan``.

Thinkpad 13 partial disassembly photos
--------------------------------------

To get the bottom case off, pull all the visible screws and also remove the 3
tiny rubber feet from under the palm rest. I stuck my tiny rubber feet in a
plastic bag and filed it away, because repeated removal would eventually
destroy the glue and get them lost.

.. figure:: /_static/13-slide-and-pry.jpg

The bottom case comes off with a combination of sliding and prying. Getting it
back on again requires sliding the palmrest edge just right, then snapping the
sides and back on before the palm rest slips out of place. It's tricky.

.. figure:: /_static/13-bendy-battery.jpg

The battery is easily removed by pulling out a single (non-captive) screw. It
seems to be a thin plastic wrapper around 3 cell phone batteries. The battery
has no glue holding it in, just screws.

.. figure:: /_static/13-mobo.jpg

Here's its guts, with battery removed.

.. figure:: /_static/13-mobo-annotated.jpg

Note the convenient hard power cycle button (accessible via a tiny hole in the
bottom case when assembled), pair of RAM slots and SSD form factor, and
airspace compartment that almost looks intended for hiding half a dozen very
small items. The coin cell battery (in sky blue shrink wrap) flaps around
awkwardly when the machine is disassembled, but at least it's not glued down.

.. _1.86mm: http://www.laptopmag.com/reviews/laptops/lenovo-thinkpad-x1-carbon-2015
.. _2.1mm: http://www.laptopmag.com/articles/lenovo-thinkpad-13-hands-on


.. author:: default
.. categories:: none
.. tags:: thinkpad
.. comments::
