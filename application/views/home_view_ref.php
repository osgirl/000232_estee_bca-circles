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
        <meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=0" />
		<!-- Bootstrap -->
		<link href="<?php echo base_url(); ?>css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="<?php echo base_url(); ?>css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="<?php echo base_url(); ?>css/normalize.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main_smartphone.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main_tablet.css">
        <script src="<?php echo base_url(); ?>js/vendor/modernizr-2.6.1.min.js"></script>
    </head>
    
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an outdated browser. <a href="http://browsehappy.com/">Upgrade your browser today</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to better experience this site.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
       <div id="fb-root"></div>
		<script type="text/javascript">
		  // You probably don't want to use globals, but this is just example code
		  var fbAppId = '307826036019777';

		  // This is boilerplate code that is used to initialize the Facebook
		  // JS SDK.  You would normally set your App ID in this code.
		
		  // Additional JS functions here
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : fbAppId,        // App ID
		      status     : true,           // check login status
		      cookie     : true,           // enable cookies to allow the server to access the session
		      xfbml      : true            // parse page for xfbml or html5 social plugins like login button below
		    });
		    
		    checkLoginStatus();
		
		    // Put additional init code here
		  };
		
		  // Load the SDK Asynchronously
		  (function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "//connect.facebook.net/en_US/all.js";
		     fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		</script>
		
		
		<div id='content_wrap' class='container'>
			<div id='top_nav'>
				<div id='top_main_nav'>
					<div class='all_cap'>CONVERSATION</div>
					<div class='all_cap'>VIDEO</div>
					<div class='all_cap'>DONATE</div>
					<div class='all_cap'>ABOUT</div>
				</div>
				<div id='top_sub_nav'>
					
					<div class='share_module'>
						<div id='twitter_share_btn'><img src='<?php echo base_url(); ?>img/icons/twitter.png'/></div>
						<div id='facebook_share_btn'><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></div>
						<div class='all_cap'>share</div>
					</div>
					<div><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></div>
					<div id='language_btn'>
						<div id='language_arrow'><img src='<?php echo base_url(); ?>img/icons/language-arrow.png'/></div>
						<div id='flag'><img src='<?php echo base_url(); ?>img/flags/english.png' /></div>
						<div id='language_name' class='all_cap'>ENG</div>
					</div>
					<div><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></div>
					<div id='name_log'>
						<div id='sign_in_btn' class='all_cap pink_text'>SIGN IN</div>
						<div id='top_user_name' class='user_name_display' class='all_cap'></div>
					</div>
					
				</div>
			</div>
			<div id='main_content'>
				<div id='top_main_content'>
					<div class='auto_resize'>
						<div id='main_image'>
							<img class='auto_resize' src='<?php echo base_url(); ?>img/pics/stronger-together.png'/>
						</div>
						<div id='main_feature'>
							<div id='featured_header'>
								<img style='margin-right:10px;' class='float_left' src='<?php echo base_url(); ?>img/headers/featured-header.png'/>
								<div id='featured_nav' class='float_left'>
									<div class='featured_dot float_left'></div>
									<div class='featured_dot float_left'></div>
									<div class='featured_dot float_left'></div>
								</div>
							</div>
							<div id='featured_content'>
								<div id='featured_circle' class='float_left'></div>
								<div id='featured_social' class='float_left'>
									<div id='featured_instagram'></div>
									<div id='featured_twitter'></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id='bottom_main_content'>
					<div class='log_out_status'>
						<div id='join_conversation'>
							<div id='join_header'><img class='auto_resize' src='<?php echo base_url(); ?>img/headers/join-the-conversation.png'/></div>
							<div id='join_text' class='light_font'>Show how you're fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with <b>#BCAstrength</b>.</div>
							<div id='join_btns'>
								<div style='width:50%; float:left;'><div class='create_circle_btn pink_btn float_right all_cap'>CREATE A CIRCLE</div></div>
								<div style='width:50%; float:right;'><div id='upload_photo_btn' class='pink_btn float_left all_cap'>UPLOAD A PHOTO</div></div>
							</div>
						</div>
						<div id='community' class='v_divider'>
							<h2>Community</h2>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='community_line_1 light_font'>219 People are</div>
									<div class='community_line_2'>Walking Everyday In October</div>
								</div>
							</div>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='community_line_1 light_font'>219 People are</div>
									<div class='community_line_2'>Walking Everyday In October</div>
								</div>
							</div>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='community_line_1 light_font'>219 People are</div>
									<div class='community_line_2'>Walking Everyday In October</div>
								</div>
							</div>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='community_line_1 light_font'>219 People are</div>
									<div class='community_line_2'>Walking Everyday In October</div>
								</div>
							</div>
						</div>
					</div>
					<div class='log_in_status'>
						<div id='user_profile'>
							<div id='user_profile_pic' class='float_left'></div>
							<div class='float_left'>
								<div id='bottom_user_name' class='user_name_display'></div>
								<div class='user_location_display'></div>
								<div id='user_circle_num'>Belongs to <span id='circle_num'>0 Circle</span></div>
								<div id='create_another_circle' class='create_circle_btn pink_btn all_cap light_font'>Create Another Circle</div>
							</div>
						</div>
						<div id='my_circles' class='v_divider'>
							<h2>My Circles</h2>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='circle_line_1 light_font pink_text'>Estee Walk for Breast Cancer</div>
									<div class='circle_line_2'>5 Friends Talking Action</div>
								</div>
							</div>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='circle_line_1 light_font pink_text'>Volunteer at my Local Hospital</div>
									<div class='circle_line_2'>7 Friends Talking Action</div>
								</div>
							</div>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='circle_line_1 light_font pink_text'>Raise 1,000 dollars for BCRF</div>
									<div class='circle_line_2'>4 Friends Talking Action</div>
								</div>
							</div>
						</div>
						<div id='trending_actions' class='v_divider'>
							<h2>Trending Actions</h2>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='community_line_1 light_font'>219 People are</div>
									<div class='community_line_2'>Walking Everyday In October</div>
								</div>
							</div>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='community_line_1 light_font'>219 People are</div>
									<div class='community_line_2'>Walking Everyday In October</div>
								</div>
							</div>
							<div class='community_item'>
								<div class='community_icon float_left'><img src='<?php echo base_url(); ?>img/icons/walking.png'/></div>
								<div>
									<div class='community_line_1 light_font'>219 People are</div>
									<div class='community_line_2'>Walking Everyday In October</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id='gallery'>
				<div class='h_divider_top'></div>
				<div id='magnet_feed'></div>
				<div class='h_divider_bottom'></div>
			</div>
			<div id='footer'>
				<div id='donate_area'>
					<div id='join_fight' class='all_cap light_font'>
						<div id='join_fight_text'>Join the fight<br /><span style='font-size:160%'>donate!</span></div>
						<div id='donate_btn' class='pink_btn'>DONATE NOW</div>
					</div>
					<div id='join_fight_content'>
						<h1 class='all_cap'>Nunc a euismod odio. Quisque</h1>
						<p>Fusce in quam eget sem interdum mattis nec ac quam. Aenean dictum elit ut elementum viverra. Ut mollis facilisis ante in consectetur.</p>
					</div>
				</div>
				<div id='privacy_policy'>
					<div style='width:48%; float:left; border-right:#f38dab 1px solid; padding-right:1.5%'><a class='pink_text' href='#' target='blank'><div id='privacy_policy_btn'>Privacy Policy</div></a></div>
					<div style='width:49%; float:right; padding-left:1%'><a class='pink_text' href='#' target='blank'><div id='term_and_cons_btn'>Terms & Conditions</div></a></div>
				</div>
			</div>
			
			<input id="name" type="text" value="John D."></input>
			<textarea id="content">Live healthily. Eat anti-oxidant rich food and maintain a healthy weight.</textarea>
			<select id="sel">
				<option value=3>3</option>
				<option value=4>4</option>
				<option value=5>5</option>
				<option value=6>6</option>
				<option value=7>7</option>
				<option value=8>8</option>
				<option value=9>9</option>
				<option value=10 selected>10</option>
				<option value=11>11 - null, will display empty dot</option>
				<option value=12>12 - unll, will display empty dot</option>
			</select>
			<br/>
			<br/>
			<button id="create">Create circle image</button>
			<br/>
			<img id="image"/>
			
			<div id='create_circle_screen' class='overlay'>
				
			</div>
		</div>
		
		<!--
		  Login Button - https://developers.facebook.com/docs/reference/plugins/login
		
		  This example needs the 'publish_actions' permission in order to publish an
		  action.  The scope parameter below is what prompts the user for that permission.
		-->
		
		<!-- <div
		  class="fb-login-button"
		  data-show-faces="true"
		  data-width="200"
		  data-max-rows="1"
		  data-scope="publish_actions">
		</div>
		<button id='show_friendlist_btn'>Show Friendlist</button>
		<div id='friendlist'></div>
		<div id='result'></div> -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.0.min.js"><\/script>')</script>
        <script type="text/javascript" src="<?php echo base_url(); ?>js/vendor/video.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>js/vendor/fancybox/jquery.easing-1.3.pack.js"></script>
        <script type="text/javascript" src="<?php echo base_url(); ?>js/vendor/fancybox/jquery.fancybox-1.3.4.js"></script>
        <script src="<?php echo base_url(); ?>js/plugins.js"></script>
        <script src="<?php echo base_url(); ?>js/vendor/bootstrap.min.js"></script>
        <script src="<?php echo base_url(); ?>js/util/facebook.js"></script>
        <script src="<?php echo base_url(); ?>js/main.js"></script>
        

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
