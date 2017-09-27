<?php

class Queries{
  public function __construct(){
    
    require_once('app/models/model_queries.php');
    

    //$data = $queries->get_data();
    //require_once('app/view/admin.php');

    $this->check_data();
  }
  private function check_data(){
    $queries = new Model_Queries;
    $data = $_POST;
    $files = $_FILES;

    if (isset($files[0]) ) {
      $result = $queries->save_work($files, $data);
      echo( json_encode($result) );
      return;
    }

    if (isset($data['formId']) ) {  
      if ($data['formId'] === 'admin-about-me') {
        $result = $queries->save_skills($data['data']);
        echo( json_encode($result) );  
      }
      if ($data['formId'] === 'admin-blog') {
        $result = $queries->save_article($data['data']);
        echo( json_encode($result) );
      }
      return;
    }
    
  }
  
}
