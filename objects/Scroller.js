//Timer
var startTime;

function Scroller(stage) {
	
	this.stage = stage;
	
	// Background Sprites
	var farTexture = PIXI.Texture.fromImage("resources/jtype-bg-far.png");
	this.far = new BackgroundScene(
		farTexture,
		farTexture.baseTexture.width,
		farTexture.baseTexture.height,
		0,
		0,
		0.09
	);
	

	// TODO: Put in image path.
	var midTexture = PIXI.Texture.fromImage("resources/jtype-bg-mid.png");
	this.mid = new BackgroundScene(
		midTexture,
		midTexture.baseTexture.width,
		midTexture.baseTexture.height,
		0,
		0,
		0.3
	);
	
	
	// TODO: Put in image path.
	var nearTexture = PIXI.Texture.fromImage("resources/jtype-bg-near.png");
	this.near = new BackgroundScene(
		nearTexture,
		nearTexture.baseTexture.width,
		nearTexture.baseTexture.height,
		0,
		0,
		0.6
	);
	stage.addChild(this.far);
	stage.addChild(this.mid);
	stage.addChild(this.near);
	
	// Interactive Sprites
	this.asteroids = new Asteroids();
	
	this.enemies = new Enemies();
	
	this.powerUps = new PowerUps();
	
	this.bullets = new Bullets();
	bullets = this.bullets; //assign global for access
	
	this.explosions = new Explosions();
	
	var ship = PIXI.Sprite.fromFrame("resources/KB_ship.png");
	this.player_ship = new PlayerShipSprite(ship);
	this.player_ship.sprite.position.x = 100;
	this.player_ship.sprite.position.y = 100;
	
	//creates the bounding box of the hitbox for a player ship
	if(debug) {
		this.graphics = new PIXI.Graphics();
		this.player_sails_box = this.graphics;
		this.graphics.lineStyle(1, 0xFF0000);
		this.graphics.drawRect(0, 0, this.player_ship.getSailsWidth(), this.player_ship.getSailsHeight());
		
		this.graphics2 = new PIXI.Graphics();
		this.player_body_box = this.graphics2;
		this.graphics2.lineStyle(1, 0xFF0000);
		this.graphics2.drawRect(0, 0, this.player_ship.getBodyWidth(), this.player_ship.getBodyHeight());
	}

	this.healthText = new PIXI.Text("Health: 1000 / 1000", {font: " bold 20px Snippet", fill: "white", align: "right"});
	this.healthLabel = this.healthText;
	this.healthText.position.x = 10;
	this.healthText.position.y = 10;

	this.viewportX = 0;
	this.last = 0; //last saved time used to deteryyine when to draw new objects
	this.lastBullet = 0;
	this.lastCollisionCheck = 0; //used to restrict collision checks to a time frame
	
	this.displayTitleScreen();
}

Scroller.prototype.beginGame = function() {
	// Remove old sprites
	stage.removeChild(this.jTypeLogo);
	stage.removeChild(this.jTypeCredits);
	stage.removeChild(this.playButton);
	stage.removeChild(this.scoresButton);

	// Interactive Sprites
	stage.addChild(this.asteroids);
	stage.addChild(this.enemies);
	stage.addChild(this.powerUps);
	stage.addChild(this.bullets);
	stage.addChild(this.explosions);
	stage.addChild(this.player_ship.sprite);
	
	//creates the bounding box of the hitbox for a player ship
	if(debug) {
		stage.addChild(this.graphics);		
		stage.addChild(this.graphics2);
	}
	
	stage.addChild(this.healthText);
	
	this.startTimer();
};

Scroller.prototype.displayTitleScreen = function() {
	// Display logo.
	this.jTypeLogo = PIXI.Sprite.fromImage("resources/jtype_logo.png");
	stage.addChild(this.jTypeLogo);
	this.jTypeLogo.position.x = 20;
	this.jTypeLogo.position.y = 0;

	// Display credits.
	this.jTypeCredits = PIXI.Sprite.fromImage("resources/credits.png");
	stage.addChild(this.jTypeCredits);
	this.jTypeCredits.position.x = 0;
	this.jTypeCredits.position.y = 500;
	
	/* Button tutorial code: http://www.goodboydigital.com/pixijs/examples/6/ */
	
	// Display and set "play" button.
	var playTexture = PIXI.Texture.fromImage("resources/play_button.png");
	var playTextureHover = PIXI.Texture.fromImage("resources/play_button_hover.png");
	this.playButton = new PIXI.Sprite(playTexture);	
	this.playButton.position.x = 200;
	this.playButton.position.y = 300;
	this.playButton.interactive = true;
	
	// Set click/touch and mouseover/out callbacks.
	this.playButton.mouseup = this.playButton.touchend = function(data){		
		scroller.beginGame();
	}

	this.playButton.mouseover = function(data){
		this.setTexture(playTextureHover);
	}
	
	this.playButton.mouseout = function(data){
		this.setTexture(playTexture)
	}
	
	stage.addChild(this.playButton);
	
	// Display and set "scores" button.	
	var scoresTexture = PIXI.Texture.fromImage("resources/scores_button.png");
	var scoresTextureHover = PIXI.Texture.fromImage("resources/scores_button_hover.png");
	this.scoresButton = new PIXI.Sprite(scoresTexture);	
	this.scoresButton.position.x = 200;
	this.scoresButton.position.y = 400;
	this.scoresButton.interactive = true;
	
	// Set click/touch and mouseover/out callbacks.
	this.scoresButton.mouseup = this.scoresButton.touchend = function(data){
		var win = window.open("scores.html", '_blank');
	}

	this.scoresButton.mouseover = function(data){		
		this.setTexture(scoresTextureHover);
	}
	
	this.scoresButton.mouseout = function(data){
		this.setTexture(scoresTexture)
	}
	
	stage.addChild(this.scoresButton);
};

Scroller.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.far.setViewportX(viewportX);
	this.mid.setViewportX(viewportX);
	this.near.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
	return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(currTime, units) {
	if(this.timeLabel)
		this.updateTimer();

	if(gameover && currTime - this.gameoverTime > 500) {
		playing = false;
	}
	
	var newViewportX = this.viewportX + units;
	this.player_ship.update(currTime, vx, vy);
	
	if(debug) {
		//draws a box around the player's ship where collision occurs
		this.player_sails_box.position.x = this.player_ship.getSailsX();
		this.player_sails_box.position.y = this.player_ship.getSailsY();
		this.player_body_box.position.x = this.player_ship.getBodyX();
		this.player_body_box.position.y = this.player_ship.getBodyY();
	}
	if(currTime - this.last > 1000) {
		this.asteroids.addNewSprite(Math.floor(Math.random() * 3), Math.floor(Math.random() * 4));
		this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_1, .4);
		this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_2, .4);
		this.last = currTime;
	}
	else if(currTime - this.lastBullet > 300 && firing) {
		this.bullets.addNewProtagSprite(this.player_ship.getCenterX(), this.player_ship.getCenterY());
		this.lastBullet = currTime;
	}
	else if(currTime - this.lastCollisionCheck > 100) {
		this.checkCollision();
		this.lastCollisionCheck = currTime;
	}
	this.bullets.update();
	this.asteroids.update(currTime);
	this.explosions.update(currTime);
	this.enemies.update(currTime);

	this.setViewportX(newViewportX);
	
	this.updateHealth();
};

Scroller.prototype.updateHealth = function() {
	
	this.healthLabel.setText("Health: " + this.player_ship.health + " / " + this.player_ship.total_health);
};

Scroller.prototype.destroyPlayerShip = function() {
	//this.explosions.addNewSprite(this.player_ship.sprite.position.x, this.player_ship.sprite.position.y, 1, ExplosionSprite.NORMAL);
	//this.stage.removeChild(this.player_ship.sprite);
	//gameover = true;
	//this.gameoverTime = new Date().getTime();
	

	
};

Scroller.prototype.destroyAsteroid = function(asteroid) {
	//returns health, so on a 0 we need to do an explosion
	var scale = 1;
	if(asteroid.type == SpriteType.ASTEROID_SMALL) {
		scale = .35;
	}
	else if(asteroid.type == SpriteType.ASTEROID_MID) {
		scale = .6;
		//medium asteroids split into two small when destroyed
		this.asteroids.addNewSpriteOvrrideXAndY(SpriteType.ASTEROID_SMALL, asteroid.sprite.position.x, asteroid.sprite.position.y, 0);
		this.asteroids.addNewSpriteOvrrideXAndY(SpriteType.ASTEROID_SMALL, asteroid.sprite.position.x, asteroid.sprite.position.y, Math.floor(Math.random() * 2) + 2);
	}
	else if(asteroid.type == SpriteType.ASTEROID_LARGE) {
		//large asteroids split into a medium and two small when destroyed
		this.asteroids.addNewSpriteOvrrideXAndY(SpriteType.ASTEROID_MID, asteroid.sprite.position.x, asteroid.sprite.position.y, 0);
		this.asteroids.addNewSpriteOvrrideXAndY(SpriteType.ASTEROID_SMALL, asteroid.sprite.position.x, asteroid.sprite.position.y, 2);
		this.asteroids.addNewSpriteOvrrideXAndY(SpriteType.ASTEROID_SMALL, asteroid.sprite.position.x, asteroid.sprite.position.y, 3);
	}
	this.explosions.addNewSprite(asteroid.sprite.position.x - asteroid.sprite.width / 2, asteroid.sprite.position.y - asteroid.sprite.height / 2, scale, ExplosionSprite.NORMAL);
};

Scroller.prototype.checkCollision = function() {
	
	/*
	 * Check collision with asteroids and player ship
	 */
	for(var i = 0; i < this.asteroids.sprites.length; i++) {
		var asteroid = this.asteroids.sprites[i];
		if(asteroid.sprite != null) {
			//while iterating the asteroids, check collision with player ship
			if(asteroid.checkCollision(this.player_ship.getSailsX(), 
									   this.player_ship.getSailsY(),
									   this.player_ship.getSailsWidth(),
									   this.player_ship.getSailsHeight())) {
				//damage ship
				if(!this.player_ship.damage(asteroid.power)) {
					//ship is destroyed	
					this.destroyPlayerShip();
				}
				//damage the asteroid
				if(!asteroid.damage(this.player_ship.hull_power)) {
					this.destroyAsteroid(asteroid);
				}
			}
			else if(asteroid.checkCollision(this.player_ship.getBodyX(), 
										   this.player_ship.getBodyY(),
										   this.player_ship.getBodyWidth(),
										   this.player_ship.getBodyHeight())) {
				//damage ship
				if(!this.player_ship.damage(asteroid.power)) {
					//ship is destroyed
					this.destroyPlayerShip();
				} 	
				//damage the asteroid
				if(!asteroid.damage(this.player_ship.hull_power)) {
					this.destroyAsteroid(asteroid);
				}
			}
		}
	}
	
	//check bullets collide with objects
	for(var i = 0; i < this.bullets.protagSprites.length; i++) {
		var bullet = this.bullets.protagSprites[i];
		
		if(bullet.sprite == null)
			continue;
		
		for(var j = 0; j < this.asteroids.sprites.length; j++) {
			
			var asteroid = this.asteroids.sprites[j];
			if(asteroid.sprite != null) {
				
				//check collision with bullets
				if(asteroid.checkCollision(bullet.sprite.position.x, 
										   bullet.sprite.position.y, 
										   bullet.sprite.width, 
										   bullet.sprite.height)) {
					   	
					if(!asteroid.damage(this.player_ship.power)) {
						this.destroyAsteroid(asteroid);
					}
					
					bullet.destroy = true;
					this.explosions.addNewSprite(bullet.getCenterX() + 10, bullet.getCenterY(), .25, ExplosionSprite.FAST);
					break; //bullet is destroyed, no longer allowed to collide with other objects
				}
			}
		}
	}
};

Scroller.prototype.startTimer = function() {	
	var timerText = new PIXI.Text("Time: 00:00:00", {font: " bold 20px Snippet", fill: "white", align: "right"});
	this.timeLabel = timerText;
	timerText.position.x = 650;
	timerText.position.y = 10;
	this.stage.addChild(timerText);
	
	startTime = new Date().getTime();
};

Scroller.prototype.updateTimer = function() {
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
};

