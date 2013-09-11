<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Feed_Magnet_Rss_Feed extends CI_Controller {

	function __construct() {
		parent::__construct();		
		$this->load->model('circles_model');
		$this->load->model('photos_model');
	}	

	public function index()
	{
	}

	public function get($type){
		$limit = 50;
		switch ($type) {
			case 'circles':
				$count  = $this->circles_model->Get(array('count'=>0) );
				if($count > $limit){
					$offset = $count - $limit;
				}
				else{
					$offset = 0;
				}
				$result = $this->circles_model->Get(array('limit' => $limit, 'offset' =>$offset));
				$title  = 'Circle of Strength Circle data';
				break;
			case 'photos':
				$count  = $this->photos_model->Get(array('count'=>0) );
				
				if($count > $limit){
					$offset = $count - $limit;
				}
				else{
					$offset = 0;
				}
				
				$result = $this->photos_model->Get(array('limit' => $limit, 'offset' =>$offset));
				$title  = 'Circle of Strength Photos data';
				break;
		}

		$data['date']		 		= date("Y-m-d H:i:s");
		$data['type']		 		= $type;
		$data['page_title'] 		= $title;
		$data['encoding'] 			= 'ISO-8859-1';
        $data['page_description'] 	= 'Cicrle RSS feed for Feed Magnet';
        $data['url'] 				= base_url();
        $data['items'] 				= $result;
        header("Content-Type: application/rss+xml");
		$this->load->view('feed_magnet_rss_feed_view', $data);
	}

}