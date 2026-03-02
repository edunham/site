+++
title = "Switching Arch Systems (again)"
date = 2026-02-20
draft = true

[extra]
author = "E. Dunham"
+++
Boot arch iso.

wifi-menu to get on the internet.

ls /dev/sd\*

fdisk /dev/sda +100M, then default

cryptsetup -y -v luksFormat /dev/sda2 YES

cryptsetup open /dev/sda2 cryptroot

\# mkfs -t ext4 /dev/mapper/cryptroot \# mount -t ext4 /dev/mapper/cryptroot /mnt

mkfs -t ext4 /dev/sda1 mkdir /mnt/boot mount -t ext4 /dev/sda1 /mnt/boot

mv /etc/pacman.d/mirrorlist /etc/pacman.d/mirrorlist.bak

rankmirrors /etc/pacman.d/mirrorlist.bak &gt; /etc/pacman.d/mirrorlist

&lt;wait&gt;

pacstrap -i /mnt base base-devel

\# genfstab -U /mnt &gt; /mnt/etc/fstab \# cat /mnt/etc/fstab

On happy system: $ sudo pacman -Qe &gt; packages.txt

arch-chroot /mnt /bin/bash

locale-gen \# echo LANG=en\_US.UTF-8 &gt; /etc/locale.conf

echo x240 &gt; /etc/hostname

add GRUB\_CMDLINE\_LINUX="cryptdevice=/dev/sda2:cryptroot" to /etc/default/grub

grub-install --recheck /dev/sda

> Installing for x86\_64-efi platform. grub-install: error: cannot find EFI directory.

grub-install --recheck --target=i386-pc /dev/sda

&lt;this used to be default, see <https://wiki.archlinux.org/index.php/GRUB>&gt;

\# grub-mkconfig -o /boot/grub/grub.cfg

Ignore the WARNING: Failed to connect to lvmetad, can't start lvmetad due to chroot

<https://wiki.archlinux.org/index.php/Pacman_tips#Backing_up_and_retrieving_a_list_of_installed_packages>

mkinitcpio -p linux

install yaourt by adding

\[archlinuxfr\] SigLevel = Never Server = <http://repo.archlinux.fr/$arch>

to /etc/pacman.conf

add

add 'encrypt' hook in the HOOKS line of /etc/mkinitcpio.conf
