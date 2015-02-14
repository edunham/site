#! /bin/bash

if python -c 'import sys; print hasattr(sys, "real_prefix")' | grep -q "False"
then                                # the above checks if we're in the venv
    source v/bin/activate
fi
if [ ! -f $1 ]                      # make sure we have a file specified
then
    echo "Please specify the file to post."
    exit -1
fi    
tinker --post $1                    # tinker gets called on drafts/thing.rst
git stash                           # let's not accidentally commit other work
git rm $1                           # try to remove draft
git add `date +"%Y/%m/%d/"`${1##*/} # witchcraft to find its posted path
git commit -m "Publish ${1##*/}"    # and commit, with message
git stash apply                     # put back any other work
