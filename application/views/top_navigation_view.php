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
						<div class='twitter_share_btn pull-left'><img src='<?php echo base_url(); ?>img/icons/twitter-mid.png'/></div>
					</div>
					<div class="pull-left vertical_mode_show" style="margin:0px 6px 0 6px;"><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></div>
					<div class='top_sub_nav_item pull-left vertical_mode_show'>
                        
                        <div class="dropdown pull-left">
                            <?php include('top_popup/language_dropdown_view.php');?>
                        </div>

                        <div class='flag pull-left'><img src='<?php echo base_url(); ?>img/flags/english.png' /></div>
                        <div class='language_arrow pull-left'><img src='<?php echo base_url(); ?>img/icons/language-arrow.png'/></div>
                    </div>
                    <div class="nav-collapse collapse">
                        <ul id='top_main_nav' class="nav">
                            <li><a id="conversation_btn" href="#conversation" class='all_cap'>Conversation</a></li>
                            <li><a href="#video" onclick="$.popup({type:'video'});" class='all_cap'>video</a></li>
                            <li><a href="#donate" class='all_cap'>donate</a></li>
                            <li><a href="#about" onclick="$.popup({type:'about'});" class='all_cap'>about</a></li>
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
	                                <?php include('top_popup/language_dropdown_view.php');?>
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

                    <div class="overlay"></div>

                    <?php include('top_popup/create_circle_view.php');?>

    </div>
    <?php include('top_popup/cancel_view.php');?>
    <?php include('top_popup/circle_confirm_view.php');?>
</div>

</div>