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

		function placeCircleInAngles(parent){
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
					.appendTo(parent);
			}
		}

		function loadInitialCircles() {
			
			feed_circles.get({
		    	limit:2,
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
		    	limit:4,
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
			$(data).each(function(i){
				feed = data[i].data;

				$.ajax({
	        		type: 'post',
	            	url: '../circle/fetchCircleData',
	            	dataType: 'json',
	            	data: {
	            		circle_id: feed.text
	            	},
	            	success: function(data) {            
	                	console.log('success');
	                	$($('.circle_creator').get(i)).html(data.user_name);
	                	$($('.circle_goal').get(i)).html(data.goal);
	                	placeCircleInAngles($($('.circle_area').get(i)))

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
				var photoIcon;

				switch(feed.channel){
					case 'rss':
						//div.text('ID: ' + feed.text);			  // <-- ID
						
						photoIcon = baseUrl + "img/icons/bca.png";

						$.ajax({
			        		type: 'post',
			            	url: '../photo/fetchUploadedPhotoData',
			            	dataType: 'json',
			            	data: {
			            		photo_id: feed.text
			            	},
			            	success: function(data) {            
			                	console.log('success', data);

			                	div.css('background-image', "url(" + baseUrl + "uploads/" + data.filename + ")");

			             	},
			             	error: function(response){
								console.log(response);
							}
			      		});

						break;

					case 'instagram':
						div.css('background-color', '#bfad9c');
						//div.text('author: ' + feed.author.alias); // <-- author
						console.log(feed.text); 				  // <-- content
						console.log(feed.photos.url); 			  // <-- photo_url

						photoIcon = baseUrl + "img/icons/instagram.png";

						break;

					case 'twitter':
						div.css('background', '#2caae1');
						//div.text('author: ' + feed.author.alias); // <-- author
						console.log(feed.text);					  // <-- content
						console.log(feed.timestamp); 			  // <-- datetime
						console.log(feed.author.avatar); 		  // <-- avatar

						photoIcon = baseUrl + "img/icons/twitter-large.png";
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