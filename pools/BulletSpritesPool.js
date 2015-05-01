/**
 *	Contains a pool of preinstantiated bullet sprites to use 
 */
function BulletSpritesPool() {
	this.createEnemyBullets();
	this.createProtagBullets();
}

/**
 *	Borrows a sprite from the pool 
 */
BulletSpritesPool.prototype.borrowEnemyBullets = function() {
	return this.enemyBullets.shift();
};

/**
 *	Returns a sprite to the pool 
 * @param {Object} sprite
 */
BulletSpritesPool.prototype.returnEnemyBullets = function(sprite) {
	this.enemyBullets.push(sprite);
};

/**
 *	Borrows a sprite from the pool 
 */
BulletSpritesPool.prototype.borrowProtagBullets = function() {
	return this.protagBullets.shift();
};

/**
 *	reutrns a bullet sprite tot he pool 
 * @param {Object} sprite
 */
BulletSpritesPool.prototype.returnProtagBullets = function(sprite) {
	this.protagBullets.push(sprite);
};

/**
 *	Creates enemy bullet sprites and pools them 
 */
BulletSpritesPool.prototype.createEnemyBullets = function() {
	this.enemyBullets = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addEnemyBulletSprites(20, "resources/KB_Laserbullets_Aqua.png");
};

/**
 *	Creates protaganist bullet sprites and pools them 
 */
BulletSpritesPool.prototype.createProtagBullets = function() {
	this.protagBullets = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addProtagBulletSprites(20, "resources/KB_Laserbullets_Red.png");
};

/**
 *	Creates enemy bullet sprites and pools them 
 */
BulletSpritesPool.prototype.addEnemyBulletSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.enemyBullets.push(sprite);
	}
};

/**
 *	Creates protaganist bullet sprites and pools them 
 */
BulletSpritesPool.prototype.addProtagBulletSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.protagBullets.push(sprite);
	}
};