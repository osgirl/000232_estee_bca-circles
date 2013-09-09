var translator = {};

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

translator.defineNumberItems = function(){
     $(languageData).each(function(i,v){

        if(v[0] == "sign_in") signInText = v[1];
        if(v[0] == "logout") signOutText = v[1];
        if(v[0] == "create_a_circle") createACircleText = v[1];
        if(v[0] == "create_another_circle") createAnotherCircleText = v[1];
        if(v[0] == "belongs_to_n_circles") belongCircleText = v[1];
        if(v[0] == "n_people_will") trendingActionPeopleNumText = v[1];
        if(v[0] == "n_friend_taking_action") myCircleFriendNumText = v[1];
    });
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



