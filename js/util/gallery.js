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
		var currentFilterType = "all";
		var currentLayoutPath;

		var SCROLL_TO_SHOW_FOOTER 		= 2400;
		var PHOTO_LAYOUT_COLUMN_NUM		= 4;
		var CIRCLE_LAYOUT_COLUMN_NUM	= 2;

		var allPhotoData;

		var photoButtonHtml = '<div class="photo_rollover item_rollover"><div class="rollover_content"><div class="pink_btn all_cap view_circle_btn">view</div></div></div><div class="gallery_item_btn"></div>'


		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		function lazyloader(){

			if($(window).scrollTop() + $(window).height() == getDocHeight() ) {


				//unlbind scroll event until all new content loaded to screen
				$(window).unbind('scroll');

				//load content

				// $.ajax({
	   //      		type: 'get',
	   //          	url: currentLayoutPath,
	   //          	dataType: 'html',
	            	
	   //          	success: function(data) {            
				// 		gallery_container.append(data);
						
				// 		if(currentFilterType == 'all') current_add_layout = (current_add_layout == 1) ?  2 : 1;

				// 		defineLayout();
				// 		centerRollOverContent();

				// 		getGalleryHeight();
						
				// 		// gallery_container.masonry( 'appended', data );

				// 		// //bind scroll event again after all of content loaded ()
	  	// 		 		$(window).bind('scroll', lazyloader);
	   //           	}
	   //    		});
				
	  		}else if($(window).scrollTop() + $(window).height() > SCROLL_TO_SHOW_FOOTER){
	  			$('#donate_area').fadeIn();
	  			$('#donate_area').removeClass('footer_relative').addClass('footer_fixed');

	  		}else if($(window).scrollTop() + $(window).height() <= SCROLL_TO_SHOW_FOOTER){
	  			$('#donate_area').fadeOut();
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

		function parseCircleData(data){
			var feed;
			var containerCount = 0;
			var circleFeedDataArray = new Array();

			$(data).each(function(i){
				feed = data[i].data;

				$.ajax({
	        		type: 'post',
	            	url: baseUrl + 'circle/fetchCircleData',
	            	dataType: 'json',
	            	data: {
	            		circle_id: feed.text
	            	},
	            	success: function(feedData) { 

	                	if(currentFilterType != "all"){

	                		//this extra step is to fix the circle id that sometimes is not in order

	                		circleFeedDataArray.push(feedData);

		            		circleFeedDataArray.sort(function sortNumber(a, b){

							  var aNum = Number(a.circle_id);
							  var bNum = Number(b.circle_id); 
							  return ((aNum > bNum) ? -1 : ((aNum > bNum) ? 0 : 1));
							});

	                		$.ajax({
				        		type: 'get',
				            	url: baseUrl + 'layout/loadLayoutCircle',
				            	dataType: 'html',
				            	
				            	success: function(layoutData) {  

				            		var circleDiv = $('<div>');
				            			circleDiv.append(layoutData)
				            			         .addClass('span6 circle_container gallery_item flex_margin_bottom');
				            		$('.layout_circle').append(circleDiv);
				            		$(circleDiv).hide();
				            		$(circleDiv).fadeIn(200);

				            		var contentData = {
										index:i,
										item:$(circleDiv),
										totalNum:data.length,
										colNum:CIRCLE_LAYOUT_COLUMN_NUM
									}

									populateCircleContent($(circleDiv), circleFeedDataArray[containerCount]);

									if(containerCount == data.length-1) 
										updateGalleryLayout(contentData);

									containerCount++;
				             	}
				      		});

	                	}else{
	                		populateCircleContent($($('.circle_container').get(i)), feedData);
	                	}

	             	}
	      		});
			});

		}

		function populateCircleContent(circle, data){

			circle.attr('circle_id', data.circle_id);
			circle.find('.circle_creator').html(data.user_name);
			circle.find('.circle_goal').html("<b>We Will - </b><br />" + data.goal);
			circle.find('.feature_circle_goal').html("<b>We Will - </b><br />" + data.goal);

        	placeCircleInAngles(circle.find('.circle_area'), data.user_photo_url, data.friends_data.length);
        	placeCircleInAngles(circle.find('.feature_circle_area'), data.user_photo_url, data.friends_data.length);

        	var popupData = {
				type:'circle', 
				data:{
					content:data.goal, 
					avatar:data.user_photo_url,
					circle_id:data.circle_id,
					users_fb_id:data.user_id,
					num_friends: data.friends_data.length
				}}

        	enableItemButton(circle, popupData);

        	centerRollOverContent();

		}

		function openPopUp(popupData){
			$.popup(popupData);

			gallery_container.masonry('destroy');
			$(window).unbind('scroll');
		}

		// function parsePhotoData(data){

		// }

		function photoDiv(index){

			var div;

			if(currentFilterType == "all") {
				div = $($('.photo_container').get(index));
			}else{
				div = $('<div>');
				div.addClass('span3 photo_container gallery_item flex_margin_bottom');
				div.appendTo('.layout_photo');

				div.hide();
				div.fadeIn(200);
			}

			return div;
			
		}

		function getAllFeed(){

			allPhotoData = new Array();

			$.feed.get('bca-circle', parseCircleData, 3);
			$.feed.get('bca-photo', handleAllPhotoData, 3);
			$.feed.get('bca-twitter', handleAllPhotoData, 3);
			$.feed.get('bca-instagram', handleAllPhotoData, 3);

		}

		function parsePhotoData(data){
			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				$.ajax({
		        		type: 'post',
		            	url: baseUrl + 'photo/fetchUploadedPhotoData',
		            	dataType: 'json',
		            	data: {
		            		photo_id: feed.text
		            	},
		            	success: function(dbData) {  

		            		var photoIcon = baseUrl + "img/icons/bca.png";          

		                	var popupData = {
									type:'photo', 
									data:{
										source:'local', 
										author:'John Doe',
										content:dbData.description,
										photo_url:baseUrl + "uploads/" + dbData.filename
									}}
		                	var html = "<img class='full_photo' src='" + baseUrl + "uploads/" + dbData.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

							var contentData = {
								index:i,
								item:photoDiv(i),
								totalNum:data.length,
								type:'photo',
								content:html,
								popupData:popupData,
								colNum:PHOTO_LAYOUT_COLUMN_NUM
							}

							populatePhotoContent(contentData);

		             	}
		      		});
				});

		}

		function parseInstagramData(data){

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				var popupData = {
						type:'photo', 
						data:{
							source:'instagram', 
							author: feed.author.alias,
							content:feed.text,
							photo_url:feed.photos[0].url
						}}

				var photoIcon = baseUrl + "img/icons/instagram.png";

				var html = "<img class='full_photo' src='" + feed.photos[0].url + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

				var contentData = {
					index:i,
					item:photoDiv(i),
					totalNum:data.length,
					type:'instagram',
					content:html,
					popupData:popupData,
					colNum:PHOTO_LAYOUT_COLUMN_NUM
				}

				populatePhotoContent(contentData);

			})

		}

		function parseTwitterData(data){

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				var popupData = {
							type:'twitter', 
							data:{
								author:feed.author.alias, 
								content:feed.text,
								datetime:feed.timestamp,
								avatar:feed.author.avatar
							}}

				var photoIcon = baseUrl + "img/icons/twitter-large.png";

				var html = "<div class='twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
					html	+= "<div class='twitter_title'><div class='twitter_author'>"+ feed.author.alias + "</div>"
					html	+= "<div class='twitter_time'>"+ feed.timestamp + "</div></div>"
					html	+= "<div class='twitter_text'>"+ feed.text + "</div>"
					html 	+= "<img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

				var contentData = {
					index:i,
					item:photoDiv(i),
					totalNum:data.length,
					type:'twitter',
					content:html,
					popupData:popupData,
					colNum:PHOTO_LAYOUT_COLUMN_NUM
				}

				populatePhotoContent(contentData);


				// var fcontent = "<div class='featured_twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
				// 	fcontent	+= "<div class='featured_twitter_title'><div class='featured_twitter_author'>"+ feed.author.alias + "</div>"
				// 	fcontent	+= "<div class='featured_twitter_time'>"+ feed.timestamp + "</div></div>"
				// 	fcontent	+= "<div class='featured_twitter_text'>"+ feed.text + "</div>"
				// 	fcontent += "<img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

			})

		}


		function populatePhotoContent(contentData){

			if(contentData.type == "twitter")
				contentData.item.css('background', '#2caae1');

			contentData.item.html(contentData.content);
			contentData.item.attr('type', contentData.type);
			contentData.item.hide();
			contentData.item.fadeIn(200);

			updateGalleryLayout(contentData);
			
			enableItemButton(contentData.item, contentData.popupData);
			setTimeout(centerRollOverContent, 200);
			//centerRollOverContent();
		}

		function updateGalleryLayout(contentData){

			if(contentData.index%contentData.colNum == contentData.colNum-1) 
				$(contentData.item).css('margin-right', '0');
										
			var rowNum = Math.ceil(contentData.totalNum/contentData.colNum);
			var getHeight = ($(contentData.item).height() + 70)*rowNum;

			if(getHeight > 600) {
				$('#gallery').height(getHeight);
			}else{
				$('#gallery').height(600);
			}

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

		function parseAllPhotoData(data){

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				var div = $($('.photo_container').get(i));
				var popupData;
				var photoIcon;
				var html;
				var photoButtonHtml = '<div class="photo_rollover item_rollover"><div class="rollover_content"><div class="pink_btn all_cap view_circle_btn">view</div></div></div><div class="gallery_item_btn"></div>'

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
										source:'local', 
										author:'John Doe',
										content:data.description,
										photo_url:baseUrl + "uploads/" + data.filename
									}}
			                	html = "<img class='full_photo' src='" + baseUrl + "uploads/" + data.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;
			                	div.html(html);
			                	div.attr('type', 'photo');

			                	div.fadeIn(200);
			                	gallery_container.show();
								
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

						var content = "<div class='twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
							content	+= "<div class='twitter_title'><div class='twitter_author'>"+ feed.author.alias + "</div>"
							content	+= "<div class='twitter_time'>"+ feed.timestamp + "</div></div>"
							content	+= "<div class='twitter_text'>"+ feed.text + "</div>"
							content += "<img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

						var fcontent = "<div class='featured_twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
							fcontent	+= "<div class='featured_twitter_title'><div class='featured_twitter_author'>"+ feed.author.alias + "</div>"
							fcontent	+= "<div class='featured_twitter_time'>"+ feed.timestamp + "</div></div>"
							fcontent	+= "<div class='featured_twitter_text'>"+ feed.text + "</div>"
							fcontent += "<img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

						div.html(content);
						div.attr('type', 'twitter');
						div.fadeIn(200);

						enableItemButton(div, popupData);

						centerRollOverContent();


						break;
				}

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


		function centerRollOverContent(){
			$('.rollover_content').each(function(i, v){

				var rolloverMargin = ($($(v).parent()).height() - $(v).height())*.4;
				$(v).css('margin-top', rolloverMargin);
			})
		}	

		function initFilterButtons(){
			$(".pink_filter_btn").each(function(index, value){
		
				$(value).unbind("click").click(function(e){

					currentFilterType = $(value).attr('type');
					loadLayout();
				});
			})
		}

		function loadLayout(){

			$('.gallery_layout').remove();

			switch(currentFilterType){
				case 'all':
					createAllLayout();
					getAllFeed();
					
				break;

				case 'circle':
				case 'friend':
					createCircleLayout();
					$.feed.get('bca-circle', parseCircleData, 4);
				break;

				case 'photo':
					createPhotoLayout();
					$.feed.get('bca-photo', parsePhotoData, 12);
				break;

				case 'instagram':
					createPhotoLayout();
					$.feed.get('bca-instagram', parseInstagramData, 12);
				break;

				case 'twitter':
					createPhotoLayout();
					$.feed.get('bca-twitter', parseTwitterData, 12);
				break;
			}

		}

		function createAllLayout(){
			$.ajax({
	        		type: 'get',
	            	url: baseUrl + 'layout/loadLayout1',
	            	dataType: 'html',
	            	
	            	success: function(data) {            
						gallery_container.append(data);

						$.ajax({
			        		type: 'get',
			            	url: baseUrl + 'layout/loadLayout2',
			            	dataType: 'html',
			            	
			            	success: function(data) {            
								gallery_container.append(data);
								//parseDataToLayout();
								centerRollOverContent();
								
			             	}
			      		});
						
	             	}
	      		});
		}
		

		function createCircleLayout(){
			var circleLayout = $('<div>');
			circleLayout.addClass('layout_circle gallery_layout')
						.appendTo(gallery_container);

			//if(currentFilterType!='all') $.feed.get('bca-circle', parseCircleData, 4);
		}

		function createPhotoLayout(){
			var photoLayout = $('<div>');
			photoLayout.addClass('layout_photo gallery_layout')
						.appendTo(gallery_container);
		}

		function handleAllPhotoData(data){

			$(data).each(function (i, v){
				allPhotoData.push(v);
			})

			allPhotoData.sort(function sortNumber(a, b){
			  var aNum = Number(a.data.timestamp);
			  var bNum = Number(b.data.timestamp); 
			  return ((aNum > bNum) ? -1 : ((aNum > bNum) ? 0 : 1));
			});

			parseAllPhotoData(allPhotoData);

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

			gallery_container = $('#feed_magnet');

			$(window).bind('scroll', lazyloader);
			gallery_container.masonry();

			centerRollOverContent();
			

			$('.gallery_item').hide();
			// gallery_container.hide();


			$.feed();
			fm_ready(function($, _) {

				initFilterButtons();
				loadLayout();
				

				$(window).resize(function(e){
					centerRollOverContent();
				})	

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
	
	return Gallery;
}