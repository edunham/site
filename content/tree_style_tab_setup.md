+++
path = "2022/02/11/tree_style_tab_setup"
title = "tree-style tab setup"
date = 2022-02-11

[extra]
author = "E. Dunham"
+++
How to get rid of the top bar in firefox after installing tree style tab:

In <span class="title-ref">about:config</span> (accept the risk), search <span class="title-ref">toolkit.legacyUserProfileCustomizations.stylesheets</span> and hit the funny looking button to toggle it to true.

In <span class="title-ref">about:support</span>, above the fold in the "Application Basics" section, find <span class="title-ref">Profile Directory</span>.

In that directory, <span class="title-ref">mkdir chrome</span>, then create <span class="title-ref">userChrome.css</span>, containing:

    #main-window[tabsintitlebar="true"]:not([extradragspace="true"]) #TabsToolbar
    {
      opacity: 0;
      pointer-events: none;
    }
    #main-window:not([tabsintitlebar="true"]) #TabsToolbar {
        visibility: collapse !important;
    }
