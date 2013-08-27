<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Layout extends CI_Controller {

	public function loadLayout1(){
		$this->load->view('layout/layout1');
	}

	public function loadLayout2(){
		$this->load->view('layout/layout2');
	}

	public function loadLayout3(){
		$this->load->view('layout/layout3');
	}

	public function loadLayoutCircle(){
		$this->load->view('layout/layout_circle');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */