Floating-point Forth
====================

The first assignment_ for CS480 (Translators) requests that we use Forth as a
pocket calculator, rather than teaching the immensely powerful composition
strategies for which it's valued in the real world. 

Since our first exposure to the language is a deep dive into the syntax of
floating-point computation, no single tutorial on the web answers all the
strange assortment of introductory and advanced questions that my classmates
and I are running into. 

.. more::

Here's what I've learned so far:

* Remember PEMDAS_. The quickest way to construct an expression tree for a
  given mathematical equation is to work from right to left in PEMDAS, then
  progress downward: The root of the tree is the first subtraction sign in the
  equation if there is one, otherwise the first addition sign, etc. Everything
  to the left of the sign which ended up as the root of the tree goes on its
  left side; everything to the right goes on the right. Then you build each
  little subtree, following the same rule. 

* Deep within the introduction_ of the book Starting Forth, it explains what
  the comments mean. If you learn nothing else from the introduction, this
  little section will make lots of other docs make sense:

    To communicate stack effects in a visual way, Forth programmers
    conventionally use a special stack notation in their glossaries or tables
    of words. We're introducing the stack notation now so that you'll have it
    under your belt when you begin the next chapter.

    Here is the basic form::

       ( before -- after )

    The dash separates the things that should be on the stack (before you
    execute the word) from the things that will be left there afterwards.
    For example, here's the stack notation for the word .::

          .   ( n -- )

    (The letter "n" stands for "number.") This shows that . expects one
    number on the stack (before) and leaves no number on the stack
    (after).

    Here's the stack notation for the word +.::

             +   ( n1 n2 -- sum )

* The floating point stack is separate from the default, or integer, stack. It
  has different arithmetic operators_ than the integer stack -- typically same
  as the integer operator, but prefaced with an f. 

.. code:: 

            F@      ( adr --)       ( f: -- x)
            F!      ( adr --)       ( f: x --)
            F+                      ( f: x y -- x+y)
            F-                      ( f: x y -- x-y)
            F*                      ( f: x y -- x*y)
            F/                      ( f: x y -- x/y)
            FEXP                    ( f: x -- e^x)
            FLN                     ( f: x -- ln[x])
            FSQRT                   ( f: x -- x^0.5)

* ``s>f`` moves the top value of the integer stack onto the floating point
  stack. For this assignment, it won't make sense to ever move floating point
  values back to the integer stack.

* Declaring variables is pretty straightforward::

    variable a  (initialize an intger named a)
    23 a !      (assign the value 23 into a)
    a @         (put a's value onto the integer stack)
    .s          (hey look, the integer stack has 23 on it!)

  Remember that you have to preface everything with an ``f`` to make it apply
  to the floating-point stack::

    fvariable z     (initialize a floating-point variable named z)
    69e z f!        (z gets the value 69)
    z f@            (put value of z onto floating-point stack)
    f.s             (Show the floating-point stack.)

* When an operator has both an integer and a float as its arguments, when do
  you put the int onto the float stack? According to a former instructor who
  used to teach this course, the correct solution is to insert a new node for
  the ``s>f`` conversion between the parent and its integer child in the
  expression tree, before the post-order traversal. If you try to do the
  conversion after the traversal and it occurrs at the wrong time, you could 
  end up accidentally swapping the order of the operator's children. This is
  harmless for addition and multiplication, but would break everything if it
  occurred with subtraction or division.

* There are two ways to do recursion in gforth. If you say ``recursive`` after
  the name of the word you're creating, you are able to call the word by name
  in its definition. Alternately, you can say ``recurse`` instead of the name
  of the word whenever you need to call it from within itself. 

  Since both fibonacci and factorial are used in the homework, I'll use
  a function that sums from 0 to the argument as an example. In Python, it'd
  look like::
    
    def sum(i):
        if (i == 0):
            return 0
        return i + sum(i-1)

  Using forth's ``recursive`` command, it'll look like::

    : sum recursive
    dup 
        ( top copy of the argument will get destroyed by comparison )
    0=  
        ( take argument off the stack, replace it with true or false )
    if
        ( we'll only take this branch if the argument was == 0 )
        exit
    else
        ( we have i on the stack, need to return i + the sum )
        dup
            ( extra copy, keep an i for adding later )
        1-
            ( decrement, now stack has i-1 on top to be the arg to next call )
        sum
            ( recursively call with that i-1 we made )
        +
            ( yay postfix! )
    endif ;

  If we don't use ``recursive``, it looks almost identical except for the
  actual recursive call::

    : othersum 
    dup 
    0=  
    if
        exit
    else
        dup
        1-
        recurse 
            ( does exactly the same thing as the call to sum )
        +
    endif ;

  So testing them out will look something like this::

    3 sum 
    . 6  ok
    4 sum 
    . 10  ok

    3 othersum 
    . 6  ok
    4 othersum 
    . 10  ok

Was this helpful? Did I miss anything? For feedback, go find my email address
on my github_ profile and send me your thoughts! (I might set up comments or a
reasonably bot-resistant email address disclosure here someday, but for now,
I hope the simple IQ test of clicking an extra link is enough to weed out
spammers).

.. _assignment: http://classes.engr.oregonstate.edu/eecs/winter2015/cs480/assignments/MilestoneI.htm
.. _PEMDAS: http://www.mathsisfun.com/operation-order-pemdas.html
.. _operators: http://galileo.phys.virginia.edu/classes/551.jvn.fall01/primer.htm#fp
.. _introduction: http://www.forth.com/starting-forth/sf1/sf1.html
.. _github: https://github.com/edunham

.. author:: default
.. categories:: none
.. tags:: school, cs480, forth, programming
.. comments::
