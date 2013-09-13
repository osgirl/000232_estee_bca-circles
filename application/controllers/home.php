<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

	public function index()
	{
		$this->load->view('home_view');
	}
	
	public function twitter_share($url ="", $hashtag_before_url = false, $goal)
	{
		$pt = preg_replace('/_/i','/', $url);
		$pt = preg_replace('/%3F/i','?', $pt);
		$pt = preg_replace('/%5E/i','=', $pt);
		$long_url 	= base_url() . index_page() . '/#' . urldecode($pt);
		$short_url 	= file_get_contents( "https://api-ssl.bitly.com/v3/shorten?access_token=".BITLY_ACCESS_TOKEN."&longUrl=".urlencode($long_url)  );
		$short_url 	= json_decode($short_url);
		$short_url 	= $short_url->data->url;

		$title = preg_replace('/%255E/i',"'", $goal);
		if($hashtag_before_url){
			$title = str_replace('link', $short_url.'', $title);
			$title = str_replace(array('%5B','%5D'), '', $title);
		}
		else{
			//Share with circle message (ie: Circle)
			$title .= " ".$short_url . ' ' .SHARE_HASHTAG;
		}
		header( 'Location: https://twitter.com/intent/tweet?text='.$title);
	}	

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