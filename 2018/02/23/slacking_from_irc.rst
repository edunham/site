Slacking from Irssi
===================

My IRC client helps me work efficiently and minimize distraction. Over the
years, I've configured it to behave exactly how I want: Notifying me when
topics I care about are under discussion, and equally as important, refraining
from notifications that I don't want. Since my IRC client is developed under
the GPL, I have confidence that the effort I put into customizing it to
improve my workflow will never be thrown out by a proprietary tool's business
decisions.

But the point of chat is to talk to other humans, and a lot of humans these
days are choosing to collaborate on Slack. Slack has its pros and cons, but
some of the drawbacks can be worked around using open technologies.

.. more::

Do you need to Slack from irssi?
------------------------------

If you feel ambivalent toward the web UI, going to the trouble of setting up
an IRC client for Slack will likely be more hassle than reward.

If you loathe the Slack UI but don't care much for IRC, you might be better
off considering the `Matrix bridge
<https://medium.com/@RiotChat/slack-bridge-improvements-44c52fb712f4>`_ or
seeking out other clients. I have not tried them and can't vouch for any.

If you use WeeChat, you can use Slack IRC directly, or try the `WeeChat Slack
gateway <https://robots.thoughtbot.com/weechat-for-slacks-irc-gateway>`_.
A friend at a larger company informs me that the latter doesn't hold up well
on Slack workspaces in the tens of thousands of users, so if you're on a
particularly large Slack you might be better off treating it as an IRC server.

If you're looking for a terminal-based client to get started with IRC,
consider choosing WeeChat over Irssi. WeeChat is extensible in more languages
and allegedly has fewer edge cases like the saga detailed here.

The IRC bridge won't work on all Slacks
---------------------------------------

First, a word of warning: You can only Slack from IRC if a workspace owner
enables the IRC/XMPP gateway for a given instance, which is disabled by
default because Slack distrusts users' ability to make good security
decisions. They're not necessarily wrong, but generally users who care deeply
enough to slog through their misleading instructions also know a thing or two
about SSL.

This will work on all IRC clients, But...
-----------------------------------------

The good news is that once a Slack instance is exposing the IRC gateway, it
looks to an IRC client just like a single standalone IRC server.

The bad news is that the `instructions Slack provides
<https://medium.com/@RiotChat/slack-bridge-improvements-44c52fb712f4>`_
will only work if you do them on an IRC client where you weren't connected to
any other IRC yet. This is because (at time of writing) they tell you only to
add Slack as a server in your client.

Irssi is "special".
-------------------

Let's step back to the `basics of how IRC works
<http://talks.edunham.net/seagl2014/intermediateirc/#6>`_ for a minute: On
IRC, a *network* is a group of *servers*, and on a given network you can join
various channels. Being on a network is *intentionally agnostic of what server
you're connected to*, so that if one server goes away, you can connect to
another and keep right on chatting.

All modern IRC clients that I'm aware of allow you to be connected to several
networks at once. For instance I'm on the Freenode IRC network to talk to
people about FOSS projects I use, and also the Mozilla IRC network because
most of my work channels are there. Every command you issue to irssi is
done in the context of some network -- do you want to auth to services? Join a
new channel? Add a server? Irssi assumes that the server of the buffer
in which you issue a command is the server you want the command to apply to,
though some might require you to explicitly specify the network.

So, if you're already on a network and you tell your client to add a
server, what will happen? That's right, your client will do the smart thing
and add the server *to the network*. It will also likely connect you to that
server, and do all the things on that server which you've asked it to do when
you first connect to that particular network.

What happens if that new server is not part of the network in question at all,
but is instead Slack? irssi will do the automatic things, like joining
channels and trying to auth to services, that it's supposed to do when it
joins that network anyways, because you as a human told the client that the
server was on the network. Even if that's because some mean ol' documentation
tricked you into it, irssi doesn't know any better.

What happens when irssi autojoins a bunch of channels, but issues those
join commands to the Slack server? Well, on Slack just as on IRC, the first
person to join a channel `creates it
<https://get.slack.help/hc/en-us/articles/201402297-Create-a-channel>`_. So,
you have just revealed to your whole Slack workspace exactly the names of the
channels you were in on the IRC server from which you issued the ``/server``
command.

Spuriously creating a bunch of channels isn't the end of the world, you can
just `delete them
<https://get.slack.help/hc/en-us/articles/213185307-Delete-a-channel>`_,
right? Well, if you have owner or admin permissions on the Slack workspace,
absolutely! If you are not an owner or admin, you will have to go find someone
who is and ask them to clean up the mess.

Well, at least that's what happens when an active IRC user blindly assumes
that whoever wrote the Slack IRC connection instructions had tried them in an
irssi instance they were actually using for IRC. My bad.

Don't follow the Slack docs verbatim from Irssi.
------------------------------------------------

When you're looking at https://my.slack.com/account/gateways, it has
instructions like the following:

1. Ensure that your IRC client is configured with your normal Slack username as your nick.

2. If you are connecting through a raw ``/server`` command, your command will be: ``/server myserver.irc.slack.com 6667 myserver.Nosh5Neevot5Efua``

3. If you have a more UI-oriented setup, your IRC server is ``myserver.irc.slack.com``, and the server password is ``myserver.Nosh5Neevot5Efua``. Accepted ports are 6667, 6697, and 8000.

That ``Nosh5Neevot5Efua`` bit is a password you shouldn't share with anyone --
for this post I'm using a string from pwgen so it looks more like the actual
config.

To avoid the tale of woe that I outlined above, if you're slacking from Irssi,
you need to *add a network* before adding the server. This changes the steps
to:

1) Ensure that your IRC client is configured with your normal Slack username as your nick.

2) Add a network with the command ``/network add myslack``

3) If you are connecting through a raw ``/server`` command, your command will be: ``/server add -auto -network myslack myserver.irc.slack.com 6667 myserver.Nosh5Neevot5Efua``

See `the irssi docs <https://irssi.org/documentation/startup/>`_ for more
options. Join the desired channels on the Slack network just as you would in
IRC. When you're done, remember to ``/save``, and your ``.irssi/config``
should contain something like::

    servers = (
      ...
      {
        address = "myserver.irc.slack.com";
        chatnet = "myslack";
        port = "6697";
        use_ssl = "yes";
        ssl_verify = "no";
        autoconnect = "yes";
        password = "mozilla.Nosh5Neevot5Efua";
      }
    );

    chatnets = {
      ...
      myslack = { type = "IRC"; };
    };

    channels = (
      ...
      { name = "#slackchannel"; chatnet = "myslack"; autojoin = "yes"; },
      ...
    )

Now Slack is almost IRC
-----------------------

With the bridge set up, Slack behaves mostly like IRC. There remain some
outstanding differences:

* You cannot leave the workspace's default channel. You can `mute the channel
  <https://get.slack.help/hc/en-us/articles/204411433-Mute-a-channel>`_ or
  `turn off notifications
  <https://get.slack.help/hc/en-us/articles/201649323-Set-channel-notification-preferences>`_
  but Slack won't let you leave.

* When someone uses ``@here`` in a channel, Slack appends your username to the end
  of the message when forwarding it along to IRC to make sure you get pinged.
  The person did not actually type your nick when it occurrs in this context.

* If you want to hilight a Slack user in a message, you must inlcude the ``@`` in
  their username. If you just say the string of their name, they won't get
  notified. This is the opposite of IRC, where it's a newbie mistake to include
  someone's hat when addressing them.

* Slack has `message threading
  <https://get.slack.help/hc/en-us/articles/115000769927-Message-threads>`_ and
  allows `editing and deleting messages
  <https://get.slack.help/hc/en-us/articles/202395258-Edit-or-delete-messages>`_,
  neither of which are really a thing on IRC. Remember that Slack sends the
  first version of each message to the IRC bridge. Messages in a thread will
  look like they were sent to the channel. Messages that were later deleted will
  persist in your IRC logs. Edits won't show up; IRC bridge users see only the first
  version of each. If you need to view an edited message or edit or delete your
  message, you have to use the Slack UI.


Have fun!

.. author:: E. Dunham
.. categories:: none
.. tags:: slack, irc, irssi
.. comments::
