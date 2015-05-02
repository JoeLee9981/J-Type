<?php

require 'helper/navbar.php'

?>

<!DOCTYPE html>
<!--
      Author: Doug Hitchcock, Joe Lee, Steven Burnett, Melinda Lindhorst

      Date: January 26, 2015
      Description: Main landing page for VM/website/"Home Page"
-->
<html>
	<head>
		<meta charset="UTF-8">
		<title>Endless Side Scroller</title>

		<script src="pixi.js-master/bin/pixi.dev.js"></script>
		
		<script src="sprites/SpriteType.js"></script>
		<script src="sprites/AsteroidSprite.js"></script>
		<script src="sprites/ExplosionSprite.js"></script>
		<script src="sprites/BulletSprite.js"></script>
		<script src="sprites/EnemySprite.js"></script>
		<script src="sprites/PowerUpSprite.js"></script>
		<script src="sprites/PlayerShipSprite.js"></script>
		
		<script src="pools/AsteroidSpritesPool.js"></script>
		<script src="pools/ExplosionSpritesPool.js"></script>
		<script src="pools/BulletSpritesPool.js"></script>
		<script src="pools/EnemySpritesPool.js"></script>
		<script src="pools/PowerUpSpritesPool.js"></script>
		<script src="pools/WallSpritesPool.js"></script>
		
		<script src="objects/BackgroundScene.js"></script>
		<script src="objects/Enemies.js"></script>
		<script src="objects/Asteroids.js"></script>
		<script src="objects/Explosions.js"></script>
		<script src="objects/Bullets.js"></script>
		<script src="objects/PowerUps.js"></script>
		<script src="objects/Scroller.js"></script>
		
		<script src="Main.js"></script>

		<style>
			body {
				background-color: #000000;
			}
			canvas {
				background-color: #222222;
			}
		</style>
		<title> Final Project Home </title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    	<!-- <link rel="stylesheet" type="text/css" href="http://uofu-cs4540-30.cloudapp.net/my_work/TA7/css-styles/cs4540basic.css"> -->
    	<?php echo $navbar ?>
	</head>

	<body onload="init();">
		<div align="center">
			<canvas id="game-canvas" width="800" height="600"></canvas>
		</div>

		<script>
			function init() {
				main = new Main();
			}
		</script>
	</body>
</html>
