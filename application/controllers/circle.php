<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Circle extends CI_Controller {

	function __construct() {
		parent::__construct();		
		$this->load->model('circles_model');
	}	

	public function index()
	{
	}

	public function share($id = null)
	{
		if( isset($id)){
			$result = $this->circles_model->get(array('id' => $id));
			$data['id'] = $id;
			$data['user_goal'] = $result->goal;
			$this->load->view('home_view', $data);
		}
		else{
			echo 'Invalid access';
		}

	}

	public function create()
	{
		$this->post = $this->input->post();
		if ( isset ( $this->post['users_fb_id'] )) {	
			
		// 	$php_date 	= new DateTime();
		// 	$time_date  = $php_date->format('Y-m-d H:i:s');

			$ref_goal_id = $this->post['ref_goal_id'];

			$post = array(
				'users_fb_id'			=> $this->post['users_fb_id'],
				'users_name'			=> $this->post['users_name'],
				'users_photo_url'		=> $this->post['users_photo_url'],
				'goal'					=> $this->post['goal'],
				//'date'					=> '2013-07-31 11:50:53',
				'language'				=> $this->post['language'],
				'ref_goal_id'			=> $ref_goal_id,
				'country'				=> $this->post['country']
				);

			$query = $this->db->query("UPDATE goals SET taken_number=taken_number + 1 WHERE id = '$ref_goal_id'"); 

			
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

			  	$goal_id = $row->ref_goal_id;

			  	$data['circle_id'] = $circle_id;
			    $data['user_id'] = $row->users_fb_id;
			    $data['user_name'] = $row->users_name;
			    $data['user_photo_url'] = $row->users_photo_url;
			    $data['goal'] = $row->goal;
			    $data['goal_id'] = $goal_id;
			    $data['language'] = $row->language;
			    $data['country'] = $row->country;

			    $friend_query = $this->db->query("SELECT * FROM friends WHERE ref_circle_id = '$circle_id'"); 

			    if ($friend_query->num_rows() > 0) {
				  foreach($friend_query->result() as $row) {
				  	$friends_data[] = array (	'friend_id'=>$row->friends_fb_id,
				  								'friend_name'=>$row->friends_name);

				  }
				    $data['friends_data'] = $friends_data;

				    $goal_query = $this->db->query("SELECT goal_type FROM goals WHERE id = '$goal_id'");

				    if($goal_query->num_rows() > 0){

				    	foreach($goal_query->result() as $goal_row){
				    		$data['goal_type'] = $goal_row->goal_type;
				    	}

				    }
				}//endif

			  }//endif
			}

			echo json_encode($data);
			
		}
		else
			echo 'Invalid access';
	}

	public function fetchFriendCircleData()
	{
		
		//$this->output->enable_profiler(TRUE);
		$this->post = $this->input->post();

		if ( isset ( $this->post['feedIdsJSON'] )) {	

			$feedArr 		= json_decode($this->post['feedIdsJSON']);
			$circle_id 		= $feedArr[0];
			//print_r($feedArr);
			$friendsArr 	= json_decode($this->post['friendIdsJSON']);
			//print_r($friendsArr);

			$data 		= array();
			$circles 	= array();
			
			$query = $this->db->select("circles.*, g.goal_type")	
				->from("circles")
				->where_in("circles.id",$feedArr)
				->where_in("users_fb_id",$friendsArr)
				->join("goals AS g", 'g.id = circles.ref_goal_id', "LEFT")
				->order_by("circles.id DESC")
				->limit(4)
				->get();
			

			if ($query->num_rows() > 0) {
			  foreach($query->result() as $row) {

			  	$circle_id 				= $row->id;

			  	$data['circle_id'] 		= $circle_id;
			    $data['user_id'] 		= $row->users_fb_id;
			    $data['user_name'] 		= $row->users_name;
			    $data['user_photo_url'] = $row->users_photo_url;
			    $data['goal'] 			= $row->goal;
			    $data['goal_id'] 		= $row->ref_goal_id;
			    $data['language'] 		= $row->language;
			    $data['country'] 		= $row->country;
			    $data['goal_type'] 		= $row->goal_type;

//print_r($row);
//select all circles where circle's userid is in 
			    $friend_query = $this->db->query("SELECT * FROM friends WHERE ref_circle_id = '$circle_id'"); 

			    if ($friend_query->num_rows() > 0) {
				  foreach($friend_query->result() as $row) {
				  	$friends_data[] = array (	'friend_id'=>$row->friends_fb_id,
				  								'friend_name'=>$row->friends_name);

				  }
				$data['friends_data'] = $friends_data;
				$circles[]	= $data;

				}//endif
			  }//endforeach
			}//endif

			echo json_encode($circles);
			
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
			  	$ref_goal_id = $circleRow->ref_goal_id;

			    $friend_query = $this->db->query("SELECT * FROM friends WHERE ref_circle_id = '$circle_id'"); 

			    if ($friend_query->num_rows() > 0) {
			    	$friends_data = array();
				   foreach($friend_query->result() as $row) {
				  	$friends_data[] = array (	'friend_id'=>$row->friends_fb_id,
				  								'friend_name'=>$row->friends_name);

				  	$goal_query = $this->db->query("SELECT * FROM goals WHERE id = '$ref_goal_id'");

				  	if ($goal_query->num_rows() > 0) {
				  		 foreach($goal_query->result() as $goal_row) {

				  		 	$goal_icon = $goal_row->icon;
				  		 }
				  	}

				  }

				  $circles_data[] = array('goal'=>$circleRow->goal, 'friends_data'=>$friends_data, 'circle_id'=>$circle_id, 'avatar'=>$circleRow->users_photo_url, 'goal_icon'=>$goal_icon);
				 
				}//endif
				
				
			  }//endif
			}

			echo json_encode($circles_data);
			
		}
		else
			echo 'Invalid access';
	}

}