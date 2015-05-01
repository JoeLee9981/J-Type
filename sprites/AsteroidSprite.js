/**
 * 	Represents the wrapper of an asteroid sprite
 */
function AsteroidSprite(type) {
	this.type   = type;
	this.sprite = null;
	
	//this is the speed of the asteroid, override this value to
	//make them move faster
	this.speed = 3;
	
	//rotation controls a random rotation of the asteroid
	this.rotation = Math.random() / 50;
	var dir = Math.random() - .5;
	this.rotationDir = Math.abs(dir) / dir; //normalize and save
	
	this.health = (type + 1) * 100; // 100 for little, 200 for mid, 300 for big
	this.power = this.health * 4; // 400 for little, 800 for medium, 1200 for big
	this.destroy = false;
	
	/*
	 * Pattern is used to determine start point and movement vector
	 * 		of the asteroid.
	 */
	this.patterns = [];
	this.patterns[AsteroidSprite.PATTERN_1] = { x: 800, y: 200, dx: -1, dy: 0 };
	this.patterns[AsteroidSprite.PATTERN_2] = { x: 800, y: 400, dx: -1, dy: 0 };
	this.patterns[AsteroidSprite.PATTERN_3] = { x: 800, y: 600, dx: -.75, dy: -.25 };
	this.patterns[AsteroidSprite.PATTERN_4] = { x: 800, y: 0, dx: -.75, dy: .25 };
	
	this.textures = [ PIXI.Texture.fromFrame("resources/KB_lilAsteroid.png"), PIXI.Texture.fromFrame("resources/KB_MidAsteroid.png"), PIXI.Texture.fromFrame("resources/KB_BigAsteroid.png") ];
}

//base width
AsteroidSprite.WIDTH = 64;

/**
 *	Update the asteroid in the render loop 
 */
AsteroidSprite.prototype.update = function() {
	this.sprite.position.y += this.patterns[this.pattern].dy * this.speed;
	this.sprite.position.x += this.patterns[this.pattern].dx * this.speed;
	
	//check if offscreen and destroy
	if(this.sprite.position.x + this.sprite.width < 0 || 
	   this.sprite.position.x > 800 ||
	   this.sprite.position.y + this.sprite.height < 0 || 
	   this.sprite.position.y > 600) {
		   this.destroy = true;
   }
	
	this.sprite.rotation += this.rotation * this.rotationDir;
}

/**
 *	Damage an asteroid, return 0 if destroyed 
 */
AsteroidSprite.prototype.damage = function(damage) {
	this.health -= damage;
	
	if(this.health <= 0) {
		this.destroy = true;
		return 0;
	}
	return this.health;
}

//You should always set the sprite using this format so that it can set the start position
AsteroidSprite.prototype.setSprite = function(sprite, pattern, type) {
	this.destroy = false;
	this.type   = type;
	this.health = (this.type + 1) * 100; // 100 for little, 200 for mid, 300 for big
	this.power = this.health * 4; // 400 for little, 800 for medium, 1200 for big
	this.pattern = pattern;
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.setTexture(this.textures[this.type]);
	this.sprite.position.x = this.patterns[pattern].x;
	this.sprite.position.y = this.patterns[pattern].y;
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
}

/**
 *	Use this function to set the sprite at a specified x and y position instead of the default in the pattern
 */
AsteroidSprite.prototype.setSpriteOverrideXAndY = function(sprite, start_x, start_y, pattern, type) {
	this.destroy = false;
	this.type   = type;
	this.health = (this.type + 1) * 100; // 100 for little, 200 for mid, 300 for big
	this.power = this.health * 4; // 400 for little, 800 for medium, 1200 for big
	this.pattern = pattern;
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.setTexture(this.textures[this.type]);
	this.sprite.position.x = start_x;
	this.sprite.position.y = start_y;
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
}

/*
 *  ************ IMPORTANT ****************
 * Due to the rotating nature of the asteroids, you must use
 * this function to check collision - OR you must offset the
 * position of the asteroid by -1/2 the width and height
 * 
 * This is because the anchor for the asteroids is center
 * instead of top left
 */
AsteroidSprite.prototype.checkCollision = function(x, y, width, height) {
	var thisX = this.sprite.position.x - this.sprite.width / 2;
	var thisY = this.sprite.position.y - this.sprite.height / 2;
	var thisWidth = this.sprite.width;
	var thisHeight = this.sprite.height;
	return !(thisX > (x + width) || (thisX + thisWidth) < x || thisY > (y + height) || (thisY + thisHeight) < y);
}

/**
 *	Get the center of the asteroid 
 */
AsteroidSprite.prototype.getCenterX = function() {
	return this.sprite.position.x;
}

/**
 *	Get the center of the asteroid 
 */
AsteroidSprite.prototype.getCenterY = function() {
	return this.sprite.position.y;
} 


/*
 *	These patters are used to control starting positions and
 *		direction the asteroids will travel
 */
AsteroidSprite.PATTERN_1 = 0;
AsteroidSprite.PATTERN_2 = 1;
AsteroidSprite.PATTERN_3 = 2;
AsteroidSprite.PATTERN_4 = 3;