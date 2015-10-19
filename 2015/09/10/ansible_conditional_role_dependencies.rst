Ansible: Conditional role dependencies
======================================

I've recently been working on an Ansible role that applies to both Ubuntu and
OSX hosts. It has some dependencies which are only needed on OSX. There
doesn't seem to be a central document on all the options available for solving
this problem, so here are my notes. 

.. more::

Scenario
--------

The role which must apply to both Ubuntu and OSX hosts builds a Rust compiler
capable of cross-compiling to Android, so I call it ``crosscompiler``. To run
the ``crosscompiler`` role on a Mac, you need the ``xcode`` role installed,
but applying the ``xcode`` role to an Ubuntu host will fail.

A simplified version of this setup looks like::

    ansible-configs/
    ├── galaxy_roles.yaml
    ├── hosts
    ├── roles
    │   ├── crosscompiler
    │   │   ├── defaults
    │   │   │   └── main.yaml
    │   │   ├── meta
    │   │   │   └── main.yaml
    │   │   └── tasks
    │   │       └── main.yaml
    │   └── xcode
    │       ├── defaults
    │       │   └── main.yaml
    │       ├── meta
    │       │   └── main.yaml
    │       └── tasks
    │           └── main.yaml
    └── site.yaml

Here are a bunch of different ways to avoid applying a Mac-specific task to an
Ubuntu host, or vice versa. Note that **any** of the following steps in
isolation will solve the problem -- it should not be necessary to use more
than one of them.

Check OS on each task of the role
---------------------------------

Add the line ``when: ansible_os_family == 'Darwin'`` at the end of each task
in ``roles/xcode/tasks/main.yaml``. 

This needlessly bloats the code and makes it more difficult to read. 

Refactor depended role to ignore non-target platforms
-----------------------------------------------------

Move the entire contents of ``roles/xcode/main.yaml`` into
``roles/xcode/osx.yaml``, then create a new ``main.yaml`` containing::

    ---
    - include: osx.yaml
      when: ansible_os_family == 'Darwin'

This avoids the bloat induced by running the conditional on each task, while
accomplishing the same goal. Now the ``xcode`` role looks like::

    xcode
    ├── defaults
    │   └── main.yaml
    ├── meta
    │   └── main.yaml
    └── tasks
        ├── main.yaml
        └── osx.yaml

This is the best solution for a role which might later expand to support
additional platforms. 

Make the dependency conditional in ``meta/main.yaml`` of depending role
-----------------------------------------------------------------------

Edit ``ansible-configs/roles/crosscompiler/main.yaml`` so that the dependency
on ``xcode`` reads::

    ---
    dependencies:
      - { role: 'xcode', when: ansible_os_family == 'Darwin' }

This is the best solution when the inner role will only ever target one
platform, as is the case with ``xcode``. 

Install role conditionally from site.yaml
-----------------------------------------

Edit ``ansible-configs/site.yaml`` to read::

    - name: Provision cross-compile hosts
      hosts: xcompilehosts
      roles:
        - { role: xcode, when: ansible_os_family == 'Darwin' }
        - crosscompiler

This is problematic because if I was to distribute the ``crosscompiler`` role
on the Ansible Galaxy, its dependency logic would not be distributed to other
users correctly. 

TL;DR
-----

You can conditionally include dependencies in your roles. It's helpful to end
users when galaxy roles only try to apply platform-specific tasks to their
target platforms, since you can't be sure how others will use your code. 


.. author:: default
.. categories:: none
.. tags:: ansible 
.. comments::
