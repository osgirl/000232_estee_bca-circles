<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Circle_Photo extends CI_Controller {

	function __construct() {
		parent::__construct();		
		$this->load->model('circle_photos_model');
	}

	public function index()
	{		
	}

	public function get()
	{
		$post = $this->input->post();
		if( isset ( $post['id'] ) ){
			$query = array('id' => $post['id']);			
			$result = $this->circle_photos_model->get($query);
			echo json_encode($result);
		}
		else{
			echo 'Invalid access';
		}
	}

	public function getlist()
	{
		$post = $this->input->post();
		if( isset ( $post['circleId'] ) ){
			$query = array('ref_circle_id' => $post['circleId'],'sortBy' => 'id', 'sortDirection' => 'desc');			
			$result = $this->circle_photos_model->get($query);
			echo json_encode($result);
		}
		else{
			echo 'Invalid access';
		}
	}

	public function delete()
	{

	}

}