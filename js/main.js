// ==============================================================================
// ================ A Clickfire Media Production
// ================ Author - Jason Torden, Mili Kuo, Siwon Oh, Owen Corso
// ==============================================================================

var isLogin;
var ored 			= {};
ored.friendsCircles	= [];
ored.postVars		= {};
ored.count 			= 100;//oc: how many do we from feedmagnet at a time to see if our friends are in there?
ored.cookieMonster	= {};
ored.photoIds 		= [];
ored.photoData 		= [];
ored.photoFeed		= [];
ored.isPhotoLoaded	= false;
ored.masterFeed		= [];
ored.allPhotoDataParsed = [];

//events
var LOGIN_SUCCESS			= "LOGIN_SUCCESS";
var NOT_LOGIN 				= "NOT_LOGIN"
var LOGOUT_SUCCESS 			= "LOGOUT_SUCCESS";
var LOGIN_CANCEL			= "LOGIN_CANCEL";
var GOT_USER_INFO 			= "GOT_USER_INFO";
var GOT_USER_PROFILE_PIC 	= "GOT_USER_PROFILE_PIC";
var GOT_FRIEND_LIST 		= "GOT_FRIEND_LIST";

var language 				= "English";

var userID;
var userName;
var userFirstName;
var userLastName;
var userLocation;
var userProfilePhoto;


var carousel 	= new Carousel();
var gallery 	= new Gallery();
var galleryItem = new GalleryItem;

var friendProfileList = new Array();
var curSelectedFriendID;
var curSelectedFriendName;
var curSelectedFriendPic;
var friendSelectedArray = new Array();
var friendTagIDs  = new Array();

var selectOpen 				= false;
var createCircleClicked 	= false;
var createCircleWindowOpen 	= false;
var stepID 					= 1;
var agree 					= false;

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

var photoButtonHtml = '<div class="gallery_item_btn"><div class="rollover_content"><div class="pink_btn all_cap view_circle_btn" language_id="view">view</div></div></div>';
var statsItemHtml = "<tr><td class='action_icon' rowspan='2'><img/></td><td class='action_line_1 light_font'></td></tr><tr><td class='action_line_2'></td></tr>";

var pageNum = 1;
var isMoreFeed = false;
var currentSameGoal; 
var currentSameGoalID; 
var currentSameGoalType;
var isCustomizeGoal;

var fakePhotoData;

var currentCircleViewData;
var currentCircleView;

var ismobile = false;

var SCROLL_TO_SHOW_FOOTER;

var languageData;

var FACEBOOK_FAN_PAGE = "https://www.facebook.com/BCACampaign";
var donate_link;

var customizeGoalText;
var enterNameText;

var circleOfStrengh;
var nameCircleOfStrength;
var shareTitle;
var shareICreated;
var createA;
var createAText;
var weWillText;
var createACircleText;

var photoLoaded = false;

var friendCount = 0;


$(document).ready(function(){	

	console.log = function() {}
	console.debug = function() {}
	console.info = function() {}
	
	//sean: check the url first and redirect to en/us if the first parameter is NY.
    if(indexPage.split('/')[0] == "ny" ){
    	$.gaPageview(/NY/);
    	var intv = setInterval( function(){location.replace(baseUrl + "en/us");}, 500  );
        return true;
    }

    //Sean: Start main page preloader
    $.mainPreloader();

	//oc: parse cookie for us.
	$.cookie.json = true;

	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) ){
		$('body').addClass( 'is_mobile' );
		ismobile = true;
	} else{
		ismobile = false;
	}

	windowResize();
	$(window).resize(windowResize)

	facebook.init(fbAppId);
	translatePage();
	directDonateLink();
	defineLanguageMenus();

	if(selectedLanguage == "cn"){
		$("#big_image img").attr('src', baseUrl + "img/pics/stronger-together-new-chinese.jpg");
		$(".stronger_together").hide();
		$(".copy_text").hide();
	}
	
});

function defineLanguageMenus(){
	var country = selectedCountry;

    $("#language_menu li a").each(function(i,v){

    	if($(v).attr('id')=="l_es_mx" || $(v).attr('id')=="l_fr_ca" ) return;

        $(v).attr("href", $(v).attr("href")+country + "/");
    	

        console.log("language id", $(v).attr("href"))
    });

     $("#country_menu li a").each(function(i,v){
        var language = selectedLanguage;
        var url = $(v).attr("href").replace("en", selectedLanguage);
        $(v).attr("href", url);
    });
}

function directDonateLink(){
	if(selectedLanguage == "it" || selectedCountry == "it")
		donate_link = "http://www.nastrorosa.it/";
	else
		donate_link = "https://donations.bcrfcure.org/circlesofstrength";

	$('.donate_btn').attr('href', donate_link);

}

/*************************************************************
 * Sean: Private function for Main page preloader (jquery extend)
 *************************************************************/
(function(f)
{
	var $this, $loader,
	b = f.mainPreloader = function(){
		$this = $('#main_page');
		$loader = $('<img id="main_preloader" src="' + baseUrl + 'img/icons/preloader-anim.gif"/>').appendTo('body');
	};
	f.extend(b,
	{
        loadComplete: function()
    	{
    		$('<img src="' + baseUrl + 'img/popups/circle/dotted_circle.png"/>').load(function(){
				$loader.animate({'opacity':0}, 250, function()
					{ 
						$(this).remove();
						$this.css('display','inherit');
						$this.delay(250).animate({'opacity':1}, 250);
						checkAndLoadExternalUrl();
					});
    		});
    	},
    });
})(jQuery);

function windowResize(){
	$('#language_menu').css('left', (($(window).width() < 640) ? -60 : -30) + "px");
	$('#country_menu').css('left', (($(window).width() < 640) ? -240 : -177) + "px");

	if($(window).width() >= 980 ){
		$('#regular_footer').show();
		$('#load_more_btn_wrapper').hide();
		SCROLL_TO_SHOW_FOOTER = 2100;
	}else{
		$('#regular_footer').hide();
		$('#load_more_btn_wrapper').show();
		SCROLL_TO_SHOW_FOOTER = 4000;
	}

	$('.friend_btn').each(function(i, v){

		$(v).width($(v).next('.temp_name_input_container').width() + 5);

	})
//$('.friend_btn').width($('.friend_btn').next('.temp_name_input_container').width() + 5);

	carousel.windowResize();
}

function createMainCirclePhoto( _data, _callback ){
	_data.createAText = createAText;
	_data.weWillText = weWillText;
	_data.circleOfStrengh = circleOfStrengh;
	_data.selectedLanguage = selectedLanguage;
	$.ajax({
		url	: baseUrl + indexPage + 'photo/save_facebook_photo',
		type : "post",
		data : {data: JSON.stringify(_data)},
		success : function(_response){
			//console.log('---- create photo success. ' + _response + ' ----'); 
			if(_callback) _callback( JSON.parse(_response) );
		},
		fail : function(_response){ 
			//console.log('---- create photo failed. ----'); 
		}
	});
}

function deleteMainCirclePhoto(_filename){
	$.ajax({
		url: baseUrl + indexPage + 'photo/delete_photo',
		type: 'post',
		data: {data: _filename},
		success : function(){
			//console.log('Deleted');
		}
	});
}

// Temp!
function translatePage(){


	var countryItem = $('#country_menu #c_' + selectedCountry);
	var languageItem = $('#language_menu #l_' + selectedLanguage);

	console.info(selectedCountry, selectedLanguage, countryItem, language)

	$('.country_name').html(selectedCountry);
	$('.language_name').html($(languageItem).html());
	$('.flag img').attr('src', $(countryItem).children('img').attr('src') );

	$.language.load(function(e){

		$('.log_out_status').show();

		if(selectedLanguage == "en") {
			NAME_TEXTFIELD_WIDTH = 135;
			$('#video_bar').show();
			$('#video_bar').click(function(e){
				$.gaEvent('Video', 'Clicked', 'from Main Image');
				$(this).unbind('click');
			});
		}
		if(selectedLanguage == "hu") NAME_TEXTFIELD_WIDTH = 175;
		if(selectedLanguage == "de") NAME_TEXTFIELD_WIDTH = 165;
		if(selectedLanguage == "fr") NAME_TEXTFIELD_WIDTH = 170;
		if(selectedLanguage == "es") NAME_TEXTFIELD_WIDTH = 260;
		if(selectedLanguage == "it") NAME_TEXTFIELD_WIDTH = 190;
		if(selectedLanguage == "el") NAME_TEXTFIELD_WIDTH = 245;
		if(selectedLanguage == "pt") NAME_TEXTFIELD_WIDTH = 165;
		if(selectedLanguage == "ru") NAME_TEXTFIELD_WIDTH = 160;

		languageData = e;
   		loadLanguageToElements(e);


   		$("body").trigger("LANGUAGE_LOADED");

   		$.feed();
			fm_ready(function() {
				carousel.initCarousel();
				gallery.loadGallery();

				$('body').unbind("ALL_LAYOUT_CREATED").bind('ALL_LAYOUT_CREATED', function(){

					console.log("ALL LAYOUT AM I TRIGGER TWICE")

					var newPos = $(window).scrollTop() + 300;

					if(isMoreFeed && $(window).width() < 980){
						$('html, body').animate({
					        scrollTop: newPos
					    }, 300);
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

		enableButtons();
		enableEventBinds();

		createGoalDropdown();
		getTrendingAction();

		var setting = {
			showArrows: false,
	        autoReinitialise: true
		}
		$('.scroll-pane').jScrollPane(Object(setting));
	});

}

function loadLanguageToElements(languageData){
	
	translator.translateItems("home");
	translator.defineDynamicItems();
	translator.defineGoalItems();
	translator.defineOptItems();
	translator.defineSpecialItems();
	translator.defineThankYouItems();

	facebook.defineShareCopy();

	$('.opt_copy .link').click(function(e){
		$.popup({type: ($(this).hasClass('terms')) ? 'terms_and_conditions' : 'privacy_policy' });
		return false;
	})

}

function enableEventBinds(){
	$('body').bind(LOGIN_SUCCESS, getLoginStatus);
	$('body').bind(NOT_LOGIN, getLogoutStatus);
	$('body').bind(LOGIN_CANCEL, getLoginCancelStatus);
	$('body').bind(LOGOUT_SUCCESS, getLogoutStatus);
	$('body').bind(GOT_USER_INFO, displayUserInfo);
	$('body').bind(GOT_USER_PROFILE_PIC, displayUserProfilePic);
	$('body').bind(GOT_FRIEND_LIST, getFriendList);
	$('body').bind("SAME_GOAL_BUTTON_CLICKED", function(e){
		(isLogin) ? openCreateCircleScreen(true) : facebook.login(function(){openCreateCircleScreen(true)});
	});

	$('body').bind("CREATE_NEW_CIRCLE_BUTTON_CLICKED", function(e){
		(isLogin) ? openCreateCircleScreen(false) : facebook.login(function(){openCreateCircleScreen(false)});
	});

//===============================================
//oc: cookie photo id.
//===============================================
	$('body').bind('PHOTO_UPLOADED', function(e){

		 var newlyUploadedPhotoData 			= {};
			newlyUploadedPhotoData.file_name 	= fakePhotoData.file_name;
			newlyUploadedPhotoData.description 	= fakePhotoData.description;
			newlyUploadedPhotoData.id 			= fakePhotoData.id;
			ored.cookieMonster.saveIdToCookie(fakePhotoData.id, "photo");
			gallery.refreshAsFakePhotoData(newlyUploadedPhotoData);
	});

	$('body').bind("EDIT_FRIEND", openCreateCircleScreenFromCircleView);

}

function openCreateCircleScreenFromCircleView(){

	if(currentCircleViewData){
		if(currentCircleViewData.is_user){
			openEditFriend();
		}
		else{
			(isLogin) ? openCreateCircleScreen(false) : facebook.login(function(){openCreateCircleScreen(false)});
		}
	}

}

function getLoginStatus(e){
	
	if(createCircleClicked) openCreateCircleScreen(false);
	gallery.refreshCircles();
	carousel.refreshCircles();

}

function getLogoutStatus(e){
	//console.log("get logout status");
	isLogin = false

	friendProfileList = new Array();
	$('#friend_search_field').off();
	$('#friend_search_field').data('typeahead', (data = null))
	$('.friend_row').remove();

	$('.top_user_name').html("");
	$('.sign_in_btn .sign_in').html(signInText);
	$('.sign_in_btn').unbind('click').click(facebook.login);
	
	
	
	// $('.upload_photo_btn').unbind('click').click(function(e){
	// 	console.log('do upload photo');
	// });
	
	$('.log_out_status').show();
	$('.log_in_status').hide();

	cancelCreateCircleScreen();
	$('.popup#popup_circle .btn_close').trigger('click');
	$('.btn_edit').hide();

	gallery.showAllCircles();
	gallery.refreshCircles();
	carousel.refreshCircles();

}

function getLoginCancelStatus(){
	gallery.showAllCircles();

}

function displayUserInfo(e){
	$('.log_out_status').hide();
	$('.log_in_status').show();

	if(currentCircleViewData){
		if(currentCircleViewData.is_user) 
	    	$(currentCircleView + ' .btn_edit').show();
	    else
	    	$(currentCircleView + ' .btn_edit').hide();
	}
    
	var shortenName = userFirstName + " " + userLastName.substr(0,1) + ".";
	var fullName = userFirstName + " " + userLastName;
	$('.user_name_display').html(shortenName);
	$('.user_location_display').html(userLocation);
	$('#create_circle_user').html(fullName);
	if(selectedLanguage == "ko") $('#create_circle_user').html(fullName+"님");
	$('.sign_in_btn  .sign_in').html(signOutText);
	$('.sign_in_btn').unbind('click').click(facebook.logOut);

	getUserCircleData();
}

function displayUserProfilePic(e){
	$('#user_profile_pic img').attr('src', userProfilePhoto);
}

function enableButtons(){

	$('#create_a_circle').unbind('click').click(function(e){
		facebook.login(function(){openCreateCircleScreen(false)});
		createCircleClicked = true;
	})

	$('#create_another_circle').unbind('click').click(function(e){openCreateCircleScreen(false);})

	$('#conversation_btn').unbind("click").click(function(e){
		$('html, body').animate({
	        scrollTop: $("#gallery").offset().top - 80
	    }, 500);
	});
	$('.sign_in_btn').unbind("click").click(facebook.login);
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
	$('.cancel_edit_friend_btn').click(cancelCreateCircleScreen);

	$('.popup_checkbox').click(toggleCheckbox);

	$('#edit_friend_done_btn').click(updateFriends);

	//$('#show_friendlist_btn').unbind("click").click(facebook.showFriendlist);
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
		type: 'post',
    	url: baseUrl + indexPage + 'goal/fetchDefaultGoalData',
    	dataType: 'json',
    	data: {
    		language:selectedLanguage
    	},
    	success: function(data) { 

    		goalData = data;

    		$('#goal_selected').html(goalTextArray[0].text);      
        	$(goalData).each(function(i, v){

        		if(selectedLanguage == "it" || selectedCountry == "it"){
        			if(i == 2) return;
        		}

 
    			var list = $('<li>');
    			list.addClass('goal_dropdown_list')
    			.html(goalTextArray[i].text)
    			.appendTo($('#goal_dropdown_lists'));

    			list.unbind('mouseover').mouseover(function(e){
					$(e.currentTarget).css({
						cursor: "pointer",
						backgroundColor: "#e8e8e8"
					});
				})
				list.unbind('mouseout').mouseout(function(e){$(e.currentTarget).css("background", "none");})
    			list.unbind('click').click(function(e){actionSelected(e);})

        	})

     	}
	});
}

function getTrendingAction(){

	$.ajax({
    	url: baseUrl + indexPage + 'goal/fetchAllGoalData',
    	dataType: 'json',
    	success: function(data) {  

    		translator.defineTrendingActionNumber();

    		trendingData = data;

			var actionCount = 0;

			$('#trending_actions_1 .action_item').remove();
			$('#trending_actions_2 .action_item').remove();

			$(trendingData).each(function(i, v){

				if(v.taken_number !=0){

					actionCount++;

					if(actionCount <= TRENDING_ACTION_SHOW){
						var line1 = trendingActionPeopleNumText;
						line1 = line1.replace("#", v.taken_number);
						var line2 = (v.goal_type == "default") ? goalTextArray[v.id-1].text : v.goal;

						createStatItem(v, $('#trending_actions_1'), line1, line2, v, false);
						createStatItem(v, $('#trending_actions_2'), line1, line2, v, false);
					}

				}

			})
    		
     	}
	});

	
}


function openCreateCircleScreen(hasGoal){


	checkPlaceHolderForIE($("#custom_action"), customizeGoalText);
	checkPlaceHolderForIE($("#friend_search_field"), enterNameText);

	$(".overlay").fadeIn(100);
	$('#content_wrap').css('z-index', '-9999');
	$('.overlay').css('z-index', '9999');
	$("#create_circle_screen").fadeIn(200);
	$("html, body").animate({ scrollTop: 0 }, "slow");
	createCircleWindowOpen = true;
	createCircleClicked = false;

	friendSelectedArray = new Array();
	curSelectedFriendName = null;
	curSelectedFriendID = null;
	curSelectedFriendPic = null;

	if(hasGoal){
		curSelectedGoal = goal = currentSameGoal;
		goalID = curSelectedGoalID = currentSameGoalID;

		if(currentSameGoalType == "default"){
			actionSelected(null);
			isCustomizeGoal = false;
		}else{
			$("#custom_action").val(currentSameGoal);
			isCustomizeGoal = true;
			$("#select_action").css({ opacity: .3 });
		}
	}else{
		curSelectedGoal = $($(".goal_dropdown_list").get(0)).html();
		goal = curSelectedGoal;
		goalID = curSelectedGoalID = 1;
	}
	
	$("#custom_action").unbind("keyup").keyup(function(e){
		goal = String($(e.currentTarget).val());
		if($(e.currentTarget).val() == ""){
			$("#select_action").css({ opacity: 1 });
			goalID = curSelectedGoalID;
			goal = curSelectedGoal;
			isCustomizeGoal = false;
			currentSameGoalType = "default";
		}
		else{
			$("#select_action").css({ opacity: .3 });
			isCustomizeGoal = true;
			currentSameGoalType = "customize";
		}
		
	})
}

function openEditFriend(){
	resetCircle();
	$('#content_wrap').css('z-index', '-9999');
	$('.overlay').css('z-index', '9999');
	$('.popup#popup_circle .btn_close').trigger('click');
	$(".overlay").fadeIn(100);
	$("#create_circle_screen").fadeIn(200);
	$("html, body").animate({ scrollTop: 0 }, "slow");
	createCircleWindowOpen = true;
	createCircleClicked = false;
	stepID = 2;
	goNextCreateCircleScreen(null);

	$("#edit_friend_control").show();
	$("#create_circle_control").hide();
	$(".steps").hide();

	friendSelectedArray = new Array();
	curSelectedFriendName = null;
	curSelectedFriendID = null;
	curSelectedFriendPic = null;


	$(currentCircleViewData.friends_data).each(function(i, v){
		curSelectedFriendName = v.name;
		curSelectedFriendID = v.fb_id;
		curSelectedFriendPic = v.url;

		console.info("friends data", curSelectedFriendName, curSelectedFriendID, curSelectedFriendPic);
		addFriend();
	})
	
}

function closeEditFriend(){
	$(".overlay").hide();
	$("#create_circle_screen").hide();
	$('#content_wrap').css('z-index', '0');
	$('.overlay').css('z-index', '-9999');
	createCircleWindowOpen = false;
	stepID = 1;
	goNextCreateCircleScreen(null);

	$("#edit_friend_control").hide();
	$("#create_circle_control").show();
	$(".steps").show();
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
	$('#content_wrap').css('z-index', '0');
	$('.overlay').css('z-index', '-9999');
}

function openCancelScreen(){
	$('#cancel_screen').fadeIn(200);
	$('#create_circle_screen').hide();
	$('#circle_confirm_screen').hide();
}


function cancelCreateCircleScreen(){
	$('#circle_confirm_screen').slideUp(200);
	$('.overlay').hide();
	$('#opt_in').show();
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
	curSelectedFriendID = null;
	curSelectedFriendName = null;
	curSelectedFriendPic = null;
	friendSelectedArray=[];
    friendTagIDs=[];
    $(".friend_btn").remove();
    $(".temp_name_input_container").remove();
    $(".comma").remove();
    resetNameTextfield();
    
    $('.popup_checkbox').css('background-position', ((agree) ? $('.popup_checkbox').width() * -1 : 0), 0);

    resetFriendPhotoItem($('.friend_item'))
	
	stepID = 1;
	goNextCreateCircleScreen(null);
	agree = false;
	$('#final_create_btn').addClass('dim');
    $('#final_create_btn').unbind("click");
	createCircleWindowOpen = false;


	$("#edit_friend_control").hide();
	$("#create_circle_control").show();
	$(".steps").show();
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

	goal = goal.replace(/"/g, "");

	curSelectedGoal = goal;
	curSelectedGoalID = goalID;
	$("#select_action_field").html(goal);
	$("#custom_action").val("");
	
	console.info("goal selected", goal);
}


function getFriendList(e){

	gallery.showFriendCircles();
	
	$('#friend_search_field').unbind('keyup').keyup(function(e){
		if($(e.currentTarget).val() == "")  resetNameTextfield();
	})

	//console.log(friendProfileList);

	
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

				curSelectedFriendID 	= nameObj[item].id;
				curSelectedFriendPic 	= nameObj[item].pic;

				//FB.api('/'+curSelectedFriendID, function(response){
			    //  if (response){
			        curSelectedFriendName = nameObj[item].firstName + " " + nameObj[item].lastName.substr(0,1) + ".";
			        
			        //resize the field
			        $("#temp_name_enter_container").html(nameObj[item].name);
				    $('#friend_search_field').width($("#temp_name_enter_container").width() + 25);
				    $('#friend_search_field').blur();
				    $('#name_plus_btn').show();

			     // } else {
			       // console.log('friend names goes wrong', response);
			     // }
			   // });

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

		var friendObj 	= new Object();
		friendObj.id 	= curSelectedFriendID;
		friendObj.name 	= curSelectedFriendName;
		friendObj.url 	= curSelectedFriendPic;
		friendSelectedArray.push(friendObj);
		friendTagIDs.push(curSelectedFriendID);

		var tempFriendList = $('<span>');
		tempFriendList.html(curSelectedFriendName)
					  .addClass('temp_name_input_container');
	
		var friendList = $('<div>');
		friendList.html(curSelectedFriendName)
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
			$('.friend_item').unbind('click');
		}
		
		resetNameTextfield();
		
	}else{

			$('#friend_search_field').tooltip('show');
			setTimeout(function(){
				$('#friend_search_field').tooltip('hide');
				resetNameTextfield();
			},TOOLTIP_TIMEOUT);

			$('.friend_item').each(function(i,v){
				if($(v).attr('id') == curSelectedFriendID){
					resetFriendPhotoItem($(v));
				}
			})
	}

}

function deleteFriend(deleteTarget){

	$('#friend_search_wrapper').show();
	$('#choose_photos_wrapper').show();

	$('.friend_item').unbind('click').click(function(e){
          friendPicClick(e.currentTarget);

    })


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
		row.addClass('row friend_row')
			.appendTo('#friend_photos_container .jspPane')

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

              //console.log("hmmmmm",friendProfileList[index]);

             $(value).attr('id', friendProfileList[index].id);
             $(value).attr('url', friendProfileList[index].pic);
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

             	friendPicClick(e.currentTarget);

            })
	    }
	})

}

function friendPicClick(item){
	if(!$(item).attr('checked')){

             		curSelectedFriendID = $(item).attr('id');
             		curSelectedFriendPic = $(item).attr('url');

             		FB.api('/'+curSelectedFriendID, function(response){
				      if (response){
				        curSelectedFriendName = response.first_name + " " + response.last_name.substr(0,1) + ".";

				        $("#temp_name_enter_container").html(response.name);

				        addFriend();

				      } 
				    });
             		$(item).unbind('mouseout')
             		$(item).find('.photo_check').show();
             		$(item).attr('checked', true);

             	}else{

             		var friendSelectItem;

             		$('.friend_btn').each(function(i,v){
             			if($(v).attr('id') == $(item).attr('id')) {
             				friendSelectItem = $(v);
             			}
             		})

             		deleteFriend(friendSeleteItem)
             		resetFriendPhotoItem($(item));

             	}
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
	$("html, body").animate({ scrollTop: 0 }, "fast");

	$('#content_wrap').css('z-index', '-9999');
	$('.overlay').css('z-index', '9999');
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

	//console.log('get user circle data', userID);
	if(selectedLanguage == "ko") belongCircleText = "아직 서약한 내용이 없습니다";
	belongCircleText = belongCircleText.replace("#", "0");
	$("#user_circle_num").html(belongCircleText);

	$.ajax({
		type: 'post',
    	url: baseUrl + indexPage + 'circle/fetchUserCircleData',
    	dataType: 'json',
    	data: {
    		user_id:userID
    	},
    	success: function(data) {   

    		translator.defineCircleNumber();

    		var circleNum = data.length;

    	data.reverse();     

        	var circlePlural;

        	console.info("CIRCLE NUMBER", circleNum)

        	if(circleNum > 0) {
        		$('#create_another_circle').html(createAnotherCircleText);
        		if(circleNum > 1)
        			circlePlural = " Circles";
        		else
        			circlePlural = " Circle";

        	}else{
        		$('#create_another_circle').html(createACircleText);

        		if(selectedLanguage == "ko") belongCircleText = "아직 서약한 내용이 없습니다";
        	}

        	belongCircleText = belongCircleText.replace("#", circleNum);

        	//console.info(belongCircleText)

        	if(selectedLanguage == "en"){
        		belongCircleText = belongCircleText.replace("Circles", circlePlural);
        		$("#user_circle_num").html(belongCircleText);
        	}else{

        		$("#user_circle_num").html(belongCircleText);

        		console.log("circle number", belongCircleText, circleNum)
        	}



        	$(data).each(function(i,v){

        		//console.log(v)
        		var line1 = '<a class="circle_view_link">' + v.goal + '</a>';
        		var line2 = myCircleFriendNumText;
        		line2 = line2.replace("#", v.friends_data.length);

        		//var interval = setInterval(function(){ 
        			//console.log("what the", $('#my_circle_scroll .jspPane'), $('#my_circle_scroll'))

	        		//if($('#my_circle_scroll .jspPane').is(":visible")){

	        			//console.log('done??', $('#my_circle_scroll .jspPane'))
	        			//clearInterval(interval);
	        			var parent = $('#my_circle_scroll .jspPane');
						createStatItem(v, parent, line1, line2, v, true);
	        		//}
        			
				//}, 100);

        	})
     	}
	});
}

function createStatItem(item, parent, line1, line2, data, isCircle){

	//to do: pop in goal with different languages

	
		var statItem = $('<table>');
		statItem.addClass('action_item');

		statItem.html(statsItemHtml)
					.appendTo(parent);

		statItem.find('.action_line_1').html(line1);
		statItem.find('.action_line_2').html(line2);
		statItem.find('img').attr('src', baseUrl + "img/icons/actions/" + data.goal_icon + ".png");

		if(isCircle){
			console.log("create stat item data", data)
			var replaceGoal = data.goal.replace(/"/g, "");
        	statItem.find('.circle_view_link').unbind('click').click(function(e){
        			var popupData = {
						type:'circle', 
						data:{
							id:data.circle_id,
							circle_id:data.circle_id,
							content:replaceGoal, 
							avatar:data.avatar,
							users_fb_id:userID,
							author:userName,
							country:selectedCountry,
							num_friends: data.friends_data.length,
							friends_data: data.friends_data,
							is_user:true
					}
				}
				galleryItem.openPopUp(popupData);
			})
			statItem.find('.action_line_2').attr('language_id', 'n_friend_taking_action');
		}else{
			statItem.find('.action_line_1').attr('language_id', 'n_people_will');
		}
}

function createCircle(){	
	// console.log("createCircle");
	// console.log("user info", userID, userName)
	// console.log("user photo", userProfilePhoto);
	// console.log("user friends info", friendSelectedArray);
	// console.log("friend tags", friendTagIDs);
	// console.log("goal", goal);
	// console.log("goalID", goalID);
	// console.log("language", language);

	isCustomizeGoal = ($("#custom_action").val() == "") ? false : true;

	var goalCount = 0;

	$.ajax({
		url: baseUrl + indexPage + 'goal/fetchAllGoalData',
		dataType: 'json',
		success: function(data) { 

			goalData = data;

			console.info("goal before final defined", goal, goalID, goalTextArray);

			$(goalTextArray).each(function(h,g){

				if(String(goal) == String(g.text)) {
					isCustomizeGoal = false;
					currentSameGoalType = "default";
					goalID = Number(g.id.substr(0,1));

					console.info(goal, g, goalID)
				}

			})

			console.info("customize goal???", isCustomizeGoal)
			 
	    	$(goalData).each(function(i, v){

				goalCount++; 

				if(goalCount == goalData.length) {

					console.info("is this doing the right thing", goal, goalID)

						if(isCustomizeGoal){
							$.ajax({
				        		type: 'post',
				            	url: baseUrl + indexPage + 'goal/create',
				            	dataType: 'json',
				            	data: {
				            		goal_cotent: goal
				            	},
				            	success: function(data) {   

				            		postCircleData(data.id);

				             	},
				             	error: function(jqXHR, textStatus, errorThrown){
									//console.log(jqXHR.responseText);
									//console.log(jqXHR.status);
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

	openLoadingScreen();
}
ored.getPhotoDataById = function ($id){
	for (var i in ored.photoData){ 
		if(ored.photoData[i]["photo_id"] == $id){
			return ored.photoData[i];
		}
	}
	return -1;
}
ored.addCookiePhotosToFeed = function(){
	//console.log("ored.addCookiePhotosToFeed");
	if(ored.cookieMonster.checkCookie("photo")){

		var photoIds = $.cookie("photo");
		for (var p in photoIds){
			var o 		= {};
			o.timestamp = 999999999999;
			o.text 		= photoIds[p];
			o.channel	= "rss";
			var feed	= {};
			feed.data 	= o;
			ored.photoFeed.push(feed);
		}
		
	}
};

	//oc: save cookie.
ored.cookieMonster.saveIdToCookie = function ($id, $type){
	//console.log("ored.cookieMonster.saveIdToCookie:", $type, $id);

	var arr = $.cookie($type) ? $.cookie($type) : new Array();
	arr.push($id.toString());

	//oc: set cookie valid for x days, across whole site
	$.cookie($type,arr,{ expires: 7, path: '/' });
}

ored.cookieMonster.getCookie = function ($type){
		return $.cookie($type) ? $.cookie($type) : [];
}
ored.cookieMonster.checkCookie = function($type){

	//oc: is cookie present?
	return $.cookie($type);

	
};

ored.cookieMonster.deleteCookieIfNecessary = function ($id, $type){
	
			if( $.cookie($type)) {
					
				var arr = ored.cookieMonster.getCookie($type);
				for (var i in arr){
					if($id == arr[i]){
						//console.warn("delete: "+$id);
						var index = arr.indexOf($id);
						arr.splice(index, 1);
						//oc: set cookie valid for 1 days, across whole site
						$.cookie($type,arr,{ expires: 1, path: '/' });
					}
				}
			}

};

ored.getIdsFromFeed = function($feed, $type){
	var ids = [];
	$($feed).each(function(i,v){
		ids[i] 	= v.data.text;
		ored.cookieMonster.deleteCookieIfNecessary(ids[i], $type);
	});
	
	if(!isMoreFeed){
		//oc: push ids from cookie if anything's there. 
		if($.cookie($type)){
			//oc: push cookie circle ids onto the array
			//console.log("combine", ids, $.cookie($type))
			ids = ids.concat(ored.cookieMonster.getCookie($type));
		}
	} 
	//console.log("ids from feedbag merged with cookie:",ids);
	return ids;
};

ored.getIdsFromFriends = function($list){
	//console.log($list);
	var ids 	= [];
	$($list).each(function(i,v){
	
		ids[i] 	= v.id;
	});
	return ids;
};

function postCircleData(goal_id){

	var value = {
		'users_fb_id' 	  : userID,
		'users_name'  	  : userName,
		'users_photo_url' : userProfilePhoto,
		'goal'			  : goal,
		'ref_goal_id'	  : goal_id,	
		'country'		  : selectedCountry
	};

	$.ajax({
		type: 'post',
    	url: baseUrl + indexPage + 'circle/create',
    	dataType: 'json',
    	data: value,
    	success: function(data) {   

			//oc: save circle id in cookie.
			ored.cookieMonster.saveIdToCookie(data.id, "circles");

			console.info("what goal am i getting here", goal, data.goal)

    		$.ajax({
	        		type: 'post',
	            	url: baseUrl + indexPage + 'friend/create',
	            	dataType: 'json',
	            	data: {
	            		ref_circle_id: data.id,
	            		friends_data:friendSelectedArray
	            	},
	            	success: function(friendsData) {  

	            		    console.log("friends data", friendsData);

	            			var newCircleData 			= {};
							newCircleData.circle_id 	= data.id;
							newCircleData.user_id		= userID;
							newCircleData.user_name		= userName;
							newCircleData.goal 			= data.goal;
							newCircleData.goal_type 	= currentSameGoalType;
							newCircleData.country		= data.country;
							newCircleData.goal_id  		= data.goal_id;
							newCircleData.user_photo_url= userProfilePhoto;
							newCircleData.friends_data	= friendsData;

					
							gallery.refreshAsFakeCircleData(newCircleData); 

							var popupData = {
								type:'circle',
								data:{
									id:data.id,
									author: userName,
									content:goal,
									avatar:userProfilePhoto,
									friends_data:friendsData,
									num_friends:friendsData.length,
									country: data.country,
									is_user:true
								}
							}
							$($('#close_create_circle_btn').parent()).unbind('click').click(function(e){
								galleryItem.openPopUp(popupData);
							});

							getUserCircleData(); 

	            			facebook.createCircle({
	            				circle_id:data.id,
								id :userID,
								name: userName,
								photo: userProfilePhoto,
								goal: goal,
								friends: friendSelectedArray
							});

							resetCircle();            			 
	            			openThankYouScreen();

	             	}
	      		});
			}
     	 })
			//gaTracking after circle has been created
			$.gaEvent('Circle', 'Created', (isCustomizeGoal) ? 'custom goal' : 'pre-populated goal');
}

function updateFriends(){
	console.log("updateFriends");

	$.ajax({
    		type: 'post',
        	url: baseUrl + indexPage + 'friend/create',
        	dataType: 'json',
        	data: {
        		ref_circle_id: currentCircleViewData.id,
        		friends_data:friendSelectedArray
        	},
        	success: function(friendsData) {  

        		    console.log("updateFriends onAJAX complete of friend/create. friendsData", friendsData);

        		    var circle_id 		= currentCircleViewData.id;
        		    var circle_content 	= currentCircleViewData.content;
        		    var circle_photo 	= currentCircleViewData.avatar;

					var updatedCircle;

					$('.circle_container').each(function(i,v){

						if($(v).attr('circle_id') == currentCircleViewData.id){
							updatedCircle = $(v);

							var popupData = {
								type:'circle',
								data:{
									id:circle_id,
									circle_id:circle_id,
									content:circle_content,
									author:updatedCircle.attr("user_name"),
									avatar:circle_photo,
									users_fb_id:updatedCircle.attr("user_id"),
									friends_data:friendsData,
									num_friends:friendsData.length,
									country:updatedCircle.attr("country"),
									is_user:true
								}
							}

							galleryItem.updateUserCirclePopupContent(updatedCircle, circle_id, updatedCircle.attr("user_name"), circle_content, circle_photo, updatedCircle.attr("user_id"), friendsData, updatedCircle.attr("country"), true);
							galleryItem.openPopUp(popupData);
						}
					})

					
					closeEditFriend();

					getUserCircleData(); 
					getTrendingAction();

         	}
  		});
}

function checkPlaceHolderForIE(target, content){

		if($("input").attr('placeholder') == undefined || $("input").attr('placeholder') == "") { 

	        var active = document.activeElement;

	        $(target).focus(function () {
	            if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr(content)) {
	                $(this).val('').removeClass('hasPlaceholder');
	            }

	        }).blur(function () {
	            if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
	                $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
	            }
	        });

	        $(target).blur();
	        $(active).focus();
	        // $('form').submit(function () {
	        //     $(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
	        // });

	    }
	
   }

