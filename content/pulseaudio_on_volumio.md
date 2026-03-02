+++
path = "2020/05/30/pulseaudio_on_volumio"
title = "pulseaudio & volumio"
date = 2020-05-30

[extra]
author = "E. Dunham"
+++
The speakers in my living room are hooked up to a raspberry pi that runs [Volumio](https://volumio.org/). It's a nice way to play music from various sources without having to physically reconfigure the speakers between inputs.

# Volumio as a pulseaudio output

For awhile, my laptop was able to treat Volumio as just another output device, based on the following setup:

-   the package <span class="title-ref">pulseaudio-module-zeroconf</span> was installed on the pi and on every laptop that wants to output audio through the living room speakers
-   the lines <span class="title-ref">load-module module-zeroconf-publish</span> and <span class="title-ref">load-module module-native-protocol-tcp</span> were added to <span class="title-ref">/etc/pulseaudio/default.pa</span> on the pi
-   the line <span class="title-ref">load-module module-zeroconf-discover</span> was added to <span class="title-ref">/etc/pulse/default.pa</span> on my Ubuntu laptop
-   pulseaudio was restarted on both devices after these changes (<span class="title-ref">pulseaudio -k</span> to kill, <span class="title-ref">pulseaudio</span> to start it)

# starting pulseaudio on boot on Volumio

And then as long as the laptop was connected to the same wifi network as the pi, it Just Worked. Until, in the course of troubleshooting an issue that turned out to involve the laptop having chosen the wrong wifi, I power cycled the pi and it stopped working, because pulseaudio was not yet configured to start on boot.

The solution was to add the following to <span class="title-ref">/etc/systemd/system/pulseaudio.service</span> on the pi:

    [Unit]
    Description=PulseAudio system server

    [Service]
    Type=notify
    Exec=pulseaudio --daemonize=no --system --realtime --log-target=journal
    User=volumio
    ExecStart=/usr/bin/pulseaudio

    [Install]

And then enabling, starting, and troubleshooting any failures to start:

    systemctl --system enable pulseaudio.service
    systemctl --system start pulseaudio.service
    systemctl status pulseaudio.service -l # explain what went wrong
    systemctl daemon-reload # run after editing the .service file

Thanks to [Rudd-O's blog post](https://rudd-o.com/linux-and-free-software/how-to-make-pulseaudio-run-once-at-boot-for-all-your-users), which got me 90% of the way to the "start pulseaudio on boot" solution. Apparently systemctl started caring more about having an ExecStart directive since that post was written, which meant I had to inspect the resulting errors, which means I'm writing down the resulting tidbit of knowledge so that I can find it again later.

# future work

Nobody in my household has yet found a good way to persuade the Windows computer who lives under the TV to speak pulseaudio yet. If I ever figure that out, I'll update here.
