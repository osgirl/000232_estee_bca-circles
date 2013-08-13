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
		var gallery_container;
		var current_add_layout = 1;

		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		function lazyloader(){

			console.log('scroll', $(window).scrollTop() + $(window).height())

			if($(window).scrollTop() + $(window).height() == getDocHeight() ) {


				//unlbind scroll event until all new content loaded to screen
				$(window).unbind('scroll');

				$('#donate_area').addClass('footer_fixed');

				//load content

				var current_layout = $('#gallery_layout_' + current_add_layout);

				var new_layout = $('<div>');
				new_layout.addClass('layout' + current_add_layout)
						  .addClass('gallery_layout')
						  .addClass('row')
				 		  .html(current_layout.html());

				current_add_layout = (current_add_layout == 1) ?  2 : 1;

				gallery_container.append(new_layout);
				gallery_container.masonry( 'appended', new_layout );

				//bind scroll event again after all of content loaded ()
	  			$(window).bind('scroll', lazyloader);
	  		}else if($(window).scrollTop() + $(window).height() == 2550){

	  			$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');

	  		}
		};

		//This event will fire after when layout changed. Save this for later use.
		//$container.masonry( 'on', 'layoutComplete', function( msnryInstance, laidOutItems ) { });

		//Helper
		function getDocHeight() {
			var D = document;
			return Math.max(
				Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
				Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
				Math.max(D.body.clientHeight, D.documentElement.clientHeight)
			);
		};

		function placeCircleInAngles(parent, profileImageUrl, friendNum){
			var radius 	= 44.7,
				cx 		= 47,
				cy 		= 47,
				steps 	= friendNum + 1,
				angle, x, y;

			for(var i = 0; i < steps; i++){
				angle = (Math.PI * ( i / steps -.25) ) *2;
				x = cx + radius * Math.cos(angle);
				y = cy + radius * Math.sin(angle);

				var dotClass = (i==0) ? 'profile_image_small' : 'point';
				var dotItem = $('<div>')

				dotItem
					.addClass(dotClass)
					.css({'left': x + "%", 'top': y + "%"})
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

			// $('.circle_link').each(function(i,v){
			// 	if(i > data.length-1) $(v).hide();
			// })

			$(data).each(function(i){
				feed = data[i].data;

				console.log('-----------------------', feed.text)

				$.ajax({
	        		type: 'post',
	            	url: baseUrl + 'circle/fetchCircleData',
	            	dataType: 'json',
	            	data: {
	            		circle_id: feed.text
	            	},
	            	success: function(data) {            
	                	console.log('success', data);
	                	$($('.circle_container').get(i)).attr('circle_id', data.circle_id);
	                	$($('.circle_creator').get(i)).html(data.user_name);
	                	$($('.feature_circle_creator').get(i)).html(data.user_name);
	                	$($('.circle_goal').get(i)).html("<b>We Will - </b><br />" + data.goal);
	                	$($('.feature_circle_goal').get(i)).html("<b>We Will - </b><br />" + data.goal);

	                	placeCircleInAngles($($('.circle_area').get(i)), data.user_photo_url, data.friends_data.length);
	                	placeCircleInAngles($($('.feature_circle_area').get(i)), data.user_photo_url, data.friends_data.length);

	                	popupData = "$.popup({type:'circle', data:{ content: '" + data.goal + "', avatar: '" + data.user_photo_url + "', circle_id: '" + data.circle_id + "', users_fb_id: '" + data.user_id+ "', num_friends: '" + data.friends_data.length + "'}});"

	                	$($($('.circle_container').get(i)).parent()).attr('onclick', popupData);
	                	$($($('.feature_circle').get(i)).parent()).attr('onclick', popupData);

	             	},
	             	error: function(response){
						console.log("no?", response);
					}
	      		});
			});
		}

		function parsePhotoData(data){
			var feed;
			$(data).each(function(i){
				feed = data[i].data;

				var div = $($('.photo_container').get(i));
				var feature_div = $($('.feature_photo').get(i));
				var link = $($('.photo_link').get(i));
				var featureLink = $($('.feature_photo_link').get(i));
				var popupData;
				var photoIcon;
				var html;

				switch(feed.channel){
					case 'rss':
						//div.text('ID: ' + feed.text);			  // <-- ID
						photoIcon = baseUrl + "img/icons/bca.png";

						$.ajax({
			        		type: 'post',
			            	url: baseUrl + 'photo/fetchUploadedPhotoData',
			            	dataType: 'json',
			            	data: {
			            		photo_id: feed.text
			            	},
			            	success: function(data) {            

			                	popupData = "$.popup({type:'photo', data:{source: 'local', author: 'John Doe', content: '" + data.description +"', photo_url: '" + baseUrl + "uploads/" + data.filename + "'}})";
			                	html = "<img class='full_photo' src='" + baseUrl + "uploads/" + data.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>";
			                	div.html(html);
			                	feature_div.html(html);

			                	link.attr('onclick',popupData);
			                	featureLink.attr('onclick',popupData);

			             	},
			             	error: function(response){
								console.log(response);
							}
			      		});

						break;

					case 'instagram':
						//div.text('author: ' + feed.author.alias); // <-- author
						console.log(feed.text); 				  // <-- content
						console.log("instagram", feed.photos[0].url); 	// <-- photo_url

						popupData = "$.popup({type:'photo', data:{source: 'instagram', author: '"+ feed.author.alias + "', content: '" + feed.text + "', photo_url: '" + feed.photos[0].url+ "'}});"
						photoIcon = baseUrl + "img/icons/instagram.png";

						html = "<img class='full_photo' src='" + feed.photos[0].url + "'/><img class='photo_icon' src='" + photoIcon + "'/>";

						div.html(html);
						feature_div.html(html);

						link.attr('onclick',popupData);
						featureLink.attr('onclick',popupData);

						break;

					case 'twitter':
						div.css('background', '#2caae1');
						feature_div.css('background', '#2caae1');

						photoIcon = baseUrl + "img/icons/twitter-large.png";
						popupData = "$.popup({type:'twitter', data:{author: '" + feed.author.alias + "', content: '" +feed.text + "', datetime: '" + feed.timestamp + "',avatar: '" + feed.author.avatar + "'}});"
						//div.text('author: ' + feed.author.alias); // <-- author
						console.log(feed.text);					    // <-- content
						console.log(feed.timestamp); 			    // <-- datetime
						console.log("avatar", feed.author.avatar); 	// <-- avatar

						var content = "<div class='twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
							content	+= "<div class='twitter_title'><div class='twitter_author'>"+ feed.author.alias + "</div>"
							content	+= "<div class='twitter_time'>"+ feed.timestamp + "</div></div>"
							content	+= "<div class='twitter_text'>"+ feed.text + "</div>"
							content += "<img class='photo_icon' src='" + photoIcon + "'/>";

						var fcontent = "<div class='featured_twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
							fcontent	+= "<div class='featured_twitter_title'><div class='featured_twitter_author'>"+ feed.author.alias + "</div>"
							fcontent	+= "<div class='featured_twitter_time'>"+ feed.timestamp + "</div></div>"
							fcontent	+= "<div class='featured_twitter_text'>"+ feed.text + "</div>"
							fcontent += "<img class='photo_icon' src='" + photoIcon + "'/>";

						div.html(content);

						feature_div.html(fcontent);

						link.attr('onclick',popupData);
						featureLink.attr('onclick',popupData);

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

			$(window).scrollTop(0);

			gallery_container = $('#magnet_feed');

			$(window).bind('scroll', lazyloader);
			gallery_container.masonry();
			

			fm_ready(function($, _) {


				feed_circles = $FM.Feed('bca-circles');		
				feed_photos  = $FM.Feed('bca-photos');

				loadInitialCircles();
				lazyloader();

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