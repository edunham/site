DMARC
=====

Today, the security alias for a site I administer got an automated message
pointing out that we lacked a DMARC record. Here's what I learned about how to
set up and test them.

.. more::

How do clients detect forged emails?
------------------------------------

There are two main ways for an email client to check whether a message really
came from the server it claims it's from:

* `DKIM <https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail>`_, or
  DomainKeys Identified Mail, attaches a digital signature to each message and
  publishes the public key for that signature in the DNS. The client looks up
  the alleged origin server's public key, and if it can decrypt the signature,
  that means the message was signed with the corresponding private key (and
  thus ostensibly originated on a server controlled by the same person who
  controlls the DNS).

* `SPF <https://en.wikipedia.org/wiki/Sender_Policy_Framework>`_, or Sender
  Policy Framework, uses TXT records to publish a list of hosts from which
  legitimate messages will be sent. The client compares the origin of a
  message to that list, and if the message came from one of the listed hosts,
  the client knows that it was sent from a machine that the person who
  controls the DNS considers authorized.

Of course there are other techniques as well, such as signing a message with
the sender's GPG key and then having the recipient manually look up the sender
in the trustweb, but DKIM and SPF are the most widely used automatic systems
for spam detection.

What happens when they find a fake?
-----------------------------------

This is where `DMARC <http://dmarc.org>`_ comes in. With just DKIM and SPF,
the alleged sender (ie, the domain who's either sending the mail or being
spoofed) has no way to tell clients what to do when messages fail both
authenticity checks.

DMARC is simply a TXT record published in a server's DNS that tells clients
what the person controlling that DNS wants them to do if a message fails both
DKIM and SPF checks.

What's in a DMARC record?
-------------------------

* Version, which as of 2015 will only ever be ``v=DMARC1``. This field is for
  future-proofing in case the protocol needs to change someday.
* Policy, which will be one of ``p=none``, ``p=quarantine``, or ``p=reject``.
  The policy tells clients what to do with messages that appear to be spam.
* Percent, which tells clients how often to check messages from this domain.
  ``pct=100`` will ensure that all messages are checked.
* Reporting address is a URI that specifies who clients should tell about
  messages which failed both SPF and DKIM. This will probably look like
  ``rua=mailto:dmarcreports@yourdomain.tld``.

What policy should I use?
-------------------------

If you choose **reject**, you're asking clients to throw away all messages
from your domain which fail both SPF and DKIM authentication. Only use this
setting if you're extremely confident that users will never need to see the
contents of unauthenticated or incorrectly authenticated mail that comes from
legitimate servers on your domain.

Use **quarantine** if messages that fail both SPF and DKIM authentication
should be marked as spam but delivered by clients. This can be a good
compromise between ensuring that users are notified of messages that fail
authentication, yet letting legitimate but poorly-authenticated messages get
to somewhere the users can see them if they check their spam folders.

The **none** setting is for testing purposes. If you're just starting out with
DMARC, setting your record to ``none`` for the first week or two will allow
you to see clients' reports of which legitimate emails from your domain are
failing their DKIM and SPF checks. It's a good idea to leave your DMARC policy
set to ``none`` until you have DKIM, SPF, or both for every legitimate
service that sends emails from your domain. Remember that a message only has
to pass one authentication method to be considered not spam -- DMARC is only
relevant to the messages which fail *both*.


Deploying DMARC
---------------

First, pick the email address to which reports of apparently-spoofed messages
should be sent. It's a good idea to create a new email alias (this should be
trivial if you already control your own DNS), so that you can add other
administrators if your team grows.

Next, figure out what the record should say. It might look like this::

    v=DMARC1;p=none;pct=100;rua=mailto:dmarcstuff@yourdomain.com

Once you have the record, add it to your DNS as a TXT record for
``_dmarc.yourdomain.com``. Then wait a few minutes for the world's DNS servers
to get the memo about your new record, and verify that it's correctly
deployed!

Verify the DMARC record
-----------------------

From the command line, you can use ``dig txt _dmarc.somedomain.tld`` to see
what that domain's policies are. For instance, Google's policy is to
quarantine messages and inform a ``mailauth-reports`` address::

    $ dig txt _dmarc.google.com
    ...
    ;; ANSWER SECTION:
    _dmarc.google.com.  484 IN  TXT "v=DMARC1\; p=quarantine\; rua=mailto:mailauth-reports@google.com"
    ...

If you prefer a pretty online interface, you could use a free online tool like
`dmarcian.com <https://dmarcian.com/dmarc-inspector/>`_ instead.

If you happen to have sufficiently dark-gray hat handy, you could try spoofing
a message to yourself from your own domain::

    $ mail -r spoofed@yourdomain.tld you@gmail.com

This will require no small amount of fiddling with firewalls to get working,
since many personal systems are configured by default to be unable to send
mail.

Alternately, you can just wait until legitimate mail gets sent from your
domain, then see what clients report back. The ``pct=100`` directive asks
clients to report on all mail recieved from your domain, regardless of whether
it passed or failed.

Next Steps
----------

Leave the ``p=none`` setting in place until all the systems which you expect
to send legitimate emails will have sent something. Then audit the logs
emailed to you by client mail hosting providers and see whether any legitimate
messages failed both DKIM and SPF.

Fix the systems which sent those poorly-authenticated messages, check the logs
from after your fix to make sure no messages are failing both authenticity
tests any more, and then increase the ``p`` setting to either ``quarantine``
or ``reject`` by editing the TXT record.

.. author:: E. Dunham
.. categories:: none
.. tags:: dmarc, email
.. comments::
