Rust contributor email stats
============================

I'm playing with ``git log`` in the `rust
<https://github.com/rust-lang/rust>`_ repo, and getting some numbers about
contributors. Numbers are cool!

1230 different names have commits in Rust
-----------------------------------------

::

    ~/repos/rust $ git log --format="%aN" | sort -u | wc -l
    1230


1230 different email addresses have commits in Rust
---------------------------------------------------

::

    ~/repos/rust $ git log --format="%aE" | sort -u | wc -l
    1230


Yet there are 1262 unique name/email combos
--------------------------------------------

::

    ~/repos/rust $ git log --format="%aN %aE" | sort -u | wc -l
    1262

29 names have commits in Rust from more than one email address
--------------------------------------------------------------

::

    ~/repos/rust $ git log --format="%aN,%aE" | sort -u | cut -d , -f1 | uniq -c | grep -v " 1" | wc -l
    29

Who were they?
--------------

::

    ~/repos/rust $ git log --format="%aN,%aE" | sort -u | cut -d , -f1 | uniq -c | grep -v " 1"
        #... lots of names; don't need to this to show up when others Google them
        3 unknown
        # ... and a couple more names

Who's Unknown?
--------------

::

    ~/repos/rust $ git log --format="%aN %aE" | grep '^unknown' 
        # 3 commits omitted, because they contain usernames
     
Oh dear.
--------


Ok, which commits are from unknown?
-----------------------------------

::

    ~/repos/rust $ git log --author="unknown"
        # 3 commits omitted because they point out usernames, 
        # and calling people out publicly is mean

To see an individual commit, just use ``git show`` with its hash (the big long
hexadecimal number after "commit"). 

Who else had their Git settings a bit wrong?
--------------------------------------------

::
    ~/repos/rust $ git log --format="%aE %aN" | grep "[.](none)" | uniq -c
        # results with names omitted because these pages are indexed
        
Other than the 3 users with completely misconfigured Git settings (and 1
commit each in the project), there are 4 more people with their email set to
Git's default. These users have a collective 42 commits in Rust. 

Ok, back on track: How many gmail users have commits in?
--------------------------------------------------------

::

    ~/repos/rust $ git log --format="%aE" | grep gmail | sort -u | wc -l
    559

    ~/repos/rust $ git log --format="%aE" | grep gmail.com | sort -u | wc -l
    558

Which gmail was at some non-.com domain?
----------------------------------------

::

     ~/repos/rust $ git log --format="%aE" | grep gmail | grep -v gmail.com | sort -u
     <omitted>@gmail

Oh, they were just obsfuscating their address in case of spam bots or nosey
greppers. That's cool.

8 Yahoo users, 2 international
------------------------------

::

    ~/repos/rust $ git log --format="%aE" | grep yahoo | sort -u | wc -l
    8
    ~/repos/rust $ git log --format="%aE" | grep yahoo.com | sort -u | wc -l
    6

    ~/repos/rust $ git log --format="%aE" | grep yahoo | grep -v yahoo.com | sort -u
    <omitted>yahoo.no
    <omitted>@yahoo.co.uk

Today I learned that `.no is Norway <https://en.wikipedia.org/wiki/.no>`_. 

5 Outlook users
---------------

::

    ~/repos/rust $ git log --format="%aE" | grep outlook | sort -u | wc -l
    5
    ~/repos/rust $ git log --format="%aE" | grep outlook.com | sort -u | wc -l
    5

542 unique values in the domain field of the email addresses
------------------------------------------------------------

::

    ~/repos/rust $ git log --format="%aE" | sort -u | cut -d @ -f 2 | sort -u | wc -l
    542


.. author:: default
.. categories:: none
.. tags:: none
.. comments::
