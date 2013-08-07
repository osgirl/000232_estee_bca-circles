<div class="popup" id="popup_photo_upload">
	<div id="popup_photo_upload_agreement_window">
		<h2>BY SUBMITTING IMAGES, YOU AGREE</h2>
		<ul>
			<li>Image must be in BMP, PNG, GIF, or JPEG Format</li>
			<li>File size must be 5 MB or less</li>
			<li>You are the photographer or you have the photographer’s permission</li>
			<li>You are the only person in the photo or you have permission from every one in the photo</li>
			<li>Uploaded images may be used by the Breast Cancer Awareness Campaign on the internet and in other media</li>		
			<li>You agree to our terms and conditions</li>
		</ul>
		<p>By providing my information, I acknowledge that I have read, understand and agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy.</a> I agree any personal information that I may provide here will be processed in accordance with the Privacy Policy [hyperlink] and transferred to the United States and I hereby give my consent to such processing and transfer.</p>

		<span id="popup_checkbox"></span><span>Yes, I undestand and agree</span>
		<div id="button_wrapper">
			<div class="popup_round_button btn_cancel" id="popup_btn_white">CANCEL</div>
			<div class="popup_round_button btn_next dim" id="popup_btn_white">OKAY</div>
		</div>
	</div>
	<div id="popup_photo_upload_preview_window">
		<h2>WE'RE STRONGER TOGETHER</h2>
		<div id="popup_photo_img_holder">
			<div id="message">
				<img src="img/popups/icons/ico_photo_upload-preview.png"/>
				<p>Who makes you stronger? Upload a photo to show us your Circle of Strength.</p>
			</div>				
			<div id ="holder">
			</div>
			<span id="anim_loading"></span>
		</div>
		<div id="popup_photo_desc_holder">
			<textarea class="greyfont">Add a short description</textarea>
		</div>
		<div id="button_wrapper">
			<form id="file_form" name='form' method='POST' enctype='multipart/form-data'>
				<input name="uploadFile" type="file" class="hidden" id="uploadFile"/>
				<div class="popup_round_button btn_browse" id="popup_btn_pink">BROWSE</div>
				<div class="popup_round_button btn_cancel" id="popup_btn_pink">CANCEL</div>
				<div class="popup_round_button btn_submit dim" id="popup_btn_pink">SUBMIT</div>
			</form>
		</div>
	</div>
</div>

<script type="text/javascript">
	$('#popup_photo_upload').init_upload();
</script>