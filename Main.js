function Main() {
	this.stage = new PIXI.Stage(0x66FF99);
	this.renderer = PIXI.autoDetectRenderer(
		800,
		600,
		{view:document.getElementById("game-canvas")}
	);

	this.loadSpriteSheet();
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
	this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
	this.renderer.render(this.stage);
	requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
	// TODO: Add in paths for JSON files and images.
	var assetsToLoad = ["resources/wall.json", "resources/bg-far.png", "resources/bg-mid.png"];
	loader = new PIXI.AssetLoader(assetsToLoad);
	loader.onComplete = this.spriteSheetLoaded.bind(this);
	loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
	this.scroller = new Scroller(this.stage);						
	requestAnimFrame(this.update.bind(this));

	// TODO: Load in obstacles, powerups, bullets, and enemies here.
	// TODO: Attach appropriate sprite sheet JSON key.
};