var CreatifyJS = CreatifyJS || {};

CreatifyJS.SimpleDraw = function (canvas, config) {
	this.color = config.color;
	this.renderContext = config.renderContext;
	this.canvas = canvas;	
	this.context = null;
	this.getCanvasContext(this.makeRectangle);

};

CreatifyJS.SimpleDraw.prototype.getCanvasContext = function (callback) {
	if (typeof this.canvas.getContext === 'function') {
		this.context = this.canvas.getContext(this.renderContext);	
		try {
			callback.call(this)
		} catch(e) {

		}
		
	}
};

CreatifyJS.SimpleDraw.prototype.makeRectangle = function (options) {
	if (typeof this.context.fillStyle !== 'undefined') {
		this.context.fillStyle = options.color || this.color;  	
	}
	if (typeof this.context.fillRect === 'function') {
		this.context.fillRect(options.dimensions || this.dimensions); 
	}
};

CreatifyJS.SimpleDraw.prototype.addRectangle = function (options) {
	this.makeRectangle(options);
};