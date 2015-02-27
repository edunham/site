Hardware Saga, part 1
=====================

At around 1pm on 2/26/2015, my ThinkPad X230's screen died without warning. I
put the laptop away to take a quiz in class, walked home, tried to boot, an it
remained black. The LEDs and CPU fan went through their familiar boot process,
but the screen remained stubbornly blank. 

Below the fold you'll find several pages of excrutiating detail on the
situation, because I enjoy writing these things down. 

.. more::

Troubleshooting
---------------

When the screen's power inverter breaks, images are faintly visible on the
screen under bright light. However, I looked at it with my phone's flashlight
while it booted and saw nothing. 

I also unplugged and re-seated the screen's cables, at both the motherboard
and the LCD panel, in order to verify that they hadn't come loose if I had
bumped the laptop wrong without noticing while carrying it home. Re-seating
the cables did not change the screen's behavior; the machine has survived
drops from a table to a hardwood floor without any detriment to its
performance. 

This narrows it down to two components which could be at fault: the cables
which run through the hinges and supply power to the screen might be damaged,
or the GPU itself could have given out. I tried plugging my VGA port into an
external monitor and the monitor showed nothing during boot, although this is
not useful evidence since I never ran such a test while the machine was
working correctly and thus don't know what should have happened. 

Ordering a Successor
--------------------

Replacing the motherboard with another of the same quality would cost around
$300, and when shopping for replacements, I discovered that I could get a
slightly older machine with still-decent specs for less than half that price.
Since I have a bit of a Thinkpad collection and have been envying the form
factor of a coworker's X201 for quite some time, I ordered an X201 with an
i5-m520.  It'll ship with 2GB of RAM but I can put in the 8GB from my X230
without trouble. 

However, the new machine won't arrive till around March 9th, so I'm having fun
persuading my old disk to boot on various systems until then. 

Brain Transplant: T60
---------------------

I pulled out my X230's SSD and stuck it into the USB enclosure that I usually
use for my backup disks. I plugged it into a T60, hit f12 during boot to
select the USB HDD as a temporary boot device, and it got as far as the
bootloader. However, my Arch kernel was incompatible with the T60's i616 CPU. 

Brain Transplant: T440S
-----------------------

I also have a T440s in my room. It's technically my work computer, so I
generally avoid using it for non-work purposes, but "I have an assignment due
and need a working laptop" is something of an exception. 

Plug in HDD, boot, select boot device, get bootloader. Hit enter to select
booting Arch Linux... and a second later, I'm greeted by the Ubuntu login
screen. Wat?

Try again. Reboot, select boot device, get bootloader. This time, hit tab on
Arch Linux to edit the options. It's trying to boot from ``/dev/sda1``. In all
the cases like this that I've encountered, a laptop's internal drive is
assigned to ``sda``, and external ones get ``sdb`` and higher. Edit the
bootloader item to ``sdb`` instead of ``sda``, hit enter, and it works!

Log into Arch, and everything works beautifully except the wireless. Am I
missing drivers? Let's hope not; if they're missing, it'll be a royal pain to
acquire them::

    sudo ip link set wlp3s0 up

and there's wifi again!

Brain Transplant: T61
---------------------

The next day, I retrieved the hand-me-down T61 that I'd rescued when a
roommate asked whether I wanted anything from a big stack of computers
destined for recycling. 

Its battery is totally shot, and it's missing the hard drive enclosure, but in
other regards it's a decently usable machine. It has a good keyboard, physical
buttons for the trackpoint, and working wifi, so it wins most of my battle
against technology already. 

Booting it has been distinctly interesting. Pull 320GB spinny-disk out of
x100e, verify that the connections look the same, stuff it into the gaping
hole where T61's hdd enclosure belongs. Try to boot. "Operating System Not
Found". Okay then. 

Plug in bootable Arch USB. Reboot. Pick the ``x86_64`` kernel; it boots. Mount
partititions of the HDD; they're readable. 

Swap the spinny-disk for my X230's SSD. Try to boot. No "operating system not
found" error this time; it doesn't see the disk at all. Maybe it's doing a
spin check on boot, and the SSD says mu?

Stick the SSD back in its USB enclosure, plug it in, reboot. It boots happily,
and I'm typing this from my X230's arch install, booted by the T61, right now. 

Next steps will be to stick the X230's old spinny-disk in and see if it's a)
recognized, b) bootable. Find disk that's ok to get wiped, and visible to the
T61, and install to it. But that takes effort, and the system is usable for
now. 

.. author:: default
.. categories:: none
.. tags:: hardware, arch
.. comments::
