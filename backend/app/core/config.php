<?php
  //уровень отображения ошибок
  error_reporting(E_ALL);

  //подключение к базе
  $user = 'root';
  $password = '';
  $dbname = 'personal_db';
  $host = 'localhost';
  
  $photo_works_folder = 'assets/img/works_image/'; //папака с фотками работ
  
  $email_for_smtp = 'some@gmail.com'; // почтовыйящик с которого будет отправляться сообщение
  $email_smtp_pas = 'secret';         // пароль от почтового ящика 
  $my_mail = 'my@gmail.com';          // почтовыйящик на который будет отправляться сообщение

  if (!defined('DOMAN')) {
    define('DOMAIN', $_SERVER['HTTP_HOST']);
  }