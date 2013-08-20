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
				'language'				=> $this->post['language']
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
			$query = $this->db->query("SELECT * FROM circles WHERE id = '$circle_id'"); 

			if ($query->num_rows() > 0) {
			  foreach($query->result() as $row) {
			  	$data['circle_id'] = $circle_id;
			    $data['user_id'] = $row->users_fb_id;
			    $data['user_name'] = $row->users_name;
			    $data['user_photo_url'] = $row->users_photo_url;
			    $data['goal'] = $row->goal;
			    $data['language'] = $row->language;

			    $friend_query = $this->db->query("SELECT * FROM friends WHERE ref_circle_id = '$circle_id'"); 

			    if ($friend_query->num_rows() > 0) {
				  foreach($friend_query->result() as $row) {
				  	$friends_data[] = array (	'friend_id'=>$row->friends_fb_id,
				  								'friend_name'=>$row->friends_name);

				  }
				    $data['friends_data'] = $friends_data;
				}//endif

			  }//endif
			}

			echo json_encode($data);
			
		}
		else
			echo 'Invalid access';
	}

	public function fetchUserCircleData()
	{
		$this->post = $this->input->post();
		if ( isset ( $this->post['user_id'] )) {	

			$user_id = $this->post['user_id'];
			$query = $this->db->query("SELECT * FROM circles WHERE users_fb_id = '$user_id'"); 

			if ($query->num_rows() > 0) {
			  foreach($query->result() as $circleRow) {
			  	$circle_id = $circleRow->id;

			    $friend_query = $this->db->query("SELECT * FROM friends WHERE ref_circle_id = '$circle_id'"); 

			    if ($friend_query->num_rows() > 0) {
			    	$friends_data = array();
				   foreach($friend_query->result() as $row) {
				  	$friends_data[] = array (	'friend_id'=>$row->friends_fb_id,
				  								'friend_name'=>$row->friends_name);

				  }

				  $circles_data[] = array('goal'=>$circleRow->goal, 'friends_data'=>$friends_data);
				 
				}//endif
				
				
			  }//endif
			}

			echo json_encode($circles_data);
			
		}
		else
			echo 'Invalid access';
	}

	public function fetchAllCircleData()
	{

		$query = $this->db->query("SELECT * FROM circles"); 

		$data = array();

		if ($query->num_rows() > 0) {
		  foreach($query->result() as $row) {

				$data[] = $row->goal;
			
		  }//endif
		}

		echo json_encode($data);

	}

}