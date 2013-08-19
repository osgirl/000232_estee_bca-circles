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

		var SCROLL_TO_SHOW_FOOTER = 2000;
		var PHOTO_LAYOUT_COLUMN_NUM		= 4;
		var CIRCLE_LAYOUT_COLUMN_NUM	= 2;

		var allPhotoData;
		var morePhotoData;

		var galleryItem;
		var pageNum = 1;

		var circleFeed;
		var photoFeed;
		var instagramFeed;
		var twitterFeed;

		var getCircleNum = 4;
		var getPhotoNum = 12;


		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		function lazyloader(){

			if(currentFilterType == "circle" || currentFilterType == "friend"){
				SCROLL_TO_SHOW_FOOTER = 2400
			}else{
				SCROLL_TO_SHOW_FOOTER = 2000
			}

			if($(window).scrollTop() + $(window).height() == getDocHeight() ) {

				//unlbind scroll event until all new content loaded to screen
				

				//load content
				console.log('reach here?');

				$(window).unbind('scroll');
				isMoreFeed = true;
				pageNum++;
				$('#donate_area').fadeIn();
	  			$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');
				loadLayout();

	  		}else if($(window).scrollTop() > SCROLL_TO_SHOW_FOOTER){
	  			$('#donate_area').show();
	  			$('#donate_area').addClass('footer_fixed').removeClass('footer_relative');

	  		}else if($(window).scrollTop() <= SCROLL_TO_SHOW_FOOTER){
	  			//$('#donate_area').fadeOut();
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

			if(isMoreFeed){
				if(checkIfLoadMore(data)) return;
			}

			createCircleLayout();

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
										totalNum:data.length*pageNum,
										colNum:CIRCLE_LAYOUT_COLUMN_NUM
									}

									galleryItem.populateCircleContent($(circleDiv), circleFeedDataArray[containerCount]);

									if(containerCount == data.length-1) 
										updateGalleryLayout(contentData);

									containerCount++;

									$(window).unbind('scroll').bind('scroll', lazyloader);

				             	}
				      		});

	                	}else{
	                		galleryItem.populateCircleContent($($('.circle_container').get(i)), feedData);
	                	}

	             	}
	      		});
			});

		}


		function photoDiv(index){

			var div;

			if(currentFilterType == "all") {
				div = $($('.photo_container').get(index));
			}else{
				div = $('<div>');
				div.addClass('span3 photo_container gallery_item flex_margin_bottom');
				div.appendTo('.page' + pageNum);

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

				var circleNum;
				var photoNum;
				var twitterNum;
				var instagramNum;

				//morePhotoData = new Array();

				switch(current_add_layout){
					case 1:
						circleNum 		= 2;
						photoNum 		= 1;
						twitterNum 		= 2;
						instagramNum 	= 2;
					break;

					case 2:
						circleNum 		= 1;
						photoNum 		= 1;
						twitterNum 		= 2;
						instagramNum 	= 2;
					break;
				}

					$.feed.more('bca-circle', parseCircleData, circleNum);
					$.feed.more('bca-photo', handleMorePhotoData, photoNum);
					$.feed.more('bca-twitter', handleMorePhotoData, twitterNum);
					$.feed.more('bca-instagram', handleMorePhotoData, instagramNum);
				
			}
		}


		function parsePhotoData(data){

			if(isMoreFeed){
				if(checkIfLoadMore(data)) return;
			}

			createPhotoLayout();

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
								totalNum:data.length*pageNum,
								type:'photo',
								content:html,
								popupData:popupData,
								colNum:PHOTO_LAYOUT_COLUMN_NUM
							}

							populatePhotoContent(contentData);

							$(window).unbind('scroll').bind('scroll', lazyloader);

		             	}
		      		});
				});
		}

		function parseInstagramData(data){

			console.log("is more feed??", isMoreFeed)

			console.log("is there more", checkIfLoadMore(data))

			// if(isMoreFeed){
			// 	if(checkIfLoadMore(data)) return;
			// }

			console.log('should be more right?', data)

			createPhotoLayout();

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
					totalNum:data.length*pageNum,
					type:'instagram',
					content:html,
					popupData:popupData,
					colNum:PHOTO_LAYOUT_COLUMN_NUM
				}

				populatePhotoContent(contentData);

				$(window).unbind('scroll').bind('scroll', lazyloader);

			})
		}

		function parseTwitterData(data){

			if(isMoreFeed){
				if(checkIfLoadMore(data)) return;
			}

			createPhotoLayout();

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
					totalNum:data.length*pageNum,
					type:'twitter',
					content:html,
					popupData:popupData,
					colNum:PHOTO_LAYOUT_COLUMN_NUM
				}

				populatePhotoContent(contentData);

				$(window).unbind('scroll').bind('scroll', lazyloader);

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
			var getHeight = ($(contentData.item).height() + 130)*rowNum;

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
					pageNum = 1;
					$(window).unbind('scroll').bind('scroll', lazyloader);
					$('#donate_area').show();
					$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');
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
					
					if(!isMoreFeed)
						$.feed.get('bca-circle', parseCircleData, getCircleNum);
					else
						$.feed.more('bca-circle', parseCircleData, getCircleNum);
				break;

				case 'photo':
					if(!isMoreFeed)
						$.feed.get('bca-photo', parsePhotoData, getPhotoNum);
					else
						$.feed.more('bca-photo', parsePhotoData, getPhotoNum);
					
				break;

				case 'instagram':
					if(!isMoreFeed){

						$.feed.get('bca-instagram', parseInstagramData, getPhotoNum);
						console.log('get')
					}
					else{
						$.feed.more('bca-instagram', parseInstagramData, getPhotoNum);
						console.log('more')
					}
				break;

				case 'twitter':
					if(!isMoreFeed)
						$.feed.get('bca-twitter', parseTwitterData, getPhotoNum);
					else
						$.feed.more('bca-twitter', parseTwitterData, getPhotoNum);
				break;
			}

		}

		function checkIfLoadMore(feed){
			console.log('check if load more feed', feed.length)

			var isEnd;

			if(feed.length == 0){
				isEnd = true;
			}else{
				isEnd = false;
			}

			return isEnd;
		}

		function createAllLayout(){

			$.ajax({
	        		type: 'get',
	            	url: baseUrl + 'layout/loadLayout' + current_add_layout,
	            	dataType: 'html',
	            	
	            	success: function(layout1data) {   

	            		var layout1 = $('<div>');

	            		layout1.addClass('gallery_layout row')

	            				.html(layout1data);     

	            		$(layout1).appendTo(gallery_container);
	            		

						if(isMoreFeed){
							$(layout1).addClass('layout' + current_add_layout)
							current_add_layout = (current_add_layout == 1) ? 2 : 1;
							$(layout1).addClass('page'+pageNum);
							$(window).bind('scroll', lazyloader);
							return;
						}else{
							$(layout1).addClass('layout1 page1')
						}

						$.ajax({
			        		type: 'get',
			            	url: baseUrl + 'layout/loadLayout2',
			            	dataType: 'html',
			            	
			            	success: function(layout2data) {  
				            	var layout2 = $('<div>');     
				            	layout2.addClass('layout2 gallery_layout row')
		            				.html(layout2data); 

		            			$(layout2).appendTo(gallery_container);

								$(layout2).addClass('page2');
								galleryItem.centerRollOverContent();

	  			 				if(isMoreFeed){
									//gallery_container.masonry( 'appended', layout2data );
			  			 			$(window).bind('scroll', lazyloader);
								}
			             	}
			      		});
						
	             	}
	      		});

		}
		

		function createCircleLayout(){
			var circleLayout = $('<div>');
			circleLayout.addClass('layout_circle gallery_layout page' + pageNum)
						.appendTo(gallery_container);


		}

		function createPhotoLayout(){
			var photoLayout = $('<div>');
			photoLayout.addClass('layout_photo gallery_layout page' + pageNum)
						.appendTo(gallery_container);
		}

		function handleAllPhotoData(data){

			$(data).each(function (i, v){
				allPhotoData.push(v);

			})

			allPhotoData.sort(function sortNumber(a, b){
			  var aNum = Number(a.data.timestamp);
			  var bNum = Number(b.data.timestamp); 
			  return ((aNum < bNum) ? -1 : ((aNum > bNum) ? 0 : 1));
			});

			galleryItem.parseAllPhotoData(allPhotoData, false, false, 1);

		}

		function handleMorePhotoData(data){

			console.log('i shouldn be hrer')

			$(data).each(function (i, v){

				$.each(allPhotoData, function(e, ev){

					if(ev.data.id == v.data.id) return;
				})

				morePhotoData.push(v);
				
			})

			// morePhotoData.sort(function sortNumber(a, b){
			//   var aNum = Number(a.data.timestamp);
			//   var bNum = Number(b.data.timestamp); 
			//   return ((aNum > bNum) ? -1 : ((aNum > bNum) ? 0 : 1));
			// });

			galleryItem.parseAllPhotoData(data, false, true, pageNum);

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