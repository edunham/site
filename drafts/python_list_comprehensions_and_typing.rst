Python list comprehensions and typing
=====================================

I recently saw an interesting attempt at list comprehensions, which did not
behave as expected. 

The question was initially asked as "Why is slicing a list returning a
generator object?", and after we peeled off the layer of linguistic
misdirection to get to the heart of the problem, I learned a piece of Python
syntax that I hadn't noticed before. 

.. more::

Slicing a list?
---------------

Slicing is where you use a colon in the index of a list to address a subset of
it::

    >>> a = 'abcde'
    >>> a[1:5:2]
    'bd'
    >>> a[5:1:-2]
    'ec'
    >>> a[:-1]
    'abcd'
    >>> a[-1:]
    'e'
    >>> a[::-2]
    'eca'

Slicing is fun. If you have ``list[a:b:c]``, you can slice from the element at
index ``a`` to the element at index ``b``, taking only every ``c`` th element.
You can also use indices to address that many elements from the end, reverse
the order, and similar tricks.  

One way to copy a list is to use a slice with no arguments, like ``[:]``.
Here's a simple demonstration::

    >>> o = [23, 42]
    >>> p = o
    >>> q = o[:]
    >>> o[0] = 5
    >>> p
    [5, 42]
    >>> q
    [23, 42]

See how list ``p`` acted as a pointer to the original list ``o``, whereas
``q`` got a copy and thus didn't change when ``o`` did?

List Comprehensions
-------------------

A list comprehension builds a new list by iterating over the old one and
modifying each element however you tell it to. They're basically of the form
``[a for b in c]``, where ``c`` is the original list or generator, ``b`` is
how you want to extract or unwrap and name each element of ``c``, and ``a`` is
an action that you want to take on each ``b`` and assign the result into the
new list::

    >>> v = ["element number " + str(x) for x in range(3)]
    >>> v
    ['element number 0', 'element number 1', 'element number 2']

They can range from that simple to more complex::

    #TODO FIXME FIZZBUZZ

You can also nest them::

    #TODO FIXME NESTED LIST COMPREHENSION


Generators
----------

#TODO explain generators

Getting Generators Accidentally
-------------------------------

::
    
    ys = (str(y) for y in range(3))

TODO: try modifying the ``c`` term between requests to the generator and see
if it changed or cached


.. author:: default
.. categories:: none
.. tags:: none
.. comments::
