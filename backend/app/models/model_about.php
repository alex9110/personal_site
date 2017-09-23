<?php
  class Model_About{
    public function get_data(){
      $sql = 'SELECT skills FROM skills';
      $result = DB::get_select($sql);

      if ($result['count'] > 0) {
        return $result['result'];
      }
    }
    //сформирует асоц масив данных ключ названия скила, значение значения скила
    public function prepare_data($str){
      //echo($str);
      $arr = explode("/", $str);
       for ($i=0; count($arr)>$i; $i++){
        $str = trim($arr[$i]);
        $temp = explode(":", $str);
        $new_arr[$temp[0]] = $temp[1];
       }
      return $new_arr;
    }

  }