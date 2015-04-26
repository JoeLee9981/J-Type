
/*
 *	This is the constructor
 */
function Explosions() {
	
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new ExplosionSpritesPool();
	this.createLookupTables();

	this.MAX_EXPLOSIONS = 18;
	this.sprites = [];
	this.addExplosionsToMap();
	
	
	this.viewportX = 0;
	this.viewportSpriteX = 0;
}

Explosions.constructor = Explosions;
Explosions.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

/*
 *	This is the update loop to move all the explosions.
 */
Explosions.prototype.update = function(currTime) {
	for(var i = 0; i < this.MAX_EXPLOSIONS; i++) {
		if(this.sprites[i].sprite != null) {
			if(this.sprites[i].destroy) {
				this.sprites[i].resetScale(); //need to reset the scale
				this.removeOldSprite(i);
			}
			else {
				this.sprites[i].update(currTime);
			}
		}
	}
};

/*
 *	Free an explosion - returns it to the pool for reuse
 */
Explosions.prototype.removeOldSprite = function(index) {
	this.returnExplosionSprite(this.sprites[index].sprite);
	this.removeChild(this.sprites[index].sprite);
	this.sprites[index].sprite = null;
}

/*
 *	This instantiates a new explosionSprite then simply adds it to the sprite list
 */
Explosions.prototype.addSprite = function() {
	var newSprite = new ExplosionSprite(); 
	this.sprites.push(newSprite);
};

/*
 *	This adds a new sprite - This method is used to draw a sprite
 *		it is important to note you may not add more than the MAX_explosionS,
 *		if it runs out you need to remove them.
 *
 *		Pattern is explosionSprite.PATTERN_1 to PATTERN_4 to determine the pattern
 *		use start_x or start_y to override the default start locs, leave at 0 to use preset
 */
Explosions.prototype.addNewSprite = function(start_x, start_y, scale, speed) {
	
	//scan for open spot in the array to add our new explosion
	for(var i = 0; i < this.MAX_EXPLOSIONS; i++) {
		if(this.sprites[i].sprite == null) {
			var newSprite = this.sprites[i];
			
			newSprite.setSprite(this.borrowExplosionSprite(), start_x, start_y, scale, speed);
			
			this.addChild(newSprite.sprite);
			break;
		}
	}
};

/*
 *	Lookup tables is only used to determine which borrow to use in the pool
 *		This is used if you want more than one sprite in a pool, we may not need to do this
 */
Explosions.prototype.createLookupTables = function() {
	this.borrowExplosionSpriteLookup = [];
	this.borrowExplosionSpriteLookup[0] = this.pool.borrowExplosions;

	this.returnExplosionSpriteLookup = [];
	this.returnExplosionSpriteLookup[0] = this.pool.returnExplosions;
};

/*
 *	Borrow explosion grabs an instantiated sprite from the pool to use as an explosion
 *		when done with the sprite you need to call return explosion
 */
Explosions.prototype.borrowExplosionSprite = function() {
	return this.borrowExplosionSpriteLookup[0].call(this.pool);
};

/*
 *	Returns an explosion back to the pool
 */
Explosions.prototype.returnExplosionSprite = function(newSprite) {
	return this.returnExplosionSpriteLookup[0].call(this.pool, newSprite);
};

/*
 *	This is used to map explosions into this pool
 *		this method is funny.
 */
Explosions.prototype.addExplosionsToMap = function() {
	for(var i = 0; i < this.MAX_EXPLOSIONS; i++) {
		this.addSprite();
	}
};
