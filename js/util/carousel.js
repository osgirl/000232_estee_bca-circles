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

		//--------------------------------------
		//+ PRIVATE & PROTECTED INSTANCE METHODS
		//--------------------------------------

		
		function onDotSelected(id){

			carouselItemID = id;
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

			$.feed.featured('bca-circle', parseFeatureCircleData, 3);
			
		}

		function parseFeatureCircleData(data){
			var feed;

			$(data).each(function(i){
				feed = data[i].data;

				var circleDiv = $($('.carousel_item').get(i)).find('.feature_circle');

				$.ajax({
	        		type: 'post',
	            	url: baseUrl + indexPage + 'circle/fetchCircleData',
	            	dataType: 'json',
	            	data: {
	            		circle_id: feed.text
	            	},
	            	success: function(feedData) { 

						galleryItem.populateCircleContent($(circleDiv), feedData);
						galleryItem.enableShareButton($(circleDiv));

	             	}
	      		})
	      	});

	      	$.feed.featured('bca-photo', handleFeaturePhotoData, 2);
			

		}

		function handleFeaturePhotoData(data){
			pushPhotoData(data);
			$.feed.featured('bca-instagram', handleFeatureInstagramData, 2);
		}

		function handleFeatureInstagramData(data){
			pushPhotoData(data);
			$.feed.featured('bca-twitter', handleFeatureTwitterData, 2);
		}

		function handleFeatureTwitterData(data){
			pushPhotoData(data);

			featurePhotoData.sort(function(a, b) {
			   return (a.data.timestamp > b.data.timestamp) ? 1 : -1;
			});


			galleryItem.parseAllPhotoData(featurePhotoData, true);
		}

		function pushPhotoData(data){
			if(data.length > 0){
				$(data).each(function (i, v){
					featurePhotoData.push(v);
				})
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
		
		initCarousel: function(){

			carouselItemWidth = $('#carousel_slider').width()/3;
			$('.language_menu_dropdown').css('left', (($(window).width() < 980) ? 0 : -200) + "px");

			$(window).resize(function(e){
				carouselItemWidth = $('#carousel_slider').width()/3;
				onDotSelected(0);

				$('.language_menu_dropdown').css('left', (($(window).width() < 980) ? 0 : -200) + "px");

				if($(window).width() >= 980 )
	  				$('#donate_area').fadeIn();
	  			else
	  				$('#donate_area').hide();
	  		

			})	

		    $('.featured_dot').click(function(e){
		    	onDotSelected($(e.currentTarget).index())
		    });

		    getFeatureData();
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