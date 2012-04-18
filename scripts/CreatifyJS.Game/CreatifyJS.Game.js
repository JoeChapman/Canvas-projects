var CreatifyJS = CreatifyJS || {};

CreatifyJS.Game = function (paused) {
	this.canvas = document.getElementById('world');
	this.moveDist = 3;
	this.fps = 60;
	this.player = new CreatifyJS.Player(this);
	this.context = this.canvas.getContext('2d');
	this.canvas_width = this.canvas.width;
	this.canvas_height = this.canvas.height;
	this.paused = false;
	
	this.eventDelgation();
	this.play();
	
};

CreatifyJS.Game.prototype.play = function () {
	var game = this;
	// start the game loop and store the timer
	this.gameLoop = window.setInterval(
		function () {
			game.updateAll();
			game.drawAll();
		}, 
		1000 / this.fps);

	this.paused = false
};

CreatifyJS.Game.prototype.pause = function () {
	window.clearInterval(this.gameLoop);
	this.paused = true;
};

CreatifyJS.Game.prototype.reset = function () {
	this.pause();
	this.player.x = 100;
	this.player.y = 100;
	this.drawAll();
};

CreatifyJS.Game.prototype.eventDelgation = function () {
	var game = this;
	// Bind all keydown events to a callback
	document.addEventListener('keydown', function (e) {
		var key = e.keyCode;
		
		if (game.paused && !CreatifyJS.Game.isPermittedKeyType('running', key)) {
			return;
		}
		// If this key is not one of our permitted keys, return!
		if (!CreatifyJS.Game.isPermittedKeyType('permittedKeys', key)) { 
			return;
		}
		// This key is allowed, so we have to prevent the default browser action
		e.preventDefault();
		// Delegate the key control
		game.delegateKeyTypes.call(game, key);
		
	});
};

CreatifyJS.Game.prototype.delegateKeyTypes = function (key) {
	if (CreatifyJS.Game.isPermittedKeyType('running', key)) { 
		this.delegateRunningControls(key);
	}
	if (CreatifyJS.Game.isPermittedKeyType('arrowKeys', key)) { 
		this.player.update(this.getNewAxes(key));
	}
};

CreatifyJS.Game.prototype.delegateRunningControls = function (key) {
	switch (key) {
		case 80:
			if (this.paused) {
				this.play();
				return;
			}
			this.pause();
		break;
		case 82:
			this.reset();
			return;
		break;
		default: 
			return key;
		break;
	}
};

CreatifyJS.Game.prototype.updateAll = function () {
	//this.player.update({x:2, y:2});
};

CreatifyJS.Game.prototype.drawAll = function () {
	this.drawRectangle('#fff', 0, 0, this.canvas_width, this.canvas_height);
	this.player.draw();
};

CreatifyJS.Game.prototype.drawRectangle = function (color, x, y, w, h) {
	this.context.fillStyle = color;
	this.context.fillRect(x, y, w, h);
};

CreatifyJS.Game.prototype.getNewAxes = function (key) {
	var axes = {x: 0, y: 0}, dist = this.moveDist;

	switch (key) {
		case 37: axes.x = -dist; break;
		case 38: axes.y = -dist; break;
		case 39: axes.x = +dist; break;
		case 40: axes.y = +dist; break;
	}
	return axes;
};

// Put all keys here
CreatifyJS.Game.permittedKeys = [37, 38, 39, 40, 80, 82];

// Put arrow keys here
CreatifyJS.Game.arrowKeys = [37, 38, 39, 40];

CreatifyJS.Game.running = [80, 82];

// Have we put sanctions in place for this key??
CreatifyJS.Game.isPermittedKeyType = function (arr, key) {
	return CreatifyJS.Game[arr].indexOf(key) !== -1;
};