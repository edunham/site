Starting Rust: Introduction
===========================

When discussing my experience (or lack thereof) with the Rust programming
language during a recent interview, I learned that experienced developers
might be interested in a stream-of-consciousness, "let's-play" type narration
of my learning curve through the language. 

There's an excrutiatingly detailed account of it below the fold. You've been
warned. 

.. more:: 

Setting
-------

It's 8:30pm by my internal clock, 9:30pm local time, and I'm chilling in a
hotel room in Provo, Utah and feel like doing something useful. So, it's time
to learn some Rust! 

I travel with a Thinkpad X201, a nice solid box with a small screen, good
keyboard, XKCD mouse, and habit of getting a bit toasty when asked to do any
heavy lifting. 

My Background
-------------

I first touched C about 8 years ago, then started Python and Java 5 years ago,
and taught a bit of C++ (though I still won't claim proficiency in it) 4 years
ago. I use Python for most things, and C when I have to. In the past 5 years
I've played with (but not built anything particularly notable in) a couple
Lisps, Haskell, Prolog, Forth, Go, Javascript, and the E derivative Monte. 

I skimmed a Rust tutorial the other day and got about as far as noticing that
the syntax for guards reminds me of the E paradigms that I've learned through
Monte, and overall it looks more or less like any other C-derived syntax. I'm
wondering whether it will have arrows in it (their use in Monte has been
explained a few times to me, but not in a way that's stuck yet), and if so,
whether they'll be explained well. 

Finding a Tutorial
------------------

I Google technical topics when logged into my primary account in the same
browser. This helps me find pages in my history across devices easily, and
gives it a contextual clue that when I say "patchwork" I'm more likely to be
solving a Django problem than a quilting one. Results look like this...

.. figure:: _static/search_for_rust.png
    :align: center

...And I mutter under my breath about someday getting around to writing that
lightning talk on naming things. No, I'm not interested in the video game. 

I guess I'll try the first hit first, though I'll bet it'll redirect me to the
second. If I get frustrated or stuck, the third will always be there, but
honestly I'd forget that it exists if I wasn't writing this down right now. 

So... https://doc.rust-lang.org/tutorial.html is a deprecation notice in favor
of the book. That's cute, I guess. Oh, and scripts are blocked... I guess I'll
globally allow rust-lang.org, though I rather wonder why it needs js on a mere
redirection page. There, I allowed it, and the fonts got prettier. Was that
really necessary? 

Ok, that link about the book takes me to https://doc.rust-lang.org/book/ .
That's... not the book that showed up in Google hits. Okay then? Skim the
usual first page. 

The Book, Introduction
----------------------

Huh, there are 7 sections, starting with the introduction, then a bunch of
links. I remember those! I clicked straight through to the "syntax and
semantics" thing last time I looked at it, because I was in a huge hurry.
Scroll down a little; it has contributing guide. 

When last I looked, I assumed the intro ended after the contributing section,
but now that I'm being a bit more thorough so I don't look silly in a blog I
scroll down further. Looks like there's an introduction thing, picking out the
key points of the language. 

Do I have to read that intro, or should I just grab one of those 7 links? Do I
have to read the links in order? May I jump around? I see now why Knuth
directed the readers of TAOCP with psuedocode and flowcharts. 

I guess this brief intro thing will answer the "why" questions I might run
into later. 

So, yeah, it starts with code:: 

    fn main() {
        let mut x = vec!["Hello", "world"];
    }

Huh, copying that code caused me to mouse over the code block, which pops up a
little arrow-ish icon in the upper right of the block... That arrow takes me
to a rather odd URL:: 

    http://play.rust-lang.org/?code=fn%20main%28%29%20{%0A%20%20%20%20let%20mut%20x%20%3D%20vec![%22Hello%22%2C%20%22world%22]%3B%0A}%0A

Whoa, it's some kind of in-browser Rust environment! That's bloody awesome,
except "Firefox can't find the server at play.rust-lang.org". Womp womp, sad
trombone. 

Wait, no, dropping "play.rust-lang.org" into the browser takes me to the
``https`` version of the site, which is totally up and happy. Really, no
redirect? I sincerely doubt any security implications of redirecting
everythign to the *one working site* would really be that serious compared to
the annoyance implications of having the book's examples broken. Maybe I
should just fix the book?

And... now when I re-click the arrow thingy, it does redirect. Is it the hotel
wifi's fault, or the server? Probably the wifi. Oh well. 

So yeah, that syntax... The ``!`` is cute; I suppose it might be an assignment
but I'm so used to seeing it as negation that I'm tempted to read "vec not
hello world"... 

Get distracted by macros
------------------------

Ok, so it makes a ``Vec<T>``. I think I saw that ``type<thing>`` notation
in... was it Go? I'm going to tentatively read it as "a vector of things of
type T", though that could be totally wrong. 

Oh, the bang was a macro. So... constructors == macros? Close enough. I tend
to think of macros as being like the ``#define`` in the C preprocessor, since
that's where I first met them -- macros in LaTeX (I guess I should've listed
that among languages I've touched, but it's really more markup?) also just
expand into a chunk of code. Hmm, maybe I should actually click on "macro"
where it's blue. 

Nope, I should not have clicked on that. It just takes me to
https://doc.rust-lang.org/book/macros.html , which is a huge long tangent...
skim the first page... ooh, "syntactic abstraction". So this all could still
be a fancy way of saying "expand this out into the other thing", just like the
other places I've seen it? Scroll, scroll... yeah, okay. That's not hugely
more syntax than LaTeX macros, maybe less, and yes there are arrows (or
perhaps "oh no"?), and I'd better get back to the bit that tells me what the
syntax means before continuing with the part about expanding syntax into other
syntax (yo dawg!). 

Return to introduction
----------------------

Pop that tangent off the stack, and I'm back to introduction. Why am I
tired... it's only 9pm laptop time, 10pm local time. Maybe it's all the
brain-ing and the typing. Oh well, I'll finish the intro for this post at
least. 

Ok, now we're learning about mutable and bindings. I know about mutable vs
immutable from some obnoxious mistakes early in my Python days; bindings are
just a thing... are bindings perfectly equivalent to assignment? I think not;
I think I may have gotten at least one lecture at some point on the
difference, but I'll just accept that they act sufficiently like assignment
for the time being (since ``bindings`` isn't a link to anything) and keep
going. 

And the bit about not needing type annotations is a whole paragraph bragging
about the fact that it doesn't force you to type stuff out when the stuff in
question is so stupid-simple that even a computer could do it reliably. Well
done. (mildly sarcastic applause, but thanks for telling me)

So, stack vs heap stuff. Scroll back up to the code, seek where the heck
they're getting the knowledge of where stuff's allocated from... Oh, I wasn't
actually expected to know that yet. For some reason the way the words were put
together made me feel like it was telling me about some bit of syntax which
indicated where things went, but no. 

Yes, I grok stacks vs heaps; I have 95% of a bachelor's of Computer Science.
No need to tangent down the rust-specifics rabbit hole just now. 

Okay, you're finally getting around to the business of ownership. Ok, stuff
about when x goes out of scope... do you realize you've never mentioned what
scopes are? Luckily I already know that I can usually assume that a scope is
represented by a set of ``{}``, and you've given me no reason to suspect
things would be different here. the wording of "x goes out of scope" is a bit
funny, like x "goes" anywhere once its scope is over... I thought things out
of their scopes just *weren't there*, just went poof. But okay. Yay, no gc, no
malloc, hypothetically all solvable by a sufficiently smart compiler. And the
determinism is a huge plus for testing anything. 

Okay, next line. Ownership system, borrowing... aaand borrowing is blue.
Great, another hugely long page of complex stuff I don't know yet... though I
guess I should click before judging. Yep, long page. Starting with 'meta'. And
I'm supposed to have read the ownership page first, and I'd bet that for that
I'm supposed to have finished the introduction... 

More Grumbling About Format
---------------------------

It's the best and worst part of static, linked-up tutorials, how they can
express the circular dependencies of knowledge inherent to breaking into any
new knowledge domain. It can be a cheat around teaching in what I regard as
the right way, which is to handle the circle by spiralling out from 0
knowledge: explain the minimum knowledge of the term inline at first, then go
into medium detail next time you come around to it, then greater detail later
on. That's how writing a talk (and presenting the info sequantially in real
time) forces you to do it, but those constraints are gone on the web. Oh well. 

And Back
--------

Back to the book. Ok, borrowed bindings don't de-allocate when they go out of
scope... but it's not the *binding* that de-allocates, it's the compiler. Such
pedantry... 

Baby's first Rust error. I see why you introduced borrowing up there, after
all. Sure, we pointed the intrinsically immutable y at x, so we kinda lose any
benefit from making x mutable or we'd break y's immutability promises... Ok,
it's a big wall on how you took away a foot-gun. That was nice of you. I think
I'm okay with this. 

And a bit more on what that "going out of scope" bit means, quite
specifically! That's neat. You even finally get around to mentioning what
scopes are, a little. 

The End (of the introduction)
-----------------------------

Today I learned that typing all this up takes an awful lot of typing. I think
I'll go retrieve one of the icecream bars that I stashed in the hotel fridge's
freezer, reward myself for a job thoroughly (albeit less than
grammatically) done, and hit section 2 (Getting Started) tomorrow. 


.. author:: default
.. categories:: none
.. tags:: rust, let's code 
.. comments::
