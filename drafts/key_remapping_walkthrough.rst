Key Remapping
=============

It's one of those mundane things for which I find myself searching a dozen
related queries every time I need to do it, so I'm writing down the steps
where I can find them later. 

.. more::

Get the Keycode
---------------

::
    $ sudo showkey

then press the key that you want. The thing between my right alt and control
as keycode 99, and of the keys up in my 7th row, "delete" is 102 (currently
acting as "home", "end" is 107 (currently working as "end"), "PgDn" is 110
(and acts as insert), and "PgUp" is 111 (and acts as "delete"). The PrtSc,
ScrLk, Pause, and Insert keys on my 7th row are also inactive. 

Down by my arrow keys, the thing on the left is 104 and the thing on the right
is 109. The former functions as page up and the latter as page down. 

Showkey will time out after 10 seconds of inactivity.

Find or assign its name
-----------------------

TODO: xmodmap fuckery

Tell i3 what to do with it
--------------------------

todo: multiple keys counting as $mod


.. author:: default
.. categories:: none
.. tags:: none
.. comments::
