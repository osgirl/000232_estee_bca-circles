<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Popup extends CI_Controller {

	public function index()
	{
	}

	public function about()
	{
		$this->load->view('popup/about_view');
	}

	public function video()
	{
		$this->load->view('popup/video_view');
	}	

	public function photo()
	{
		if( count($_POST) > 1 ){
			$this->load->view('popup/photo_view', $_POST);
		}
		else{
			// Do nothing
		}
	}

	public function twitter()
	{
		if( count($_POST) > 1 ){
			$this->load->view('popup/twitter_view', $_POST);
		}
		else{
			// Do nothing
		}
	}

}