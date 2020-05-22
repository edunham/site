Offboarding
===========

Turns out that 5 years at a place gets you a bit of a pile of digital detritus. Future me might want notes on what-all steps I took to remove myself from everything, so here goes: 

* GitHub: Clicking the "pull requests" thing in that bar at the top gives a list of all open PRs created by me. I closed out everything work-related, by either finishing or wontfix-ing it. Additionally, I looked through the list of organizations in the sidebar of my account and kicked myself out of owner permissions that I no longer need. Since my GitHub workflow at Mozilla included a separate account for holding admin perms on some organizations, I revoked all of that account's permissions and then deleted it. 

* Google Drive: (because moving documents around through the Google Docs interface is either prohibitively difficult or just impossible) I moved all notes docs that anyone might ever want again into a shared team folder. 

* Bugzilla: The "my dashboard" link at the top, when logged in, lists all needinfos and open assigned bugs. I went through all of these and removed the needinfos from closed bugs, changed the needinfos to appropriate people on open bugs, and reassigned assigned bugs to the people who are taking over my old projects. When reassigning, I linked the appropriate notes documents in the bugs and filled in any contextual information that they didn't capture. I also checked that my Bugzilla admin had removed all settings to auto-assign me bugs in certain components. 

* Email deletion prep: I searched for my old work email address in my password manager to find all accounts that were using it. I deleted these accounts or switched them to a personal address, as necessary. It turned out that the only thing I needed to switch over was my Firefox account, which I initially set up to test a feature on a service I supported, but then found very useful. 

* Git repos: When purging pull requests and bugs, I pushed my latest work from actively developed branches, so that no work will be lost when I wipe my laptop

* Assorted other perms: Some developers had granted me access to a repo of secrets, so I contacted them to get that access revoked. 

* Sharing contact info: I didn't send an email to the all-company list, but I did email my contact info to my teammates and other colleagues with whom I'd like to keep in touch. 

* Take notes on points of contact. While I still have access to internal wikis, I note the email addresses of anyone I may need to contact if there are problems with my offboarding after my LDAP is decommissioned. 

* Wipe the laptop: That's next. All the repos of Secret Secrets are encrypted on its disk and I'll lose the ability to access an essential share of the decryption key when my LDAP account goes away, but it's still best practices to wipe hardware before returning it. So I'll power it off, boot it from a liveUSB, and then run a few different tools to wipe and overwrite the disk. 

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
