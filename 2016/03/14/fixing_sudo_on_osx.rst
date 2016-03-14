Fixing sudo errors from the command line on OSX
================================================

The first symptom that I had made a terrible mistake showed up in an Ansible
playbook::

    GATHERING FACTS
    ***************************************************************
    fatal: [...] => ssh connection closed waiting for a privilege escalation password prompt
    fatal: [...] => ssh connection closed waiting for a privilege escalation password prompt
    fatal: [...] => ssh connection closed waiting for sudo password prompt
    fatal: [...] => ssh connection closed waiting for sudo password prompt

That looks like the sudo binary might be broken. To rule out Ansible problems,
remote into the machine and try to use sudo::

    administrators-Mac-mini:~ administrator$ sudo ls
    sudo: effective uid is not 0, is sudo installed setuid root?

This meant that there was a file permissions problem::

    working-host administrator$ ls -al /usr/bin/sudo
    -r-s--x--x  1 root  wheel  164560 Sep  9  2014 /usr/bin/sudo

    broken-host administrator$ ls -al /usr/bin/sudo
    -rwxrwxr-x  1 root  wheel  164560 Sep  9  2014 /usr/bin/sudo

Now the problem is reduced to fixing the permissions. One does not simply sudo
to root, because there's no working sudo. However, Apple provides `a utility
<http://azchipka.thechipkahouse.com/2013/11/29/enabling-root-user-mavericks-mac-os-10-9/>`_
which allows you  to enable root login using only the administrator account's
permissions::

    broken-host administrator$ dsenableroot
    username = administrator
    user password:
    root password:
    verify root password:

    dsenableroot:: ***Successfully enabled root user.

The first password is the current one for the administrator account, and the
other two should be the same string and will become the root account's
password.

After enabling root login, disconnect then SSH into the host as root::

    broken-host root# chmod 4411 /usr/bin/sudo

And test that the fix fixed it::

    broken-host root# su administrator
    broken-host administrator$ sudo ls

Finally, clean up after yourself to inconvenience any future attackers::

    broken-host administrator$ dsenableroot -d

Moral of the story: Errant chowns of ``/usr/bin`` are just as bad when they
come from automation as when they come from humans.

.. author:: default
.. categories:: none
.. tags:: osx
.. comments::
