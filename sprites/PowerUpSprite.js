function PowerUpSprite() {

	this.sprite = null;
	this.speed = 1.5;
	this.destroy = false;
	this.textures = [ PIXI.Texture.fromFrame("resources/KB_PowerUps_Bomb.png"), PIXI.Texture.fromFrame("resources/KB_PowerUps_ExtraLife.png"), PIXI.Texture.fromFrame("resources/KB_PowerUps_Health.png"),
					  PIXI.Texture.fromFrame("resources/KB_PowerUps_Shooting.png"), PIXI.Texture.fromFrame("resources/KB_PowerUps_Speed.png") ];
	
}

PowerUpSprite.prototype.update = function() {
	this.sprite.position.x -= this.speed;
	if(this.sprite.position.x + this.sprite.width < 0)
		this.destroy = true;
};

PowerUpSprite.prototype.setSprite = function(sprite, type) {
	this.destroy = false;
	this.type = type;
	this.sprite = sprite;
	this.sprite.setTexture(this.textures[type]);
};

PowerUpSprite.prototype.doPowerUp = function(player) {
	console.log("Adding powerup to player ship");
	
	if(this.type == PowerUpSprite.SHOOT_POWERUP) {
		player.shootPowerUp();
	}
	else if(this.type == PowerUpSprite.SPEED_POWERUP) {
		player.speedPowerUp();
	}
	else if(this.type == PowerUpSprite.EXTRA_LIFE_POWERUP) {
		player.lvies++;
	}
	else if(this.type == PowerUpSprite.HEALTH_POWERUP) {
		player.speedPowerUp();
	}
	else if(this.type == PowerUpSprite.BOMB_POWERUP) {
		player.speedPowerUp();
	}
	
	this.destroy = true;
};

PowerUpSprite.BOMB_POWERUP = 0;
PowerUpSprite.EXTRA_LIFE_POWERUP = 1;
PowerUpSprite.HEALTH_POWERUP = 2;
PowerUpSprite.SHOOT_POWERUP = 3;
PowerUpSprite.SPEED_POWERUP = 4;


