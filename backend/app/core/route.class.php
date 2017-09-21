<?php
class Route{

  static function init(){
    // echo "<pre>";
    // print_r($_SERVER);
    // echo "<pre>";

    $routes = explode('/', $_SERVER['REQUEST_URI']);
    $controller_name = 'home';
    if (!empty($routes[1])) {
      $controller_name = $routes[1];
    }
   
    $controller_file = strtolower($controller_name).'.php';
    $controller_path = 'app/controllers/'.$controller_file;
  
    if (file_exists($controller_path)) {
      require_once($controller_path);
      new $controller_name;
    }else{
      self::page_404();
    }
  }

  static function page_404(){
    echo ('<h1 style="text-align:center;">Ошибка 404<h1>
      <h2 style="text-align:center;">Страница не найдена<h32>');
  }
  
}  