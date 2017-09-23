<?php
class Blog{

  public function __construct(){

    require_once('app/models/model_blog.php');
    $class = new Model_Blog;
    $articles = $class->get_data();

    require_once('app/view/blog.php');
  }

}