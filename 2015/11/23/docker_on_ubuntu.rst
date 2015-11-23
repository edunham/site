PSA: Docker on Ubuntu
=====================

::

    $ sudo apt-get install docker
    $ which docker
    $ docker
    The program 'docker' is currently not installed. You can install it by typing: 
    apt-get install docker
    $ apt-get install docker
    Reading package lists... Done
    Building dependency tree       
    Reading state information... Done
    docker is already the newest version.
    0 upgraded, 0 newly installed, 0 to remove and 13 not upgraded.

Oh, you wanted to run a docker container? The ``docker`` package in Ubuntu is
some window manager dock thingy. The ``docker`` binary that runs containers
comes from the ``docker.io`` system package.

::

    $ sudo apt-get install docker.io
    $ which docker
    /usr/bin/docker

Also, if it can't connect to its socket::

    FATA[0000] Post http:///var/run/docker.sock/v1.18/containers/create: dial
    unix /var/run/docker.sock: permission denied. Are you trying to connect to a
    TLS-enabled daemon without TLS? 

you need to make sure you're in the right group::

    sudo usermod -aG docker <username>; newgrp docker

(thanks, `stackoverflow`_!)

.. _stackoverflow: http://stackoverflow.com/questions/29294286/fata0000-get-http-var-run-docker-sock-v1-17-version-dial-unix-var-run-doc

.. author:: default
.. categories:: none
.. tags:: docker
.. comments::
