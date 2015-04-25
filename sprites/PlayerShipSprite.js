function PlayerShipSprite(sprite) {
	this.texture1 = PIXI.Texture.fromFrame("resources/KB_ship.png");
	this.texture2 = PIXI.Texture.fromFrame("resources/KB_shipfinwithflames.png");
	this.sprite = sprite;
	this.sprite.width = this.sprite.width / 2;
	this.sprite.height = this.sprite.height / 2;
	this.speed = 3;
	this.frame = 0;
	this.last = 0;
}

PlayerShipSprite.prototype.update = function(now, vx, vy) {
	this.sprite.position.x += vx * this.speed;
	this.sprite.position.y += vy * this.speed;

	//this is to flicker the flames
	if(vx > 0 && this.frame == 0) {
		this.sprite.setTexture(this.texture2);
		this.frame = 1;
	}
	else if(vx > 0) {
		//maintain frame 1
	}
	else if(now - this.last > 10 && this.frame == 0) {
		this.last = now;
		this.sprite.setTexture(this.texture2);
		this.frame = 1;		
	}
	else if(now - this.last > 100 && this.frame == 1) {
		this.last = now;
		this.sprite.setTexture(this.texture1);
		this.frame = 0;
	}
}