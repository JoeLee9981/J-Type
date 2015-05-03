<?php 

// // Get DB functions

require 'helper/db_config.php';
require 'helper/dbhelper.php';

// // Helper functions
// require 'helper/functions.php';

// // Authentication
require 'helper/authentication.php';

// // Use HTTPS
// redirectToHTTPS();


// // If this is a submission, process it
$loginError = '';
$passwordError = '';
if (isset($_REQUEST['login']) && isset($_REQUEST['password'])) {
	$login = htmlspecialchars($_REQUEST['login'], ENT_QUOTES);
    $password = htmlspecialchars($_REQUEST['password'], ENT_QUOTES);
	
	// Register user if name, login, and password are provided
	if ($login != '' && $password != '') {
		if (registerNewUser($login, $password)) 
		// if(true)
		{
			require 'index.php';
			return;
		}
		else {
			require 'views/register.php';
			return;
		}
	}
	
// 	// Complain if name is missing
// 	if ($name == '') {
// 		$nameError = 'Enter your name';
// 	}
	
// 	// Complain if name is missing
// 	if ($password == '') {
// 		$passwordError = 'Pick a password';
// 	}
	
// 	// Complain if login is missing
// 	if ($login == '') {
// 		$loginError = 'Pick a login name';
// 	}
	
// 	// Redisplay form
// 	require 'views/register.php';
	
}

else {
	require 'views/register.php';
}

?>
