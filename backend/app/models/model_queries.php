<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'app/core/config.php';

  class Model_Queries{

    public function сhange_language($lang){
      $_SESSION['lang'] = $lang;
      header('Location: '.$_SESSION['current_page']);
    }

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
        $data = [':skills'=>$skills];
      }
      $sql = "UPDATE skills SET skills = :skills WHERE id=1";
      $result = DB::set_data($sql, $data);
      return($result);
    }


    public function save_article($arr){
      $title =   ($arr[0][1] != '')? $arr[0][1] : 'title';
      $curr_date =    ($arr[1][1] != '')? $arr[1][1] : date("d F y");
      $article = ($arr[2][1] != '')? $arr[2][1] : 'article';

      $data = [':title'=>$title, ':curr_date'=>$curr_date, ':article'=>$article];

      $sql = 'INSERT INTO blog (title, data, article) VALUES (:title, :curr_date, :article )';
      $result = DB::set_data($sql, $data);
      return($result);
    }


    public function save_work($files, $data){
      // в данном случае прилетает JSON фаил который лежит в массиве $data
      // поэтому приведем его в нужный вид, а именно сделаем из него обычний ассоц массив 
      $data_to_string = implode ( $data );
      $data_to_array =  json_decode($data_to_string, true);
      $arr = $data_to_array['data'];


      $title =        ($arr[0][1] != '')? $arr[0][1] : 'title_ru/title_en';
      $technologies = ($arr[1][1] != '')? $arr[1][1] : 'technologies';
      $url =          ($arr[2][1] != '')? $arr[2][1] : 'https://www.facebook.com/AleksandrLychyk';

      //разделим русское и английское названия проекта
      $title_arr = explode("/", $title);
      $title_ru = $title_arr[0];
      $title_en = end($title_arr);

      $result = $this->save_title_image($files);
      
      if ($result != false) {
        
        $data_arr = [':image_src'=>$result, ':title_ru'=>$title_ru, 'title_en'=>$title_en, ':technologies'=>$technologies, ':url'=>$url];

        $sql = 'INSERT INTO works (image_src, title_ru, title_en, technologies, url) VALUES (:image_src, :title_ru, :title_en, :technologies, :url)';
        $result = DB::set_data($sql, $data_arr);
        
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


    public function save_message($arr){
      $name =    $arr[0][1];
      $email =   $arr[1][1];
      $message = $arr[2][1];

      $data = [':name'=>$name, ':email'=>$email, ':message'=>$message];

      $sql = "INSERT INTO messages (name, email, message) VALUES (:name, :email, :message)";
      $result = DB::set_data($sql, $data);
      if ($result) {
        $sending_result = $this->send_email($name, $email, $message);
        //если true отправка удалась, пойти в базу пометить сообщение как отправленое если нет попробовать отправить еще раз черес время
      }
      return $result;
    }


    public function send_email($name, $email, $message){
      if ($name && $email && $message) {
        global $my_mail, $email_for_smtp, $email_smtp_pas;
       
        require './lib/PHPMailer/src/PHPMailer.php';
        require './lib/PHPMailer/src/SMTP.php';
        require './lib/PHPMailer/src/Exception.php';

        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
        try {
            //Server settings
            //mail->SMTPDebug = 2;                                 // Enable verbose debug output
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = $email_for_smtp;                 // SMTP username
            $mail->Password = $email_smtp_pas;                           // SMTP password
            $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 465;                                    // TCP port to connect to

            // //Recipients
            $mail->setFrom($email_for_smtp, 'My email robot');
            $mail->addAddress($my_mail, '');     // Add a recipient
            //$mail->addAddress('ellen@example.com');               // Name is optional
            // $mail->addReplyTo('info@example.com', 'Information');
            // $mail->addCC('cc@example.com');
            // $mail->addBCC('bcc@example.com');

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

            //Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'My site';
            $mail->Body    = $name.' </br>'.$email.' </br>'.$message.' </b>';
           // $mail->AltBody = $message;

            $mail->send();
            return true;

        } catch (Exception $e) {
            return false;
            //return $mail->ErrorInfo;
        }

        return $my_mail;
      }else{
        return false;
      }
    }

  }

