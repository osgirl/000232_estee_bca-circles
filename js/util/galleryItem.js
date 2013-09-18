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

				$(item.find('.gallery_item_btn')).unbind('click').click(function(e){
					//$('.popup#popup_circle .btn_close').trigger('click');
					openPopUp(popupData)})
				centerRollOverContent(.55);
			})

			$(item.find('.gallery_item_btn')).unbind('mouseleave').mouseleave(function(e){

				$(e.currentTarget).stop(true, true).fadeTo("fast", 0);
				$($(e.currentTarget).next()).find('.share_text').css('color', "#ffffff")

			})
        	enableShareButton(item);
        }

        function enableShareButton(item){
        	var itemType = ($(item).hasClass('circle_container')) ? 'circle' : 'photo';

        	$(item.find('.circle_fb_share_btn')).unbind('click').click(function(e){
				share($(item), "facebook", itemType);
				console.log("facebook click", itemType)
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

		function placeCircleInAngles(parent, profileImageUrl, friendData, isUser){
			$(parent).find('.point').remove();
			$(parent).find('.profile_image_small').remove();
			$(parent).find('.friend_image_small').remove();
			var radius 	= 44.7,
				cx 		= 47,
				cy 		= 47,
				steps 	= friendData.length + 1,
				angle, x, y;

			for(var i = 0; i < steps; i++){
				angle = (Math.PI * ( i / steps -.25) ) *2;
				x = cx + radius * Math.cos(angle);
				y = cy + radius * Math.sin(angle);

				var dotClass;
				var dotItem = $('<div>');

				if(i == 0){
					dotClass = 'profile_image_small';
				}else{

					dotClass = (isUser) ? 'friend_image_small' : 'point';

				}


				dotItem
					.addClass(dotClass)
					.css({'left': x + "%", 'top': y + "%"})
					.appendTo(parent);

				if(i == 0) {
					dotItem.css('background-image', 'url(' + profileImageUrl + ')');
				}else if(i>0){
					if(isUser) {
						$(dotItem).css('background-image', 'url(' + friendData[i-1].url + ')');
					}
				}
			}
		}

		function updateUserCirclePopupContent(circle, id, user_name, content, avatar, userID, friendData, country, isUser){
			//console.log("updateUserCirclePopupContent", friendData);
			//if(friendData != undefined)

	        	placeCircleInAngles(circle.find('.circle_area'), avatar, friendData, isUser);

	        	circle.attr('is_user', isUser);	

			var popupData = {
					type:'circle', 
					data:{
						id:id,
						circle_id:id,
						author: user_name,
						content:content, 
						avatar:avatar,
						users_fb_id:userID,
						num_friends: friendData.length,
						friends_data: friendData,
						country: country,
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
			//console.log("populateCircleContent");
			//console.log(circle);
			//console.log(data);
			circle.attr('circle_id', data.circle_id);
			circle.attr('user_name', data.user_name);
			circle.attr('user_id', data.user_id);
			circle.attr('goal_id', data.goal_id);
			circle.attr('goal_type', data.goal_type);
			circle.attr('country', data.country);
			circle.find('.circle_flag').css("background-image", 'url("' + baseUrl + 'img/flags/large/' + data.country + '.png")');
			circle.find('.circle_creator').html(data.user_name);
			var goalText = (data.goal_type == "default") ? goalTextArray[data.goal_id-1].text : data.goal;
			circle.find('.goal_text').html(goalText);
			circle.fadeIn(200);

			var isUser;

			if(isLogin){
				isUser = (data.user_id == userID) ? true : false;
			}
			else{
				isUser = false;	
			}

			updateUserCirclePopupContent(circle, data.circle_id, data.user_name, goalText, data.user_photo_url, data.user_id, data.friends_data, data.country, isUser);

		},

		updateUserCirclePopupContent:function(circle, id, user_name, content, avatar, userID, friendData, country, isUser){
			updateUserCirclePopupContent(circle, id, user_name, content, avatar, userID, friendData, country, isUser);
			
		},

		parseAllPhotoData:function(data, isFeatured, isRest){

			console.debug("galleryItem:parseAllPhotoData", data, isFeatured);
						var feed;

			//oc: loop through all items in the master feed to write them into the gallery
			ored.allPhotoDataParsed.push(data);

			$(data).each(function(i, v){
				//console.log("FEED:",i);
				//console.log(data);

				feed = v.data;
				var div;

				if(isFeatured) {
					div = $($('.feature_photo').get(i));
				}else if(isRest){
					div = $('<div>');
					div.addClass('span3 photo_container gallery_item flex_margin_bottom')
						.appendTo($(".page"+pageNum));
					
				}else{	
					div = (isMoreFeed) ? $($($(".page"+pageNum).find('.photo_container')).get(i)) : $($('.photo_container').get(i));
				}

				var popupData;
				var photoIcon;
				var html;

				switch(feed.channel){
					
					//oc: 
					case 'rss':

						console.log("searching for :",feed.text);
						photoIcon 	= baseUrl + "img/icons/bca.png";
						 pData 		= ored.getPhotoDataById(feed.text);
						 console.debug("WHAT THE HELL IS PDATA", pData)
						if(pData != -1){
		                	popupData 	= {
											type:'photo', 
											data:{
												id: pData.photo_id,
												source:'bca',
												content:pData.description,
												photo_url:baseUrl + "uploads/" + pData.filename
												}
											};
		                	html 		= "<img class='full_photo' src='" + baseUrl + "uploads/" + pData.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;
		                	div.html(html);
		                	div.attr('type', 'photo');
		                	$('#feed_magnet').show();

		                	div.fadeIn(200);
							
							enableItemButton(div, popupData);

							centerRollOverContent(.55);

							$('body').trigger("ALL_LAYOUT_CREATED");
							
						}else console.error("Photo Data Not Found");

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
						default : console.error("UNKNOWN feed channel", feed.channel);
				}//end switch

			});

			translator.translateSingleItem("view");

			console.debug('PHOTO_LOADED');
			photoLoaded = true;
			$.mainPreloader.loadComplete();

			// $('.photo_container').each(function(i,v){
			// 	if($(v).html() == "") $(v).hide();
			// })

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