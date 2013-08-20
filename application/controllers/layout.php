<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Layout extends CI_Controller {

	public function loadLayout1(){
		$this->load->view('layout/layout1');
	}

	public function loadLayout2(){
		$this->load->view('layout/layout2');
	}

	public function loadLayoutCircle(){
		$this->load->view('layout/layout_circle');
	}

	public function loadLayoutPhoto(){
		$this->load->view('layout/layout_photo');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */