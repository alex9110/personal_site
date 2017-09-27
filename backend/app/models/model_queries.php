<?php
require_once 'app/core/config.php';

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
      $delimiter = '/';
      $arr_length = count($arr);
      for($i=0; $arr_length>$i; $i++){
        $key = $arr[$i][0];
        $val = $arr[$i][1];
        if ($val > 100) {$val = 100;}
        //после последего елемента не ставить флеш
        if($arr_length-$i <= 1 ){$delimiter = '';}
        $skills .= $key.':'.$val.$delimiter;
      }
      $sql = "UPDATE skills SET skills='$skills' WHERE id=1";
      $result = DB::set_data($sql);
      return($result);
    }


    public function save_article($arr){
      $title =   ($arr[0][1] != '')? $arr[0][1] : 'title';
      $data =    ($arr[1][1] != '')? $arr[1][1] : date("d F y");
      $article = ($arr[2][1] != '')? $arr[2][1] : 'article';

      $sql = "INSERT INTO blog (title, data, article) VALUES ('$title', '$data', '$article')";
      $result = DB::set_data($sql);
      return($result);
    }


    public function save_work($files, $data){
      // в данном случае прилетает JSON фаил который лежит в массиве $data
      // поэтому приведем его в нужный вид, а именно сделаем из него обычний ассоц массив 
      $data_to_string = implode ( $data );
      $data_to_array =  json_decode($data_to_string, true);
      $arr = $data_to_array['data'];

      $title =        ($arr[0][1] != '')? $arr[0][1] : 'title';
      $technologies = ($arr[1][1] != '')? $arr[1][1] : 'technologies';
      $url =          ($arr[2][1] != '')? $arr[2][1] : 'https://www.facebook.com/AleksandrLychyk';

      $result = $this->save_title_image($files);
      
      if ($result != false) {
        $img_name = $result;
        $sql = "INSERT INTO works (image_src, title, technologies, url) VALUES ('$img_name', '$title', '$technologies', '$url')";
        $result = DB::set_data($sql);
        return($result);
      }
      return $result;
    }


    public function save_title_image($files){
      global $photo_works_folder;
      $path = $photo_works_folder;
      $error = false;
      
      // Создадим папку если её нет
      if( ! is_dir( $path ) ) mkdir( $path, 0777 );
      $file = 0;
      // переместим файлы из временной директории в указанную
      foreach( $files as $file ){
        $new_name = $this->rename_image($file['name']);   //получим новое имя для фото
        if( move_uploaded_file( $file['tmp_name'], $path . $new_name ) ){}
        else{$error = true;}
        //сохраним только первое изображение
        break;   
      }
      $result = ($error)? false:$new_name;
      return $result;
    }


    public function rename_image($old_name){
      if ($old_name !="") {
        //узнаем расширение файла, картинки
        $arr = array();                                   
        $arr = explode(".", $old_name);    //дробим имя на масив регулируемся точкой
        $file_extension = ".".end($arr);   //лепим точку и берём последний елемент теперь имеем разширение файла
      }

      $random_name = uniqid('work');          //генерируем случайное имя
      $new_name = $random_name.$file_extension;
      return $new_name;
    }

  }

