/**
 *	A Pool of instantiated asteroid sprites to be used 
 */
function AsteroidSpritesPool() {
	this.createAsteroids();
}

/**
 *	Gets an asteroid from the pool 
 */
AsteroidSpritesPool.prototype.borrowAsteroids = function() {
	return this.asteroids.shift();
};

/**
 *	Return an asteroid to the pool 
 * @param {Object} sprite
 */
AsteroidSpritesPool.prototype.returnAsteroids = function(sprite) {
	this.asteroids.push(sprite);
};

/**
 *	Creates asteroids and adds them to the pool 
 */
AsteroidSpritesPool.prototype.createAsteroids = function() {
	this.asteroids = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addAsteroidSprites(6, "resources/KB_lilAsteroid.png");
	this.addAsteroidSprites(6, "resources/KB_MidAsteroid.png");
	this.addAsteroidSprites(6, "resources/KB_BigAsteroid.png");

	this.shuffle(this.asteroids);
};

/**
 *	Adds asteroid sprites to the pool 
 * @param {Object} amount
 * @param {Object} frameId
 */
AsteroidSpritesPool.prototype.addAsteroidSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.asteroids.push(sprite);
	}
};

/**
 *	Shuffles the pool of asteroids 
 * @param {Object} array
 */
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