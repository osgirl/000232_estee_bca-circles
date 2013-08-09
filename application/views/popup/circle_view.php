<div class="popup" id="popup_circle">
	<div id="popup_circle_detail_holder">
		<div class="popup_round_button btn_edit" id="popup_btn_pink">
			EDIT FRIENDS
		</div>
		<div class="btn_close"></div>
		<div id="popup_circle_modal">
			<div id="dot_container">
				<div id="avatar">
					<img src="<?echo $avatar ?>">
				</div>
				<p id="goal">
					<?echo $content ?>
					</p>
				<ul id="popup_footer_share">
					<li>SHARE
					</li>
					<li class="share-ico" id="popup_footer_share_facebook" onclick="$popup.share({type:'facebook', url:''})"></li>
					<li class="share-ico" id="popup_footer_share_twitter" onclick="$popup.share({type:'twitter', url:''})"></li>
				</ul><img id="dotted_circle" src="img/popups/circle/dotted_circle.png">
			</div>
		</div>
	</div>
	<div id="popup_circle_photo_holder">
		<div id="popup_circle_photo_button_wrapper">
			<span>CIRCLE OF STRENGTH PHOTOS</span>
			<div class="popup_round_button btn_add_photo" id="popup_btn_pink">
				ADD PHOTOS
			</div>
		</div>
	</div>
	<div class="h_divider_top"></div>
	<div id="popup_circle_comment_holder">
		<!-- <iframe src="popup/facebook_comment_iframe/<?echo $circle_id ?>"></iframe> -->
	</div>
</div>