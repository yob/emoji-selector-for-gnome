# Emoji Selector (for GNOME Shell)

This GNOME shell extension provides a searchable popup menu displaying most emojis ; Clicking on an emoji copies it to your clipboard.

## Features

>**currently Unicode 11** ([soon 12](https://github.com/maoschanz/emoji-selector-for-gnome/issues/28))

- keyboard shortcut to open the extension's menu (<kbd>Super</kbd>+<kbd>E</kbd> by defaut)
- dynamic search (press <kbd>Enter</kbd> to copy the first result to the clipboard)
- lots of parametrable things
- skin tone & gender modifiers
- middle-click to set to the cliboard without closing the menu (or <kbd>Ctrl</kbd>+<kbd>Enter</kbd>)
- right-click to add the emoji at the end of the current clipboard content (or <kbd>Shift</kbd>+<kbd>Enter</kbd>)

The keyboard navigation is designed to work **with <kbd>Tab</kbd>, not the arrows**.

![Screenshot](./screenshot_v19.png)

## About fonts

It will be less ugly if you have the « Noto Emoji » font, the
« [Twitter Color Emoji](https://github.com/eosrei/twemoji-color-font/releases) »
font, or the « JoyPixels Color » font installed on your system.

## About memory performance

Loading hundreds of small pictures and thousands of keywords into the memory is
a lot. Despite a few attempts to optimize their loading, I'm not an expert at
all concerning memory management, and the extension may be responsible for
between 10MB and 60MB of memory usage, which is a lot. Don't blame the actual GS
devs for it.

## About data

The emoji data used to construct the widget is sourced from the Unicode
Consortium, via the emoji-datasource npm package.

From time to time it may be desirable to re-generate the data file, for example when
new official emoji's are released. To do so:

1. Update the emoji-datasource package

    npm update emoji-datasource

2. Regenerate the data and commit it

    npm run gen-emojis
    git commit emoji-selector@maestroschan.fr/data/emoji.js -m "updated emoji data"

## Development

While working on changes, it can be helpful to boot a nested gnome shell
session to check the results without restarting the main gnome shell session.

    dbus-run-session -- gnome-shell --nested --wayland

To load the extension from a git checkout instead of a package:

    git clone https://github.com/yob/emoji-selector-for-gnome.git
    cd emoji-selector-for-gnome
    git checkout single-emoji-data-file
    ln -s <path to git clone>/emoji-selector@maestroschan.fr ~/.local/share/gnome-shell/extensions/emoji-selector@maestroschan.fr

.. and then restart your gnome-shell session, or to test without restarting you can use
the dbus-run-session trick above.

## Contributors & translations

Various contributions to the code itself:

- [Ryan Gonzalez](https://github.com/kirbyfan64)
- [amivaleo](https://github.com/amivaleo)
- [xurizaemon](https://github.com/xurizaemon)

The extension is currently available in the following languages:

- Castillan (thanks to mario-mra)
- Simplified chinese (thanks to larryw3i)
- Dutch (thanks to vistaus)
- Esperanto (thanks to nicolasmaia)
- German (thanks to jonnius)
- Italian (thanks to amivaleo)
- Polish (thanks to alex4401)
- Brazilian portuguese (thanks to nicolasmaia, picsi & frnogueira)
<!-- TODO if no update from them, manually add their names to the .po files
          before the release -->

If you need another language, please contribute!

----

## Installation

#### Default way to do

The better option is to install it from [here](https://extensions.gnome.org/extension/1162/emoji-selector/).

#### Native packages

- [`gnome-shell-extension-emoji-selector` (**Fedora**)](https://src.fedoraproject.org/rpms/gnome-shell-extension-emoji-selector)
- `gnome-shell-emoji-selector` (**nixOS**)
- [`gnome-shell-extension-emoji-selector-git` (**AUR**)](https://aur.archlinux.org/packages/gnome-shell-extension-emoji-selector-git/)
- ...<!-- TODO à compléter -->

#### Manual installation

**Not recommended at all:** installing the extension this way prevent any
further update.

Download and extract the ZIP, then open a terminal in the project's directory,
and run `./install.sh`. It should copy the "emoji-selector@maestroschan.fr"
folder to `~/.local/share/gnome-shell/extensions/`, which can be done manually
if you prefer.

You may need to restart the GNOME Shell environment (logout and login again, or
<kbd>Alt</kbd>+<kbd>F2</kbd> -> `r` ->, <kbd>Enter</kbd>).

