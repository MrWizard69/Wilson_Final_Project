$(document).ready(function(){


	//navigation drop down
	$("nav ul li").hover(function(){
		$(this).addClass("active");
		$(this).find("ul").show().animate({opacity:1},400);
		},function(){
			$(this).find("ul").hide().animate({opacity:0},100);
			$(this).removeClass("active");
		}
	);
	
	//required: styling elements
	$('nav ul li ul li:first-child').prepend('<li class="arrow"></li>');
	$('nav ul li:first-child').addClass("last");
	$('nav ul li ul').parent().prepend('<span class="dropdown"></span>').addClass('drop');
	
	//login box
	$(".box").mouseenter(function(){
				$(".loginbox").show(400);
			});

			$(".loginbox").mouseleave(function(){
				$(".loginbox").hide(400);
			});
			
	//our story box		
	$('#hide').hide();
	
	$('#show').click(function(){
		$('#hide').show(1100);
		$('#show').hide(400);
	});
	
	
	//CTA button
	$('#logsub').hover(function(){  
   $(this).stop().animate({'opacity' : '1'}, 200);  
   }, function(){$(this).stop().animate({'opacity' : '.5'}, 200);});  
  

//AJAX
//Login
	$('#logsub').click(function(e){
		e.preventDefault();
		
		console.log('click')
		var username = $('#loguser').val();
		var password = $('#logpass').val();
		$.ajax({
			url: 'xhr/login.php',
			data:{
				username: username,
				password: password
			},
			type: 'post',
			dataType: 'json',
			success: function(response){
				console.log('works');
				console.log(response);
				window.location.assign('admin.html');
			}
		});	
	});
	
	 $('#submit_button').submit(function(e) {

        register();
        e.preventDefault();
        
    });
    
	
	
});

//logout
$('#logout').click(function(e){
		$.get('xhr/logout.php', function(){
			window.location.assign('index.html');
		})
		return false;
	})

//register
function register()
{
	hideshow('loading',1);
	error(0);
	
	$.ajax({
		type: "POST",
		url: "xhr/register.php",
		data: $('#submit_button').serialize(),
		dataType: "json",
		success: function(msg){
			
			if(parseInt(msg.status)==1)
			{
				window.location=msg.txt;
			}
			else if(parseInt(msg.status)==0)
			{
				error(1,msg.txt);
			}
			
			hideshow('loading',0);
		}
	});

}


function hideshow(el,act)
{
	if(act) $('#'+el).css('visibility','visible');
	else $('#'+el).css('visibility','hidden');
}

function error(act,txt)
{
	hideshow('error',act);
	if(txt) $('#error').html(txt);
}

//slide show
function slideSwitch() {
    var $active = $('#slideshow IMG.active');

    if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    // use this to pull the images in the order they appear in the markup
    var $next =  $active.next().length ? $active.next()
        : $('#slideshow IMG:first');

    
     var $sibs  = $active.siblings();
     var rndNum = Math.floor(Math.random() * $sibs.length );
     var $next  = $( $sibs[ rndNum ] );


    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
    setInterval( "slideSwitch()", 3000 );
});
