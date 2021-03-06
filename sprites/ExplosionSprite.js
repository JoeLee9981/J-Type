/**
 *	Representation of an explosion sprite - This is animated 
 */
function ExplosionSprite() {

	this.sprite = null;
	this.destroy = false;
	this.frame = 0;
	//textures available for animation
	this.textures = [ PIXI.Texture.fromFrame("resources/KB_Explosion_frame1.png"), PIXI.Texture.fromFrame("resources/KB_Explosion_frame2.png"), 
					  PIXI.Texture.fromFrame("resources/KB_Explosion_frame3.png"), PIXI.Texture.fromFrame("resources/KB_Explosion_frame4.png"),
					  PIXI.Texture.fromFrame("resources/KB_Explosion_frame5.png")
					];
}

/**
 *	Update the explosion in the render loop 
 */
ExplosionSprite.prototype.update = function(currTime) {
	if(currTime - this.borrowed >= 100 / this.speed) {
		
		
		if(this.frame == 4) {
			this.destroy = true;
			return;
		}
		this.frame++;

		this.sprite.setTexture(this.textures[this.frame]);
		this.borrowed = currTime
	}
}


/**
 *	Use this function to set the sprite at a specified x and y position instead of the default in the pattern
 */
ExplosionSprite.prototype.setSprite = function(sprite, start_x, start_y, scale, speed) {
	
	this.borrowed = new Date().getTime(); //clock when we created (this is temp until we can detect bounds)
	this.sprite = sprite;
	this.sprite.position.x = start_x;
	this.sprite.position.y = start_y;
	this.scale = scale;
	this.speed = speed;
	//set the scale of the explosion
	this.sprite.width *= scale;
	this.sprite.height *= scale;
	this.frame = 0;
	this.sprite.setTexture(this.textures[this.frame]);
	this.destroy = false;
}

/**
 *	Reset the scale of an explosion 
 */
ExplosionSprite.prototype.resetScale = function() {
	//if this has been scaled before, revert
	this.sprite.width /= this.scale;
	this.sprite.height /= this.scale;
}

/**
 *	Constants to represent explosion speeds 
 */
ExplosionSprite.SLOW = .5;
ExplosionSprite.NORMAL = 1;
ExplosionSprite.FAST = 2;