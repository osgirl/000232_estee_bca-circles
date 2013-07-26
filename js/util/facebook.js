// JavaScript ///////////////////////////////////////////////////////////////////
// 
// Copyright 2011 ClickFire Media
// 
////////////////////////////////////////////////////////////////////////////////

/**
 * Class Description
 *
 * @langversion Javascript
 *
 * @author Mili Kuo
 * @since  10.31.2011
 */

function Facebook()
{
	var Facebook = (function() {
	
		//--------------------------------------
		//+ PRIVATE CONSTANTS
		//--------------------------------------
		
		/**
		*	@private
		*/
		
		//--------------------------------------
		//+ PRIVATE VARIABLES
		//--------------------------------------
		
		/**
		*	@private
		*/
		var _myVariable;
		/**
		*	@private
		*/
		var _setter;

		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		
		return {
			
		//--------------------------------------
		//+ PUBLIC CONSTANTS
		//--------------------------------------
			
		/**
		*	@private
		*/	

		//--------------------------------------
		//+ GETTER/SETTERS
		//--------------------------------------
		

		//--------------------------------------
		//+ PUBLIC METHODS
		//--------------------------------------
		
		/**
		*	@private
		*/
		
		logIn: function(){
		    FB.login(function(response) {
			    if (response.authResponse) {
			    	$('body').trigger(LOGIN_SUCCESS);
			    } 
			},
			{scope: "publish_actions, user_photos"}
			);
		},
		
		logOut: function(){
		    FB.logout(function(response) {
			   $('body').trigger(LOGOUT_SUCCESS);
			})		
		},
		
		checkLoginStatus: function(){
			FB.getLoginStatus(function(response) {
			  if (response.status === 'connected') {
					$('body').trigger(LOGIN_SUCCESS);
			  } else if (response.status === 'not_authorized') {
			    // the user is logged in to Facebook, 
			    // but has not authenticated your app
			    	$('body').trigger(NOT_LOGIN);
			  } else {
			    // the user isn't logged in to Facebook.
			  	    $('body').trigger(NOT_LOGIN);
			  }
			 });
		},
		
		
		fetchUserInfo: function(){
			FB.api("/me", function(response){
				console.log(response)
	    		userFirstName 	= response.first_name;
	    		userLastName 	= response.last_name;
	    		userLocation 	= response.location.name;
	    		$('body').trigger(GOT_USER_INFO);
	    	});
	    	
		},
		
		fetchLargeUserProfilePicture: function(){
			FB.api("/me/albums", function (response){
				for (album in response.data)
				{
					// Find the Profile Picture album
					if (response.data[album].name == "Profile Pictures")
					{
					// Get a list of all photos in that album.
					FB.api(response.data[album].id + "/photos", function(response){
					//The image link
						userProfilePhoto = response.data[0].images[0].source;
						$('body').trigger(GOT_USER_PROFILE_PIC);
				});
				}
			  }
			});
		},

	    createCircle: function(){
	    	//open graph user generated
	    	// FB.api("me/bcacircles:join?circle=http://samples.ogp.me/308553962613651?&image[0][url]=http://www2.hiren.info/desktopwallpapers/natural/titlis_obwalden_switzerland.jpg&image[0][user_generated]=true", 
					// "post",
// 					
					// { circle: "http://samples.ogp.me/308553962613651?",
			         // privacy: {'value': 'SELF'}
			         // // ,
			         // // tags: ["100004250646791", "100003988000326"]
			         // }, 
// 					
					// function(response) {
// 	    	
		         // if (!response) {
		           // alert('Error occurred.');
		         // } else if (response.error) {
		          // $('#result').html('Error: ' + response.error.message);
		         // } else {
		          // $('#result').html('<a href=\"https://www.facebook.com/me/activity/' + response.id + '\">' +
		             // 'Circle created.  ID is ' + response.id + '</a>')
		         // }
		       // }
		    // );
		    
		    
		    //open graph half size image
		    FB.api("me/bcacircles:join?", 
					"post",
					
					{ circle: "http://bca.dev/BCA/index.php",
					  title: "circle's big image test",
					  description: "this is just a test",
					  image: "http://images1.fanpop.com/images/photos/2600000/HQ-France-wallpapers-france-2627157-1600-1200.jpg",
			          privacy: {'value': 'SELF'}
			         // ,
			         // tags: ["100004250646791", "100003988000326"]
			         }, 
					
					function(response) {
	    	
		         if (!response) {
		           console.log('Error occurred.');
		         } else if (response.error) {
		         	console.log("error", response.error)
		          //$('#result').html('Error: ' + response.error.message);
		         } else {
		         	console.log("success", response.id)
		          // $('#result').html('<a href=\"https://www.facebook.com/me/activity/' + response.id + '\">' +
		             // 'Circle created.  ID is ' + response.id + '</a>')
		         }
		       }
		    );
		    
		    
		    //wall post
		    // var opts = {
                // message : 'Test message',
                // description : 'Description here',
                // picture : 'http://images1.fanpop.com/images/photos/2600000/HQ-France-wallpapers-france-2627157-1600-1200.jpg',
                // privacy : {'value':'SELF'}
            // }
// 		    
		    // FB.api('/me/photos', 'post', opts, function(response)
            // {
                // if (!response || response.error)
                // {
                    // console.log('Posting error occured');
                // }
                // else
                // {
                    // console.log('Success - Post ID: ' + response.id);
                // }
            // });

	    },
	    
	    showFriendlist: function(){
	    	FB.api('/me/friends', function(response){
		      if (response && response.data){
		        $(response.data).each(function(index,value){
				
				//console.log(value);
				//get friend's profile picture
		        	FB.api('/'+value.id+'/picture?type=large', function(res){
				      if (res && res.data){
				        $(res.data).each(function(i,v){
				        	friendProfileList.push(v.url);
				        })
				        if(index >= response.data.length-1) $('body').trigger(GOT_FRIEND_LIST);
				      } else {
				        console.log('friend picture goes wrong', response);
				      }
				    });
		        })
		      } else {
		        console.log('friendlist goes wrong', response);
		      }
		    });

	    },
	    
		
		/**
		*	@private
		*/
	    publicMethod: function() {
      		
    	},

		init: function() {
			return this;
		},
		

		
		// kill trailing commas
		EOF:null
	};
	
	// initialize   
	})().init();
	
	return Facebook;
}