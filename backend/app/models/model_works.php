<?php
  class Model_Works{
    public function get_data(){
      $sql = 'SELECT image_src, title, technologies, url FROM works ORDER BY id ASC';
      $result = DB::get_select($sql);

      if ($result['count'] > 0) {
        return $result['result'];
      }
    }
  }