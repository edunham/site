Installing Rust without root
============================

I just got a good question from a friend on IRC: "Should I ask my university's
administration to install Rust on our shared servers?" The answer is "you
don't have to". 

The Easiest Way
---------------

If you just want one version of Rust, `this blog post`_ by Valérian Galliat
has a fix in 7 lines::

    cd ~/.rust
    wget https://static.rust-lang.org/dist/rust-nightly-x86_64-unknown-linux-gnu.tar.gz
    tar xf rust-nightly-x86_64-unknown-linux-gnu.tar.gz
    mv rust-nightly-x86_64-unknown-linux-gnu rust
    export LD_LIBRARY_PATH=~/opt/rust/rustc/lib:$LD_LIBRARY_PATH
    export PATH=~/.rust/rust/rustc/bin:$PATH
    export PATH=~/.rust/rust/cargo/bin:$PATH

If you want rust stable instead of rust nightly, use the URL
``https://static.rust-lang.org/dist/rust-stable-x86_64-unknown-linux-gnu.tar.gz``
in the ``wget`` step to download the latest stable release. 

If you're security-conscious, you might want to verify the integrity of the
tarball before inflating it and running its contents. We provide a GPG
signature of every tarball, and ``sha256`` sums of the tarballs and
signatures. 

You can construct the URL for shasum or GPG signature by adding the desired
extension to the tarball's URL, so for nightly::

    https://static.rust-lang.org/dist/rust-nightly-x86_64-unknown-linux-gnu.tar.gz
    https://static.rust-lang.org/dist/rust-nightly-x86_64-unknown-linux-gnu.tar.gz.sha256
    https://static.rust-lang.org/dist/rust-nightly-x86_64-unknown-linux-gnu.tar.gz.asc
    https://static.rust-lang.org/dist/rust-nightly-x86_64-unknown-linux-gnu.tar.gz.asc.sha256

To `verify the GPG signature`_, you'll also need a copy of the Rust project's
public key. This key is available through several channels: 

* `on the Rust website`_, available only over HTTPS. 
* `on keybase.io`, correlated to Rust's Twitter account and URL. Don't worry,
  we authenticated the key by signing a string from Keybase with it locally.
  We don't trust them to ever see our private key.
* `on GitHub`, in the website's repository. 

Remember, verifying the signature only guarantees that the tarball you
downloaded matches the one that was produced by the Rust project's build
infrastructure. As with any piece of software, there exist a variety of threat
models from which verifying the signatures cannot completely protect you. 

Multirust without root
----------------------

`Multirust`_ is a tool that makes it easy to use multiple Rust versions on the
same system. Although the absolute easiest way to use it is ``curl -sf
https://raw.githubusercontent.com/brson/multirust/master/blastoff.sh | sh``
(which will interactively request a sudo password partway through), it can be
installed without root as well::

    git clone --recursive https://github.com/brson/multirust && cd multirust
    ./build.sh # create install.sh
    mkdir ~/.rust
    export LD_LIBRARY_PATH=~/.rust/rustc/lib:$LD_LIBRARY_PATH 
    ./install.sh --prefix=~/.rust/

If you run into an error like::

    install: WARNING: failed to run ldconfig. this may happen when not installing
    as root. run with --verbose to see the error

or in verbose mode,::

    install: running ldconfig
    /sbin/ldconfig.real: Can't create temporary cache file /etc/ld.so.cache~:
    Permission denied
    install: WARNING: failed to run ldconfig. this may happen when not installing
    as root. run with --verbose to see the error




.. _multirust: 
.. _verify the GPG signature: https://www.gnupg.org/gph/en/manual/x135.html
.. _on the Rust website: https://www.rust-lang.org/rust-key.gpg.ascii
.. _this blog post: https://www.codejam.info/2015/03/portable-rust-installation.html
.. _on keybase.io: https://keybase.io/rust
.. _on GitHub: https://github.com/rust-lang/rust-www/blob/master/rust-key.gpg.ascii

.. author:: default
.. categories:: none
.. tags:: rust
.. comments::
