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
	stage.addChild(this.asteroids);
	
	this.enemies = new Enemies();
	stage.addChild(this.enemies);
	
	this.powerUps = new PowerUps();
	stage.addChild(this.powerUps);
	
	this.bullets = new Bullets();
	stage.addChild(this.bullets);
	
	this.explosions = new Explosions();
	stage.addChild(this.explosions);
	this.explosions.addNewSprite(200, 200, 1, ExplosionSprite.NORMAL);
	
	var ship = PIXI.Sprite.fromFrame("resources/KB_ship.png");
	this.player_ship = new PlayerShipSprite(ship);
	this.player_ship.sprite.position.x = 100;
	this.player_ship.sprite.position.y = 100;
	stage.addChild(this.player_ship.sprite);
	
	//creates the bounding box of the hitbox for a player ship
	if(debug) {
		var graphics = new PIXI.Graphics();
		this.player_sails_box = graphics;
		graphics.lineStyle(1, 0xFF0000);
		graphics.drawRect(0, 0, this.player_ship.getSailsWidth(), this.player_ship.getSailsHeight());
		stage.addChild(graphics);
		
		var graphics2 = new PIXI.Graphics();
		this.player_body_box = graphics2;
		graphics2.lineStyle(1, 0xFF0000);
		graphics2.drawRect(0, 0, this.player_ship.getBodyWidth(), this.player_ship.getBodyHeight());
		stage.addChild(graphics2);
	}

	var healthText = new PIXI.Text("Health: 1000 / 1000", {font: " bold 20px Snippet", fill: "white", align: "right"});
	this.healthLabel = healthText;
	healthText.position.x = 10;
	healthText.position.y = 10;
	stage.addChild(healthText);

	this.viewportX = 0;
	this.last = 0; //last saved time used to determine when to draw new objects
	this.lastBullet = 0;
	this.lastCollisionCheck = 0; //used to restrict collision checks to a time frame
}

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
		this.last = currTime;
	}
	else if(currTime - this.lastBullet > 300 && firing) {
		this.bullets.addNewProtagSprite(this.player_ship.getCenterX(), this.player_ship.getCenterY());
		this.bullets.addNewEnemySprite(800, 300);
		this.lastBullet = currTime;
	}
	else if(currTime - this.lastCollisionCheck > 100) {
		this.checkCollision();
		this.lastCollisionCheck = currTime;
	}
	this.bullets.update();
	this.asteroids.update(currTime);
	this.explosions.update(currTime);

	this.setViewportX(newViewportX);
	
	this.updateHealth();
};

Scroller.prototype.updateHealth = function() {
	
	this.healthLabel.setText("Health: " + this.player_ship.health + " / " + this.player_ship.total_health);
};

Scroller.prototype.destroyPlayerShip = function() {
	this.explosions.addNewSprite(this.player_ship.sprite.position.x, this.player_ship.sprite.position.y, 1, ExplosionSprite.NORMAL);
	this.stage.removeChild(this.player_ship.sprite);
	gameover = true;
	this.gameoverTime = new Date().getTime();
	

	
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
				}
			}
		}
	}
}

