<?php

require 'helper/navbar.php';

?>
<html>
<head>
	<!-- This contains the index of the TA application.  Below is the information for the header.-->
	<title>Register</title>
	<!-- stylesheet location for the page -->
	
	<meta charset="UTF-8">
	<!-- keywords for the site -->
	<?php echo $navbar ?>	
</head>
<!-- body tag that contains information for the page -->
<body>
	<div class="panel">
			<div id="information" class="body">
				<h2>Register</h2>

				<p>Please use the form below to register for this site.</p>
				<form method="post" action="">
				<p><label for="login">Login:</label> 
				<input type="text" name="login" id="login" size=30/>
				<span style="color:red"><?php echo $loginError?></span></p>
				<p><label for="password">Password</label>
				<input type="password" name="password" id="password" size="30"/>
				<span style="color:red"><?php echo $passwordError?></span></p>
				<p><input type="submit" value="Register"/></p>
				</form>
		</div>
	</div>
</body>
</html>