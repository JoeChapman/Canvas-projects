describe("Game", function() {
	describe("Creating a new game", function () {
		it("Updates all", function () {
			var spy = spyOn(CreatifyJS.Game.prototype, "updateAll");
			var game = new CreatifyJS.Game();
			setTimeout(function () {
				expect(spy).toHaveBeenCalled();
				game = null;
			}, 0);
		});
		it("Draws all", function () {
			var spy = spyOn(CreatifyJS.Game.prototype, "drawAll");
			var game = new CreatifyJS.Game();
			setTimeout(function () {
				expect(spy).toHaveBeenCalled();
				game = null;	
			}, 0);
		});
	});
	describe("Drawing all", function () {
		var spyDraw = spyOn(CreatifyJS.Player.prototype, "draw");
		var spyDrawRect = spyOn(CreatifyJS.Game.prototype, "drawRectangle");
		var game = new CreatifyJS.Game();
		game.drawAll();
		it("Draws the world", function () {
			expect(spyDrawRect).toHaveBeenCalled();
			expect(spyDrawRect.mostRecentCall.args[0]).toBe('#fff');
		});
		it("Draws the player", function () {
			expect(spyDraw).toHaveBeenCalled();
		});
	});
	describe("Tapping the arrow keys", function () {
		var game = new CreatifyJS.Game();
		var spy = spyOn(game.player, "update");
		var event = document.createEvent("HTMLEvents");
    	event.initEvent('keydown', true, true);

		describe("left", function () {
			event.keyCode = 37;
			document.dispatchEvent(event);
			it("Updates the player", function () {	
				expect(spy).toHaveBeenCalled();
			});
		});
		describe("Up", function () {
			event.keyCode = 38;
			document.dispatchEvent(event);
			it("Updates the player", function () {	
				expect(spy).toHaveBeenCalled();
			});
		});
		describe("Right", function () {
			event.keyCode = 39;
			document.dispatchEvent(event);
			it("Updates the player", function () {	
				expect(spy).toHaveBeenCalled();
			});
		});
		describe("Down", function () {
			event.keyCode = 40;
			document.dispatchEvent(event);
			it("Updates the player", function () {	
				expect(spy).toHaveBeenCalled();
			});
		});
		
	});
	
});