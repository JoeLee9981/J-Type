function PowerUps() {
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new PowerUpSpritesPool();

	this.sprites = [];
	this.MAX_POWERUPS = 20;
	this.addPowerUpsToMap();
}

PowerUps.constructor = PowerUps;
PowerUps.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

PowerUps.prototype.addSprite = function() {
	var newSprite = new PowerUpSprite();
	this.sprites.push(newSprite);
};

/*
 *	This is the update loop to update all the asteroids.
 */
PowerUps.prototype.update = function() {
	for(var i = 0; i < this.MAX_POWERUPS; i++) {
		if(this.sprites[i].sprite != null) {
			if(this.sprites[i].destroy) {
				
				this.removeOldSprite(i);
			}
			else {
				this.sprites[i].update();
			}
		}
	}
};

/*
 *	Free an asteroid - returns it to the pool for reuse
 */
PowerUps.prototype.removeOldSprite = function(index) {
	this.returnPowerUpSprite(this.sprites[index].sprite);
	this.removeChild(this.sprites[index].sprite);
	this.sprites[index].sprite = null;
};

/*
 *	This adds a new sprite - This method is used to draw a sprite
 *		it is important to note you may not add more than the MAX_POWERUPS,
 *		if it runs out you need to remove them.
 *
 */
PowerUps.prototype.addNewSprite = function(spriteType, start_x, start_y) {
	
	//scan for open spot in the array to add our new asteroid
	for(var i = 0; i < this.MAX_POWERUPS; i++) {
		if(this.sprites[i].sprite == null) {
			var newSprite = this.sprites[i];
			
			newSprite.setSprite(this.borrowPowerUpSprite(spriteType), spriteType);
			newSprite.sprite.position.x = start_x;
			newSprite.sprite.position.y = start_y;
			
			newSprite.type = spriteType;
			
			this.addChild(newSprite.sprite);
			break;
		}
	}
};

PowerUps.prototype.borrowPowerUpSprite = function() {
	return this.pool.borrowPowerUps();
};

PowerUps.prototype.returnPowerUpSprite = function(newSprite) {
	return this.pool.returnPowerUps(newSprite);
};

/*
 *	This is used to map powerups into the pool
 */
PowerUps.prototype.addPowerUpsToMap = function() {
	console.log("Adding powerups to map");
	for(var i = 0; i < this.MAX_POWERUPS; i++) {
		this.addSprite();	
	}
};

