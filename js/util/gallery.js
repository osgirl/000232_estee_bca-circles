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
		

		var SCROLL_TO_SHOW_FOOTER = 2000;
		var PHOTO_LAYOUT_COLUMN_NUM		= 4;
		var CIRCLE_LAYOUT_COLUMN_NUM	= 2;
		var DEFAULT_GALLERY_HEIGHT		=  1500;

		var allPhotoData;
		var morePhotoData;

		var galleryItem;
		

		var circleFeed;
		var photoFeed;
		var instagramFeed;
		var twitterFeed;

		var getCircleNum = 4;
		var getPhotoNum = 12;

		var circleEnd = false;
		var morePhotoCount = 0;

		var circleNum;
			var photoNum;
			var twitterNum;
			var instagramNum;



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

			circleFeed = data;

			if(data.length == 0) return;

			createCircleLayout();

			var feed;
			var containerCount = 0;
			var circleFeedDataArray = new Array();

			$(data).each(function(i){
				feed = data[i].data;

				$.ajax({
	        		type: 'post',
	            	url: baseUrl + 'index.php/circle/fetchCircleData',
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

		function getMoreAllFeed(){

			

			morePhotoData = new Array();

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

			if(circleEnd) {
				circleNum       = 0;
				photoNum 		= 4;
				twitterNum 		= 4;
				instagramNum 	= 4;

			}else{
				$.feed.more('bca-circle', parseAllCircleData, circleNum);
			}


		}

		function parseAllCircleData(data){

			if(data.length == 0) {
				circleEnd = true;
			}

			createAllLayout(data);

			$('body').unbind("ALL_LAYOUT_SINGLE_CREATED").bind('ALL_LAYOUT_SINGLE_CREATED', function(){

				var feed;

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

			            	var circleContainer = (isMoreFeed) ? $($($(".page"+pageNum).find('.gallery_circle')).get(i)) : $($('.gallery_circle').get(i));
			                galleryItem.populateCircleContent(circleContainer, feedData);

		             	}
		      		});
				});

				if(!isMoreFeed){
					$.feed.get('bca-photo', handleAllPhotoData, 3);
			        $.feed.get('bca-instagram', handleAllPhotoData, 3);
			        $.feed.get('bca-twitter', handleAllPhotoData, 3);
				}else{
					$.feed.more('bca-photo', handleAllPhotoData, photoNum);
					$.feed.more('bca-twitter', handleAllPhotoData, twitterNum);
					$.feed.more('bca-instagram', handleAllPhotoData, instagramNum);
				}

			});

		}

		function checkIfLoadMore(feed, getNum){
			var isMore;

			if(feed.length < getNum){
				isMore = false;
			}else{
				isMore = true;
			}

			return isMore;
		}


		function photoDiv(index){

			var div;

			if(currentFilterType == "all") {
				if(!circleEnd){
					div = $($('.photo_container').get(index));
				}else{
					div = $('<div>');
					div.addClass('span3 photo_container gallery_item flex_margin_bottom');
					div.appendTo('.page' + pageNum);

					div.hide();
					div.fadeIn(200);
				}
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

			allPhotoData = new Array();

			$.feed.get('bca-circle', parseAllCircleData, 3);
			
			
		}


		function parsePhotoData(data){

			photoFeed = data;

			if(data.length == 0) return;

			createPhotoLayout();

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				getPhotoData(i, data, feed);
			});
		}

		function getPhotoData(i, data, feed){
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
									id: data.photo_id,
									source:'bca',
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
		}

		function parseInstagramData(data){

			instagramFeed = data;

			if(data.length == 0) return;

			createPhotoLayout();

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				getInstagramData(i, data, feed);

			})
		}

		function getInstagramData(i, data, feed){

			var popupData = {
						type:'photo', 
						data:{
							id: feed.token,
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
		}

		function parseTwitterData(data){

			twitterFeed = data;

			if(data.length == 0) return;

			createPhotoLayout();

			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				getTwitterData(i, data, feed);

			})

		}

		function getTwitterData(i, data, feed){
			var popupData = {
							type:'twitter', 
							data:{
								author:feed.author.alias, 
								content:feed.text,
								datetime:tsToDate(feed.timestamp),
								avatar:feed.author.avatar
							}}

				var photoIcon = baseUrl + "img/icons/twitter-large.png";

				var html = "<div class='twitter_avatar'><img src='" + feed.author.avatar + "'/></div>"
					html	+= "<div class='twitter_title'><div class='twitter_author'>"+ feed.author.alias + "</div>"
					html	+= "<div class='twitter_time'>"+ tsToDate(feed.timestamp) + "</div></div>"
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
		}

		

		function parseMorePhotoData(data){

			var feed;

			createPhotoLayout();

			console.log(data.length)

			$(data).each(function(i){
				feed = data[i].data;

				var popupData;
				var photoIcon;
				var html;

				switch(feed.channel){
					case 'rss':
						getPhotoData(i, data, feed);
						break;

					case 'instagram':
						getInstagramData(i, data, feed);
						break;

					case 'twitter':
						getTwitterData(i, data, feed);
						break;
				}

			});

			$(window).unbind('scroll').bind('scroll', lazyloader);
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
			setTimeout(function(){
				galleryItem.centerRollOverContent(.55);
			}, 200);
		}

		function updateGalleryLayout(contentData){

			if(contentData.index%contentData.colNum == contentData.colNum-1) 
				$(contentData.item).css('margin-right', '0');
										
			//var rowNum = Math.ceil(contentData.totalNum/contentData.colNum);
			//var getHeight = ($(contentData.item).height() + 130)*rowNum;
			var getHeight = 800*pageNum;

			if(getHeight > 800) {
				$('#gallery').height(getHeight);
			}else{
				$('#gallery').height(800);
			}

		}

		function initFilterButtons(){
			$(".pink_filter_btn").each(function(index, value){
		
				$(value).unbind("click").click(function(e){
					isMoreFeed = false;
					pageNum = 1;
					$.feed.reset();
					currentFilterType = $(value).attr('type');
					if(currentFilterType == "all") {
						pageNum = 2;
						$('#gallery').height(DEFAULT_GALLERY_HEIGHT);
					}
					$(window).unbind('scroll').bind('scroll', lazyloader);
					$('#donate_area').show();
					$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');
					
					loadLayout();
				});
			})
		}

		function loadLayout(){

			if(!isMoreFeed) $('.gallery_layout').remove();

			switch(currentFilterType){
				case 'all':
					morePhotoCount = 0;
					allPhotoData = [];
					(!isMoreFeed) ? getAllFeed() : getMoreAllFeed();
					
				break;

				case 'circle':
				case 'friend':
					
					if(!isMoreFeed){
						$.feed.get('bca-circle', parseCircleData, getCircleNum);
					}else{
						if(checkIfLoadMore(circleFeed, getCircleNum)) $.feed.more('bca-circle', parseCircleData, getCircleNum);
					}
				break;

				case 'photo':
					if(!isMoreFeed){
						$.feed.get('bca-photo', parsePhotoData, getPhotoNum);
					}
					else{
						if(checkIfLoadMore(photoFeed, getPhotoNum)) $.feed.more('bca-photo', parsePhotoData, getPhotoNum);
					}
					
				break;

				case 'instagram':
					if(!isMoreFeed){

						$.feed.get('bca-instagram', parseInstagramData, getPhotoNum);
					}
					else{
						if(checkIfLoadMore(instagramFeed, getPhotoNum)) $.feed.more('bca-instagram', parseInstagramData, getPhotoNum);
						
					}
				break;

				case 'twitter':
					if(!isMoreFeed){
						$.feed.get('bca-twitter', parseTwitterData, getPhotoNum);
					}
					else{
						if(checkIfLoadMore(twitterFeed, getPhotoNum)) $.feed.more('bca-twitter', parseTwitterData, getPhotoNum);
						
					}
				break;
			}

		}

		

		function createAllLayout(data){

			console.log("CREATE_ALL_LAYOUT_START");

			if(data && data.length > 0){
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
							$('body').trigger('ALL_LAYOUT_SINGLE_CREATED');
							
							return;
						}else{
							$(layout1).addClass('layout1 page1');
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
								galleryItem.centerRollOverContent(.55);

	  			 				if(isMoreFeed)  {
	  			 					$(window).bind('scroll', lazyloader);
	  			 					
	  			 				}

	  			 				console.log('layout is created')

	  			 				$('body').trigger('ALL_LAYOUT_SINGLE_CREATED');

								//$('body').trigger('ALL_LAYOUT_CREATED');
								
			             	}
			      		});
						
	             	}
	      		});

			}else{

				createPhotoLayout();

			}

		}
		

		function createCircleLayout(){
			var circleLayout = $('<div>');
			circleLayout.addClass('layout_circle gallery_layout page' + pageNum)
						.appendTo(gallery_container);


		}

		function createPhotoLayout(){
			console.log('create photo layout')
			var photoLayout = $('<div>');
			photoLayout.addClass('layout_photo gallery_layout page' + pageNum)
						.appendTo(gallery_container);
		}

		function handleAllPhotoData(data){

			if(data.length != 0) {
				$(data).each(function (i, v){
					allPhotoData.push(v);
				})
			}

			allPhotoData.sort(function sortNumber(a, b){
				  var aNum = Number(a.data.timestamp);
				  var bNum = Number(b.data.timestamp); 
				  return ((aNum < bNum) ? -1 : ((aNum > bNum) ? 0 : 1));
			});

			morePhotoCount++;

			 if(morePhotoCount == 3)	galleryItem.parseAllPhotoData(allPhotoData, false);

		}

		

		// function handleMorePhotoData(data){

		// 	if(data.length != 0) {
		// 		$(data).each(function (i, v){
		// 			morePhotoData.push(v);
		// 		})
		// 	}

		// 	morePhotoCount++;

		// 	morePhotoData.sort(function sortNumber(a, b){
		// 	  var aNum = Number(a.data.timestamp);
		// 	  var bNum = Number(b.data.timestamp); 
		// 	  return ((aNum < bNum) ? -1 : ((aNum > bNum) ? 0 : 1));
		// 	});

		// 	if(morePhotoCount == 3) galleryItem.parseAllPhotoData(allPhotoData, false);

		// }

		
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

			if(currentFilterType == "all") {
				pageNum = 2;
				$('#gallery').height(DEFAULT_GALLERY_HEIGHT);
			}

			$(window).resize(function(e){
				galleryItem.centerRollOverContent();
			})	

		},

		refreshAsFakeData: function(data, type){
			$.ajax({
				type: 'post',
		    	url: baseUrl + 'circle/fetchCircleData',
		    	dataType: 'json',
		    	data: {
		    		circle_id:data.id
		    	},
		    	success: function(data) {           
		        	console.log('success', data);
		        	//loadLayout();
		     	}
			});
		},

		enableLazyloader: function(){
			$(window).bind('scroll', lazyloader);
		},

		disableLazyloader: function(){
			$(window).unbind('scroll');
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