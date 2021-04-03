Assembly Lines
==============

This time last year, my living room was occupied by a cotton mask production facility of my own devising. I had reverse engineered a leftover surgical mask to get the approximate dimensions, consulted pictures of actual surgeons' masks, and contrived a mask design which was easy-enough to sew in bulk, durable-enough to wash with one's linens, and wearable-enough to fit most faces. 

Tinkering with and improving the production line was delightful enough to make me wonder if I'd missed a deeper calling when I chose not to pursue industrial engineering as a career, but the actual work -- the parts where I used myself as jsut another machine to make more masks happen -- was profoundly miserable. At the time, it made more sense to attribute that misery to current events: The world as we knew it is ending, of course I'm grumpy. I took it for granted that the sewing project of making masks was equivalent to the design/prototype/build cycle of my more creative sewing endeavors, and assumed that it was supposed to be equally enjoyable. 

A year later, however, I'm running a similar personal assembly line on an electrical project, and noticing some patterns. I have to do 4 steps each on 96 little widgets to complete this phase of the project. My engineering intuition says that the optimal process would be to do all of step 1, then all of step 2, then all of step 3, then all of step 4. That seems like it should be the fastest, and make me happy becuase it's the best -- no wasted effort taking out then putting away the set of tools for each step several times. 

The large-batch process would also yield consistency across all of its outputs, so that no one widget comes out much worse than any other. Consistency is aesthetic and satisfying in the end result, so the process which yields consistency should feel preferable... but instead, it feels deeply distasteful to stick with any one production phase for too long. What's going on there? What assumption is one side of the internal argument using that the other side lacks?

It took me 2 steps over about 24 of the widgets to figure out what felt so wrong about that assembly-line reasoning: The claims of "best" and "fastest" only hold if the process being done remains exactly the same on widget 96 as it was on widget 1. That's true if a machine is doing it, but false if the worker is able and allowed to think about the process they're working on. Larger batch sizes are optimal if the assembly process is unchanging, but detrimental if the process needs to be modified for efficiency or ease of use along the way. For instance, I'd initially planned a design that needed about 36' of wire, but by examining and contemplating the project when it was ready to be wired up, I found a way to accomplish the same goals with only about 23' of wire. If I'd been "perfectly efficient" in treating the initial design as perfect, I would likely have cut the wire into the lengths that were needed for the 36' plan before the 23' design occurred to me, and that premature optimization would have destroyed the materials I'd need to assemble the more efficient design once I figured it out. 

In other words, a self-modifying assembly line necessarily shrinks the batch size that it's worth producing. I've seen the same thing in software -- when automating a process, it's best to do it by hand a couple times, and then test a script on a small batch of input and fix any errors, and then apply it to larger and larger batches as it gets closer and closer to the best I can get it. It's just easier to notice the phenomenon in a process that uses the hands while leaving the brain mostly free than in processes of more intellectual labor. 

And there was the answer as to why attempting to do all 96 of step 1, then all 96 of step 2, felt terrible: Because using the maximum batch size implied that the process was as good as I'd be able to get it, and that any improvements I might think of while working would be wasted if they weren't backwards-compatible with the steps of the old process that were already completed. Smaller batch sizes, then, have an element of hope to them: There will be a "next time" of the whole process, so thinking about "how I'd do it next time" has a chance to pay off. 







.. author:: E. Dunham
.. categories:: none
.. tags:: none
.. comments::
