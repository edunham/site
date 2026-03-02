+++
path = "2020/01/04/finding_lost_minecraft_base"
title = "Finding a lost Minecraft base"
date = 2020-01-04

[taxonomies]
tags = ["minecraft"]

[extra]
author = "E. Dunham"
+++
I happen to administer a tiny, mostly-vanilla Minecraft server. The other day, I was playing there with some friends at a location out in the middle of nowhere. I slept in a bed at the base, thinking that would suffice to get me back again later.

After returning to spawn, installing a warp plugin (and learning that <span class="title-ref">/warp</span> comes from Essentials), rebooting the server, and teleporting to some other coordinates to install their warps, I tried killing my avatar to return it to its bed. Instead of waking up in bed, it reappeared at spawn. Since my friends had long ago signed off for the night, I couldn't just teleport to them. And I hadn't written down the base's coordinates. How could I get back?

Some digging in the docs revealed that there does not appear to be any console command to get a server to disclose the last seen location, or even the bed location, of an arbitrary player to an administrator. However, the server must know something about the players, because it will usually remember where their beds were when they rejoin the game.

On the server, there is a <span class="title-ref">world/playerdata/</span> directory, containing one file per player that the server has ever seen. The file names are the player UUIDs, which can be pasted into [this tool](https://minecraft-techworld.com/uuid-lookup-tool) to turn them into usernames. But I skipped the tool, because the last modified timestamps on the files told me which two belonged to the friends who had both been at our base. So, I copied a <span class="title-ref">.dat</span> file that appeared to correspond to a player whose location or bed location would be useful to me. Running <span class="title-ref">file</span> on the file pointed out that it was gzipped, but unzipping it and checking the result for anything useful with <span class="title-ref">strings</span> yielded nothing comprehensible.

[The wiki](https://minecraft.gamepedia.com/Player.dat_format) reminded me that the <span class="title-ref">.dat</span> was NBT-encoded. The recommended NBT Explorer tool appeared to require a bunch of Mono runtime stuff to be compatible with Linux, so instead I grabbed some code that claimed to be a [Python NBT wrapper](https://github.com/twoolie/NBT) to see if it would do anything useful. With some help from its examples, I retrieved the player's bed location:

    from nbt import *
    n = nbt.NBTFile("myfile.dat",'rb')
    print("x=%s, y=%s, z=%s" % (n["SpawnX"], n["SpawnY"], n["SpawnZ"]))

Teleporting to those coordinates revealed that this was indeed the player's bed, at the base I'd been looking all over for!

The morals of this story are twofold: First, I should not quit writing down coordinates I care about on paper, and second, Minecraft-adjacent programming is still not my idea of a good time.
