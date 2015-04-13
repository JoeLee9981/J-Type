Run locally in Firefox.

--- File Structure ---
	objects: 			All objects in game.
	pixi.js-master: 	PIXI.js files.
	pools:				Pool class for each object.
	resources:	 		Images and JSON for game.
	sprites:			Wrappers for sprites.
	
--- How It Fits Together ---
	The objects contain a pool of sprites. For instance,
		Bullets contains a BulletSpritesPool of BulletSprites.
		
	Sprites contain basic information about the sprite.
	Pools control the finite number of sprites in the viewport. They swap the sprites in and out.
	Objects use the pool to control everything at a higher level in reference to the viewport.
	
	Additional objects are:
		BackgrounScene - Controls the three layers of our parallax background.
		Scroller - Contains all other objects and controls the viewport (scrolling).
		
--- Additional Information ---
	Tutorial: http://www.yeahbutisitflash.com/?p=5226