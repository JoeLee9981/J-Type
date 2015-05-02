/**
 *	Wraps an enemy pool and controls the borrowing, returning and management of the enemies 
 */
function Enemies() {
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new EnemySpritesPool();

	this.MAX_ENEMIES = 20;

	this.sprites = [];
	this.addEnemiesToMap();

	this.viewportX = 0;
	this.viewportSpriteX = 0;
}
//constructor
Enemies.constructor = Enemies;
Enemies.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

/*
 *	This is the update loop to move all the Enemies.
 */
Enemies.prototype.update = function(currTime) {
	for(var i = 0; i < this.MAX_ENEMIES; i++) {
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
 *	Free an Enemies - returns it to the pool for reuse
 */
Enemies.prototype.removeOldSprite = function(index) {
	this.returnEnemySprite(this.sprites[index].type, this.sprites[index].sprite);
	this.removeChild(this.sprites[index].sprite);
	this.sprites[index].sprite = null;
	if(debug)
		stage.removeChild(this.sprites[index].bounding_box);
}

/*
 *	This adds a new sprite - This method is used to draw a sprite
 *		it is important to note you may not add more than the MAX_ENEMIES,
 *		if it runs out you need to remove them.
 *
 * 	TODO: Patterns
 */
Enemies.prototype.addNewSprite = function(spriteType, pattern, scale) {
	
	//scan for open spot in the array to add our new enemy
	for(var i = 0; i < this.MAX_ENEMIES; i++) {
		if(this.sprites[i].sprite == null) {
			var newSprite = this.sprites[i];
			
			newSprite.setSprite(this.borrowEnemySprite(spriteType), pattern, spriteType, scale);
			
			newSprite.type = spriteType;
			
			this.addChild(newSprite.sprite);
			break;
		}
	}
};

/**
 *	Add a new sprite at a specific x and y position 
 * @param {Object} spriteType
 * @param {Object} start_x
 * @param {Object} start_y
 * @param {Object} pattern
 * @param {Object} scale
 */
Enemies.prototype.addNewSpriteOverrideXAndY = function(spriteType, start_x, start_y, pattern, scale) {
	//scan for open spot in the array to add our new enemy
	for(var i = 0; i < this.MAX_ENEMIES; i++) {
		if(this.sprites[i].sprite == null) {
			var newSprite = this.sprites[i];
			
			newSprite.setSpriteOverrideXAndY(this.borrowEnemySprite(spriteType), start_x, start_y, pattern, spriteType, scale);
			
			newSprite.type = spriteType;
			
			this.addChild(newSprite.sprite);
			break;
		}
	}
};

/**
 *	Adds an instantiated sprite 
 * @param {Object} spriteType
 */
Enemies.prototype.addSprite = function(spriteType) {
	var newSprite = new EnemySprite(spriteType);
	this.sprites.push(newSprite);
};

/**
 *	Borrows a sprite from the pool 
 * @param {Object} spriteType
 */
Enemies.prototype.borrowEnemySprite = function(spriteType) {
	return this.pool.borrowEnemies();
};

/**
 *	returns an enemy sprite to the pool 
 * @param {Object} spriteType
 * @param {Object} newSprite
 */
Enemies.prototype.returnEnemySprite = function(spriteType, newSprite) {
	return this.pool.returnEnemies(newSprite);
};

/**
 *	Maps enemies into this manager object 
 */
Enemies.prototype.addEnemiesToMap = function() {
	for(var i = 0; i < this.MAX_ENEMIES; i++) {
		this.addSprite()
	}
};
