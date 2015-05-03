<?php

require 'helper/navbar.php';
include 'db_config.php';         // contains db connection variables
                                 // separated for security and abstraction purposes


$allScoresTable = "<h1>Overall Scores</h1><table class=\"table\"><th>Rank</th><th>Player</th><th>Score</th>";
$playerScoresTable = "";
try
  {
  //
  // The main content of the page will be in this variable
  //
    $output = "";

  //
  // Connect to the data base and select it.
    $db = new PDO("mysql:host=$server_name;dbname=jtype;charset=utf8", "root", "jtype");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    
    $query =     "
       Select * from Scores ORDER BY Score DESC
       ";
    $statement = $db->prepare( $query );
    $statement->execute(  );
    $result    = $statement->fetchAll(PDO::FETCH_ASSOC);
    $rank = 1;  
	foreach ($result as $row)
	{
		$allScoresTable .= "<tr><td>" . $rank . "</td><td>" . $row['Handle'] . "</td><td>" . $row['Score'] . "</td></tr>";
		$rank = $rank +1;
	}

	$allScoresTable .= "</table>";
	if(isset($_SESSION['login']))
	{
		$login = $_SESSION['login'];
		$playerScoresTable .= "<div class=\"panel\"><h1>". $login . " scores</h1><table class=\"table\"><th>Rank</th><th>Score</th>";
	    $query =     "
	       Select * from Scores WHERE Handle = ? ORDER BY Score DESC
	       ";
	    $statement = $db->prepare( $query );
	    $statement->bindValue(1, $login);
	    $statement->execute(  );
	    $result    = $statement->fetchAll(PDO::FETCH_ASSOC);
	    $rank = 1;  
	    foreach ($result as $row)
		{
			$playerScoresTable .= "<tr><td>" . $rank . "</td><td>" . $row['Score'] . "</td></tr>";
			$rank = $rank +1;
		}
		$playerScoresTable .= "</table></div>";
    }


  }
  // Otherwise print errors of the connection
  catch (PDOException $ex)
  {
    $output .= "<p>oops</p>";
    $output .= "<p> Code: {$ex->getCode()} </p>";
    $output .=" <p> See: dev.mysql.com/doc/refman/5.0/en/error-messages-server.html#error_er_dup_key";
    $output .= "<pre>$ex</pre>";

    if ($ex->getCode() == 23000)
    {
      $output .= "<h2> Duplicate Entries not allowed </h2>";
    }
  }


?>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Scores</title>
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<?php echo $navbar ?>
	</head>
	<body>
	<div class="container"> 
	  <div class="row">
	    <div class="col-md-9">
		    <div class="panel">
				<?php echo $allScoresTable ?>
			</div>
	    </div>
	    <div class="col-md-9">
		    
		      <?php echo $playerScoresTable ?>

	    </div>
	  </div>
	</div>

		
	</body>
<html>