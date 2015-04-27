function PowerUpSpritesPool() {
	this.createPowerUps();
}

PowerUpSpritesPool.prototype.borrowPowerUps = function() {
	return this.powerUps.shift();
};

PowerUpSpritesPool.prototype.returnPowerUps = function(sprite) {
	this.powerUps.push(sprite);
};

PowerUpSpritesPool.prototype.createPowerUps = function() {
	this.powerUps = [];

	// TODO: Add correct number of sprites. Change spriteID.
	this.addPowerUpSprites(6, "resources/KB_PowerUps_Shooting.png");

};

PowerUpSpritesPool.prototype.addPowerUpSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.powerUps.push(sprite);
	}
};