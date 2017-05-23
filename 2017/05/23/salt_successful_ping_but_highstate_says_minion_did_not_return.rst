Salt: Successful ping but highstate says "minion did not return"
================================================================

Today I was setting up some new OSX hosts on Macstadium for Servo's build
cluster. The hosts are managed with SaltStack.

After installing `all the things
<https://github.com/servo/servo/wiki/SaltStack-Administration#osx>`_, I ran
a test ping and it looked fine::

    user@saltmaster:~$ salt newbuilder test.ping
    newbuilder:
        True

However, running a highstate caused Salt to claim the minion was
non-responsive::


    user@saltmaster:~$ salt newbuilder state.highstate
    newbuilder:
        Minion did not return. [No response]


Googling this problem yielded a bunch of other "minion did not return" kind of
issues, but nothing about what to do when the minion sometimes returns fine
and other times does not.

The fix turned out to be simple: When a test ping succeeds but a
longer-running state fails, it's an issue with the master's timeout setting.
The timeout defaults to 5 seconds, so a sufficiently slow job will look to the
master like the minion was unreachable.

As explained in `the Salt docs
<https://docs.saltstack.com/en/latest/topics/troubleshooting/master.html#commands-time-out-or-do-not-return-output>`_, you can bump the timeout by adding the line
``timeout: 30`` (or whatever number of seconds you choose) to the file
``/etc/salt/master`` on the salt master host.

.. author:: E. Dunham
.. categories:: none
.. tags:: saltstack
.. comments::
