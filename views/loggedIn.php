<?php
// Find out what role they are and start building their view.  If they aren't anything then there has been a mistake.  Kick them back to login.
session_start ();
$role = $_SESSION ['role'];
$output = '';
if ($role == "Applicant") {
	$output = "<div class=body id=links>";
	$output .= "<nav>";
	$output .="<ul>";
	$output .= "<li><a href=../../index.html>Home</a></li>";
	$output .= "<li><label>Applicant</label>";
	$output .= "<ul>";
	$output .= "<li><a href=views/applicant.php>Application</a></li>";
	$output .= "<li><a href=views/formDisplay.php>Submitted Aplications</a></li>";
	$output .= "<li><a href=logout.php>logout</a></li>";
	$output .= "</ul>";
	$output .= "</ul>";
	$output .= "</nav>";
	$output .= "</div>";
	$title = "<p2>Welcome Applicant your application is being processed</p2>";
}
else if ($role == "Admin"){
	$output = "<div class=body id=links>";
	$output .= "<nav>";
	$output .="<ul>";
	$output .= "<li><a href=../../index.html>Home</a></li>";
	$output .= "<li><label>Admin</label>";
	$output .= "<ul>";
	$output .= "<li><a href=views/courseOverview.php>Course Overview</a></li>";
	$output .= "<li><a href=views/applicantPool.php>Applicant Pool</a></li>";
	$output .= "<li><a href=views/evaluation.php>Evaluation</a></li>";
	$output .= "<li><a href=logout.php>logout</a></li>";
	$output .= "</ul>";
	$output .= "</ul>";
	$output .= "</nav>";
	$output .= "</div>";
	$title = "<p2>Welcome Admin Check your application pool you have new records</p2>";
}
else if ($role == "Teacher") {
	$output = "<div class=body id=links>";
	$output .= "<nav>";
	$output .="<ul>";
	$output .= "<li><a href=../../index.html>Home</a></li>";
	$output .= "<li><label>Teacher</label>";
	$output .= "<ul>";
	$output .= "<li><a href=views/evaluationTeach.php>Evaluation</a></li>";
	$output .= "<li><a href=logout.php>logout</a></li>";
	$output .= "</ul>";
	$output .= "</ul>";
	$output .= "</nav>";
	$output .= "</div>";
	$title = "
	<div>
		<div>
			<div>
				<table>
					<tbody><tr>
						<th>Course:</br> CS4540</th>
						<th>Number of Students:</br> 90</th>
						<th>Approximate Number of TAs:</br> 2</th>
					</tr>
					<tr>
				</tbody>
			</table>
			</div>
			</br>
			</br>
			<div>
				<div>
					<label><u>All Applicants</u></label>
					<div>
						<ul class=class-list>
							<li>Steven Burnett</li>
							<li>Chase Toothflosee</li>
							<li>Mouse Keyboard</li>
							<li>Fakey Magge</li>
							<li>Flip Turn</li>
							<li>Upside Down	</li>
						</ul>
					</div>
				</div>
			</div>
			</br>
			</br>
			<div>
				<div>
					<label><u>Likely Good TAs</u></label>
					<div>
						<ul class=class-list>
							<li>Steven Burnett</li>
							<li>Chase Toothflosee</li>
						</ul>
					</div>
				</div>
			</div>
			</br>
			</br>
			<div>
				<div>
					<label><u>Strongly Desires</u></label>
					<div>
						<ul class=class-list>
							<li>Steven Burnett</li>
						</ul>
					</div>
				</div>
			</div>
			</br>
			</br>
			<div>
				<div>
					<label><u>Officially Hired</u></label>
					<div>
						<ul class=class-list>
							<li>Steven Burnett</li>
							<li>Chase Toothflosee</li>
						</ul>
					</div>
				</div>
			</div>
		</div>";
}
else {
	require 'login.php';
}

// Load in the role input correctly unless we have have a problem then kick them to the login screen
echo <<<END

<html>
<head>
	<!-- This contains the index of the TA application.  Below is the information for the header.-->
	<title>TA application</title>
	<!-- stylesheet location for the page -->
	<link rel="stylesheet" href="css/index.css">
	<meta name="description" content="Teaching Assistant Application">
	<meta name="author" content="Steven Burnett">
	<meta charset="UTF-8">
	<!-- keywords for the site -->
	<meta name="keywords" content="University, Utah, TA, Teaching, Assistant, Application, Steven Burnett">
</head>
<!-- body tag that contains information for the page -->
<body>
	<!-- Header div for the application  -->
	<div class="header">TA Application 3 home</div>
	<!-- this div  contains the links-->
	$output
	<div id="information" class="body">
		<p1>
			<h1>Hello!</h1>
		</p1>
		$title
	</div>
</body>
</html>

END;

?>