// Function to control LEDs
function buttonClick(clicked_id){

    if (clicked_id == "1"){
        $.get( "digicurl.php", {
        pin: "7", state: "1"} );  
    } 

    if (clicked_id == "2"){
        $.get( "digicurl.php", {
        pin: "7", state: "0"} );  
    } 

    if (clicked_id == "3"){
        $.get( "digicurl.php", {
        pin: "8", state: "1"} );  
    } 

    if (clicked_id == "4"){
        $.get( "digicurl.php", {
        pin: "8", state: "0"} );  
    } 

}

function Slider(val){
	if (val == val){
		$.get("anacurl.php",{
		pin: "9", state: val} );
	}
}