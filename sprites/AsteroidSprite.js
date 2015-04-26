
function AsteroidSprite(type) {
	this.type   = type;
	this.sprite = null;
	this.speed = 3;
	this.rotation = Math.random() / 50;
	var dir = Math.random() - .5;
	this.rotationDir = Math.abs(dir) / dir; //normalize and save
	this.health = 3;
	this.destroy = false;
	this.patterns = [];
	this.patterns[AsteroidSprite.PATTERN_1] = { x: 800, y: 200, dx: -1, dy: 0 };
	this.patterns[AsteroidSprite.PATTERN_2] = { x: 800, y: 400, dx: -1, dy: 0 };
	this.patterns[AsteroidSprite.PATTERN_3] = { x: 800, y: 600, dx: -.75, dy: -.25 };
	this.patterns[AsteroidSprite.PATTERN_4] = { x: 800, y: 0, dx: -.75, dy: .25 };
}

//TODO: Change this to the correct width.
AsteroidSprite.WIDTH = 64;

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
	
	//this.sprite.rotation += this.rotation * this.rotationDir;
}

AsteroidSprite.prototype.damage = function() {
	this.health--;
	
	if(this.health == 0) {
		this.destroy = true;
	}
	return this.health;
}

//You should always set the sprite using this format so that it can set the start position
AsteroidSprite.prototype.setSprite = function(sprite, pattern) {
	this.destroy = false;
	this.health = 3;
	this.pattern = pattern;
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.position.x = this.patterns[pattern].x;
	this.sprite.position.y = this.patterns[pattern].y;
}

/*
 *	Use this function to set the sprite at a specified x and y position instead of the default in the pattern
 */
AsteroidSprite.prototype.setSpriteOverrideXAndY = function(sprite, start_x, start_y, pattern) {
	this.pattern = pattern;
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.position.x = start_x;
	this.sprite.position.y = start_y;
}

AsteroidSprite.prototype.checkCollision = function(x, y, width, height) {
	var thisX = this.sprite.position.x;
	var thisY = this.sprite.position.y;
	var thisWidth = this.sprite.width;
	var thisHeight = this.sprite.height;
	return !(thisX > (x + width) || (thisX + thisWidth) < x || thisY > (y + height) || (thisY + thisHeight) < y);
}

AsteroidSprite.prototype.getCenterX = function() {
	return this.sprite.position.x + (this.sprite.width / 2);
}

AsteroidSprite.prototype.getCenterY = function() {
	return this.sprite.position.y + (this.sprite.height / 2);
} 


/*
 *	These patters are used to control starting positions and
 *		direction the asteroids will travel
 */
AsteroidSprite.PATTERN_1 = 0;
AsteroidSprite.PATTERN_2 = 1;
AsteroidSprite.PATTERN_3 = 2;
AsteroidSprite.PATTERN_4 = 3;