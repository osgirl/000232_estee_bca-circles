<div class="popup" id="popup_about">
	<img id="about_mrs_lauder" src="<?= base_url(); ?>img/popups/about/photo-mrs_lauder.jpg"/>
	<div id="about_content">
		<img id="about_header" src="<?= base_url(); ?>img/popups/about/about-header.jpg"/>
		<img id="about_logo" src="<?= base_url(); ?>img/popups/about/about-logo.jpg"/>
		<p id="about_copy">In 1992, during a time when thousands were dying from breast cancer yet it was only spoken about in whispers, Evelyn H. Lauder launched The Estée Lauder Companies’ Breast Cancer Awareness (BCA) Campaign to raise awareness for the disease. She encouraged women everywhere to
practice breast health, while working tirelessly to raise funds for the critical research needed to find a cure. Twenty years later, in over 70 countries, The BCA Campaign is devoted to defeating breast cancer through education and
medical research. The BCA Campaign will continue spreading its lifesaving awareness message globally in the hope of a world in which breast cancer no longer exists.</p>
<span id="about_footnote">Mrs. Evelyn H. Lauder 1936 – 2011.</span>
	</div>
	<span style="clear:right"/>	
</div>
<script>
	var aboutCopy;

	$(languageData).each(function(i,v){
		if(v[0] == "about_copy") aboutText = v[1];
	});

	$("#about_copy").html(aboutText);

</script>
