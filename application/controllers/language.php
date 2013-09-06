<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Language extends CI_Controller {


	public function index()
	{
	}


	public function fetchLanguageData()
	{
		$this->post = $this->input->post();
		if ( isset ( $this->post['language'] )) {	

			$language = $this->post['language'];

			$query = $this->db->select("languages.*")	
				->from("languages")
				->where_in("languages.id",$feedArr)
				->get();

			$query = $this->db->query("UPDATE goals SET taken_number=taken_number + 1 WHERE id = '$ref_goal_id'"); 

			if ($result){
				$data['id'] = $result;
				$data['fb_id'] = $this->post['users_fb_id'];
				$data['goal'] = $this->post['goal'];
				$data['goal_id'] = $ref_goal_id;
				$data['language'] = $this->post['language'];
				$data['country'] = $this->post['country'];
				echo json_encode($data);
			}
			else
				echo 'Write failed';
		 }
		 else
		 	echo 'Invalid access';
	}


}