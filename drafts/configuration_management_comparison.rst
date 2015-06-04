Configuration Management Comparison
===================================

Let's just say that it's pretty clear why my team at Mozilla decided to hire
an operations specialist when they did. For the infrastructure which supports
the Rust programming language, I get the relatively rare (compared to just
hacking on an existing deployment) privilege of deploying configuration
management from the ground up. 

.. more:: 

As usual, this means I'm overthinking everything. It seems important to choose
the right tool, when in reality it's really only critical to choose a tool
that fulfills all the requirements and has a few compelling reasons to be
selected over the others. 

The System
----------

The infrastructure has a relatively small number of hosts, and the part which
will do the most scaling is deployment of build workers. 

Currently, the infrastructure consists of several EC2 instances: 

* Bastion for SSH access from outside the system
* Nginx proxy which routes traffic to the correct hosts
* Play, the server which hosts sandboxes
* Buildbot leader
* Buildbot workers

Additional infrastructure includes a stack of Mac Minis under a desk, which
perform OSX builds. 

The Requirements
----------------

I'm looking for a configuration management solution which supports a variety
of platforms: 

* OSX (preferably multiple versions)
* Windows
* FreeBSD
* Linux

For the relevant operating systems, the right configuraiton management
solution will Just Work on both AWS and a cross-platform virtual machine
and/or container solution. Containers would be lighter weight for contributors
running Linux to test infrastructure changes on, but I think it's important to
make sure that people running OSX or Windows are able to play with a toy copy
of the infrastructure as well.  

The right configuration management solution will be available under an open
source license, and I'll also be assessing the product's maturity,
implementation language, and project culture. 

As well as making sure that each solution checks the above boxes, the
solution's docs should make it easy to find out: 

* How are commands distributed to hosts (master or masterless?)
* How will a repository of configurations be structured?
* How do I install a package from the package manager, create a file, and
  start a service?
* How do I install a package from source?
* How do I get a report of which files were changed when the tool last ran?

The Contenders
--------------

I'll be looking at 5 of the most popular open source configuration management
solutions currently available: Ansible, CFengine, Chef, Puppet, and Salt. 

Is It Open Source?
------------------

`Ansible's license <https://github.com/ansible/ansible/blob/devel/COPYING>`_ is
GPLv3. 

`CFEngine's license <https://github.com/cfengine/core/blob/master/LICENSE>`_
can be GPLv3 or Commercial Open Source License (COSL) depending on the user's
preference. 

`Chef's license <https://github.com/chef/chef/blob/master/LICENSE>`_ is Apache
v2. 

`Puppet's license <https://github.com/puppetlabs/puppet/blob/master/LICENSE>`_
is Apache v2. 

`Salt's license <https://github.com/saltstack/salt/blob/develop/LICENSE>`_ is
Apache v2.

Age, Language, and Community
----------------------------

+----------+----------+----------+----------+----------+----------+
|          | Ansible  | CFEngine | Chef     | Puppet   | Salt     |
+==========+==========+==========+==========+==========+==========+
| Age      | 3yrs     | 22yrs    | 6yrs     | 10yrs    | 4yrs     |
+----------+----------+----------+----------+----------+----------+
| Language | Python   | C        | Ruby     | Ruby     | Python   |
+----------+----------+----------+----------+----------+----------+
| People   | 1,060    | 71       | 385      | 376      | 1,123    |
+----------+----------+----------+----------+----------+----------+
| Issues   | 535/4371 | (Redmine)| 337/589  | (Jira)   | 2645/6384|
+----------+----------+----------+----------+----------+----------+
| % Open   | 10.9%    | 40.3%    | 36.4%    | 9.4%     | 29.3%    |
+----------+----------+----------+----------+----------+----------+
| Commits  | 14,366   | 12,387   | 12,721   | 20,210   | 54,144   |
+----------+----------+----------+----------+----------+----------+
| % by 1   | 18.6%    | 20.6%    | 15.4%    | 17.7%    | 13.3%    |
+----------+----------+----------+----------+----------+----------+
| % by 6   | 34.2%    | 53%      | 39.2%    | 37.4%    | 34.2%    |
+----------+----------+----------+----------+----------+----------+

The "age" is how long from when it was founded to 2015, based on the "first
release" dates found on `wikipedia <http://en.wikipedia.org/wiki/Comparison_of_open-source_configuration_management_software>`_. 

The "language" is what that Wikipedia page reports it being implemented in,
confirmed by examining the GitHub language stats.

The "people" stat is the number of unique contributors that GitHub identifies
as having contributed to the main tree (the same repos as the licenses were
linked from above). 

The "issues" stat is the number of open vs the number of closed issues in
their GitHub issue tracker, if that's what they're using. Otherwise, I noted
what issue tracking tool they're using instead. 

Percent open is the number of open issues divided by the total number of
issues (open and closed). As far as I could tell, `the CFEngine Redmine
<https://dev.cfengine.com/projects/core/>`_ appears to have 754 open issues of
1871 issues total, and `the Puppet Jira
<https://tickets.puppetlabs.com/browse/PUP/>`_ appears to have 1,260 issues
open out of 13475 total. 

Of the total commits reported by GitHub, I used the contributor graphs to
calculate what percentage of the commits were by the top 1 most prolific
contributor, and by the top 6. I had no mathematically compelling reason to
choose 6 as the threshhold, but it tends to encompass people who've joined
later in the project's lifecycle and become prolific contributors as well as
those who were there from the very beginning. 

.. note:: 

    There's an obvious spectrum of workflows contrasting CFEngine, Chef/Puppet,
    and Salt/Ansible. The newer tools are clearly using a more open
    development process and successfully getting contributions from more
    people. I'm not sure exactly what the numbers on open tickets say about a
    project's workflow, but they're interesting to look at.

    It was interesting to examine the GitHub contribution graphs for these
    projects, because they offer a visual representation of the ebb and flow
    of contributions that people have put into a given project. The `puppet
    graph <https://github.com/puppetlabs/puppet/graphs/contributors>`_ tells a
    story of lak starting the project then leaving and hlindberg taking over.
    The `ansible graph
    <https://github.com/ansible/ansible/graphs/contributors>`_ shows a similar
    situation, in which mpdehaan left around October, as jimi-c transitioned
    in to take their place. The `salt graph
    <https://github.com/saltstack/salt/graphs/contributors>`_ is quite
    different, in that thatch45 has been slowly and steadily contributing from
    the very beginning of the project but hasn't moved on in the way that the
    original authors of other tools did.  

Cross-Platform?
---------------

All the tools I'm looking at support Linux for both the server (if their model
has a server) and the client machines. The real question is whether they'll
support Mac, Windows, and BSD clients gracefully and in a well-documented
manner.

**Ansible:** Works on OSX if Xcode and Python are installed, and can support
Windows using Powershell instead of SSH. Works on FreeBSD. First hits were
blogs, though official docs are easy to find. Provides a module for EC2
support. 

**CFEngine:** Can be installed on Mac with a Homebrew recipe. Community edition
(the free kind) can be installed with Cygwin after a bit of fiddling around
with dependencies; commercial version supports Windows out of the box. Works
on FreeBSD. First hits were blogs and sales pitches for enterprise edition.
Has a demo for EC2, so I guess that means it works? 

**Chef:** They provide `an installer <https://www.chef.io/chef/install/>`_ which
allegedly Just Works. The installer and some docs were the first hits when I
searched. Provides ``knife ec2`` plugin. 

**Puppet:** Has official support on Mac and Windows, and looks like good
community support on FreeBSD. Official docs were the first hits for Mac and
Windows, and Puppet-specific community forum was first hit for FreeBSD. First
hit for EC2 support looks like a sales pitch, though their `auto-generated
AMIs <https://puppetlabs.com/blog/rapid-scaling-with-auto-generated-amis-using-puppet>`_
thing looks neat.

**Salt:** Has official support for Windows, Mac, and FreeBSD. Mac support has
options of Homebrew, MacPorts, and pip. For Windows installation, they provide
an exe. Same section of the docs was first hit to all 3 searches. "Salt Cloud"
offers an ``ec2`` provider. 

The Paradigms
=============

Here's the elevator pitch for what each tool purports to do, and how they do
it. Since the goals for each tool were shaped by its authors' experiences with
prior technologies, I'll address them in chronological rather than
alphabetical order in this section. 

CFEngine
--------

When CFEngine was first created, configuration management as we know it today
did not exist. As the `history page
<https://auth.cfengine.com/the-history-of-cfengine>`_ explains, by 2003 the
code base had morphed into something that nobody fully understood, so it was
rewritten into CFEngine 3. In a nutshell, CFEngine allows you to write
promises that describe the desired state of a machine. You can read more at
`the CFEngine 3 quickstart
<https://auth.cfengine.com/archive/manuals/cf3-quickstart>`_, but be warned
that the abstract yet condescending tone of the piece makes reading it feel
like trying to learn Haskell. 

I worked extensively with CFEngine 2 at the OSU Open Source Lab, and my
resulting confidence that CFEngine 3 really can't be as hard as it looks is
the only reason I reread that quickstart a few more times until it started
making sense. Considering the other options available, I think it'd be
needlessly cruel to point a novice contributor to the infrastructure at these
docs and say "first, learn the tool". 

Puppet
------







.. author:: default
.. categories:: none
.. tags:: rustinfra
.. comments::
