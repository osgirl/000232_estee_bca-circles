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

function Gallery()
{
	var Gallery = (function() {
	
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

		var feed_circles;		
		var feed_photos;	

		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		// function lazyloader(){
		// if($(window).scrollTop() + $(window).height() == getDocHeight() ) {

		// 	//unlbind scroll event until all new content loaded to screen
		// 	$(window).unbind('scroll');

		// 	//load content
		// 	var elems = [];
  //  			for ( var i = 0; i < 6; i++ ) {
				
		// 		var elem = document.createElement('div');
		// 		elem.className = 'item';
		// 		if (i == 0 || i == 3)
		// 			elem.className += " w2";   						    						
		// 			elems.push( elem );
		// 		}

		// 		_galleryContainer.append(elems);
		// 		_galleryContainer.masonry( 'appended', elems );

		// 		//bind scroll event again after all of content loaded ()
	 //  			$(window).bind('scroll', lazyloader);
		// 	}
		// };

		// //This event will fire after when layout changed. Save this for later use.
		// //$container.masonry( 'on', 'layoutComplete', function( msnryInstance, laidOutItems ) { });

		// //Helper
		// function getDocHeight() {
		// 	var D = document;
		// 	return Math.max(
		// 		Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		// 		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		// 		Math.max(D.body.clientHeight, D.documentElement.clientHeight)
		// 	);
		// };

		function placeCircleInAngles(parent, profileImageUrl){
			var radius 	= 178,
				cx 		= 255,
				cy 		= 312,
				steps 	= 10,
				angle, x, y;

			for(var i = 0; i < steps; i++){
				angle = (Math.PI * ( i / steps -.25) ) *2;
				x = cx + radius * Math.cos(angle);
				y = cy + radius * Math.sin(angle);

				var dotClass = (i==0) ? 'profile_image_small' : 'point';
				var dotItem = $('<div>')

				dotItem
					.addClass(dotClass)
					.css({'left': x, 'top': y})
					.appendTo(parent);

				if(i == 0) dotItem.css('background-image', 'url(' + profileImageUrl + ')');
			}
		}

		function loadInitialCircles() {
			
			feed_circles.get({
		    	limit:4,
		    	success: function(self, data) {
		    		if (data.response.updates.length > 0) {
			            parseCircleData(data.response.updates);
			            loadInitialPhotos();
			        }
			        else {
			            window.alert('No updates found!')
			        }
		    	}
		    });	
		    			
		}

		function loadInitialPhotos() {

			feed_photos.get({
		    	limit:8,
		    	success: function(self, data) {
		    		if (data.response.updates.length > 0) {
			            parsePhotoData(data.response.updates);
			        }
			        else {
			            window.alert('No updates found!')
			        }
		    	}
		    });	
		    			
		}

		function parseCircleData(data){
			var feed;
			var popupData;

			$('.circle_link').each(function(i,v){
				console.log(i)
				if(i > data.length-1) $(v).hide();
			})

			$(data).each(function(i){
				feed = data[i].data;

				$.ajax({
	        		type: 'post',
	            	url: baseUrl + 'circle/fetchCircleData',
	            	dataType: 'json',
	            	data: {
	            		circle_id: feed.text
	            	},
	            	success: function(data) {            
	                	console.log('success');
	                	$($('.circle_creator').get(i)).html(data.user_name);
	                	$($('.circle_goal').get(i)).html("<b>We Will - </b><br />" + data.goal);
	                	placeCircleInAngles($($('.circle_area').get(i)), data.user_photo_url);

	                	popupData = "$.popup({type:'circle', data:{ content: '" + data.goal + "', avatar: '" + data.user_photo_url + "',num_friends: 10}});"

	                	$($($('.circle_container').get(i)).parent()).attr('onclick', popupData);

	             	},
	             	error: function(response){
						console.log("no?", response);
					}
	      		});

				//$($('.circle_container').get(i)).html('ID: ' + feed.text);
			});
		}

		function parsePhotoData(data){
			var feed;
			$(data).each(function(i){
				feed = data[i].data;

				var div = $($('.photo_container').get(i));
				var popupData;
				var photoIcon;

				switch(feed.channel){
					case 'rss':
						//div.text('ID: ' + feed.text);			  // <-- ID
						photoIcon = baseUrl + "img/icons/bca.png";

						$.ajax({
			        		type: 'post',
			            	url: baseUrl + 'circle/fetchUploadedPhotoData',
			            	dataType: 'json',
			            	data: {
			            		photo_id: feed.text
			            	},
			            	success: function(data) {            

			                	popupData = "$.popup({type:'photo', data:{source: 'local', author: 'John Doe', content: '" + data.description +"', photo_url: '" + baseUrl + "uploads/" + data.filename + "'}})";
			                	div.html("<img class='full_photo' src='" + baseUrl + "uploads/" + data.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>");

			                	$(div.parent()).attr('onclick',popupData);

			             	},
			             	error: function(response){
								console.log(response);
							}
			      		});

						break;

					case 'instagram':
						div.css('background-color', '#000');
						//div.text('author: ' + feed.author.alias); // <-- author
						console.log(feed.text); 				  // <-- content
						console.log("instagram", feed.photos.url); 	// <-- photo_url

						popupData = "$.popup({type:'photo', data:{source: 'instagram', author: '"+ feed.author.alias + "', content: '" + feed.text + "', photo_url: '" + feed.photos.url + "'}});"
						photoIcon = baseUrl + "img/icons/instagram.png";

						div.html("<img class='full_photo' src='" + feed.photos.url + "'/><img class='photo_icon' src='" + photoIcon + "'/>");

						$(div.parent()).attr('onclick',popupData);

						break;

					case 'twitter':
						div.css('background', '#2caae1');

						photoIcon = baseUrl + "img/icons/twitter-large.png";
						popupData = "$.popup({type:'twitter', data:{author: '" + feed.author.alias + "', content: '" +feed.text + "', datetime: '" + feed.timestamp + "',avatar: '" + feed.author.avatar + "'}});"
						//div.text('author: ' + feed.author.alias); // <-- author
						console.log(feed.text);					  // <-- content
						console.log(feed.timestamp); 			  // <-- datetime
						console.log("avatar", feed.author.avatar); 		  // <-- avatar

						var content = "<div class='twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
							content	+= "<div class='twitter_title'><div class='twitter_author'>"+ feed.author.alias + "</div>"
							content	+= "<div class='twitter_time'>"+ feed.timestamp + "</div></div>"
							content	+= "<div class='twitter_text'>"+ feed.text + "</div>"
							content += "<img class='photo_icon' src='" + photoIcon + "'/>";
						div.html(content);

						$(div.parent()).attr('onclick',popupData);

						break;
				}

				$(div.find('.photo_icon')).attr('src', photoIcon);

			});
		}
		

		function loadMoreCircles() {					
			feed_circles.more({
		    	limit:2,
		    	success: function(self, data) {
		    		if (data.response.updates.length > 0) {
			            parseCircleData(data.response.updates);
			        }
			        else {
			            window.alert('No more updates found')
			        }
		    	}
		    });	
		}

		function loadMorePhotos() {					
			feed_photos.more({
		    	limit:2,
		    	success: function(self, data) {
		    		if (data.response.updates.length > 0) {
			            parsePhotoData(data.response.updates);
			        }
			        else {
			            window.alert('No more updates found')
			        }
		    	}
		    });	
		}			

		

		
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
		
		loadGallery: function(){

			console.log("init feed magnet")
			

			fm_ready(function($, _) {


				feed_circles = $FM.Feed('bca-circles');		
				feed_photos  = $FM.Feed('bca-photos');

				loadInitialCircles();

			})

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
	
	return Gallery;
}