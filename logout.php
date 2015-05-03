<?php 

session_start();

// Log out
unset($_SESSION['login']);

require 'helper/navbar.php';

?>

<html>
<head>
	<title> Logout </title>
    
    <?php echo $navbar ?>
</head>

<body>


<div class="panel">
	<h1><p>You have logged out. Have a nice day!</p></h1>
	<h2><p><a class="text-center" href="login.php">Login</a></p></h2>
</div>
</body>
</html>