<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Friend extends CI_Controller {

	function __construct() {
		parent::__construct();		
		$this->load->model('friends_model');
	}	

	public function index()
	{
	}

	public function create()
	{

		$this->post = $this->input->post();
		
		if ( isset ( $this->post['ref_circle_id'] )) {	

			$this->db->delete('friends', array('ref_circle_id' => $this->post['ref_circle_id']));

			$friends_data 	= $this->post['friends_data'];

			$return_result 	= array();
			 foreach($friends_data as $friend) {
			 	
			 	//oc: fall back if friend profile pic doesn't come across...
			 	$profile_generic = base_url() . "img/assets/profile_generic.jpg";
			 	$profilePic = isset($friend['url']) ? $friend['url'] : $profile_generic;
			 	if($profilePic == "") $profilePic = $profile_generic;

			 	$post = array(
					'ref_circle_id'			=> $this->post['ref_circle_id'],
			 		'friends_fb_id'			=> $friend['id'],
			 		'friends_name'			=> $friend['name'],
			 		'friends_photo_url'		=> $profilePic
			 		);
			
				$result = $this->friends_model->Add($post);

				if ($result){
					$data['circle_id'] 	= $this->post['ref_circle_id'];
					$data['fb_id'] 		= $friend['id'];
					$data['name'] 		= $friend['name'];
					$data['url'] 		= $profilePic;
					$return_result[] 	= $data;

				}
			}

			echo json_encode($return_result);
		}
		else
			echo 'Invalid access';
	}

}