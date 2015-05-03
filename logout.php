<?php 

session_start();

// Log out
unset($_SESSION['login']);

require 'navbar.php';

?>

<html>
<head>
	<title> Logout </title>
    
    <?php echo $navbar ?>
</head>

<body>


<div class="panel">
	<p>You have logged out. Have a nice day!</p>
	<p><a href="login.php">Login</a></p>
</div>
</body>
</html>