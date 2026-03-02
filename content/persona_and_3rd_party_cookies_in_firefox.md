+++
path = "2016/04/18/persona_and_3rd_party_cookies_in_firefox"
title = "Persona and third-party cookies in Firefox"
date = 2016-04-18

[extra]
author = "E. Dunham"
+++
Although its front page claims we've deprecated [persona](https://developer.mozilla.org/en-US/Persona), it's the only way to log into the [statusboard](http://statusupdates.dev.mozaws.net/) and [Air Mozilla](https://air.mozilla.org/). For a long time, I was unable to log into any site using Persona from Firefox 43 and 44 because of an error about my browser not being configured to accept third-party cookies.

The [support article](https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences) on the topic says that checking the "always accept cookies" box should fix the problem. I tried setting "accept third-party cookies" to "Always", and yet the error persisted. (setting the top-level history configuration to "always remember history" didn't affect the error either).

Fortunately, there's also an "Exceptions" button by the "Accept cookies from sites" checkbox. Editing the exceptions list to universally allow "<http://persona.org>" lets me use Persona in Firefox normally.

![Firefox Persona exception dialog](/pictures/persona-exception.png)

*Note: The original screenshot is not available in this archive.*

That's the fix, but I don't know whose bug it is. Did Firefox mis-balance privacy against convenience? Is the "always accept third-party cookies" setting's failure to accept a cookie without an exception some strange edge case of a broken regex? Is Persona in the wrong for using a design that requires third-party cookies at all? Who knows!
