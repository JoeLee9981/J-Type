function PowerUpSpritesPool() {
	this.createShootPowerUps();
	this.createSpeedPowerUps();
	this.createHealthPowerUps();
	this.createBombPowerUps();
	this.createExtraLifePowerUps();
}

PowerUpSpritesPool.prototype.borrowShootPowerUps = function() {
	return this.shootPowerUps.shift();
};

PowerUpSpritesPool.prototype.returnShootPowerUps = function(sprite) {
	this.shootPowerUps.push(sprite);
};

PowerUpSpritesPool.prototype.borrowSpeedPowerUps = function() {
	return this.speedPowerUps.shift();
};
	
PowerUpSpritesPool.prototype.returnSpeedPowerUps = function(sprite) {
	this.speedPowerUps.push(sprite);
};

PowerUpSpritesPool.prototype.borrowHealthPowerUps = function() {
	return this.healthPowerUps.shift();
};

PowerUpSpritesPool.prototype.returnHealthPowerUps = function(sprite) {
	this.healthPowerUps.push(sprite);
};

PowerUpSpritesPool.prototype.borrowBombPowerUps = function() {
	return this.bombPowerUps.shift();
};

PowerUpSpritesPool.prototype.returnBombPowerUps = function(sprite) {
	this.bombPowerUps.push(sprite);
};

PowerUpSpritesPool.prototype.borrowExtraLifePowerUps = function() {
	return this.extraLifePowerUps.shift();
};

PowerUpSpritesPool.prototype.returnExtraLifePowerUps = function(sprite) {
	this.extraLifePowerUps.push(sprite);
};

PowerUpSpritesPool.prototype.createShootPowerUps = function() {
	this.shootPowerUps = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addShootPowerUpSprites(6, "resources/KB_PowerUps_Shooting.png");

	this.shuffle(this.shootPowerUps);
};

PowerUpSpritesPool.prototype.createSpeedPowerUps = function() {
	this.speedPowerUps = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addSpeedPowerUpSprites(6, "resources/KB_PowerUps_Speed.png");

	this.shuffle(this.speedPowerUps);
};

PowerUpSpritesPool.prototype.createHealthPowerUps = function() {
	this.healthPowerUps = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addHealthPowerUpSprites(2, "resources/KB_PowerUps_Health.png");

	this.shuffle(this.healthPowerUps);
};

PowerUpSpritesPool.prototype.createBombPowerUps = function() {
	this.bombPowerUps = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addBombPowerUpSprites(2, "resources/KB_PowerUps_Bomb.png");

	this.shuffle(this.bombPowerUps);
};

PowerUpSpritesPool.prototype.createExtraLifePowerUps = function() {
	this.extraLifePowerUps = [];
	
	// TODO: Add correct number of sprites. Change spriteID.
	this.addExtraLifePowerUpSprites(2, "resources/KB_PowerUps_ExtraLife.png");
};

PowerUpSpritesPool.prototype.addShootPowerUpSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.shootPowerUps.push(sprite);
	}
};

PowerUpSpritesPool.prototype.addSpeedPowerUpSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.speedPowerUps.push(sprite);
	}
};

PowerUpSpritesPool.prototype.addHealthPowerUpSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.healthPowerUps.push(sprite);
	}
};

PowerUpSpritesPool.prototype.addBombPowerUpSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		sprite.anchor.x = 1;
		sprite.scale.x = -1;
		this.bombPowerUps.push(sprite);
	}
};

PowerUpSpritesPool.prototype.addExtraLifePowerUpSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		sprite.anchor.y = 0.25;
		this.extraLifePowerUps.push(sprite);
	}
};

PowerUpSpritesPool.prototype.shuffle = function(array) {
	var len = array.length;
	var shuffles = len * 3;
	for (var i = 0; i < shuffles; i++)
	{
		var powerUpSprite = array.pop();
		var pos = Math.floor(Math.random() * (len-1));
		array.splice(pos, 0, powerUpSprite);
	}
};