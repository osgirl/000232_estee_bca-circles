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

			$(window).resize(function(e){
				carouselItemWidth = $('#carousel_slider').width()/3;
				onDotSelected(0);

			})	


		    $('.featured_dot').unbind('mouseover').mouseover(function(e){$(e.currentTarget).css('cursor','pointer');})

		    $('.featured_dot').click(function(e){
		    	onDotSelected($(e.currentTarget).index())
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
	
	return Carousel;
}