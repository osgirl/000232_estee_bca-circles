<div class="popup <?echo $source ?>" id="popup_photo">
	<div id="photo_img_holder">
		<img src="<? echo $photo_url ?>"/>
		<div id="photo_desc_holder">
			<? if ($author != "")
				echo "<h3>" . $author . "</h3>";
			   if ($content != "")
				echo "<p>" . $content . "</p>";
			   if ($source =="instagram")
			   	echo "<span id='ico_instagram'/>";
			?>
		</div>
	</div>
	<?
		if($source =="instagram")
			$url = "/photo/instagram/" . $id;
		else{
			if ($circle_id != null)
				$url = "/circle/" . $circle_id . "/photo/bca/" . $id;
			else
				$url = "/photo/bca/" . $id;
		}
	?>
	<div id="photo_footer">
		<ul id="popup_footer_share">
			<li>SHARE</li>
			<li class="share-ico" id="popup_footer_share_facebook" onclick="$.popup_share({post_type:'photo', url:'<?echo $url?>',type:'facebook'})"></li>
			<li class="share-ico" id="popup_footer_share_twitter" onclick="$.popup_share({post_type:'photo', url:'<?echo $url?>',type:'twitter'})"></li>
		</ul>
	</div>
</div>
