<?php
  class Model_Queries{
    public function get_data(){
      $sql = 'SELECT * FROM works';
      $result = DB::get_select($sql);

      if ($result['count'] > 0) {
        return $result['result'];
      }
    }
    public function save_skills($arr){
      $skills = '';
      for($i=0; count($arr)>$i; $i++){
        $skills.=$arr[$i][0].$arr[$i][1];
      }
      $sql = "UPDATE skills SET skills='$skills' WHERE id=2";
      $result = DB::set_data($sql);
      return(json_encode($result));
      //return($sql);
    }
  }

