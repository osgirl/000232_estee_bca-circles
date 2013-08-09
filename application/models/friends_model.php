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
			'description' 					=> array("shown"=>true, 	"label"=>"Description"),
			'users_fb_id' 					=> array("shown"=>true, 	"label"=>"User Facebook ID")
			'user_name' 					=> array("shown"=>true, 	"label"=>"User name"),
		);
	}
}

?>