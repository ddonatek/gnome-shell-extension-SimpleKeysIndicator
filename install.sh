#!/usr/bin/bash

name="simple-keys-indicator@ddonatek.github.com"
pack_name="${name}.shell-extension.zip"

# yes, you have to pack it first so that install can unpack it...
gnome-extensions pack --force "$name"

gnome-extensions install --force "$pack_name"