/**
 *	This represents an enemy sprite - baby, special or mother ship 
 */
function EnemySprite() {

	this.sprite = null;
	this.scale = 1;
	//this is the speed of the asteroid, override this value to
	//make them move faster
	this.speed = 3;
	
	this.health = 100;
	this.power = 100;
	this.hull_power = 300; //default damage dealt per collision
	this.destroy = false;
	this.cloaked = false;
	this.lastShot = 0;
	this.shotSpeed = 500;
	this.GoingUp = true;
	this.finish = false;
	
	/*
	 * Pattern is used to determine start point and movement vector
	 * 		of the asteroid.
	 */
	this.patterns = [];
	this.patterns[EnemySprite.PATTERN_1] = { x: 800, y: 200, dx: -1, dy: "COS", amp: 200, freq: 100 };
	this.patterns[EnemySprite.PATTERN_2] = { x: 800, y: 400, dx: -1, dy: "-COS", amp: 200, freq: 100 };
	this.patterns[EnemySprite.PATTERN_3] = { x: 800, y: 250, dx: -1, dx2: .5, dx3: -1, dy: 0, dy2: -.25, dy3: 0, xChange: 400, xChange2: 700, part: 0 };
	this.patterns[EnemySprite.PATTERN_4] = { x: 800, y: 350, dx: -1, dx2: .5, dx3: -1, dy: 0, dy2:  .25, dy3: 0, xChange: 400, xChange2: 700, part: 0 };
	this.patterns[EnemySprite.PATTERN_5] = { x: 800, y: 100, dx: -.9, dx2: .8, dx3: 1, dy: .05, dy2: .2, dy3: 0, xChange: 200, xChange2: 650, part: 0 };
	this.patterns[EnemySprite.PATTERN_6] = { x: 800, y: 500, dx: -.9, dx2: .8, dx3: 1, dy: -.05, dy2: -.2, dy3: 0, xChange: 200, xChange2: 650, part: 0 };
	this.patterns[EnemySprite.PATTERN_7] = { x: 800, y: 250, dx: -1, dy: -1};

	this.textures = [ PIXI.Texture.fromFrame("resources/KB_EnemyBabyShip.png"), PIXI.Texture.fromFrame("resources/KB_EnemyMotherShip.png"), PIXI.Texture.fromFrame("resources/KB_EnemyBabyShip_Red.png")];
}

/**
 *	Update the sprite in the render loop 
 */
EnemySprite.prototype.update = function(currTime) {
	
	var now = new Date().getTime();
	if(this.pattern == EnemySprite.PATTERN_3 || this.pattern == EnemySprite.PATTERN_4) {
		if(this.patterns[this.pattern].part == 0) {
			this.sprite.position.x += this.patterns[this.pattern].dx * this.speed;
			this.sprite.position.y += this.patterns[this.pattern].dy * this.speed;

			if(this.sprite.position.x <= this.patterns[this.pattern].xChange) {
				this.patterns[this.pattern].part = 1;
			}
		}
		if(this.patterns[this.pattern].part == 1) {
			this.sprite.position.x += this.patterns[this.pattern].dx2 * this.speed;
			this.sprite.position.y += this.patterns[this.pattern].dy2 * this.speed;
			if(this.sprite.position.x >= this.patterns[this.pattern].xChange2) {
				this.patterns[this.pattern].part = 2;
			}
			if(now - this.lastShot > this.shotSpeed && this.sprite.position.x <= this.patterns[this.pattern].xChange2 - 50) {
				bullets.addNewEnemySprite(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2, 1);
				this.lastShot = now;
			}
			
		}
		if(this.patterns[this.pattern].part == 2) {
			this.sprite.position.x += this.patterns[this.pattern].dx3 * this.speed;
			this.sprite.position.y += this.patterns[this.pattern].dy3 * this.speed;
		}
	}
	else if(this.pattern == EnemySprite.PATTERN_5 || this.pattern == EnemySprite.PATTERN_6) {
		if(this.patterns[this.pattern].part == 0) {
			this.sprite.position.x += this.patterns[this.pattern].dx * this.speed;
			this.sprite.position.y += this.patterns[this.pattern].dy * this.speed;
			if(this.sprite.position.x <= this.patterns[this.pattern].xChange) {
				this.patterns[this.pattern].part = 1;
				this.decloak();
			}
		}
		if(this.patterns[this.pattern].part == 1) {
			this.sprite.position.x += this.patterns[this.pattern].dx2 * this.speed;
			this.sprite.position.y += this.patterns[this.pattern].dy2 * this.speed;
			if(this.sprite.position.x >= this.patterns[this.pattern].xChange2) {
				this.patterns[this.pattern].part = 2;
				this.cloak();
			}
			if(now - this.lastShot > this.shotSpeed && this.sprite.position.x <= this.patterns[this.pattern].xChange2 - 50) {
				bullets.addNewEnemySprite(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2, 1);
				this.lastShot = now;
			}
			
		}
		if(this.patterns[this.pattern].part == 2) {
			this.sprite.position.x += this.patterns[this.pattern].dx3 * this.speed;
			this.sprite.position.y += this.patterns[this.pattern].dy3 * this.speed;
		}
	}
	else {

		var yOffset = (600 / 2) - this.sprite.height / 2;
		var xOffset = 800;
		
		this.sprite.position.x += this.patterns[this.pattern].dx * this.speed;
		if(this.patterns[this.pattern].dy == "COS") {
			this.sprite.position.y = yOffset + this.patterns[this.pattern].amp * Math.cos((this.sprite.position.x - xOffset) / this.patterns[this.pattern].freq);
			//if halfway through the amp then fire
			if(Math.abs(this.sprite.position.y - yOffset) <= (this.patterns[this.pattern].amp / 2 + 2) && Math.abs(this.sprite.position.y - yOffset) >= (this.patterns[this.pattern].amp / 2 - 2))
				bullets.addNewEnemySprite(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2, 1);
			
		}
		else if(this.patterns[this.pattern].dy == "-COS") {
			this.sprite.position.y = yOffset - this.patterns[this.pattern].amp * Math.cos(-(this.sprite.position.x - xOffset) / this.patterns[this.pattern].freq);
			//if halfway through the amp then fire
			if(Math.abs(this.sprite.position.y - yOffset) <= (this.patterns[this.pattern].amp / 2 + 2) && Math.abs(this.sprite.position.y - yOffset) >= (this.patterns[this.pattern].amp / 2 - 2))
				bullets.addNewEnemySprite(this.sprite.position.x + this.sprite.width / 2, this.sprite.position.y + this.sprite.height / 2, 1);
		}
	}
	
	if(debug) {
		this.bounding_box.position.x = this.sprite.position.x;
		this.bounding_box.position.y = this.sprite.position.y;
	}
	
	//check if offscreen and destroy
	if(this.sprite.position.x + this.sprite.width < 0 || 
	   this.sprite.position.x > 800 ||
	   this.sprite.position.y + this.sprite.height < 0 || 
	   this.sprite.position.y > 600) {
		   this.destroy = true;
		   console.log("Destroying Enemy Sprite");
   }
   else if(this.pattern == EnemySprite.PATTERN_7){
   		if(this.finish){
   			this.patterns[this.pattern].dx = -6;
   			this.sprite.position.x += this.patterns[this.pattern].dx;

   		}
   		else if(this.sprite.position.x <= 400)
   		{
   			this.patterns[this.pattern].dx = 0;
   			this.sprite.position.y += this.patterns[this.pattern].dy;
   			if(this.sprite.position.y <= 40){
	   			this.patterns[this.pattern].dy = 1;
   			}
   			else if(this.sprite.position.y >= 400){
   				this.patterns[this.pattern].dy = -1;
   				this.GoingUp = false;
   			}
   			else if(this.sprite.position.y < 250 && this.sprite.position.y >= 200 && !this.GoingUp){
   				this.patterns[this.pattern].dy = 0;
   				this.patterns[this.pattern].dx = 6;
   				this.finish = true;
   			}
   		}
   }
	
}

/**
 *	Damage the enemy sprite 
 */
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
	
	if(type == EnemySprite.MOTHER_SHIP) {
		this.health = 2000;
	}
	else {
		this.health = 100;
	}
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
	
	if(pattern == EnemySprite.PATTERN_5 || pattern == EnemySprite.PATTERN_6)
		this.cloak();
		
	if(debug) {
		var graphics = new PIXI.Graphics();
		this.bounding_box = graphics;
		graphics.lineStyle(1, 0xFF0000);
		graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
		stage.addChild(graphics);
	}
	
	this.patterns = [];
	this.patterns[EnemySprite.PATTERN_1] = { x: 800, y: 200, dx: -1, dy: "COS", amp: 200, freq: 100 };
	this.patterns[EnemySprite.PATTERN_2] = { x: 800, y: 400, dx: -1, dy: "-COS", amp: 200, freq: 100 };
	this.patterns[EnemySprite.PATTERN_3] = { x: 800, y: 250, dx: -1, dx2: .5, dx3: -1, dy: 0, dy2: -.25, dy3: 0, xChange: 400, xChange2: 700, part: 0 };
	this.patterns[EnemySprite.PATTERN_4] = { x: 800, y: 350, dx: -1, dx2: .5, dx3: -1, dy: 0, dy2:  .25, dy3: 0, xChange: 400, xChange2: 700, part: 0 };
	this.patterns[EnemySprite.PATTERN_5] = { x: 800, y: 100, dx: -.9, dx2: .8, dx3: 1, dy: .05, dy2: .2, dy3: 0, xChange: 200, xChange2: 650, part: 0 };
	this.patterns[EnemySprite.PATTERN_6] = { x: 800, y: 500, dx: -.9, dx2: .8, dx3: 1, dy: -.05, dy2: -.2, dy3: 0, xChange: 200, xChange2: 650, part: 0 };
	this.patterns[EnemySprite.PATTERN_7] = { x: 800, y: 250, dx: -1, dy: -1};
}

/*
 *	Use this function to set the sprite at a specified x and y position instead of the default in the pattern
 */
EnemySprite.prototype.setSpriteOverrideXAndY = function(sprite, start_x, start_y, pattern, type, scale) {
	this.destroy = false;
	this.type   = type;
	
	if(type == EnemySprite.MOTHER_SHIP) {
		this.health = 2000;
	}
	else {
		this.health = 100;
	}
	
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
	this.scale = scale;
	
	if(pattern == EnemySprite.PATTERN_5 || pattern == EnemySprite.PATTERN_6)
		this.cloak();
		
	if(debug) {
		var graphics = new PIXI.Graphics();
		this.bounding_box = graphics;
		graphics.lineStyle(1, 0xFF0000);
		graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
		stage.addChild(graphics);
	}
	
	this.patterns = [];
	this.patterns[EnemySprite.PATTERN_1] = { x: 800, y: 200, dx: -1, dy: "COS", amp: 200, freq: 100 };
	this.patterns[EnemySprite.PATTERN_2] = { x: 800, y: 400, dx: -1, dy: "-COS", amp: 200, freq: 100 };
	this.patterns[EnemySprite.PATTERN_3] = { x: 800, y: 250, dx: -1, dx2: .5, dx3: -1, dy: 0, dy2: -.25, dy3: 0, xChange: 400, xChange2: 700, part: 0 };
	this.patterns[EnemySprite.PATTERN_4] = { x: 800, y: 350, dx: -1, dx2: .5, dx3: -1, dy: 0, dy2:  .25, dy3: 0, xChange: 400, xChange2: 700, part: 0 };
	this.patterns[EnemySprite.PATTERN_5] = { x: 800, y: 100, dx: -.9, dx2: .8, dx3: 1, dy: .05, dy2: .2, dy3: 0, xChange: 200, xChange2: 650, part: 0 };
	this.patterns[EnemySprite.PATTERN_6] = { x: 800, y: 500, dx: -.9, dx2: .8, dx3: 1, dy: -.05, dy2: -.2, dy3: 0, xChange: 200, xChange2: 650, part: 0 };
	this.patterns[EnemySprite.PATTERN_7] = { x: 800, y: 250, dx: -1, dy: -1};
	
}

/**
 *	reset the scale of the ship 
 */
EnemySprite.prototype.resetScale = function() {
	//if this has been scaled before, revert
	this.sprite.width /= this.scale;
	this.sprite.height /= this.scale;
	this.lastShot = 0;
	this.shotSpeed = 300;
	this.decloak();
}

/**
 *	cloak the ship 
 */
EnemySprite.prototype.cloak = function() {
	this.cloaked = true;
	this.sprite.alpha = .25;
}

/**
 *	decloak the ship 
 */
EnemySprite.prototype.decloak = function() {
	this.cloaked = false;
	this.sprite.alpha = 1;
}

/**
 *	Check collision with an enemy sprite 
 * @param {Object} x
 * @param {Object} y
 * @param {Object} width
 * @param {Object} height
 */
EnemySprite.prototype.checkCollision = function(x, y, width, height) {

	var thisX = this.sprite.position.x;
	var thisY = this.sprite.position.y;
	var thisWidth = this.sprite.width;
	var thisHeight = this.sprite.height;
	return !(thisX > (x + width) || (thisX + thisWidth) < x || thisY > (y + height) || (thisY + thisHeight) < y);
}

//Constants used to represent the enemy ship type and movement pattern

EnemySprite.BABY = 0;
EnemySprite.MOTHER_SHIP = 1;
EnemySprite.SPECIAL = 2;

EnemySprite.PATTERN_1 = 0;
EnemySprite.PATTERN_2 = 1;
EnemySprite.PATTERN_3 = 2;
EnemySprite.PATTERN_4 = 3;
EnemySprite.PATTERN_5 = 4;
EnemySprite.PATTERN_6 = 5;
