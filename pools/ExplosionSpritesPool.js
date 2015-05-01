/**
 *	A recyclable pool of preinstantiated explosion sprites 
 */
function ExplosionSpritesPool() {
	this.createExplosions();
}


/**
 *	Get a sprite from the pool 
 */
ExplosionSpritesPool.prototype.borrowExplosions = function() {
	return this.explosions.shift();
};

/**
 *	returns an explosion to the pool 
 * @param {Object} sprite
 */
ExplosionSpritesPool.prototype.returnExplosions = function(sprite) {
	this.explosions.push(sprite);
};

/**
 *	create an explosion and add to the pool 
 */
ExplosionSpritesPool.prototype.createExplosions = function() {
	this.explosions = [];

	this.addExplosionSprites(18, "resources/KB_Explosion_frame1.png");

};

/**
 *	Adds the explosions to the sprite pool 
 * @param {Object} amount
 * @param {Object} frameId
 */
ExplosionSpritesPool.prototype.addExplosionSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.explosions.push(sprite);
	}
};
