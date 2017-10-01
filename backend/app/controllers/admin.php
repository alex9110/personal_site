<?php
class Admin{

  public function __construct(){

    require_once('app/models/model_admin.php');
    require_once('app/models/model_about.php');
    $admin = new Model_Admin;
    $about = new Model_About;
    
    $test = $admin->user_test($_POST);
    if (!$test) {exit;}

    $data = $about->get_data();
    $skills = $about->prepare_data($data[0]['skills']);

    require_once('app/view/admin.php');
  }

}