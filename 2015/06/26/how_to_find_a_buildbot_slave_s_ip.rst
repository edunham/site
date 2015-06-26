How to find a Buildbot slave's IP
=================================

Today I got a seemingly ordinary request from a community member who
volunteers a build slave for Rust's buildbot::

    my builder is behind a firewall that just cycled IP's
    and I don't know what it is
    edunham: can you get the IP address of the bitrig builder for me?
    I have admin access to the builders website but it doesn't list the IP addresses of builders

.. more::

No officially supported technique to find slave IPs
---------------------------------------------------

I logged into the buildmaster and checked the slave's logs. I found that
although slaves reported a variety of information to the master, nothing
appears to log their IPs.  

I consulted the Buildbot docs, other users, and a project maintainer, but
nothing could tell me a "correct", supported way to find a slave's IP. 

The Workaround
--------------

I know that the slave whose IP I want is running builds successfully, which
means it has an `stunnel <https://www.stunnel.org/index.html>`_ back to the master.  

There are few enough slaves in this setup that it'll be faster to manually
check what host each stunnel corresponds to than to automate it with a script. 

I logged into the buildmaster, assumed the identity of the buildbot user, and
used ``netstat`` to get a list of the open stunnels::

    buildbot@buildmaster:~$ netstat -tupn | grep stunnel
    (Not all processes could be identified, non-owned process info
     will not be shown, you would have to be root to see it all.)
    tcp        0      0 10.190.147.69:9988      54.193.203.23:49167     ESTABLISHED 1038/stunnel4
    tcp        0      0 127.0.0.1:58123         127.0.0.1:9989          ESTABLISHED 1038/stunnel4   
    tcp        0      0 127.0.0.1:33051         127.0.0.1:9989          ESTABLISHED 1038/stunnel4   
    tcp        0      0 10.190.147.69:9988      54.219.68.106:36176     ESTABLISHED 1038/stunnel4   
    tcp        0      0 10.190.147.69:9988      63.245.221.32:54336     ESTABLISHED 1038/stunnel4 
    ...

The IP of the host I'm looking for will be somewhere in the second column of
addresses. Since there were only a couple more than I've shown you up there,
it was straightforward to test each plausible candidate individually. 

To see whether a given IP is the slave who moved, I can use reverse DNS to
approximate what hostname it belongs to. The ``host`` command from
``dnsutils`` is a convenient wrapper to reverse DNS when you give it an IP::

    $ host 54.193.203.23
    23.203.193.54.in-addr.arpa domain name pointer ec2-54-193-203-23.us-west-1.compute.amazonaws.com.

    $ host 63.245.221.32
    32.221.245.63.in-addr.arpa domain name pointer corp.mtv2.mozilla.com.

So the first of those IPs is one of our EC2 buildslaves, and the second is a
mac sitting under my coworker's desk in the Mountain View office. There was
one IP that corresponded to neither AWS nor the Mozilla network, and it
belonged to the missing build slave. 

It's also possible, with a bit more typing, to perform `reverse DNS lookups
<http://www.dnsstuff.com/reverse-dns-faq/>`_ with ``dig``. You just reverse
the order of the blocks of digits in the IP address, and add ``.in-addr.arpa``
to the end. For instance, ``abc.def.ghi.jkl`` would become
``jkl.ghi.def.abc.in-addr.arpa``.

.. author:: default
.. categories:: none
.. tags:: buildbot, dns
.. comments::
