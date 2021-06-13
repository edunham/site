transcription with mplayer and i3
=================================

I recently wanted to manually transcribe an audio recording. I prefer to type
into LibreOffice Writer for this purpose. Writer has an `audio player plugin
<https://extensions.libreoffice.org/en/extensions/show/transcriber>`_ for
transcription, but unfortunately its keyboard shortcuts didn't work when I
tried it. 

I just want to play some audio in one workspace and have play/pause and
5-second rewind shortcuts work even when another window is focused.  

Since I am using i3wm on Ubuntu, I can glue up a serviceable transcription
setup from stuff that's already lying around. 

The first challenge is to persuade an audio player to accept commands while
it's not the window in focus. By complaining about this problem to someone more
knowledgeable than myself, I learned about mplayer's slave mode. From `its docs
<http://www.mplayerhq.hu/DOCS/tech/slave.txt>`_, I learn that I can instruct
mplayer to take arbitrary commands on a fifo as follows::

    $ mkfifo /tmp/mplayerfifo
    $ mplayer -slave -input file=/tmp/mplayerfifo audio-to-transcribe.mp3

Now I can test whether mplayer is listening on the fifo. And indeed, the audio
pauses when I tell it::

    $ echo pause > /tmp/mplayerfifo

At this time I also test the incantation to rewind the audio by 5 seconds::

    $ echo seek -5 > /tmp/mplayerfifo

Since both commands work as expected, I can now create keyboard shortcuts for
them in ``.i3/config``::

    bindsym $mod+space exec "echo pause > /tmp/mplayerfifo"
    bindsym $mod+z exec "echo seek -5 > /tmp/mplayerfifo"

After writing the config, ``$mod+shift+c`` reloads it so i3 knows about the new
shortcuts.

Finally, I'll make sure this keeps working after I reboot. I'll make an alias
in my ``~/.bashrc`` to save having to remember the mplayer incantation::

    $ echo "alias transcribe='mplayer -slave -input file=/tmp/mplayerfifo" >> ~/.bashrc
 
And to automatically create the fifo once on boot::

    $ echo "mkfifo /tmp/mplayerfifo" >> ~/.profile 

Now after I ``source ~/.bashrc``, I can play media with this ``transcribe``
alias, and the keyboard shortcuts control it from anywhere in my window
manager. 

.. author:: E. Dunham
.. categories:: none
.. tags:: none
.. comments::
