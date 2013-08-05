//events
var LOGIN_SUCCESS			= "LOGIN_SUCCESS";
var NOT_LOGIN 				= "NOT_LOGIN"
var LOGOUT_SUCCESS 			= "LOGOUT_SUCCESS";
var GOT_USER_INFO 			= "GOT_USER_INFO";
var GOT_USER_PROFILE_PIC 	= "GOT_USER_PROFILE_PIC";
var GOT_FRIEND_LIST 		= "GOT_FRIEND_LIST";

var language = "English";

var userID;
var userName;
var userFirstName;
var userLastName;
var userLocation;
var userProfilePhoto;

var facebook = new Facebook();
var friendProfileList = new Array();
var curSelectedFriendID;
var curSelectedFriendName;
var friendSelectedArray = new Array();
var friendTagIDs  = new Array();

var selectOpen = false;
var createCircleClicked = false;
var createCircleWindowOpen = false;
var stepID = 1;

//variables send to database
var goal;
var curSelectedGoal;

var NAME_TEXTFIELD_WIDTH 	= 135;
var MAX_FRIENDS_NUM		 	= 10;

$(document).ready(function(){	

	enableButtons();
	enableEventBinds();
	
	$('#friend_search_field').width(NAME_TEXTFIELD_WIDTH);
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
	$('body').bind(GOT_FRIEND_LIST, getFriendList);
}

function getLoginStatus(e){	
	console.log("log in")
	facebook.fetchUserInfo();
	facebook.fetchLargeUserProfilePicture();
	facebook.fetchFriendlist();
	
	$('.start_create_circle_btn').unbind('click').click(function(e){openCreateCircleScreen();})
	
	$('.log_out_status').hide();
	$('.log_in_status').show();
	
	if(createCircleClicked) openCreateCircleScreen();
}

function getLogoutStatus(e){
	console.log("log out")
	$('.top_user_name').html("");
	$('.sign_in_btn').html('sign in');
	$('.sign_in_btn').unbind('click').click(facebook.logIn);
	
	$('.start_create_circle_btn').unbind('click').click(function(e){
		facebook.logIn();
		createCircleClicked = true;
	})
	
	$('#upload_photo_btn').unbind('click').click(function(e){
		console.log('do upload photo');
	});
	
	$('.log_out_status').show();
	$('.log_in_status').hide();
	
}

function displayUserInfo(e){
	var shortenName = userFirstName + " " + userLastName.substr(0,1) + ".";
	var fullName = userFirstName + " " + userLastName;
	$('.user_name_display').html(shortenName);
	$('.user_location_display').html(userLocation);
	$('#create_circle_user').html(fullName);
	$('.sign_in_btn').html('logout');
	$('.sign_in_btn').unbind('click').click(facebook.logOut);
}

function displayUserProfilePic(e){
	$('#user_profile_pic').css('background-image', 'url(' + userProfilePhoto + ')');
}

function enableButtons(){
	//enable finger cursor
	$('.sign_in_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#language_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('.start_create_circle_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#upload_photo_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#select_action_button').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$(".goal_dropdown_list").unbind('mouseover').mouseover(function(e){
		$(e.currentTarget).css({
			cursor: "pointer",
			backgroundColor: "#e8e8e8"
		});
	})
	$(".goal_dropdown_list").unbind('mouseout').mouseout(function(e){$(e.currentTarget).css("background", "none");})
	$('.cancel_create_circle_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#next_step_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#back_step_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#name_plus_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#create_circle_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})

	//enable clicks
	$('.sign_in_btn').unbind("click").click(facebook.logIn)
	$('#create').unbind("click").click(createCircle)
	$('#select_action_button').unbind('click').click(function(e){
		(!selectOpen) ? openActionSelect() : closeActionSelect();
	})
	$(".goal_dropdown_list").unbind('click').click(function(e){actionSelected(e);})
	$(".cancel_create_circle_btn").unbind("click").click(cancelCreateCircleScreen);
	$("#next_step_btn").unbind("click").click(function(e){goNextCreateCircleScreen(e)});
	$("#back_step_btn").unbind("click").click(function(e){goNextCreateCircleScreen(e)});
	$('#name_plus_btn').unbind("click").click(addFriend);
	$('#create_circle_btn').unbind("click").click(createCircle);

	//$('#show_friendlist_btn').unbind("click").click(facebook.showFriendlist);
}

function openCreateCircleScreen(){
	$("#create_circle_screen").show();
	$("html, body").animate({ scrollTop: 0 }, "slow");
	createCircleWindowOpen = true;
	createCircleClicked = false;
	curSelectedGoal = $($(".goal_dropdown_list").get(0)).html();
	
	$("#custom_action").unbind("keyup").keyup(function(e){
		goal = $(e.currentTarget).val();
		if($(e.currentTarget).val() == ""){
			$("#select_action").css({ opacity: 1 });
		}else{
			$("#select_action").css({ opacity: .3 });
		}
		
		//console.log("goal", goal);
	})
}

function goNextCreateCircleScreen(e){
	
	if(e){
		stepID = ($(e.currentTarget).attr('id') == "next_step_btn") ? 2 : 1; 
	}

	$('.create_circle_step').each(function(index,value){
		(index == stepID-1) ? $(value).show() : $(value).hide();
	})
}


function closeCreateCircleScreen(){
	$("#create_circle_screen").hide();
	createCircleWindowOpen = false;
}

function cancelCreateCircleScreen(){
	closeCreateCircleScreen();
	resetCircle();
}

function resetCircle(){
	$("#select_action").css({ opacity: 1 });
	goal = $($(".goal_dropdown_list").get(0)).html();
	curSelectedGoal = goal;
	$("#select_action_field").html(goal);
	$("#custom_action").val("");
	friendSelectedArray=[];
    friendTagIDs=[];
    $(".friend_btn").remove();
    $(".temp_name_input_container").remove();
    $(".comma").remove();
    resetNameTextfield();
	
	stepID = 1;
	goNextCreateCircleScreen(null);
}

function openActionSelect(){
	$("#select_action").css({ opacity: 1 });
	goal = curSelectedGoal;
	$("#custom_action").val("");
	$("#select_goal_dropdown").show();
	selectOpen = true;
	
	//console.log("goal", goal);
}

function closeActionSelect(){
	$("#select_goal_dropdown").hide();
	selectOpen = false;
}

function actionSelected(e){
	closeActionSelect();
	
	goal = $(e.currentTarget).html();
	curSelectedGoal = goal;
	$("#select_action_field").html(goal);
	$("#custom_action").val("");
	
	//console.log("goal", goal);
}


function getFriendList(e){
	
	$('#friend_search_field').unbind('keyup').keyup(function(e){
		if($(e.currentTarget).val() == "")  resetNameTextfield();
	})
	
	$('#friend_search_field').typeahead({
			source: function (query, process) {
			    names = [];
			    nameObj = {};
			 
			    $.each(friendProfileList, function (i, value) {
			        nameObj[value.name] = value;
			        names.push(value.name);
			    });
			 
			    process(names);
			},
			sorter: function (items) {
			    return items.sort();
			},
			updater: function (item) {
				curSelectedFriendID = nameObj[item].id;
				
				FB.api('/'+curSelectedFriendID, function(response){
			      if (response){
			        console.log(response);
			        curFriendSelectedName = response.first_name + " " + response.last_name.substr(0,1) + ".";
			        
			        //resize the field
			        $("#temp_name_enter_container").html(response.name);
				    $('#friend_search_field').width($("#temp_name_enter_container").width() + 15);
				    $('#name_plus_btn').show();

			      } else {
			        console.log('friend names goes wrong', response);
			      }
			    });

			    return item;
			},
            highlighter: function (item) {
            	
              var friendItem = nameObj[item];

	          var html = '<div class="friend_pic_wrapper pull-left"><img class="friend_pic" src='+friendItem.pic+' /></div>'
	              html += '<div class="friend_name pull-left">'+friendItem.name
	              html += '</div>';
              return html;
			}
        });

}

function resetNameTextfield(){
	$('#name_plus_btn').hide();
	$('#friend_search_field').width(NAME_TEXTFIELD_WIDTH);
	$('#friend_search_field').val("");
}


function addFriend(){
	
	if(!friendExist(curSelectedFriendID)){
		var friendObj = new Object();
		friendObj.id = curSelectedFriendID;
		friendObj.name = curFriendSelectedName;
		friendSelectedArray.push(friendObj);
		friendTagIDs.push(curSelectedFriendID);
		
		console.log('add', friendSelectedArray);
		console.log('add', friendTagIDs);
		
		var tempFriendList = $('<span>');
		tempFriendList.html(curFriendSelectedName)
					  .addClass('temp_name_input_container');
	
		var friendList = $('<div>');
		friendList.html(curFriendSelectedName)
				  .attr('id', curSelectedFriendID)
				  .addClass('friend_btn');
		
		var deleteBtn = $('<a>');
		deleteBtn.addClass('name_delete_btn');
		var deleteImg = $('<img>');
		deleteImg.attr('src', '../img/buttons/delete-name-btn.png');
				 
		deleteImg.appendTo(deleteBtn);
		deleteBtn.appendTo(friendList);

		friendList.unbind('mouseover').mouseover(function(e){
			$(e.currentTarget).css('cursor','pointer');
			$(e.currentTarget).addClass('friend_btn_over').removeClass('friend_btn');
		    $(e.currentTarget).width($(e.currentTarget).next('.temp_name_input_container').width() + 30);
		    $(e.currentTarget).find('.name_delete_btn').show();
		    
		    $('.name_delete_btn').unbind('click').click(function(e){

		    	$(e.currentTarget).parent().next('.temp_name_input_container').next('.comma').remove();
		    	$(e.currentTarget).parent().next('.temp_name_input_container').remove();
		    	$(e.currentTarget).parent().remove();
		    	
		    	$.each(friendSelectedArray, function(index,value){
		    		var item = Object(value);
		    		if(String(item.id) == $(e.currentTarget).parent().attr('id')) {
		    			friendSelectedArray.splice(index,1);
		    			friendTagIDs.splice(index,1);
		    		}
		    	})
		    	
		    	console.log('remove', friendSelectedArray);
		    	console.log('remove', friendTagIDs);
		    })
		})
		
	friendList.unbind('mouseout').mouseout(function(e){
		$(e.currentTarget).addClass('friend_btn').removeClass('friend_btn_over');
		$(e.currentTarget).width($(e.currentTarget).next('.temp_name_input_container').width() + 5);
		$(e.currentTarget).find('.name_delete_btn').hide();
	})
		
		$("#friend_list").append(friendList);
		$("#friend_list").append(tempFriendList);

		(friendSelectedArray.length < MAX_FRIENDS_NUM) ? $("#friend_list").append("<span class='comma'>, </span>") : $('#friend_search_field').hide();
		
		resetNameTextfield();
		
	}else{
		$('#friend_search_field').tooltip({
			title:"test",
			container: "#friend_search_field"
		})
	}

}

function friendExist(id){
	var hasFriend  = false;
	$.each(friendSelectedArray, function(index, value){
		var item = Object(value);
		if(item.id == id) hasFriend = true
	})
	
	return hasFriend;
}

function removeFriend(id){
	$each(friendSelectedArray, function(index, value){
		if(value.id == id) friendSelectedArray.splice(index, 1);
	})
	
}

function createCircle(){	
	
		console.log("user info", userID, userName)
		console.log("user photo", userProfilePhoto);
		console.log("user friends info", friendSelectedArray);
		console.log("friend tags", friendTagIDs);
		console.log("goal", goal);
		console.log("language", language);
		
		//facebook.createCircle();
		
		cancelCreateCircleScreen();
		

		//dummy data
		// var _arr_dump = [];
	// for( var i = 0; i < $('#sel').val(); i++ ){
		// _arr_dump.push( "img/circle/" + (i+1) + ".jpg" );
	// }
// 
	// console.log( $('#sel').val() );
// 
		// var post_data = {
			// thumbs_url: _arr_dump,
			// user_name: $('#name').val(),
			// content: $('#content').val(),
		// };
// 
// 
		// $.ajax({
			// url		: 'php/create-circle.php',
			// type	: "POST",
			// data 	: post_data,
			// success : function(data){ _success(data) }
		// });
		// function _success(data){
			// console.log('success ');
			// $('#image').attr('src','data:image/jpeg;base64,'+ data);
		// }
		// function _fail(){
			// console.log('fail');
		// }
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


