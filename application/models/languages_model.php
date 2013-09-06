<?php

class Languages_Model extends BCA_Model
{
	public function Languages_Model()
	{
		$this->table = "languages";
		$this->pk = "language_id";
    	$this->fields = array(
			'language_id' 					=> array("shown"=>true, 	"label"=>"language Id"),
			"en-us" 						=> array("shown"=>true, 	"label"=>"English US"), 
			"en-uk" 						=> array("shown"=>true, 	"label"=>"English UK"), 
			"ar" 							=> array("shown"=>true, 	"label"=>"Arabic"), 
			"es-mx" 						=> array("shown"=>true, 	"label"=>"Spanish MX"), 
			"es" 							=> array("shown"=>true, 	"label"=>"Spanish"), 
			"fr" 							=> array("shown"=>true, 	"label"=>"French"), 
			"de" 							=> array("shown"=>true, 	"label"=>"German"), 
			"ko" 							=> array("shown"=>true, 	"label"=>"Korean"), 
			"el" 							=> array("shown"=>true, 	"label"=>"Greek"), 
			"he" 							=> array("shown"=>true, 	"label"=>"Hebrew"), 
			"cn" 							=> array("shown"=>true, 	"label"=>"Chinese"), 
			"it" 							=> array("shown"=>true, 	"label"=>"Italian"), 
			"pt" 							=> array("shown"=>true, 	"label"=>"Portuguese"), 
			"ru" 							=> array("shown"=>true, 	"label"=>"Russian"), 
			"zh" 							=> array("shown"=>true, 	"label"=>"Chinese"), 
			"tr" 							=> array("shown"=>true, 	"label"=>"Turkish"),
			"vi" 							=> array("shown"=>true, 	"label"=>"Vietnamese")
		);
	}
}

?>