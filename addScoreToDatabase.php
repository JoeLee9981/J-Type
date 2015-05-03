<?php

include 'helper/db_config.php';         // contains db connection variables


//           $('#' + courseCode + 'td').append('<form id="' + applicantName + courseCode + 'form"><input name="TAlogin" type="hidden" value="' + applicantLogin + '"/><input name="courseCode" type="hidden" value="' + courseCode + '"/><input name="year" type="hidden" value="' + year + '"/><input name="section" type="hidden" value="' + section + '"/></form>');


if(isset($_REQUEST['Handle']) && isset($_REQUEST['Score']))
{
	
  try
  {
    //
    // The main content of the page will be in this variable
    //
    $output = "";
    
    //
    // Connect to the data base and select it.
    //
    $db = new PDO("mysql:host=$server_name;dbname=$db_name;charset=utf8", $db_user_name, $db_password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

    //
    // Build the basic query
    //
    // $tempRole1 = "applicant";
    // $query = "Select * from User";
    $query =     "
       INSERT INTO Scores (Handle, Score)
       VALUES            (?, ?)
       ";
 	  $statement = $db->prepare( $query );
    $statement->bindValue(1, $_REQUEST['login']);
    $statement->bindValue(2, $_REQUEST['score']);
    // var_dump($statement);

    $statement->execute(  );

    // require 'TALandingPage.php';
    
      // $output .= $applicantView;
      

  }
  catch (PDOException $ex)
  {
    $output .= "<p>oops</p>";
    $output .= "<p> Code: {$ex->getCode()} </p>";
    $output .=" <p> See: dev.mysql.com/doc/refman/5.0/en/error-messages-server.html#error_er_dup_key";
    $output .= "<pre>$ex</pre>";

    if ($ex->getCode() == 23000)
      {
        $output .= "<h3> Duplicate Entries not allowed </h3>";
      }
  }
}

?>