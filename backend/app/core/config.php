<?php
  //уровень отображения ошибок
  error_reporting(E_ALL);

  //подключение к базе
  $user = 'root';
  $password = '';
  $dbname = 'personal_db';
  $host = 'localhost';
  $photo_works_folder = 'assets/img/works_image/';

  if (!defined('DOMAN')) {
    define('DOMAIN', $_SERVER['HTTP_HOST']);
  }