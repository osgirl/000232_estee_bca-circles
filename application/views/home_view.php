<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap.min.css">
        <!-- <link rel="stylesheet" href="<?php echo base_url(); ?>css/bootstrap-responsive.min.css"> -->
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
        
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/jquery.jscrollpane.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/videojs/video-js.css" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/videojs/video-bca-skin.css" type="text/css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/fancybox2/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main_smartphone.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main_tablet.css">

        <!-- This a css for popup window. You can merge this to main.css in final production -->
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/popup.css">

        <script src="<?php echo base_url(); ?>js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body>
    	
    	<!-- Add your site or application content here -->
       <div id="fb-root"></div>
		<script type="text/javascript">
		  // You probably don't want to use globals, but this is just example code
		  var fbAppId = '<?php echo config_item("fb_app_id"); ?>';
		  var baseUrl = '<?php echo base_url(); ?>';

		</script>
    	
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->
        
        <?php include('top_navigation_view.php');?>


        <div id="content_wrap" class="container">

            <!-- Main hero unit for a primary marketing message or call to action -->
                <div id='top_content'>
	             	<div class="row">
		                <div class="top_content_span span6">
		                    <div><img src='<?php echo base_url(); ?>img/pics/stronger-together.png'/></div>
		                </div>
		                <div class="top_content_span span6">
		                	<div class="row">
		                		<div id='featured_header' class="span6">
		                			<img class='pull_left' src='<?php echo base_url(); ?>img/headers/featured-header.png'/>
		                			<div class='pull_left'>
										<div class='featured_dot featured_selected'></div>
										<div class='featured_dot featured_deselected'></div>
										<div class='featured_dot featured_deselected'></div>
									</div>
		                		</div> 
		                    </div>
		                    <div id="carousel">
			                    <div id="carousel_slider">
			                    	<div class="carousel_item">
				                		<div class="top_content_sub_span4">
					                			<div class="feature_circle">
													<div class="circle_creator_area"><span class="feature_circle_creator"></span> created a</div>
													<div class="circle_of_strenth">Circle of Strength</div>
													<div class="circle_divider"></div>
													<div class="circle_area_wrapper">
														<div class="feature_circle_area">
															<img src="<?php echo base_url(); ?>img/assets/dotted-circle-small.png"/>
															<div class="feature_circle_goal"></div>
														</div>
													</div>
													<div class='share_circle'>
									                	<div class='all_cap'>share</div>
									                	<div class='circle_fb_share_btn facebook_share_btn'><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></div>
														<div class='circle_tw_share_btn twitter_share_btn'><img src='<?php echo base_url(); ?>img/icons/twitter.png'/></div>
													</div>
													<div class="circle_rollover item_rollover">
														<div class="rollover_content">
															<div class="view_circle_btn pink_btn all_cap">view</div>
															<div>Create your own Circle of Strength.<br/>Choose the <a >same goal</a> or <a>create a new one.</a></div>
														</div>
													</div>
													<div class="gallery_item_btn"></div>
												</div>

				                		</div>
				                		<div class="top_content_sub_span2">
				                			<a class="feature_photo_link"><div class="featured_instagram feature_photo"></div></a>
				                			<a class="feature_photo_link"><div class="featured_twitter feature_photo"></div></a>
				                		</div>
				                	</div>
				                	<div class="carousel_item">
				                		<div class="top_content_sub_span4 ">
				                			<div class="feature_circle">
													<div class="circle_creator_area"><span class="feature_circle_creator"></span> created a</div>
													<div class="circle_of_strenth">Circle of Strength</div>
													<div class="circle_divider"></div>
													<div class="circle_area_wrapper">
														<div class="feature_circle_area">
															<img src="<?php echo base_url(); ?>img/assets/dotted-circle-small.png"/>
															<div class="feature_circle_goal"></div>
														</div>
													</div>
													<div class='share_circle'>
									                	<div class='all_cap'>share</div>
									                	<div class='circle_fb_share_btn facebook_share_btn'><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></div>
														<div class='circle_tw_share_btn twitter_share_btn'><img src='<?php echo base_url(); ?>img/icons/twitter.png'/></div>
													</div>
													<div class="circle_rollover item_rollover">
														<div class="rollover_content">
															<div class="view_circle_btn pink_btn all_cap">view</div>
															<div>Create your own Circle of Strength.<br/>Choose the <a >same goal</a> or <a>create a new one.</a></div>
														</div>
													</div>
													<div class="gallery_item_btn"></div>
												</div>
				                		</div>
				                		<div class="top_content_sub_span2">
				                			<a class="feature_photo_link"><div class="featured_instagram feature_photo"></div></a>
				                			<a class="feature_photo_link"><div class="featured_twitter feature_photo"></div></a>
				                		</div>
				                	</div>
				                	<div class="carousel_item">
				                		<div class="top_content_sub_span4">
				                			<div class="feature_circle">
													<div class="circle_creator_area"><span class="feature_circle_creator"></span> created a</div>
													<div class="circle_of_strenth">Circle of Strength</div>
													<div class="circle_divider"></div>
													<div class="circle_area_wrapper">
														<div class="feature_circle_area">
															<img src="<?php echo base_url(); ?>img/assets/dotted-circle-small.png"/>
															<div class="feature_circle_goal"></div>
														</div>
													</div>
													<div class='share_circle'>
									                	<div class='all_cap'>share</div>
									                	<div class='circle_fb_share_btn facebook_share_btn'><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></div>
														<div class='circle_tw_share_btn twitter_share_btn'><img src='<?php echo base_url(); ?>img/icons/twitter.png'/></div>
													</div>
													<div class="circle_rollover item_rollover">
														<div class="rollover_content">
															<div class="view_circle_btn pink_btn all_cap">view</div>
															<div>Create your own Circle of Strength.<br/>Choose the <a >same goal</a> or <a>create a new one.</a></div>
														</div>
													</div>
													<div class="gallery_item_btn"></div>
												</div>
				                		</div>
				                		<div class="top_content_sub_span2">
				                			<a class="feature_photo_link"><div class="featured_instagram feature_photo"></div></a>
				                			<a class="feature_photo_link"><div class="featured_twitter feature_photo"></div></a>
				                		</div>
				                	</div>
			                	</div><!-- CAROUSEL SLIDER END-->
		                	</div><!-- CAROUSEL END-->
		                </div><!-- TOP CONTENT SPAN END-->
	                </div><!-- ROW END-->
	            </div><!-- TOP CONTENT END-->

	            <div id='bottom_content'>
	            	<div class='log_out_status'>
	            		<div class="row">
							<div id='join_conversation' class="span7">
								<div id='join_header'><img class='auto_resize' src='<?php echo base_url(); ?>img/headers/join-the-conversation.png'/></div>
								<div>
									<div id='join_text' class='light_font'>Show how you're fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with <b>#BCAstrength</b>.</div>
									<table class="btn_control">
										<tr>
										    <td class="button_left_wrapper"><div class='start_create_circle_btn pink_btn all_cap'>CREATE A CIRCLE</div></td>
											<td class="button_right_wrapper"><a onclick="$.popup({type:'photo_upload'});" class='upload_photo_btn pink_btn pull_left all_cap'>UPLOAD A PHOTO</a></td>
										</tr>
									</table>
								</div>
							</div>
							<div id='community' class='span5'>
								<h2>Trending Actions</h2>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'>219 People are</td>
									</tr>
									<tr><td class='community_line_2'>Jogging in the park Everyday In October</td></tr>
								</table>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'>219 People are</td>
									</tr>
									<tr><td class='community_line_2'>Walking Everyday In October</td></tr>
								</table>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'>219 People are</td>
									</tr>
									<tr><td class='community_line_2'>Walking Everyday In October</td></tr>
								</table>
							</div>
						</div>
					</div>
					<div class='log_in_status'>
						<div class="row">
							<div class="user_info span4">
								<div id='user_profile_pic'></div>
								<div id='user_profile_info'>
									<div id='bottom_user_name' class='user_name_display'></div>
									<div class='user_location_display'></div>
									<div id='user_circle_num'>Belongs to <span id='circle_num'>0 Circle</span></div>
									<div id='create_another_circle' class='start_create_circle_btn pink_btn all_cap light_font'>Create Another Circle</div>
								</div>
								
							</div>
							<div id="my_circles" class='user_stats span4'>
								<h2>My Circles</h2>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'><a href="">Estee Walk for Breast Cancer</a></td>
									</tr>
									<tr><td class='community_line_2'>5 Friends Talking Action</td></tr>
								</table>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'><a href="">Volunteer at my Local Hospital</a></td>
									</tr>
									<tr><td class='community_line_2'>7 Friends Talking Action</td></tr>
								</table>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'><a href="">Raise 1,000 dollars for BCRF</a></td>
									</tr>
									<tr><td class='community_line_2'>4 Friends Talking Action</td></tr>
								</table>
							</div>
							
							<div id="trending_actions" class='user_stats span4'>
								<h2>Trending Actions</h2>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'>219 People are</td>
									</tr>
									<tr><td class='community_line_2'>Walking Everyday In October</td></tr>
								</table>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'>219 People are</td>
									</tr>
									<tr><td class='community_line_2'>Walking Everyday In October</td></tr>
								</table>
								<table class='community_item'>
									<tr>
									    <td class='action_icon' rowspan="2"><img src='<?php echo base_url(); ?>img/icons/walking.png'/></td>
									    <td class='community_line_1 light_font'>219 People are</td>
									</tr>
									<tr><td class='community_line_2'>Walking Everyday In October</td></tr>
								</table>
							</div>
						</div>
					</div>  
	            </div>           
	            
	            <div id='gallery'>
					<div class='h_divider_top'></div>
					<div id="filter_nav">
						<div style="display:inline-block"><img src='<?php echo base_url(); ?>img/icons/filter.png'/></div>
						<div id="filter_all_btn" type="all" class="pink_btn pink_filter_btn all_cap">all</div>
						<div id="filter_circles_btn" type="circle" class="pink_btn pink_filter_btn all_cap">circles</div>
						<div id="filter_photos_btn" type="photo" class="pink_btn pink_filter_btn all_cap">photos</div>
						<div id="filter_instagram_btn" type="instagram" class="pink_btn pink_filter_btn blue_btn"><img src='<?php echo base_url(); ?>img/buttons/instagram.png'></div>
						<div id="filter_twitter_btn" type="twitter" class="pink_btn pink_filter_btn light_blue_btn"><img src='<?php echo base_url(); ?>img/buttons/twitter.png'></div>
						<div id="filter_friends_btn" type="friend" class="pink_btn pink_filter_btn all_cap">my friend's circles</div>
					</div>
					<div id="feed_magnet"> </div>
				</div>
				<div id='donate_area'>
					<div id='join_fight' class='span2 all_cap light_font span'>
						<div id='join_fight_text'>Join the fight<br /><span style='font-size:160%'>donate!</span></div>
						<div id='donate_btn' class='pink_btn'>DONATE NOW</div>
					</div>
					<div id='join_fight_content' class="span5">
						<p>Breast cancer affects 1 in 8 women in their lifetime. A donation of $50 raised by a Circle funds approximately one hour of lifesaving research through The Breast Cancer Research Foundation. Donate now and take us a step closer to eradicating this disease.</p>
					</div>
					<div id='watch_video' class="span5">
						<div><a  href="#video" onclick="$.popup({type:'video'});"><img src="<?php echo base_url(); ?>img/assets/video-thumb.png"/></a></div>
						<div id="watch_video_text" class='pink_text all_cap'>watch the<br/>bca video</div>
					</div>
					<div id="footer">
		                <div style='width:48%; float:left; border-right:#f38dab 1px solid; padding-right:1.5%'><a class='pink_text' href='#' target='blank'><div id='privacy_policy_btn'>Privacy Policy</div></a></div>
						<div style='width:49%; float:right; padding-left:1%'><a class='pink_text' href='#' target='blank'><div id='term_and_cons_btn'>Terms & Conditions</div></a></div>
		            </div>
				</div>
        </div> <!-- /container -->

        


        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="<?php echo base_url(); ?>js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
		<script>window.jQuery || document.write('<script src="<?php echo base_url(); ?>js/vendor/jquery.easing.1.3.js"><\/script>')</script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

		<script>

        	/********************************
			/* Init FeedMagnet SDK Code Start
			*********************************/
			var fm_server = 'estee.feedmagnet.com';
		     window.fm_ready = function(fx) {
		         if (typeof $FM !== 'undefined' && typeof $FM.ready === 'function') {
		             $FM.ready(fx);
		         } else {
		             window.setTimeout(function() { fm_ready.call(null, fx); }, 50);
		         }
		    };
		    var fmjs = document.createElement('script');
		    var p = ('https:' === document.location.protocol ? 'https://' : 'http://');
		    fmjs.src = p + fm_server + '/embed.js';
		    fmjs.setAttribute('async', 'true');
		    $('head').append(fmjs);
		    //document.documentElement.firstChild.appendChild(fmjs);

			/*******************************
			/* Init FeedMagnet SDK Code End
			********************************/

        </script>

		<script type="text/javascript" src="js/vendor/fancybox2/jquery.fancybox.pack.js?v=2.1.5"></script>
        <script src="<?php echo base_url(); ?>js/vendor/bootstrap.min.js"></script>
        <script src="<?php echo base_url(); ?>js/vendor/jquery.jscrollpane.min.js"></script>
        <script src="<?php echo base_url(); ?>js/vendor/masonry.pkgd.min.js"></script>
        <script src="<?php echo base_url(); ?>js/plugins.js"></script>
        <script src="<?php echo base_url(); ?>js/util/carousel.js"></script>
        <script src="<?php echo base_url(); ?>js/util/gallery.js"></script>
        <script src="<?php echo base_url(); ?>js/util/facebook.js"></script>
        <script src="<?php echo base_url(); ?>js/main.js"></script>
        

        <script>
            var _gaq=[['_setAccount','<?php echo GA_ACCOUNT; ?>'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>

    </body>
</html>
