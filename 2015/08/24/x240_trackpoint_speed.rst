X240 trackpoint speed
=====================

The screen on my X1 Carbon gave out after a couple months, and my loaner
laptop in the meantime is an X240. 

The worst thing about this laptop is how slowly the trackpoint moves with a
default Ubuntu installation. However, it's fixable::

    cat /sys/devices/platform/i8042/serio1/serio2/speed
    cat /sys/devices/platform/i8042/serio1/serio2/sensitivity

Note the starting values in case anything goes wrong, then fiddle around::

    echo 255 | sudo tee /sys/devices/platform/i8042/serio1/serio2/sensitivity
    echo 255 | sudo tee /sys/devices/platform/i8042/serio1/serio2/speed
   
Some binary search themed prodding and a lot of ``tee:
/sys/devices/platform/i8042/serio1/serio2/sensitivity: Numerical result out of
range`` has confirmed that both files accept values between 0-255.
Interestingly, setting them to 0 does not seem to disable the trackpoint
completely. 

If you're wondering why the configuration settings look like ordinary files
but choke on values bigger or smaller than a short, go `read about sysfs
<https://www.kernel.org/pub/linux/kernel/people/mochel/doc/papers/ols-2005/mochel.pdf>`_. 

.. author:: E. Dunham
.. categories:: none
.. tags:: x240, trackpoint 
.. comments::
