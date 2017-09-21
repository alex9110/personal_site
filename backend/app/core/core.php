<?php

//подключение к базе
require_once('db.class.php');
DB::init($user, $password, $dbname, $host);

//роутер
require_once('route.class.php');
Route::init();