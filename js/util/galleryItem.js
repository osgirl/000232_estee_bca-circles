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
			$(item.find('.gallery_item_btn')).unbind('mouseenter').mouseenter(function(e){
				$(e.currentTarget).css('cursor','pointer');
				$(e.currentTarget).stop(true, true).fadeTo("fast", 1);
				$($(e.currentTarget).next()).find('.share_text').css('color', "#f38dab");

			$(item.find('.gallery_item_btn')).unbind('click').click(function(e){openPopUp(popupData)})
				centerRollOverContent(.55);
			})

			$(item.find('.gallery_item_btn')).unbind('mouseleave').mouseleave(function(e){

				$(e.currentTarget).stop(true, true).fadeTo("fast", 0);
				$($(e.currentTarget).next()).find('.share_text').css('color', "#ffffff")

			})

			$(item.find('.view_circle_btn')).unbind('click').click(function(e){openPopUp(popupData)});


        	$(item.find('.same_goal_btn')).click(function(e){
        		var circleContainer = $($(e.currentTarget).parents('.circle_container'));
        		$(item.find('.gallery_item_btn')).unbind('click');
        		currentSameGoal = $(circleContainer.find('.goal_text')).html();
        		currentSameGoalID = circleContainer.attr('goal_id');
        		currentSameGoalType = circleContainer.attr('goal_type');

        		$('body').trigger('SAME_GOAL_BUTTON_CLICKED');
        	})
        	$(item.find('.create_a_new_one_btn')).click(function(e){
        		$(item.find('.gallery_item_btn')).unbind('click');
        		$('body').trigger('CREATE_NEW_CIRCLE_BUTTON_CLICKED');
        	})

        	enableShareButton(item);
        }

        function enableShareButton(item){
        	var itemType = ($(item).hasClass('circle_container')) ? 'circle' : 'photo';

        	$(item.find('.circle_fb_share_btn')).unbind('click').click(function(e){
				share($(item), "facebook", itemType);
			});

			$(item.find('.circle_tw_share_btn')).unbind('click').click(function(e){
				share($(item), "twitter", itemType);
			});
        }

		function share(circle, shareType, itemType){

			var circle_goal = $(circle.find(".goal_text")).html();
			var circle_id = circle.attr('circle_id');

			var shareData = {
				type:shareType,
				action: circle_goal,
				id:circle_id,
				post_type:itemType,
				referral:'circle'
			}
			$.popup_share(shareData);
		}

		function centerRollOverContent(portion){
			$('.rollover_content').each(function(i, v){

				var rolloverMargin = ($($(v).parent()).height() - $(v).height())*portion;
				$(v).css('margin-top', rolloverMargin);
			})
		}

		function placeCircleInAngles(parent, profileImageUrl, friendNum){
			$(parent).find('.point').remove();
			$(parent).find('.profile_image_small').remove();
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

		function updateUserCirclePopupContent(circle, id, content, avatar, userID, friendData, isUser){
			console.log("updateUserCirclePopupContent", friendData);
			//if(friendData != undefined)
	        	placeCircleInAngles(circle.find('.circle_area'), avatar, friendData.length);

			var popupData = {
					type:'circle', 
					data:{
						id:id,
						circle_id:id,
						content:content, 
						avatar:avatar,
						users_fb_id:userID,
						num_friends: friendData.length,
						friends_data: friendData,
						is_user:isUser

					}}

	        	enableItemButton(circle, popupData);

	        	setTimeout(function(){
	        		centerRollOverContent(.4);
	        	},200);
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
			console.log("populateCircleContent");
			console.log(circle);
			console.log(data);
			
			circle.attr('circle_id', data.circle_id);
			circle.attr('user_id', data.user_id);
			circle.attr('goal_id', data.goal_id);
			circle.attr('goal_type', data.goal_type);
			circle.find('.circle_flag').css("background-image", 'url("' + baseUrl + 'img/flags/large/' + data.country + '.png")');
			circle.find('.circle_creator').html(data.user_name);
			circle.find('.goal_text').html(data.goal);
			circle.fadeIn(200);

			var isUser;

			if(isLogin)
				isUser = (data.user_id == userID) ? true : false;
			else
				isUser = false;		

			updateUserCirclePopupContent(circle, data.circle_id, data.goal, data.user_photo_url, data.user_id, data.friends_data, isUser);

		},

		updateUserCirclePopupContent:function(circle, id, content, avatar, userID, friendData, isUser){
			updateUserCirclePopupContent(circle, id, content, avatar, userID, friendData, isUser);
			
		},

		parseAllPhotoData:function(data, isFeatured){

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				var div;

				if(isFeatured) {
					div = $($('.feature_photo').get(i));
				}else{	
					div = (isMoreFeed) ? $($($(".page"+pageNum).find('.photo_container')).get(i)) : $($('.photo_container').get(i));
				}

				var popupData;
				var photoIcon;
				var html;

				switch(feed.channel){
					
					//oc: 
					case 'rss':
					console.log(feed);
						//div.text('ID: ' + feed.text);			  // <-- ID
						photoIcon = baseUrl + "img/icons/bca.png";
						ored.photos.push(feed.text);
						$.ajax({
			        		type: 'post',
			            	url: baseUrl + indexPage + 'photo/fetchUploadedPhotoData',
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

								centerRollOverContent(.55);

								$('body').trigger("ALL_LAYOUT_CREATED");

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

						centerRollOverContent(.55);

						break;

					case 'twitter':

						div.css('background', '#2caae1');

						photoIcon = baseUrl + "img/icons/twitter-large.png";

						popupData = {
									type:'twitter', 
									data:{
										author:feed.author.alias, 
										content:feed.text,
										datetime:tsToDate(feed.timestamp),
										avatar:feed.author.avatar
									}}
						//div.text('author: ' + feed.author.alias); // <-- author
						//console.log(feed.text);					    // <-- content
						//console.log(feed.timestamp); 			    // <-- datetime
						//console.log("avatar", feed.author.avatar); 	// <-- avatar

						var html = "<div class='twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
							html	+= "<div class='twitter_title'><div class='twitter_author'>"+ feed.author.alias + "</div>"
							html	+= "<div class='twitter_time'>"+ tsToDate(feed.timestamp) + "</div></div>"
							html	+= "<div class='twitter_text'>"+ feed.text + "</div>"
							html 	+= "<img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

						div.html(html);
						div.attr('type', 'twitter');
						div.fadeIn(200);

						enableItemButton(div, popupData);

						centerRollOverContent(.55);


						break;
				}

			});
		},

		centerRollOverContent:function(){
			centerRollOverContent(.55);
		},

		enableItemButton:function(item, popupData){
			enableItemButton(item, popupData)
		},

		openPopUp: function(popupData){
			openPopUp(popupData);
		},

		enableShareButton: function(item){
			enableShareButton(item);
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