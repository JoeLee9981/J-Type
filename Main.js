
//Ship velocities
var vx = 0;
var vy = 0;
var firing = 0;

debug = true;
playing = true;
gameover = false;

//Timer
var d = new Date();
var startTime = d.getTime();

//making this globally accessable so that enemy ships can shoot
var stage;
var bullets;

function Main() {
	
	this.stage = new PIXI.Stage(0x66FF99);
	stage = this.stage; //assign global
	this.renderer = PIXI.autoDetectRenderer(
		800,
		600,
		{view:document.getElementById("game-canvas")}
	);
	setupKeyEvents();
	this.loadSpriteSheet();
}

// TODO: Gradually increment scroll speed.
Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
	
	if(playing) {
		var now = new Date().getTime(); //current time in ms used to control animation speeds
		
		this.scroller.moveViewportXBy(now, Main.SCROLL_SPEED);
		this.renderer.render(this.stage);
		this.updateTimer();
	}
	requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
	var assetsToLoad = [ "resources/jtype-bg-far.png", "resources/jtype-bg-mid.png",
						 "resources/wall.json", "resources/jtype-bg-near.png", "resources/spritesheet.json", 
						 "resources/bg-far.png", "resources/bg-mid.png", 
						 "resources/KB_BigAsteroid.png", "resources/KB_MidAsteroid.png",
						 "resources/KB_lilAsteroid.png", "resources/KB_EnemyBabyShip.png",
						 "resources/KB_EnemyMotherShip.png", "resources/KB_ship.png",
						 "resources/KB_shipfinwithflames.png", "resources/KB_PowerUps_Bomb.png", 
						 "resources/KB_PowerUps_ExtraLife.png", "resources/KB_PowerUps_Health.png", 
						 "resources/KB_PowerUps_Shooting.png", "resources/KB_PowerUps_Speed.png", 
						 "resources/KB_Explosion_frame1.png", "resources/KB_Explosion_frame2.png",
						 "resources/KB_Explosion_frame3.png", "resources/KB_Explosion_frame4.png",
						 "resources/KB_Explosion_frame5.png", "resources/KB_Laserbomb_Aqua.png",
						 "resources/KB_Laserbomb_Red.png", "resources/KB_Laserbullets_Aqua.png",
						 "resources/KB_Laserbullets_Red.png"];
	loader = new PIXI.AssetLoader(assetsToLoad);
	loader.onComplete = this.spriteSheetLoaded.bind(this);
	loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
	this.scroller = new Scroller(this.stage);	
	
	var timerText = new PIXI.Text("Time: 00:00:00", {font: " bold 20px Snippet", fill: "white", align: "right"});
	this.timeLabel = timerText;
	timerText.position.x = 650;
	timerText.position.y = 10;
	this.stage.addChild(timerText);
	
	requestAnimFrame(this.update.bind(this));

};


Main.prototype.updateTimer = function() {
	var d = new Date();
	var currTime = d.getTime();
	var elapsed = currTime - startTime;
	var seconds = parseInt((elapsed / 1000) % 60);
	var minutes = parseInt((elapsed / (1000 * 60)) % 60);
	var hours = parseInt((elapsed / (1000 * 3600)) % 24);
	
	if(seconds < 10)
		seconds = '0' + seconds;
	if(minutes < 10)
		minutes = '0' + minutes;
	if(hours < 10)
		hours = '0' + hours;
	
	this.timeLabel.setText("Time: " + hours + ":" + minutes + ":" + seconds);
}


/******************** Key Event Handlers ********************/

/*
 *	Key Handler was referenced from 
 *		https://github.com/kittykatattack/learningPixi#keyboard
 
		There are also other useful tutorials there
 */


function setupKeyEvents() {
	var left = keyboard(37);
	var right = keyboard(39);
	var up = keyboard(38);
	var down = keyboard(40);
	var space = keyboard(32);
	
	space.press = function() {
		firing = 1;
	}
	
	space.release = function() {
		firing = 0;
	}
	
	left.press = function() {
		vx = -1;
	}
	
	left.release = function() {
		if(!right.isDown) {
			vx = 0;
		}
	}
	
	right.press = function() {
		vx = 1;
	}
	
	right.release = function() {
		if(!left.isDown) {
			vx = 0;
		}
	}
	
	up.press = function() {
		vy = -1;
	}
	
	up.release = function() {
		if(!down.isDown) {
			vy = 0;
		}
	}
	
	down.press = function() {
		vy = 1;
	}
	
	down.release = function() {
		if(!up.isDown) {
			vy = 0;
		}
	}
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
	  event.preventDefault();
    }
    
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
	  event.preventDefault();
    }

  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}
