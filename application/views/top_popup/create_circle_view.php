
<div id="create_circle_screen">
	<div id="create_circle_header" class="all_cap light_font">Create your own circle of strength</div>
	
	<!--STEP 1-->
	<div id="create_circle_step1" class="create_circle_step header_pop_content">
    	<div class="steps">Step 1: Choose an action for your Circle</div>
    	<h1 class="all_cap">how will you fight breast cancer this year?</h1>
    	<div id="select_action">
    		<div id="select_action_button" class="select_button">
    			<div id="select_action_field" class="select_field"><!-- Be proactive. Schedule a mammogram. --></div>
    			<div class="select_icon"><img src="<?php echo base_url(); ?>img/assets/select-arrow.png"/></div>
    		</div>
    		<div class="select_dropdown">
				<ul id="select_goal_dropdown">
<!-- 					<li class="goal_dropdown_list">Be proactive. Schedule a mammogram.</li>
					<li class="goal_dropdown_list">Volunteering at my local hospital.</li>
					<li class="goal_dropdown_list">Walking everyday in October.</li>
					<li class="goal_dropdown_list">Eating healthy.</li>
					<li class="goal_dropdown_list">Raising 1,000 dollars for BCRF.</li> -->
				</ul>
			</div>
		</div>
		<div class="steps">Or <span class="pink_text">Create your own action!</span></div>
		<input id="custom_action" autocomplete="off" type="text" placeholder="ex: Let's be more active."></input>
		<table class="btn_control">
			<tr>
			    <td class="button_left_wrapper"><div class='pink_btn pull_right cancel_create_circle_btn'>cancel</div></td>
				<td class="button_right_wrapper"><div id="next_step_btn" class='pink_btn pull-left'>next step</div></td>
			</tr>
		</table>
	</div>
	<!--STEP 1 END-->
	<!--STEP 2-->
	<div id="create_circle_step2" style="display:none" class="create_circle_step header_pop_content">
		<div class="steps">Step 2: Add your friends. You may add up to 10 friends to your circle.</div>
    	<div style="font-size:4em" class="all_cap friend_content"><span id="create_circle_user" class="pink_text"></span>,</div>
    	<div style="margin-bottom:10px;" class="friend_content"><span id="friend_list" class="all_cap">take action against breast cancer by creating a circle of strength with </span>
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
            			<span class="all_cap"><b> or </b></span>
            			<span id="choose_photos_btn" class="pink_btn all_cap">choose by photo</span>
        			</div>
    			</div>
    			
    		</span>
    	</div>
		
		<table class="btn_control">
			<tr>
			    <td class='tributton_left_wrapper'><div id="back_step_btn" class='pink_btn pull_right'>back</div></td>
			    <td class="tributton_mid_wrapper"><div class='pink_btn cancel_create_circle_btn'>cancel</div></td>
				<td class="tributton_right_wrapper"><div id="create_circle_btn" class='pink_btn pull-left'>create your circle</div></td>
			</tr>
		</table>
		
	</div>

	<div id="friend_photos">
		<div class='h_divider_top'></div>
		<div id="close_friend_photos_btn"><img src="<?php echo base_url(); ?>img/buttons/delete-name-btn.png"/></div>
		<div id="friend_photos_container" class="container scroll-pane"></div>
	</div>

	<!--STEP 2 END-->
</div>
<!--CREATE CIRCLE SCREEN END-->