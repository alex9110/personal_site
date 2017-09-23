<?php
class Route{

  static function init(){
    // echo "<pre>";
    // print_r($_SERVER);
    // echo "<pre>";
    
    $arr = array();
    $arr = explode('/', $_SERVER['REQUEST_URI']);
    $routes = end($arr);
   
    $controller_name = 'home';

    if ( !empty($routes) ) {
      $arr = explode(".", $routes);                  //дробим имя на масив регулируемся точкой
      $controller_name = $arr[0];                    //теперь и не важно какое расширения файла запросить .php или .html
    
      if ($controller_name === 'index') {
        $controller_name = 'home';
      }
  
    }
   
    $controller_file = strtolower($controller_name).'.php';
    $controller_path = 'app/controllers/'.$controller_file;
    
    // echo getcwd();
    // $files = scandir('./');
    // echo "<pre>";
    // print_r($files);
    // echo "<pre>";
  
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