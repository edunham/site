tree-style tab setup
====================

How to get rid of the top bar in firefox after installing tree style tab: 

In `about:config` (accept the risk), search `toolkit.legacyUserProfileCustomizations.stylesheets` and hit the funny looking button to toggle it to true. 

In `about:support`, above the fold in the "Application Basics" section, find `Profile Directory`. 

In that directory, `mkdir chrome`, then create `userChrome.css`, containing::

    #main-window[tabsintitlebar="true"]:not([extradragspace="true"]) #TabsToolbar
    {
      opacity: 0;
      pointer-events: none;
    }
    #main-window:not([tabsintitlebar="true"]) #TabsToolbar {
        visibility: collapse !important;
    }



.. author:: E. Dunham 
.. categories:: none
.. tags:: none
.. comments::
