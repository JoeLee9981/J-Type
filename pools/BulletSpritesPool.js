function BulletSpritesPool() {
	this.createEnemyBullets();
	this.createProtagBullets();
}

BulletSpritesPool.prototype.borrowEnemyBullets = function() {
	return this.enemyBullets.shift();
};

BulletSpritesPool.prototype.returnEnemyBullets = function(sprite) {
	this.enemyBullets.push(sprite);
};

BulletSpritesPool.prototype.borrowProtagBullets = function() {
	return this.protagBullets.shift();
};

BulletSpritesPool.prototype.returnProtagBullets = function(sprite) {
	this.protagBullets.push(sprite);
};

BulletSpritesPool.prototype.createEnemyBullets = function() {
	this.enemyBullets = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addEnemyBulletSprites(20, "resources/KB_Laserbullets_Aqua.png");
};

BulletSpritesPool.prototype.createProtagBullets = function() {
	this.protagBullets = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addProtagBulletSprites(20, "resources/KB_Laserbullets_Red.png");
};

BulletSpritesPool.prototype.addEnemyBulletSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.enemyBullets.push(sprite);
	}
};

BulletSpritesPool.prototype.addProtagBulletSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.protagBullets.push(sprite);
	}
};