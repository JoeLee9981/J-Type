/**
 *	A pool of pre-instantiated enemy sprites 
 */
function EnemySpritesPool() {
	this.createEnemies();
}

/**
 *	Get an enemy from the pool 
 */
EnemySpritesPool.prototype.borrowEnemies = function() {
	return this.enemies.shift();
};

/**
 *	Return an enemy to the pool 
 * @param {Object} sprite
 */
EnemySpritesPool.prototype.returnEnemies = function(sprite) {
	this.enemies.push(sprite);
};

/**
 *	Creates enemies and adds them to the pool 
 */
EnemySpritesPool.prototype.createEnemies = function() {
	this.enemies = [];

	this.addEnemySprites(20, "resources/KB_EnemyBabyShip.png");

	this.shuffle(this.enemies);
};

/**
 *	Add enemy sprites into the pool 
 * @param {Object} amount
 * @param {Object} frameId
 */
EnemySpritesPool.prototype.addEnemySprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.enemies.push(sprite);
	}
};

/**
 *	Shuffles enemy sprites in the pool 
 * @param {Object} array
 */
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