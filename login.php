<?php 
// // Get DB functions
require 'helper/db_config.php';

include 'helper/dbhelper.php';

// // Helper functions
require 'helper/functions.php';

// // Authentication
require 'helper/authentication.php';

// // Use HTTPS
redirectToHTTPS();


// // If this is a submission, process it
$emailError = '';
$passwordError = '';

if (isset($_REQUEST['login']) && isset($_REQUEST['password'])) {
	$login = htmlspecialchars($_REQUEST['login'], ENT_QUOTES);
    $password = htmlspecialchars($_REQUEST['password'], ENT_QUOTES);
	
	// Register user if name, login, and password are provided
	if ($login != '' && $password != '') {
		if (checkingLogin($login, $password)) 
		// if(true)
		{
			require 'index.php';
			return;
		}
		else {
			$passwordError = 'Invalid Login Info'; 
			require 'views/login.php';
			return;
		}
	}
	
	// Complain if name is missing
	if ($login == '') {
		$loginError = 'Required to log in';
	}
	
	// Complain if name is missing
	if ($password == '') {
		$passwordError = 'Please fill this field out';
	}
	
	// Redisplay form
	require 'views/login.php';
	
}

else {
	require 'views/login.php';
}

?>
