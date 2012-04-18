var CreatifyJS = CreatifyJS || {};

CreatifyJS.Player = function (game) {
	this.game = game;
	this.x = 100;
	this.y = 100;
};

CreatifyJS.Player.prototype.draw = function () {
	this.game.drawRectangle('#f00', this.x, this.y, 10 , 10);
};

CreatifyJS.Player.prototype.update = function (axes) {
	console.log(axes)
	if (axes) {
		this.x = this.x + axes.x;
		this.y = this.y + axes.y;	
	}
};
