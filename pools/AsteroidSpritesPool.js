function AsteroidSpritesPool() {
	this.createAsteroids();
}

AsteroidSpritesPool.prototype.borrowAsteroids = function() {
	return this.asteroids.shift();
};

AsteroidSpritesPool.prototype.returnAsteroids = function(sprite) {
	this.asteroids.push(sprite);
};

AsteroidSpritesPool.prototype.createAsteroids = function() {
	this.asteroids = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addAsteroidSprites(6, "resources/KB_lilAsteroid.png");
	this.addAsteroidSprites(6, "resources/KB_MidAsteroid.png");
	this.addAsteroidSprites(6, "resources/KB_BigAsteroid.png");

	this.shuffle(this.asteroids);
};

AsteroidSpritesPool.prototype.addAsteroidSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.asteroids.push(sprite);
	}
};

AsteroidSpritesPool.prototype.shuffle = function(array) {
	var len = array.length;
	var shuffles = len * 3;
	for (var i = 0; i < shuffles; i++)
	{
		var asteroidSprite = array.pop();
		var pos = Math.floor(Math.random() * (len-1));
		array.splice(pos, 0, asteroidSprite);
	}
};