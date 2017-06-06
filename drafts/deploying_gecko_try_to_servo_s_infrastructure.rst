Deploying Gecko Try to Servo's Infrastructure
=============================================

As part of Oxidation and Quantum and probably some other projects that sound
to someone who's never seen James Bond like they're code names for something Q
built, Servo and Gecko are becoming somethign a bit like
[this](https://vignette3.wikia.nocookie.net/steven-universe/images/1/15/Rutile.png/revision/latest/scale-to-width-down/393?cb=20170530234402).

Manish wrote [servo-gecko-try](https://github.com/Manishearth/servo-gecko-try)
to forward Servo pull requests to Gecko's try build infrastructure.

The first step was to consult `the issue
<https://github.com/servo/saltfs/issues/619>`_, look at `the code
<https://github.com/Manishearth/servo-gecko-try>`_, and `create a README
<https://github.com/Manishearth/servo-gecko-try/commit/9d4f4c988fb9a8b727533c70042aa549b154ff0d>`_
to sound smart and helpful while subtly requesting reassurance that I had the
right idea about what I was actually trying to do.

Getting the repo's docs up to snuff has also made me a confenient checklist of
the stuff I'll have to make our config management do to deploy it! My task has
suddenly gone from "figure out the things" to "translate this list into that
language".

Decide where to run the thing
-----------------------------

Architecturally, sticking this opportunity for arbitrary code execution
through a Git or Mercurial vulnerability onto the buildmaster is a bit of a
can of worms, so for the time being we're going to run our tiny experimental
little app on a separate EC2 instance and use network and firewall rules to
reduce the increase in attack surface that it provides for our infrastructure.

What will such a host need? Resources-wise, it should be able to subsist on a
couple gigs of RAM and swap for any extra, although `mercurial handles files
in-memory a lot <https://www.mercurial-scm.org/wiki/HandlingLargeFiles>`_.
Well, nothing awful will happen if a try push takes a minute or two,
so swapping's OK. How much disk will we actually need? My local copy of the
Servo git repo is 3.1G; my local copy of mozilla-central is 4.5G.
Version-control-tools is under 1GB. So 8GB of swap on 32GB of disk should be
comfortably overkill for the task at hand.

How about networking? Between the host and the Salt master, it'll need to
accept SSH connections and Salt (so ports 22, 4505, and 4506). It'll need 443
open to outbound traffic since we're using the HTTPS URLs for the Git and
Mercurial repos, and whatever we pick for the webhook (6000 in the sample
config) for getting GitHub's notifications of new PRs. Checking our current
security groups, this looks like it. We allow mosh connections (UDP ports
60000-61000) to an outward-facing machine on the network but there's no need
to mosh into the host we're currently creating.

Tell Salt about the new host
----------------------------

I'm `adding a new minion
<https://github.com/servo/saltfs/blob/master/docs/salt.md#linux>`_ as well as
a new state to run on it. I'll also be adding some new secrets to the pillar,
to keep the keypair safe.

The minion will be named ``servo-gecko-try``. Salt needs to know what to do
when it meets a host with that name, so I add it a regex in ``top.sls`` and
tell it to apply the ``git`` and ``servo-gecko-try`` states. I'll also apply
the ``common`` state to creat the user ``servo``.

To create the ``servo-gecko-try`` state for it to apply, I make a
``servo-gecko-try`` directory at the top level in the ``saltfs`` repo. In that
new directory, I need 3 things:

* a ``files`` directory, to show Salt how to correctly write the
 ``config.json`` for the try tool and the ``.hgrc`` for the user.
* a ``map.jinja``, because it's Salt convention to factor OS-specific paths
  out of the states themselves.
* an ``init.sls`` state to tell Salt what I want it to do with all the files
  and paths and things.

I'll fill in these files and directories as I go through the steps to manually
set up the app, since config management is at its heart still just outsourcing
myself to a script.

Make a user to run the app
--------------------------

I'll be running the app as the ``servo`` user, and that user was created when
I applied the ``common`` state to the host because that's what our ``common``
state does.


Clone Servo into the user's homedir
-----------------------------------

Traditionally one would stick this clone elsewhere on the filesystem, but in
our case there are 2 major advantages to sticking more closely to the
conventions of developers' local environments. First, the try push uses Git
and Mercurial frontends which are built to be used by humans rather than
robots. Sticking to the homedir decreases the likelihood that we'll
accidentally discover some edge case in one of our underlying tools and have
to track it down and fix it. Second, any manual debugging of the app that we
might encounter is quicker and easier when the files are all in the first
place that the troubleshooter looks.

So, to ask Salt to clone or update the repo, I'll use the `git.latest
<https://docs.saltstack.com/en/latest/ref/states/all/salt.states.git.html>`_
state. The path to where we're cloning it is platform-specific so I'll read it
out of map.jinja instead of hardcoding it::

    {% from tpldir ~ '/map.jinja' import servo-gecko-try %}

    https://github.com/servo/servo/:
      git.latest:
        - target: {{ servo-gecko-try.servo-clone }}
        - user: servo

This means that now I need to actually put that value in ``map.jinja``::

    {%
      set servo-gecko-try = {
        'servo-clone': '/home/servo/servo-clone',
      }
    %}

Now we've stated to Salt how to make the Git clone.

Clone the mercurial repos
-------------------------

Fortunately, Salt has `hg support
<https://docs.saltstack.com/en/latest/ref/states/all/salt.states.hg.html>`_,
so grabbing the latest revision of the mercurial repos is almost identical to
the Git ones::


    https://hg.mozilla.org/mozilla-central/:
      hg.latest:
        - target: {{ servo-gecko-try.m-c }}
        - user: servo

    https://hg.mozilla.org/integration/autoland/:
      hg.latest:
        - target: {{ servo-gecko-try.autoland }}
        - user: servo

    http://hg.mozilla.org/hgcustom/version-control-tools/:
      hg.latest:
        - target: {{ servo-gecko-try.vct }}
        - user: servo

This grows ``map.jinja``::

    {%
      set servo-gecko-try = {
        'servo-clone': '/home/servo/servo-clone',
        'm-c': '/home/servo/m-c-clone',
        'autoland': '/home/servo/autoland-clone',
        'vct': '/home/servo/.mozbuild/verson-control-tools',
      }
    %}


Configure the users's ``.hgrc``
-------------------------------

First, I stick the desired file contents into ``servo-gecko-try/files/hgrc``
in the saltfs repo. Then I just have to write a Salt state (in ``init.sls``)
that sticks the file onto the filesystem of the managed host::

    /home/servo/.hgrc:
      file.managed:
        - source: salt://{{ tpldir }}/files/hgrc
        - user: servo
        - group: servo
        - mode: 644

Give the user its keypair for pushing to try
--------------------------------------------

Salt's `ssh_auth state
<https://docs.saltstack.com/en/latest/ref/states/all/salt.states.ssh_auth.html>`_
only manages public keys, so we'll manage the private key just like any other
file full of secret data.


    Give the user a keypair that lets it push to try. We got ours at
https://bugzilla.mozilla.org/show_bug.cgi?id=1347259


Run the app
-----------



Point a webhook from servo/servo to notify the app of incoming PRs

    Run the app.



.. author:: default
.. categories:: none
.. tags:: none
.. comments::
