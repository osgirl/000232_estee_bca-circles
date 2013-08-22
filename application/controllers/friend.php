<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Friend extends CI_Controller {

	public function index()
	{
	}

	public function create()
	{

		$this->load->model('friends_model');
		$this->post = $this->input->post();
		
		if ( isset ( $this->post['ref_circle_id'] )) {	

			$post = array(
				'ref_circle_id'			=> $this->post['ref_circle_id'],
				'friends_fb_id'			=> $this->post['friends_fb_id'],
				'friends_name'			=> $this->post['friends_name']
				);
			
			$result = $this->friends_model->Add($post);

			if ($result){
				echo json_encode($result);
			}
			else
				echo 'Write failed';
		}
		else
			echo 'Invalid access';
	}	

}