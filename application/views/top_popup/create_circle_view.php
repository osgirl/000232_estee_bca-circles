
<div id="create_circle_screen">
	<div id="create_circle_header" class="all_cap light_font" language_id="create_your_own_circle" language_location="home" >Create your own circle of strength</div>
	
	<!--STEP 1-->
	<div id="create_circle_step1" class="create_circle_step header_pop_content">
		<div class="create_circle_content">
	    	<div class="steps" language_id="step_1_choose_an_action" language_location="home" >Step 1: Choose an action for your Circle</div>
	    	<h1 class="all_cap" language_id="how_will_you_fight" language_location="home" >how will you fight breast cancer this year?</h1>
	    	<div id="select_action">
	    		<div id="select_action_button" class="select_button">
	    			<div id="select_action_field" class="select_field select_action_text"><span id="goal_selected"><!-- Be proactive. Schedule a mammogram. --></span></div>
	    			<div class="select_icon"><img src="<?php echo base_url(); ?>img/assets/select-arrow.png"/></div>
	    		</div>
	    		<div id="select_goal_dropdown" class="select_dropdown select_action_text">
					<ul id="goal_dropdown_lists">
					</ul>
				</div>
			</div>
			<div class="steps"><span language_id="or" language_location="home" >Or</span> <span class="pink_text" language_id="create_your_own_action" language_location="home" >Create your own action!</span></div>
			<span id="pre_pop" language_id="we_will_text" language_location="home">We Will -</span>&nbsp;&nbsp;<input id="custom_action" autocomplete="off" type="text" maxlength="80" placeholder="ex: Be more active."></input>
		</div>
		<table class="btn_control">
			<tr>
			    <td class="button_left_wrapper"><a class='pink_btn pull_right cancel_create_circle_btn' language_id="cancel" language_location="home" >cancel</a></td>
				<td class="button_right_wrapper"><a id="next_step_btn" class='pink_btn pull-left' language_id="next_step" language_location="home" >next step</a></td>
			</tr>
		</table>
	</div>
	<!--STEP 1 END-->
	<!--STEP 2-->
	<div id="create_circle_step2" style="display:none" class="create_circle_step header_pop_content">
		<div class="create_circle_content">
			<div class="steps" language_id="step_2_add_your_friend" language_location="home" >Step 2: Add your friends. You may add up to 10 friends to your circle.</div>
	    	<div style="font-size:4em" class="all_cap friend_content"><span id="create_circle_user" class="pink_text"></span>,</div>
	    	<div style="margin-bottom:10px;" class="friend_content"><span id="friend_list" class="all_cap" language_id="add_friends" language_location="home" >take action against breast cancer by creating a circle of strength with </span>
	    		<span id="add_friend">
	    			<!--DO NOT DELETE THIS!! THIS IS FOR DETECTING THE WIDTH OF THE NAME-->
	    			<span id="temp_name_enter_container" class="all_cap"></span>
	    			<!--END-->
	    			<div id="add_friend_tool">
	        			<div id="friend_search_wrapper" data-toggle="tooltip" title="Please select at least 1 friend!">
	        				<input id="friend_search_field" data-toggle="tooltip" title="This friend already exists!" class="all_cap" type="text" autocomplete="off" placeholder="ENTER NAME"/>
	        				<a id="name_plus_btn"><img src="<?php echo base_url(); ?>img/buttons/plus-name-btn.png"></a>
	        			</div>
	        			<div id="choose_photos_wrapper">
	            			<span class="all_cap" language_id="or" language_location="home" ><b> or </b></span>
	            			<a id="choose_photos_btn" class="pink_btn all_cap" language_id="choose_by_photo" language_location="home" >choose by photo</a>
	        			</div>
	    			</div>
	    			
	    		</span>
	    	</div>
    	</div>
    	<table id="edit_friend_control" style="display:none" class="btn_control">
			<tr>
			    <td class="button_left_wrapper"><a class='pink_btn pull_right cancel_edit_friend_btn' language_id="cancel" language_location="home" >cancel</a></td>
				<td class="button_right_wrapper"><a id="edit_friend_done_btn" class='pink_btn pull-left' language_id="done" language_location="home" >done</a></td>
			</tr>
		</table>
		
		<table id="create_circle_control" class="btn_control">
			<tr>
			    <td class='tributton_left_wrapper'><a id="back_step_btn" class='pink_btn pull_right' language_id="back" language_location="home" >back</a></td>
			    <td class="tributton_mid_wrapper"><a class='pink_btn cancel_create_circle_btn' language_id="cancel" language_location="home" >cancel</a></td>
				<td class="tributton_right_wrapper"><a id="create_circle_btn" class='pink_btn pull-left' language_id="create_your_circle" language_location="home" >create your circle</a></td>
			</tr>
		</table>
		
	</div>

	<div id="friend_photos">
		<div class='h_divider_top'></div>
		<a id="close_friend_photos_btn"><img src="<?php echo base_url(); ?>img/buttons/delete-name-btn.png"/></a>
		<div id="friend_photos_container" class="container scroll-pane"></div>
	</div>

	<!--STEP 2 END-->
</div>
<!--CREATE CIRCLE SCREEN END-->