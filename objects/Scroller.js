function Scroller(stage) {
	// Background Sprites
	// TODO: Put in image path.
	var farTexture = PIXI.Texture.fromImage("resources/bg-far.png");
	this.far = new BackgroundScene(
		farTexture,
		farTexture.baseTexture.width,
		farTexture.baseTexture.height,
		0,
		0,
		0.128
	);
	stage.addChild(this.far);

	// TODO: Put in image path.
	var midTexture = PIXI.Texture.fromImage("resources/bg-mid.png");
	this.mid = new BackgroundScene(
		midTexture,
		midTexture.baseTexture.width,
		midTexture.baseTexture.height,
		0,
		128,
		0.64
	);
	stage.addChild(this.mid);
	
	// TODO: Put in image path.
	var nearTexture = PIXI.Texture.fromImage("resources/bg-mid.png");
	this.near = new BackgroundScene(
		nearTexture,
		nearTexture.baseTexture.width,
		nearTexture.baseTexture.height,
		0,
		0,
		0.32
	);
	
	// Interactive Sprites
	this.asteroids = new Asteroids();
	stage.addChild(this.asteroids);
	
	this.enemies = new Enemies();
	stage.addChild(this.enemies);
	
	this.powerUps = new PowerUps();
	stage.addChild(this.powerUps);
	
	this.bullets = new Bullets();
	stage.addChild(this.bullets);
	this.bullets.addNewProtagSprite();
	this.bullets.addNewEnemySprite();

	this.viewportX = 0;
	this.last = 0; //last saved time used to determine when to draw new objects
	this.lastBullet = 0;
}

Scroller.prototype.setViewportX = function(viewportX) {
	this.viewportX = viewportX;
	this.far.setViewportX(viewportX);
	this.mid.setViewportX(viewportX);
};

Scroller.prototype.getViewportX = function() {
	return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(currTime, units) {
	var newViewportX = this.viewportX + units;

	if(currTime - this.last > 1000) {
		this.asteroids.addNewSprite(SpriteType.ASTEROID_SMALL, 400, -100, Math.floor(Math.random() * 4));
		this.last = currTime;
	}
	else if(currTime - this.lastBullet > 300) {
		this.bullets.addNewProtagSprite();
		this.bullets.addNewEnemySprite();
		this.lastBullet = currTime;
	}
	this.bullets.update();
	this.asteroids.update(currTime);

	this.setViewportX(newViewportX);
};

