/**
 *	Main class used to control bullet sprites, uses the sprite
 * 		pool to create sprites to be drawn 
 */
function Bullets() {
	PIXI.DisplayObjectContainer.call(this);

	this.MAX_BULLETS = 20;
	this.pool = new BulletSpritesPool();
	this.createLookupTables();

	this.protagSprites = [];
	this.enemySprites = [];

	this.viewportX = 0;
	this.viewportSpriteX = 0;
	
	this.addBulletsToMap();
}

Bullets.constructor = Bullets;
Bullets.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Bullets.VIEWPORT_WIDTH = 800;
Bullets.VIEWPORT_NUM_SPRITES = Math.ceil(Bullets.VIEWPORT_WIDTH/BulletSprite.WIDTH) + 1;

/**
 *	Controls the viewport of the sprite 
 * @param {Object} viewportX
 */
Bullets.prototype.setViewportX = function(viewportX) {
	this.viewportX = this.checkViewportXBounds(viewportX);

	var prevViewportSpriteX = this.viewportSpriteX;
	this.viewportSpriteX = Math.floor(this.viewportX/BulletSprite.WIDTH);

	this.removeOldSprites(prevViewportSpriteX);
	this.addNewSprites();
};

/**
 *	Controls viewport x bounds of the sprite 
 * @param {Object} viewportX
 */
Bullets.prototype.checkViewportXBounds = function(viewportX) {
	var maxViewportX = (this.protagSprites.length - Bullets.VIEWPORT_NUM_SPRITES) * 
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

/**
 *	removes old sprites from the pool 
 * @param {Object} prevViewportSpriteX
 */
Bullets.prototype.removeOldSprites = function(prevViewportSpriteX) {
	var numOldSprites = this.viewportSpriteX - prevViewportSpriteX;
	if (numOldSprites > Bullets.VIEWPORT_NUM_SPRITES)
	{
		numOldSprites = Bullets.VIEWPORT_NUM_SPRITES;
	}

	for (var i = prevViewportSpriteX; i < prevViewportSpriteX + numOldSprites; i++)
	{
		var newSprite = this.protagSprites[i];
		if (newSprite.sprite != null)
		{
			this.returnBulletSprite(newSprite.type, newSprite.sprite);
			this.removeChild(newSprite.sprite);
			newSprite.sprite = null;
		}
	}
};

/**
 *	removes old protag sprites from the pool 
 * @param {Object} index
 */
Bullets.prototype.removeOldProtagSprite = function(index) {
	this.protagSprites[index].destroy = 0;
	this.returnBulletSprite(this.protagSprites[index].type, this.protagSprites[index].sprite);
	this.removeChild(this.protagSprites[index].sprite);
	this.protagSprites[index].reset();
	if(debug) {
		stage.removeChild(this.protagSprites[index].bounding_box);
	}
}

/**
 *	This is used to remove an enemy sprite from the active drawing list 
 * @param {Object} index
 */
Bullets.prototype.removeOldEnemySprite = function(index) {
	this.returnBulletSprite(this.enemySprites[index].type, this.enemySprites[index].sprite);
	this.removeChild(this.enemySprites[index].sprite);
	this.enemySprites[index].sprite = null;
	this.enemySprites[index].reset();
	if(debug) {
		stage.removeChild(this.enemySprites[index].bounding_box);
	}
}

/**
 *	This will add a protag sprite onto the list to be used with the pool 
 */
Bullets.prototype.addProtagSprite = function() {
	var newSprite = new BulletSprite(BulletSprite.PROTAG_BULLET);
	this.protagSprites.push(newSprite);
};

/**
 *	This will add an enemy sprite onto the list to be used with the pool 
 */
Bullets.prototype.addEnemySprite = function() {
	var newSprite = new BulletSprite(BulletSprite.ENEMY_BULLET);
	this.enemySprites.push(newSprite);
};

/**
 * 	This gets sprites from the pool and adds them onto the stage
 */
Bullets.prototype.addNewSprites = function() {
	var firstX = -(this.viewportX % BulletSprite.WIDTH);
	for (var i = this.viewportSpriteX, spriteIndex = 0;
			 i < this.viewportSpriteX + Bullets.VIEWPORT_NUM_SPRITES;
			 i++, spriteIndex++)
	{
		var newSprite = this.protagSprites[i];
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

/**
 *	This is used to add a new protaganist bullet sprite from the pool onto the stage 
 * @param {Object} start_x
 * @param {Object} start_y
 * @param {Object} scale
 * @param {Object} power
 */
Bullets.prototype.addNewProtagSprite = function(start_x, start_y, scale, power) {
	//scan for open spot in the array to add our new asteroid
	for(var i = 0; i < this.MAX_BULLETS; i++) {
		if(this.protagSprites[i].sprite == null) {
			var newSprite = this.protagSprites[i];
			
			newSprite.setSprite(this.borrowBulletSprite(newSprite.type), start_x, start_y, scale, false);
			
			//for powered up bullets color red
			if(power)
				newSprite.sprite.setTexture(PIXI.Texture.fromFrame("resources/KB_Laserbullets_Purple.png"));
			else
				newSprite.sprite.setTexture(PIXI.Texture.fromFrame("resources/KB_Laserbullets_Red.png"));
			
			this.addChild(newSprite.sprite);
			break;
		}
	}
};

/**
 *	This is used to add a new protaganist bomb sprite from the pool onto the stage 
 * @param {Object} start_x
 * @param {Object} start_y
 * @param {Object} scale
 * @param {Object} power
 */
Bullets.prototype.addNewBombSprite = function(start_x, start_y, scale, power) {
	//scan for open spot in the array to add our new asteroid
	for(var i = 0; i < this.MAX_BULLETS; i++) {
		if(this.protagSprites[i].sprite == null) {
			var newSprite = this.protagSprites[i];
			
			newSprite.setSprite(this.borrowBulletSprite(newSprite.type), start_x, start_y, scale, true);
			
			//for powered up bullets color red
			if(power)
				newSprite.sprite.setTexture(PIXI.Texture.fromFrame("resources/KB_Laserbomb_Aqua.png"));
			else
				newSprite.sprite.setTexture(PIXI.Texture.fromFrame("resources/KB_Laserbomb_Red.png"));
			
			this.addChild(newSprite.sprite);
			break;
		}
	}
}

/**
 *	Add a new enemy bullet sprite onto the stage 
 * @param {Object} start_x
 * @param {Object} start_y
 * @param {Object} scale
 */
Bullets.prototype.addNewEnemySprite = function(start_x, start_y, scale) {
	//scan for open spot in the array to add our new asteroid
	for(var i = 0; i < this.MAX_BULLETS; i++) {
		if(this.enemySprites[i].sprite == null) {
			var newSprite = this.enemySprites[i];
			
			newSprite.setSprite(this.borrowBulletSprite(newSprite.type), start_x, start_y, scale, false);
			//anchor in the center to rotate
			newSprite.sprite.anchor.x = .5;
			newSprite.sprite.anchor.y = .5;

			newSprite.sprite.rotation =  Math.PI;
			//set the anchor to the new x, y
			newSprite.sprite.anchor.x = 1;
			newSprite.sprite.anchor.y = 1;

			this.addChild(newSprite.sprite);
			break;
		}
	}
}

/**
 *	Creates tables used to look up which function call to borrow and return enemy sprites 
 */
Bullets.prototype.createLookupTables = function() {
	this.borrowBulletSpriteLookup = [];
	this.borrowBulletSpriteLookup[BulletSprite.ENEMY_BULLET] = this.pool.borrowEnemyBullets;
	this.borrowBulletSpriteLookup[BulletSprite.PROTAG_BULLET] = this.pool.borrowProtagBullets;

	this.returnBulletSpriteLookup = [];
	this.returnBulletSpriteLookup[BulletSprite.ENEMY_BULLET] = this.pool.returnEnemyBullets;
	this.returnBulletSpriteLookup[BulletSprite.PROTAG_BULLET] = this.pool.returnProtagBullets;
};

/**
 *	Uses the lookup table to get a sprite from the pool 
 * @param {Object} spriteType
 */
Bullets.prototype.borrowBulletSprite = function(spriteType) {
	return this.borrowBulletSpriteLookup[spriteType].call(this.pool);
};

/**
 *	Uses the lookup table to return a sprite from the pool 
 * @param {Object} spriteType
 */
Bullets.prototype.returnBulletSprite = function(spriteType, newSprite) {
	return this.returnBulletSpriteLookup[spriteType].call(this.pool, newSprite);
};

/**
 *	Used to update all active sprites within the pool during each frame of the render loop 
 */
Bullets.prototype.update = function() {
	//TODO this is wasteful, let's keep a list of active bullets
	for(var i = 0; i < this.MAX_BULLETS; i++) {
		if(this.protagSprites[i].sprite != null) {
			this.protagSprites[i].update();
			if(this.protagSprites[i].destroy) {
				this.removeOldProtagSprite(i);
			}
		}
		if(this.enemySprites[i].sprite != null) {
			this.enemySprites[i].update();
			if(this.enemySprites[i].destroy) {
				this.removeOldEnemySprite(i);
			}
		}
	}
}

/**
 *	Adds bullets onto the list to be used to wrap the sprites 
 */
Bullets.prototype.addBulletsToMap = function() {
	for(var i = 0; i < this.MAX_BULLETS; i++) {
		this.addProtagSprite();
		this.addEnemySprite();
	}
};
