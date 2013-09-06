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

			else
				echo 'Write failed';
		 }
		 else
		 	echo 'Invalid access';
	}


}