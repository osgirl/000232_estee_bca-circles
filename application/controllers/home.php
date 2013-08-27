<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
		$this->load->view('home_view');
	}

	public function twitter_share($url ="", $goal = "")
	{
		$pt = preg_replace('/_/i','/', $url);
		$pt = preg_replace('/~/i','?', $pt);
		$pt = preg_replace('/%5E/i','=', $pt);
		$long_url 	= base_url() . index_page() . '/#' . $pt;

		$short_url 	= file_get_contents( "https://api-ssl.bitly.com/v3/shorten?access_token=".BITLY_ACCESS_TOKEN."&longUrl=".urlencode($long_url)  );
		$short_url 	= json_decode($short_url);
		$short_url 	= $short_url->data->url;

		$title 	 	= $goal;
		$title 		= $title." ".$short_url;

		header( 'Location: https://twitter.com/intent/tweet?text='.$title );
	}
}