Ansible: Roles from the Galaxy
==============================

I want to tinker with the ELK stack to see whether it will meet my needs for
visualizing time series data. I do not want to expend excess time learning the
intricacies of its setup and configuration. 

Fortunately, Ansible lets me stand on someone else's shoulders to figure out
many roles' setup and configuration, including the ELK stack. Ansible is
applicable to a huge swath of the spectrum between ad-hoc, one-off deployments
and completely repeatable, formulaic ones. The former rely directly on the
command-line interface; the latter use the ``ansible-playbook`` command and
draw their inputs from configuration files. 

The ad-hoc way
--------------

Create the ``/etc/ansible/roles`` directory and make sure your user account
has permissions on it. 

Fetch the ELK role into that default location with ``ansible-galaxy install
bakhti.elk``. 

.. author:: default
.. categories:: none
.. tags:: none
.. comments::
