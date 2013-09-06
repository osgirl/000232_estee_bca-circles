<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Language extends CI_Controller {

	function __construct() {
		parent::__construct();		
		$this->load->model('languages_model');
	}

	public function index()
	{
	}

	public function fetchLanguageData()
	{
		$this->post = $this->input->post();
		if (isset($this->post['language'])){	
			$language = $this->post['language'];
			$query = array('select'=> $language );
			$result = $this->languages_model->get($query);
			echo json_encode($result);
		 }
		 else
		 	echo 'Invalid access!';
	}


}