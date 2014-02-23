(function() {

	var OPTIONS = {
		FPS : 20,
		MOUSE_OVER_FREQUENZY : 20,
		AUDIO_PATH : "resources/sounds/"
	}

	function initSounds() {
		var manifest = [
			{id:"kameli", src:"kameli.ogg"},
			{id:"karamalli", src:"karamalli.ogg"},
			{id:"karvat", src:"karvat.ogg"},
			{id:"muodot", src:"muodot.ogg"},
			{id:"mursu", src:"mursu.ogg"},
			{id:"kurvit", src:"kurvit.ogg"},
			{id:"mursukameli", src:"mursukameli.ogg"},
			{id:"salakameli", src:"salakameli.ogg"},
			{id:"turska", src:"turska.ogg"}
		];
    	
    	createjs.Sound.registerManifest(manifest, OPTIONS.AUDIO_PATH);
	}

	initSounds();
	
	function createCircle(i) {
		var circle = new createjs.Shape();

		var baseColor = "red",
			overColor = "#ABCDEF";

		circle.x = 10+ 50*i;
		circle.y = 150;
		circle.size = 50;

		circle.graphics.beginFill(baseColor).drawCircle(0, 0, circle.size);

		circle.addEventListener("click", function(event) {
			event.target.size = event.target.size + 10; 
  			event.target.graphics.clear()
  			 			 .beginFill("blue")
  			 			 .drawCircle(0, 0, event.target.size + 10)
  			 			 .endFill();
		});

		circle.addEventListener("mouseout", function(event) {  
  			 event.target.graphics.clear()
  			 			 .beginFill(baseColor)
  			 			 .drawCircle(0, 0, event.target.size)
  			 			 .endFill();
		});


		circle.addEventListener("mouseover", function(event) {  
  			 event.target.graphics.clear()
  			 			 .beginFill(overColor)
  			 			 .drawCircle(0, 0, event.target.size)
  			 			 .endFill();
		});


		return circle;
	}

	$(function() {

		var stage = new createjs.Stage("KeinuPalloCanvas");

		stage.enableMouseOver(OPTIONS.MOUSE_OVER_FREQUENZY);

 		var totoro = new Image();	

    	totoro.src    = 'resources/images/totoro.gif';

    	totoro.onload = function() {
		   	var bitmap = new createjs.Bitmap(totoro);
		    bitmap.x = 20;
		    bitmap.y = 20;
		    stage.addChild(bitmap);
    	};

    	var circles = [];

    	var i = 0;

    	for(i; i<20; i++) {
    		var circle = createCircle(i)
    		circles.push(circle);
    		stage.addChild(circle);
    	}

		createjs.Ticker.addEventListener("tick", function(event) {
			
			_.each(circles, function(circle) {
				circle.x += event.delta / 1000 * 100;
				circle.y += 7 * Math.sin(circle.x/20);
				if (circle.x > stage.canvas.width+ 50 ) { circle.x = -50; }
			});

			stage.update();
		});

		createjs.Ticker.setFPS(OPTIONS.FPS);

		stage.update();

		$('button').click(function() {
			if (!createjs.Sound.initializeDefaultPlugins()) { return; }
			createjs.Sound.play($(this).attr('id'));
		})
	});
}());