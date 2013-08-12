<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/main_smartphone.css">
        <link rel="stylesheet" href="css/main_tablet.css">
        <link rel="stylesheet" href="css/videojs/video-js.css" type="text/css">
        <link rel="stylesheet" href="css/videojs/video-bca-skin.css" type="text/css">
        <link rel="stylesheet" href="css/fancybox2/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />

        <!-- This a css for popup window. You can merge this to main.css in final production -->
        <link rel="stylesheet" href="css/popup.css">

        <script src="js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>

        <style type="text/css">

        
            #dummy_top{
                height: 200px;
                background: #cccccc;
            }

            #gallery {
                min-height: 1200px;
            }

        </style>

    </head>
    <body>
        <div id="content_wrap" class="container">
            <div id="dummy_top">Dummy top</div>
            <div id="gallery">
                <div class="h_divider_top"></div>
                <div id="magnet_feed">                
                    <br><br>
                    <h4>Popup test links</h4>
                    <ul>
                    	<li>
                    		<a onclick="$.popup({type:'about'});">about </a>
                    	</li>
                    	<li>
                    		<a onclick="$.popup({type:'video'});">video </a>
                    	</li>
            			<li>
            	 			<a onclick="$.popup({type:'photo', 
            		            data:{
            		            	source: 'local',
            		            	photo_url: '/img/popups/test_photo_001.jpg'
            		        	} 
            	        	});">photo w/o desc</a>
                    	</li>
            			<li>
            	            <a onclick="$.popup({type:'photo', 
            		            data:{
            		            	source: 'local',
            		            	author: 'John Doe',
            		            	content: 'Sed ac convallis ante. Nam feugiat mattis ligula, ac adipiscing purus dictum vel. Duis auctor lacus ipsum #BCAstrength',
            		            	photo_url: '/img/popups/test_photo_001.jpg'
            		        	} 
            	        	});">photo/w desc</a>
                    	</li>
            			<li>
            	            <a onclick="$.popup({type:'photo', 
            		            data:{
            		            	source: 'instagram',
            		            	author: 'MICHAEL BROWN',
            		            	content: 'Monday morning hair routine! @aveda #invati & #volumising tonic keeps the hair I have looking thicker.. What would I do without you! #aveda',
            		            	photo_url: 'http://distilleryimage4.s3.amazonaws.com/ffcaeb30f25b11e2919022000a1f8daa_7.jpg'
            		        	} 
            	        	});">photo (instagram)</a>
                    	</li>
            			<li>
            	            <a onclick="$.popup({type:'twitter', 
            		            data:{
            		            	author: '@aitebha92',
            		            	content: '@aveda\'s #Invati line smells so good. Hoping it works just as well! #CrossingFingers',
            		            	datetime: 'July 4th, 2013, 3:24pm',
            		            	avatar: 'http://a0.twimg.com/profile_images/3654654271/be74feaf9db3c15aeaada42eb3a3d115_normal.jpeg'
            		        	}
            	        	});">Twitter</a>
                    	</li>
                    	<li>
                    		<a onclick="$.popup({type:'photo_upload'});">Photo upload</a>
                    	</li>
                        <li>
                            <a onclick="$.popup({type:'circle',
                                data:{                                    
                                    content: 'Be proactive. Schedule a mammogram.',
                                    avatar: 'http://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg',
                                    circle_id: 1234,
                                    num_friends: 10,
                                }
                            });">Circle detail</a>
                        </li>
                        <li>
                            <a onclick="$.popup({type:'circle',
                                data:{                                    
                                    content: 'Be proactive. Schedule a mammogram.',
                                    avatar: 'http://profile-a.xx.fbcdn.net/hprofile-prn1/41405_39607548_1844_n.jpg',
                                    circle_id: 2345,
                                    users_fb_id: ABCD123,
                                    num_friends: 6,
                                }
                            });">Circle detail #2</a>
                        </li>                        

                    </ul>
                </div>

                

            </div>

        </div> <!-- /container -->

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.9.1.min.js"><\/script>')</script>
		<script>window.jQuery || document.write('<script src="js/vendor/jquery.easing.1.3.js"><\/script>')</script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <script type="text/javascript" src="js/vendor/fancybox2/jquery.fancybox.pack.js?v=2.1.5"></script>
		<script type="text/javascript" src="js/vendor/ajaxfileupload.js"></script>
        
        <script src="js/plugins.js"></script>


        
    </body>
</html>
