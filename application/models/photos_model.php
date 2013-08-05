<?php

class Photos_Model extends BCA_Model
{
	public function Photos_Model()
	{
		$this->table = "photos";
		$this->pk = "id";
    	$this->fields = array(
			'id' 							=> array("shown"=>true, 	"label"=>"Id"),
			'description'					=> array("shown"=>true, 	"label"=>"Description"),
			'filename' 						=> array("shown"=>true, 	"label"=>"Filename"),
			'date'							=> array("shown"=>true, 	"label"=>"Date & time")
		);
	}
}

?>