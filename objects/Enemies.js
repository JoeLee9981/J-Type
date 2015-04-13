function Enemies() {
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new EnemySpritesPool();
	this.createLookupTables();

	this.sprites = [];

	this.viewportX = 0;
	this.viewportSpriteX = 0;
}

Enemies.constructor = Enemies;
Enemies.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Enemies.VIEWPORT_WIDTH = 800;
Enemies.VIEWPORT_NUM_SPRITES = Math.ceil(Enemies.VIEWPORT_WIDTH/EnemySprite.WIDTH) + 1;

Enemies.prototype.setViewportX = function(viewportX) {
	this.viewportX = this.checkViewportXBounds(viewportX);

	var prevViewportSpriteX = this.viewportSpriteX;
	this.viewportSpriteX = Math.floor(this.viewportX/EnemySprite.WIDTH);

	this.removeOldSprites(prevViewportSpriteX);
	this.addNewSprites();
};

Enemies.prototype.checkViewportXBounds = function(viewportX) {
	var maxViewportX = (this.sprites.length - Enemies.VIEWPORT_NUM_SPRITES) * 
						EnemySprite.WIDTH;
	if (viewportX < 0)
	{
		viewportX = 0;
	}
	else if (viewportX > maxViewportX)
	{
		viewportX = maxViewportX;
	}

	return viewportX;
};

Enemies.prototype.removeOldSprites = function(prevViewportSpriteX) {
	var numOldSprites = this.viewportSpriteX - prevViewportSpriteX;
	if (numOldSprites > Enemies.VIEWPORT_NUM_SPRITES)
	{
		numOldSprites = Enemies.VIEWPORT_NUM_SPRITES;
	}

	for (var i = prevViewportSpriteX; i < prevViewportSpriteX + numOldSprites; i++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite != null)
		{
			this.returnEnemySprite(newSprite.type, newSprite.sprite);
			this.removeChild(newSprite.sprite);
			newSprite.sprite = null;
		}
	}
};

Enemies.prototype.addSprite = function(spriteType, y) {
	var newSprite = new EnemySprite(spriteType, y);
	this.sprites.push(newSprite);
};

Enemies.prototype.addNewSprites = function() {
	var firstX = -(this.viewportX % EnemySprite.WIDTH);
	for (var i = this.viewportSpriteX, spriteIndex = 0;
			 i < this.viewportSpriteX + Enemies.VIEWPORT_NUM_SPRITES;
			 i++, spriteIndex++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite == null)
		{
			newSprite.sprite = this.borrowEnemySprite(newSprite.type);

			newSprite.sprite.position.x = firstX + (spriteIndex * EnemySprite.WIDTH);
			newSprite.sprite.position.y = newSprite.y;

			this.addChild(newSprite.sprite);
		}
		else if (newSprite.sprite != null)
		{
			newSprite.sprite.position.x = firstX + (spriteIndex * EnemySprite.WIDTH);
		}
	}
};

Enemies.prototype.createLookupTables = function() {
	// TODO: Change this to account for only one enemy type? Or add more enemy types.
	this.borrowEnemySpriteLookup = [];
	this.borrowEnemySpriteLookup[SpriteType.ENEMY] = this.pool.borrowEnemy;

	this.returnEnemySpriteLookup = [];
	this.returnEnemySpriteLookup[SpriteType.ENEMY] = this.pool.returnEnemy;
};

Enemies.prototype.borrowEnemySprite = function(spriteType) {
	return this.borrowEnemySpriteLookup[spriteType].call(this.pool);
};

Enemies.prototype.returnEnemySprite = function(spriteType, newSprite) {
	return this.returnEnemySpriteLookup[spriteType].call(this.pool, newSprite);
};
