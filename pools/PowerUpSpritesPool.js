/**
 *	Pool of sprites to use for power ups 
 */
function PowerUpSpritesPool() {
	this.createPowerUps();
}

/**
 *	Retrives a pre-instantiated sprite from the pool 
 */
PowerUpSpritesPool.prototype.borrowPowerUps = function() {
	return this.powerUps.shift();
};

/**
 *	Recycles an instantiated sprite to the pool 
 * @param {Object} sprite
 */
PowerUpSpritesPool.prototype.returnPowerUps = function(sprite) {
	this.powerUps.push(sprite);
};

/**
 *	Creates sprites and puts them into the pull 
 */
PowerUpSpritesPool.prototype.createPowerUps = function() {
	this.powerUps = [];

	this.addPowerUpSprites(20, "resources/KB_PowerUps_Shooting.png");

};

/**
 *	Addds an instantiated power up to the pool 
 * @param {Object} amount
 * @param {Object} frameId
 */
PowerUpSpritesPool.prototype.addPowerUpSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.powerUps.push(sprite);
	}
};