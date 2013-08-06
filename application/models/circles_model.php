<?php

class Circles_Model extends BCA_Model
{
	public function Circles_Model()
	{
		$this->table = "circles";
		$this->pk = "id";
    	$this->fields = array(
			'id' 							=> array("shown"=>true, 	"label"=>"Id"),
			'users_fb_id' 					=> array("shown"=>true, 	"label"=>"User Facebook ID"),
			'users_name'					=> array("shown"=>true, 	"label"=>"User's name"),
			'users_photo_url'				=> array("shown"=>true, 	"label"=>"User's Profile Photo"),
			'goal'							=> array("shown"=>true, 	"label"=>"Goal"),
			'date'							=> array("shown"=>true, 	"label"=>"Date & time"),
			'language'						=> array("shown"=>true, 	"label"=>"Language")
		);
	}
}

?>