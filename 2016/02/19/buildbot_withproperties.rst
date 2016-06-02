Buildbot WithProperties
=======================

Today, I copied an existing command from a Buildbot configuration and then
modified it to print a date into a file.::

    ...
    if "cargo" in component:
        cargo_date_cmd = "echo `date +'%Y-%m-%d'` > " + final_dist_dir + "/cargo-build-date.txt"
        f.addStep(MasterShellCommand(name="Write date to cargo-build-date.txt",
                                 command=["sh", "-c", WithProperties(cargo_date_cmd)] ))
    ...

It broke::

    Failure: twisted.internet.defer.FirstError: FirstError[#8, [Failure instance: Traceback (failure with no frames): <class 'twisted.internet.defer.FirstError'>: FirstError[#2, [Failure instance: Traceback: <type 'exceptions.ValueError'>: unsupported format character 'Y' (0x59) at index 14

Why? `WithProperties <http://docs.buildbot.net/0.8.3/WithProperties.html>`_.

It turns out that WithProperties should only be used when you need to
interpolate strings into an argument, using either ``%s``, ``%d``, or
``%(propertyname)s`` syntax in the string.

The lesson here is Buildbot will happily accept ``WithProperties("echo 'this
command uses no interpolation'")`` in a ``command`` argument, and then blow up
at you if you ever change the command to have a ``%`` in it.

However, it appears that build steps run as ``MasterShellCommand``s without
``WithProperties`` do not display their ``name`` in the waterfall, but rather
say "running" or "ran".

.. author:: E. Dunham
.. categories:: none
.. tags:: buildbot
.. comments::
