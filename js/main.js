// ==============================================================================
// ================ A Clickfire Media Production
// ================ Author - Jason Torden, Mili Kuo, Siwon Oh, Owen Corso
// ==============================================================================

var isLogin;

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
var carousel = new Carousel();
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
var agree = false;

var goal;
var goalID;

var curSelectedGoal;
var curSelectedGoalID;

var NAME_TEXTFIELD_WIDTH 	= 135;
var MAX_FRIENDS_NUM		 	= 9;
var TOOLTIP_TIMEOUT			= 1500;
var PHOTO_COLUMN_NUM		= 4;
var TRENDING_ACTION_SHOW	= 3;

var goalData;
var trendingData;

var photoButtonHtml = '<div class="gallery_item_btn"><div class="rollover_content"><div class="pink_btn all_cap view_circle_btn">view</div></div></div>';
var statsItemHtml = "<tr><td class='action_icon' rowspan='2'><img/></td><td class='action_line_1 light_font'></td></tr><tr><td class='action_line_2'></td></tr>";

var pageNum = 1;
var isMoreFeed = false;
var currentSameGoal; 
var currentSameGoalID; 
var currentSameGoalType;
var isCustomizeGoal;

var country = "united-states";
var fakePhotoData;

$(document).ready(function(){	

	initFacebook();

	enableButtons();
	enableEventBinds();

	$.feed();
	fm_ready(function($, _) {
		carousel.initCarousel();
		gallery.loadGallery();	


			$('body').unbind("ALL_LAYOUT_CREATED").bind('ALL_LAYOUT_CREATED', function(){

				console.log("ALL_LAYOUT_CREATED");

				if(checkCircleCookie()){
					var c = getCircleCookie("circle");
					
					console.log("circle cookie");

					gallery.refreshAsFakeCircleData(c); 
				}

			    if(checkPhotoCookie()){
					var p = getPhotoCookie("photo");	

					console.log("photo cookie");
				    gallery.refreshAsFakePhotoData(p); 
			}
		})

	});
	
	
	$('#friend_search_field').width(NAME_TEXTFIELD_WIDTH);
	$('#friend_search_field').tooltip({
		trigger:'manual'
	});

	$('#friend_search_wrapper').tooltip({
		trigger:'manual'
	});

	createGoalDropdown();

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
	$('body').bind("SAME_GOAL_BUTTON_CLICKED", function(e){

		(isLogin) ? openCreateCircleScreen(true) : facebook.logIn();
	});

	$('body').bind("CREATE_NEW_CIRCLE_BUTTON_CLICKED", function(e){
		(isLogin) ? openCreateCircleScreen(false) : facebook.logIn();
	});

	$('body').bind('PHOTO_UPLOADED', function(e){

		console.log("photo name", fakePhotoData)

		 var cookieData 					= {};
			cookieData.file_name 			= fakePhotoData.file_name;
			cookieData.description 			= fakePhotoData.description;
			 savePhotoToCookie(cookieData);
			 gallery.refreshAsFakePhotoData(cookieData);
	});

}

function getLoginStatus(e){	
	facebook.fetchUserInfo();
	facebook.fetchFriendlist();
	
	$('.start_create_circle_btn').unbind('click').click(function(e){openCreateCircleScreen(false);})
	
	$('.log_out_status').hide();
	$('.log_in_status').show();
	
	if(createCircleClicked) openCreateCircleScreen(false);

	
}

function getLogoutStatus(e){
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

	getUserCircleData();
}

function displayUserProfilePic(e){
	$('#user_profile_pic').css('background-image', 'url(' + userProfilePhoto + ')');
}

function enableButtons(){
	//enable finger cursor
	$('.language').unbind('mouseover').mouseover(function(e){
		$(e.currentTarget).css('color','#f38dab');
	})
	$('.language').unbind('mouseout').mouseout(function(e){
		$(e.currentTarget).css('color','#777');
	})
	$('.pink_btn').unbind('mouseover').mouseover(function(e){
		$(e.currentTarget).css('cursor','pointer');
		$(e.currentTarget).removeClass("pink_btn").addClass("pink_btn_rollover");
	})
	$('.pink_btn').unbind('mouseout').mouseout(function(e){
		$(e.currentTarget).removeClass("pink_btn_rollover").addClass("pink_btn");
	})
	$('.pink_btn_rollover').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})

	$('.sign_in_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#language_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#select_action_button').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#name_plus_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('#close_friend_photos_btn').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('.feature_circle_link').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
	$('.feature_photo_link').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})


	//enable clicks
	$('.language').unbind('click').click(function(e){

		country = $($(e.currentTarget).parent()).attr('id');
		var smallflagSrc = baseUrl + "img/flags/small/" + country + ".png";
		var shorten_country = $($($(e.currentTarget).parent()).find('.ab_country')).html();
		
		$('.flag img').attr('src', smallflagSrc);
		$('.country_name').html(shorten_country);
	})
	$('#conversation_btn').unbind("click").click(function(e){
		$("html, body").animate({ scrollTop: 766 }, "slow");
	});
	$('.sign_in_btn').unbind("click").click(facebook.logIn);
	$('#create').unbind("click").click(confirmCreateCircle);
	$('#select_action_button').unbind('click').click(function(e){
		(!selectOpen) ? openActionSelect() : closeActionSelect();
	})
	
	$(".cancel_create_circle_btn").unbind("click").click(openCancelScreen);
	$("#next_step_btn").unbind("click").click(function(e){goNextCreateCircleScreen(e)});
	$("#back_step_btn").unbind("click").click(function(e){goNextCreateCircleScreen(e)});
	$('#name_plus_btn').unbind("click").click(addFriend);
	$('#create_circle_btn').unbind("click").click(confirmCreateCircle);
	$('#choose_photos_btn').unbind("click").click(openFriendPhotosPanel);
	$('#close_friend_photos_btn').unbind("click").click(closeFriendPhotosPanel);
	//$('#final_create_btn').unbind("click").click(createCircle);
	$('#close_create_circle_btn').unbind("click").click(cancelCreateCircleScreen);
	$('.yes_btn').unbind("click").click(cancelCreateCircleScreen);
	$('.no_btn').unbind("click").click(backToCreateCircleScreen);

	$('.popup_checkbox').click(toggleCheckbox);

	$('.circle_fb_share_btn').click(function(e){

		var currentClickedCircle = $(e.currentTarget).parents('.circle_container');
		shareFacebook($(currentClickedCircle));
	});
	

	//$('#show_friendlist_btn').unbind("click").click(facebook.showFriendlist);
}



function shareFacebook(circle){

	console.log('pop up', circle)

	var circle_goal = $(circle.find(".goal_text")).html();
	var circle_id = circle.attr('circle_id');

	var shareData = {
		type:'facebook',
		action: circle_goal,
		id:circle_id,
		post_type:'circle'
	}
	$.popup_share(shareData);
}

function toggleCheckbox(e)
{
    agree = (agree) ? false : true;
    $(e.target).css('background-position', ((agree) ? $(e.target).width() * -1 : 0), 0);

    if (agree) {
    	$('#final_create_btn').removeClass('dim');
    	$('#final_create_btn').unbind("click").click(createCircle)
    }else {
    	$('#final_create_btn').addClass('dim');
    	$('#final_create_btn').unbind("click");
    }
}

function createGoalDropdown(){
	$.ajax({
    	url: baseUrl + 'goal/fetchGoalData',
    	dataType: 'json',
    	success: function(data) {  

    		goalData = data;
    		

    		$('#goal_selected').html(goalData[0].goal);      
        	$(goalData).each(function(i, v){

        		if(v.goal_type == "default"){
        			var list = $('<li>');
        			list.addClass('goal_dropdown_list')
        			.html(v.goal)
        			.appendTo($('#goal_dropdown_lists'));

        			list.unbind('mouseover').mouseover(function(e){
						$(e.currentTarget).css({
							cursor: "pointer",
							backgroundColor: "#e8e8e8"
						});
					})
					list.unbind('mouseout').mouseout(function(e){$(e.currentTarget).css("background", "none");})
        			list.unbind('click').click(function(e){actionSelected(e);})
        		}

        	})

        	trendingData = data;
        	
        	getTrendingAction();
     	}
	});
}

function getTrendingAction(){

	trendingData.sort(function sortNumber(a, b){
		  var aNum = Number(a.taken_number);
		  var bNum = Number(b.taken_number); 
		  return ((aNum > bNum) ? -1 : ((aNum > bNum) ? 0 : 1));
	});

	var actionCount = 0;

	$('#trending_actions_1 .action_item').remove();
	$('#trending_actions_2 .action_item').remove();

	$(trendingData).each(function(i, v){

		if(v.taken_number !=0){

			actionCount++;

			if(actionCount <= TRENDING_ACTION_SHOW){
				var line1 = v.taken_number + " People will";
				var line2 = v.goal;

				createStatItem(v, $('#trending_actions_1'), line1, line2, v, false);
				createStatItem(v, $('#trending_actions_2'), line1, line2, v, false);
			}

		}

	})
}


function openCreateCircleScreen(hasGoal){
	$(".overlay").fadeIn(100);
	$("#create_circle_screen").fadeIn(200);
	$("html, body").animate({ scrollTop: 0 }, "slow");
	createCircleWindowOpen = true;
	createCircleClicked = false;


	if(hasGoal){
		curSelectedGoal = goal = currentSameGoal;
		goalID = curSelectedGoalID = currentSameGoalID;

		console.log('has goal', currentSameGoal, currentSameGoalType, currentSameGoalID);
		if(currentSameGoalType == "default"){
			actionSelected(null);
			isCustomizeGoal = false;
		}else{
			$("#custom_action").val(currentSameGoal);
			isCustomizeGoal = true;
		}
	}else{
		curSelectedGoal = $($(".goal_dropdown_list").get(0)).html();
		goal = curSelectedGoal;
		goalID = curSelectedGoalID = 1;
	}
	
	$("#custom_action").unbind("keyup").keyup(function(e){
		goal = $(e.currentTarget).val();
		if($(e.currentTarget).val() == "")
			$("#select_action").css({ opacity: 1 });
		else
			$("#select_action").css({ opacity: .3 });

		
	})
}

function backToCreateCircleScreen(){
	$("#create_circle_screen").fadeIn(200);
	$("#cancel_screen").hide();
	createCircleWindowOpen = true;
}

function goNextCreateCircleScreen(e){
	
	if(e){
		stepID = ($(e.currentTarget).attr('id') == "next_step_btn") ? 2 : 1; 
	}

	$('.create_circle_step').each(function(index,value){
		(index == stepID-1) ? $(value).fadeIn(200) : $(value).hide();
	})

	closeFriendPhotosPanel();
}


function closeCreateCircleScreen(){
	$("#create_circle_screen").hide();
	closeFriendPhotosPanel();
	createCircleWindowOpen = false;
}

function openCancelScreen(){
	$('#cancel_screen').fadeIn(200);
	$('#create_circle_screen').hide();
	$('#circle_confirm_screen').hide();
}


function cancelCreateCircleScreen(){
	$('#circle_confirm_screen').slideUp(200);
	$('.overlay').fadeOut(200);
	$('#opt_in').fadeIn(200);
	$('#thank_you').hide();
	$('#cancel_screen').hide();
	closeCreateCircleScreen();
	resetCircle();
}

function resetCircle(){

	$('#friend_search_wrapper').show();
	$('#choose_photos_wrapper').show();

	$("#select_action").css({ opacity: 1 });
	goal = $($(".goal_dropdown_list").get(0)).html();
	goalID = curSelectedGoalID = 1;
	curSelectedGoal = goal;
	$("#select_action_field").html(goal);
	$("#custom_action").val("");
	friendSelectedArray=[];
    friendTagIDs=[];
    $(".friend_btn").remove();
    $(".temp_name_input_container").remove();
    $(".comma").remove();
    resetNameTextfield();

    agree = false;
    $('.popup_checkbox').css('background-position', ((agree) ? $(e.target).width() * -1 : 0), 0);

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
	$("#select_goal_dropdown").slideDown(200);
	selectOpen = true;
	
	//console.log("goal", goal);
}

function closeActionSelect(){
	$("#select_goal_dropdown").slideUp(200);
	selectOpen = false;
}

function actionSelected(e){

	closeActionSelect();

	if(e){
		goal = $(e.currentTarget).html();
		goalID = $(e.currentTarget).index()+1;
	}else{
		goal = currentSameGoal;
		goalID = currentSameGoalID;
	}
	
	
	curSelectedGoal = goal;
	curSelectedGoalID = goalID;
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
				    $('#friend_search_field').width($("#temp_name_enter_container").width() + 25);
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

	friendProfileList.sort(function(a, b) { 
		  return a.name.localeCompare(b.name);
		});

	$('.friend_item').each(function(index, value){

	    if(index <= friendProfileList.length-1){
    		var html = '<div class="friend_pic_wrapper_large"><img class="friend_pic_large" src='+friendProfileList[index].pic+' /><img class="photo_check" src="' + baseUrl + 'img/assets/photo-check.png"></div>'
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
	$('#friend_photos').slideDown(300);
}

function closeFriendPhotosPanel(){
	$('#friend_photos').slideUp(300);
}

function confirmCreateCircle(){

	if(friendSelectedArray.length == 0){
		$('#friend_search_wrapper').tooltip('show');
		setTimeout(function(){
			$('#friend_search_wrapper').tooltip('hide');
		}, TOOLTIP_TIMEOUT)
		return;
	}

	closeCreateCircleScreen();
	$('#circle_confirm_screen').slideDown(300);
}

function openLoadingScreen(){
	$('#opt_in').hide();
	$('#create_loading').fadeIn(200);
}

function openThankYouScreen(){
	$('#create_loading').hide();
	$('#thank_you').fadeIn(200);
}

function getUserCircleData(){


	$('#my_circles .action_item').remove();

	$.ajax({
		type: 'post',
    	url: baseUrl + 'circle/fetchUserCircleData',
    	dataType: 'json',
    	data: {
    		user_id:userID
    	},
    	success: function(data) {           

        	var circlePlural;

        	console.log('circle link data', data)

        	if(data.length > 0) {
        		$('#create_another_circle').html('create another circle');
        		circleText = " Circles";
        	}else{
        		circleText = " Circle";
        	}

        	$('#circle_num').html(data.length + circleText);

        	$(data).each(function(i,v){

        		console.log(v)
        		var line1 = '<a class="circle_view_link">' + v.goal + '</a>';
        		var line2 = v.friends_data.length + " Friends Taking Action";

        		createStatItem(v, $('#my_circles'), line1, line2, v, true);

        		
        	})

     	}
	});
}

function createStatItem(item, parent, line1, line2, data, isCircle){
	
		var statItem = $('<table>');
		statItem.addClass('action_item');

		statItem.html(statsItemHtml)
					.appendTo(parent);

		statItem.find('.action_line_1').html(line1);
		statItem.find('.action_line_2').html(line2);
		statItem.find('img').attr('src', baseUrl + "img/icons/actions/" + data.goal_icon + ".png");

		if(isCircle){

			statItem.find('.circle_view_link').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})
        	statItem.find('.circle_view_link').unbind('click').click(function(e){
        			var popupData = {
						type:'circle', 
						data:{
							id:data.circle_id,
							circle_id:data.circle_id,
							content:data.goal, 
							avatar:data.avatar,
							users_fb_id:userID,
							num_friends: data.friends_data.length,
							is_user:true

						}
					}
        			gallery.openPopUp(popupData);
        		})
        	}
 	
}

function createCircle(){	
	
		console.log("user info", userID, userName)
		console.log("user photo", userProfilePhoto);
		console.log("user friends info", friendSelectedArray);
		console.log("friend tags", friendTagIDs);
		console.log("goal", goal);
		console.log("goalID", goalID);
		console.log("language", language);

		isCustomizeGoal = ($("#custom_action").val() == "") ? false : true;

		var goalExist = false;

		//TO DO IF THEY TYPE THE SAME GOAL

		var goalCount = 0;

		$.ajax({
	    	url: baseUrl + 'goal/fetchGoalData',
	    	dataType: 'json',
	    	success: function(data) { 

	    		goalData = data;
	    		 
	        	$(goalData).each(function(i, v){
					console.log(v.goal, goal)

					if(goal == String(v.goal)) {
						isCustomizeGoal = false;
						goalID = v.id;
					}

					goalCount++; 

					if(goalCount == goalData.length) {

							if(isCustomizeGoal){

								$.ajax({
					        		type: 'post',
					            	url: baseUrl + 'goal/create',
					            	dataType: 'json',
					            	data: {
					            		goal:goal
					            	},
					            	success: function(data) {   

					            		console.log("what's the goal id from here??", data.id);

					            		postCircleData(data.id);

					             	},
					             	error: function(jqXHR, textStatus, errorThrown){
										console.log(jqXHR.responseText);
										console.log(jqXHR.status);
									}
					      		});
							}else{
								postCircleData(goalID);
							}
						}

				})

	        	trendingData = data;
	        	
	        	getTrendingAction();
	     	}
		});


		var friendNum = friendSelectedArray.length;

		var popupData = "$.popup({type:'circle', data:{  content: '"+ goal+ "',avatar: '"+ userProfilePhoto + "', num_friends: " + friendNum + "}});"
		$($('#close_create_circle_btn').parent()).attr('onclick', popupData);

		openLoadingScreen();
		
		//facebook.createCircle();

}
function saveCircleToCookie($data){
	//oc: save cookie.
	console.log("save cookie");
	console.log($data);
	var circle = JSON.stringify($data);

	//oc: set cookie valid for 7 days, across whole site
	$.cookie("circle",circle,{ expires: 7, path: '/' });

	
}

function savePhotoToCookie($data){
	//oc: save cookie.
	console.log("save cookie");
	console.log($data);
	var photo = JSON.stringify($data);

	//oc: set cookie valid for 7 days, across whole site
	$.cookie("photo",photo,{ expires: 7, path: '/' });
}

function getCircleCookie(c_name){

	// var c_value = document.cookie;
	// var c_start = c_value.indexOf(" " + c_name + "=");
	
	// if (c_start == -1)	  c_start = c_value.indexOf(c_name + "=");
	  
	// if (c_start == -1)	  c_value = null;
	// else{
	//   c_start 	= c_value.indexOf("=", c_start) + 1;
	//   var c_end = c_value.indexOf(";", c_start);
	//   if (c_end == -1)	c_end = c_value.length;
	//   c_value 	= unescape(c_value.substring(c_start,c_end));
	// }
	var c_value = $.cookie("circle");
	console.log(c_value);
	return JSON.parse(c_value);
};

function getPhotoCookie(c_name){

	// var c_value = document.cookie;
	// var c_start = c_value.indexOf(" " + c_name + "=");
	
	// if (c_start == -1)	  c_start = c_value.indexOf(c_name + "=");
	  
	// if (c_start == -1)	  c_value = null;
	// else{
	//   c_start 	= c_value.indexOf("=", c_start) + 1;
	//   var c_end = c_value.indexOf(";", c_start);
	//   if (c_end == -1)	c_end = c_value.length;
	//   c_value 	= unescape(c_value.substring(c_start,c_end));
	// }
	var p_value = $.cookie("photo");
	console.log(p_value);
	return JSON.parse(p_value);
};

function checkCircleCookie(){

	//oc: is cookie present?
	return $.cookie("circle");

	
};

function checkPhotoCookie(){

	//oc: is cookie present?
	return $.cookie("photo");

	
};

function postCircleData(goal_id){

	var value = {
		'users_fb_id' 	  : userID,
		'users_name'  	  : userName,
		'users_photo_url' : userProfilePhoto,
		'goal'			  : goal,
		'ref_goal_id'	  : goal_id,	
		'country'		  : country,
		'language'		  : 0 // optional, we still not sure about this field
	};

	$.ajax({
		type: 'post',
    	url: baseUrl + 'circle/create',
    	dataType: 'json',
    	data: value,
    	success: function(data) {   

	        var friendCount = 0;

        	$.each(friendSelectedArray, function(i,v){
        		//console.log(data.id, v.id, v.name);
        		$.ajax({
	        		type: 'post',
	            	url: baseUrl + 'friend/create',
	            	dataType: 'json',
	            	data: {
	            		ref_circle_id: data.id,
	            		friends_fb_id: v.id,
	            		friends_name:v.name
	            	},
	            	success: function(friendData) {  
	            		friendCount++;

	            		if(friendCount == friendSelectedArray.length){

	            			 var cookieData 					= {};
							cookieData.circle_id 			= data.id;
							cookieData.user_id				= userID;
							cookieData.user_name			= userName;
							cookieData.goal 				= goal;
							cookieData.goal_type 			= currentSameGoalType;
							cookieData.country				= country;
							cookieData.goal_id  			= goalID;
							cookieData.language 			= language;
							cookieData.user_photo_url		= userProfilePhoto;
							cookieData.friends_data			= friendSelectedArray;

							saveCircleToCookie(cookieData);

							gallery.refreshAsFakeCircleData(getCookie("circle")); 



	            			openThankYouScreen();
					        resetCircle();
					        getUserCircleData(); 

					       
	            		}
	             	}
	      		});
        	});
     	}
	});
}

