Downloading an S3 bucket
========================

Since I'm curious about how often files are downloaded from S3, I enabled
logging on the buckets serving them and directed the logs into a bucket which
I created to hold them. Then I wanted to move everything on that logs bucket
to my local machine, so I could poke around in the logs and ascertain the best
way to turn them into useful information. 

.. more::

Install the CLI
---------------

`Stackoverflow <http://stackoverflow.com/questions/8659382/downloading-an-entire-s3-bucket>`_ 
pointed me toward the ``awscli`` Python module. Since I don't keep a system
pip, I installed it to a virtualenv::

    $ virtualenv2 v
    $ source v/bin/activate
    $ pip install awscli

Tell the CLI your credentials
-----------------------------

It just needs your Access Key ID and Secret Access Key. ::

    $ aws configure

Download the desired bucket
---------------------------

Decide where you want to save the bucket contents to, then sync it::

    $ aws s3 sync s3://bucket-of-logs ~/bucket-logs/

That's it!
----------

It's surprisingly easy to download the contents of an entire S3 bucket,
considering that the documentation on how to do it is spread out over several
different sources and buried in `comprehensive reference guides
<http://docs.aws.amazon.com/cli/latest/index.html>`_. 

.. author:: E. Dunham
.. categories:: none
.. tags:: aws, s3
.. comments::
