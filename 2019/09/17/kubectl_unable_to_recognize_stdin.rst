kubectl unable to recognize STDIN
=================================

Or, Stupid Error Of The Day. I'm talking to a GCP's Kubernetes engine through several layers of intermediate tooling, and kubectl is failing:: 

    subprocess.CalledProcessError: Command '['kubectl', 'apply', '--record', '-f', '-']' returned non-zero exit status 1.

Above that, in the wall of other debug info, is an error of the form::

    error: unable to recognize "STDIN": Get https://11.22.33.44/api?timeout=32s: dial tcp 11.22.33.44:443: i/o timeout

This error turned out to have such a retrospectively obvious fix that nobody else seems to have published it. 

When setting up the cluster on which kubectl was failing, I added the IP from which my tooling would access it, and hit the "done" button to save my changes. (That's under the Authorized Networks section in "kubernetes engine -> clusters -> edit cluster" if you're looking for it in the GCP console.) However, the "done" button is only one of the two required steps to save changes: One also must scroll all the way to the bottom of the page and press the "save" button there. 

So if you're here because you Googled that error, go recheck that you really do have access to the cluster on which you're trying to kubectl apply. Good luck!

.. author:: E. Dunham
.. categories:: none
.. tags:: none
.. comments::
