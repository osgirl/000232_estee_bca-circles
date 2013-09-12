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

		var oneCircle = false;
		var morePhotoCount = 0;
		var onePage = false;
		var circleEnd = false;

		var circleNum;
		var photoNum;
		var twitterNum;
		var instagramNum;

		var uploadedPhotoCount;

		var galleryHeight = 0;
		var feedEnd = false;

		var photoSum;
		var PHOTO_TOTAL = 12;
		var PHOTO_INITIAL_TOTAL = 8;
		var PHOTO_MORE_TOTAL = 4;
		var notEnoughPhoto = false;
		var restNum = 0;
		var subRestNum = 0;
		var restCount = 0;

		var restPhotoCount = 0;
		var restPhotoArray = new Array();
		



		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		function enableLazyloader(){
			//if($(window).width() >= 980){
				$(window).unbind('scroll').bind('scroll', lazyloader);
			//}
		}
		function lazyloader(){

			//console.log($(window).scrollTop() + $(window).height(), getDocHeight())

			console.log("HERE????", onePage)

				if(onePage){
					$('#donate_area').fadeIn();
	  				$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');
	  				return;
				}


				if($(window).scrollTop() + $(window).height() + 22  >= getDocHeight()) {

					//unlbind scroll event until all new content loaded to screen

					//load content

					console.log("reach bottom")

					$(window).unbind('scroll');

					if($(window).width() >= 980 ) {
						loadNextPage();
					}
					else{
						enableLazyloader();
						if(!feedEnd){
							$('#donate_area').fadeIn();
		  					$('#donate_area').addClass('footer_fixed').removeClass('footer_relative');
						}else{
							$('#donate_area').fadeOut();
		  					$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');
						}
						
					}
					
		  		}else if($(window).scrollTop() > SCROLL_TO_SHOW_FOOTER){

		  			$('#donate_area').fadeIn();
		  			$('#donate_area').addClass('footer_fixed').removeClass('footer_relative');
		  			

		  		}else if($(window).scrollTop() <= SCROLL_TO_SHOW_FOOTER){
		  			$('#donate_area').fadeOut();
		  			$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');

		  		}

		};

		function loadNextPage(){
			isMoreFeed = true;
			if(!circleEnd) pageNum++;

			loadLayout();
		
			console.log("PAGE PLUS", pageNum)

		}

		function loadLayout(){


			if(!isMoreFeed) $('.gallery_layout').remove();

			switch(currentFilterType){
				case 'all':

					if(!isMoreFeed) {
						getAllFeed();
						morePhotoCount = 0;
						allPhotoData = [];
					}else{
						if(photoLoaded){
							getMoreAllFeed();
							photoLoaded = false;
							morePhotoCount = 0;
							allPhotoData = [];
						}else{
							pageNum--;
							handleAllPhotoData(null);

						}
						
					}
					

				break;

				case 'circle':
					if(!isMoreFeed){
						createCircleLayout();
						$.feed.get(feedmagnet.circle_feed, parseCircleData, getCircleNum);
					}else{
						if(checkIfLoadMore(circleFeed, getCircleNum)) $.feed.more(feedmagnet.circle_feed, parseCircleData, getCircleNum);
					}

				break;

				case 'friend':
					console.log("friends click.");
					if(!isLogin){	facebook.login(function(){
										if(!isMoreFeed){	
											createCircleLayout();
											$.feed.get(feedmagnet.circle_feed, getFriendCircleData, ored.count);
										}else{				if(checkIfLoadMore(circleFriendFeed, getCircleNum)) $.feed.more(feedmagnet.circle_feed, getFriendCircleData, ored.count);
										}
									});
					} else{
						if(!isMoreFeed){	
							createCircleLayout();
							$.feed.get(feedmagnet.circle_feed, getFriendCircleData, ored.count);
						}else{
						if(checkIfLoadMore(circleFriendFeed, getCircleNum)) $.feed.more(feedmagnet.circle_feed, getFriendCircleData, ored.count);
						}
					}
				break;

				case 'photo':
					
					if(!isMoreFeed){
						createPhotoLayout();
						$.feed.get(feedmagnet.photo_feed, parsePhotoData, getPhotoNum);
					}else{

						if(checkIfLoadMore(photoFeed, getPhotoNum)) $.feed.more(feedmagnet.photo_feed, parsePhotoData, getPhotoNum);
					}
					
				break;

				case 'instagram':
					if(!isMoreFeed){
						createPhotoLayout();
						$.feed.get(feedmagnet.instagram_feed, parseInstagramData, getPhotoNum);
					}else{
						if(checkIfLoadMore(instagramFeed, getPhotoNum)) $.feed.more(feedmagnet.instagram_feed, parseInstagramData, getPhotoNum);
						
					}
				break;

				case 'twitter':
					if(!isMoreFeed){
						createPhotoLayout();
						$.feed.get(feedmagnet.twitter_feed, parseTwitterData, getPhotoNum);
					}else{
						if(checkIfLoadMore(twitterFeed, getPhotoNum)) $.feed.more(feedmagnet.twitter_feed, parseTwitterData, getPhotoNum);
						
					}
				break;
			}

		}

		//This event will fire after when layout changed. Save this for later use.
		//$container.masonry( 'on', 'layoutComplete', function( msnryInstance, laidOutItems ) { });


		function getMoreAllFeed(){

			morePhotoData = new Array();

			switch(current_add_layout){
				case 1:
					circleNum 		= 2;
					photoNum 		= 1;
					twitterNum 		= 2;
					instagramNum 	= 1;
				break;

				case 2:
					circleNum 		= 1;
					photoNum 		= 2;
					twitterNum 		= 1;
					instagramNum 	= 1;
				break;
			}

			 if(circleEnd) {
			 	circleNum       = 0;
			 	photoNum 		= 4;
			 	twitterNum 		= 4;
			 	instagramNum 	= 4;
			 	photoSum		= PHOTO_TOTAL;
			 }else{
			 	photoSum		= PHOTO_MORE_TOTAL;
			 }

			
			$.feed.more(feedmagnet.circle_feed, parseAllCircleData, circleNum);

		}

			//oc: prep feedmagnet array for db req
				//1. parse feedmagnet array deleting cookie if it matches
				//2. insert circle id from cookie (if its there)
				//3. req db circles with new array of circle ids
		function parseAllCircleData($data){

			console.log("parseAllCircleData");

			if($data.length == 0) {
				circleEnd = true;
				//enableLazyloader();
				//return;
				
			}else if($data.length > 0 && $data.length < circleNum){
				oneCircle = true;
				//console.debug("CIRCLE LEFT ONE", $data.length);
			}
			var data = ored.getIdsFromFeed($data, "circles");

			console.log("parseAllCircleData", circleEnd, oneCircle);



			createAllLayout();

			if(!circleEnd){
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


				});//end binding complete
			}

		};
		
		function onFetchAllCircles($circles){
			//console.log("onFetchAllCircles", $circles);

			$($circles).each(function(i,v){
				console.log("populate circle:",v.circle_id);
				var circleContainer = (isMoreFeed) ? $($($(".page"+pageNum).find('.gallery_circle')).get(i)) : $($('.gallery_circle').get(i));
				galleryItem.populateCircleContent(circleContainer, v);
	            
	            if(i == $circles.length - 1 )	{
	            	$('body').trigger('ALL_LAYOUT_CREATED');
	            }
	            
			});

			if(!isMoreFeed){				
				$.feed.get(feedmagnet.photo_feed, onPhotoFeedLoadComplete, photoNum);
		        $.feed.get(feedmagnet.instagram_feed, handleAllPhotoData, instagramNum);
		        $.feed.get(feedmagnet.twitter_feed, handleAllPhotoData, twitterNum);
			}else{
				$.feed.more(feedmagnet.photo_feed, onPhotoFeedLoadComplete, photoNum);
				$.feed.more(feedmagnet.instagram_feed, handleAllPhotoData, instagramNum);
				$.feed.more(feedmagnet.twitter_feed, handleAllPhotoData, twitterNum);
			}
		};


		function getAllFeed(){
			console.log("getAllFeed");
			allPhotoData = new Array();
			circleNum 		= 3;
			photoNum 		= 2;
			twitterNum 		= 3;
			instagramNum 	= 3;
			photoSum = PHOTO_INITIAL_TOTAL;
			$.feed.get(feedmagnet.circle_feed, parseAllCircleData, 3);
			
		}

		
		
/*   oc: 
this function handles the onComplete of the loading the list of cirle ID's from feedmagnet upon filter click
then requests a list of circles 
parse the circle data from feedmagnet and calls a route on our server to ccreates the markup from the list of 
*/



		function parseCircleData($data){
			console.log("parseCircleData");

			circleFeed = $data;
			if($data.length == 0){
				feedEnd = true; 
				return;
			} 
			

			if($data.length < getCircleNum) onePage = true;

			var data = ored.getIdsFromFeed($data, "circles");

			$.ajax({
		        		type: 'post',
		            	url: baseUrl + indexPage + 'circle/fetchAllCircles',
		            	dataType: 'json',
		            	data: {
		            		feedIdsJSON: JSON.stringify(data)
		            	},
		            	success: onFetchCircles
		      		});

		};

		function onFetchCircles($circles){
		console.log("onFetchCircles", $circles.length);

			$($circles).each(function(i,v){
        		$.ajax({
	        		type: 'get',
	            	url: baseUrl + indexPage + 'layout/loadLayoutCircle',
	            	dataType: 'html',
	            	success: function (layoutData){
	            		var circleDiv = $('<div>');
	            			circleDiv.append(layoutData)
	            			         .addClass('span6 circle_container gallery_item flex_margin_bottom gallery_circle');

	            		var rowTarget = (i<2) ? 0 : 1;
	            		console.log("onLoadLayoutCircle:",i, rowTarget);
	            		//$($($('.page' + pageNum).find('.row')).get(rowTarget)).append(circleDiv);
	            		$('.page1').append(circleDiv);

	            		$(circleDiv).css({'float':'left','clear':'none'})
	            			.hide()
	            			.fadeIn(200);

	            		var contentData = {
							index:i,
							item:$(circleDiv),
							totalNum:$circles.length*pageNum,
							colNum:CIRCLE_LAYOUT_COLUMN_NUM,
							type:'circle'
						}

						galleryItem.populateCircleContent($(circleDiv), v);
						if(contentData.index%2 == 0) updateGalleryHeight($(circleDiv).height()+50);
						
						if(i == $circles.length - 1) {
							$('body').trigger('ALL_LAYOUT_CREATED');
							enableLazyloader();
						}
						
						
					}
	      		});

	   		});//end each
		};


		function handleAllPhotoData(data){

			//oc: combine all 3 feeds into 1

				if(data && data.length != 0) {
					$(data).each(function (i, v){

						console.debug( v.data.channel + ' - ' + v.data.text );
						allPhotoData.push(v);
					})
				}
				
					morePhotoCount++;

					//oc: only call when we have all 3 feeds.
					 if(morePhotoCount == 3){
				 	
					 	sortByTimestamp(allPhotoData);

					 	console.info("all photo data", allPhotoData)

					 	//if(allPhotoData.length >= photoSum ){
					 		notEnoughPhoto = false;
			 				ored.masterFeed = allPhotoData;
							galleryItem.parseAllPhotoData(allPhotoData, false, circleEnd);
							enableLazyloader();
	
						//}

						 // else{

						 // 	notEnoughPhoto = true;
						 // 	morePhotoCount--;

						 // 	console.info("hmmm", photoSum, allPhotoData.length)

						 // 	restNum = photoSum - allPhotoData.length;

						 // 	$.feed.more(feedmagnet.photo_feed, onPhotoFeedLoadComplete, photoNum);

						 // }
					 }	
			
		};
		

		//oc: this handles response from feedmagnet and retreives the data associated with each photo
		//		prior to the parse of the combining of all 3 feeds, this way, there is no asynchronous lapse.
		function onPhotoFeedLoadComplete($data){

			if(notEnoughPhoto) {

				//lookForRestPhotos();


				console.info("NOT ENOUGH everything", $data.length, restNum);

				if($data.length < restNum){
					subRestNum = restNum - $data.length;

					console.info("NOT ENOUGH PHOTO, instagram help!!", subRestNum);
					$.feed.more(feedmagnet.instagram_feed, function(inData){

						
						if(inData.length < subRestNum ){

							console.info("not enough instagram, twitter help!!", inData.length, subRestNum);
							 var subSubRestNum = subRestNum - inData.length;
							 $.feed.more(feedmagnet.twitter_feed, function(twitterData){


							 	if(twitterData.length < subSubRestNum ) {

							 		console.info("not enough twitter go back to photos", twitterData.length, subSubRestNum);
							 		onePage = true;
							 		enableLazyloader();
							 	}else{

							 		handleAllPhotoData(twitterData);
							 	}

							 }, subSubRestNum);
						}else{
							handleAllPhotoData(inData);
						}
						

						

					}, subRestNum);
				}else{

					console.info("HANDLE ALL PHOTO DATA", $data.length, $data)
					handleAllPhotoData($data);
				}
				
				
			}else{
				
				console.debug('Strait from FM :', $data);
				ored.photoFeed 	= $data;
				console.debug('ored.photoFeed :', ored.photoFeed);

				var data 		= ored.getIdsFromFeed($data, "photo");
				ored.photoIds 	= ored.photoIds.concat(data);
				ored.photoIds = data;
				if(!isMoreFeed && !circleEnd) ored.addCookiePhotosToFeed();
				loadPhotoData(data, onPhotoDataLoadComplete);

			}


		};

		function lookForRestPhotos(){
			restPhotoCount = 0;
			//$.feed.more(feedmagnet.photo_feed, checkRestPhotos, 1);
			
		}

		function checkRestPhotos(data){
			//restPhotoCount++;

			console.info("photo GET", data)

			if(data.length!=0) handleAllPhotoData(data);

			// if(data.length!=0) restPhotoArray.push(data);

			// if(restPhotoCount == 3){

			// 	if(restPhotoArray.length >= PHOTO_MORE_TOTAL){
			// 		// $(restPhotoArray).each(function(i,v){
			// 		// 	handleAllPhotoData(v);	
			// 		// })
					
			// 	}else if(restPhotoArray.length == 0){
			// 		onePage = true;
			// 		enableLazyloader();
			// 	}else{
			// 		lookForRestPhotos();
			// 	}
			// }
			
		}

		function checkRestInstagram(data){

			console.info("instagram GET", data)

			if(data.length!=0) handleAllPhotoData(data);
			
		}

		function checkRestTwitter(data){
			//restPhotoCount++;

			console.info("twitter GET", data)

			if(data.length!=0) handleAllPhotoData(data);

			// if(data.length!=0) restPhotoArray.push(data);

			// if(restPhotoCount == 3){

			// 	if(restPhotoArray.length >= PHOTO_MORE_TOTAL){
			// 		// $(restPhotoArray).each(function(i,v){
			// 		// 	handleAllPhotoData(v);	
			// 		// })
					
			// 	}else if(restPhotoArray.length == 0){
			// 		onePage = true;
			// 		enableLazyloader();
			// 	}else{
			// 		lookForRestPhotos();
			// 	}
			// }
			
		}


		function loadPhotoData($data, $onComplete){
			console.debug("LOAD PHOTO DATA", $data)

				if($data != ''){
					$.ajax({
			        		type: 'post',
			            	url: baseUrl + indexPage + 'photo/fetchUploadedPhotoData',
			            	dataType: 'json',
			            	data: {
			            		feedIdsJSON: JSON.stringify($data)
			            	},
			            	success: $onComplete,
			            	error:function(x,e,r){
			            		//console.debug(x,e,r);
			            	}
			       });
				}
				else{
					//console.debug('error - no more data to load');

					handleAllPhotoData([]);
				}
		};

		function onPhotoDataLoadComplete(data){

			ored.photoData = ored.photoData.concat(data); 



			handleAllPhotoData( ored.photoFeed);


		};

		

		function sortByTimestamp(dataArray){
			//oc: sort by timestamp
				dataArray.sort(function compare(a,b) {
					  if (a.data.timestamp > b.data.timestamp)
					     return -1;
					  if (a.data.timestamp < b.data.timestamp)
					    return 1;
					  return 0;
				});
		}

		function parsePhotoData($data){
			
			//console.log("parsePhotoData");
			//console.log($data);
			feed = $data;

			if($data.length == 0) {
				feedEnd = true;
				return;
			}
			
			
			var data 		= ored.getIdsFromFeed($data, "photo");
			photoFeed = data;

			if(data.length < 21) onePage = true;


			loadPhotoData(data, getPhotoData);

		};

		function getPhotoData($data){

			//console.debug("GET PHOTO DATA?", $data.length)

			$($data).each(function(i,v){
				
        		var photoIcon = baseUrl + "img/icons/bca.png";          
            	var popupData = {
					type:'photo', 
					data:{
							id: v.photo_id,
							source:'bca',
							content: v.description,
							photo_url:baseUrl + "uploads/" + v.filename
						}
					};

				var html = "<img class='full_photo' src='" + baseUrl + "uploads/" + v.filename + "'/><img class='photo_icon' src='" + photoIcon + "'/>" + photoButtonHtml;

				var contentData = {
					index:uploadedPhotoCount,
					item:photoDiv(uploadedPhotoCount),
					totalNum:$data.length*pageNum,
					type:'photo',
					content:html,
					popupData:popupData,
					colNum:PHOTO_LAYOUT_COLUMN_NUM
				}

				populatePhotoContent(contentData);
				if(i == $data.length - 1) enableLazyloader();

			});

			$('body').trigger("ALL_LAYOUT_CREATED");
		}


		function parseInstagramData(data){

			instagramFeed = data;
			uploadedPhotoCount = 0;

			if(data.length == 0) {
				feedEnd = true;
				return;
			}

			//createPhotoLayout();

			if(data.length < 21) onePage = true;

			var feed;

			$(data).each(function(i, v){
				feed = v.data;
				getInstagramData(data, feed);

				if(i == data.length - 1) enableLazyloader();

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

				
		}

		function parseTwitterData(data){

			twitterFeed = data;
			uploadedPhotoCount = 0;

			if(data.length == 0) {
				feedEnd = true;
				return;
			}

			//createPhotoLayout();

			if(data.length < 21) onePage = true;


			var feed;

			$(data).each(function(i, v){
				feed = data[i].data;
				
				getTwitterData(data, feed);

				if(i == data.length - 1) enableLazyloader();

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

				//enableLazyloader();
		}

		function populatePhotoContent(contentData){
			if(contentData.type == "twitter")
				contentData.item.css('background', '#2caae1');

			contentData.item.html(contentData.content);
			contentData.item.attr('type', contentData.type);
			contentData.item.hide();
			contentData.item.fadeIn(200);

			if(contentData.index%4 == 1) updateGalleryHeight(contentData.item.height()+50);
			
			galleryItem.enableItemButton(contentData.item, contentData.popupData);
			setTimeout(function(){
				galleryItem.centerRollOverContent(.55);
			}, 200);

			translator.translateSingleItem("view");
		}

		//Helpers
		function getDocHeight() {
			var D = document;
			return Math.max(
				Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
				Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
				Math.max(D.body.clientHeight, D.documentElement.clientHeight)
			);
		};

		function updateGalleryHeight(height){

			galleryHeight += height;

		}

		function initFilterButtons(){
			$(".pink_filter_btn").each(function(index, value){
		
				$(value).unbind("click").click(function(e){
					filterButtonSelected($(value));
				});
			})

			$('#load_more_btn').unbind("click").click(function(e){
				loadNextPage();
			});
		};

		function createCirclesFromORedCircles(){
			$data = ored.friendsCircles;	
		};

		function filterButtonSelected(btn){

			morePhotoCount = 0;

			isMoreFeed = false;
			feedEnd = false;
			onePage = false;
			oneCircle = false;
			circleEnd = false;
			notEnoughPhoto = false;
			restNum = 0;
			subRestNum = 0;
			restCount = 0;
			pageNum = 1;
			current_add_layout = 1;
			$.feed.reset();
			currentFilterType = btn.attr('type');
			if(currentFilterType == "all") pageNum = 2;

			enableLazyloader();
			$('#donate_area').show();
			$('#donate_area').removeClass('footer_fixed').addClass('footer_relative');

			galleryHeight = 0;
			
			loadLayout();
		}


		//oc: give feedmagnet response to php to fetch only friend circles
		function getFriendCircleData(data){

			if(data.length == 0) {
				feedEnd = true;
				return
			}

		 	//console.log("getFriendCircleData");
		 	var feedMagnetIds			= ored.getIdsFromFeed(data, "circles");
		 	//console.log(feedMagnetIds);
		 	//only get friend's circles if necessary.
		 	if(feedMagnetIds.length > 0){
		 		
			 	ored.postVars.friendIdsJSON	= JSON.stringify(ored.getIdsFromFriends(friendProfileList));
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

		function onFetchFriendCircleData($data){
			//console.log("onFetchFriendCircleData");

					//createCircleLayout();

					if($data.length < getCircleNum) onePage = true;
					
					circleFriendFeed 		= $data;

					var containerCount 		= 0;
					var circleFeedDataArray = new Array();

				 	$($data).each(function(i, v){	
					 	
				  	 	var feed 				= $data[i];
		         		circleFeedDataArray.push(feed);

		        		$.ajax({
			        		type: 'get',
			            	url: baseUrl + 'layout/loadLayoutCircle',
			            	dataType: 'html',
			            	
			            	success: function(layoutData) {  
			            		
			            		var circleDiv = $('<div>');
			            			circleDiv.append(layoutData)
			            			         .addClass('span6 circle_container gallery_item flex_margin_bottom gallery_circle');
			            		//var rowTarget = (containerCount<2) ? 0 : 1;
						            		$('.page' + pageNum).append(circleDiv);
			            		$(circleDiv).css('float','left');
			            		$(circleDiv).css('clear','none');
			            		$(circleDiv).hide();
			            		$(circleDiv).fadeIn(200);

			            		containerCount++;

			            		var contentData = {
									index:containerCount,
									item:$(circleDiv),
									totalNum: $data.length*pageNum,
									colNum:CIRCLE_LAYOUT_COLUMN_NUM,
									type:'circle'
								}

								galleryItem.populateCircleContent($(circleDiv), circleFeedDataArray[containerCount-1]);

								if(contentData.index%2 == 0) updateGalleryHeight($(circleDiv).height()+50);

								if(i == $data.length - 1) enableLazyloader();

			             	}
		        	});
				 });
			             	
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
		};
		

		function createAllLayout(data){
			//console.log('createAllLayout');
			if(!circleEnd){
				if(oneCircle){

					$.ajax({
			        		type: 'get',
			            	url: baseUrl + 'layout/loadLayout3',
			            	dataType: 'html',
			            	
			            	success: function(layout3data) {  
			            		current_add_layout = 2;
				            	var layout3 = $('<div>');     
				            	layout3.addClass('layout3 gallery_layout row')
		            				.html(layout3data); 

		            			$(layout3).appendTo(gallery_container);

								$(layout3).addClass('page'+pageNum);
								galleryItem.centerRollOverContent(.55);

	  			 				if(isMoreFeed)  enableLazyloader();
	  			 				$('body').trigger('ALL_LAYOUT_SINGLE_CREATED');


			             	}
			      		});

				}else{

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
				            	layout2.addClass('gallery_layout row layout2')
		            				.html(layout2data); 

		            			$(layout2).appendTo(gallery_container);

								$(layout2).addClass('page2');
								galleryItem.centerRollOverContent(.55);

	  			 				if(isMoreFeed)  enableLazyloader();
	  			 				$('body').trigger('ALL_LAYOUT_SINGLE_CREATED');

			             	}
			      		});
	             	}
	      		});

				}

			}else{

				createPhotoLayout();
				allPhotoData = new Array();
				morePhotoCount = 0;
				photoSum = PHOTO_TOTAL;
				var eachPart = photoSum/3;

				$.feed.more(feedmagnet.photo_feed, onPhotoFeedLoadComplete, eachPart);
				$.feed.more(feedmagnet.instagram_feed, handleAllPhotoData, eachPart);
				$.feed.more(feedmagnet.twitter_feed, handleAllPhotoData, eachPart);
			}

		}


		function createCircleLayout(){
			var circleLayout = $('<div>');
			circleLayout.addClass('layout_circle gallery_layout page' + pageNum)
						.appendTo(gallery_container);
		};

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
				div.appendTo('.page1');

				div.hide();
				div.fadeIn(200);
			}

			return div;
			
		};

		function createPhotoLayout(){
			//console.log('createPhotoLayout');

			if(restCount >= 1) return;

			var photoLayout = $('<div>');
			photoLayout.addClass('layout_photo gallery_layout page' + pageNum)
						.appendTo(gallery_container);

			if(circleEnd) restCount++;


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

			enableLazyloader();
			gallery_container.masonry();

			galleryItem.centerRollOverContent();
			$('.gallery_item').hide();

			initFilterButtons();
			loadLayout();

			if(currentFilterType == "all") {
				pageNum = 2;
				// $('#gallery').height(DEFAULT_GALLERY_HEIGHT);
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
//console.log("refreshAsFakePhotoData");
			var divPos = (currentFilterType == "all") ? 2 : 0;
			var fakeDiv = $('.photo_container').get(divPos);
			
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
			if(currentFilterType == "friend") filterButtonSelected($('#filter_friends_btn'));
		},

		showAllCircles: function(){
			if(currentFilterType == "friend") filterButtonSelected($('#filter_all_btn'));
			
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