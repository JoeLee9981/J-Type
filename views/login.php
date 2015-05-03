<?php
require 'helper/navbar.php';
?>
<html>
<head>
	<!-- This contains the index of the TA application.  Below is the information for the header.-->
	<title>Login</title>
	<!-- stylesheet location for the page -->


	<meta charset="UTF-8">
	<?php echo $navbar ?>

</head>
<!-- body tag that contains information for the page -->
<body>
	<!-- Header div for the application  -->
	<div class="header">TA Application</div>
	<!-- this div  contains the links-->
	
	<!-- information for the page -->
	<div id="panel" class="panel">
		<h2>Login</h2>
		
		<form method="post" action="">

			<p><label for="name"> Login:</label> 
				<input type="text" name="login" size="50"/>
				<span style="color:red"><?php echo $emailError?></span></p>

				<p><label for="password"> Password: </label>
				<input type="password" name="password" size="30"/>
				<span style="color:red"><?php echo $passwordError?></span></p>
				<a href="register.php"> Don't have an account?</a>

				<p><input type="submit" value="Login"/></p>
			</p>
		</form>
		</div>
</body>
</html>