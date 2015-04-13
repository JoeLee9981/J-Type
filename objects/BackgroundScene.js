function BackgroundScene(texture, width, height, startX, startY, deltax) {
	PIXI.TilingSprite.call(this, texture, width, height);

	this.position.x = startX;
	this.position.y = startY;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	this.viewportX = 0;
	this.deltax = deltax;
}

BackgroundScene.constructor = BackgroundScene;
BackgroundScene.prototype = Object.create(PIXI.TilingSprite.prototype);

BackgroundScene.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * this.deltax);
};