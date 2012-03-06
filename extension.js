// Desktop Scroller.
// Copyright (C) 2011-2012 Marcos Diaz <diazmencia@gmail.com>.
// Copyright (C) 2012 Arnaud Bonatti <arnaud.bonatti@gmail.com>.
//
// Desktop Scroller is libre software: you can redistribute it and/or modify it
// under the terms of the GNU General Public License as published by the Free
// Software Foundation, either version 2 of the License, or newer.
//
// You should have received a copy of the GNU General Public License along with
// this file. If not, see <http://www.gnu.org/licenses/>.

const Main = imports.ui.main
const Clutter = imports.gi.Clutter;
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup;

function Scroller() {
	this._init();
}

Scroller.prototype = {
	_init: function() {
		this.actor = new Clutter.Rectangle({
			name: 'left-scroller',
			x: 0,	width: 1,
			y: 30,	height: Main.layoutManager.primaryMonitor.height - 60,
			opacity: 0,
			reactive: true});
		this.actor.connect('scroll-event', this._onScrollEvent.bind(this))
		
		Main.layoutManager.addChrome(this.actor, {visibleInFullscreen:true})
	},
	
	_onScrollEvent: function (actor, event) {		// from js/ui/workspacesView.js
		switch ( event.get_scroll_direction() ) {
		case Clutter.ScrollDirection.UP:
			Main.wm.actionMoveWorkspaceUp();
			break;
		case Clutter.ScrollDirection.DOWN:
			Main.wm.actionMoveWorkspaceDown();
			break;
		}
	},
	
	destroy: function(){
		Main.layoutManager.removeChrome(this.actor)
		this.actor.destroy()
	}
}

function init() {
	if (Main.wm._workspaceSwitcherPopup == null) Main.wm._workspaceSwitcherPopup = new WorkspaceSwitcherPopup.WorkspaceSwitcherPopup();	// "fmuellner: The_gull: yes - the function is either called from main.js (if the overview is active and no popup is shown) or from _showWorkspaceSwitcher (in windowManager.js), so it won't be null"
}

let desktopscroller;
function enable() { desktopscroller = new Scroller() }
function disable() { desktopscroller.destroy() }
