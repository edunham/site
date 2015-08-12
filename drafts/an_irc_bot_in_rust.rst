an IRC bot in Rust
==================

To continue my attempts to learn the programming languge whose infrastructure
I'm now supporting, I wish to write an IRC bot. I have a very specific, very
tiny purpose for it, directly relevant to the Rust community. 

It's a relatively common occurrence that someone bravely striving to learn
English and Rust at the same time in a Rust IRC channel will refer to the
channel population as "guys". There are a few community members who
consistently react to this generalization by pointing out that not everyone in
the channel are "guys", as a gentle reminder to choose other words. 

This gives me a tiny, bite-sized problem: Make a little bot, whose working
title will be "notallguys" unless anybody gets their feelings hurt by the "not
all men" parody, able to do the following: 

* Lurk in ``#rust``, ``#rust-internals``, ``#rust-community``,
  ``#rust-design``, and ``#rust-offtopic`` on ``irc.mozilla.org``
* Notice when someone says the string ``guys``, with a space or punctuation
  mark either side, in a context likely to be referring to the channel's
  population (ie, not in quotes)
* Pick at random one polite, gentle reminder that not everyone in the channel
  is a guy, and say it. I'm thinking these could include "I'm not a guy, I'm a
  robot", "Please remember that not everyone here is a guy", or with a low
  probability just "err, guys?". 

To reduce spam, there are some "nice-to-have" features that I could work on
after getting a basic bot working. I'd consider these features optional
because they add a bit of complexity by introducing stateful behavior: 

* Remember who it's reminded in the past, and have ensuing reminders be via PM
  rather than public
* Be configurable by each user for whether they want their reminders private
  or public. I feel that there might be a use case for a public "<notallguys>
  you did it again" "<user> oops" exchange for those users concerned about
  the impact of their language on the channel who'd like the exchange to wrap
  up with a quick, public apology.
* Allow [some|all] users to add new reminder messages, or remove user-added
  messages. 
* Allow per-channel custom messages, such as "not everybody in #channel is a
  guy, you know".



.. author:: default
.. categories:: none
.. tags:: none
.. comments::
