<?php
  class Model_Admin{
    public function get_data(){
      $sql = 'SELECT * FROM works';
      $result = DB::get_select($sql);

      if ($result['count'] > 0) {
        return $result['result'];
      }
    }
  }