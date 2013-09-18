<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Photo extends CI_Controller {

	public $img_length 			= 580;
	public $max_img_length 		= 1024;

	public function index()
	{
	}

	public function uploadPreviewImage() {
		$error 				= '';
		$file_location 		= '';
		$file_folder		= config_item('upload_url');
		$base_url			= config_item('base_url');
		$file_name 			= 'uploadFile';
		$file_max_size		= config_item('file_max_size');
		$extension 			= strtolower(end(explode(".", $_FILES[$file_name]["name"])));
		$allowed_exts		 = array("jpg", "jpeg", "gif", "png");
		$name 				= '';

		// print_r($_FILES[$file_name]);

		if ((($_FILES[$file_name]["type"] == "image/gif")
		|| ($_FILES[$file_name]["type"] == "image/jpeg")
		|| ($_FILES[$file_name]["type"] == "image/png")
		|| ($_FILES[$file_name]["type"] == "image/pjpeg"))
		&& ($_FILES[$file_name]["size"] < $file_max_size)
		&& in_array($extension, $allowed_exts))
		{
			if(!empty($_FILES[$file_name]['error']))
			{
				switch($_FILES[$file_name]['error'])
				{
					case '1':
						$error = 'The uploaded file exceeds the uplowead_max_filesize directive in php.ini';
						break;
					case '2':
						$error = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
						break;
					case '3':
						$error = 'The uploaded file was only partially uploaded';
						break;
					case '4':
						$error = 'No file was uploaded.';
						break;
					case '6':
						$error = 'Missing a temporary folder';
						break;
					case '7':
						$error = 'Failed to write file to disk';
						break;
					case '8':
						$error = 'File upload stopped by extension';
						break;
					case '999':
					default:
						$error = 'No error code avaiable';
				}
			}

			elseif(empty($_FILES[$file_name]['tmp_name']) || $_FILES[$file_name]['tmp_name'] == 'none') {
				$error = 'No file was uploaded.';
			}

			else {				
				$tmp_name 	   = $_FILES[$file_name]['tmp_name'];
		        $name 	  	   = 'temp_' . time() . '.' . $extension;
		        $file_location = $file_folder . $name;
		        
		        //upload a file first
		        move_uploaded_file($tmp_name, $file_location);

				// Set a min height and width
				$w  = $this->img_length;
				$h = $this->img_length;

				// Get new dimensions
				list($o_w, $o_h) = getimagesize($file_location);

				$o_ratio = $o_w/$o_h;

				if ($w/$h < $o_ratio) {
				   $w = $h * $o_ratio;
				} else {
				   $h = $w / $o_ratio;
				}

				// Resample
				$canvas = imagecreatetruecolor($w, $h);
					
				 switch( $extension ) {
              		case 'jpg':
              		case 'jpeg':
                    	 $image = imagecreatefromjpeg($file_location);
                     	break;
              		case 'gif':
                     	$image = imagecreatefromgif($file_location);
                     	break;
              		case 'png':
                     	$image = imagecreatefrompng($file_location);
                     	break;
       			}

				imagecopyresampled($canvas, $image, 0, 0, 0, 0, $w, $h, $o_w, $o_h);

				//Check if the original photo has orientation info
				$exif = exif_read_data($file_location);

				//Adjust image rotation
		        if (!empty($exif['Orientation'])) {
			        switch ($exif['Orientation']) {
			            case 3:
			                $canvas = imagerotate($canvas, 180, 0);
			                break;

			            case 6:
			                $canvas = imagerotate($canvas, -90, 0);
			                break;

			            case 8:
			                $canvas = imagerotate($canvas, 90, 0);
			                break;
			        };
			    };
				
				// Output
				ob_start (); 
				imagejpeg( $canvas, null, 90 );
				$output = ob_get_contents (); 
				ob_end_clean (); 
				file_put_contents( $file_location , $output );
			}
		}
		else {
			$error = "Please use an image in JPG, GIF and PNG format under " . ($file_max_size/1000000) ."mb.";
		}
		
		$return['error'] = $error;
		$return['file_name'] = $name;
	    $return['file_location'] = $file_location;
	   	echo json_encode( $return );
	}

	public function saveFile(){
		$data = $this->input->post();

		if(!empty($data)){
			$len = $this->img_length;
			$canvas = imagecreatetruecolor($len, $len);
			$image = imagecreatefromjpeg( $data['filePath'] );

			// Resample image
			$o_w = imagesx( $image );
			$o_h = imagesy( $image );
			imagecopyresampled($canvas, $image, $data['x'], $data['y'], 0,0, $o_w, $o_h, $o_w, $o_h);
			$canvas = imagerotate($canvas, $data['deg'], 0);
			$result = $this->saveOutput($canvas, $data);

			//Delete temporary file
			unlink($data['filePath']);
			return $result;
		}
		else{
			echo 'Invaild access.';
		}
	}

	public function saveRawFile() {
		$data = $this->input->post();
		if(!empty($data)){
			$base64data = explode('base64,', $data['base64data'] );
			$canvas 	= imagecreatefromstring( base64_decode($base64data[1]) );
			$result 	= $this->saveOutput($canvas, $data);
			return $result;
		}
		else{
			echo 'Invaild access.';
		}
	}

	private function saveOutput($img, $data){

		$name 			= 'photo_' . time() .".jpg";
		$file_location 	= config_item('upload_url') . $name;
		$php_date 		= new DateTime();
		$time_date 		= $php_date->format('Y-m-d H:i:s');

		// Save image first
		ob_start (); 
		imagejpeg( $img, null, 70 );
		$output = ob_get_contents (); 
		ob_end_clean (); 
		file_put_contents( $file_location , $output );
		unset($img);

	    //Save to Database
		// save to Photo table of circleId and usersFbId is invalid. Save to Circle Photo table if valid.
		if(empty($data['circleId']) && empty($data['usersFbId']) ){
			$post = array(
				'date'			=> $time_date,
				'description'	=> $data['desc'],
				'filename'		=> $name,
				);
			$this->load->model('photos_model');
			$result = $this->photos_model->Add($post);
		}
		else{
			$post = array(
				'ref_circle_id'	=> $data['circleId'],
				'description'	=> $data['desc'],
				'filename'		=> $name,
				'users_fb_id'	=> $data['usersFbId']
				);
			$this->load->model('circle_photos_Model');
			$result = $this->circle_photos_Model->Add($post);
		}

		if ($result){
			$data['id'] = $result;
			$data['file_name'] = $name;
	    	$data['file_location'] = $file_location;
		}
		else{
			$data['error'] = 'Write failed';
		}
		echo json_encode($data);
	}

	public function delete_photo()
	{
		unlink($this->input->post('data'));
	}

//oc: this function retrieves the list of photos from the database
	public function fetchUploadedPhotoData()
	{
		$this->load->model('photos_model');
		$this->post = $this->input->post();
		if ( isset ( $this->post['feedIdsJSON'] )) {	

			$ids 	= json_decode($this->post['feedIdsJSON']);
			$data 	= array();
			$photos = array();
			$query 	= $this->db->select()
				->from('photos')
				->where_in("id", $ids)
				->get(); 

			if ($query->num_rows() > 0) {
			  foreach($query->result() as $row) {
			  	
			    $data['photo_id'] 		= $row->id;
			    $data['filename'] 		= $row->filename;
			    $data['description'] 	= $row->description;
			    $photos[] 				= $data;
			  }

			  echo json_encode($photos);
			}
			
		}
		else
			echo 'Invalid access';
	}

	public function OLDfetchUploadedPhotoData()
	{
		$this->load->model('photos_model');
		$this->post = $this->input->post();
		if ( isset ( $this->post['photo_id'] )) {	

			$photo_id = $this->post['photo_id'];
			$data = array();
			$query = $this->db->query("SELECT * FROM photos WHERE id='$photo_id'"); 

			if ($query->num_rows() > 0) {
			  foreach($query->result() as $row) {
			    $data['photo_id'] = $row->id;
			    $data['filename'] = $row->filename;
			    $data['description'] = $row->description;
			  }

			  echo json_encode($data);
			}
			
		}
		else
			echo 'Invalid access';
	}
	public function save_facebook_photo(){
		$data = json_decode($this->input->post('data'));
		$this->load->library("image_smooth_arc");

		$m = 5; //Multiply size

		// $canvas         = imagecreatetruecolor( 500, 580 );
		$canvas         = imagecreatetruecolor( 500 * $m, 580 * $m );
		$bgColor        = imagecolorallocate( $canvas, 243, 141, 171 );
		$bgCircleColor  = array( 245, 113, 157, 0 );

		$colorWhite     = imagecolorallocate( $canvas, 255, 255, 255 );

		$thumbs_url     = $data->photo;
		$user_name      = $data->name;
		$content_text   = $data->goal;
		$id 	        = $data->id;
		$friends 	    = $data->friends;
		
		$createAText 	= $data->createAText;
		$weWillText 	= $data->weWillText;
		$circleOfStrengh= $data->circleOfStrengh;
		$language 		= $data->selectedLanguage;

		$filename       = "circle_photo_".$id.".jpg";

		$steps          = count( $friends ) + 1;
		$radius         = 180 *$m;
		$cx             = 250 *$m;
		$cy             = 340 *$m;


		//Font location musr be a relative

		switch ($language) {
			case 'en':
				$fontNormal     = 'fonts/HelveticaBQ-Roman.otf';
				$fontLight      = 'fonts/HelveticaBQ-Light.otf';
				$fontBold       = 'fonts/HelveticaBQ-Medium.otf';
				break;
			case 'cn':
				$fontNormal     = 'fonts/simsun.ttf';
				$fontLight      = 'fonts/simsun.ttf';
				$fontBold       = 'fonts/simsun.ttf';
				break;			
			case 'ko':
				$fontNormal     = 'fonts/Daum_Regular.ttf';
				$fontLight      = 'fonts/Daum_Regular.ttf';
				$fontBold       = 'fonts/Daum_Regular.ttf';
				break;			
			default:
				$fontNormal     = 'fonts/DejaVuSans.ttf';
				$fontLight      = 'fonts/DejaVuSans.ttf';
				$fontBold       = 'fonts/DejaVuSans.ttf';
				break;
		}

		// Create canvas
		imagefill( $canvas, 0, 0, $bgColor );
		$dotted = @imagecreatefromjpeg(base_url(). "img/circle_dotted_outline-hq.jpg");
		imagecopy($canvas, $dotted, 70*$m,160*$m,0,0,imagesx($dotted), imagesy($dotted));
		$this->image_smooth_arc->imageSmoothArc( $canvas, 250*$m, 340*$m, 265*$m, 265*$m, $bgCircleColor, M_PI/2, 0 );

		$tag_positions = array();

		// Create circular positioned thumbnails
		for ( $i =0; $i < $steps; $i++ ) {
		  $angle = ( pi() * ( $i / $steps -.25 ) ) *2;
		  $x = $cx + $radius * cos( $angle );
		  $y = $cy + $radius * sin( $angle );

		  array_push( $tag_positions, array("x"=>$x/(500 * $m), "y"=>$y/(580 * $m)) );

		  if($i==0){
		  	$img_path = $thumbs_url;
		  } else{
		  	$img_path = $friends[$i-1]->url;
		  }

		  $extension = strtolower(end(explode(".", $img_path)));

			switch( $extension ) {
				case 'jpg':
				case 'jpeg':
				 $thumb = imagecreatefromjpeg($img_path);
			 	break;
				case 'gif':
			 	$thumb = imagecreatefromgif($img_path);
			 	break;
				case 'png':
			 	$thumb = imagecreatefrompng($img_path);
			 	break;
			}

		  if ( $thumb ) {
		    $w_h = imagesx( $thumb );
		    $mask = imagecreatetruecolor( $w_h,$w_h );
		    $this->image_smooth_arc->imageSmoothArc( $mask, $w_h/2, $w_h/2, $w_h-4, $w_h-4, array( 255, 0, 0, 0 ), M_PI/2, 0 );
		    $this->image_mask( $thumb, $mask );
		    imagecopyresampled( $canvas, $thumb, $x-(80*$m/2), $y-(80*$m/2), 0, 0, 80*$m, 80*$m, $w_h, $w_h );
		  } else {
		  	//If image is not available, draw whie dot
		    $this->image_smooth_arc->imageSmoothArc( $canvas, $x*$m, $y*$m, 20*$m, 20*$m, array( 255, 255, 255, 0 ), M_PI/2, 0 );
		  }
		}

		//Create a header
		imagettftext( $canvas, 15*$m, 0, 20*$m, 30*$m, $colorWhite, $fontNormal, $user_name . " ".$createAText);
		imagettftext( $canvas, 20*$m, 0, 20*$m, 70*$m, $colorWhite, $fontNormal, $circleOfStrengh );
		imageline($canvas, 20*$m, 85*$m, 480*$m, 85*$m, $colorWhite);

		// Create texts in a center of circle
		$center_x = imagesx($canvas)/2;
		$dim = imagettfbbox( 14*$m, 0, $fontBold, $weWillText );
	    $_x = $center_x - $dim[4]/2;

		imagettftext( $canvas, 14*$m, 0, $_x, 265*$m, $colorWhite, $fontBold, $weWillText );
		$this->multiline_text( $canvas, 14*$m, $colorWhite, $fontLight, $content_text, $center_x, 290*$m, 220*$m, $language );

		$file_location 	= config_item('upload_url') . 'facebook/' . $filename;

		// Save image
		imagejpeg( $canvas, $file_location, 90 );
		unset($canvas);
	
		// Results
		$result = array (	'result'=>"Success",
		                 	'filename'=>$filename,
							'file_location'=>$file_location,
							'tag_positions'=>$tag_positions
		);

		echo json_encode($result);
	}

	function image_mask( &$img, &$mask ) {
	  $xSize = imagesx( $img );
	  $ySize = imagesy( $img );
	  $newPicture = imagecreatetruecolor( $xSize, $ySize );
	  imagesavealpha( $newPicture, true );
	  imagefill( $newPicture, 0, 0, imagecolorallocatealpha( $newPicture, 0, 0, 0, 127 ) );

	  if ( $xSize != imagesx( $mask ) || $ySize != imagesy( $mask ) ) {
	    $tempPic = imagecreatetruecolor( $xSize, $ySize );
	    imagecopyresampled( $tempPic, $mask, 0, 0, 0, 0, $xSize, $ySize, imagesx( $mask ), imagesy( $mask ) );
	    imagedestroy( $mask );
	    $mask = $tempPic;
	  }

	  for ( $x = 0; $x < $xSize; $x++ ) {
	    for ( $y = 0; $y < $ySize; $y++ ) {
	      $alpha = imagecolorsforindex( $mask, imagecolorat( $mask, $x, $y ) );
	      $alpha = 127 - floor( $alpha['red'] / 2 );
	      $color = imagecolorsforindex( $img, imagecolorat( $img, $x, $y ) );
	      imagesetpixel( $newPicture, $x, $y, imagecolorallocatealpha( $newPicture, $color['red'], $color['green'], $color['blue'], $alpha ) );
	    }
	  }
	  imagedestroy( $img );
	  $img = $newPicture;
	}

	function multiline_text( $image, $font_size, $color, $font, $text, $start_x, $start_y, $max_width, $language ) {
	  $string = "";
	  $tmp_string = "";

	  //Chinese word does not have enough space between word to split. Use str_split instead. 
	  if($language == 'cn'){
	  	$words = str_split($text, 3);
	  }
	  else{
	  	$words = explode( " ", $text);
	  }

	  for ( $i = 0; $i < count( $words ); $i++ ) {
	    $tmp_string .= $words[$i]." ";

	    //check size of string
	    $dim = imagettfbbox( $font_size, 0, $font, $tmp_string );

	    if ( $dim[4] < $max_width ) {
	      $string = $tmp_string;
	    } else {
	      $i--;
	      $tmp_string = "";

	      $dim = imagettfbbox( $font_size, 0, $font, $string );
	      $_x = $start_x - $dim[4]/2;
	      imagettftext( $image, $font_size, 0, $_x, $start_y, $color, $font, $string );

	      $string = "";
	      $start_y += $font_size + ( $font_size/1.8 );
	    }
	  }
	  $dim = imagettfbbox( $font_size, 0, $font, $string );
	  $_x = $start_x - $dim[4]/2;
	  imagettftext( $image, $font_size, 0, $_x, $start_y, $color, $font, $string );
	}
}
