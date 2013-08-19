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

function GalleryItem()
{
	var GalleryItem = (function() {
	
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

		function openPopUp(popupData){
			$.popup(popupData);
		}

		function enableItemButton(item, popupData){
			$(item.find('.gallery_item_btn')).unbind('mouseover').mouseover(function(e){
				$(e.currentTarget).css('cursor','pointer');
				$(e.currentTarget).prev('.item_rollover').fadeIn(200);
			})

			$(item.find('.gallery_item_btn')).unbind('mouseout').mouseout(function(e){
				$(e.currentTarget).prev('.item_rollover').fadeOut(200);
			})

        	$(item.find('.gallery_item_btn')).click(function(e){openPopUp(popupData)})
		}

		function centerRollOverContent(){
			$('.rollover_content').each(function(i, v){

				var rolloverMargin = ($($(v).parent()).height() - $(v).height())*.4;
				$(v).css('margin-top', rolloverMargin);
			})
		}

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
		

		populateCircleContent:function(circle, data){

			circle.attr('circle_id', data.circle_id);
			circle.find('.circle_creator').html(data.user_name);
			circle.find('.circle_goal').html("<b>We Will - </b><br />" + data.goal);
			circle.fadeIn(200);

        	placeCircleInAngles(circle.find('.circle_area'), data.user_photo_url, data.friends_data.length);

        	var popupData = {
				type:'circle', 
				data:{
					id:data.circle_id,
					content:data.goal, 
					avatar:data.user_photo_url,
					users_fb_id:data.user_id,
					num_friends: data.friends_data.length
				}}

        	enableItemButton(circle, popupData);

        	setTimeout(centerRollOverContent,200);

		},

		parseAllPhotoData:function(data, isFeatured, isMoreFeed, pageNum){

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				var div;

				if(isMoreFeed){
				   div = $($('.page' + pageNum + ' .photo_container').get(i));
				}else{
				   div	= (isFeatured) ? $($('.feature_photo').get(i)) : $($('.photo_container').get(i));
				}
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

			                	popupData = {
									type:'photo', 
									data:{
										id: data.photo_id,
										source:'bca',
										content:data.description,
										photo_url:baseUrl + "uploads/" + data.filename
									}}
			                	html = "<img class='full_photo' src='" + baseUrl + "uploads/" + data.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;
			                	div.html(html);
			                	div.attr('type', 'photo');
			                	$('#feed_magnet').show();

			                	div.fadeIn(200);
								
								enableItemButton(div, popupData);

								centerRollOverContent();

			             	}
			      		});

						break;

					case 'instagram':
						//div.text('author: ' + feed.author.alias); // <-- author
						//console.log(feed.text); 				  // <-- content
						//console.log("instagram", feed.photos[0].url); 	// <-- photo_url

						popupData = {
									type:'photo', 
									data:{
										id: feed.token,
										source:'instagram', 
										author: feed.author.alias,
										content:feed.text,
										photo_url:feed.photos[0].url
									}}

						photoIcon = baseUrl + "img/icons/instagram.png";

						html = "<img class='full_photo' src='" + feed.photos[0].url + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

						div.html(html);
						div.attr('type', 'instagram');

						div.fadeIn(200);

						enableItemButton(div, popupData);

						centerRollOverContent();

						break;

					case 'twitter':

						div.css('background', '#2caae1');

						photoIcon = baseUrl + "img/icons/twitter-large.png";

						popupData = {
									type:'twitter', 
									data:{
										author:feed.author.alias, 
										content:feed.text,
										datetime:feed.timestamp,
										avatar:feed.author.avatar
									}}
						//div.text('author: ' + feed.author.alias); // <-- author
						//console.log(feed.text);					    // <-- content
						//console.log(feed.timestamp); 			    // <-- datetime
						//console.log("avatar", feed.author.avatar); 	// <-- avatar

						var html = "<div class='twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
							html	+= "<div class='twitter_title'><div class='twitter_author'>"+ feed.author.alias + "</div>"
							html	+= "<div class='twitter_time'>"+ feed.timestamp + "</div></div>"
							html	+= "<div class='twitter_text'>"+ feed.text + "</div>"
							html 	+= "<img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

						div.html(html);
						div.attr('type', 'twitter');
						div.fadeIn(200);

						enableItemButton(div, popupData);

						centerRollOverContent();


						break;
				}

			});
		},

		centerRollOverContent:function(){
			centerRollOverContent();
		},

		enableItemButton:function(item, popupData){
			enableItemButton(item, popupData)
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
	
	return GalleryItem;
}