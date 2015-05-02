//Temporary variables for screen size
sWidth = 800;
sHeight = 600;

/**
 *	Controls the background scrolling screen. This is made up of 3 separate screens scrolling at different speeds 
 */
function BackgroundScene(texture, width, height, startX, startY, deltax) {
	PIXI.TilingSprite.call(this, texture, width, height);

	this.position.x = startX;
	this.position.y = startY;
	this.tilePosition.x = 0;
	this.tilePosition.y = 0;

	this.viewportX = 0;
	this.deltax = deltax;
	
	//added temporary code
	this.speed = 5;
	this.width = width;
	this.height = height;
}
//constructor an dmethods
BackgroundScene.constructor = BackgroundScene;
BackgroundScene.prototype = Object.create(PIXI.TilingSprite.prototype);

BackgroundScene.prototype.setViewportX = function(newViewportX) {
	var distanceTravelled = newViewportX - this.viewportX;
	this.viewportX = newViewportX;
	this.tilePosition.x -= (distanceTravelled * this.deltax);
};

/********************** TEMPORARY CODE TO DEMONSTRATE OBJECT MOVEMENT *********************/

BackgroundScene.prototype.moveObject = function() {
	if(this.isOffScreen())
		this.speed *= -1;
	this.position.x += this.speed;
};

BackgroundScene.prototype.isOffScreen = function() {
	if(this.position.x + this.width > sWidth || this.position.x < 0) {
		return true;
	}	
};