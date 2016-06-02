Mailman and Multiple Addresses
==============================

"Your message to the list requires moderator approval", replies Mailman when
you try to post to your mailing list. 

"But I'm *on* the list!" you complain, then waste a few minutes of your day
finding the administrative password and releasing your message. 

.. more::

If you're like me, you probably have several email addresses all forwarding
into a single inbox. 

When a Mailman list is set to permit only members to post to it, your message
will only get through if it happens to be sent from the address with which
you're subscribed. Gmail, however, isn't quite smart enough to default to
sending to a list from the same address at which you usually recieve that
list's mail. 

There's an easy workaround if you're a list administrator, which is only
slightly less convenient if you don't have admin permissions. The fix is
to subscribe the address from which you prefer to send mail to the list, then
change its subscription settings so that it's never sent any mail (otherwise
you'd end up with multiple copies of each message!). 

If you're a list administrator, it takes 4 steps to add all of your alternate
addresses. If you're not using admin privileges, it takes 3 steps for each
alternate address you want to subscribe. 

List Administrator Technique
----------------------------

1) Navigate to the list's administrative interface and log in. If the list is
``listname@domain.tld``, the Mailman interface probably lives at
``lists.domain.tld/mailman/admin/listname``. 

2) Go to the "Mass Subscription" tab under "Membership Management" in the
Configuration Categories menu. Or just build the URL of the form
``lists.domain.tld/mailman/admin/listname/members/add``. 

3) Set the radio buttons to choose Subscribe, No welcome message, and No
notification of new subscription (to avoid spamming other list owners). Then
enter the other addresses that you'd like to send mail from, one per line, in
the box. Submit the changes. 

4) Now navigate to the "Membership List" link, or build the URL
``lists.domain.tld/mailman/admin/listname/members/list``. Find each of your
alternate addresses, and check the box in the "nomail [reason]" column on
their rows. Remember to leave one of your addresses' nomail box un-checked, or
you won't get any mail from the list at all! Use the Submit your Changes
button to save the configuration. 

Non-Admin Technique
-------------------

1) On the list's info page (``lists.domain.tld/mailman/listinfo/listname``),
subscribe your alternate address to the list. (There's also a link in the
footer of every email sent to the list.)

2) On the list info page, enter your alternate address in the "Unsubscribe or
Edit Options" box down at the bottom, then enter your list password when
prompted.

3) Scroll down to the "Mail delivery" setting, and switch the radio button to
Disabled. If you choose "Set globally", delivery to your alternate address
will be disabled for every subscription that you have in that Mailman
instance. 




.. author:: E. Dunham
.. categories:: none
.. tags:: mailman, email
.. comments::
