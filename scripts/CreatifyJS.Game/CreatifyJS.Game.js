var CreatifyJS = CreatifyJS || {};

CreatifyJS.Game = function () {
	var game, 
		gameLoop,
		canvas = document.getElementById('world');
		
	this.fps = 60;
	this.player = new CreatifyJS.Player(this);
	this.context = canvas.getContext('2d');
	this.canvas_width = canvas.width;
	this.canvas_height = canvas.height;

	game = this,
	// Start game loop
	gameLoop = window.setInterval (
		function () {
			game.updateAll();
			game.drawAll();
		}, 1000 / this.fps); 

	document.addEventListener('keydown', function (e) {
	    game.keyDelegation(e);
	}); 
};

CreatifyJS.Game.prototype.keys = [37, 38, 39, 40];

CreatifyJS.Game.prototype.updateAll = function () {};

CreatifyJS.Game.prototype.drawAll = function () {
	this.drawRectangle('#fff', 0, 0, this.canvas_width, this.canvas_height);
	this.player.draw();
};

CreatifyJS.Game.prototype.drawRectangle = function (color, x, y, w, h) {
	this.context.fillStyle = color;
	this.context.fillRect(x, y, w, h);
};

CreatifyJS.Game.prototype.keyDelegation = function (e) {
	var key, 
		pos, 
		amount = 10;

	if (e.keyCode || e.which) {
		key = e.keyCode || e.which;
		
		if (this.keys.indexOf(key) !== -1) {
			e.preventDefault();

			pos = {x: 0, y: 0};

			switch (key) {
				case 37: pos.x = -amount;
				break;
				case 38: pos.y = -amount;
				break;
				case 39: pos.x = +amount;
				break;
				case 40: pos.y = +amount;
				break;
			}
			this.player.update(pos);
		}

		
	}
};