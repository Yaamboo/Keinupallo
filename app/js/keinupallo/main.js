(function() {
	$(function() {
		var stage = new createjs.Stage("KeinuPalloCanvas");

		var circle = new createjs.Shape();
		
		circle.graphics.beginFill("red").drawCircle(0, 0, 50);
		circle.x = 100;
		circle.y = 100;

		stage.addChild(circle);

		stage.update();

		console.log("skdjfls");
	});
}());