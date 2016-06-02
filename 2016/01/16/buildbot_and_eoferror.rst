Buildbot and EOFError
=====================

More SEO-bait, after tracking down an poorly documented problem::

    # buildbot start master
    Following twistd.log until startup finished..
    2016-01-17 04:35:49+0000 [-] Log opened.
    2016-01-17 04:35:49+0000 [-] twistd 14.0.2 (/usr/bin/python 2.7.6) starting up.
    2016-01-17 04:35:49+0000 [-] reactor class: twisted.internet.epollreactor.EPollReactor.
    2016-01-17 04:35:49+0000 [-] Starting BuildMaster -- buildbot.version: 0.8.12
    2016-01-17 04:35:49+0000 [-] Loading configuration from '/home/user/buildbot/master/master.cfg'
    2016-01-17 04:35:53+0000 [-] error while parsing config file:
        Traceback (most recent call last):
          File "/usr/local/lib/python2.7/dist-packages/twisted/internet/defer.py", line 577, in _runCallbacks
            current.result = callback(current.result, *args, **kw)
          File "/usr/local/lib/python2.7/dist-packages/twisted/internet/defer.py", line 1155, in gotResult
            _inlineCallbacks(r, g, deferred)
          File "/usr/local/lib/python2.7/dist-packages/twisted/internet/defer.py", line 1099, in _inlineCallbacks
            result = g.send(result)
          File "/usr/local/lib/python2.7/dist-packages/buildbot/master.py", line 189, in startService
            self.configFileName)
        --- <exception caught here> ---
          File "/usr/local/lib/python2.7/dist-packages/buildbot/config.py", line 156, in loadConfig
            exec f in localDict
          File "/home/user/buildbot/master/master.cfg", line 415, in <module>
            extra_post_params={'secret': HOMU_BUILDBOT_SECRET},
          File "/usr/local/lib/python2.7/dist-packages/buildbot/status/status_push.py", line 404, in __init__
            secondaryQueue=DiskQueue(path, maxItems=maxDiskItems))
          File "/usr/local/lib/python2.7/dist-packages/buildbot/status/persistent_queue.py", line 286, in __init__
            self.secondaryQueue.popChunk(self.primaryQueue.maxItems()))
          File "/usr/local/lib/python2.7/dist-packages/buildbot/status/persistent_queue.py", line 208, in popChunk
            ret.append(self.unpickleFn(ReadFile(path)))
        exceptions.EOFError:

    2016-01-17 04:35:53+0000 [-] Configuration Errors:
    2016-01-17 04:35:53+0000 [-]   error while parsing config file:  (traceback in logfile)
    2016-01-17 04:35:53+0000 [-] Halting master.
    2016-01-17 04:35:53+0000 [-] Main loop terminated.
    2016-01-17 04:35:53+0000 [-] Server Shut Down.

This happened after the buildmaster's disk filled up and a bunch of stuff was
manually deleted. There were no changes to master.cfg since it worked
perfectly.

The fix was to examine ``master.cfg`` to see `where the HttpStatusPush was
created
<https://github.com/servo/saltfs/blob/master/buildbot/master/master.cfg#L413>`_,
of the form::

    c['status'].append(HttpStatusPush(
        serverUrl='http://build.servo.org:54856/buildbot',
        extra_post_params={'secret': HOMU_BUILDBOT_SECRET},
    ))

Digging in the Buildbot source reveals that ``persistent_queue.py`` wants to
unpickle a cache file from ``/events_build.servo.org/-1`` if there was nothing
in ``/events_build.servo.org/``. To fix this the right way, create that file
and make sure Buildbot has ``+rwx`` on it.

Alternately, you can give up on writing your status push cache to disk
entirely by adding the line ``maxDiskItems=0`` to the creation of the
HttpStatusPush, giving you::

     c['status'].append(HttpStatusPush(
        serverUrl='http://build.servo.org:54856/buildbot',
        maxDiskItems=0,
        extra_post_params={'secret': HOMU_BUILDBOT_SECRET},
     ))

The real moral of the story is "remember to use `logrotate
<http://www.linuxcommand.org/man_pages/logrotate8.html>`_.

.. author:: E. Dunham
.. categories:: none
.. tags:: buildbot
.. comments::
