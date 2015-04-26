function EnemySprite() {

	this.sprite = null;
	this.scale = 1;
	//this is the speed of the asteroid, override this value to
	//make them move faster
	this.speed = 3;
	
	this.health = 100;
	this.power = 100;
	this.destroy = false;
	
	/*
	 * Pattern is used to determine start point and movement vector
	 * 		of the asteroid.
	 */
	this.patterns = [];
	this.patterns[EnemySprite.PATTERN_1] = { x: 800, y: 200, dx: -1, dy: "COS", amp: 200, freq: 100 };
	this.patterns[EnemySprite.PATTERN_2] = { x: 800, y: 400, dx: -1, dy: "-COS", amp: 200, freq: 100 };
	//this.patterns[AsteroidSprite.PATTERN_3] = { x: 800, y: 600, dx: -.75, dy: -.25 };
	//this.patterns[AsteroidSprite.PATTERN_4] = { x: 800, y: 0, dx: -.75, dy: .25 };

	this.textures = [ PIXI.Texture.fromFrame("resources/KB_EnemyBabyShip.png"), PIXI.Texture.fromFrame("resources/KB_EnemyMotherShip.png")];
}

EnemySprite.prototype.update = function() {
	//this.sprite.position.y += this.patterns[this.pattern].dy * this.speed;
	var yOffset = (600 / 2) - this.sprite.height / 2;
	var xOffset = 800;
	
	this.sprite.position.x += this.patterns[this.pattern].dx * this.speed;
	if(this.patterns[this.pattern].dy == "COS") {
		this.sprite.position.y = yOffset + this.patterns[this.pattern].amp * Math.cos((this.sprite.position.x - xOffset) / this.patterns[this.pattern].freq);
		//if halfway through the amp then fire
		if(Math.abs(this.sprite.position.y - yOffset) <= (this.patterns[this.pattern].amp / 2 + 1) && Math.abs(this.sprite.position.y - yOffset) >= (this.patterns[this.pattern].amp / 2 - 1))
			bullets.addNewEnemySprite(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2);
		
	}
	else if(this.patterns[this.pattern].dy == "-COS") {
		this.sprite.position.y = yOffset - this.patterns[this.pattern].amp * Math.cos(-(this.sprite.position.x - xOffset) / this.patterns[this.pattern].freq);
		//if halfway through the amp then fire
		if(Math.abs(this.sprite.position.y - yOffset) <= (this.patterns[this.pattern].amp / 2 + 1) && Math.abs(this.sprite.position.y - yOffset) >= (this.patterns[this.pattern].amp / 2 - 1))
			bullets.addNewEnemySprite(this.sprite.position.x, this.sprite.position.y);
	}
	
	
	
	//check if offscreen and destroy
	if(this.sprite.position.x + this.sprite.width < 0 || 
	   this.sprite.position.x > 800 ||
	   this.sprite.position.y + this.sprite.height < 0 || 
	   this.sprite.position.y > 600) {
		   this.destroy = true;
   }
	
}

EnemySprite.prototype.damage = function(damage) {
	this.health -= damage;
	
	if(this.health <= 0) {
		this.destroy = true;
		return 0;
	}
	return this.health;
}

//You should always set the sprite using this format so that it can set the start position
EnemySprite.prototype.setSprite = function(sprite, pattern, type, scale) {
	this.destroy = false;
	this.type   = type;
	this.scale = scale;
	this.health = (this.type + 1) * 100; // 100 for little, 200 for mid, 300 for big
	this.power = this.health * 4; // 400 for little, 800 for medium, 1200 for big
	this.pattern = pattern;
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.setTexture(this.textures[this.type]);
	this.sprite.position.x = this.patterns[pattern].x;
	this.sprite.position.y = this.patterns[pattern].y;
	//set the scale of the enemy
	this.sprite.width *= scale;
	this.sprite.height *= scale;
}

/*
 *	Use this function to set the sprite at a specified x and y position instead of the default in the pattern
 */
EnemySprite.prototype.setSpriteOverrideXAndY = function(sprite, start_x, start_y, pattern, type, scale) {
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
	//set the scale of the enemy
	this.sprite.width *= scale;
	this.sprite.height *= scale;
}

EnemySprite.prototype.resetScale = function() {
	//if this has been scaled before, revert
	this.sprite.width /= this.scale;
	this.sprite.height /= this.scale;
}

EnemySprite.BABY = 0;
EnemySprite.MOTHER_SHIP = 1;

EnemySprite.PATTERN_1 = 0;
EnemySprite.PATTERN_2 = 1;