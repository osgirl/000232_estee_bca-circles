<html>
	<head>
		<title></title>
		<style type="text/css">

			body{
				text-align: center;
			}
			.fb-comments, .fb-comments span, .fb-comments iframe {
 			   width: 100% !important;
			}

		</style>
	</head>
	<body>
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=<? echo config_item('fb_app_id'); ?>"
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>		
		<div class="fb-comments" data-href="<? echo base_url(); ?><? echo index_page(); ?>/?comment_id=<? echo $circle_id ?>" data-width="780"></div>	
	</body>
</html>