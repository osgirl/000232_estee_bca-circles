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
			
			$php_date 	= new DateTime();
			$time_date  = $php_date->format('Y-m-d H:i:s');

			$post = array(
				'users_fb_id'			=> $this->post['users_fb_id'],
				'users_name'			=> $this->post['users_name'],
				'users_photo_url'		=> $this->post['users_photo_url'],
				'goal'					=> $this->post['goal'],
				'date'					=> $time_date,
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

	public function fetchCircleData()
	{
		$this->post = $this->input->post();
		if ( isset ( $this->post['circle_id'] )) {	

			$circle_id = $this->post['circle_id'];
			$data = array();
			$query = $this->db->query("SELECT * FROM circles WHERE id='$circle_id'"); 

			if ($query->num_rows() > 0) {
			  foreach($query->result() as $row) {
			  	$data['circle_id'] = $row->id;
			    $data['user_id'] = $row->users_fb_id;
			    $data['user_name'] = $row->users_name;
			    $data['user_photo_url'] = $row->users_photo_url;
			    $data['goal'] = $row->goal;
			    $data['language'] = $row->language;
			  }

			  echo json_encode($data);
			}
			
		}
		else
			echo 'Invalid access';
	}	

	
	public function fetchUploadedPhotoData()
	{
		$this->post = $this->input->post();
		if ( isset ( $this->post['photo_id'] )) {	

			$photo_id = $this->post['photo_id'];
			$data = array();
			$query = $this->db->query("SELECT * FROM photos WHERE id='$photo_id'"); 

			if ($query->num_rows() > 0) {
			  foreach($query->result() as $row) {
			    $data['filename'] = $row->filename;
			    $data['description'] = $row->description;
			  }

			  echo json_encode($data);
			}
			
		}
		else
			echo 'Invalid access';
	}

}