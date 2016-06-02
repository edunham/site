Persona and third-party cookies in Firefox
==========================================

Although its front page claims we've deprecated `persona`_, it's the only way
to log into the `statusboard`_ and `Air Mozilla`_. For a long time, I was
unable to log into any site using Persona from Firefox 43 and 44 because of an
error about my browser not being configured to accept third-party cookies.

The `support article`_ on the topic says that checking the "always accept
cookies" box should fix the problem. I tried setting "accept third-party
cookies" to "Always", and yet the error persisted. (setting the top-level
history configuration to "always remember history" didn't affect the error
either).

Fortunately, there's also an "Exceptions" button by the "Accept cookies from
sites" checkbox. Editing the exceptions list to universally allow
"http://persona.org" lets me use Persona in Firefox normally.

.. figure:: /_static/persona-exception.png
    :align: center

That's the fix, but I don't know whose bug it is. Did Firefox mis-balance
privacy against convenience? Is the "always accept third-party cookies"
setting's failure to accept a cookie without an exception some strange edge
case of a broken regex? Is Persona in the wrong for using a design that
requires third-party cookies at all? Who knows!

.. _persona: https://developer.mozilla.org/en-US/Persona
.. _statusboard: http://statusupdates.dev.mozaws.net/
.. _Air Mozilla: https://air.mozilla.org/
.. _support article: https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences

.. author:: E. Dunham
.. categories:: mozilla
.. tags:: none
.. comments::
