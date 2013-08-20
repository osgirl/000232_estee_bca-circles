<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Goal extends CI_Controller {


	function __construct() {
		parent::__construct();		
		$this->load->model('goals_model');
	}	

	public function fetchGoalData()
	{

		$query = $this->db->query("SELECT * FROM goals"); 

		$data = array();

		if ($query->num_rows() > 0) {
		  foreach($query->result() as $row) {

				$data[] = $row->goal;
			
		  }//endif
		}

		echo json_encode($data);
	}
}
