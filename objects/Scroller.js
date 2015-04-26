function Scroller(stage) {
	// Background Sprites
	// TODO: Put in image path.
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

	this.viewportX = 0;
	this.last = 0; //last saved time used to determine when to draw new objects
	this.lastBullet = 0;
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
	var newViewportX = this.viewportX + units;
	this.player_ship.update(currTime, vx, vy);
	if(currTime - this.last > 1000) {
		this.asteroids.addNewSprite(SpriteType.ASTEROID_SMALL, 400, -100, Math.floor(Math.random() * 4));
		this.last = currTime;
	}
	else if(currTime - this.lastBullet > 300 && firing) {
		this.bullets.addNewProtagSprite(this.player_ship.getCenterX(), this.player_ship.getCenterY());
		this.bullets.addNewEnemySprite(800, 300);
		this.lastBullet = currTime;
	}
	this.bullets.update();
	this.asteroids.update(currTime);
	this.explosions.update(currTime);

	this.setViewportX(newViewportX);
	this.checkCollision();
};

Scroller.prototype.checkCollision = function() {
	//check bullets collide with objects
	for(var i = 0; i < this.bullets.protagSprites.length; i++) {
		var bullet = this.bullets.protagSprites[i];
		
		if(bullet.sprite == null)
			continue;
		
		for(var j = 0; j < this.asteroids.sprites.length; j++) {
			
			var asteroid = this.asteroids.sprites[j];
			if(asteroid.sprite != null) {
				if(asteroid.checkCollision(bullet.sprite.position.x, 
										   bullet.sprite.position.y, 
										   bullet.sprite.width, 
										   bullet.sprite.height)) {
					if(!asteroid.damage()) {
						//returns health, so on a 0 we need to do an explosion
						var scale = 1;
						/*if(asteroid.type == SpriteType.ASTEROID_SMALL)
							scale = .35;
						else if(asteroid.type == SpriteType.ASTEROID_MID)
							scale = .6;*/
						this.explosions.addNewSprite(asteroid.sprite.position.x, asteroid.sprite.position.y, scale, ExplosionSprite.NORMAL);
					}
					
					bullet.destroy = true;
					this.explosions.addNewSprite(bullet.getCenterX() + 10, bullet.getCenterY(), .25, ExplosionSprite.FAST);
				}
			}
		}
	}
}

