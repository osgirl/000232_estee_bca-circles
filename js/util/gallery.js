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
		var current_add_layout 	= 1;
		var currentFilterType 	= "all";
		var currentLayoutPath;
		

		var SCROLL_TO_SHOW_FOOTER 		= 2000;
		var PHOTO_LAYOUT_COLUMN_NUM		= 4;
		var CIRCLE_LAYOUT_COLUMN_NUM	= 2;
		var DEFAULT_GALLERY_HEIGHT		=  1500;

		var allPhotoData;
		var morePhotoData;
		

		var circleFeed;
		var circleFriendFeed;
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

		var uploadedPhotoCount;

		var galleryHeight = 0;



		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		function lazyloader(){

			// if(currentFilterType == "circle" || currentFilterType == "friend"){
			// 	SCROLL_TO_SHOW_FOOTER = 2400
			// }else{
				SCROLL_TO_SHOW_FOOTER = 1800
			//}

			if($(window).scrollTop() + $(window).height() == getDocHeight() ) {

				//unlbind scroll event until all new content loaded to screen

				//load content

				$(window).unbind('scroll');
				isMoreFeed = true;

				pageNum++;
				console.log("PAGE PLUS", pageNum)
				loadLayout();

	  		}else if($(window).scrollTop() > SCROLL_TO_SHOW_FOOTER){

	  			if($(window).width() >= 980 ){
	  				$('#donate_area').fadeIn();
	  				$('#donate_area').addClass('footer_fixed').removeClass('footer_relative');
	  			}

	  		}else if($(window).scrollTop() <= SCROLL_TO_SHOW_FOOTER){
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
			 }
			
			$.feed.more('bca-circle', parseAllCircleData, circleNum);


			console.log("---------------------------------get more feed, but is the circle finished?", circleEnd)


		}
/*   oc: 
this function handles the onComplete of the loading the list of cirle ID's from feedmagnet upon filter click
then requests a list of circles 
parse the circle data from feedmagnet and calls a route on our server to ccreates the markup from the list of 
*/
		function parseCircleData(data){
console.log("parseCircleData");
			//oc: prep feedmagnet array for db req
				//1. parse feedmagnet array deleting cookie if it matches
				//2. insert circle id from cookie (if its there)
				//3. req db circles with new array of circle ids

			circleFeed = data;
			console.log("---------------------------------how many more circle data?", data.length)

			if(data.length == 0) return;

			console.log("---------------------------------is circle end?", circleEnd, data.length);

			createCircleLayout();

			var feed;
			var containerCount = 0;
			var circleFeedDataArray = new Array();

			$(data).each(function(i){
				feed = data[i].data;

				$.ajax({
	        		type: 'post',
	            	url: baseUrl + indexPage + 'circle/fetchPoopyData',
	            	dataType: 'json',
	            	data: {
	            		circle_id: feed.text
	            	},
	            	success: function(feedData) { 

//oc: this is where we get CFM data 
	                

	                		//this extra step is to fix the circle id that sometimes is not in order

	                		circleFeedDataArray.push(feedData);

		            		circleFeedDataArray.sort(function(a, b) {
		            			var aNum = Number(a.circle_id);
		            			var bNum = Number(b.circle_id);
							   return (aNum > bNum) ? 1 : -1;
							});

	                		$.ajax({
				        		type: 'get',
				            	url: baseUrl + indexPage + 'layout/loadLayoutCircle',
				            	dataType: 'html',
				            	
				            	success: function(layoutData) {  

				            		var circleDiv = $('<div>');
				            			circleDiv.append(layoutData)
				            			         .addClass('span6 circle_container gallery_item flex_margin_bottom gallery_circle');

				            		var rowTarget = (containerCount<2) ? 0 : 1;
				            		$($($('.page' + pageNum).find('.row')).get(rowTarget)).append(circleDiv);

				            		$(circleDiv).addClass('pull-left');
				            		$(circleDiv).hide();
				            		$(circleDiv).fadeIn(200);

				            		containerCount++;

				            		var contentData = {
										index:containerCount,
										item:$(circleDiv),
										totalNum:data.length*pageNum,
										colNum:CIRCLE_LAYOUT_COLUMN_NUM,
										type:'circle'
									}

									galleryItem.populateCircleContent($(circleDiv), circleFeedDataArray[containerCount-1]);

									if(containerCount == data.length) {
										$('body').trigger('ALL_LAYOUT_CREATED');
									}

									enablelazyLoader();

				             	}
				      		});

	   
	             	}
	      		});
			});
		}


			//oc: prep feedmagnet array for db req
				//1. parse feedmagnet array deleting cookie if it matches
				//2. insert circle id from cookie (if its there)
				//3. req db circles with new array of circle ids
		function parseAllCircleData($data){

			console.log("parseAllCircleData");

			if($data.length == 0) circleEnd = true;
			var data = getIdsFromFeed($data);

			createAllLayout();
			$('body').unbind('ALL_LAYOUT_SINGLE_CREATED').bind('ALL_LAYOUT_SINGLE_CREATED', function(){ 

				$.ajax({
			        		type: 'post',
			            	url: baseUrl + indexPage + 'circle/fetchAllCircles',
			            	dataType: 'json',
			            	data: {
			            		feedIdsJSON: JSON.stringify(data)
			            	},
			            	success: onFetchAllCircles
			      		});


			});
			
		};
		
		function onFetchAllCircles($circles){
			console.log("onFetchAllCircles");

			
			
			$($circles).each(function(i,v){
				console.log("populate circle:",v.circle_id);
				var circleContainer = (isMoreFeed) ? $($($(".page"+pageNum).find('.gallery_circle')).get(i)) : $($('.gallery_circle').get(i));
				galleryItem.populateCircleContent(circleContainer, v);
	            
	            if(i == $circles.length - 1 )	$('body').trigger('ALL_LAYOUT_CREATED');
	            
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
		};

		function checkIfLoadMore(feed, getNum){
			var isMore;

			if(feed.length < getNum){
				isMore = false;
				enableLazyloader();
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
			uploadedPhotoCount = 0;

			if(data.length == 0) return;

			createPhotoLayout();

			var feed;

			$(data).each(function(i){
				feed = data[i].data;
				getPhotoData(data, feed);

			});
		}

		function getPhotoData(data, feed){

			$.ajax({
	        		type: 'post',
	            	url: baseUrl + indexPage + 'photo/fetchUploadedPhotoData',
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

						// var image = $('<img/>');
						// 	image.attr('src', baseUrl + "uploads/" + dbData.filename);

						// image.load(function(){
						// 	console.log('IMAGE LOADED')
						// })

						// image.error(function(){
						// 	console.log('no image loaded')
						// })


						uploadedPhotoCount++;

							var html = "<img class='full_photo' src='" + baseUrl + "uploads/" + dbData.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;


							var contentData = {
								index:uploadedPhotoCount,
								item:photoDiv(uploadedPhotoCount),
								totalNum:data.length*pageNum,
								type:'photo',
								content:html,
								popupData:popupData,
								colNum:PHOTO_LAYOUT_COLUMN_NUM
							}

							populatePhotoContent(contentData);

							if(uploadedPhotoCount == data.length) $('body').trigger("ALL_LAYOUT_CREATED");

							enableLazyloader();

	             	},
	             	error: function(XMLHttpRequest, textStatus, errorThrown){
	             		console.log('this is an error', textStatus, errorThrown)
	             	}
			});
		}

		function enableLazyloader(){
			console.log("enable??", $(window).width())
			if($(window).width() >= 980){
				console.log("enable lazy loader")
				$(window).unbind('scroll').bind('scroll', lazyloader);
			}
		}

		function parseInstagramData(data){

			instagramFeed = data;
			uploadedPhotoCount = 0;

			if(data.length == 0) return;

			createPhotoLayout();

			var feed;

			$(data).each(function(i){
				feed = data[i].data;
				getInstagramData(data, feed);

			})
		}

		function getInstagramData(data, feed){

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

				uploadedPhotoCount++;
				var contentData = {
					index:uploadedPhotoCount,
					item:photoDiv(uploadedPhotoCount),
					totalNum:data.length*pageNum,
					type:'instagram',
					content:html,
					popupData:popupData,
					colNum:PHOTO_LAYOUT_COLUMN_NUM
				}

				populatePhotoContent(contentData);

				enableLazyloader();
		}

		function parseTwitterData(data){

			twitterFeed = data;
			uploadedPhotoCount = 0;

			if(data.length == 0) return;

			createPhotoLayout();

			var feed;

			$(data).each(function(i){
				feed = data[i].data;
				
				getTwitterData(data, feed);

			})

		}

		function getTwitterData(data, feed){

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
				uploadedPhotoCount++;
				var contentData = {
					index:uploadedPhotoCount,
					item:photoDiv(uploadedPhotoCount),
					totalNum:data.length*pageNum,
					type:'twitter',
					content:html,
					popupData:popupData,
					colNum:PHOTO_LAYOUT_COLUMN_NUM
				}

				populatePhotoContent(contentData);

				enableLazyloader();
		}

		

		function parseMorePhotoData(data){

			var feed;

			createPhotoLayout();

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

			enableLazyloader();
		}


		function populatePhotoContent(contentData){
			if(contentData.type == "twitter")
				contentData.item.css('background', '#2caae1');

			contentData.item.html(contentData.content);
			contentData.item.attr('type', contentData.type);
			contentData.item.hide();
			contentData.item.fadeIn(200);
			
			galleryItem.enableItemButton(contentData.item, contentData.popupData);
			setTimeout(function(){
				galleryItem.centerRollOverContent(.55);
			}, 200);
		}

		function updateGalleryHeight(height){

			galleryHeight += height;

			console.log("UPDATE HEIHGT -----------------------------", galleryHeight)
			$("#feed_magnet").height(galleryHeight);
			$("#gallery").height(galleryHeight);


			//$("#load_more_btn_wrapper").css("bottom", "0");
		}

		function initFilterButtons(){
			$(".pink_filter_btn").each(function(index, value){
		
				$(value).unbind("click").click(function(e){
					filterButtonSelected($(value));
				});
			})
		};
		function createCirclesFromORedCircles(){
			$data = ored.friendsCircles;
			
};

function filterButtonSelected(btn){
	isMoreFeed = false;
	pageNum = 1;
	$.feed.reset();
	currentFilterType = btn.attr('type');
	if(currentFilterType == "all") {
		pageNum = 2;
		$('#gallery').height(DEFAULT_GALLERY_HEIGHT);
	}
	enableLazyloader();
	$('#donate_area').show();
	$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');

	galleryHeight = 0;
	
	loadLayout();
}

function onFetchFriendCircleData($data){
	console.log("onFetchFriendCircleData");

			createCircleLayout();
			circleFriendFeed 		= $data;

			var containerCount 		= 0;
			var circleFeedDataArray = new Array();

		 	$($data).each(function(i){	
			 	
		  	 	var feed 				= $data[i];
         		circleFeedDataArray.push(feed);

        		$.ajax({
	        		type: 'get',
	            	url: baseUrl + 'layout/loadLayoutCircle',
	            	dataType: 'html',
	            	
	            	success: function(layoutData) {  
	            		console.log("layout success");
	            		var circleDiv = $('<div>');
	            			circleDiv.append(layoutData)
	            			         .addClass('span6 circle_container gallery_item flex_margin_bottom gallery_circle');
	            		var rowTarget = (containerCount<2) ? 0 : 1;
				            		$($($('.page' + pageNum).find('.row')).get(rowTarget)).append(circleDiv);
	            		$(circleDiv).css('float','left');
	            		$(circleDiv).css('clear','none');
	            		$(circleDiv).hide();
	            		$(circleDiv).fadeIn(200);

	            		containerCount++;

	            		console.log('huh', containerCount)

	            		var contentData = {
							index:containerCount,
							item:$(circleDiv),
							totalNum: $data.length*pageNum,
							colNum:CIRCLE_LAYOUT_COLUMN_NUM,
							type:'circle'
						}

						galleryItem.populateCircleContent($(circleDiv), circleFeedDataArray[containerCount-1]);

						enableLazyloader();

	             	}
        	});
		 });
	             	
};
		//oc: give feedmagnet response to php to fetch only friend circles
		function getFriendCircleData(data){

		 	console.log("getFriendCircleData");
		 	var feedMagnetIds			= getIdsFromFeed(data);
		 	console.log(feedMagnetIds);
		 	//only get friend's circles if necessary.
		 	if(feedMagnetIds.length > 0){
		 		
			 	ored.postVars.friendIdsJSON	= JSON.stringify(getIdsFromFriends(friendProfileList));
			 	ored.postVars.feedIdsJSON	= JSON.stringify(feedMagnetIds);
			 	$.ajax({
	        		type: 'post',
	             	url: baseUrl + indexPage + 'circle/fetchFriendCircleData',
	             	dataType: 'json',
	             	data: ored.postVars,
	             	success: onFetchFriendCircleData
				});
		 	}else{
		 		enableLazyloader();
		 	}

		};//end getFriendCircleData

//oc: util getters/setters
		function getIdsFromFeed($feed){
			var ids = [];
			$($feed).each(function(i){

				var o 	= $feed[i];
				ids[i] 	= o.data.text;
				ored.cookieMonster.deleteCookieIfNecessary(ids[i]);
			});
			//oc: push ids from cookie if anything's there. 
			if($.cookie("circle")){
				//oc: push cookie circle ids onto the array
				ids.concat(ored.cookieMonster.getCircleCookie());
			} 
			return ids;
		};

		function getIdsFromFriends($list){
			console.log($list);
			var ids 	= [];
			$($list).each(function(i,v){
			
				ids[i] 	= v.id;
			});
			return ids;
		};



		function loadLayout(){

			if(!isMoreFeed) $('.gallery_layout').remove();

			switch(currentFilterType){
				case 'all':

				console.log("------------------Is More FEed??", isMoreFeed)
					morePhotoCount = 0;
					allPhotoData = [];
					
					(!isMoreFeed) ? getAllFeed() : getMoreAllFeed();


					
				break;

				case 'circle':
					if(!isMoreFeed){
						$.feed.get('bca-circle', parseCircleData, getCircleNum);
					}else{
						if(checkIfLoadMore(circleFeed, getCircleNum)) $.feed.more('bca-circle', parseCircleData, getCircleNum);
					}

				break;

				case 'friend':
					console.log("friends click.");
					if(!isLogin){	facebook.login(function(){
										if(!isMoreFeed){	$.feed.get('bca-circle', getFriendCircleData, ored.count);
										}else{				if(checkIfLoadMore(circleFriendFeed, getCircleNum)) $.feed.more('bca-circle', getFriendCircleData, ored.count);
										}
									});
					} else{
						if(!isMoreFeed){	$.feed.get('bca-circle', getFriendCircleData, ored.count);
						}else{
						if(checkIfLoadMore(circleFriendFeed, getCircleNum)) $.feed.more('bca-circle', getFriendCircleData, ored.count);
						}
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
console.log('createAllLayout');
			if(!circleEnd){
				$.ajax({
	        		type: 'get',
	            	url: baseUrl + indexPage + 'layout/loadLayout' + current_add_layout,
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
							enableLazyloader();
							$('body').trigger('ALL_LAYOUT_SINGLE_CREATED');

							updateGalleryHeight($(layout1).height());
							
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

	  			 				if(isMoreFeed)  enableLazyloader();
	  			 				$('body').trigger('ALL_LAYOUT_SINGLE_CREATED');

	  			 				updateGalleryHeight($(layout2).height() + 1200);

			             	}
			      		});
						
	             	}
	      		});

			}else{

				$.feed.more('bca-twitter', parseTwitterData, getPhotoNum);

			}

		}
		

		function createCircleLayout(){
			var circleLayout = $('<div>');
			circleLayout.addClass('layout_circle gallery_layout page' + pageNum)
						.appendTo(gallery_container);

			for(var i=0; i<2; i++){
				var row = $('<div>');
				row.addClass('row')
					.appendTo(circleLayout);

			}


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

			$(window).scrollTop(0);

			gallery_container = $('#feed_magnet');

			enableLazyloader();
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

			if($(window).width() >= 980 )
	  				$('#donate_area').fadeIn();
	  			else
	  				$('#donate_area').hide();

		},

		refreshAsFakeCircleData: function(data, isUpdateFriend){	
			var fakeDiv = $('.gallery_circle').get(0);
			galleryItem.populateCircleContent($(fakeDiv), data);

		},

		refreshAsFakePhotoData: function(data){	

			var fakeDiv = $('.photo_container').get(2);
			$(fakeDiv).css('background-color', '#333')

			var photoIcon = baseUrl + "img/icons/bca.png";          

        	var popupData = {
					type:'photo', 
					data:{
						id: data.id,
						source:'bca',
						content:data.description,
						photo_url:baseUrl + "uploads/" + data.file_name
					}}
        	var html = "<img class='full_photo' src='" + baseUrl + "uploads/" + data.file_name + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

			var contentData = {
				index:0,
				item:$(fakeDiv),
				totalNum:0,
				type:'photo',
				content:html,
				popupData:popupData,
				colNum:0
			}

			populatePhotoContent(contentData);

		},

		enableLazyloader: function(){
			enableLazyloader();
		},

		disableLazyloader: function(){
			$(window).unbind('scroll');
		},		

		showFriendCircles: function(){
			if(currentFilterType == "friend"){
				filterButtonSelected($('#filter_friends_btn'));
			}
		},

		showAllCircles: function(){
			filterButtonSelected($('#filter_all_btn'));
			
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