<?php

class Friends_Model extends BCA_Model
{
	public function Friends_Model()
	{
		$this->table = "friends";
		$this->pk = "id";
    	$this->fields = array(
			'id' 							=> array("shown"=>true, 	"label"=>"Id"),
			'ref_circle_id' 				=> array("shown"=>true, 	"label"=>"Circle Id reference"),
			//'description' 					=> array("shown"=>true, 	"label"=>"Description"),
			'friends_fb_id' 				=> array("shown"=>true, 	"label"=>"User Facebook ID"),
			'friends_name' 					=> array("shown"=>true, 	"label"=>"User name"),
			'friends_photo_url' 			=> array("shown"=>true, 	"label"=>"User photo url")
		);
	}
}

?>