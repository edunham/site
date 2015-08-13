Ansible: Examining machines through a bastion
=============================================

Security is hard. One way to improve security for a group of machines at the
network level is to only permit traffic into them from a bastion server, and
only permit traffic into the bastion from some whitelisted ranges of IPs. 

Home and coffee shop wifi will assign one's laptop an IP address that is not
on the bastion's whitelist, the solution to which is accessing the bastion
through an intermediate host. These layers of indirection make it nearly
impossible for an attacker to gain access to servers behind the bastion
without the right credentials. Here a couple of ways to get Ansible traffic
through them. 

.. more::

Suppose I need to go from my laptop to host A to host B, so I can run commands
on B. To mitigate certain types of attack, host A only accepts SSH connections
on port 5555. I log into host A as namea.

In the first terminal::

    ssh -o Port=5555 -L2222:B:22 namea@A

Now traffic that goes into port 2222 of localhost will enter B on its port 22. 

If I wish to log into server B with the username nameb, I can simply::

    ssh -o Port=2222 nameb@localhost

If B was the Bastion server and I want to go through it to host C, which is
only accessible through the Bastion, I can instead do the following::

    
    ssh -o Port=5555 -L2222:B:22 namea@A
    ssh -o Port=2222 -L 3333:C:22 localhost

    ssh -o Port=3333 namec@localhost

And now I'm logged into C as namec!

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
