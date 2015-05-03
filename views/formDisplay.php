<?php

  /**
   * Author: Steven Burnett
   *
   * This handles the applicant submission and saves it off.
   *
   */

include 'db.php';         // contains db connection variables


session_start ();
$temp = $_SESSION['role'];
if ($temp == "Applicant") {}
else if ($_SESSION['role'] != "Applicant") {
  require 'badRole.php';
  exit();
}

try
{
  //
  // The main content of the page will be in this variable
  //
  $output = "";
  
  //
  // Connect to the data base and select it.
  //
  $db = new PDO("mysql:host=localhost;dbname=TA3;charset=utf8", "root", "872027348");
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

  //
  // Build the basic query
  //
  $query =     "
       SELECT * FROM Application
        ORDER BY applicationId DESC
        LIMIT 1;
   ";

  //
  // Prepare and execute the query
  //
  $statement = $db->prepare( $query );
  $statement->execute(  );

  //
  // Fetch all the results
  //
  $result    = $statement->fetchAll(PDO::FETCH_ASSOC);

  //
  // Build the web page for the results
  //";

  if ( empty( $result ) )
    {
      $output .= "<h2>Sorry No Applications</h2>";
    }
  else
    {  
      // for each thing we query get the information.
      foreach ($result as $row)
  {
    $output .= "<tr><td>Degree pursuing</td><td>" . $row['degreePursuing'] . "</td></tr>";
    $output .= "<tr><td>Semester Applying For</td><td>" . $row['semesterApplyingFor'] . "</td></tr>";
    $output .= "<tr><td>Employed Besides TA</td><td>" . $row['employedBesidesTA'] . "</td></tr>";
    $output .= "<tr><td>Other Job Description</td><td>" . $row['otherJobDescription'] . "</td></tr>";
    $output .= "<tr><td>Additional Course Information</td><td>" . $row['additionalCourseInformation'] . "</td></tr>";
    $output .= "<tr><td>Additional Details</td><td>" . $row['additionalDetails'] . "</td></tr>";
    $output .= "<tr><td>College School</td><td>" . $row['collegeSchool'] . "</td></tr>";
    $output .= "<tr><td>Available Hours</td><td>" . $row['availableHours'] . "</td></tr>";
  }
    }

}
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

//
// Below is the HTML content
//

echo <<<END


<html>
<head>
  <!-- Set the Title and associated stuff for the heading of the page -->
  <title>Application submitted</title>
  <link rel="stylesheet" href="../css/index.css">
  <meta name="description" content="Teaching Assistant Application">
  <meta name="author" content="Steven Burnett">
  <meta charset="UTF-8">
  <meta name="keywords" content="University, Utah, TA, Teaching, Assistant, Application, Steven Burnett">
</head>
<body>
  <!-- This div is the header Div -->
  <div class="header">Submitted Applications</div>
  <!-- This Div contains the information for links -->
  <div class="body" id="links">
    <nav>
      <ul>
        <li><a href="../../../index.html">Home</a></li>
      </li>
      <li><label>Applicant</label>
        <ul>
          <li><a href=formDisplay.php>Submitted Aplications</a></li>
          <li><a href=applicant.php>Application</a></li>
          <li><a href="logout.php">logout</a></li>
        </ul>
      </li>
    </ul>
  </nav>
</div>
<div id="information" class="body">
  <table border=1>
    <tr><th>Input Name</th><th>Input Value</th></tr>
    $output
  </table>
    
</div>
</body>
</html>


END;

?>