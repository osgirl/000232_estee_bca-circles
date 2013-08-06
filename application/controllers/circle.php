<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Circle extends CI_Controller {

	function __construct() {
		parent::__construct();		
		$this->load->model('circles_model');
	}	

	public function index()
	{		
	}

	public function create()
	{
		$this->post = $this->input->post();
		if ( isset ( $this->post['users_fb_id'] )) {	
			
			$phpDate = new DateTime();
			$timeDate = $phpDate->format('Y-m-d H:i:s');

			$post = array(
				'users_fb_id'			=> $this->post['users_fb_id'],
				'users_name'			=> $this->post['users_name'],
				'users_photo_url'		=> $this->post['users_photo_url'],
				'goal'					=> $this->post['goal'],
				'date'					=> $timeDate,
				'language'				=> $this->post['language'],
				);
			
			$result = $this->circles_model->Add($post);

			if ($result){
				$data['id'] = $result;
				echo json_encode($data);
			}
			else
				echo 'Write failed';
		}
		else
			echo 'Invalid access';
	}
	

}