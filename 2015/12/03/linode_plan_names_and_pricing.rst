Linode vs AWS
=============

I'm examining a Linode account in order to figure out how to switch the
application its instances are running to AWS. The first challenge is that
instance types in the main dashboard are described by arbitrary numbers ("UI
Name" in the chart below), rather than a statistic about their resources or
pricing. Here's how those magic numbers line up to hourly rates and their
corresponding monthly price caps:

======= ========== ============ ======= ======  ======
RAM     Hourly $    Monthly $   UI Name Cores   GB SSD
======= ========== ============ ======= ======  ======
1GB     $0.015/hr   $10/mo      1024    1       24
2GB     $0.03/hr    $20/mo      2048    2       48
4GB     $0.06/hr    $40/mo      4096    4       96
8GB     $0.12/hr    $80/mo      8192    6       192
16GB    $0.24/hr    $160/mo     16384   8       384
32GB    $0.48/hr    $320/mo     32768   12      768
48GB    $0.72/hr    $480/mo     49152   16      1152
64GB    $0.96/hr    $640/mo     65536   20      1536
96GB    $1.44/hr    $960/mo     98304   20      1920
======= ========== ============ ======= ======  ======

AWS "Equivalents"
-----------------

AWS T2 instances have burstable performance. ``M*`` instances are
general-purpose; ``C*`` are compute-optimized; ``R*`` are memory-optimized.
``*3`` instances run on slightly older Ivy Bridge or Sandy Bridge processors,
while ``*4`` instances run on the newer Haswells. I'm disergarding the ``G2``
(GPU-optimized), ``D2`` (dense-storage), and  ``I2`` (IO-optmized) instance
types from this analysis.

Note that the `AWS specs`_ page has memory in GiB rather than GB. I've
converted everything into GB in the following table, since the Linode specs
are in GB and the AWS RAM amounts don't seem to follow any particular pattern
that would lose information in the conversion.

Hourly price is the Linux/UNIX rate for US West (Northern California) on
2015-12-03. Monthly price estimate is the hourly price multiplied by 730.

=============== ======= ========= ========= ===========
Instance        vCPU    GB RAM    $/hr      $/month
=============== ======= ========= ========= ===========
t2.micro        1       1.07      .017      12.41
t2.small        1       2.14      .034      24.82
t2.medium       2       4.29      .068      49.64
t2.large        2       8.58      .136      99.28
m4.large        2       8.58      .147      107.31
m4.xlarge       4       17.18     .294      214.62
m4.2xlarge      8       34.36     .588      429.24
m4.4xlarge      16      68.72     1.176     858.48
m4.10xlarge     40      171.8     2.94      2146.2
m3.medium       1       4.02      .077      56.21
m3.large        2       8.05      .154      112.42
m3.xlarge       4       16.11     .308      224.84
m3.2xlarge      8       32.21     .616      449.68
c4.large        2       4.02      .138      100.74
c4.xlarge       4       8.05      .276      201.48
c4.2xlarge      8       16.11     .552      402.96
c4.4xlarge      16      32.21     1.104     805.92
c4.8xlarge      36      64.42     2.208     1611.84
c3.large        2       4.02      .12       87.6
c3.xlarge       4       8.05      .239      174.47
c3.2xlarge      8       16.11     .478      348.94
c3.4xlarge      16      32.21     .956      697.88
c3.8xlarge      32      64.42     1.912     1395.76
r3.large        2       16.37     .195      142.35
r3.xlarge       4       32.75     .39       284.7
r3.2xlarge      8       65.50     .78       569.4
r3.4xlarge      16      131       1.56      1138.8
r3.8xlarge      32      262       3.12      2277.6
=============== ======= ========= ========= ===========

Comparison
----------

Linode and AWS do not compare cleanly at all. The smallest AWS instance to
match a given Linode type's RAM typically has fewer vCPUs and costs more in
the region where I compared them. Conversely, the smallest AWS instance to
match a Linode type's number of cores often has almost double the RAM of the
Linode, and costs substantially more.

Switching from Linode to AWS
----------------------------

When I examine the Servo build machines' utilization graphs via the Linode
dashboard, it becomes clear that even their load spikes aren't fully utilizing
the available CPUs. To view memory usage stats on Linode, it's necessary to
configure hosts to run the `longview
<https://www.linode.com/docs/platform/longview/longview>`_ client. After
installation, the client begins reporting data to Linode immediately.

After a few days, these metrics can be used to find the smallest AWS instance
whose specs exceed what your application is actually using on Linode.

Sources:

* `linode specs <https://www.linode.com/pricing>`_
* `linode pricing <https://www.linode.com/docs/platform/billing-and-payments>`_
* `AWS specs <https://aws.amazon.com/ec2/instance-types/>`_

.. author:: E. Dunham
.. categories:: none
.. tags:: linode, aws
.. comments::
