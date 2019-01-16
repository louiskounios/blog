---
title: "Preparing Hard Drive for Ubuntu / elementary OS Installation To LVM"
date: "2019-01-16"
summary: "Preparing a hard drive for an Ubuntu / elementary OS installation to LVM using the command line."
---

I've been distro-hopping the past couple of weeks and ended up trying out Ubuntu 18.04 LTS and elementary OS 5.0 Juno (which is based on the aforementioned Ubuntu LTS release).

During installation, a lot of head-scratching took place because I couldn't find how to configure LVM using the graphical installer.
Unless I totally missed something, which is highly likely, admittedly, I could only configure LVM by wiping the hard drive housing my Windows installation.
Although a lot of us are longing for "The Year of the Linux Desktop", this aggressive marketing message didn't resonate with me.

The custom, "set-it-up-yourself" option provided by the installer had a lot more levers to play with, but I couldn't seem to find the option that'd allow me to configure LVM.
So I ended up configuring everything using the command line.
I always find learning about the libraries / APIs that power apps such as GParted interesting, so even if it turns out that this wasn't strictly necessary, time wasn't wasted!

Here, I'll describe the steps I took to prepare my hard drive for Ubuntu / elementary OS installations to LVM.
Note that the commands that follow assume root privileges (`sudo su`, `sudo -s`, etc).

## Get Device File, Capacity and Sector Size

Using `fdisk`, we can find the device file, capacity in bytes and physical sector of the disk we want to work with.

```shell
fdisk -l

# Disk /dev/sdb: 232.9 GiB, 250059350016 bytes, 488397168 sectors
# Disk model: Samsung SSD 850
# Units: sectors of 1 * 512 = 512 bytes
# Sector size (logical/physical): 512 bytes / 512 bytes
# I/O size (minimum/optimal): 512 bytes / 512 bytes
# Disklabel type: gpt
# Disk identifier: 819251F4-C01F-4595-A657-222FEAEEC9B9
```

We make note of the following:

* Device file: `/dev/sdb`
* Capacity: `250059350016`
* Physical sector size: `512`

## Wipe Disk

We set the `disk_size_bytes` and `physical_sector_size` variables to the values we made note of earlier.
The `dd` command uses these variables to wipe the disk.
You need to __triple-check__ that the command that follows is correct, otherwise you will end up wiping the wrong disk.

```shell
disk_size_bytes=250059350016
physical_sector_size=512
dd if=/dev/zero \
  of=/dev/sdb \
  bs=$physical_sector_size \
  count=$(($disk_size_bytes / $physical_sector_size)) \
  seek=0 \
  conv=notrunc \
  status=progress
```

To re-iterate, make sure that the output file path (`of`) matches the device file of the disk you want to wipe!
Feel free to use `/dev/urandom` as your input file (`if`), but keep in mind that it will likely be slower than writing zeroes.
Also keep in mind that there are limits to how securely disks can be wiped.
The [Arch Linux wiki](https://wiki.archlinux.org/index.php/Securely_wipe_disk#Data_remanence) collates a lot of useful information on the topic.
Please do your own research.
Once `dd` is done, we can proceed to the next step.

## Create GUID Partition Table

We begin by creating a GUID partition table.

```shell
parted /dev/sdb mklabel gpt
```

## Create EFI System Partition

Our first partition will be an EFI system partition which is mandatory for an UEFI boot.
We _must_ create this partition on the main partition table and not in LVM.

```shell
parted /dev/sdb mkpart primary fat32 1MiB 551MiB
parted /dev/sdb set 1 esp on # On the first partition, enable the esp flag
mkfs.fat -F 32 /dev/sdb1
```

Note that the `fat32` part in the first command is to do with partition metadata.
That is, it does not make `parted` format the partition.
All it does is ensure that anyone trying to read information about the partition will be told that the partition is of type FAT32.
`mkfs.fat` is what actually formats the partition.


## Configure LVM

Now we can configure LVM.
This involves creating an LVM partition, a physical volume, a volume group, and logical volumes.

### Create LVM Partition

To create an LVM partition, we create a partition that takes up the entirety of the remaining free space and enable the `lvm` flag.

```shell
parted /dev/sdb mkpart primary 551MiB 100%
parted /dev/sdb set 2 lvm on # On the second partition, enable the lvm flag
```

### Create Physical Volume

Here, we create a physical volume from the partition we just created.
Note that we're now referring to `/dev/sdb2` which is the second partition of our `/dev/sdb` drive.

```shell
pvcreate /dev/sdb2
```

### Create Volume Group

Now we create a volume group on the created physical volume.
Here, we name the volume group `vg-ubuntu`.
Make note of the name as we'll be using it later.

```shell
vgcreate vg-ubuntu /dev/sdb2
```

### Create Logical Volumes

With all that out of the way, we can start creating our logical volumes.
The process is straight-forward, consisting of the actual logical volume creation using `lvcreate` and the appropriate format command.
Note that we must format the logical volumes – _not_ the LVM partition we created earlier.
The device files corresponding to the logical volumes we create will be in `/dev/<volume-group-name>/<logical-volume-name>`.

Here, we will create logical volumes for swap, root (`/`) and home (`/home`).

#### Swap

On the `vg-ubuntu` volume group, create a logical volume named `lv-swap` with a size of 8 gibibytes, and format it to prepare it for use as a swapping space.

```shell
lvcreate --size 8GiB vg-ubuntu --name lv-swap
mkswap /dev/vg-ubuntu/lv-swap
```

#### Root

On the `vg-ubuntu` volume group, create a logical volume named `lv-root` with a size of 20 gibibytes, and format it into an ext4 filesystem.

```shell
lvcreate --size 20GiB vg-ubuntu --name lv-root
mkfs.ext4 /dev/vg-ubuntu/lv-root
```

#### Home

On the `vg-ubuntu` volume group, create a logical volume named `lv-home` that takes up the entirety of the remaining free space on the physical volume, and format it into an ext4 filesystem.

```shell
lvcreate --extents 100%FREE vg-ubuntu --name lv-home
mkfs.ext4 /dev/vg-ubuntu/lv-home
```

## Graphical Installer

Now that our disk has been prepared, we can return to the graphical installer to complete the installation.
We choose the advanced option and do the following:

* Set the bootloader to install on the drive we've been working with (here, `/dev/sdb`)
* Ensure that the EFI system partition we created is configured to be used as such (here, `/dev/sdb1`)
* Ensure that `lv-swap` is configured to be used as swap memory
* Configure `lv-root` with a mount point of `/`
* Configure `lv-home` with a mount point of `/home`

That should do it.
Proceed with the installation.
