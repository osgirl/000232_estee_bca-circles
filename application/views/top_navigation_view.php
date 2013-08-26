<div class="navbar navbar-fixed-top">
        <div class="navbar-inner">
            <div id="top_nav" class="container">
                	
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <span class='top_sub_nav_item pull-right vertical_mode_show' style="margin-right:-8px;">
                	   <span class='top_user_name user_name_display' class='all_cap'></span>
						<a class='sign_in_btn'>
                            <span style="margin-top:1px" class='sign_in all_cap pink_text'>SIGN IN</span>
						  <span style="margin-left:5px;"><img src='<?php echo base_url(); ?>img/icons/facebook-large.png'/></span>
                        </a>
					</span>
					<span id="collapse_share_module" class='top_sub_nav_item pull-left vertical_mode_show'>
                    	<a href="#" style="margin-right:5px;" class='facebook_share_btn pull-left'><img src='<?php echo base_url(); ?>img/icons/facebook-large.png'/></a>
						<a href="#" class='twitter_share_btn pull-left'><img src='<?php echo base_url(); ?>img/icons/twitter-mid.png'/></a>
					</span>
					<span class="pull-left vertical_mode_show" style="margin:0px 6px 0 6px;"><img src='<?php echo base_url(); ?>img/assets/btn-divider.png' /></span>
					<span class='top_sub_nav_item pull-left vertical_mode_show'>
                        
                        <span class="language_toggle_btn dropdown">
                            <?php include('top_popup/language_dropdown_view.php');?>
                        </span>

                    </span>

                    <div class="nav-collapse collapse">
                        <ul id='top_main_nav' class="nav">
                            <li><a id="conversation_btn" href="#conversation" onclick="$('.popup#popup_circle .btn_close').trigger('click');" class='all_cap'>Conversation</a></li>
                            <li><a href="#video" onclick="return $.popup({type:'video'});" class='all_cap'>video</a></li>
                            <li><a href="https://donations.bcrfcure.org/sslpage.aspx?pid=298" target="_blank" class='all_cap'>donate</a></li>
                            <li><a href="#about" onclick="return $.popup({type:'about'});" class='all_cap'>about</a></li>
                        </ul>
                        <div id='top_sub_nav' class='pull-right'>
                            <span class='top_sub_nav_item'>
                            	<span class='top_user_name user_name_display' class='all_cap'></span>
								<a class='sign_in_btn'>
                                    <span class='sign_in all_cap pink_text' style="vertical-align:center;">SIGN IN</span>
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
                            	<span class='all_cap' style="vertical-align:center;">share</span>
                            	<a href="#" onclick="$.popup_share({type:'facebook'})" style="margin-top:-1px" class='facebook_share_btn'><img src='<?php echo base_url(); ?>img/icons/facebook.png'/></a>
								<a href="#" onclick="$.popup_share({type:'twitter'})" style="margin-top:-1px" class='twitter_share_btn'><img src='<?php echo base_url(); ?>img/icons/twitter.png'/></a>
							</span>
                        </div>
                        
                    </div><!--/.nav-collapse --> 

                    <?php include('top_popup/create_circle_view.php');?>

    </div>
    <?php include('top_popup/cancel_view.php');?>
    <?php include('top_popup/circle_confirm_view.php');?>
</div>

</div>