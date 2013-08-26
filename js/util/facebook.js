var facebook = {};

facebook.friendids			= [];
facebook.scope 				= "user_photos,publish_stream,publish_actions";
facebook.albumName 			= "Circle of Strength";
facebook.albumMessage 		= "We're Stronger Totether";
facebook.photoMessage 		= "We're Stronger Together. I created a Circle of Strength to take action against breast cancer. We will [GOAL]. Create your Circle of Strength with those who support you most. http://staging.click3x.com/estee_lauder/bca/";
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
			accessToken = fbresponse.authResponse.accessToken;

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
	FB.api('/me/friends', function(fbresponse){
	    if (fbresponse && fbresponse.data){
	    	console.log("-- successfully retrieved friends list --" );

	        $(fbresponse.data).each( function(index,value){
				var friendObj = new Object();
				friendObj.id = value.id;
				friendObj.name = value.name;
			
	        	FB.api('/'+value.id+'/picture?type=large', function(fbresponse_b){
	        		// console.log("-- got "+ friendObj.name + "s photo. --" );

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
			//accessToken = fbresponse.authResponse.accessToken;
			isLogin = true;

			$('body').trigger('LOGIN_SUCCESS');

			facebook.fetchUserData( function(){
				facebook.fetchFriendlist(_callback);
			});
		} else {
			console.log('-- user cancelled login or did not fully authorize. --');
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

    		FB.api('/'+userID+'/picture?type=large', function(fbresponse_c){
    			if (!fbresponse_c || fbresponse_c.error) {
					console.log("-- getting users photo error. --" );
					console.log(fbresponse_c.error);
				} else {
					console.log('-- getting users photo success. --');

					userProfilePhoto = fbresponse_c.data.url;
			        $('body').trigger('GOT_USER_PROFILE_PIC');
		    	}
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

		if(_callback) _callback();
	});	
}

facebook.createCircle = function(_friendids){
	//facebook.createPhoto( function(_photo_url){		
		facebook.createAlbum( {name: facebook.albumName, message:facebook.albumMessage}, function( _album_response ){
			facebook.postPhotoToAlbum( {album_id:_album_response.id, url:"http://staging.click3x.com/estee_lauder/bca/php/output.jpg", message:facebook.photoMessage}, function( _photo_response ){
				facebook.tagPhoto({photo_id:_photo_response.id, users:_friendids}, function(){
					console.log("create circle complete");
				});
			});
		});
	//});
}

facebook.createPhoto = function( _data, _callback ){
	$.ajax({
		url	: baseUrl + indexPage + 'photocreate-circle.php',
		type : "post",
		dataType:"json",
		data : {
			thumbs_url: _data.friends_photos,
			user_name: _data.users_name,
			content: _data.goal,
			circle_id: _data.circle_id
		},
		success : function(_response){
			console.log('---- create photo success. ' + _response.result + ' ----'); 

			if(_callback) _callback( baseUrl + indexPage + "img" + _response.filename);
		},
		fail : function(_response){ 
			console.log('---- create photo failed. ----'); 
		}
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

	for( var _id in _data.users ){
		var old_val = _data.users[_id].id;
		_data.users[_id] = {"tag_uid":old_val};
	}

	FB.api('/'+_data.photo_id+'/tags', 'post', { tags:_data.users }, function(fbresponse){
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