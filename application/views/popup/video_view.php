<script src="<?php echo base_url(); ?>js/vendor/video.js"></script>
<script type="text/javascript">
	videojs.options.flash.swf = baseUrl + "swf/video-js.swf";
</script>

<div class="popup" id="popup_video">	
	<div id="popup_video_holder">
		<video id="embeded_video" class="video-js vjs-bca-skin" controls preload="auto" 
		width="100%" height="100%" poster="<?= base_url(); ?>img/popups/video/video-cover.jpg" data-setup="{}">
		    <source src="<?= base_url(); ?>video/bca.mp4" type='video/mp4' />
		    <source src="<?= base_url(); ?>video/bca.webm" type='video/webm' />
		    <source src="<?= base_url(); ?>video/bca.ogv" type='video/ogg' />
		  </video>
	</div>
	<div id="popup_video_footer">
		<h1 language_id="we_are_stronger_together_upload_photo" language_location="video">video name</h1>
		<p language_id="video_description" language_location="video" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed sodales est. Vivamus non dolor tempus, aliquet diam sagittis, molestie tortor.</p>
		<ul id="popup_footer_share">
			<li language_id="share" language_location="video" >SHARE</li>
			<li class="share-ico" id="popup_footer_share_facebook" onclick="$.popup_share({post_type:'video', url:'/video', type:'facebook'})"></li>
			<li class="share-ico" id="popup_footer_share_twitter" onclick="$.popup_share({post_type:'video', url:'/video', type:'twitter'})"></li>
		</ul>
	</div>
</div>

<script type="text/javascript">	
	//FF Bug fix. hide control when video loaded.
	videojs("embeded_video").ready(function(){
		var myPlayer = this;
		var t =setTimeout(function(){
			clearTimeout(t);
			myPlayer.trigger('mouseout');
		},1000);
	});

	translator.translateItems("video");
</script>
