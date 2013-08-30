var facebook = {};

facebook.access_token		= "";
facebook.friendids			= [];
facebook.scope 				= "user_photos,publish_stream,publish_actions";
facebook.albumName 			= "Circle of Strength";
facebook.albumMessage 		= "We're Stronger Totether";
facebook.photoMessage 		= "We're Stronger Together. I created a Circle of Strength to take action against breast cancer. We will: [GOAL] Create your Circle of Strength with those who support you most. [URL]";
facebook.photoUrl 			= "http://firstknowwhatyouwant.com/wp-content/uploads/2011/08/iStock_000002337513Medium.jpg";

facebook.init = function( _appid ){
	console.log("-- initializing facebook api --");

	//Init Facebook.
	FB.init({ appId:_appid, status: true, cookie: true });

	facebook.checkLoginStatus();
}

facebook.checkLoginStatus = function(){
	FB.getLoginStatus(function(fbresponse) {
		if (fbresponse.status === 'connected') {
			// the user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire

			console.log("-- the user is logged in and has authenticated. -- ");
			console.log('-- good to see you, ' + fbresponse.authResponse.userID + '. --');

			userID = fbresponse.authResponse.userID;
			facebook.access_token = fbresponse.authResponse.accessToken;

			$('body').trigger('LOGIN_SUCCESS');
			isLogin = true;

			facebook.fetchUserData( facebook.fetchFriendlist );
		} else if (fbresponse.status === 'not_authorized') {
			// the user is logged in to Facebook, 
			// but has not authenticated your app

			console.log("-- the user is logged in to facebook but has not authenticated. -- ");

			$('body').trigger('NOT_LOGIN');
			isLogin = false;
		} else {
			// the user isn't logged in to Facebook.
			console.log("-- the user isn't logged in to facebook. -- ");

			$('body').trigger('NOT_LOGIN');
			isLogin = false;
		}
	});
}

facebook.fetchFriendlist = function( _callback ){

	FB.api('/me/friends?limit=5000', function(fbresponse){
	    if (fbresponse && fbresponse.data){
	    	console.log("-- successfully retrieved friends list --");

	    	friendProfileList = new Array();

	        $(fbresponse.data).each( function(index,value){
				var friendObj = new Object();
				friendObj.id = value.id;
				friendObj.name = value.name;
			
	        	FB.api('/'+value.id+'/picture?width=100&height=100', function(fbresponse_b){
	        		console.log("-- got "+ friendObj.name + "s photo. --" );

			    	if (fbresponse_b && fbresponse_b.data){
				       	$(fbresponse_b.data).each(function(i,v){
				        	friendObj.pic = v.url;
				        	friendProfileList.push(friendObj);
				        });

			        	if(index >= fbresponse.data.length-1){
			        		//all friends are here now. we're done.
			        		$('body').trigger('GOT_FRIEND_LIST');

			        		if(_callback) _callback();
			        	}
			    	} else {
			        	console.log("-- error getting "+ friendObj.name + "s photo. --" );
			    	}

			    	if(friendObj.pic == undefined || friendObj.pic == null || friendObj.pic.indexOf(".gif") != -1)
						friendObj.pic = baseUrl + indexPage + "img/assets/profile_generic.jpg";
			    });
	        });
	    } else {
	    	console.log("-- error retrieving friends list --" );
	    }
    });
}

facebook.login = function( _callback ){
	console.log("-- logging user into facebook. --");

	FB.login(function(fbresponse) {
		if (fbresponse.authResponse) {
			console.log('-- login success. --');
			console.log('-- fetching user information. --');

			userID = fbresponse.authResponse.userID;
			facebook.access_token = fbresponse.authResponse.accessToken;
			isLogin = true;

			$('body').trigger('LOGIN_SUCCESS');


			facebook.fetchUserData( function(){
				facebook.fetchFriendlist(_callback);
			});
		} else {
			console.log('-- user cancelled login or did not fully authorize. --');
			$('body').trigger('LOGIN_CANCEL');
		}
	}, {scope:facebook.scope} );
}

facebook.fetchUserData = function( _callback ){
	FB.api('/me', function(fbresponse_b) {
		if (!fbresponse_b || fbresponse_b.error) {
			console.log("-- fetch info error. --" );
			console.log(fbresponse_b.error);
		} else {
			console.log('-- fetch info success. --');
			console.log('-- good to see you, ' + fbresponse_b.name + '. --');

			userName 		= fbresponse_b.name;
    		userFirstName 	= fbresponse_b.first_name;
    		userLastName 	= fbresponse_b.last_name;
    		userLocation 	= (fbresponse_b.location) ? fbresponse_b.location.name : "";

    		console.log('-- getting users profile photo. --');

    		// FB.api('/'+userID+'/picture?type=large', function(fbresponse_c){
    		FB.api('/'+userID+'/picture?width=200&height=200', function(fbresponse_c){
    			if (!fbresponse_c || fbresponse_c.error) {
					console.log("-- getting users photo error. --" );
					console.log(fbresponse_c.error);
				} else {
					console.log('-- getting users photo success. --');
					userProfilePhoto = fbresponse_c.data.url;
		    	}

		    	console.log(userProfilePhoto);

				if(userProfilePhoto == undefined || userProfilePhoto == null || userProfilePhoto.indexOf(".gif") != -1){
					console.log("using generic photo for user");
					userProfilePhoto = baseUrl + "img/assets/profile_generic.jpg";
				}

				$('body').trigger('GOT_USER_PROFILE_PIC');
			});

    		$('body').trigger('GOT_USER_INFO');

			if(_callback) _callback();
		}
	});
}

facebook.logOut = function( _callback ){
	FB.logout(function(response) {
		$('body').trigger('LOGOUT_SUCCESS');
		isLogin = false;

		console.log("log out success", isLogin)

		if(_callback) _callback();
	});	
}

facebook.createCircle = function(_friendsData){
	var photo_message = facebook.photoMessage.replace("[GOAL]",_friendsData.goal).replace("[URL]",_friendsData.url);

	//save photo to server 
	createMainCirclePhoto( _friendsData, function( _create_response ){		
		console.log(_create_response);
		_friendsData

		//create facebook album
		facebook.createAlbum( {name: facebook.albumName, message:facebook.albumMessage}, function( _album_response ){

			//post photo to album
			facebook.postPhotoToAlbum( {album_id:_album_response.id, url: baseUrl + _create_response['file_location'], message:photo_message}, function( _photo_response ){ 

				//tag the phogo "http://staging.click3x.com/estee_lauder/bca/uploads/photo_1377294239.jpg" 
			 	facebook.tagPhoto({photo_id:_photo_response.id, users:_friendsData.friends, tag_positions:_create_response['tag_positions']}, function(){
			 		console.log("create circle complete");

			 		//delete the photo. wer're done here. (main.js)
			 		deleteMainCirclePhoto( _create_response['file_location'] );
			 	});
			});
		});
	});
}

facebook.createAlbum = function( _data, _callback ){
	console.log("-- attempting to create album : " + _data.name + ". --");

	facebook.checkForAlbumByName( {name:_data.name} , function(_response){
		if(_response.ishere == true){
			console.log("-- album is already here. --");
			if(_callback) _callback({id:_response.id});
		} else {
			console.log("-- album not found. creating it now. --");

			FB.api('/me/albums', 'post', { name:_data.name, message:_data.message }, function(fbresponse) {
				if (!fbresponse || fbresponse.error) {
					console.log("-- create album error. --" );
					console.log(fbresponse.error);
				} else {
					console.log('-- create album success. album id is ' + fbresponse.id + ". --");
					if(_callback) _callback({id:fbresponse.id});
				}
			});
		}
	});
}

facebook.postPhotoToAlbum = function( _data, _callback ){
	console.log("-- attempting to add photo to album " + _data.album_id + ". --");

	FB.api('/'+_data.album_id+'/photos', 'post', { url:_data.url, message:_data.message }, function(fbresponse) {
		if (!fbresponse || fbresponse.error) {
			console.log("-- add photo to album error. --" );
			console.log(fbresponse.error);
		} else {
			console.log('-- addd photo to album success. photo id is ' + fbresponse.id + ". --");
			if(_callback) _callback({id:fbresponse.id});
		}
	});
}

facebook.tagPhoto = function( _data, _callback ){
	console.log("-- attempting to tag photo : " + _data.photo_id + ". --");

	var _tags = [];

	$.each(_data.users, function(i,v){
		_tags.push( {	
			"tag_uid":v.id, 
			"x":_data.tag_positions[i+1].x*100, 
			"y":_data.tag_positions[i+1].y*100
		});
	});

	FB.api('/'+_data.photo_id+'/tags', 'post', { tags:_tags }, function(fbresponse){
		if (!fbresponse || fbresponse.error) {
			console.log("-- tag photo error. --" );
			console.log(fbresponse.error);
		} else {
			console.log("-- tag photo success. --" );
			if(_callback) _callback(fbresponse);
		}
	});
}

facebook.checkForAlbumByName = function( _data, _callback ){
	console.log("-- checking for album name : " + _data.name + ". --");

	facebook.getAlbums(null, function(_response){
		var ishere = false;
		var id;

		for(var i in _response.data){
			if( _response.data[i].name == _data.name ){
				ishere = true;
				id = _response.data[i].id;
				break;
			}
		}

		if(_callback) _callback({ishere:ishere, id:id});
	});
}

facebook.getAlbums = function( _data, _callback ){
	console.log("-- attempting to get albums. --");

	FB.api('/me/albums', 'get', function(fbresponse) {
		if (!fbresponse || fbresponse.error) {
			console.log("-- get albums error. --" );
			console.log(fbresponse.error);
		} else {
			console.log("-- get albums success. --" );
			if(_callback) _callback({data:fbresponse.data});
		}
	});
}