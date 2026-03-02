+++
path = "pages/subdomains"
template = "page.html"
title = "Other Pages"

[extra]
author = "E. Dunham"
+++
I have a wildcard CNAME set up so that `anything.edunham.net` gets directed to this server. This way, deploying a new toy is as simple as dropping it into a directory where Apache has permissions, creating a config file in `/etc/apache2/sites-available`, enabling the new site, and reloading Apache.

This is nice in that it keeps their URLs independent of my blog, so that changes won't accidentally break links to them. It's less nice because, unless I list them somewhere like here, people might never find them. So here's a list!

# [talks.edunham.net](http://talks.edunham.net/)

Exact, verbatim copies of the slides that I used in various presentations.

The slides are made with Hieroglyph, so enable JavaScript and hit `control+c` to view the presenter console with all the speaker notes. My slides tend to be mostly pictures, with all the important content in the notes.

Slides will be posted here after each talk, and I promise that the URLs to each set of slides will keep working for as long as I run this site.

# [edunham.github.io/pleaselicense](http://edunham.github.io/pleaselicense/)

![Screenshot of pleaselicense checking a GitHub username for LICENSE files](/pictures/licensecheck_edunham_net.png)

You put in a GitHub username, it tells you which of their public repos have a LICENSE or COPYING file and which ones do not.

[Source](https://github.com/edunham/pleaselicense) is on GitHub, and pull requests to make it less ugly are welcome.

# [edunham.github.io/rust-org-stats](http://edunham.github.io/rust-org-stats/)

Nightly Travis build aggregates the Git histories of every repo in the `rust-lang` organization and turns them into graphs with [gitstat](https://github.com/youknowone/gitstat).

# [nano.edunham.net](http://nano.edunham.net/)

![Screenshot of nano.edunham.net word count calculator](/pictures/nano_edunham_net.png)

A simple calculator that I wrote to help National Novel Writing Month participants do some very specific math about their word counts.

Source is [on GitHub](https://github.com/edunham/toys/tree/master/nano).
