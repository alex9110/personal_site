<?php
  //уровень отображения ошибок
  error_reporting(E_ALL);

  //подключение к базе
  $user = 'root';
  $password = '';
  $dbname = 'personal_db';
  $host = 'localhost';

  if (!defined('DOMAN')) {
    define('DOMAIN', $_SERVER['HTTP_HOST']);
  }