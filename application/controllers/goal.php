<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Goal extends CI_Controller {


	function __construct() {
		parent::__construct();		
		$this->load->model('goals_model');
	}	

	public function create(){

		$this->post = $this->input->post();

		if ( isset ( $this->post['goal_cotent'] )) {	

				$post = array(
					'goal'				=> $this->post['goal_cotent'],
					'icon'				=> 'generic',
					'taken_number'		=> 0,
					'goal_type'			=> 'customize'
				);

				$result = $this->goals_model->Add($post);

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

	public function fetchDefaultGoalData()
	{

		$query = $this->db->from("goals")
				->where("goal_type", "default")
				->order_by("id", "asc")
				->get();

		if ($query->num_rows() > 0) {

			$data = array();

			  foreach($query->result() as $row) {

			  	$data[] = array (   'id'=>$row->id,
			  						'goal'=>$row->goal,
					  				'goal_icon'=>$row->icon,
			  						'taken_number' => $row->taken_number,
									'goal_type' => $row->goal_type
								);
			  }//endif
		}

		echo json_encode($data);
	}

	public function fetchAllGoalData()
	{

		$query = $this->db->from("goals")
				->order_by("taken_number", "desc")
				->get();

		if ($query->num_rows() > 0) {

			$data = array();
			  foreach($query->result() as $row) {

			  	$data[] = array (   'id'=>$row->id,
			  						'goal'=>$row->goal,
					  				'goal_icon'=>$row->icon,
			  						'taken_number' => $row->taken_number,
									'goal_type' => $row->goal_type
								);
			  }//endif
		}

		echo json_encode($data);
	}
}
