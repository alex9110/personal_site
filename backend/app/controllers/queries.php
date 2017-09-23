<?php

class Queries{
  public function __construct(){
    
    require_once('app/models/model_queries.php');
    

    //$data = $queries->get_data();
    //require_once('app/view/admin.php');

    $this->check_data();
  }
  private function check_data(){
    $data = $_POST;

    if ($data['formId'] === "admin-about-me") {
      $queries = new Model_Queries;
      $result = $queries->save_skills($data['data']);
      echo( json_encode($result));  
    }
  }
  
}
