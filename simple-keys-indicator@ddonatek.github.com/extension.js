import St from "gi://St";
import Gdk from "gi://Gdk";
import Clutter from "gi://Clutter"
import * as Main from "resource:///org/gnome/shell/ui/main.js";

const Keymap = Clutter.get_default_backend().get_default_seat().get_keymap();

let numLock, capsLock;

function keyStatusChanged() {
	// TODO add option to hide when not active? (numLock|capsLock).visible = true|false;
	if (Keymap.get_num_lock_state()) {
		numLock.remove_style_class_name("status-off");
	} else {
		numLock.add_style_class_name("status-off");
	}
	if (Keymap.get_caps_lock_state()) {
		capsLock.remove_style_class_name("status-off");
	} else {
		capsLock.add_style_class_name("status-off");
	}
}

export default class SimpleKeysIndicatorExtension {
	constructor() {
		numLock = new St.Label({
			style_class: "status-label",
			text: "1"
		});
		capsLock = new St.Label({
			style_class: "status-label",
			text: "A"
		});
		Keymap.connect("state_changed", keyStatusChanged);
	}

	enable() {
		Main.panel._rightBox.insert_child_at_index(capsLock, 0);
		Main.panel._rightBox.insert_child_at_index(numLock, 0);
		keyStatusChanged();
	}

	disable() {
		Main.panel._rightBox.remove_child(numLock);
		Main.panel._rightBox.remove_child(capsLock);
	}
}
