<?php

class Queries{
  
  public function __construct(){
    require_once('app/models/model_queries.php');
    $this->check_data();
  }


  private function check_data(){
    $queries = new Model_Queries;
    $data = $_POST;
    $files = $_FILES;

    if ( !empty($files) ) {
      $result = $queries->save_work($files, $data);
      echo( json_encode($result) );
      return;
    }

    if ( !empty($data) ) {
      $formId = $data['formId'];
      if ($formId === 'admin-about-me') {
        $result = $queries->save_skills($data['data']);
        echo( json_encode($result) );  
      }
      if ($formId === 'admin-blog') {
        $result = $queries->save_article($data['data']);
        echo( json_encode($result) );
      }
      if ($formId === 'contact-form') {
        $result = $queries->save_message($data['data']);
        echo( json_encode($result) );
      }
      return;
    }
    
  }
  
}
