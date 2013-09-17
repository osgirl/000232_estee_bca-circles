<div id="top_navigation_view" class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div id="top_nav" class="container">
                	
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <span class='top_sub_nav_item pull-right vertical_mode_show' style="margin-right:5px;">
                	   <span class='top_user_name user_name_display' class='all_cap'></span>
						<a class='sign_in_btn'>
                            <span language_id="sign_in" style="margin-top:1px;" class='sign_in all_cap pink_text' language_location="home" >SIGN IN</span>
                        </a>
					</span>
					<span id="collapse_share_module" class='top_sub_nav_item pull-left vertical_mode_show'>
                    	<a href="#" onclick="$.popup_share({post_type:'page', url:'', type:'facebook', referral:'site'})" style="margin-right:5px;" class='facebook_share_btn pull-left'><img src='<?php echo base_url(); ?>img/icons/facebook-large.png'/></a>
						<a href="#" onclick="$.popup_share({post_type:'page', url:'', type:'twitter', referral:'site', hashtag_before_url:true})" class='twitter_share_btn pull-left'><img src='<?php echo base_url(); ?>img/icons/twitter-mid.png'/></a>
					</span>
					<span class="pull-left vertical_mode_show" style="margin:0px 6px 0 6px;"><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></span>
					<span id="mobile_language_dropdown" class='top_sub_nav_item pull-left vertical_mode_show'>
                        
                        <span class="language_toggle_btn dropdown">
                            <?php include('top_popup/language_dropdown_view.php');?>
                        </span>

                    </span>

                    <div class="nav-collapse collapse">
                        <ul id='top_main_nav' class="nav">
                            <li><a id="conversation_btn" language_id="conversation" language_location="home" href="#conversation" onclick="$('.popup#popup_circle .btn_close').trigger('click');" class='all_cap'>Conversation</a></li>
                            <li><a href="#video" language_id="video" language_location="home" onclick="return $.popup({type:'video'});" class='all_cap'>video</a></li>
                            <li><a href="https://donations.bcrfcure.org/sslpage.aspx?pid=298" language_id="donate" language_location="home" target="_blank" class='all_cap donate_btn' onclick="$.gaPageview(/donate/)">donate</a></li>
                            <li><a href="#about" language_id="about" language_location="home" onclick="return $.popup({type:'about'});" class='all_cap'>about</a></li>
                            <li><a id="PP_btn" language_id="privacy_policy" language_location="home" href="#privacy_policy" onclick="return $.popup({type:'privacy_policy'});" class='all_cap'>Privacy Policy</a></li>
                            <li><a id="TC_btn" language_id="terms_and_conditions" language_location="home" href="#terms_and_conditions" onclick="return $.popup({type:'terms_and_conditions'});" class='all_cap'>Terms & Conditions</a></li>
                        </ul>
                        <div id='top_sub_nav' class='pull-right'>
                            <span class='top_sub_nav_item'>
                                <span class='top_user_name user_name_display' class='all_cap'></span>
                                <a class='sign_in_btn'>
                                    <span language_id="sign_in" language_location="home" class='sign_in all_cap pink_text' style="vertical-align:center;">SIGN IN</span>
                                    <span><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></span>
                                </a>
                            </span>
                            <span class="language_divider"><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></span>
                            <span class='top_sub_nav_item'>
                                <span class="language_toggle_btn dropdown">
                                    <?php include('top_popup/language_dropdown_view.php');?>
                                </span>
                            </span>
                            <span class="language_divider"><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></span>
                            <span class='top_sub_nav_item'>
                                <span class='all_cap' style="vertical-align:center;" language_location="home" language_id="share" >share</span>
                                <a href="#" onclick="$.popup_share({post_type:'page', url:'', type:'facebook', referral:'site'})" style="margin-top:-1px" class='facebook_share_btn'><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></a>
                                <a href="#" onclick="$.popup_share({post_type:'page', url:'', type:'twitter', referral:'site', hashtag_before_url:true})" style="margin-top:-1px" class='twitter_share_btn'><img src='<?php echo base_url(); ?>img/icons/twitter.png'/></a>

                            </span>
                        </div>
                        
                    </div><!--/.nav-collapse --> 
                    <?php include('top_popup/create_circle_view.php');?>

            </div>
    <?php include('top_popup/cancel_view.php');?>
    <?php include('top_popup/circle_confirm_view.php');?>
</div>

</div>