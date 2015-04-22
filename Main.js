function Main() {
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = PIXI.autoDetectRenderer(
		800,
		600,
		{view:document.getElementById("game-canvas")}
	);

	this.loadSpriteSheet();
}

// TODO: Gradually increment scroll speed.
Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
	this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
	this.renderer.render(this.stage);
	requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
	var assetsToLoad = [ "resources/wall.json", "resources/spritesheet.json", 
						 "resources/bg-far.png", "resources/bg-mid.png", 
						 "resources/KB_BigAsteroid.png", "resources/KB_MidAsteroid.png",
						 "resources/KB_lilAsteroid.png", "resources/KB_EnemyBabyShip.png",
						 "resources/KB_EnemyMotherShip.png", "resources/KB_ship.png",
						 "resources/KB_shipfinwithflames.png", "resources/KB_PowerUps_Bomb.png", 
						 "resources/KB_PowerUps_ExtraLife.png", "resources/KB_PowerUps_Health.png", 
						 "resources/KB_PowerUps_Shooting.png", "resources/KB_PowerUps_Speed.png", 
						 "resources/KB_Explosion_frame1.png", "resources/KB_Explosion_frame2.png",
						 "resources/KB_Explosion_frame3.png", "resources/KB_Explosion_frame4.png",
						 "resources/KB_Explosion_frame5.png", "resources/KB_Laserbomb_Aqua.png",
						 "resources/KB_Laserbomb_Red.png", "resources/KB_Laserbullets_Aqua.png",
						 "resources/KB_Laserbullets_Red.png"];
	loader = new PIXI.AssetLoader(assetsToLoad);
	loader.onComplete = this.spriteSheetLoaded.bind(this);
	loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
	this.scroller = new Scroller(this.stage);						
	requestAnimFrame(this.update.bind(this));
};