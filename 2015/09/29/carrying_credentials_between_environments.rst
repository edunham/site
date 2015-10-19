Carrying credentials between environments
=========================================

This scenario is simplified for purposes of demonstration.

I have 3 machines: ``A``, ``B``, and ``C``. ``A`` is my laptop, ``B`` is a
bastion, and ``C`` is a server that I only access through the bastion. 

I use an SSH keypair helpfully named ``AB`` to get from ``me@A`` to ``me@B``.
On ``B``, I ``su`` to ``user``. I then use an SSH keypair named ``BC`` to get
from ``user@B`` to ``user@C``. 

I do not wish to store the ``BC`` private key on host ``B``. 

SSH Agent Forwarding
--------------------

I have keys ``AB`` and ``BC`` on host ``A``, where I start. Host ``A`` is
running ``ssh-agent``, which is installed by default on most Linux
distributions. ::

    me@A$ ssh-add ~/.ssh/AB     # Add keypair AB to ssh-agent's keychain
    me@A$ ssh-add ~/.ssh/BC     # Add keypair BC to the keychain
    me@A$ ssh -A me@B           # Forward my ssh-agent 

Now I'm logged into host ``B`` and have access to the ``AB`` and ``BC``
keypairs. An attacker who gains access to ``B`` after I log out will have
no way to steal the ``BC`` keypair, unlike what would happen if that keypair
was stored on ``B``. 

See `here <http://www.unixwiz.net/techtips/ssh-agent-forwarding.html>`_ for
pretty pictures explaining in more detail how agent forwarding works. 

Anyways, I could now ``ssh me@C`` with no problem. But if I ``sudo su user``,
my agent is no longer forwarded, so I can't then use the key that I added back
on ``A``!

Switch user while preserving environment variables
--------------------------------------------------

::

    me@B$ sudo -E su user
    user@B$ sudo -E ssh user@C

What?
-----

The ``-E`` flag to sudo preserves the environment variables of the user you're
logged in as. ``ssh-agent`` uses a socket whose name is of the form
``/tmp/ssh-AbCdE/agent.12345`` to call back to host ``A`` when it's time to do
the handshake involving key ``BC``, and the socket's name is stored in
``me``'s ``SSH_AUTH_SOCK`` environment variable. So by telling sudo to
preserve environment variables when switching user, we allow ``user`` to pass
ssh handshake stuff back to ``A``, where the ``BC`` key is available. 

Why is ``sudo -E`` required to ssh to ``C``? Because
``/tmp/sshAbCdE/agent.12345`` is owned by ``me:me``, and only the file's owner
may read, write, or execute it. Additionally, the socket itself
(``agent.12345``) is owned by ``me:me``, and is not writable by others. 

If you must run ssh on ``B`` without sudo, ``chown -R /tmp/ssh-AbCdE`` to the
user who needs to end up using the socket. Making them world read/writable
would allow any user on the system to use any key currently added to the
``ssh-agent`` on ``A``, which is a terrible idea. 

For what it's worth, the actual value of ``/tmp/ssh-AbCdE/agent.12345`` is
available at any time in this workflow as the result of ``printenv | grep
SSH_AUTH_SOCK | cut -f2 -d =``.

The Catch
---------

Did you see what just happened there? An arbitrary user with sudo on ``B``
just gained access to all the keys added to ssh-agent on ``A``. `Simon
<http://exyr.org/about/>`_ pointed out that the right way address this issue
is to use `ProxyCommand
<https://heipei.github.io/2015/02/26/SSH-Agent-Forwarding-considered-harmful/>`_
instead of agent forwarding. 

No, I *really* don't want my keys accessible on ``B``
-----------------------------------------------------

See ``man ssh_config`` for more of the details on ``ProxyCommand``. In
``~/.ssh/config`` on ``A``, I can put::

    Host B
        User me
        Hostname 111.222.333.444

    Host C
        User user
        Hostname 222.333.444.555
        Port 2222
        ProxyCommand ssh -q -w %h:%p B

So then, on ``A``, I can ``ssh C`` and be forwarded through ``B``
transparently. 


.. author:: default
.. categories:: none
.. tags:: ssh
.. comments::
