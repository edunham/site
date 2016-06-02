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

A good solution will balance security with openness. There's some information
which is "secret" in that it allows access to a given instance of the
infrastructure, and will be unique per instance. It's important that others
could spin up their own copies of our infrastructure if they desired, but
equally important that only authorized people can access the instance
associated with our domain and signing key. This means that a good
configuration management solution will make it easy to separate "secret" data
from the rest.

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

Secrets and Security
--------------------

On the whole, any configuration management will result in a more secure system
than none. Most vulnerabilities come from running old, unpatched versions of
common utilities with known bugs, and config management makes it easy to keep
systems up to date. However, any program that you run on a server can itself
have bugs which introduce vulnerabilities. 


**Ansible**: To my inexpert sensibilities, the agentless model (you don't run
an Ansible daemon on each managed machine, unlike the other CM tools) seems
like it could limit the impact of an error in the tool itself. 

For keeping certain variables secret, you can `keep them in another file
<http://hakunin.com/six-ansible-practices#keep-your-secret-vars-separate>`_
and add it to your ``.gitignore``. There's also a `vault playbook
<http://docs.ansible.com/playbooks_vault.html>`_ to automate encrypting those
files which contain sensitive information. 

**CFEngine**: The best practices manual basically says `get thee to a security
policy
<https://auth.cfengine.com/archive/manuals/cf3-bestpractice#Security>`_, which
doesn't really help. Googling didn't help either, so I asked some colleagues,
who responded by asking whether "don't use CFEngine" was an option. If there
exists a best practice, it's so inconvenient to find that it's relatively
unhelpful. 

**Chef**: Chef supports `encrypted data bags
<https://docs.chef.io/chef/essentials_data_bags.html>`_, which can then only
be edited via knife or the management console. There are also a `variety of
other options <https://coderanger.net/chef-secrets/>`_. An interesting
solution is `citadel <https://github.com/poise/citadel>`_, which uses AWS as a
trusted third party to control which nodes get access to secrets, but in turn
requires the entire infrastructure to be AWS-based. Although relying solely on
AWS would be possible at this point in the Rust infrastructure's development,
I'm reluctant to needlessly commit us to sticking with it in the future. 

**Puppet**: The `hiera-gpg <https://github.com/crayfishx/hiera-gpg>`_ and
`hiera-eyaml
<https://puppetlabs.com/blog/encrypt-your-data-using-hiera-eyaml>`_ tools
result in sufficiently secure files that major open source projects like
`Apache's infrastructure
<https://github.com/apache/infrastructure-puppet/blob/deployment/data/common.eyaml>`_
are comfortable with publishing them. 

**Salt**: Salt uses `pillars
<http://docs.saltstack.com/en/latest/topics/pillar/index.html>`_ to expose
data to target minions. There's also a `gpg renderer
<http://docs.saltstack.com/en/latest/ref/renderers/all/salt.renderers.gpg.html>`_
for encrypting data to be stored in source control, much like all the other
modern encryption solutions I'm examining.  

The Paradigms
=============

Here's the elevator pitch for what each tool purports to do, and how they do
it. 

Ansible
-------

You write a YAML description of your inventory, or which hosts should be
available. Then you describe tasks to perform in each role, and write
Playbooks which map between hosts and roles. You can then run Ansible from any
machine (there's no dedicated master, nor daemon on the machines being
managed) and it uses SSH to remote into the nodes and execute the commands
which all those YAML files described. 

Because of its simplicity, Ansible claims fewer consistency guarantees than
other tools, and provides minimal debugging data about files that it changed. 

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

Chef
----

You write Ruby to write recipes describing everything necessary to configure a
system, then gather those recipes into cookbooks. A community tool, `foodcritic
<http://acrmp.github.io/foodcritic/>`_, is available to test cookbooks for
common errors and stylistic enforcement. Cookbooks also have run-lists, which
specify the order in which recipes are applied. 

Chef-client runs on every host being managed, and queries the chef-server to
determine which changes should be applied.  


Puppet
------

You describe the desired state of your machines in Puppet's DSL, nodes request
information from the puppetmaster, the master provides the information, then
the nodes run an agent which applies whatever changes are necessary to bring
the machine into the described state. The `puppet architecture
<https://docs.puppetlabs.com/puppet/4.1/reference/architecture.html>`_ is at
the highest level pretty similar to CFEngine's, with the massive advantage
that you don't have to go learn promise theory in order to understand it. 


Salt
----

Salt can be run masterless on each minion, but in production is run from a
master. You write ``.sls`` files describing the desired state of each minion,
which can optionally use data out of `pillars
<https://docs.saltstack.com/en/latest/topics/pillar/index.html>`_. I don't
recognize the language used to describe salt states as being a standard I've
worked with before, but it's simple and blatantly obvious.


My Opinions
===========

**Ansible**: The minimalism and simplicity of Ansible seem seductive, but the
same traits that make it easy to learn will make it less adapted to handling
the edge cases which inevitably emerge at scale. 

I really like the idea of Ansible and will consider switching to it once the
community tools surrounding it are more mature. Googling and asking other
users has failed to turn up any good way to report exactly what changes to a
file Ansible overwrote when it ran. Although I don't need such fine-grained
reporting right away, the fact that they're missing indicates that building
nice-to-have features into my configuration management and monitoring later on
would require spending a lot of time hacking on the tool itself. 

**CFEngine**: I worked extensively with CFEngine 2 at the OSU Open Source Lab,
and my resulting confidence that CFEngine 3 really can't be as hard as it
looks is the only reason I reread that quickstart a few more times until it
started making sense. Considering the other options available, I think it'd be
needlessly cruel to point a novice contributor to the infrastructure at these
docs and say "first, learn the tool". 

Although CFEngine is far better than no configuration management at all, it
can't compete with the other tools on this list for simplicity, documentation
quality, and ease of collaborating on configurations written in it.

**Chef**: I spent a lot of time modifying Chef configs for established systems
during my time at Urban Airship, and on the whole their infrastructure
automation workflow was great. Looking back at that success in more detail,
I'm pretty sure that it resulted from using *any* modern configuration
management in conjunction with appropriate levels of automation-inspiring
"laziness", rather than from any trait unique to Chef. 

It's a little tempting to take the tool that's good-enough and familiar, but
there were enough annoyances associated with it (starting with the need to go
learn Ruby) that I'm willing to set it aside in favor of simpler, more
contributable alternatives. 

**Puppet**: It is really hard for me to make an "unbiased" comparison of
Puppet to Salt, because the local Portland tech scene includes the
headquarters of Puppet Labs and I'm friends with the authors of the `puppet
book <http://www.amazon.com/Pro-Puppet-Spencer-Krum/dp/1430260408/r>`_. This
means that when I run into problems with Puppet and complain on IRC, I tend to
get immediate answers from expert users. However, other contributors to our
infrastructure wouldn't necessarily have this advantage. In my experience
Googling for answers to Puppet best practices questions, the results are
comparably "we want to sell you a solution" to the CFEngine and Chef docs. 

**Salt**: Servo is already `using salt <https://github.com/servo/saltfs>`_ to
manage its infrastructure, and I'd like to eventually end up with Rust and
Servo using the same configuration management solution. I'm more comfortable
reading Python than Ruby, and of the models that rely on a master server, Salt
is the newest, least commercial-feeling, and most straightforward to learn. 

Salt vs Ansible
===============

So now I have a problem: Two great tools, either of which would be
astronomically better than the current state. 

When I look farther ahead at automating the Rust infrastructure, I anticipate
that I'll be doing a lot of work with parallelizing buildbot runs (to speed
things up and also prepare for an eventual migration to `TaskCluster
<http://docs.taskcluster.net/>`_ once its features catch up to our needs).
There's a lot of overhead involved in setting up a host as a buildbot worker,
compiling and setting up depenencies for the test suite, so it would be nice
to pick a solution that makes it easy to build containers or AMIs. 

It looks like both `salt
<http://docs.saltstack.com/en/latest/ref/states/all/salt.states.dockerio.html>`_
and `ansible <https://blog.codeship.com/packer-ansible/>`_ play nicely with
Packer, which would be a good choice for constructing build workers with all
the dependencies already in place. 

Fortunately, there's a `blog post by missingm
<https://missingm.co/2013/06/ansible-and-salt-a-detailed-comparison/>`_, which
links repos that perform identical tasks using both Salt and Ansible. I agree
with the blog post's conclusion that the Ansible playbook is easier to read
than the Salt states, but the real challenge is to determine how hard each
type of configuration will be to write well. 


.. author:: E. Dunham
.. categories:: none
.. tags:: rustinfra, ansible, cfengine, chef, puppet, saltstack
.. comments::
