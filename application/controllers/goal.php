<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Goal extends CI_Controller {


	function __construct() {
		parent::__construct();		
		$this->load->model('goals_model');
	}	

	public function fetchGoalData()
	{

		$query = $this->db->query("SELECT * FROM goals"); 

		if ($query->num_rows() > 0) {

			$data = array();
			  foreach($query->result() as $row) {

			  	$data[] = array (   'id'=>$row->id,
			  						'goal'=>$row->goal,
					  				'icon'=>$row->icon,
			  						'taken_number' => $row->taken_number,
									'goal_type' => $row->goal_type
								);
			  }//endif
		}

		echo json_encode($data);
	}
}
