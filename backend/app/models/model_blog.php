<?php
  class Model_Blog{
    public function get_data(){
      $sql = 'SELECT * FROM blog';
      $result = DB::get_select($sql);

      if ($result['count'] > 0) {
        return $result['result'];
      }
    }
  }