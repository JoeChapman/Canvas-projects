var CreatifyJS = CreatifyJS || {};

CreatifyJS.Game = function () {
	var canvas = document.getElementById('world');
		
	this.fps = 60;
	this.player = new CreatifyJS.Player(this);
	this.context = canvas.getContext('2d');
	this.canvas_width = canvas.width;
	this.canvas_height = canvas.height;

	this.start(this);
};

CreatifyJS.Game.keys = [37, 38, 39, 40];

CreatifyJS.Game.prototype.start = function (game) {
	this.gameLoop = window.setInterval (
		function () {
			game.updateAll();
			game.drawAll();
		}, 
		1000 / this.fps); 

	document.addEventListener('keydown', function (e) {
	    game.player.update(game.getNewPosition(e));
	}); 
};

CreatifyJS.Game.prototype.updateAll = function () {};

CreatifyJS.Game.prototype.drawAll = function () {
	this.drawRectangle('#fff', 0, 0, this.canvas_width, this.canvas_height);
	this.player.draw();
};

CreatifyJS.Game.prototype.drawRectangle = function (color, x, y, w, h) {
	this.context.fillStyle = color;
	this.context.fillRect(x, y, w, h);
};

CreatifyJS.Game.prototype.getNewPosition = function (e) {
	var key, 
		pos, 
		amount = 1;

	if (e.keyCode || e.which) {
		key = e.keyCode || e.which;
		
		if (CreatifyJS.Game.keys.indexOf(key) !== -1) {
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
			return pos;
		}
		return false;	
	}
};