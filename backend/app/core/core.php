<?php

//подключение к базе
require_once('./app/core/db.class.php');
DB::init($user, $password, $dbname, $host);

//роутер
require_once('./app/core/route.class.php');

Route::init();