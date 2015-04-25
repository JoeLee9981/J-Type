
/*
 *	This is the constructor
 */
function Asteroids() {
	
	console.log("Creating Asteroids");
	
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new AsteroidSpritesPool();
	this.createLookupTables();

	this.sprites = [];
	this.addAsteroidsToMap();
	
	this.MAX_ASTEROIDS = 18;
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

/*
 *	This is the update loop to move all the asteroids.
 */
Asteroids.prototype.update = function(currTime) {
	for(var i = 0; i < this.MAX_ASTEROIDS; i++) {
		if(this.sprites[i].sprite != null) {
			if(currTime - this.sprites[i].borrowed > 10000) {
				//TODO: Need a better method of tracking this, but can't until bounds are fixed
				//timeout and return this after 5000, since it's off the screen
				this.removeOldSprite(i);
			}
			else {
				this.sprites[i].update();
			}
		}
	}
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

/*
 *	This method was used for buildings, may not be useful to us
 */
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

/*
 *	Free an asteroid - returns it to the pool for reuse
 */
Asteroids.prototype.removeOldSprite = function(index) {
	this.returnAsteroidSprite(this.sprites[index].type, this.sprites[index].sprite);
	this.removeChild(this.sprites[index].sprite);
	this.sprites[index].sprite = null;
}

/*
 *	This instantiates a new AsteroidSprite then simply adds it to the sprite list
 */
Asteroids.prototype.addSprite = function(spriteType) {
	var newSprite = new AsteroidSprite(spriteType); //default to pattern 1, can be changed
	this.sprites.push(newSprite);
};

/*
 *	This method was intended for buildings - it will need to be heavily
 *		modified if you want to use it for asteroids
 */
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
		else
		{
			newSprite.sprite.position.x = firstX + (spriteIndex * AsteroidSprite.WIDTH);
		}
	}
};

/*
 *	This adds a new sprite - This method is used to draw a sprite
 *		it is important to note you may not add more than the MAX_ASTEROIDS,
 *		if it runs out you need to remove them.
 *
 *		Pattern is AsteroidSprite.PATTERN_1 to PATTERN_4 to determine the pattern
 *		use start_x or start_y to override the default start locs, leave at 0 to use preset
 */
Asteroids.prototype.addNewSprite = function(spriteType, start_x, start_y, pattern) {
	
	//scan for open spot in the array to add our new asteroid
	for(var i = 0; i < this.MAX_ASTEROIDS; i++) {
		if(this.sprites[i].sprite == null) {
			var newSprite = this.sprites[i];
			
			newSprite.setSprite(this.borrowAsteroidSprite(spriteType), pattern);
			
			newSprite.type = spriteType;
			
			this.addChild(newSprite.sprite);
			break;
		}
	}
};

/*
 *	Lookup tables is only used to determine which borrow to use in the pool
 *		This is used if you want more than one sprite in a pool, we may not need to do this
 */
Asteroids.prototype.createLookupTables = function() {
	// TODO: Change this to account for only one Asteroid type? Or add more Asteroid types.
	this.borrowAsteroidSpriteLookup = [];
	this.borrowAsteroidSpriteLookup[SpriteType.ASTEROID_SMALL] = this.pool.borrowAsteroids;

	this.returnAsteroidSpriteLookup = [];
	this.returnAsteroidSpriteLookup[SpriteType.ASTEROID_SMALL] = this.pool.returnAsteroids;
};

/*
 *	Borrow asteroid grabs an instantiated sprite from the pool to use as an asteroid
 *		when done with the sprite you need to call return asteroid
 */
Asteroids.prototype.borrowAsteroidSprite = function(spriteType) {
	return this.borrowAsteroidSpriteLookup[spriteType].call(this.pool);
};

/*
 *	Returns an asteroid back to the pool
 */
Asteroids.prototype.returnAsteroidSprite = function(spriteType, newSprite) {
	return this.returnAsteroidSpriteLookup[spriteType].call(this.pool, newSprite);
};

/*
 *	This is used to map asteroids into this pool
 *		this method is funny.
 */
Asteroids.prototype.addAsteroidsToMap = function() {
	console.log("Adding asteroid to map");
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
	this.addSprite(SpriteType.ASTEROID_SMALL);
};
