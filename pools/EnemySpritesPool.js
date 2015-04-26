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

	this.addEnemySprites(10, "resources/KB_EnemyBabyShip.png");

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