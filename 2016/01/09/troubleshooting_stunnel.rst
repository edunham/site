Troubleshooting stunnel
=======================

Today I've learned a few things aout how `stunnel`_ works. The main takeaway
is that Googling for specific errors in the stunnel log is incredibly
unhelpful, resulting in a variety of mailing list posts with no replies.
Tracking an error message through the source of the program doesn't lead to
any useful comments, either. So here's some SEO bait with concrete
troubleshooting suggestions.  

.. more::

I started out, as usual, with a pile of errors::

    /usr/local/bin/stunnel
    [ ] Clients allowed=2000
    [ ] Cron thread initialized
    [.] stunnel 5.27 on x86_64-apple-darwin14.0.0 platform
    [.] Compiled/running with OpenSSL 1.0.2e 3 Dec 2015
    [.] Threading:PTHREAD Sockets:POLL,IPv6 TLS:ENGINE,FIPS,OCSP,PSK,SNI
    [ ] errno: (*__error())
    [.] Reading configuration from file stunnel.conf
    [.] UTF-8 byte order mark not detected
    [ ] Initializing service [9987]
    [!] Error resolving "127.0.0.1": Neither nodename nor servname known (EAI_NONAME)
    [ ] Cannot resolve connect target - delaying DNS lookup
    [ ] No certificate or private key specified
    [ ] SSL options: 0x03000004 (+0x03000000, -0x00000000)
    [.] Configuration successful
    [ ] Listening file descriptor created (FD=6)
    [!] bind: Address already in use (48)
    [!] Error binding service [9987] to 127.0.0.1:9987
    [ ] Closing service [9987]
    [ ] Service [9987] closed
    stunnel startup failed, already running?

[!] Error resolving "127.0.0.1": Neither nodename nor servname known        
--------------------------------------------------------------------

This was the biggest `wat`_, and the hardest to track down because the
solution is so obvious. 

"Error resolving" sounds like the machine hasn't been informed of localhost's
existance, so let's check::    

    $ cat /etc/hosts
    127.0.0.1   localhost
    255.255.255.255 broadcasthost
    ::1             localhost 

And I can even ping ``127.0.0.1`` successfully.  So the message and I have
different ideas about what it means to "resolve" an IP. 

I found the fix here by diffing the ``stunnel.conf`` against that on a working
machine, and learned that I'd neglected to specify the correct port number on the
destination host. 

The solution to the "Error resolving localhost" turned out to be **specifying
the correct port for the other end of the stunnel**::

    $ cat stunnel.conf 
    pid =

    [9987]
    client = yes
    accept = 127.0.0.1:9987
    cafile = ./cert.pem
    verify = 3
    connect = 01.23.456.789:9988

Wow. Painfully obvious after you realize what's wrong, and just plain painful
before.

[!] Error binding service [9987] to 127.0.0.1:9987                          
--------------------------------------------------

The "already running?" hint is correct here. This error means stunnel didn't
let go of the port despite failing to start on a previous attempt. 

Easy fix; check whether it's really stunnel hogging the port::

    $ lsof -i tcp:9987
    COMMAND PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
    stunnel 363        me    6u  IPv4 0x20f17e5e0dd35277      0t0  TCP localhost:dsm-scm-target (LISTEN)


and if so, whack it with a metaphorical hammer::

    $ sudo killall stunnel

Tada!
-----

After getting the destination IP+port combination specified correctly and the
old broken stunnel killed, the stunnel starts successfully. 

.. _stunnel: https://www.stunnel.org/docs.html
.. _wat: https://www.stunnel.org/docs.html

.. author:: default
.. categories:: osx, stunnel, buildbot
.. tags:: none
.. comments::
