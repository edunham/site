The Magic of Extundelete
========================

Last night, I was just falling asleep when my roommate knocked on my door with
a Linux problem. Our CS480 assignment was due at midnight and she'd finished
the work, then accidentally overwritten the most important file in her program
with a malformed tar command. 

.. more::

Seek Possible Backups
---------------------

My first action was to go down the list of possible locations where a copy of
the file might be: 

* Did you back it up? (no)
* Did you email it to anyone? (no)
* Did you upload it to the school servers to test it? (no)
* Are you using revision control? (no)
* Are there any swap files from your editor? (no)
* Is the file in use by any program? (no)
* Is there a compiled file that we might be able to decompile into ugly but
  submit-able source? (no)

Out of familiar options, I had her email the professor before the deadline
had technically passed to explain the situation. She then phoned her father,
who's an engineer at Xerox and used to teach CS480. He ran her through the
same questions that I had already asked, mirrored my decision to save the *Git
is your best friend* discussion for a more reasonable hour, and then suggested
a tool called ``extundelete``. 

Delete vs Overwrite
-------------------

To spoil the end of this saga, I found that it was easier to recover a deleted
file than an overwritten one. Although the Ubuntu Forums have `instructions`_
for recovering an overwritten file, they did not work for me. I suspect it may
be because the file was overwritten with the output of ``tar``, rather than
being overwritten with an empty file. 

Save the Inodes
---------------

Unix-style filesystems keep track of where files live on the disk using
sequentially numbered datastructures called index nodes, or ``inodes``. When a
file is deleted, the inode's contents aren't actually overwritten until some
other program opens a file and needs that inode. 

In order to prevent anything from overwriting the inode of a deleted file,
**stop using the computer immediately after the accidental deletion**.

I'd expect an OS to clean up after itself when politely asked to shut
down, and the artefacts I'd like to recover would be regarded as garbage by
those cleanup routines. This meant the next step was to **unplug the laptop's
power supply and then pull out its battery**. 

Finally, it is critically important that you **do not boot from the drive with
the deleted file until after successful file recovery**. 

Boot, Carefully, from External Media
------------------------------------

After powering down the laptop, I plugged in an Arch Linux livecd USB stick
that I happened to have lying around. On a spare machine, I Googled which
function keys would take me into BIOS settings, because the BIOS screen can
flash past extremely fast on newer computers. 

I then entered the BIOS settings and instructed the laptop to have USB first
in its boot priority order. To be super safe, I removed the internal HDD from
the list of boot devices entirely. 

Unfortunately, my USB stick did not have ``extundelete``, trying to install it
from the package manager onto the stick did not work (and probably isn't
supposed to), and whatever C++ compiler it shipped with got really grumpy when
I tried to build ``extundelete`` on the USB stick from source. Life lesson:
Roll your recovery CDs before, rather than after, burning them. 

However, I have the SSD from my laptop in a USB enclosure and have been
booting an older box off of it until my new laptop arrives. I booted my
roommate's laptop off of my SSD, and had my entire desktop environment,
package manager, and other useful tools available. 


.. note:: 

    The bootloader on a drive accustomed to being in a laptop will default to
    booting the OS on ``/dev/sda1``. It is very important to edit this entry
    to have it boot from ``/dev/sdb1`` (or the first letter after all the
    laptop's internal drives are accounted for), since internal drives are
    seen first and get earlier letters. Remember the part about **do not boot
    from the drive with the deleted file until after successful file
    recovery**?

Find the Right Partition
------------------------

The `instructions`_ I was following said to mount the partition containing the
overwritten file, so I mounted the ``sda`` partitions one at a time until
finding which one contained Linux (``/dev/sda4``). As per the instructions, I
removed the overwritten file and then unmounted the partition. 

Back Up?
--------

The partition in question is 500GB, which is bigger than the largest spare HDD
that I have lying around. If it was smaller, I would have **very very
carefully** used ``dd`` to clone the partition in case undeletion went wrong.

Run Extundelete
---------------

Ok, by this time it was 1am and I'm still recovering from conference flu, so I
did a stupid thing: I tried to run extundelete before unmounting the
partition. It caused this error:: 

    The partition should be unmounted to undelete any files without further
    data loss.
    If the partition is not currently mounted, this message indicates
    it was improperly unmounted, and you should run fsck before continuing.
    If you decide to continue, extundelete may overwrite some of the deleted
    files and make recovering those files impossible.  You should unmount the
    file system and check it with fsck before using extundelete.
    Would you like to continue? (y/n)

**The correct answer is No**. This error only occurs when, as it says, the
partition either is mounted or was unmounted wrong. 

If the partition was unmounted when you ran ``extundelete`` and you got that
error, a ``fsck`` might help. I'd recommend running ``fsck -Nn`` for a dry
run, to see what ``fsck`` would do if you let it. ``fsck`` is useful in cases
of filesystem corruption, where a file exists on disk but does not have an
inode. 

Another possible reason for getting that error would be if you were trying to
run extundelete from the same partition as the lost file was on. In that case,
you are a terrible person for ignoring literally all the instructions about
running extundelete from a livecd, and **do not boot from the drive with the
deleted file until after successful file recovery**. 

I unmounted the partition, and the error did not reappear.

Undelete by File Path
---------------------

You probably have to run these commands as root. I elevated to a root shell
anyways, because at this point I'm playing with so much fire that avoiding the
distraction of constantly typing ``sudo`` is a net benefit::

    $ extundelete /dev/sda4 --restore-directory home/username/path/to/dir/

Note that ``extundelete --help`` explains how the path is relative to the root
of the partition, and thus does not need a leading slash.

The ``restore-directory`` command didn't actually work (if it'd worked, a
bunch of files would have appeared in ``RECOVERED_FILES/``) but it did print a
long list of files and directories, their inodes, and whether they were
deleted or not::

    File name                                       | Inode number | Deleted        
    status                                                                          
    .                                                 5243979                       
    ..                                                5243970                       
    cs411                                             5375933                       
    cs480                                             5252709                       
    Essay 1.odt                                       5248187        Deleted        

Digging Around by Inode
-----------------------

``extundelete --help`` reveals that I can use it to examine individual
inodes. Since the missing file is in the ``cs480`` directory, my next command
examined its contents::

    $ extundelete /dev/sda4 --inode 5252709

All this does is give me a list of the directory's contents, with their
respective inodes and deletion status::

    ...
    Milestone2_lexical_analyzer                       5375950                       
    Milestone4_Code_Generation_Constants              5377172                       
    Milestone1_gforth_basics                          5374187                       
    Milestone3_parser                                 5375948                       
    gforth_problem_6.txt                              5252921        Deleted  
    ...

The missing file was in the ``Milestone4`` directory, so my next command
examined it::

    $ extundelete /dev/sda4 --inode 5377172

Now we're getting somewhere! The overwritten file was named
``code_generator.c``, and in the output of that last inode listing I have::

    code_generator.c                                  5378104        Deleted        
    code_generator.o                                  5378085        Deleted        
    code_generator.h                                  5378092                       
    .code_generator.c.swp                             5378066        Deleted        
    .code_generator.c.swx                             5378065        Deleted        
    code_generator.c~                                 5378102        Deleted

Restore From Inodes
-------------------

I restored each file separately, though looking at the help again I could
easily have done them as a list:: 

    $ extundelete /dev/sda4 --restore-inode 5378104,5378066,5378065,5378102

That's to grab the ``.c``, the ``.swp`` and ``.swx``, and the ``.c~`` files.

Whenever a file is successfully undeleted, it gets saved as
``RECOVERED_FILES/file.xxxxxx`` where ``xxxxxx`` is its inode number. 

Results
-------

Despite following the `instructions`_ as correctly as I could at 1am, the
recovered ``code_generator.c`` file was still overwritten with the gibberish
of the errant ``tar`` command. 

The ``code_generator.c~`` file contained a recent copy of the file which had
been overwritten, so my roommate emailed it to the professor. 


Postscript: Swap File Recovery Attempt
--------------------------------------

But what if the ``code_generator.c~`` file hadn't been mysteriously created by
whatever utility spits out ``.c~`` files?

I tried to recover the swap files with ``vim -r code_generator.c``, and it
detected both of them, but I got the error::

    E307: .code_generator.c.swx does not look like a Vim swap file

And indeed, it is not a Vim swap file::

    $ file .code_generator.c.swx 
    .code_generator.c.swx: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped

Something about these files has massively confused Linux. Let's see if they
contain anything interesting:: 

    $ strings .code_generator.c.swx | less

It looks a bit like output from running the code generator
program interspersed with paths on the filesystem. Whatever this thing is,
it's sure not a valid Vim swap file.

To see what valid swap files look like, I forced Vim to generate one by
opening a file, typing into it, waiting 4 seconds, then closing that terminal. 

    The swap file is updated after typing 200 characters or when you have not
    typed anything for four seconds.

    -- (from the `Vim docs`_)

Unsurprisingly, it's a valid swap file::

    $ file .test.c.swp 
    .test.c.swp: Vim swap file, version 7.4

and running ``strings`` on it prints out the text that I had typed before
killing Vim. 

The moral of this tangent is that it would not have been possible to recover
the ``.c`` files solely from their Vim swap files in this case.

.. _Vim docs: http://vimdoc.sourceforge.net/htmldoc/recover.html
.. _instructions: http://ubuntuforums.org/showthread.php?t=2113182
.. author:: default
.. categories:: none
.. tags:: cs480, extundelete, solved, vim
.. comments::
