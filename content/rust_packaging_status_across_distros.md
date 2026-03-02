+++
path = "2015/07/07/rust_packaging_status_across_distros"
title = "Rust's Packaging Status Across Distros"
date = 2015-07-07

[taxonomies]
tags = ["rustinfra", "packaging"]

[extra]
author = "E. Dunham"
+++
One of many questions facing the Rust infrastructure team right now is "What's our packaging situation?". We don't have a centralized source of information on what version of Rust is available in which systems' package managers, and we don't even know where to find that information.

This post is the notes I've taken in researching Rust's packaging status across distributions.

I last updated this post on 8/17/2015.


# In Summary

| Distro      | Rust's Status                                                      | Cargo's Status              |
|-------------|--------------------------------------------------------------------|-----------------------------|
| Debian      | 1.0.0 in unstable                                                  | Requested                   |
| Ubuntu      | Community package                                                  | Community package, bad docs |
| Gentoo      | 1.1.0 in index                                                     | Community package           |
| OpenSUSE    | 1.0.0 in index                                                     | Recent version in index     |
| Arch        | multirust in index                                                 | 2 community packages; 1 bad |
| Fedora      | Community package                                                  | No separate package         |
| Slackware\* | Community package                                                  | No separate package         |
| Windows     | [in chocolatey](https://chocolatey.org/packages/rust/1.0.0-alpha2) | No separate package         |
| Mac         | [in Brew](http://braumeister.org/formula/rust)                     | No separate package         |
| FreeBSD     | Community port (?)                                                 | No separate package         |

There are an unreasonable number of tiny Linux distributions out there, but they fall into a handful of "families". For a visualization of the history of various distros, check out this [map](https://upload.wikimedia.org/wikipedia/commons/1/1b/Linux_Distribution_Timeline.svg). I've elided CentOS and RHEL as "flavors of Fedora", and a bunch of popular new Ubuntu flavors (ElementaryOS, Mint, etc.) as "compatible with Ubuntu packages, and probably smart enough to Google for Ubuntu docs if there aren't any specific to their OS".

# Debian

Debian, Ubuntu, Kubuntu, Mint, and Knoppix all use `.deb` packages installed through package managers that wrap the `dpkg` tool.

The [Debian Stable](https://packages.debian.org/stable/) package list has dedicated sections for some languages, but Rust is too young to be among them. Rust does not appear in the [Jessie stable package list](https://packages.debian.org/stable/allpackages), the [Debian testing package list](https://packages.debian.org/testing/allpackages) or the [Debian unstable package list](https://packages.debian.org/unstable/allpackages). Debian [bug \#786432](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=786432) is a request for Cargo to be packaged, which describes what Cargo will need to do to be packageable. [Bug \#689207](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=689207) tracks the status of packaging `rustc` for Debian.

There's a [rustc package in Debian Unstable](https://packages.debian.org/unstable/main/rustc).

The Debian Wiki has a [rust packaging page](https://wiki.debian.org/Teams/RustPackaging) to track the status of packaging Rust for Debian.

# Ubuntu

The official [Ubuntu](http://packages.ubuntu.com/) package repo has no mention of Rust or Cargo in the [trusty](http://packages.ubuntu.com/trusty/allpackages?format=txt.gz) or [vivid](http://packages.ubuntu.com/vivid/allpackages?format=txt.gz) package lists.

The [rust-ci.org help](http://www.rust-ci.org/help/) tells users to install Cargo from [Corey Richardson's PPA](https://launchpad.net/~cmrx64/+archive/ubuntu/cargo) (last updated July 2014, build currently failing) and Rust from [Hans Hoel's PPA](https://launchpad.net/~hansjorg/+archive/ubuntu/rust), in which `rust-stable`, `rust-nightly`, and `cargo-nightly` appear to be up to date.

Googling for how to install Rust on Ubuntu also turns up a [page on vultr.com](https://www.vultr.com/docs/installing-rust-on-ubuntu-14-04) directing users to intsall Rust using `rustup.sh`. [Another](http://www.randomhacks.net/2014/05/30/rust-on-ubuntu-10.04-lucid/) of the top hits also instructs users to use `rustup.sh`.

# Gentoo

There's a Rust 1.1.0 package in the [Gentoo package index](https://packages.gentoo.org/package/dev-lang/rust). On GitHub, [Heather](https://github.com/Heather/gentoo-rust) has packaged a Rust overlay for Gentoo and appears to be actively developing it, although the build is currently failing.

There's a [cargo portage overlay](http://gpo.zugaina.org/dev-rust/cargo) but cargo is not provided through the package index.

# OpenSUSE

Rust 1.0.0 is [packaged for OpenSUSE](http://software.opensuse.org/package/rust). [Duncan Mac-Vicar](http://duncan.mac-vicar.com/2014/01/16/trying-rust-language-on-opensuse/) has a blog post on trying Rust on OpenSUSE from 2014. My search for "How to install Rust on OpenSUSE" also turned up a [youtube video](https://www.youtube.com/watch?v=_z1M0uHY4So) on installing Rust from the nightly tarball. It seems to just be a walkthrough of what happens when you follow Rust's installation guidelines, but kudos to the OpenSUSE community for catering to diverse learning styles.

An [OpenSUSE Cargo package](http://software.opensuse.org/package/cargo) is also available in what appears to be the main index.

# Arch

[The Arch Wiki](https://wiki.archlinux.org/index.php/Rust) has a very useful page on Rust that includes instructions on cross-compiling. There's also a [community package](https://www.archlinux.org/packages/?name=rust) of rust 1.1.0. The Arch User Repository (AUR) provides Cargo through a choice of [cargo-bin](https://aur.archlinux.org/packages/cargo-bin/) or [cargo-git](https://aur.archlinux.org/packages/cargo-git/), though the latter hasn't been updated since February.

I later learned that you need to install the [multirust](https://aur.archlinux.org/packages/multirust/) package to get Rust and Cargo.

# Fedora

Fedora has this [copr](https://copr.fedoraproject.org/coprs/) build system thing in which one apparently finds community packages. At least, I found [rust-binary](https://copr.fedoraproject.org/coprs/fabiand/rust-binary/) (poorly documented and last built 6 months ago) and [rust-unofficial](https://copr.fedoraproject.org/coprs/fabiand/rust-unofficial/) (last built 18 months ago) in it. A blog post about [building Rust on Fedora](http://minhdo.org/posts/2013-07-27-building-rust-on-fedora.html), posted in 2013 but with good SEO for queries about "how to install Rust on Fedora", recommends building from source. There's no `rust` or `cargo` in the [CentOS 6 package list](http://mirror.centos.org/centos/6/os/x86_64/Packages/), either.

Fedora is tracking the official effort to package `rustc` in redhat bug \#915042.

[A stackoverflow question](http://stackoverflow.com/questions/25728336/can-you-build-rust-for-old-redhat-5-vintage-linux) from late last year asked about how to build Rust for Redhat 5. The [fedora-rust](https://github.com/dockingbay/fedora-rust) repo on GitHub provides a sporadically-updated Docker image with Rust installed.

# FreeBSD

The [FreeBSD Wiki](https://wiki.freebsd.org/Rust) tracks the status of the Rust port. The [port overview page](http://portsmon.freebsd.org/portoverview.py?category=lang&portname=rust) tracks which version is available, which is the latest Rust version available in July 2015. There's also a [Rust on FreeBSD](https://internals.rust-lang.org/t/rust-on-freebsd/2132) internals thread that tracks other relevant information and tools.

# Slackware\*

According to the [2014 r/linux survey](https://brashear.me/blog/2014/05/18/results-of-the-2014-slash-r-slash-linux-distribution-survey/), 53 of the 10,292 respondants used Slackware on a desktop or server. A variety of search queries for Rust and Slackware turn up Rust's generic Linux installation docs as the first hits, and one [github issue from a slackware user](https://github.com/rust-lang/rust/issues/17474). Extensive digging reveals a Rust 1.1.0 package in the [SlackBuilds repository](http://slackbuilds.org/repository/14.1/development/rust/).

\* The fact that I researched whether anyone had packaged Rust for Slackware is in no way intended to imply any plans for ever supporting such a package. I was just curious. Really.

# Thanks!

I appreciate readers Huon Wilson and Seo Sanghyeon taking the time to point out useful links for this post! Both mentioned the presence of the Debian Unstable package, and Seo informed me of [redhat bug \#915043](https://bugzilla.redhat.com/show_bug.cgi?id=915043) as well.
