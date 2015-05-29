<?php

  //$pin = $_GET['pin'];
  $state = 1;

  // Create cURL call, loop through all the lights
  for($i = 7; $i <= 9; $i++){
  	$service_url = 'http://192.168.2.46/digital/' . $i . '/' . $state;
  	$curl = curl_init($service_url);
   
  	// Send cURL to Yun board
  	curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4 ); 
  	$curl_response = curl_exec($curl);
  	curl_close($curl);

  	//Print answer
  	echo $curl_response;
  }
  

?>