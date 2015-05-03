<?php

// Echoes a parameter value if it exists
function sticky ($name) {
	if (isset($_REQUEST[$name])) {
		echo $_REQUEST[$name];
	}
}

// Returns a sequence of OPTION tags that can be used to display
// the cookie choices in a pulldown menu. $cookieTypes is an array
// of key/value pairs; $selected is the key of the cookie that should
// be the selected option.
function createCookieOptions ($cookieTypes, $selected) {
	$result = '';
	foreach ($cookieTypes as $key => $name) {
		$selection = ($selected == $key) ? "selected='selected'" : "";
		$result = $result . "<option value='$key' $selection>$name</option>\n";
	}
	return $result;
}


// Returns the URL of the cookie image to be displayed.
function createCookieImage ($defaultCookie) {
	return "../cookies/$defaultCookie.jpg";
}

?>
