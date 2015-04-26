function BulletSprite(type) {
	this.type   = type;
	this.sprite = null;
	this.speed = 12;
	this.destroy = false;
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
};

BulletSprite.prototype.reset = function() {
	this.destroy = false;
	this.sprite = null;
};

BulletSprite.prototype.getCenterX = function() {
	return this.sprite.position.x + (this.sprite.width / 2);
}

BulletSprite.prototype.getCenterY = function() {
	return this.sprite.position.y + (this.sprite.height / 2);
} 
