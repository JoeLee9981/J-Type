<?php

  /**
   * Author: Doug Hitchcock
   *
   * This all needed fucntions that will need to go on with the registering and other things
   *
   */

include 'db_config.php';
// require 'authentication.php';
  /**
   * 
   *
   * This will register a user
   *
   */
function registerNewUser ($login, $password) {
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
    $hashedPassword = computeHash($password, makeSalt());
    $query =     "
       INSERT INTO User (Handle, Password)
       VALUES            (?, ?)
       ";
    $statement = $db->prepare( $query );
    $statement->bindValue(1, $login);
    $statement->bindValue(2, $hashedPassword);
    $statement->execute(  );
    session_start ();
    $_SESSION ['login'] = $login;

    return true;


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
}
// Returns the options for the cookie menu
function getCookieTypes () {
  try {   
        $DBH = openDBConnection();
        $stmt = $DBH->prepare("select CookieKey, CookieName from Cookies"); 
        $stmt->execute();
        $cookieTypes = array();
        while ($row = $stmt->fetch()) {
          $cookieTypes[$row['CookieKey']] = $row['CookieName'];
        }
        return $cookieTypes;
    }
    catch (PDOException $e) { 
      reportDBError($e); 
    }  
}
  /**
   * 
   *
   * Checks the login for validity
   *
   */
function checkingLogin ($login, $password) {
    try {   
      //Creates DB connection
      $db = new PDO("mysql:host=$server_name;dbname=jtype;charset=utf8", "root", "jtype");
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
      //Gets PW 
      $query =     "
         SELECT * FROM User WHERE Handle = ?
         ";
      $statement = $db->prepare( $query );
      $statement->bindValue(1, $login);
      $statement->execute(  );
      $result    = $statement->fetchAll(PDO::FETCH_ASSOC);
      $passwordDB = '';
      $UserID = '';
      $role = '';
      //Sets the session
      session_start ();
      foreach ($result as $row)
      {

        $login = $row['Handle'];
        $passwordDB = $row['Password'];
        $_SESSION['login'] = $login;
      }
      //Check the password and return accordingly. If it matches the set the role of the session
      if (computeHash($password, $passwordDB) == $passwordDB) {
        return true;
      }
        return false;
    }
    //Otherwise throw error
  catch (PDOException $e) { 
    $DBH->rollback();
    reportDBError($e);
  }
}


// Logs and reports a database error
function reportDBError ($exception) {
  $file = fopen("application/log.txt", "a"); 
  fwrite($file, date(DATE_RSS));
  fwrite($file, "\n");
  fwrite($file, $exception->getMessage());
  fwrite($file, $exception->getTraceAsString());
  fwrite($file, "\n");
  fwrite($file, "\n");
  fclose($file);
  require "views/error.php";
  exit();
}



?>
