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
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main_smartphone.css">
        <link rel="stylesheet" href="<?php echo base_url(); ?>css/main_tablet.css">

        <script src="<?php echo base_url(); ?>js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
    </head>
    <body>
    	
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
    	
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- This code is taken from http://twitter.github.com/bootstrap/examples/hero.html -->
        
        

        <div class="navbar navbar-fixed-top">
            <div class="navbar-inner">
                <div id="top_nav" class="container">
                	
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class='top_sub_nav_item pull-right vertical_mode_show' style="margin-right:-8px;">
                    	<div id='top_user_name' class='top_user_name user_name_display pull-left' class='all_cap'></div>
						<div id='sign_in_btn' class='sign_in_btn all_cap pink_text pull-left'>SIGN IN</div>
						<div class="pull-left"><img src='<?php echo base_url(); ?>img/icons/facebook-large.png'/></div>
					</div>
					<div id="collapse_share_module" class='top_sub_nav_item pull-left vertical_mode_show'>
                    	<div class='facebook_share_btn pull-left'><img src='<?php echo base_url(); ?>img/icons/facebook-large.png'/></div>
						<div class='twitter_share_btn pull-left'><img src='<?php echo base_url(); ?>img/icons/twitter-large.png'/></div>
					</div>
					<div class="pull-left vertical_mode_show" style="margin:0px 6px 0 6px;"><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></div>
					<div class='top_sub_nav_item pull-left vertical_mode_show'>
                        <div class="dropdown pull-left">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">ENG</a>
                            <ul class="dropdown-menu">
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;German</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Portuguese</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Traditional Chinese</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;French</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Greek</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Hungarian</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Italian</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Korean</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Spanish</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Arabic (read right to left)</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Hebrew (read right to left)</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Russian</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Spanish</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Turkish</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Non-US English</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Vietnamese</a></li>
                                <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Czech</a></li>
                            </ul>
                        </div>
                        <div class='flag pull-left'><img src='<?php echo base_url(); ?>img/flags/english.png' /></div>
                        <div class='language_arrow pull-left'><img src='<?php echo base_url(); ?>img/icons/language-arrow.png'/></div>
                    </div>
                    <div class="nav-collapse collapse">
                        <ul id='top_main_nav' class="nav">
                            <li><a href="#conversation" class='all_cap'>Conversation</a></li>
                            <li><a href="#video" class='all_cap'>video</a></li>
                            <li><a href="#donate" class='all_cap'>donate</a></li>
                            <li><a href="#about" class='all_cap'>about</a></li>
                        </ul>
                        <div id='top_sub_nav' class='pull-right'>
                            <div class='top_sub_nav_item'>
                            	<div id='top_user_name' class='top_user_name user_name_display' class='all_cap'></div>
								<div id='sign_in_btn' class='sign_in_btn all_cap pink_text'>SIGN IN</div>
								<div><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></div>
							</div>
							<div><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></div>
							<div class='top_sub_nav_item'>
	                            <div class="dropdown">
	                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">ENG</a>
	                                <ul class="dropdown-menu">
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;German</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Portuguese</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Traditional Chinese</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;French</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Greek</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Hungarian</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Italian</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Korean</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Spanish</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Arabic (read right to left)</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Hebrew (read right to left)</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Russian</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Spanish</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Turkish</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Non-US English</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Vietnamese</a></li>
	                                    <li><a href="#"><img src='<?php echo base_url(); ?>img/flags/english.png' />&nbsp;&nbsp;Czech</a></li>
	                                </ul>
	                            </div>
	                            <div class='flag'><img src='<?php echo base_url(); ?>img/flags/english.png' /></div>
	                            <div class='language_arrow'><img src='<?php echo base_url(); ?>img/icons/language-arrow.png'/></div>
                            </div>
                            <div><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></div>
                            <div class='top_sub_nav_item'>
                            	<div class='all_cap'>share</div>
                            	<div class='facebook_share_btn'><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></div>
								<div class='twitter_share_btn'><img src='<?php echo base_url(); ?>img/icons/twitter.png'/></div>
							</div>
                        </div>
                        
                    </div><!--/.nav-collapse -->
                </div>
            </div>
        </div>

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
									<div class='featured_dot'></div>
									<div class='featured_dot'></div>
									<div class='featured_dot'></div>
								</div>
	                		</div> 
	                    </div>
	                    <div class="row">
	                		<div class="top_content_sub_span4 span4">
	                			<div id="featured_circle"><img src='<?php echo base_url(); ?>img/pics/circle.png'/></div>
	                		</div>
	                		<div class="top_content_sub_span2 span2">
	                			<div id="featured_instagram" class="social_item"><img src='<?php echo base_url(); ?>img/pics/instagram.jpg'/></div>
	                			<div id="featured_twitter" class="social_item "></div>
	                		</div>
	                	</div>
	                	</div>
	                </div>
	            </div>

	            <div id='bottom_content'>
	            	<div class='log_out_status'>
	            		<div class="row">
							<div id='join_conversation' class="span7">
								<div id='join_header'><img class='auto_resize' src='<?php echo base_url(); ?>img/headers/join-the-conversation.png'/></div>
								<div>
									<div id='join_text' class='light_font'>Show how you're fighting breast cancer by creating a circle, uploading a photo, or tagging posts on Instagram and Twitter with <b>#BCAstrength</b>.</div>
									<div id='join_btns'>
										<div style='width:50%; float:left; text-align: right'><div class='create_circle_btn pink_btn all_cap'>CREATE A CIRCLE</div></div>
										<div style='width:50%; float:right; text-align: left'><div id='upload_photo_btn' class='pink_btn pull_left all_cap'>UPLOAD A PHOTO</div></div>
									</div>
								</div>
							</div>
							<div id='community' class='span5'>
								<h2>Community</h2>
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
									<div id='create_another_circle' class='create_circle_btn pink_btn all_cap light_font'>Create Another Circle</div>
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
					<div id='magnet_feed'></div>
					<div class='h_divider_bottom'></div>
				</div>
				
				<div id='donate_area' class="row">
					<div id='join_fight' class='span2 all_cap light_font span'>
						<div id='join_fight_text'>Join the fight<br /><span style='font-size:160%'>donate!</span></div>
						<div id='donate_btn' class='pink_btn'>DONATE NOW</div>
					</div>
					<div id='join_fight_content' class="span5">
						<h1 class='all_cap'>Nunc a euismod odio. Quisque</h1>
						<p>Fusce in quam eget sem interdum mattis nec ac quam. Aenean dictum elit ut elementum viverra. Ut mollis facilisis ante in consectetur.</p>
					</div>
					<div id='watch_video' class="span5">

					</div>
				</div>

	            <button onclick="doWallPost();">Do wall post</button>
            </div>
            

            <div id="footer">
                <div style='width:48%; float:left; border-right:#f38dab 1px solid; padding-right:1.5%'><a class='pink_text' href='#' target='blank'><div id='privacy_policy_btn'>Privacy Policy</div></a></div>
				<div style='width:49%; float:right; padding-left:1%'><a class='pink_text' href='#' target='blank'><div id='term_and_cons_btn'>Terms & Conditions</div></a></div>
            </div>

        </div> <!-- /container -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="<?php echo base_url(); ?>js/vendor/jquery-1.9.1.min.js"><\/script>')</script>

        <script src="<?php echo base_url(); ?>js/vendor/bootstrap.min.js"></script>

        <script src="<?php echo base_url(); ?>js/plugins.js"></script>
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
