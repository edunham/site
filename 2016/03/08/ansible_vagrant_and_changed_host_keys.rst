Ansible, Vagrant, and changed host keys
=======================================

Related to `this bug <https://github.com/ansible/ansible/issues/9442>`_,
the `Vagrant Ansible provisioner
<https://www.vagrantup.com/docs/provisioning/ansible.html>`_ seems to ignore
some system settings.

The symptom is that when you update a previously used Vagrant box, or
otherwise change its host key, Ansible provisioning fails with the error::

    fatal: [hostname] => SSH Error: Host key verification failed.
        while connecting to 127.0.0.1:2200
    It is sometimes useful to re-run the command using -vvvv, which prints SSH
    debug output to help diagnose the issue.

The standard solution would be to forget about the old host key with
``ssh-keygen -R 127.0.0.1:2200`` or ignore the change with
``export ANSIBLE_HOST_KEY_CHECKING=false``.

If you trust the box not to be evil and expect its host key to change
frequently due to your testing, a fix which the Ansible provisioner does
respect is to add ``ansible.host_key_checking = false`` to the Vagrantfile,
like::

    Vagrant.configure(2) do |config|
    ...
        config.vm.define "hostname" do |prodmaster|
            hostname.vm.provision "ansible" do |ansible|
                ansible.playbook = "provision/hostname.yaml"
                ansible.sudo = true
                ansible.host_key_checking = false
                ansible.verbose = 'vvvv'
                ansible.extra_vars = { ansible_ssh_user: 'vagrant'}
            end
        end
    ...
    end


.. author:: E. Dunham
.. categories:: none
.. tags:: ansible, vagrant, git
.. comments::
