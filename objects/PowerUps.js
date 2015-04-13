function PowerUps() {
	PIXI.DisplayObjectContainer.call(this);

	this.pool = new PowerUpSpritesPool();
	this.createLookupTables();

	this.sprites = [];

	this.viewportX = 0;
	this.viewportSpriteX = 0;
}

PowerUps.constructor = PowerUps;
PowerUps.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

PowerUps.VIEWPORT_WIDTH = 800;
PowerUps.VIEWPORT_NUM_SPRITES = Math.ceil(PowerUps.VIEWPORT_WIDTH/PowerUpSprite.WIDTH) + 1;

PowerUps.prototype.setViewportX = function(viewportX) {
	this.viewportX = this.checkViewportXBounds(viewportX);

	var prevViewportSpriteX = this.viewportSpriteX;
	this.viewportSpriteX = Math.floor(this.viewportX/PowerUpSprite.WIDTH);

	this.removeOldSprites(prevViewportSpriteX);
	this.addNewSprites();
};

PowerUps.prototype.checkViewportXBounds = function(viewportX) {
	var maxViewportX = (this.sprites.length - PowerUps.VIEWPORT_NUM_SPRITES) * 
						PowerUpSprite.WIDTH;
	if (viewportX < 0) {
		viewportX = 0;
	} else if (viewportX > maxViewportX) {
		viewportX = maxViewportX;
	}

	return viewportX;
};

PowerUps.prototype.removeOldSprites = function(prevViewportSpriteX) {
	var numOldSprites = this.viewportSpriteX - prevViewportSpriteX;
	
	if (numOldSprites > PowerUps.VIEWPORT_NUM_SPRITES) {
		numOldSprites = PowerUps.VIEWPORT_NUM_SPRITES;
	}

	for (var i = prevViewportSpriteX; i < prevViewportSpriteX + numOldSprites; i++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite != null) {
			this.returnPowerUpSprite(newSprite.type, newSprite.sprite);
			this.removeChild(newSprite.sprite);
			newSprite.sprite = null;
		}
	}
};

PowerUps.prototype.addSprite = function(spriteType, y) {
	var newSprite = new PowerUpSprite(spriteType, y);
	this.sprites.push(newSprite);
};

PowerUps.prototype.addNewSprites = function() {
	var firstX = -(this.viewportX % PowerUpSprite.WIDTH);
	
	for (var i = this.viewportSpriteX, spriteIndex = 0;
			 i < this.viewportSpriteX + PowerUps.VIEWPORT_NUM_SPRITES;
			 i++, spriteIndex++)
	{
		var newSprite = this.sprites[i];
		if (newSprite.sprite == null)
		{
			newSprite.sprite = this.borrowPowerUpSprite(newSprite.type);

			newSprite.sprite.position.x = firstX + (spriteIndex * PowerUpSprite.WIDTH);
			newSprite.sprite.position.y = newSprite.y;

			this.addChild(newSprite.sprite);
		}
		else if (newSprite.sprite != null)
		{
			newSprite.sprite.position.x = firstX + (spriteIndex * PowerUpSprite.WIDTH);
		}
	}
};

PowerUps.prototype.createLookupTables = function() {
	this.borrowPowerUpSpriteLookup = [];
	this.borrowPowerUpSpriteLookup[SpriteType.SHOOT_POWERUP] = this.pool.borrowShootPowerUp;
	this.borrowPowerUpSpriteLookup[SpriteType.SPEED_POWERUP] = this.pool.borrowSpeedPowerUp;
	this.borrowPowerUpSpriteLookup[SpriteType.HEALTH_POWERUP] = this.pool.borrowHealthPowerUp;
	this.borrowPowerUpSpriteLookup[SpriteType.BOMB_POWERUP] = this.pool.borrowBombPowerUp;
	this.borrowPowerUpSpriteLookup[SpriteType.EXTRA_LIFE_POWERUP] = this.pool.borrowExtraLifePowerUp;

	this.returnPowerUpSpriteLookup = [];
	this.returnPowerUpSpriteLookup[SpriteType.SHOOT_POWERUP] = this.pool.returnShootPowerUp;
	this.returnPowerUpSpriteLookup[SpriteType.SPEED_POWERUP] = this.pool.returnSpeedPowerUp;
	this.returnPowerUpSpriteLookup[SpriteType.HEALTH_POWERUP] = this.pool.returnHealthPowerUp;
	this.returnPowerUpSpriteLookup[SpriteType.BOMB_POWERUP] = this.pool.returnBombPowerUp;
	this.returnPowerUpSpriteLookup[SpriteType.EXTRA_LIFE_POWERUP] = this.pool.returnExtraLifePowerUp;
};

PowerUps.prototype.borrowPowerUpSprite = function(spriteType) {
	return this.borrowPowerUpSpriteLookup[spriteType].call(this.pool);
};

PowerUps.prototype.returnPowerUpSprite = function(spriteType, newSprite) {
	return this.returnPowerUpSpriteLookup[spriteType].call(this.pool, newSprite);
};
