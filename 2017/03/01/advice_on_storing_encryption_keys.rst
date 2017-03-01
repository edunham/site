Advice on storing encryption keys
=================================

I saw an excellent question get some excellent infosec advice on IRC recently.
I'm quoting the discussion here because I expect that I'll want to reference
it when answering others' questions in the future.

A user going by ``Dagnabit`` asked:

    May I borrow some advice specifically on how best to store an ecryption key? I
    have a python script that encrypts files using libsodium, My question is how
    can I securely store the encryption key within the file system? Is it best
    kept in an sqlite db that can only be accessed by the user owning the python
    script?

This user has run right into one of the fundamental challenges of security:
How can my secrets (in this case, keys) be safe from attackers, while still
being usable?

`HedgeMage <https://binaryredneck.net/>`_ replied with a wall of useful
advice. Quotations are her words, links and annotations between them are me
adding some context and opinions.

    So, it depends on your security model: in most cases I'm prone to
    keeping my encryption key on a hardware token, so that even if the server is
    compromised, the secret key is not.

You're probably familiar with time-based one-time-pad `hardware tokens
<https://en.wikipedia.org/wiki/Security_token>`_, but in the case of key
management, the "hardware token" could be as simple as a USB stick locked in a
safe. On the spectrum of compromise between security and convenience, a
hardware token is toward the `DNSSEC keyholder
<https://www.schneier.com/blog/archives/2010/07/dnssec_root_key.html>`_ end.


    However, for some projects you are on virtualized infrastructure and can't
    plug in a hardware token.  It's unfortunate, because that's really the safest
    thing, but a reality for many of us.

This also applies to physical infrastructure in which an application might
need to use a key without human supervision.


    Without getting into anything crazy where a proxy server does signing, etc,
    you usually are better off trusting filesystem permissions than stuffing it in
    the database, for the following reasons:

While delegating the task of signing to a proxy server can make life more
annoying to an attacker, you're still going to have to choose between having a
human hold the key and get interrupted whenever it's needed, or trusting a
server with it, at some point. You can compromise between those two extremes
by using a setup like `subkeys <https://wiki.debian.org/Subkeys>`_, but it's
still inconvenient if a subkey gets compromised.

    * It's easier to monitor the filesystem activity comprehensively, and detect
    intrusions/compromises.

    * Filesystem permissions are pretty dependable at this point, and if the
    application doing the signing has permission for the key, whether in a DB or
    the filesystem, it can compromise that key... so the database is giving you new
    attack surfaces (compromise of the DB access model) without any new
    protections.

To put it even more bluntly, *any* unauthorized access to a machine has the
potential to leak *all* of the secrets on it. The actions that you'll need to
take if you suspect the filesystem of a host was compromised are pretty much
identical to those you'd take if the DB was.

    * Stuffing the key in the DB is nonstandard enough that you may be writing more of
    the implementation yourself, instead of depending as much as possible on
    widely-used, frequently-examined code.

Dagnabit's reply saved me the work of summarizing the key takeaways:

    I will work on securing the distrubtion and removing any unnecessary packages.

    I'll look at the possibility of using a hardware token to keep it
    secure/private.

    Reducing the attack surface is logical and something I had not considered.



.. author:: E. Dunham
.. categories:: none
.. tags:: none
.. comments::
