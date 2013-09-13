<?php $cacheBuster = rand(); ?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if IE 9]>         <html class="no-js lte-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>BCA - We're Stronger Together</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=0"/> 

        <link rel="stylesheet" href="<?= base_url(); ?>css/bootstrap.min.css?cachebuster=<?= $cacheBuster; ?>">
        <!-- <link rel="stylesheet" href="<?= base_url(); ?>css/bootstrap-responsive.min.css?cachebuster=<?= $cacheBuster; ?>"> -->
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css?cachebuster=<?= $cacheBuster; ?>" />
        
        <link rel="stylesheet" href="<?= base_url(); ?>css/jquery.jscrollpane.css?cachebuster=<?= $cacheBuster; ?>">
        <link rel="stylesheet" href="<?= base_url(); ?>css/videojs/video-js.css?cachebuster=<?= $cacheBuster; ?>" type="text/css">
        <link rel="stylesheet" href="<?= base_url(); ?>css/videojs/video-bca-skin.css?cachebuster=<?= $cacheBuster; ?>" type="text/css">
        <link rel="stylesheet" href="<?= base_url(); ?>css/fancybox2/jquery.fancybox.css?cachebuster=<?= $cacheBuster; ?>?v=2.1.5" type="text/css" media="screen" />
        <link rel="stylesheet" href="<?= base_url(); ?>css/main.css?cachebuster=<?= $cacheBuster; ?>">
        <link rel="stylesheet" href="<?= base_url(); ?>css/main_smartphone.css?cachebuster=<?= $cacheBuster; ?>">
        <link rel="stylesheet" href="<?= base_url(); ?>css/main_tablet.css?cachebuster=<?= $cacheBuster; ?>">

        <!-- TEMP -->
        <link rel="stylesheet" href="<?= base_url(); ?>css/language_sean.css?cachebuster=<?= $cacheBuster; ?>">
        <link rel="stylesheet" href="<?= base_url(); ?>css/language_mili.css?cachebuster=<?= $cacheBuster; ?>">

        <!-- This a css for popup window. You can merge this to main.css?cachebuster=<?= $cacheBuster; ?> in final production -->
        <link rel="stylesheet" href="<?= base_url(); ?>css/popup.css?cachebuster=<?= $cacheBuster; ?>">

        <script src="<?= base_url(); ?>js/vendor/modernizr-2.6.2-respond-1.1.0.min.js?cachebuster=<?= $cacheBuster; ?>"></script>
    </head>

    <body>    	
       <div id="fb-root"></div>
		<script type="text/javascript">		

		  var fbAppId = '<?= config_item("fb_app_id"); ?>',
		  baseUrl = '<?= base_url(); ?>',
		  indexPage = '<?= index_page(); ?>',
		  selectedCountry = '<?= $this->config->item('country_abbr')?>',
		  selectedLanguage = '<?= $this->config->item('language_abbr')?>',
		  share_hashtag = '<?= SHARE_HASHTAG ?>';
		  if (indexPage !='') indexPage += '/';

		  var feedmagnet = {};
		  feedmagnet.circle_feed 		 = '<?= config_item("circle_feed_name"); ?>';
		  feedmagnet.circle_feat_feed  	 = '<?= config_item("circle_feed_feat_name"); ?>';
		  feedmagnet.photo_feed 		 = '<?= config_item("photo_feed_name"); ?>';
		  feedmagnet.photo_feat_feed	 = '<?= config_item("photo_feed_feat_name"); ?>';
		  feedmagnet.instagram_feed 	 = '<?= config_item("instagram_feed_name"); ?>';
		  feedmagnet.instagram_feat_feed = '<?= config_item("instagram_feed_feat_name"); ?>';
		  feedmagnet.twitter_feed 		 = '<?= config_item("twitter_feed_name"); ?>';
		  feedmagnet.twitter_feat_feed   = '<?= config_item("twitter_feed_feat_name"); ?>';

		  console.log(feedmagnet);
		</script>
    	
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <div id="main_page">

	        <?php $this->load->view('top_navigation_view');?>


	        <div id="content_wrap" class="container">
	        <div class="overlay"></div>
	                <div id='top_content'>
		             	<div class="row">
			                <div class="top_content_span span6">
			                    <div id="big_image"><img src='<?= base_url(); ?>img/pics/stronger-together.jpg'/>
				                    <div id="tagline">
				                    	<div language_id="we_are_stronger_together" language_location="home" class="stronger_together all_cap">we’re stronger<br /><span style="font-size:165%">together</span></div>
				                    	<div language_id="main_image_copy" language_location="home" class="copy_text">Together, take action in defeating breast cancer by inviting your friends to join your circle of strength. Show how you're fighting breast cancer by adding a photo, creating a circle, or tagging #BCAstrength.</div>
				                    </div>
			                    </div>
			                </div>
			                <div class="top_content_span span6">
			                	<div class="row">
			                		<div id='featured_header' class="span6">
			                			<div id="around_the_world" language_id="featured_around_world" language_location="home" class="all_cap">featured from around the world</div>
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
					                			<div class="feature_circle circle_container">
													<?php $this->load->view('layout/layout_circle.php');?>
												</div>
					                		</div>
					                		<div class="top_content_sub_span2">
					                			<div class="featured_instagram feature_photo"></div>
					                			<div class="featured_twitter feature_photo"></div>
					                		</div>
					                	</div>
					                	<div class="carousel_item">
					                		<div class="top_content_sub_span4 ">
					                			<div class="feature_circle circle_container">
													<?php $this->load->view('layout/layout_circle.php');?>
												</div>
					                		</div>
					                		<div class="top_content_sub_span2">
					                			<div class="featured_instagram feature_photo"></div>
					                			<div class="featured_twitter feature_photo"></div>
					                		</div>
					                	</div>
					                	<div class="carousel_item">
					                		<div class="top_content_sub_span4">
					                			<div class="feature_circle circle_container">
													<?php $this->load->view('layout/layout_circle.php');?>
												</div>
					                		</div>
					                		<div class="top_content_sub_span2">
					                			<div class="featured_instagram feature_photo"></div>
					                			<div class="featured_twitter feature_photo"></div>
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
									<div id='join_header' class="all_cap" language_id="join_the_conversation" language_location="home" >join the conversation</div>
									<div>
										<div id='join_text' class='light_font' language_id="join_the_conversation_copy" language_location="home" >Show how you're fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with <b>#BCAstrength</b>.</div>
										<table class="btn_control">
											<tr>
											    <td class="button_left_wrapper"><a class='start_create_circle_btn pink_btn all_cap' language_id="create_a_circle" language_location="home" >CREATE A CIRCLE</a></td>
												<td class="button_right_wrapper"><a onclick="return $.popup({type:'photo_upload'});" class='upload_photo_btn pink_btn pull_left all_cap' language_id="upload_a_photo" language_location="home" >UPLOAD A PHOTO</a></td>
											</tr>
										</table>
									</div>
								</div>
								<div id='trending_actions_1' class='span5'>
									<h2 language_id="trending_actions" language_location="home" >Trending Actions</h2>
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
										<a id='create_another_circle' class='start_create_circle_btn pink_btn all_cap light_font' language_id="create_a_circle" language_location="home" >Create a Circle</a><br />
										<a onclick="return $.popup({type:'photo_upload'});" id="log_in_upload_photo_btn" class='upload_photo_btn pink_btn pull_left all_cap' language_id="upload_a_photo" language_location="home" >UPLOAD A PHOTO</a>
									</div>
									
								</div>
								<div id="my_circles" class='user_stats span4'>
									<h2 language_id="my_circles" language_location="home" >My Circles</h2>
									<div id="my_circle_scroll" class="scroll-pane"></div>
								</div>
								
								<div id="trending_actions_2" class='user_stats span4'>
									<h2 language_id="trending_actions" language_location="home" >Trending Actions</h2>
								</div>
							</div>
						</div>  
		            </div>           
		            
		            <div id='gallery'>
						<div class='h_divider_top'></div>
						<div id="filter_nav">
							<div style="display:inline-block"><img src='<?= base_url(); ?>img/icons/filter.png'/></div>
							<a id="filter_all_btn" type="all" class="pink_btn pink_filter_btn all_cap" language_id="all" language_location="home" >all</a>
							<a id="filter_circles_btn" type="circle" class="pink_btn pink_filter_btn all_cap" language_id="circles" language_location="home" >circles</a>
							<a id="filter_photos_btn" type="photo" class="pink_btn pink_filter_btn all_cap" language_id="photos" language_location="home" >photos</a>
							<a id="filter_instagram_btn" type="instagram" class="pink_btn pink_filter_btn blue_btn"><img src='<?= base_url(); ?>img/buttons/instagram.png'></a>
							<a id="filter_twitter_btn" type="twitter" class="pink_btn pink_filter_btn light_blue_btn"><img src='<?= base_url(); ?>img/buttons/twitter.png'></a>
							<a id="filter_friends_btn" type="friend" class="pink_btn pink_filter_btn all_cap" language_id="my_friends_circle" language_location="home" >my friend's circle</a>
						</div>
						<div id="feed_magnet">
						</div>

					</div>
					
	        </div> <!-- /container -->

	        <div id='donate_area'>
	        	<div id="regular_footer" style="width:100%">
					<div id='join_fight' class='span2 all_cap light_font span'>
						<div id='join_fight_text'><span language_id="join_the_fight" language_location="home" >Join the fight</span><br /><span language_id="join_the_fight_donate_ex"  language_location="home" style='font-size:160%'>donate!</span></div>
						<a id="donate_pink_btn" class='pink_btn donate_btn' target="_blank" language_id="donate_now" language_location="home" >DONATE NOW</a>
					</div>
					<div id='join_fight_content' class="span5" language_id="footer_copy" language_location="home" >
						<p>Breast cancer affects 1 in 8 women in their lifetime. A donation of $50 raised by a Circle funds approximately one hour of lifesaving research through The Breast Cancer Research Foundation. Donate now and take us a step closer to eradicating this disease.</p>
					</div>
					<div id='watch_video' class="span5">
						<div><a  href="#video" onclick="return $.popup({type:'video'});"><img src="<?= base_url(); ?>img/assets/video-thumb.png"/></a></div>
						<div id="watch_video_text" class='pink_text all_cap' language_id="watch_bca_video" language_location="home" >watch the<br/>bca video</div>
					</div>
					<div id="footer">
		                <div style='width:48%; float:left; border-right:#f38dab 1px solid; padding-right:1.5%'> 
		                	<div class='pink_text cta' id='privacy_policy_btn' onclick="$.popup({type:'privacy_policy'});" language_id="privacy_policy" language_location="home" >Privacy Policy</div> 
		                </div>
						<div style='width:49%; float:right; padding-left:1%'>
							<div class='pink_text cta' id='term_and_cons_btn' onclick="$.popup({type:'terms_and_conditions'});" language_id="terms_and_conditions" language_location="home" >Terms & Conditions</div>
						</div>
		            </div>
	            </div>
	            <div id="load_more_btn_wrapper"><a id="load_more_btn" class="pink_btn all_cap" language_id="load_more" language_location="home" >load more</a></div>
			</div>	
		</div>

		<!-- Facebook --> 
        <script src='http://connect.facebook.net/en_US/all.js'></script>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js?cachebuster=<?= $cacheBuster; ?>"></script>        
        <script>window.jQuery || document.write('<script src="<?= base_url(); ?>js/vendor/jquery-1.9.1.min.js?cachebuster=<?= $cacheBuster; ?>"><\/script>')</script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js?cachebuster=<?= $cacheBuster; ?>"></script>

		<script src="<?= base_url(); ?>js/vendor/jquery.mobile.custom.min.js?cachebuster=<?= $cacheBuster; ?>"></script>
		<script src="<?= base_url(); ?>js/vendor/jquery.easing.1.3.js?cachebuster=<?= $cacheBuster; ?>"></script>
		<script src="<?= base_url(); ?>js/vendor/jquery.address-1.6.min.js?cachebuster=<?= $cacheBuster; ?>"></script>
		<script src="<?= base_url(); ?>js/vendor/ajaxfileupload.js?cachebuster=<?= $cacheBuster; ?>"></script>
		<script src="<?= base_url(); ?>js/vendor/fancybox2/jquery.fancybox.pack.js?cachebuster=<?= $cacheBuster; ?>&v=2.1.5"></script>
        <script src="<?= base_url(); ?>js/vendor/bootstrap.min.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/vendor/jquery.jscrollpane.min.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/vendor/jquery.mousewheel.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/vendor/masonry.pkgd.min.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/vendor/jquery.cookie.js"></script>
        <script src="<?= base_url(); ?>js/util/Translator.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/plugins.js?cachebuster=<?= $cacheBuster; ?>"></script> 
        <script src="<?= base_url(); ?>js/util/galleryItem.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/util/carousel.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/util/gallery.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/util/facebook.js?cachebuster=<?= $cacheBuster; ?>"></script>
        <script src="<?= base_url(); ?>js/main.js?cachebuster=<?= $cacheBuster; ?>"></script>

        <!--[if gt IE 8]>
			<link rel="stylesheet" type="text/css" href="<?= base_url(); ?>css/jquery.ie8-and-up.css?cachebuster=<?= $cacheBuster; ?>" />
		<![endif]-->

        <script>
            /*var _gaq=[['_setAccount','<?= GA_ACCOUNT; ?>'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));*/
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', '<?= GA_ACCOUNT; ?>');
			ga('send', 'pageview');
        </script>

    </body>

</html>
