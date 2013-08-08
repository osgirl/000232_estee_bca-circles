<div class="popup" id="popup_circle">	

	<div id="popup_circle_detail_holder">
		<div class="popup_round_button btn_edit" id="popup_btn_pink">EDIT FRIENDS</div>
		<div class="btn_close"></div>
		<div id="popup_circle_modal">
			<div id="avatar">
				<img src="<?echo $avatar ?>"/>
			</div>
			<ul id="popup_footer_share">
				<li>SHARE</li>
				<li class="share-ico" id="popup_footer_share_facebook" onclick="$popup.share({type:'facebook', url:''})"></li>
				<li class="share-ico" id="popup_footer_share_twitter" onclick="$popup.share({type:'twitter', url:''})"></li>
			</ul>
			<p id="goal"><?echo $content ?></p>
			<div id="dot_container">
				<img id="dotted_circle" src="img/popups/circle/dotted_circle.png"/>
			</div>
		</div>
	</div>
</div>