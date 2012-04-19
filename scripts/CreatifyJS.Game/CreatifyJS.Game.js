(function (window, undef) {

	CreatifyJS.Game = function (options) {
		this.canvas = options.canvas;
		this.moveDist = options.moveDist;
		this.fps = options.fps;

		this.context = this.canvas.getContext('2d');
		this.canvas_width = this.canvas.width;
		this.canvas_height = this.canvas.height;
		this.paused = false;
		this.player = new CreatifyJS.Player(this);
		this.player.origX = this.player.x;
		this.player.origY = this.player.y;
		
		this.eventDelegation(this.play())
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
		this.player.x = this.player.origX;
		this.player.y = this.player.origY;
		this.drawAll();
	};

	CreatifyJS.Game.prototype.updateAll = function () {
		//this.drawImage();
	};

	CreatifyJS.Game.prototype.drawAll = function () {
		//this.drawRectangle('#fff', 0, 0, this.canvas_width, this.canvas_height);
		this.player.draw();		
		this.drawImage();
	};

	CreatifyJS.Game.prototype.drawRectangle = function (color, x, y, w, h) {
		this.context.fillStyle = color;
		this.context.fillRect(x, y, w, h);
	};

	CreatifyJS.Game.prototype.drawImage = function () {
		var ctx = this.context,
			img = new Image();
		img.onload = function () {
			ctx.drawImage(img, 0, 0);
		};
		img.src = "../../images/world-bg.jpg";		
	};

	CreatifyJS.Game.prototype.eventDelegation = function () {
		var game = this;
		// Bind all keydown events to a callback
		document.addEventListener('keydown', function (e) {
			var key = e.keyCode;	
			if (game.paused && !CreatifyJS.Game.isPermittedKeyType('operations', key)) {
				return;
			}
			// If this key is not one of our permitted keys, return!
			if (!CreatifyJS.Game.isPermittedKeyType('any', key)) { 
				return;
			}
			// This key is allowed, so we have to prevent the default browser action
			e.preventDefault();
			// Delegate the key control
			game.delegateKeyTypes.call(game, key);
		});
	};

	CreatifyJS.Game.prototype.delegateKeyTypes = function (key) {
		if (CreatifyJS.Game.isPermittedKeyType('operations', key)) { 
			this.delegatePlayingControls(key);
		}
		if (CreatifyJS.Game.isPermittedKeyType('movement', key)) { 
			this.player.update(this.getNewAxes(key));
		}
	};

	CreatifyJS.Game.prototype.delegatePlayingControls = function (key) {
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
	CreatifyJS.Game.permittedKeys = {
		movement: 	[37, 38, 39, 40], 
		operations: [80, 82]
	};

	CreatifyJS.Game.isPermittedKeyType = function (type, key) {
		var permitted = CreatifyJS.Game.permittedKeys, typeKeys, a, len;
		
		if (type in permitted) {
			// For types we know about
			return permitted[type].indexOf(key) !== -1;
		}
		for (a in permitted) {
			if (permitted.hasOwnProperty(a)) {
				if (permitted[a].indexOf(key) !== -1) {
					return true;
				}
			}
		}
		return false;
		
	};

	window.CreatifyJS = CreatifyJS;

}(this));