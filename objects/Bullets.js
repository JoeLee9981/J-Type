function Bullets() {
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new BulletSpritesPool();
	this.createLookupTables();

	this.sprites = [];

	this.viewportX = 0;
	this.viewportSpriteX = 0;
}

Bullets.constructor = Bullets;
Bullets.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Bullets.VIEWPORT_WIDTH = 800;
Bullets.VIEWPORT_NUM_SPRITES = Math.ceil(Bullets.VIEWPORT_WIDTH/BulletSprite.WIDTH) + 1;

Bullets.prototype.setViewportX = function(viewportX) {
	this.viewportX = this.checkViewportXBounds(viewportX);

	var prevViewportSpriteX = this.viewportSpriteX;
	this.viewportSpriteX = Math.floor(this.viewportX/BulletSprite.WIDTH);

	this.removeOldSprites(prevViewportSpriteX);
	this.addNewSprites();
};

Bullets.prototype.checkViewportXBounds = function(viewportX) {
	var maxViewportX = (this.sprites.length - Bullets.VIEWPORT_NUM_SPRITES) * 
						BulletSprite.WIDTH;
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

Bullets.prototype.removeOldSprites = function(prevViewportSpriteX) {
	var numOldSprites = this.viewportSpriteX - prevViewportSpriteX;
	if (numOldSprites > Bullets.VIEWPORT_NUM_SPRITES)
	{
		numOldSprites = Bullets.VIEWPORT_NUM_SPRITES;
	}

	for (var i = prevViewportSpriteX; i < prevViewportSpriteX + numOldSprites; i++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite != null)
		{
			this.returnBulletSprite(newSprite.type, newSprite.sprite);
			this.removeChild(newSprite.sprite);
			newSprite.sprite = null;
		}
	}
};

Bullets.prototype.addSprite = function(spriteType, y) {
	var newSprite = new BulletSprite(spriteType, y);
	this.sprites.push(newSprite);
};

Bullets.prototype.addNewSprites = function() {
	var firstX = -(this.viewportX % BulletSprite.WIDTH);
	for (var i = this.viewportSpriteX, spriteIndex = 0;
			 i < this.viewportSpriteX + Bullets.VIEWPORT_NUM_SPRITES;
			 i++, spriteIndex++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite == null)
		{
			newSprite.sprite = this.borrowBulletSprite(newSprite.type);

			newSprite.sprite.position.x = firstX + (spriteIndex * BulletSprite.WIDTH);
			newSprite.sprite.position.y = newSprite.y;

			this.addChild(newSprite.sprite);
		}
		else if (newSprite.sprite != null)
		{
			newSprite.sprite.position.x = firstX + (spriteIndex * BulletSprite.WIDTH);
		}
	}
};

Bullets.prototype.createLookupTables = function() {
	this.borrowBulletSpriteLookup = [];
	this.borrowBulletSpriteLookup[SpriteType.ENEMY_BULLET] = this.pool.borrowEnemyBullet;
	this.borrowBulletSpriteLookup[SpriteType.PROTAG_BULLET] = this.pool.borrowProtagBullet;

	this.returnBulletSpriteLookup = [];
	this.returnBulletSpriteLookup[SpriteType.ENEMY_BULLET] = this.pool.returnEnemyBullet;
	this.returnBulletSpriteLookup[SpriteType.PROTAG_BULLET] = this.pool.returnProtagBullet;
};

Bullets.prototype.borrowBulletSprite = function(spriteType) {
	return this.borrowBulletSpriteLookup[spriteType].call(this.pool);
};

Bullets.prototype.returnBulletSprite = function(spriteType, newSprite) {
	return this.returnBulletSpriteLookup[spriteType].call(this.pool, newSprite);
};
