Assorted Git & Unix Tips
========================

In my present role, I get to work with colleagues of delightfully diverse skill sets. Sometimes I'm learning directly from experts, and other times I get to learn by teaching in areas where I happen to have the local maximum of experience. One delightful colleague has a coding bootcamp background which rapidly exposed them to a lot of important topics, and I find myself helping to fill in the gaps where a couple hours of instruction don't quite get the point across like years of practice. 


I'm writing this to capture, in no particular order, some advice that I'm noticing myself giving consistently. I can only guess at how I accumulated it, and I cannot promise that there won't be exceptions to any of these "rules". But I suspect someday in the future I'll be interested in looking back on notes like this, so onto the blog they go! 

.. more:: 

Git Concepts
------------

* Know where you are. Care constantly about what branch you are presently on, because many commands make changes relative to your current location. 

* Speak with pedantic precision about precisely what you're referring to. When referring to somewhere you might push to or pull from, a description has 3 parts: the location or owner (a github org, a github user, or your local checkout), the repository name, and the branch name. If I say "there's cake in the kitchen", you'll have to guess which kitchen I mean: mine? yours? the office? Similarly, if you say "on the main branch", I'll have to guess from context which main branch: your laptop? your fork of the repo on github? the upstream repository you forked from? 

* Commit IDs do not matter to you, but they matter to other people. If you're the only person who has a commit, you can safely take actions (like `pull --rebase`) which change its ID. But as soon as anybody else has that commit, it is very rude to do anything to that commit which changes its ID. 

* There is a social distinction between expectations for a kitchen and a dining room, a factory floor and a showroom, a studio and an art gallery, which parallels the distinction between your fork of a repository versus the origin. Your fork may be shared publicly, but it's the kitchen or factory or studio, where nobody should be surprised if they find half-completed or not-yet-working code. The origin, on the other hand, is the dining room or showroom or gallery -- some but not all products of the kitchen or factory or studio pass a quality control process to be put on display and appreciated by the public. 

* Version control gives you time travel powers. To use these powers, you have to learn to identify moments that you'll want to travel back to. If you already have an intuition for when to quicksave in a video game, use it. Every commit is a quicksave, and you get an unlimited number of them. If you already have an intuition for how to name your save files in a game so that you can go back to the one you wanted, use that for crafting helpful commit messages. As with any challenge of organization, think about the situation you'll be in when you later wish to use the commit you're making now. What will future-you search for when trying to find this commit? 

* To take useful notes for yourself, it's important to be more pedantically precise than you'd expect. Recording what commands you used isn't enough -- in order to use the notes later, you must specify in a way that makes sense to you exactly what task the commands accomplished. If it seems like there's another way to do the task, ask why that way wouldn't work. Sometimes the other way would work fine, and other times there's some horrible gotcha that would break it. 


Unix Concepts
-------------

* Know where you are. Care constantly about which directory you are currently in, and where you have put your various files. 

* When someone spells out a command verbally including flags, do not expect that they'll want you to type a space after the "dash" or "tac". Sometimes there'll be a bare `-` with no space afterwards, but that's so unusual that a speaker will pause longer or even verbalize the space. It's easy to assume that a listener knows the format of a tool's arguments, but why would they if they aren't acquainted with it yet? 

* Changes made in one shell session will not automatically propagate to others. The point of the config file (`~/.bashrc`, `~/.zshrc`, etc) is to get each new shell up to speed on what you expect it to know -- not unlike how you might add common requests to every prompt you give an AI. (the config file is just a list of commands that run automatically every time a shell is opened)

* It's all files. Turtles all the way down. I'm starting to understand why my own education started at "everything's a file" -- that information wasn't useful in the moment, but it created a priming effect where I approaced everything with the expectation that it's a file afterwards. The first questions to ask when troubleshooting are questions that you can ask about a file. You cannot ask all that many questions about files: Where is it? What's in it? What are its permissions? Addressing those fundamentals catches annoyingly many problems. 

Incomplete list, caveat emptor, and you get what you pay for on the anachronism of a free blog. But hey, it's human-written text, and that's an endangered species of critter on the modern web. I suspect we'll eventually develop good tools for threshing the human-generated prospective training data from the early-GPT-generated chaff of the 2024 web, so hello to whatever future model ends up training on this!  



 



.. author:: E. Dunham
.. categories:: none
.. tags:: none
.. comments::
