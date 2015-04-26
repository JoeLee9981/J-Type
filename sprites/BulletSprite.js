function BulletSprite(type) {
	this.type   = type;
	this.sprite = null;
	this.speed = 12;
	this.offScreen = 0;
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
			this.offScreen = 1; //flag as off screen to clean up
	}
	else {
		//enemy bullets always move right to left
		this.sprite.position.x -= this.speed;
		if(this.sprite.position.x < -500)
			this.offScreen = 1;
	}
}
