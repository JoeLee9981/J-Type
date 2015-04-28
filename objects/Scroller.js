//Timer
var startTime;
var player;

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
	

	var midTexture = PIXI.Texture.fromImage("resources/jtype-bg-mid.png");
	this.mid = new BackgroundScene(
		midTexture,
		midTexture.baseTexture.width,
		midTexture.baseTexture.height,
		0,
		0,
		0.3
	);
	
	
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
	this.player_ship.sprite.position.x = 0;
	this.player_ship.sprite.position.y = 275;
	player = this.player_ship;
	
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

	this.drawLabels();

	this.viewportX = 0;
	this.lastAsteroid = 0; //last saved time used to determine when to draw new objects
	this.lastBullet = 0;
	this.lastCollisionCheck = 0; //used to restrict collision checks to a time frame
	this.ships = false;
	this.lastShipInterval = 0;
	this.lastShipTime = 0;
	this.shipPatterns = 0;
	this.lastBomb = 0;
	this.displayTitleScreen();
}

Scroller.prototype.beginGame = function() {
	titleScreen = false;

	// Remove old sprites
	stage.removeChild(this.jTypeLogo);
	stage.removeChild(this.jTypeCredits);
	stage.removeChild(this.playButton);
	stage.removeChild(this.scoresButton);

	// Interactive Sprites
	stage.addChild(this.player_ship.sprite);
	stage.addChild(this.asteroids);
	stage.addChild(this.enemies);
	stage.addChild(this.powerUps);
	stage.addChild(this.bullets);
	stage.addChild(this.explosions);
	
	//this.powerUps.addNewSprite(PowerUpSprite.BOMB_POWERUP, 700, 100);
	//this.powerUps.addNewSprite(PowerUpSprite.EXTRA_LIFE_POWERUP, 700, 200);
	//this.powerUps.addNewSprite(PowerUpSprite.HEALTH_POWERUP, 700, 300);
	//this.powerUps.addNewSprite(PowerUpSprite.SHOOT_POWERUP, 700, 400);
	//this.powerUps.addNewSprite(PowerUpSprite.SPEED_POWERUP, 700, 500);
	
	//creates the bounding box of the hitbox for a player ship
	if(debug) {
		stage.addChild(this.graphics);		
		stage.addChild(this.graphics2);
	}
	
	stage.addChild(this.topBar);
	stage.addChild(this.bottomBar);
	stage.addChild(this.healthLabel);
	stage.addChild(this.powerLabel);
	stage.addChild(this.speedLabel);
	stage.addChild(this.bombLabel);
	stage.addChild(this.shipsLabel);
	this.startTimer();
};

Scroller.prototype.displayTitleScreen = function() {
	// Display logo.
	this.jTypeLogo = PIXI.Sprite.fromImage("resources/jtype_logo.png");
	stage.addChild(this.jTypeLogo);
	this.jTypeLogo.position.x = 0;
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

	if(!this.speed){
		this.speed = 10000;
	}

	if(this.timeLabel)
		this.updateTimer();

	if(gameover && currTime - this.gameoverTime > 500) {
		playing = false;
	}
	if(currTime -  startTime - 15000 > 1000 && currTime -  startTime - 15000 <= 1400){
		//this.enemies.addNewSpriteOverrideXAndY(EnemySprite.MOTHER_SHIP, 400, 300, EnemySprite.PATTERN_5, .8);
		this.speed -= 2000;
	}
	if(currTime -  startTime - 30000 > 1000 && currTime -  startTime - 30000 <= 1400){
		this.speed -= 2000;
	}
	if(currTime -  startTime - 45000 > 1000 && currTime -  startTime - 45000 <= 1400){
		this.speed -= 2000;
	}
	if(currTime -  startTime - 100000 > 1000 && currTime -  startTime - 100000 <= 1400){
		this.speed -= 2000;
	}
	var newViewportX = this.viewportX + units;
	this.player_ship.update(currTime, vx, vy);
	
	if(!titleScreen) {
		if(debug) {
			//draws a box around the player's ship where collision occurs
			this.player_sails_box.position.x = this.player_ship.getSailsX();
			this.player_sails_box.position.y = this.player_ship.getSailsY();
			this.player_body_box.position.x = this.player_ship.getBodyX();
			this.player_body_box.position.y = this.player_ship.getBodyY();
		}
		if(this.ships == false && this.lastShipInterval == 0) {
			this.lastShipInterval = currTime;
		}
		else if(this.ships == false && currTime - this.lastShipInterval > this.speed) {
			this.ships = true;
			this.lastShipInterval = currTime;
		}
		else if(this.ships == true && currTime - this.lastShipInterval > this.speed) {
			this.ships = false;
			this.lastShipInterval = currTime;
			this.shipPatterns++;
			if(this.shipPatterns > 2)
				this.shipPatterns = 0;
			console.log("Setting ship patterns to: " + this.shipPatterns)
		}
		else if(this.ships == true && currTime - this.lastShipTime > 1000) {
			if(this.shipPatterns == 0) {
				
				var pattern = EnemySprite.BABY;
				if(Math.random() * 100 > 90) {
					pattern = EnemySprite.SPECIAL;
				}
				this.enemies.addNewSprite(pattern, EnemySprite.PATTERN_1, .4);
				this.enemies.addNewSprite(pattern, EnemySprite.PATTERN_2, .4);
			}
			else if(this.shipPatterns == 1) {
				var pattern = EnemySprite.BABY;
				if(Math.random() * 100 > 90) {
					pattern = EnemySprite.SPECIAL;
				}
				this.enemies.addNewSprite(pattern, EnemySprite.PATTERN_3, .4);
				this.enemies.addNewSprite(pattern, EnemySprite.PATTERN_4, .4);
			}
			else if(this.shipPatterns == 2) {
				var pattern = EnemySprite.BABY;
				if(Math.random() * 100 > 90) {
					pattern = EnemySprite.SPECIAL;
				}
				this.enemies.addNewSprite(pattern, EnemySprite.PATTERN_5, .4);
				this.enemies.addNewSprite(pattern, EnemySprite.PATTERN_6, .4);
			}
			this.lastShipTime = currTime;
		}
		
		if(currTime - this.lastAsteroid > 2000) {
			this.asteroids.addNewSprite(Math.floor(Math.random() * 3), Math.floor(Math.random() * 4));
			this.powerUps.addNewSprite(PowerUpSprite.SHOOT_POWERUP, 700, 400);
			this.powerUps.addNewSprite(PowerUpSprite.EXTRA_LIFE_POWERUP, 700, 430);
			this.powerUps.addNewSprite(PowerUpSprite.HEALTH_POWERUP, 700, 460);
			this.lastAsteroid = currTime;
		}
		/*if(currTime - this.lastShipInterval % 6000 >= 0 || currTime - this.lastShipInterval % 6000 < 2000 ) {
			if(currTime - this.lastShipTime > 1000) {
				this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_1, .4);
				this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_2, .4);
				this.lastShipTime = currTime;
			}
		}
		if(currTime - this.lastShipInterval % 6000 >= 4000 || currTime - this.lastShipInterval % 6000 < 6000 ) {
			if(currTime - this.lastShipTime > 1000) {
				this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_5, .4);
				this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_6, .4);
				this.lastShipTime = currTime;
			}
		}*/
		if(currTime - this.lastBullet > 300 && firing) {
			this.bullets.addNewProtagSprite(this.player_ship.getCenterX(), this.player_ship.getCenterY(), this.player_ship.bulletScale);
			//power up
			if(this.player_ship.powerUp >= 3)
				this.bullets.addNewProtagSprite(this.player_ship.getCenterX() - 25, this.player_ship.getCenterY() - 25, this.player_ship.bulletScale);
			if(this.player_ship.powerUp == 5)
				this.bullets.addNewProtagSprite(this.player_ship.getCenterX() - 25, this.player_ship.getCenterY() + 25, this.player_ship.bulletScale);
			this.lastBullet = currTime;
		}
		else if(!titleScreen && (currTime - this.lastCollisionCheck > 100)) {
			this.checkCollision();
			this.lastCollisionCheck = currTime;
		}
		this.bullets.update();
		this.asteroids.update(currTime);
		this.explosions.update(currTime);
		this.enemies.update(currTime);
		this.powerUps.update();	
		this.updateHealth();
		this.updatePower();
	}
	
	if(currTime - this.lastAsteroid > 2000) {
		this.asteroids.addNewSprite(Math.floor(Math.random() * 3), Math.floor(Math.random() * 4));
		this.powerUps.addNewSprite(PowerUpSprite.SHOOT_POWERUP, 700, 400);
		this.powerUps.addNewSprite(PowerUpSprite.BOMB_POWERUP, 700, 430);
		this.powerUps.addNewSprite(PowerUpSprite.HEALTH_POWERUP, 700, 460);
		this.lastAsteroid = currTime;
	}
	/*if(currTime - this.lastShipInterval % 6000 >= 0 || currTime - this.lastShipInterval % 6000 < 2000 ) {
		if(currTime - this.lastShipTime > 1000) {
			this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_1, .4);
			this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_2, .4);
			this.lastShipTime = currTime;
		}
	}
	if(currTime - this.lastShipInterval % 6000 >= 4000 || currTime - this.lastShipInterval % 6000 < 6000 ) {
		if(currTime - this.lastShipTime > 1000) {
			this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_5, .4);
			this.enemies.addNewSprite(EnemySprite.BABY, EnemySprite.PATTERN_6, .4);
			this.lastShipTime = currTime;
		}
	}*/
	if(currTime - this.lastBullet > this.player_ship.fireSpeed && firing) {
		
		//set power bullets
		var power = false;
		if(this.player_ship.powerUp == 6) {
			power = true;	
		}
		this.bullets.addNewProtagSprite(this.player_ship.getCenterX(), this.player_ship.getCenterY(), this.player_ship.bulletScale, power);
		//power up bullets
		if(this.player_ship.powerUp >= 3) {
			this.bullets.addNewProtagSprite(this.player_ship.getCenterX() - 25, this.player_ship.getCenterY() - 25, this.player_ship.bulletScale, power);
		}
		if(this.player_ship.powerUp >= 5) {
			this.bullets.addNewProtagSprite(this.player_ship.getCenterX() - 25, this.player_ship.getCenterY() + 25, this.player_ship.bulletScale, power);
			
		}

		this.lastBullet = currTime;
	}
	//if fire bomb button pressed and refresh is up
	if(this.player_ship.bombs && currTime - this.lastBomb > this.player_ship.bombFireSpeed && fire_bomb) {
		this.player_ship.bombs--; //decrement bombs
		if(this.player_ship.bombPower == 600) {
			//power bomb
			this.bullets.addNewBombSprite(this.player_ship.getCenterX(), this.player_ship.getCenterY(), 1, true);
		}
		else {
			//normal bomb
			this.bullets.addNewBombSprite(this.player_ship.getCenterX(), this.player_ship.getCenterY(), 1, false);
		}
		this.lastBomb = currTime
	}
	
	if(currTime - this.lastCollisionCheck > 100) {
		this.checkCollision();
		this.lastCollisionCheck = currTime;
	}
	this.bullets.update();
	this.asteroids.update(currTime);
	this.explosions.update(currTime);
	this.enemies.update(currTime);
	this.powerUps.update();

Scroller.prototype.drawLabels = function() {
	// Draw top and bottom bars.
	this.topBar = PIXI.Sprite.fromImage("resources/top_bar.png");	
	this.topBar.position.x = 0;
	this.topBar.position.y = 0;
	
	this.bottomBar = PIXI.Sprite.fromImage("resources/bottom_bar.png");
	this.bottomBar.position.x = 0;
	this.bottomBar.position.y = 565;

	// Draw text.
	var healthText = new PIXI.Text("1000 / 1000", {font: " bold 20px Snippet", fill: "white", align: "right"});
	this.healthLabel = healthText;
	healthText.position.x = 145;
	healthText.position.y = 9;
	
	var speedText = new PIXI.Text("x3", {font: " bold 20px Snippet", fill: "white", align: "left"});
	this.speedLabel = speedText;
	this.speedLabel.position.x = 55;
	this.speedLabel.position.y = 570;
		
	var powerText = new PIXI.Text("x1", {font: " bold 20px Snippet", fill: "white", align: "left"});
	this.powerLabel = powerText;
	this.powerLabel.position.x = 150;
	this.powerLabel.position.y = 570;
	
	var shipsText = new PIXI.Text("x3", {font: " bold 20px Snippet", fill: "white", align: "right"});
	this.shipsLabel = shipsText;
	shipsText.position.x = 350;
	shipsText.position.y = 570;
	
	var bombText = new PIXI.Text("x0", {font: " bold 20px Snippet", fill: "white", align: "left"});
	this.bombLabel = bombText;
	this.bombLabel.position.x = 450;
	this.bombLabel.position.y = 570;
};

Scroller.prototype.updateHealth = function() {
	
	this.healthLabel.setText(this.player_ship.health + " / " + this.player_ship.total_health);
};

Scroller.prototype.updatePower = function() {
	
	this.powerLabel.setText("x" + this.player_ship.power);
	this.speedLabel.setText("x" + this.player_ship.speed);
	this.bombLabel.setText("x" + this.player_ship.bombs);
	this.shipsLabel.setText("x" + this.player_ship.lives);
};

Scroller.prototype.destroyPlayerShip = function() {
	this.player_ship.lives--;
	
	if(this.player_ship.lives == 0) {
		//gameover = true;
		//this.gameoverTime = new Date().getTime();
		//this.stage.removeChild(this.player_ship.sprite);
	}
	
	this.shipsLabel.setText("Ships: " + this.player_ship.lives);
	//this.explosions.addNewSprite(this.player_ship.sprite.position.x, this.player_ship.sprite.position.y, 1, ExplosionSprite.NORMAL);
	//this.player_ship.reset();
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

Scroller.prototype.destroyEnemy = function(enemy) {
	//returns health, so on a 0 we need to do an explosion
	var scale = .6;
	var type = Math.floor(Math.random() * 5);
	if(enemy.type == EnemySprite.SPECIAL) {
		this.powerUps.addNewSprite(type, enemy.sprite.position.x, enemy.sprite.position.y);
	}
	this.explosions.addNewSprite(enemy.sprite.position.x - enemy.sprite.width / 2, enemy.sprite.position.y - enemy.sprite.height / 2, scale, ExplosionSprite.NORMAL);
};

Scroller.prototype.checkCollision = function() {
	
	/*
	 * Check collision with asteroids and player ship
	 */
	for(var i = 0; i < this.asteroids.sprites.length; i++) {
		var asteroid = this.asteroids.sprites[i];
		if(asteroid.sprite != null) {
			//check collision with player ship
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
	
	/*
	 * Check collision with enemy bullets and player ship
	 */
	for(var i = 0; i < this.bullets.enemySprites.length; i++) {
		var bullet = this.bullets.enemySprites[i];
		if(bullet.sprite != null) {
			//check collision with player ship
			if(this.player_ship.checkCollision(bullet.sprite.position.x, 
										       bullet.sprite.position.y,
									   		   bullet.sprite.width,
									  		   bullet.sprite.height)) {
				//damage ship
				if(!this.player_ship.damage(bullet.power)) {
					//ship is destroyed	
					this.destroyPlayerShip();
				}
				bullet.destroy = true;
				this.explosions.addNewSprite(bullet.getCenterX() - 10, bullet.getCenterY(), .25, ExplosionSprite.FAST);
				console.log("Player Ship destroyed");
			}
		}
	}
	
	/*
	 * Check collision with enemies and player ship
	 */
	for(var i = 0; i < this.enemies.sprites.length; i++) {
		var enemy = this.enemies.sprites[i];
		if(enemy.sprite != null) {
			//cloaked ships can't collide
			if(enemy.cloaked) {
				continue;
			}
			
			//check collision with player ship
			if(this.player_ship.checkCollision(enemy.sprite.position.x, 
									   		   enemy.sprite.position.y,
									   		   enemy.sprite.width,
									   		   enemy.sprite.height)) {
				//damage ship
				if(!this.player_ship.damage(enemy.hull_power)) {
					//ship is destroyed	
					this.destroyPlayerShip();
				}
				//damage the enemy
				if(!enemy.damage(this.player_ship.hull_power)) {
					this.destroyEnemy(enemy);
				}
			}
		}
	}
	
	/*
	 * Check collision with powerups and player ship
	 */
	for(var i = 0; i < this.powerUps.sprites.length; i++) {
		var powerUp = this.powerUps.sprites[i];
		if(powerUp.sprite != null) {
			//check collision with player ship
			if(this.player_ship.checkCollision(powerUp.sprite.position.x, 
									   		   powerUp.sprite.position.y,
									   		   powerUp.sprite.width,
									   		   powerUp.sprite.height)) {

				powerUp.doPowerUp(this.player_ship);
			}
		}
	}
	
	//check bullets collide with objects
	for(var i = 0; i < this.bullets.protagSprites.length; i++) {
		var bullet = this.bullets.protagSprites[i];
		var collided = false;
		
		//bullet is null, skip it
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
					var collided = true;
					break; //bullet is destroyed, no longer allowed to collide with other objects
				}
			}
		}
		
		if(collided) {
			continue; //this already collided, so move immediately to next bullet
		}
		
		for(var j = 0; j < this.enemies.sprites.length; j++) {
			var enemy = this.enemies.sprites[j];
			if(enemy.sprite != null) {
				if(enemy.checkCollision(bullet.sprite.position.x, 
										bullet.sprite.position.y, 
										bullet.sprite.width, 
										bullet.sprite.height)) {
			   		if(!enemy.damage(this.player_ship.power)) {
							this.destroyEnemy(enemy);	
					}
					bullet.destroy = true;
					this.explosions.addNewSprite(bullet.getCenterX() + 10, bullet.getCenterY(), .25, ExplosionSprite.FAST);
					var collided = true;
					break; //bullet is destroyed, no longer allow it to collide with anything else
				}
			}
		}
	}
};

Scroller.prototype.startTimer = function() {	
	var timerText = new PIXI.Text("00:00:00", {font: " bold 20px Snippet", fill: "white", align: "right"});
	this.timeLabel = timerText;
	timerText.position.x = 650;
	timerText.position.y = 9;
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
	
	this.timeLabel.setText(hours + ":" + minutes + ":" + seconds);
};

