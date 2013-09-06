<?php

class Goals_Model extends BCA_Model
{
	public function Goals_Model()
	{
		$this->table = "goals";
		$this->pk = "id";
    	$this->goal = array(
			'id' 							=> array("shown"=>true, 	"label"=>"Id"),
			'goal' 							=> array("shown"=>true, 	"label"=>"Circle Goal"),
			'taken_number'					=> array("shown"=>true, 	"label"=>"Goal Taken Number"),
			'goal_type'						=> array("shown"=>true, 	"label"=>"Goal Type")
		);
	}
}

?>