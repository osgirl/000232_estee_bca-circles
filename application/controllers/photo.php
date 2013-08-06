<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Photo extends CI_Controller {

	public function index()
	{
	}

	public function upload() {
		$error 				= '';
		$file_location 		= '';
		$file_folder		= config_item('upload_url');
		$base_url			= config_item('base_url');
		$file_name 			= 'uploadFile';
		$file_max_size		= config_item('file_max_size');
		$extension 			= end(explode(".", $_FILES[$file_name]["name"]));
		$allowed_exts		 = array("jpg", "jpeg", "gif", "png");

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
						$error = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
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
				// @unlink($_FILES['file']);
				$tmp_name = $_FILES[$file_name]["tmp_name"];
		        $name = $_FILES[$file_name]["name"];
		        move_uploaded_file($tmp_name, $file_folder . $name);	
		        $file_location = $file_folder . $name;  
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

}
