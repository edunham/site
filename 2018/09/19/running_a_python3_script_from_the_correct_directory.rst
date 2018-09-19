Running a Python3 script in the right place every time
======================================================

I just wrote a thing in a private repo that I suspect I'll want to use again
later, so I'll drop it here.

The situation is that there's a repo, and I'm writing a script which shall
live in the repo and assist users with copying a project skeleton into its own
directory.

The script, ``newproject``, lives in the ``bin`` directory within the repo.

The script needs to do things from the root of the repository for the paths of
its file copying and renaming operations to be correct.

If it was invoked from somewhere other than the root of the repo, it must thus
change directory to the root of the repo before doing any other operations.

The snippet that I've tested to meet these constraints is::

    # chdir to the root of the repo if needed
    if __file__.endswith("/bin/newproject"):
        os.chdir(__file__.strip("/bin/newproject"))
    if __file__ == "newproject":
        os.chdir("..")

This will keep working right up until some malicious or misled individual
moves the script to an entirely different location within the repository or
filesystem and tries to run it from there.



.. author:: E. Dunham
.. categories:: none
.. tags:: python
.. comments::
