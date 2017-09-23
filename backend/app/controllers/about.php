<?php
class About{

  public function __construct(){

    require_once('app/models/model_about.php');
    $about = new Model_About;
    $data = $about->get_data();
    $skills = $about->prepare_data($data[0]['skills']);
    
    require_once('app/view/about.php');
  }

}