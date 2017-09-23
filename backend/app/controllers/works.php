<?php
class Works{

  public function __construct(){

    require_once('app/models/model_works.php');
    $class = new Model_Works;
    $works = $class->get_data();

    require_once('app/view/works.php');
  }

}