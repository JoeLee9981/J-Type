<?php

require 'helper/navbar.php';

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
		<title>J-Type: Endless Side Scroller</title>

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
		
		<script src="objects/BackgroundScene.js"></script>
		<script src="objects/Enemies.js"></script>
		<script src="objects/Asteroids.js"></script>
		<script src="objects/Explosions.js"></script>
		<script src="objects/Bullets.js"></script>
		<script src="objects/PowerUps.js"></script>
		<script src="objects/Score.js"></script>
		<script src="objects/Scroller.js"></script>
		
		<script src="Main.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<style>
			body {
				background-color: #000000;
			}

			canvas {
				background-color: #222222;
			}
		</style>
		<?php echo $navbar ?>
	</head>

	<body onload="init();">
	<div class="container"> 
	  <div class="row">
	    <div class="col-md-8">
		<div align="center">
			<canvas id="game-canvas" width="800" height="600"></canvas>
		</div>
		</div>
		<div class="col-md-4">
		<div class="panel">
			<h1><p> Controls:</p></h1>
			<h2><p> Move: Arrow keys </p></h2>
			<h2><p> Shoot: Spacebar </p></h2>
			<h2><p> Bomb: A </p></h2>
		</div>
		</div>
		</div>
		</div>
		<script>
		
			var login = "<?= $login ?>";
		
			function init() {
				main = new Main();
			}
		</script>
		
	</body>
</html>
