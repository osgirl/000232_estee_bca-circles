//events
var GOT_FRIEND_LIST = "GOT_FRIEND_LIST";

var facebook = new Facebook();
var friendProfileList = new Array();

$(document).ready(function(){	
	enableButtons();
	enableEventBinds();
	
	$(window).resize(function(e){
		console.log($(window).width());
	})
	
	
});

function enableEventBinds(){
	$('body').bind(GOT_FRIEND_LIST, createFriendList);
}


function enableButtons(){
	
	$('#create_circle_btn').mouseover(function(e){
		$(e.currentTarget).css('cursor','pointer');
	})
	
	$('#create_circle_btn').click(function(e){
		facebook.createCircle();
	})
	
	$('#upload_photo_btn').mouseover(function(e){
		$(e.currentTarget).css('cursor','pointer');
	})
	
	$('#show_friendlist_btn').click(function(e){
		facebook.showFriendlist();
	})
}

function createFriendList(event){

	$.each(friendProfileList, function(index,value){
		var profileDiv = $('<div>');
		profileDiv.css('background-image','url(' + value + ')');
		profileDiv.addClass('profile_image');
		
		profileDiv.appendTo('#friendlist');
	})
}

function placeCircleInAngles(){
	var radius 	= 200,
		cx 		= 300,
		cy 		= 300,
		steps 	= 10,
		angle, x, y;

	for(var i = 0; i < steps; i++){
		angle = (Math.PI * ( i / steps -.25) ) *2;
		x = cx + radius * Math.cos(angle);
		y = cy + radius * Math.sin(angle);
		$('<div/>')
			.addClass('point')
			.css({'left': x, 'top': y})
			.appendTo('html');
	}
}


