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
			    	isLogin = true;
			    } 
			},
			{scope: "publish_actions, user_photos"}
			);
		},
		
		logOut: function(){
		    FB.logout(function(response) {
			   $('body').trigger(LOGOUT_SUCCESS);
			   isLogin = false;
			})		
		},
		
		checkLoginStatus: function(){
			FB.getLoginStatus(function(response) {
			  if (response.status === 'connected') {
					$('body').trigger(LOGIN_SUCCESS);
					isLogin = true;
			  } else if (response.status === 'not_authorized') {
			    // the user is logged in to Facebook, 
			    // but has not authenticated your app
			    	$('body').trigger(NOT_LOGIN);
			    	isLogin = false;
			  } else {
			    // the user isn't logged in to Facebook.
			  	    $('body').trigger(NOT_LOGIN);
			  	    isLogin = false;
			  }
			 });
		},
		
		
		fetchUserInfo: function(){
			FB.api("/me", function(response){
				userID 			= response.id;
				userName 		= response.name;
	    		userFirstName 	= response.first_name;
	    		userLastName 	= response.last_name;
	    		userLocation 	= (response.location) ? response.location.name : "";

	    		FB.api('/'+userID+'/picture?type=large', function (response){

					userProfilePhoto = response.data.url;
			        $('body').trigger(GOT_USER_PROFILE_PIC);

				});

	    		$('body').trigger(GOT_USER_INFO);
	    	});
	    	
		},

	    createCircle: function(){
	    	//open graph 
	    	FB.api("me/bca-circle:create",
					"post",
					
					{ circle: "http://samples.ogp.me/308553962613651?",
					  image: "http://16w22ventures.info/staging/estee_lauder/bca/img/icons/facebook-post.png",
			          privacy: {'value': 'SELF'},
			          tags: friendTagIDs
			         }, 
					
					function(response) {
	    	
		         if (!response) {
		           alert('Error occurred.');
		         } else if (response.error) {
		          console.log('Error: ' + response.error.message);
		         } else {
		         	console.log('<a href=\"https://www.facebook.com/me/activity/' + response.id + '\">' +
		             'Circle created.  ID is ' + response.id + '</a>')
		         }
		       }
		    );
	    },
	    
	    fetchFriendlist: function(){
	    	FB.api('/me/friends', function(response){
		      if (response && response.data){
		        $(response.data).each(function(index,value){
				
				var friendObj = new Object();
				
				friendObj.id = value.id;
				friendObj.name = value.name;
				
		        	FB.api('/'+value.id+'/picture?type=large', function(res){
				      if (res && res.data){
				        $(res.data).each(function(i,v){
				        	friendObj.pic = v.url;
				        	friendProfileList.push(friendObj);
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