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

function Carousel()
{
	var Carousel = (function() {
	
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

		var carouselItemID;
		var carouselItemWidth;

		var featurePhotoData;

		var circleDataStorage = new Array();

		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------
		
		function onDotSelected(id){
			carouselItemID = id;
			carouselItemWidth = $('#carousel_slider').width()/3;
		    scrollCarousel();

	    	$('.featured_dot').each(function(i,v){
	    		if(i == carouselItemID) {
	    			$(v).removeClass('featured_deselected').addClass('featured_selected');
	    		}else{
	    			$(v).removeClass('featured_selected').addClass('featured_deselected');
	    		}
	    	})
		}

		function scrollCarousel(){
			console.log('scroll', carouselItemWidth*carouselItemID);

			$('#carousel_slider').stop(true).animate({
				left:-carouselItemWidth*carouselItemID
				}, 
				{
				duration: 600, 
				easing: 'easeInOutExpo'
			});
		}

		function getFeatureData(){
			featurePhotoData = new Array();			
			$.feed.featured(feedmagnet.circle_feat_feed, parseFeatureCircleData, 3);
			
		}

		function parseFeatureCircleData(data){
			var feed;

			$(data).each(function(i,v){
				feed = data[i].data;

				console.log("feature circle", feed)

				var circleDiv = $($('.carousel_item').get(i)).find('.feature_circle');

				$.ajax({
	        		type: 'post',
	            	url: baseUrl + indexPage + 'circle/fetchCircleData',
	            	dataType: 'json',
	            	data: {
	            		circle_id: feed.text
	            	},
	            	success: function(feedData) { 
	            		circleDataStorage.push(feedData);
						galleryItem.populateCircleContent($(circleDiv), feedData);
						galleryItem.enableShareButton($(circleDiv));
	             	}
	      		})
	      	});

	      	$.feed.featured(feedmagnet.photo_feat_feed, onPhotoFeedLoadComplete, 2);
		}

		function handleFeaturePhotoData(data){
			pushPhotoData(data);
			$.feed.featured(feedmagnet.instagram_feat_feed, handleFeatureInstagramData, 2);
		}

		function handleFeatureInstagramData(data){
			pushPhotoData(data);
			$.feed.featured(feedmagnet.twitter_feat_feed, handleFeatureTwitterData, 2);
		}

		function handleFeatureTwitterData(data){
			pushPhotoData(data);

			featurePhotoData.sort(function(a, b) {
			   return (a.data.timestamp > b.data.timestamp) ? 1 : -1;
			});
			//ored.masterFeed = ored.masterFeed.concat(featurePhotoData);
			//oc: need to load data.
			galleryItem.parseAllPhotoData(featurePhotoData, true, false);
		}

		//oc: this handles response from feedmagnet and retreives the data associated with each photo
		//		prior to the parse of the combining of all 3 feeds, this way, there is no asynchronous lapse.
		function onPhotoFeedLoadComplete($data){
			console.log("carousel:onPhotoFeedLoadComplete");

			var data 		= ored.getIdsFromFeed($data, "photo");
			ored.photoIds 	= ored.photoIds.concat(data);
			if($data != ''){
					$.ajax({
			        		type: 'post',
			            	url: baseUrl + indexPage + 'photo/fetchUploadedPhotoData',
			            	dataType: 'json',
			            	data: {
			            		feedIdsJSON: JSON.stringify(data)
			            	},
			            	success: function(data) { 
			            		console.log("photo data load complete"); 
			            		ored.photoData = ored.photoData.concat(data); 
			            		handleFeaturePhotoData( $data)
			            	}
			       });
			}
			else{
				handleFeaturePhotoData([]);
			}

		};//
		function pushPhotoData(data){
			if(data.length > 0){
				$(data).each(function (i, v){
					featurePhotoData.push(v);
				})
			}
		}

		function carouselSwipeHandler(e) {
			var cur_n = (carouselItemID == undefined) ? 0 : carouselItemID, 
				max_n = $('.featured_dot').length;
			if(e.type =='swipeleft'){
				cur_n ++;
				cur_n %= max_n;
			}
			else{
				cur_n --;
				if (cur_n < 0) cur_n = max_n-1;
			}
			onDotSelected(cur_n);
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
		
		initCarousel: function(){

			carouselItemWidth = $('#carousel_slider').width()/3;
			onDotSelected(0);


		    $('.featured_dot').click(function(e){
		    	onDotSelected($(e.currentTarget).index())
		    });

		    getFeatureData();


		    if(ismobile) $('#carousel_slider').on('swipeleft swiperight', carouselSwipeHandler);

		},

		windowResize: function(){
			carouselItemWidth = $('#carousel_slider').width()/3;
			onDotSelected(0);
		},

		refreshCircles: function(){

			$(".feature_circle").each(function(i,v){
				if(circleDataStorage[i]) galleryItem.populateCircleContent($(v), circleDataStorage[i]);
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
	
	return Carousel;
}