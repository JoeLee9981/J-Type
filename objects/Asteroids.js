function Asteroids() {
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new AsteroidSpritesPool();
	this.createLookupTables();

	this.sprites = [];

	this.viewportX = 0;
	this.viewportSpriteX = 0;
}

Asteroids.constructor = Asteroids;
Asteroids.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Asteroids.VIEWPORT_WIDTH = 800;
Asteroids.VIEWPORT_NUM_SPRITES = Math.ceil(Asteroids.VIEWPORT_WIDTH/AsteroidSprite.WIDTH) + 1;

Asteroids.prototype.setViewportX = function(viewportX) {
	this.viewportX = this.checkViewportXBounds(viewportX);

	var prevViewportSpriteX = this.viewportSpriteX;
	this.viewportSpriteX = Math.floor(this.viewportX/AsteroidSprite.WIDTH);

	this.removeOldSprites(prevViewportSpriteX);
	this.addNewSprites();
};

Asteroids.prototype.checkViewportXBounds = function(viewportX) {
	var maxViewportX = (this.sprites.length - Asteroids.VIEWPORT_NUM_SPRITES) * 
						AsteroidSprite.WIDTH;
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

Asteroids.prototype.removeOldSprites = function(prevViewportSpriteX) {
	var numOldSprites = this.viewportSpriteX - prevViewportSpriteX;
	if (numOldSprites > Asteroids.VIEWPORT_NUM_SPRITES)
	{
		numOldSprites = Asteroids.VIEWPORT_NUM_SPRITES;
	}

	for (var i = prevViewportSpriteX; i < prevViewportSpriteX + numOldSprites; i++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite != null)
		{
			this.returnAsteroidSprite(newSprite.type, newSprite.sprite);
			this.removeChild(newSprite.sprite);
			newSprite.sprite = null;
		}
	}
};

Asteroids.prototype.addSprite = function(spriteType, y) {
	var newSprite = new AsteroidSprite(spriteType, y);
	this.sprites.push(newSprite);
};

Asteroids.prototype.addNewSprites = function() {
	var firstX = -(this.viewportX % AsteroidSprite.WIDTH);
	for (var i = this.viewportSpriteX, spriteIndex = 0;
			 i < this.viewportSpriteX + Asteroids.VIEWPORT_NUM_SPRITES;
			 i++, spriteIndex++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite == null)
		{
			newSprite.sprite = this.borrowAsteroidSprite(newSprite.type);

			newSprite.sprite.position.x = firstX + (spriteIndex * AsteroidSprite.WIDTH);
			newSprite.sprite.position.y = newSprite.y;

			this.addChild(newSprite.sprite);
		}
		else if (newSprite.sprite != null)
		{
			newSprite.sprite.position.x = firstX + (spriteIndex * AsteroidSprite.WIDTH);
		}
	}
};

Asteroids.prototype.createLookupTables = function() {
	// TODO: Change this to account for only one Asteroid type? Or add more Asteroid types.
	this.borrowAsteroidSpriteLookup = [];
	this.borrowAsteroidSpriteLookup[SpriteType.ASTEROID] = this.pool.borrowAsteroid;

	this.returnAsteroidSpriteLookup = [];
	this.returnAsteroidSpriteLookup[SpriteType.ASTEROID] = this.pool.returnAsteroid;
};

Asteroids.prototype.borrowAsteroidSprite = function(spriteType) {
	return this.borrowAsteroidSpriteLookup[spriteType].call(this.pool);
};

Asteroids.prototype.returnAsteroidSprite = function(spriteType, newSprite) {
	return this.returnAsteroidSpriteLookup[spriteType].call(this.pool, newSprite);
};
