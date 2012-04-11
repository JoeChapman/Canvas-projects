describe("Player", function() {

	var game = new CreatifyJS.Game();

	describe("Creating a new Player", function () {
		it("Does not throw an error", function () {
			expect(function () {
				new CreatifyJS.Player(game);
			}).not.toThrow();
		});
	});
	describe("Drawing the player", function () {
		var player = new CreatifyJS.Player(game);
		it("Draws a red, square player", function () {
			var spy = spyOn(game, "drawRectangle");	
			player.draw();
			expect(spy).toHaveBeenCalledWith('#f00', 100, 100, 10, 10);
			expect(spy.mostRecentCall.args[0]).toBe('#f00');
		});
	});
	describe("Updating the player", function () {
		var player = new CreatifyJS.Player(game);
		var axes = {x: 2, y: 5};
		it("Changes the players position", function () {
			expect(player.x).toBe(100);
			expect(player.y).toBe(100);
			player.update(axes);
			expect(player.x).toBe(102);
			expect(player.y).toBe(105);
		});
	});
	
});