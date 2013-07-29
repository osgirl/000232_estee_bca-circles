//events
var LOGIN_SUCCESS			= "LOGIN_SUCCESS";
var NOT_LOGIN 				= "NOT_LOGIN"
var LOGOUT_SUCCESS 			= "LOGOUT_SUCCESS";
var GOT_USER_INFO 			= "GOT_USER_INFO";
var GOT_USER_PROFILE_PIC 	= "GOT_USER_PROFILE_PIC";
var GOT_FRIEND_LIST 		= "GOT_FRIEND_LIST";

var userFirstName;
var userLastName;
var userLocation;
var userProfilePhoto;

var facebook = new Facebook();
var friendProfileList = new Array();

$(document).ready(function(){	

	enableButtons();
	enableEventBinds();
});

function doWallPost(){
	facebook.createCircle();
}

function checkLoginStatus(){
	facebook.checkLoginStatus();
}

function enableEventBinds(){
	$('body').bind(LOGIN_SUCCESS, getLoginStatus);
	$('body').bind(NOT_LOGIN, getLogoutStatus);
	$('body').bind(LOGOUT_SUCCESS, getLogoutStatus);
	$('body').bind(GOT_USER_INFO, displayUserInfo);
	$('body').bind(GOT_USER_PROFILE_PIC, displayUserProfilePic);
	$('body').bind(GOT_FRIEND_LIST, createFriendList);
}

function getLoginStatus(e){	
	facebook.fetchUserInfo();
	facebook.fetchLargeUserProfilePicture();
	
	$('.create_circle_btn').unbind('click').click(function(e){
		//do create circle screen
		console.log("do create circle screen");
		openCreateCircle();
	})
	
	$('#upload_photo_btn').unbind('click').click(function(e){
		//do upload photos
		console.log("do upload photos")
	})
	
	$('.log_out_status').hide();
	$('.log_in_status').show();
}

function getLogoutStatus(e){
	$('.top_user_name').html("");
	$('.sign_in_btn').html('sign in');
	$('.sign_in_btn').unbind('click').click(facebook.logIn);
	
	$('#upload_photo_btn').unbind('click').click(facebook.logIn);
	
	$('.log_out_status').show();
	$('.log_in_status').hide();
}

function displayUserInfo(e){
	var shortenName = userFirstName + " " + userLastName.substr(0,1) + ".";
	$('.user_name_display').html(shortenName);
	$('.user_location_display').html(userLocation);
	$('.sign_in_btn').html('logout');
	$('.sign_in_btn').unbind('click').click(facebook.logOut);
}

function displayUserProfilePic(e){
	$('#user_profile_pic').css('background-image', 'url(' + userProfilePhoto + ')');
}


function enableButtons(){
	
	$('.sign_in_btn').mouseover(function(e){
		$(e.currentTarget).css('cursor','pointer');
	})
	
	$('.sign_in_btn').click(facebook.logIn)
	
	$('#language_btn').mouseover(function(e){
		$(e.currentTarget).css('cursor','pointer');
	})
	
	$('.create_circle_btn').mouseover(function(e){
		$(e.currentTarget).css('cursor','pointer');
	})
	
	$('#create').click(createCircle)
	
	$('#upload_photo_btn').mouseover(function(e){
		$(e.currentTarget).css('cursor','pointer');
	})
	
	$('#show_friendlist_btn').click(facebook.showFriendlist);
}

function openCreateCircle(){
	
}

function createCircle(){		

		//dummy data
		var _arr_dump = [];
	for( var i = 0; i < $('#sel').val(); i++ ){
		_arr_dump.push( "img/circle/" + (i+1) + ".jpg" );
	}

	console.log( $('#sel').val() );

		var post_data = {
			thumbs_url: _arr_dump,
			user_name: $('#name').val(),
			content: $('#content').val(),
		};


		$.ajax({
			url		: 'php/create-circle.php',
			type	: "POST",
			data 	: post_data,
			success : function(data){ _success(data) }
		});
		function _success(data){
			console.log('success ');
			$('#image').attr('src','data:image/jpeg;base64,'+ data);
		}
		function _fail(){
			console.log('fail');
		}
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


