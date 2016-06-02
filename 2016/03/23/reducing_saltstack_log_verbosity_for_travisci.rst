Reducing SaltStack log verbosity for TravisCI
=============================================

Servo has some `Salt <http://saltstack.com/>`_ configs, hosted on GitHub, for
which changes are smoke-tested on TravisCI before they're deployed. Travis
only shows the first 10k lines of log output, so I want to minimize the amount
of extraneous information that the states print.

My salt state looks like:::

    android-sdk:
      archive.extracted:
        - name: {{ common.homedir }}/android/sdk/{{ android.sdk.version }}
        - source: https://dl.google.com/android/android-sdk_{{
          android.sdk.version }}-linux.tgz
        - source_hash: sha512={{ android.sdk.sha512 }}
        - archive_format: tar
        - archive_user: user
        - if_missing: {{ common.homedir }}/android/sdk/{{ android.sdk.version
          }}/android-sdk-linux
        - require:
          - user: user

The output in TravisCI is:::

          ID: android-sdk
    Function: archive.extracted
        Name: /home/user/android/sdk/r24.4.1
      Result: True
     Comment: https://dl.google.com/android/android-sdk_r24.4.1-linux.tgz extracted in /home/user/android/sdk/r24.4.1/
     Started: 17:46:25.900436
    Duration: 19540.846 ms
     Changes:
              ----------
              directories_created:
                  - /home/user/android/sdk/r24.4.1/
                  - /home/user/android/sdk/r24.4.1/android-sdk-linux

              extracted_files:
                  ... 2755 lines listing one file per line that I don't want to see in the log


https://docs.saltstack.com/en/latest/ref/states/all/salt.states.archive.html
has useful guidance on how to increase the ``tar`` state's verbosity, but not
to decrease it. This is because the extra 2755 lines aren't coming from
``tar`` itself, but from Salt assuming that we want to know.

``terse`` outputter settings
----------------------------

The `outputter
<https://docs.saltstack.com/en/latest/ref/output/all/salt.output.highstate.html>`_
takes several ``state_output`` setting options. The ``terse`` option
summarizes the result of each state into a single line.

There are a couple places you can set this:

* Invoke Salt with ``salt --state-output=terse hostname state.highstate``
* Add the line ``state_output: terse`` to ``/etc/salt/minion``, if you're
  using ``salt-call``
* Setting ``state_output_terse`` is `apparently
  <http://fossies.org/linux/salt/salt/output/highstate.py>`_ an option, though
  I can't find any example of a real-world salt config that uses it

Setting the ``terse`` option in ``/etc/salt/minion`` dropped the output of a
highstate from over 10,000 lines to about 2500.

.. author:: E. Dunham
.. categories:: none
.. tags:: saltstack, travisci
.. comments::
