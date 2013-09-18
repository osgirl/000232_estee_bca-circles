<div class="popup" id="popup_photo_upload">
	<div id="popup_photo_upload_agreement_window">
		<h2 language_id="by_submit_img_agree" language_location="upload_photo" >BY SUBMITTING IMAGES, YOU AGREE THAT:</h2>
		<ul>
			<li language_id="image_format_must_be" language_location="upload_photo" >Image must be in BMP, PNG, GIF, or JPEG Format</li>
			<li language_id="file_size_5mb" language_location="upload_photo" >File size must be 5 MB or less</li>
			<li language_id="you_are_photographer_or_have_permission" language_location="upload_photo" >You are the photographer or you have the photographer’s permission</li>
			<li language_id="you_are_only_person_in_photo" language_location="upload_photo" >You are the only person in the photo or you have permission from every one in the photo</li>
			<li language_id="uploaded_image_may_used_by_bca" language_location="upload_photo" >Uploaded images may be used by the Breast Cancer Awareness Campaign on the internet and in other media</li>		
			<li language_id="you_agree_to_terms_conditions" language_location="upload_photo" >You agree to our terms and conditions</li>
		</ul>

		<p class="opt_copy" language_id="opt_copy" language_location="upload_photo" >By providing my information, I acknowledge that I have read, understand and agree to the <a class="link terms" href="#">Terms and Conditions</a> and <a class="link privacy" href="#">Privacy Policy.</a> I agree any personal information that I may provide here will be processed in accordance with the Privacy Policy [hyperlink] and transferred to the United States and I hereby give my consent to such processing and transfer.</p>

		<span id="popup_checkbox"></span><span language_id="yes_i_agree" language_location="upload_photo" >Yes, I undestand and agree</span>
		<div id="button_wrapper">
			<div class="popup_round_button btn_cancel" id="popup_btn_white" language_id="cancel" language_location="upload_photo" >CANCEL</div>
			<div class="popup_round_button btn_next dim" id="popup_btn_white" language_id="okay" language_location="upload_photo" >OKAY</div>
		</div>
	</div>
	<div id="popup_photo_upload_preview_window">
		<h2 language_id="we_are_stronger_together_upload_photo" language_location="upload_photo" >WE'RE STRONGER TOGETHER</h2>
		<div id="popup_photo_img_holder">
			<div id="message">
				<img src="<?= base_url(); ?>img/popups/icons/ico_photo_upload-preview.png"/>
				<p language_id="who_makes_you_stronger" language_location="upload_photo" >Who makes you stronger? Upload a photo to show us your Circle of Strength.</p>
			</div>
			<div class="btn_rotate"></div>
			<div id ="holder">
			</div>
			<span id="anim_loading"></span>
		</div>
		<div id="popup_photo_desc_holder">
			<textarea class="greyfont" language_id="add_a_short_desc" language_location="upload_photo" >Add a short description</textarea>
		</div>		
		<form id="file_form" name='form' method='POST' enctype='multipart/form-data'>
			<input type="hidden" id="circle_id" name="circle_id" value="<? echo $circle_id?>">
			<input type="hidden" id="users_fb_id" name="users_fb_id" value="<? echo $users_fb_id?>">
			<div id="button_wrapper">
				<input name="uploadFile" type="file" class="hidden" id="uploadFile"/>				
				<div class="popup_round_button btn_browse" id="popup_btn_pink" language_id="browse" language_location="upload_photo" >BROWSE</div>
				<div class="popup_round_button btn_cancel" id="popup_btn_pink" language_id="cancel" language_location="upload_photo" >CANCEL</div>
				<div class="popup_round_button btn_submit dim" id="popup_btn_pink" language_id="submit" language_location="upload_photo" >SUBMIT</div>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	translator.translateItems("upload_photo");
	translator.defineOptItems();

	$('#popup_photo_upload').init_upload();
	$('#popup_photo_upload .link').click(function(e){
		$.popup({type: ($(this).hasClass('terms')) ? 'terms_and_conditions' : 'privacy_policy' });
		return false;
	})

</script>