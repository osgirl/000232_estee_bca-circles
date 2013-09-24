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

	public function photo_upload()
	{	
		if( count($_POST) > 1 ){
			$data = $_POST;
		}
		else{
			$data['id'] = "";
			$data['users_fb_id'] = "";
		}
		$this->load->view('popup/photo_upload_view', $data);
	}

	public function circle()
	{	
		if( count($_POST) > 1 ){
			$this->load->view('popup/circle_view', $_POST);
		}
		else{
			// Do nothing
		}
	}

	//Note: This is not a popup call
	public function facebook_comment_iframe($id)
	{
		$data['circle_id'] = $id;
		$this->load->view('popup/facebook_comment_iframe_view', $data);
	}

	public function privacy_policy($lang)
	{
		$this->load->view('popup/privacy_policy_view_'.$lang);
	}

	public function terms_and_conditions($lang)
	{
		$this->load->view('popup/terms_and_conditions_view_'.$lang);
	}

}