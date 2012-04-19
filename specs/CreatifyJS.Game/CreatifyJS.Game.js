describe("Game", function() {

	// A collection for resusing our spies
	var spies = {};

	// Our game options
	var options = {
		canvas: window.document.getElementById('world'),
		moveDist: 3,
		fps: 60
	};

	// HELPERS
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

	// TESTS
	describe("Creating a new game", function () {
		it("Plays the game", function () {
			spyOn(CreatifyJS.Game.prototype, "play");
			var game = new CreatifyJS.Game(options);
			expect(CreatifyJS.Game.prototype.play).toHaveBeenCalled();
		});
	});
	describe("Playing the game", function () {
		spies.spyDrawAll = spyOn(CreatifyJS.Game.prototype, "drawAll");
		spies.spyUpdateAll = spyOn(CreatifyJS.Game.prototype, "updateAll");
		var game = new CreatifyJS.Game(options);
		waits(100);
		it("Draws the game", function () {
			expect(spies.spyDrawAll).toHaveBeenCalled();
		});
		it("Updates the game", function () {
			expect(spies.spyUpdateAll).toHaveBeenCalled();
		});
	});
	describe("Drawing the game", function () {
		spies.spyDrawRect = spyOn(CreatifyJS.Game.prototype, "drawRectangle");
		spies.spyDrawPlayer = spyOn(CreatifyJS.Player.prototype, "draw");
		var game = new CreatifyJS.Game(options);
		waits(100);
		it("Draws the world", function () {
			expect(spies.spyDrawRect).toHaveBeenCalled();
		});
		it("Draws the player", function () {
			expect(spies.spyDrawPlayer).toHaveBeenCalled();
		});
	});
	describe("Pressing a key", function () {
		var game = new CreatifyJS.Game(options);
		describe("That's not a game key", function () {
			var notGameKey = 2;
			it("Does not affect the game", function () {
				expect(CreatifyJS.Game.isPermittedKeyType('any', notGameKey)).toEqual(false);
			});
		});
		describe("That is a game key", function () {
			var gameKey = 39;
			it("Updates the game", function () {
				expect(CreatifyJS.Game.isPermittedKeyType('any', gameKey)).toEqual(true);
			});
		});
		describe("That is an arrow key", function () {
			var arrowKey = 39;
			it("Updates the game", function () {
				expect(CreatifyJS.Game.isPermittedKeyType('movement', arrowKey)).toEqual(true);
			});
		});
		describe("That is an operations key", function () {
			var operationsKey = 82;
			it("Updates the game", function () {
				expect(CreatifyJS.Game.isPermittedKeyType('operations', operationsKey)).toEqual(true);
			});
		});
	});
	describe("Pressing the arrow keys", function () {
		var game = new CreatifyJS.Game(options);
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
		var game = new CreatifyJS.Game(options);
		it("Pauses the game", function () {
			expect(game.paused).toEqual(false);
			fireEvent(80, game.canvas);
			expect(game.paused).toEqual(true);
		});
	});
	describe("Pressing 'p' when paused", function () {
		var game = new CreatifyJS.Game(options);
		it("Starts the game", function () {
			expect(game.paused).toEqual(true);
			fireEvent(80, game.canvas);
			expect(game.paused).toEqual(false);
		});
	});
	describe("Pressing 'r'", function () {
		var game = new CreatifyJS.Game(options);
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





