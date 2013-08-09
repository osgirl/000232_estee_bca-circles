<?php

class Circle_Photos_Model extends BCA_Model
{
	public function Circle_Photos_Model()
	{
		$this->table = "circle_photos";
		$this->pk = "id";
    	$this->fields = array(
			'id' 							=> array("shown"=>true, 	"label"=>"Id"),
			'ref_circle_id' 				=> array("shown"=>true, 	"label"=>"Circle Id reference"),
			'description' 					=> array("shown"=>true, 	"label"=>"Description"),
			'filename' 						=> array("shown"=>true, 	"label"=>"Filename"),
			'users_fb_id' 					=> array("shown"=>true, 	"label"=>"User Facebook ID")
		);
	}
}

?>