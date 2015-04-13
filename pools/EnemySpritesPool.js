function EnemySpritesPool() {
	this.createEnemies();
}

EnemySpritesPool.prototype.borrowEnemies = function() {
	return this.enemies.shift();
};

EnemySpritesPool.prototype.returnEnemies = function(sprite) {
	this.enemies.push(sprite);
};

EnemySpritesPool.prototype.createEnemies = function() {
	this.enemies = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addEnemySprites(6, "window_01");
	this.addEnemySprites(6, "window_02");

	this.shuffle(this.enemies);
};

EnemySpritesPool.prototype.addEnemySprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.enemies.push(sprite);
	}
};

EnemySpritesPool.prototype.shuffle = function(array) {
	var len = array.length;
	var shuffles = len * 3;
	for (var i = 0; i < shuffles; i++)
	{
		var enemySprite = array.pop();
		var pos = Math.floor(Math.random() * (len-1));
		array.splice(pos, 0, enemySprite);
	}
};