function PlayerShipSprite(sprite) {
	this.texture1 = PIXI.Texture.fromFrame("resources/KB_ship.png");
	this.texture2 = PIXI.Texture.fromFrame("resources/KB_shipfinwithflames.png");
	this.sprite = sprite;
	this.sprite.width = this.sprite.width / 2;
	this.sprite.height = this.sprite.height / 2;
	this.invulnerable = false;
	
	//power settings of the weapons, increase this when a powerup is picked up
	this.power = 100;
	//power up will make bullets slightly bigger
	this.bulletScale = 1;
	//speed settings for ship, increase this when a powerup is picked up
	this.speed = 3;
	//damage inclicted by ships hull when colliding
	this.hull_power = 100;
	
	//players health total, add to it to increase health total
	this.total_health = 1000;
	//players current health, subtract for damage, add to for recovery
	this.health = 1000;
	
	this.frame = 0;
	this.last = 0;
}

PlayerShipSprite.prototype.update = function(now, vx, vy) {
	this.sprite.position.x += vx * this.speed;
	this.sprite.position.y += vy * this.speed;
	
	//clip the ship to the screen
	if(this.sprite.position.x + this.sprite.width > 800)
		this.sprite.position.x = 800 - this.sprite.width;
	if(this.sprite.position.x < 0)
		this.sprite.position.x = 0;
	if(this.sprite.position.y < 0)
		this.sprite.position.y = 0;
	else if(this.sprite.position.y + this.sprite.height > 600)
		this.sprite.position.y = 600 - this.sprite.height;
	
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

PlayerShipSprite.prototype.damage = function(damage) {
	this.health -= damage;
	if(this.health < 0) {
		return 0;
	}
	return 1;
}

PlayerShipSprite.prototype.checkCollision = function(x, y, width, height) {
	
	if(this.invulnerable)
		return false;
	
	var sailsX = this.getSailsX();
	var sailsY = this.getSailsY();
	var sailsWidth = this.getSailsWidth();
	var sailsHeight = this.getSailsHeight();
	var sails = !(sailsX > (x + width) || (sailsX + sailsWidth) < x || sailsY > (y + height) || (sailsY + sailsHeight) < y);
	
	var bodyX = this.getBodyX();
	var bodyY = this.getBodyY();
	var bodyWidth = this.getBodyWidth();
	var bodyHeight = this.getBodyHeight();
	var body = !(bodyX > (x + width) || (bodyX + bodyWidth) < x || bodyY > (y + height) || (bodyY + bodyHeight) < y);
	
	return sails || body;
}

PlayerShipSprite.prototype.shootPowerUp = function() {
	if(this.power < 500) {
		this.power += 100;
		this.bulletScale += .1
	}
	
}


PlayerShipSprite.prototype.getSailsX = function() {
	return this.sprite.position.x + this.sprite.width / 2.5;
}

PlayerShipSprite.prototype.getSailsY = function() {
	return this.sprite.position.y + this.sprite.height / 5;
}

PlayerShipSprite.prototype.getSailsWidth = function() {
	return this.sprite.width / 3.5;
}

PlayerShipSprite.prototype.getSailsHeight = function() {
	return this.sprite.width / 4;
}

PlayerShipSprite.prototype.getBodyX = function() {
	return this.sprite.position.x + this.sprite.width / 4;
}

PlayerShipSprite.prototype.getBodyY = function() {
	return this.sprite.position.y + this.sprite.height / 5 + this.getSailsHeight();
}

PlayerShipSprite.prototype.getBodyWidth = function() {
	return this.sprite.width / 2.25;
}

PlayerShipSprite.prototype.getBodyHeight = function() {
	return this.sprite.width / 5;
}

PlayerShipSprite.prototype.getCenterX = function() {
	return this.sprite.position.x + (this.sprite.width / 2);
}

PlayerShipSprite.prototype.getCenterY = function() {
	return this.sprite.position.y + (this.sprite.height / 2);
} 