<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
		$this->load->view('home_view');
	}

	/*
	public function twitter_share($url ="", $goal, $hashtag_before_url = false)
	{
		$pt = preg_replace('/_/i','/', $url);
		$pt = preg_replace('/%3F/i','?', $pt);
		$pt = preg_replace('/%5E/i','=', $pt);
		$long_url 	= base_url() . index_page() . '/#' . urldecode($pt);

		$short_url 	= file_get_contents( "https://api-ssl.bitly.com/v3/shorten?access_token=".BITLY_ACCESS_TOKEN."&longUrl=".urlencode($long_url)  );
		$short_url 	= json_decode($short_url);
		$short_url 	= $short_url->data->url;

		$title 	 	= $goal;
		if($hashtag_before_url){
			$title = $title." ".$short_url . " " .SHARE_HASHTAG;
		}
		else{
			$title = $title." ".SHARE_HASHTAG." ".$short_url;
		}
		echo 'test';
		print_r($goal);
		echo $title;
		header( 'Location: https://twitter.com/intent/tweet?text='.$title  );
	}
	*/

	public function bitly_url($url)
	{
		$pt = preg_replace('/_/i','/', $url);
		$pt = preg_replace('/%3F/i','?', $pt);
		$pt = preg_replace('/%5E/i','=', $pt);
		$long_url 	= base_url() . index_page() . '/#' . urldecode($pt);		
		$short_url 	= file_get_contents( "https://api-ssl.bitly.com/v3/shorten?access_token=".BITLY_ACCESS_TOKEN."&longUrl=".urlencode($long_url)  );
		$short_url 	= json_decode($short_url);
		$short_url 	= $short_url->data->url;
		echo $short_url;
	}
}