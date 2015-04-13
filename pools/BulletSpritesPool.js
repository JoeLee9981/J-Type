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
	this.addEnemyBulletSprites(6, "window_01");
	this.addEnemyBulletSprites(6, "window_02");

	this.shuffle(this.enemyBullets);
};

BulletSpritesPool.prototype.createProtagBullets = function() {
	this.protagBullets = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addProtagBulletSprites(6, "window_01");
	this.addProtagBulletSprites(6, "window_02");

	this.shuffle(this.protagBullets);
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

BulletSpritesPool.prototype.shuffle = function(array) {
	var len = array.length;
	var shuffles = len * 3;
	for (var i = 0; i < shuffles; i++)
	{
		var bulletSprite = array.pop();
		var pos = Math.floor(Math.random() * (len-1));
		array.splice(pos, 0, bulletSprite);
	}
};