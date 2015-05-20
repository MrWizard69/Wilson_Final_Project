<?php

  include 'ChromePhp.php';

  $username = $_GET['user'];
  $password = $_GET['password'];
    ChromePhp::log("User: " . $username . " pass: " . $password);

  
  
  $url = "http://192.168.2.46/";
  
  
$obj = json_decode(file_get_contents($url), true);
ChromePhp::log($obj['name']);
ChromePhp::log($obj['id']);
  
  
  
  if($obj['name'] == $username && $obj['id'] == $password){
  	ChromePhp::log('success!');
  }
  else{
  	ChromePhp::log('still works!');
    // ob_start();
//    	header("Location:http://192.168.0.14/#welcome");
//    	exit;
//    	ob_end_flush();
	
	// echo "<script type='text/javascript'>\n";
// 	echo "alert('You must enter first name');\n";
// 	echo "</script>";
	exit;
	
  
  }
?>

 
 <!-- 
<?php

header("Location: http://www.google.com");
exit;

?>
 -->
 
 
 