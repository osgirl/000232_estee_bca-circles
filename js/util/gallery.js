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
		var isMoreFeed = false;

		var SCROLL_TO_SHOW_FOOTER 		= 1600;
		var PHOTO_LAYOUT_COLUMN_NUM		= 4;
		var CIRCLE_LAYOUT_COLUMN_NUM	= 2;

		var allPhotoData;

		var galleryItem;



		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		function lazyloader(){

			if($(window).scrollTop() + $(window).height() == getDocHeight() ) {


				//unlbind scroll event until all new content loaded to screen
				$(window).unbind('scroll');

				//load content

				isMoreFeed = true;
				loadLayout();

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

									galleryItem.populateCircleContent($(circleDiv), circleFeedDataArray[containerCount]);

									if(containerCount == data.length-1) 
										updateGalleryLayout(contentData);

									containerCount++;
				             	}
				      		});

	                	}else{
	                		galleryItem.populateCircleContent($($('.circle_container').get(i)), feedData);
	                	}

	             	}
	      		});
			});

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

			if(!isMoreFeed){
				allPhotoData = new Array();

				$.feed.get('bca-circle', parseCircleData, 3);
				$.feed.get('bca-photo', handleAllPhotoData, 3);
				$.feed.get('bca-twitter', handleAllPhotoData, 3);
				$.feed.get('bca-instagram', handleAllPhotoData, 3);

			}else{
				$.feed.more('bca-circle', parseCircleData, 3);
				$.feed.more('bca-photo', handleAllPhotoData, 3);
				$.feed.more('bca-twitter', handleAllPhotoData, 3);
				$.feed.more('bca-instagram', handleAllPhotoData, 3);
			}
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
			
			galleryItem.enableItemButton(contentData.item, contentData.popupData);
			setTimeout(galleryItem.centerRollOverContent, 200);
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

		function initFilterButtons(){
			$(".pink_filter_btn").each(function(index, value){
		
				$(value).unbind("click").click(function(e){
					isMoreFeed = false;
					currentFilterType = $(value).attr('type');
					loadLayout();
				});
			})
		}

		function loadLayout(){

			if(!isMoreFeed) $('.gallery_layout').remove();

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
					if(!isMoreFeed)
						$.feed.get('bca-photo', parsePhotoData, 12);
					else
						$.feed.more('bca-photo', parsePhotoData, 12);
				break;

				case 'instagram':
					createPhotoLayout();
					if(!isMoreFeed)
						$.feed.get('bca-instagram', parseInstagramData, 12);
					else
						$.feed.more('bca-instagram', parseInstagramData, 12);
				break;

				case 'twitter':
					createPhotoLayout();
					if(!isMoreFeed)
						$.feed.get('bca-twitter', parseTwitterData, 12);
					else
						$.feed.more('bca-twitter', parseTwitterData, 12);
				break;
			}

		}

		function createAllLayout(){

			$.ajax({
	        		type: 'get',
	            	url: baseUrl + 'layout/loadLayout' + current_add_layout,
	            	dataType: 'html',
	            	
	            	success: function(data) {            
						gallery_container.append(data);

						$.ajax({
			        		type: 'get',
			            	url: baseUrl + 'layout/loadLayout' + current_add_layout,
			            	dataType: 'html',
			            	
			            	success: function(data) {            
								gallery_container.append(data);
								galleryItem.centerRollOverContent();
			             	}
			      		});
						
	             	}
	      		});

			current_add_layout = (current_add_layout == 1) ? 2 : 1;
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

			galleryItem.parseAllPhotoData(allPhotoData, false);

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

			galleryItem = new GalleryItem();

			$(window).scrollTop(0);

			gallery_container = $('#feed_magnet');

			$(window).bind('scroll', lazyloader);
			gallery_container.masonry();

			galleryItem.centerRollOverContent();
			$('.gallery_item').hide();

			initFilterButtons();
			loadLayout();
			

			$(window).resize(function(e){
				galleryItem.centerRollOverContent();
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