function ExplosionSpritesPool() {
	this.createExplosions();
}

ExplosionSpritesPool.prototype.borrowExplosions = function() {
	return this.explosions.shift();
};

ExplosionSpritesPool.prototype.returnExplosions = function(sprite) {
	this.explosions.push(sprite);
};

ExplosionSpritesPool.prototype.createExplosions = function() {
	this.explosions = [];

	this.addExplosionSprites(18, "resources/KB_Explosion_frame1.png");

};

ExplosionSpritesPool.prototype.addExplosionSprites = function(amount, frameId) {
	for (var i = 0; i < amount; i++)
	{
		var sprite = PIXI.Sprite.fromFrame(frameId);
		this.explosions.push(sprite);
	}
};
