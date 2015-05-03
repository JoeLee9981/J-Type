<?php
require '../helper/navbar.php';
session_start();
?>

<html>
<head>
	<!-- This contains the index of the TA application.  Below is the information for the header.-->
	<title>Registered</title>
	<!-- stylesheet location for the page -->
	<?php echo $navbar ?>
	<meta charset="UTF-8">
	
</head>
<!-- body tag that contains information for the page -->
<body>
	<!-- Header div for the application  -->
	<div class="header">Registered</div>
	
	<!-- information for the page -->
	<div id="information" class="body">
		<h2>Registered!!!!!!</h2>
		<p style="color:red">Registered As <?php echo $_SESSION ['login'] ?> Sign in to access your information</p>
	</div>
</body>
</html>