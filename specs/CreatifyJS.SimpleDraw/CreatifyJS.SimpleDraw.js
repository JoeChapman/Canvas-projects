describe('CreatifyJS.SimpleDraw', function () {
	var canvasEl = document.getElementsByTagName('canvas')[0];
	var draw = null;
	var config = {
		renderContext: '2d',
		color: 'rgb(200,0,0)',
		dimensions: (10, 10, 55, 50)
	};
	describe('Creating a new object', function () {
		beforeEach(function () {
			spyOn(CreatifyJS.SimpleDraw.prototype, "getCanvasContext");
			draw = new CreatifyJS.SimpleDraw(canvasEl, config);
		});
		it('Calls getCanvasContext with makeRectangle as callback', function () {
			expect(draw.getCanvasContext).toHaveBeenCalledWith(draw.makeRectangle);
		});
	});
	describe('Calling getCanvasContext with makeRectangle as callback', function () {
		beforeEach(function () {
			spyOn(CreatifyJS.SimpleDraw.prototype, "makeRectangle");
			draw.getCanvasContext(draw.makeRectangle);
		});
		it('Calls makeRectangle', function () {
			expect(draw.makeRectangle).toHaveBeenCalled();
		});
	});
	describe('Calling addRectangle', function () {
		beforeEach(function () {
			options = {
				color: 'rgb(0,20,20)',
				dimensions: (100, 10, 55, 50)
			};
			spyOn(CreatifyJS.SimpleDraw.prototype, "makeRectangle");
			draw.addRectangle(options);
		});
		it('Calls makeRectangle with options', function () {
			expect(draw.makeRectangle).toHaveBeenCalledWith(options);
		});
	});
});