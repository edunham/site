Git: moving a module into a monorepo
====================================

My team has a repo where we keep all our terraform modules, but we had a separate module off in its own repo for reasons that are no longer relevant. 

Let's call the modules repo `git@github.com:our-org/our-modules.git`. The module moving into it, let's call it `git@github.com:our-org/postgres-module.git`, because it's a postgres module. 

First, clone both repos.::

    git clone git@github.com:our-org/our-modules.git
    git clone git@github.com:our-org/postgres-module.git

I can't just add `postgres-module` as a remote to `our-modules` and pull from it, because I need the files to end up in a subdirectory of `our-modules`. Instead, I have to make a commit to `postgres-module` that puts its files in exactly the place that I want them to land in `our-modules`. If I didn't, the `README.md` files from both repos would hit a merge conflict. 

So, here's how to make that one last commit::

    cd postgres-module
    mkdir postgres
    git mv *.tf postgres/
    git mv *.md postgres/
    git commit -m "postgres: prepare for move to modules repo"
    cd ..

Notice that I don't push that commit anywhere. It just sits on my filesystem, because I'll pull from that part of my filesystem instead of across the network to get the repo's changes into the modules repo::

    cd our-modules
    git remote add pg ../postgres-module/
    git pull pg master --allow-unrelated-histories
    git remote rm pg
    cd ..

At this point, I have all the files and their history from the postgres module in the `postgres` directory of the `our-modules` repo. I can then follow the usual process to PR these changes to the `our-modules` remote::

    cd our-modules
    git checkout -b import-pg-module
    git push origin import-pg-module
    firefox https://github.com/our-org/our-modules/pull/new/import-pg-module

We eventually ended up to skip importing the history on this module, but figuring out how to do it properly was still an educational exercise.

.. author:: E. Dunham
.. categories:: none
.. tags:: git
.. comments::
