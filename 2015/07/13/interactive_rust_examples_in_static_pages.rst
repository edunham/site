Interactive Rust Examples in Static Pages
=========================================

`Rust by Example <http://rustbyexample.com/hello/print.html>`_ has a little
box where readers can interact with some example Rust code, run it using the
`playground <https://play.rust-lang.org/>`_, and see the results in the page.
As a sysadmin I'm loath to recommend that anybody trust the playground for
anything, but as a nerd and coder I recognize that it's super cool and people
want to use it. 

There are 2 ways to stuff a Playground into your website: The easy way, and
the "right" way. Here's how to do it the easy way, and where to look for
examples of the hard way.

.. more::

The Easy Way
------------

There are these cool things called `iframes`_ that basically let you put
websites in your websites... 

.. figure:: /_static/xzibit.jpg
    :align: center

All you have to do is stick this one line in your page's source, and modern
browsers will go load and inject the specified page -- in this case, the
playpen. The exact technique for injecting raw HTML will differ based on your
blogging platform. With Tinkerer, the source will look like this::

    .. raw:: html 

        <iframe src="https://play.rust-lang.org/" style="width:100%; height:400px;"></iframe>

That'll render with the default contents of the playpen. Note that it'll
someties try to be clever and load the code that the viewer most recently
opened in it when loaded with no arguments:

.. raw:: html 

    <iframe src="https://play.rust-lang.org/" style="width:100%; height:400px;"></iframe>

Custom Code in the Playpen
--------------------------

When you load the Playpen, you can specify the ID of a `gist`_ whose contents
should appear in the text area. Let's say we're doing a simple hello world::

    // This code is editable and runnable!
    fn main() {
        println!("Hello from edunham's blog!");
    }

I `uploaded it`_ and noted the unique hash on the URL,
``df9d98db4c29089e93b8``. That's the magic number that I'll stick on the end
of the playpen link to see the gist, like
https://play.rust-lang.org/?gist=df9d98db4c29089e93b8. Here's the raw HTML for
an iframe that loads the playpen with the contents of that gist::

    <iframe src="https://play.rust-lang.org/?gist=df9d98db4c29089e93b8" style="width:100%; height:400px;"></iframe>

It'll render like this:

.. raw:: html 

    <iframe src="https://play.rust-lang.org/?gist=df9d98db4c29089e93b8" style="width:100%; height:400px;"></iframe>

The Hard Way
------------

I also tried pulling out the requisite HTML, Javascript, and CSS from `the
main Rust site <https://github.com/rust-lang/rust-www>`_. If I come back later
and get it working, I'll update this post with instructions, but till then the
iframe technique is substantially easier. If you get it working the way the
main site did using a Sphinx-based blogging platform, please let me know!

Thanks
------

As usual in my web-related endeavors, I accidentally `nerd-sniped`_ `Mythmon`_
with this problem, and he spent quite a while helping me troubleshoot it and
teaching me about Firefox's developer tools. 

.. _iframes: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/iframe
.. _gist: https://gist.github.com/
.. _uploaded it: https://gist.github.com/edunham/df9d98db4c29089e93b8
.. _nerd-sniped: https://imgs.xkcd.com/comics/nerd_sniping.png
.. _Mythmon: http://www.mythmon.com/


.. author:: E. Dunham
.. categories:: none
.. tags:: rustinfra, tinkerer
.. comments::
