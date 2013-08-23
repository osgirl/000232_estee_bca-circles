<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('home_view');
	}

	public function twitter_share($category = "", $id = "", $goal = "")
	{
		$long_url 	= base_url().( $id != "" ? "#".$category."/".$id : "" );
		
		$short_url 	= $this->getbitly($long_url);

		$title 	 	= SHARE_TITLE." ".SHARE_CAPTION;
		$title 		= str_replace("[GOAL]", $goal, $title )." ".$short_url;

		header( 'Location: https://twitter.com/intent/tweet?text='.$title );
	}

	public function getbitly($long_url){
		$ch = curl_init();
	 
	    curl_setopt($ch, CURLOPT_URL, "https://api-ssl.bitly.com/v3/shorten?access_token=".BITLY_ACCESS_TOKEN."&longUrl=".$long_url );
	    curl_setopt($ch, CURLOPT_REFERER, base_url());
	    curl_setopt($ch, CURLOPT_HEADER, 0);
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	 
	    $output = curl_exec($ch);
	    $output = json_decode($output);
		$output	= $output->data->url;
	 
	    curl_close($ch);

	    return $output;
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */