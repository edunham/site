GPG: Sharing use of a signing key
=================================

Is there a Right Way for an organization to hold a key and sign packages with
it? There are many possible ways, each a different blend between secrecy and
convenience, that I've been learning about recently. 

I don't know yet whether a Right Answer exists, or whether the best available
solution will be one I've looked at so far or not. With that disclaimer out of
the way, here's the use case and a few options.

.. more::

Crash Course in PGP
-------------------

I am not a mathematician, and this is not mathematical advice. But in a
far-too-small nutshell, it's easier to multiply two large prime numbers
together and get a huge number than to factor the huge number and figure out
which primes were multiplied to create it. 

Through some mathematical wizardry, this trait allows us to create pairs of
numbers which work together in extremely useful ways. We can use a program
called ``gnupg`` to generate keypairs.

Each pair has a public key, and a private key. If I'm the only person in the
world with my private key, and everybody else each has a copy of my public
key, we can communicate in two ways that wouldn't be possible without
encryption. 

First, someone with my public key can do some math on a message using the key,
and the message will turn into something which looks like random gibberish
until it's decrypted with my private key. Anyone who holds my private key
could decrypt the message, which is why this system can only promise secrecy
if the users are smart about not letting others touch their private keys.

Second, I can use my private key to encrypt a message, then publish it.
Encrypting with the private key means that anyone with the public key can open
it, so the text isn't very secret. However, the fact that my public key was
able to open the encrypted message guarantees that it was the private key,
which only I hold, that originally encrypted it. In other words, I **signed**
the message, so everyone knows that it really came from me. 

The real-world logistics gnupg are far more complex, of course, but if you
grasp those basic concepts you'll be able to follow the rest of all this.

So a project uses a signing key
-------------------------------

A hypothetical open source project has 5 core maintainers, and distributes
tarballs of each release of the code.

The project is pretty well known, and some malicious individual with too much
time on their hands is trying to gain respect from their Chaotic Evil friends
by tampering with the contents of the tarballs. 

To help the users detect such tampering, the project uses a gpg key. One
maintainer creates the key, publishes the public key, and uses the private key
to sign each release. Great! Now the users can verify that the release they
downloaded came directly from the project maintainers, rather than having been
tampered with along the way.

But that's a single point of failure
------------------------------------

So right now we have one maintainer holding the secret key, keeping it Super
Secret, and signing releases. This is straightforward from a security
perspective, but not a tenable solution in the real world. 

What if that one maintainer gets sick, or wants to take a vacation? What if
they leave the project? 

And let's not even think about what happens if that one maintainer decides to
actively sabotage the project, right now -- I'll save till later the
techniques for requiring a quorum of maintainers to approve the signing of a
given release. 

Couldn't the maintainer share a copy of the key?
------------------------------------------------

They totally could. They could even share it pretty safely, by encrypting it
with the recipient's public key to make sure the useful information in it
can't get intercepted by their or the recipient's email provider. 

But sharing private keys is A Bad Idea. A Really Bad Idea. The more people
hold a private key, the more chances for someone to get malware on their
laptop, or get convinced to sabotage the project, or generally leak the key in
any number of ways. 

If that private key gets into an attacker's hands, they can tamper with any
release to insert whatever they want. Worse, there's no way to tell
immediately whether an attacker is holding a copy of the private key, so you
won't necessarily be able to revoke the key until you detect that it's been
abused.  The closest thing to a "nobody else has this key" guarantee is "I've
been very very careful with it"... and sharing the private key with anyone
else, for any reason, is already a violation of "being very careful".




.. author:: default
.. categories:: none
.. tags:: gpg
.. comments::
