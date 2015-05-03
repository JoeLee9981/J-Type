<?php 

unset($_SESSION['UserID']);
unset($_SESSION['role']);


?>

<html> 
<head>
	<!-- This contains the index of the TA application.  Below is the information for the header.-->
	<title>GoodBye!</title>
	<!-- stylesheet location for the page -->
	<link rel="stylesheet" href="../css/index.css">
	<meta name="description" content="Teaching Assistant Application">
	<meta name="author" content="Steven Burnett">
	<meta charset="UTF-8">
	<!-- keywords for the site -->
	<meta name="keywords" content="University, Utah, TA, Teaching, Assistant, Application, Steven Burnett">
</head>
<!-- body tag that contains information for the page -->
<body>
	<!-- Header div for the application  -->
	<div class="header">GoodBye</div>
	<!-- this div  contains the links-->
	<div class="body" id="links">
		<nav>
			<ul>
				<li><a href="../../../index.html">Home</a></li>
			</li>
				<ul>
					<li><a href="../login.php">Login</a></li>
				</ul>
			</li>
		</ul>
	</nav>
</div>
<!-- information for the page -->
<div id="information" class="body">
	<h1>Good Bye!</h1>
	<p1>Login to access something.</p1>
</div>
</html>
