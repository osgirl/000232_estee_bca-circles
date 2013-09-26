var translator = {};

var translatedItem;
var signInText;
var signOutText;
var createAnotherCircleText;
var goalTextArray;
var belongCircleText;
var trendingActionPeopleNumText;
var myCircleFriendNumText;
var sameGoalText;
var createANewOneText;
var minsAgoText;
var hoursAgoText;
var selectAtLeastOneFriendText;
var friendAlreadyExistText;

var shareCaption;
var shareDescription;

var shareFBVideoCaption;
var shareFBVideoDescription;
var shareTwVideoCopy;

var twitterShareCopy;


translator.translateItems = function(language_location){

    translatedItem = new Array();

    var items = $('*[language_id]').filter('[language_location="' + language_location + '"]');

    $(items).each(function(i,v){
            var item = new Object();
            item.id = $(v).attr('language_id');
            item.item = v;
            translatedItem.push(item);
    });

    $(languageData).each(function(i,v){

        $(translatedItem).each(function(l,t){

            if(v[0] == t.id) $(t.item).html(v[1]);

        })
    });
}

translator.translateSingleItem = function(language_id){

    var item = $('*[language_id="'+ language_id + '"]');

    $(languageData).each(function(i,v){

        if(v[0] == language_id) $(item).html(v[1]);
    });

}

translator.defineDynamicItems = function(){
     $(languageData).each(function(i,v){

        if(v[0] == "sign_in") signInText = v[1];
        if(v[0] == "logout") signOutText = v[1];
        if(v[0] == "create_a_circle") createACircleText = v[1];
        if(v[0] == "create_another_circle") createAnotherCircleText = v[1];
        if(v[0] == "same_goal") sameGoalText = v[1];
        if(v[0] == "create_a_new_one") createANewOneText = v[1];
        if(v[0] == "n_hours_ago") hoursAgoText = v[1];
        if(v[0] == "n_min_ago") minsAgoText = v[1];
        if(v[0] == "belongs_to_n_circles") belongCircleText = v[1];
        if(v[0] == "n_people_will") trendingActionPeopleNumText = v[1];
        if(v[0] == "n_friend_taking_action") myCircleFriendNumText = v[1];
        if(v[0] == "created_a") createA = v[1];
        
    });  

}

translator.defineCircleNumber = function(){
     $(languageData).each(function(i,v){

        if(v[0] == "belongs_to_n_circles") belongCircleText = v[1];
        if(v[0] == "n_friend_taking_action") myCircleFriendNumText = v[1];
        
    });  
}

translator.defineTrendingActionNumber = function(){
     $(languageData).each(function(i,v){

        if(v[0] == "n_people_will") trendingActionPeopleNumText = v[1];
        
    });  
}

translator.defineSpecialItems = function(){

    $(languageData).each(function(i,v){

        if(v[0] == "customize_goal_placeholder") customizeGoalText = v[1];
        if(v[0] == "enter_name") enterNameText = v[1];
        if(v[0] == "select_at_least_one_friend") selectAtLeastOneFriendText = v[1];
        if(v[0] == "friend_already_exist") friendAlreadyExistText = v[1];

        if(v[0] == "circle_of_strength") circleOfStrengh = v[1];
        if(v[0] == "we_are_stronger_together_upload_photo") shareTitle = v[1];
        if(v[0] == "share_take_action_against") shareCaption = v[1];
        if(v[0] == "share_create_a_circle_of_strength_with") shareDescription = v[1];
        if(v[0] == "share_i_created_a_circle_of_strength") shareICreated = v[1];


        if(v[0] == "share_video_facebook_caption") shareFBVideoCaption = v[1];
        if(v[0] == "share_video_facebook_description") shareFBVideoDescription = v[1];
        if(v[0] == "share_video_twitter") shareTwVideoCopy = v[1];

        if(v[0] == "created_a") createAText = v[1];
        if(v[0] == "we_will_text") weWillText = v[1];
        if(v[0] == "name_circle_of_strength") nameCircleOfStrength = v[1];
        if(v[0] == "share_we_are_stronger_together") twitterShareCopy = v[1];

    });

    $("#custom_action").attr("placeholder", customizeGoalText);
    $("#friend_search_field").attr("placeholder", enterNameText);
    $("#friend_search_wrapper").attr("title", selectAtLeastOneFriendText);
    $("#friend_search_field").attr("title", friendAlreadyExistText);

}

translator.defineOptItems = function(){
    var termsAndConditionsText;
    var privacyPolicyText;
    var optCopyText;

    $(languageData).each(function(i,v){
        if(v[0] == "terms_and_conditions_in_text") termsAndConditionsText = v[1];
        if(v[0] == "privacy_policy_in_text") privacyPolicyText = v[1];
        if(v[0] == "opt_copy") optCopyText = v[1];
    }); 

    if(optCopyText != null){
        var termsAndConditions = '<a class="link terms" href="#">' + termsAndConditionsText + '</a>';
        var privacyPolicy = '<a class="link privacy" href="#">' + privacyPolicyText + '</a>';
        optCopyText = optCopyText.replace("[termsandconditions]", termsAndConditions);
        optCopyText = optCopyText.replace(/\[privacypolicy\]/g, privacyPolicy);
        $(".opt_copy").html(optCopyText);
    }
}

translator.defineThankYouItems = function(){
    var likeUsOnFacebookText;
    var thankYouText;

     $(languageData).each(function(i,v){
        if(v[0] == "like_us_on_facebook") likeUsOnFacebookText = v[1];
        if(v[0] == "thank_you_creating_circle_copy") thankYouText = v[1];
    }); 

     var likeUsOnFacebook = '<a href="' + FACEBOOK_FAN_PAGE + '" target="blank" id="like_us" class="pink_text">' + likeUsOnFacebookText + '</a>';
     thankYouText = thankYouText.replace("[likeusonfacebook]", likeUsOnFacebook);
     $("#thank_you_copy").html(thankYouText);

}

translator.defineGoalItems = function(){
    goalTextArray = new Array();

    $(languageData).each(function(i,v){

        if(v[0].substr(1,5) == "_goal") {
            var goalObj = new Object();
            goalObj.id = v[0];
            goalObj.text = v[1];
            goalTextArray.push(goalObj);
        }  

    });

    goalTextArray.sort(function compare(a,b) {
          if (a.id > b.id)
             return 1;
          if (a.id < b.id)
            return -1;
          return 0;
    });

}



