describe("Game", function() {

	// A collection for resusing our spies
	var spies = {};

	// Event helpers
	var fireEvent = function (code, elem) {
		var event = makeKeydownEvent();
		event.keyCode = code;
		 elem.dispatchEvent(event);
	};
	var makeKeydownEvent = function () {
		var event = document.createEvent("HTMLEvents");
    	event.initEvent('keydown', true, true);
    	return event;
	};
	var movePlayer = function (dist) {

	};

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
		spies.spyDraw = spyOn(CreatifyJS.Player.prototype, "draw");
		spies.spyDrawRect = spyOn(CreatifyJS.Game.prototype, "drawRectangle");
		var game = new CreatifyJS.Game();
		game.drawAll();
		it("Draws the world", function () {
			expect(spies.spyDrawRect).toHaveBeenCalled();
			expect(spies.spyDrawRect.mostRecentCall.args[0]).toBe('#fff');
		});
		it("Draws the player", function () {
			expect(spies.spyDraw).toHaveBeenCalled();
		});
	});
	describe("Requesting key permission", function () {
		var game = new CreatifyJS.Game();
		describe("For a disallowedKey", function () {
			var disallowedKey = 2;
			it("Return false", function () {
				expect(CreatifyJS.Game.isPermittedKeyType('permittedKeys', disallowedKey)).toEqual(false);
			});
		});
		describe("For a permitted key", function () {
			var allowedKey = 39;
			it("Return true", function () {
				expect(CreatifyJS.Game.isPermittedKeyType('permittedKeys', allowedKey)).toEqual(true);
			});
		});
	});
	describe("Tapping the arrow keys", function () {
		var game = new CreatifyJS.Game();
		spies.update = spyOn(game.player, "update");
		
		describe("left", function () {
			fireEvent(37, game.canvas);
			it("Updates the player", function () {	
				expect(spies.update).toHaveBeenCalled();
			});
		});
		describe("Up", function () {
			fireEvent(38, game.canvas);
			it("Updates the player", function () {	
				expect(spies.update).toHaveBeenCalled();
			});
		});
		describe("Right", function () {
			fireEvent(39, game.canvas);
			it("Updates the player", function () {	
				expect(spies.update).toHaveBeenCalled();
			});
		});
		describe("Down", function () {
			fireEvent(40, game.canvas);
			it("Updates the player", function () {	
				expect(spies.update).toHaveBeenCalled();
			});
		});
	});
	describe("Pressing 'p' when playing", function () {	
		var game = new CreatifyJS.Game();
		it("Pauses the game", function () {
			expect(game.paused).toEqual(false);
			fireEvent(80, game.canvas);
			expect(game.paused).toEqual(true);
		});
	});
	describe("Pressing 'p' when paused", function () {
		var game = new CreatifyJS.Game();
		it("Starts the game", function () {
			expect(game.paused).toEqual(true);
			fireEvent(80, game.canvas);
			expect(game.paused).toEqual(false);
		});
	});
	describe("Pressing 'r'", function () {
		var game = new CreatifyJS.Game();
		it("Moves the player to the starting position", function () {
			// Move player
			fireEvent(40, game.canvas);
			fireEvent(39, game.canvas);
			// Press 'r'
			fireEvent(82, game.canvas);
			expect(game.player.x).toEqual(100);
			expect(game.player.y).toEqual(100);
		});
		it("Pauses the game", function () {
			fireEvent(82, game.canvas);
			expect(game.paused).toEqual(true);
		});
	});
});





