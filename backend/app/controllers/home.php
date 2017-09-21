<?php
class Home{

  public function __construct(){

    require_once('app/models/model_home.php');
    $class = new Model_Home;
    $works = $class->get_works();

    require_once('app/view/home.php');
  }

}