
function AsteroidSprite(type) {
	this.type   = type;
	this.sprite = null;
	this.speed = 3;
	
	this.patterns = [];
	this.patterns[AsteroidSprite.PATTERN_1] = { x: 400, y: -100, dx: -1, dy: 0 };
	this.patterns[AsteroidSprite.PATTERN_2] = { x: 400, y: 100, dx: -1, dy: 0 };
	this.patterns[AsteroidSprite.PATTERN_3] = { x: 300, y: 300, dx: -.5, dy: -.5 };
	this.patterns[AsteroidSprite.PATTERN_4] = { x: 300, y: -400, dx: -.5, dy: .5 };
}

//TODO: Change this to the correct width.
AsteroidSprite.WIDTH = 64;

AsteroidSprite.prototype.update = function() {
	this.sprite.position.y += this.patterns[this.pattern].dy * this.speed;
	this.sprite.position.x += this.patterns[this.pattern].dx * this.speed;
}

//You should always set the sprite using this format so that it can set the start position
AsteroidSprite.prototype.setSprite = function(sprite, pattern) {
	this.pattern = pattern;
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.position.x = this.patterns[pattern].x;
	this.sprite.position.y = this.patterns[pattern].y;
}

AsteroidSprite.prototype.setSpriteOverrideXAndY = function(sprite, start_x, start_y, pattern) {
	this.pattern = pattern;
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.position.x = start_x;
	this.sprite.position.y = start_y;
}

/*
 *	These patters are used to control starting positions and
 *		direction the asteroids will travel
 */
AsteroidSprite.PATTERN_1 = 0;
AsteroidSprite.PATTERN_2 = 1;
AsteroidSprite.PATTERN_3 = 2;
AsteroidSprite.PATTERN_4 = 3;