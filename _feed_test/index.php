<html>
	<head>
		<title>Feed test example</title>

		<style type="text/css">

			button{
				display: inline-block;
			}
			#panel {
				display: none;
			}


			.container {
				width: 600px;
				min-height: 200px;
				background: #FFFFCC;
				padding: 20px;
				margin: 20px 0;
			}

			.block {
				display: inline-block;
				width: 80px;
				height: 80px;
				padding: 20px;
				margin: 5px;
				vertical-align: top;
				background: #00FF00;
			}

		</style>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>	
		<script src="../js/plugins.js"></script>	
		<script type="text/javascript">

			/** available feeds

				bca-circle
				bca-photo
				bca-twitter
				bca-instagram

			*/


			$.feed();
			fm_ready(function($, _) {

				$('#loading').hide();
				$('#panel').show();
				$('#circles_feed').click(getClick);
				$('#circles_more_feed').click(moreClick);
				$('#circles_reset').click(reset);

				function getClick() {				
					$.feed.get('bca-photo', getHandler, 3);				    			
				}

				function moreClick() {					
					$.feed.more('bca-photo', moreHandler, 5);
				}

				function getHandler(data){
					console.log(data);
					$(data).each(function(i){
						feed = data[i].data;
						$('<div class="block"/>')
							.text('Time: ' + feed.timestamp)
							.appendTo($('#circle_container'));
					});
				}
			 	
				function moreHandler(data){
					$(data).each(function(i){
						feed = data[i].data;
						$('<div class="block"/>')
							.text('Time: ' + feed.timestamp)
							.appendTo($('#circle_container'));
					});
				}

				function reset(){
					$('.block').remove();
					$.feed();
				}

			});

			

		</script>
	</head>
	<body>
		<h2>Feed Test</h2>
		<div id="loading">
			<p>Initializing FeedMagnet SDK, please wait...</p>
		</div>
		<div id="panel">
			<button id="circles_feed">Get feed</button>
			<button id="circles_more_feed">more feed</button>
			<button id="circles_reset">reset</button>
			<div class="container" id="circle_container"></div>
		</div>
	
	</body>
</html>