function BulletSprite(type) {
	this.type   = type;
	this.sprite = null;
	this.speed = 12;
	this.destroy = false;
	this.power = 100; //default power for a bullet
	this.scale = 1;
}

BulletSprite.ENEMY_BULLET = 0;
BulletSprite.PROTAG_BULLET = 1;

//TODO: Change this to the correct width.
BulletSprite.WIDTH = 64;

BulletSprite.prototype.update = function() {
	if(this.type == BulletSprite.PROTAG_BULLET) {
		//protag bullets always move left to right
		this.sprite.position.x += this.speed;
		if(this.sprite.position.x > 800)
			this.destroy = true; //flag as off screen to clean up
	}
	else {
		//enemy bullets always move right to left
		this.sprite.position.x -= this.speed;
		if(this.sprite.position.x < 0)
			this.destroy = true;
	}
	
	if(debug && this.bounding_box) {
		this.bounding_box.position.x = this.sprite.position.x;
		this.bounding_box.position.y = this.sprite.position.y;
	}
};

BulletSprite.prototype.setSprite = function(sprite, start_x, start_y, scale, isBomb) {
	this.sprite = sprite;
	this.scale = scale;
	this.sprite.width *= scale;
	this.sprite.height *= scale;
	this.sprite.position.x = start_x;
	this.sprite.position.y = start_y;
	
	if(isBomb)
		this.isBomb = true;
	else
		this.isBomb = false;
	
	if(debug) {
		var graphics = new PIXI.Graphics();
		this.bounding_box = graphics;
		graphics.lineStyle(1, 0x00FF00);
		graphics.drawRect(0, 0, this.sprite.width, this.sprite.height);
		stage.addChild(graphics);
	}
}; 

BulletSprite.prototype.reset = function() {
	this.destroy = false;
	
	if(this.sprite != null) {
		this.sprite.width /= this.scale;
		this.sprite.height /= this.scale;
		this.sprite = null;
	}
	this.scale = 1;
};

BulletSprite.prototype.getCenterX = function() {
	return this.sprite.position.x + (this.sprite.width / 2);
}

BulletSprite.prototype.getCenterY = function() {
	return this.sprite.position.y + (this.sprite.height / 2);
} 
