Juggling AWS accounts
=====================

This week's tasks have required me to be logged into 3 separate AWS accounts
at once. Here's how the workflow has looked: 

* Get credentials for each account. To login to the web UI, you need your
  full IAM ID (like ``ID: arn:aws:iam::<account ID number>:user/<username>``
  and password. The person setting up your account can provide you with the
  full ID and set a temporary password. 

* Create a new Firefox profile for each account, by launching the browser with
  ``firefox -P`` and creating or selecting a profile with a descriptive name. 

* In each browser, change something obvious about the theme. In my case one
  profile is default, one uses Arc and one uses Arc Dark. They were among the
  first hits when I searched 'light theme' and 'dark theme' in the addons menu.
  This provided a quick and easy reminder of which browser session was logged
  into each AWS account, preventing any embarrassing mistakes. 

* In each profile, construct the corresponding account's signin link of the
  form ``https://<account ID number>.signin.aws.amazon.com/console``. This
  will redirect to the appropriate login page, where you enter username and
  password.

* To get back to an account's login page, I just launch the corresponding
  profile, type 'console' into the URL bar, and take what it autocompletes
  from browsing history.

* The account ID number was also necessary for the convoluted process of
  `copying a private AMI between accounts 
  <http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html>`_

On the whole, the process of switching Servo's build system to use a dedicated
AWS account was surprisingly painless once I worked out the Firefox
themes+profiles arrangement. For previous tasks requiring me to login to
multiple accounts, I had tried to use private browsing, but it was frustrating
to occasionally lose the history of what I was working on. 

I can't help suspecting that I've somehow got the workflow wrong here and AWS
offers 

...https://aws.amazon.com/blogs/aws/new-cross-account-access-in-the-aws-management-console/


.. author:: default
.. categories:: none
.. tags:: aws, notes to self
.. comments::
