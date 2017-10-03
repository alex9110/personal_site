<?php
  class Model_Admin{

    public function user_test($arr){

      @$login = $arr['login'];
      @$pas = $arr['pas'];

      //если чувак залогинен как админ и он не пытаеться войти через форму
      if (@$_SESSION['id'] === 'admin' && empty($login) && empty($pas) ) {
        return true;
      }
      //если пытаеться отправить данные проверим что он вводит и решим что с ним делеть
      $data = [':login'=>$login, ':password'=>$pas];

      $sql = 'SELECT * FROM admins WHERE login = :login AND password = :password ';
      $result = DB::get_select($sql, $data);

      if ($result['count'] === 1) {
        $_SESSION['id'] = 'admin';
        return true;  
      }else{
        $_SESSION['id'] = 'user';
        header('Location: index.php');
        return false;
      }
      
    }
  }