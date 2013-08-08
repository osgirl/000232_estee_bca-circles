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
var gallery = new Gallery();

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
var TOOLTIP_TIMEOUT			= 1500;
var PHOTO_COLUMN_NUM		= 4;

$(document).ready(function(){	

	initFacebook();

	enableButtons();
	enableEventBinds();
	gallery.loadGallery();
	
	
	$('#friend_search_field').width(NAME_TEXTFIELD_WIDTH);
	$('#friend_search_field').tooltip({
		trigger:'manual'
	});

	$('#friend_search_wrapper').tooltip({
		trigger:'manual'
	});

});

function initFacebook(){
// This is boilerplate code that is used to initialize the Facebook
	  // JS SDK.  You would normally set your App ID in this code.
	
	  // Additional JS functions here
	  window.fbAsyncInit = function() {
	    FB.init({
	      appId      : fbAppId,        // App ID
	      status     : true,           // check login status
	      cookie     : true,           // enable cookies to allow the server to access the session
	      xfbml      : true            // parse page for xfbml or html5 social plugins like login button below
	    });
	    
	    checkLoginStatus();
	
	    // Put additional init code here
	  };
	
	  // Load the SDK Asynchronously
	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/all.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
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
	
	$('.upload_photo_btn').unbind('click').click(function(e){
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
	$('.upload_photo_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
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
	$('#choose_photos_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#close_friend_photos_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})

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
	$('#choose_photos_btn').unbind("click").click(openFriendPhotosPanel);
	$('#close_friend_photos_btn').unbind("click").click(closeFriendPhotosPanel);

	//$('#show_friendlist_btn').unbind("click").click(facebook.showFriendlist);
}


function openCreateCircleScreen(){
	$("#create_circle_screen").show();
	$("html, body").animate({ scrollTop: 0 }, "slow");
	createCircleWindowOpen = true;
	createCircleClicked = false;
	curSelectedGoal = $($(".goal_dropdown_list").get(0)).html();
	goal = curSelectedGoal;
	
	$("#custom_action").unbind("keyup").keyup(function(e){
		goal = $(e.currentTarget).val();
		if($(e.currentTarget).val() == ""){
			$("#select_action").css({ opacity: 1 });
		}else{
			$("#select_action").css({ opacity: .3 });
		}
	})
}

function goNextCreateCircleScreen(e){
	
	if(e){
		stepID = ($(e.currentTarget).attr('id') == "next_step_btn") ? 2 : 1; 
	}

	$('.create_circle_step').each(function(index,value){
		(index == stepID-1) ? $(value).show() : $(value).hide();
	})

	closeFriendPhotosPanel();
}


function closeCreateCircleScreen(){
	$("#create_circle_screen").hide();
	closeFriendPhotosPanel();
	createCircleWindowOpen = false;
}

function cancelCreateCircleScreen(){
	closeCreateCircleScreen();
	resetCircle();
}

function resetCircle(){

	$('#friend_search_wrapper').show();
	$('#choose_photos_wrapper').show();

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

    resetFriendPhotoItem($('.friend_item'))
	
	stepID = 1;
	goNextCreateCircleScreen(null);
}

function resetFriendPhotoItem(resetItem){

    resetItem.find('.photo_check').hide();
	resetItem.unbind('mouseout').mouseout(function(e){
     	$(e.currentTarget).find('.photo_check').hide();
     })
	resetItem.attr('checked',false);
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

	createFriendPhotosPanel();

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
		deleteImg.attr('src', baseUrl + 'img/buttons/delete-name-btn.png');
				 
		deleteImg.appendTo(deleteBtn);
		deleteBtn.appendTo(friendList);

		friendList.unbind('mouseover').mouseover(function(e){
			$(e.currentTarget).css('cursor','pointer');
			$(e.currentTarget).css('margin-left','-50px');

			$(e.currentTarget).addClass('friend_btn_over').removeClass('friend_btn');
		    $(e.currentTarget).width($(e.currentTarget).next('.temp_name_input_container').width() + 30);
		    $(e.currentTarget).find('.name_delete_btn').show();
		    
		    $('.name_delete_btn').unbind('click').click(function(e){
		    	deleteFriend($(e.currentTarget).parent());
		    	
		    })
		})
		
	friendList.unbind('mouseout').mouseout(function(e){
		$(e.currentTarget).css('margin-left','0');
		$(e.currentTarget).addClass('friend_btn').removeClass('friend_btn_over');
		$(e.currentTarget).width($(e.currentTarget).next('.temp_name_input_container').width() + 5);
		$(e.currentTarget).find('.name_delete_btn').hide();
	})
		
		$("#friend_list").append(friendList);
		$("#friend_list").append(tempFriendList);

		if(friendSelectedArray.length < MAX_FRIENDS_NUM) {
			$("#friend_list").append("<span class='comma'>, </span>"); 
		} else{
			$('#friend_search_wrapper').hide();
			$('#choose_photos_wrapper').hide();
		}
		
		resetNameTextfield();
		
	}else{

			$('#friend_search_field').tooltip('show');
			setTimeout(function(){
				$('#friend_search_field').tooltip('hide');
				resetNameTextfield();
			},TOOLTIP_TIMEOUT);
	}

}

function deleteFriend(deleteTarget){

	$('#friend_search_wrapper').show();
	$('#choose_photos_wrapper').show();

	if(friendSelectedArray.length == MAX_FRIENDS_NUM) $("#friend_list").append("<span class='comma'>, </span>");
	deleteTarget.next('.temp_name_input_container').next('.comma').remove();
	deleteTarget.next('.temp_name_input_container').remove();
	
	
	$.each(friendSelectedArray, function(index,value){
		var item = Object(value);
		if(String(item.id) == deleteTarget.attr('id')) {
			friendSelectedArray.splice(index,1);
			friendTagIDs.splice(index,1);
		}
	})

	deleteTarget.remove();

	$('.friend_item').each(function(i,v){
		if($(v).attr('id') == deleteTarget.attr('id')){
			resetFriendPhotoItem($(v));
		}
	})


}

function friendExist(id){
	var hasFriend  = false;
	$.each(friendSelectedArray, function(index, value){
		var item = Object(value);
		if(item.id == id) hasFriend = true
	})
	
	return hasFriend;
}

function createFriendPhotosPanel(){

	var rowNum = Math.ceil(friendProfileList.length/PHOTO_COLUMN_NUM);

	for(var r=0; r<rowNum; r++){
		var row = $('<div>');
		row.addClass('row')
			.appendTo('#friend_photos_container')

		for(var c=0; c<PHOTO_COLUMN_NUM; c++){
			var col = $('<div>');
			 col.addClass('span3 friend_item')
			 	.appendTo(row);
		}
	}

	$('.friend_item').each(function(index, value){

	    if(index <= friendProfileList.length-1){
    		var html = '<div class="friend_pic_wrapper_large"><img class="friend_pic_large" src='+friendProfileList[index].pic+' /><img class="photo_check" src="../img/assets/photo-check.png"></div>'
              html += '<div class="friend_name_large">'+friendProfileList[index].name
              html += '</div>';

             $(value).attr('id', friendProfileList[index].id);
             $(value).attr('checked', false);
             $(value).html(html);

             //enable friend select

             $(value).unbind('mouseover').mouseover(function(e){
             	$(e.currentTarget).css('cursor','pointer');
             	$(e.currentTarget).find('.photo_check').show();
             })

             $(value).unbind('mouseout').mouseout(function(e){
             	$(e.currentTarget).find('.photo_check').hide();
             })

             $(value).unbind('click').click(function(e){

             	if(!$(e.currentTarget).attr('checked')){

             		curSelectedFriendID = $(e.currentTarget).attr('id');

             		FB.api('/'+curSelectedFriendID, function(response){
				      if (response){
				        curFriendSelectedName = response.first_name + " " + response.last_name.substr(0,1) + ".";
				        $("#temp_name_enter_container").html(response.name);

				        addFriend();

				      } 
				    });
             		$(e.currentTarget).unbind('mouseout')
             		$(e.currentTarget).find('.photo_check').show();
             		$(e.currentTarget).attr('checked', true);

             	}else{

             		var friendSelectItem;

             		$('.friend_btn').each(function(i,v){
             			if($(v).attr('id') == $(e.currentTarget).attr('id')) {
             				friendSelectItem = $(v);
             			}
             		})

             		deleteFriend(friendSeleteItem)
             		resetFriendPhotoItem($(e.currentTarget));

             	}

             })
	    }

	})

	var setting = {
		showArrows: false,
        autoReinitialise: true
	}
	$('.scroll-pane').jScrollPane(Object(setting));

}

function openFriendPhotosPanel(){
	$('#friend_photos').show();
}

function closeFriendPhotosPanel(){
	$('#friend_photos').hide();
}

function createCircle(){	

	if(friendSelectedArray.length == 0){
		$('#friend_search_wrapper').tooltip('show');
		setTimeout(function(){
			$('#friend_search_wrapper').tooltip('hide');
		}, TOOLTIP_TIMEOUT)
		return;
	}
	
		console.log("user info", userID, userName)
		console.log("user photo", userProfilePhoto);
		console.log("user friends info", friendSelectedArray);
		console.log("friend tags", friendTagIDs);
		console.log("goal", goal);
		console.log("language", language);
		
		//facebook.createCircle();

		var value = {
				'users_fb_id' 	  : userID,
				'users_name'  	  : userName,
				'users_photo_url' : userProfilePhoto,
				'goal'			  : goal,
				'language'		  : 0 // optional, we still not sure about this field
			};

    	$.ajax({
        		type: 'post',
            	url: '../circle/create',
            	dataType: 'json',
            	data: value,
            	success: function(data) {            
                	console.log('success');
                	
             	},
             	error: function(jqXHR, textStatus, errorThrown){
					console.log(jqXHR.responseText);
					console.log(jqXHR.status);
				}
      		});

		
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


