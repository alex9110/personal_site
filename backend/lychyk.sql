-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 03 2017 г., 01:31
-- Версия сервера: 5.5.50
-- Версия PHP: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `personal_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `admins`
--

CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(5) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `admins`
--

INSERT INTO `admins` (`id`, `login`, `password`) VALUES
(1, 'admin', 'secret');

-- --------------------------------------------------------

--
-- Структура таблицы `blog`
--

CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(10) NOT NULL,
  `title` varchar(200) NOT NULL,
  `data` varchar(100) NOT NULL,
  `article` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `blog`
--

INSERT INTO `blog` (`id`, `title`, `data`, `article`) VALUES
(1, 'Самое важное В sass', '22 ноября 2016', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam accusantium, at repellendus explicabo vero necessitatibus eligendi placeat, delectus voluptates inventore, beatae ducimus repudiandae! Ut quae necessitatibus rem vitae culpa beatae, vel nulla dignissimos, aspernatur officiis dolore placeat. Exercitationem impedit eius temporibus accusantium cupiditate odio, doloremque dolor architecto. Esse fuga excepturi, neque praesentium cum harum amet omnis. Distinctio laborum quas non, nihil quia, rerum vitae aliquam laudantium temporibus modi, nobis iste sequi\nmaxime. Laboriosam veritatis fuga quis. Ipsum voluptatem voluptates impedit aperiam totam consequuntur pariatur natus similique nisi id voluptas, fugiat aliquam quae! Accusamus consequatur obcaecati ipsum minus, excepturi. Soluta, fugit!</p>'),
(2, 'Приемы в верстке, без которы не обходится ни один сайт', '10 ноября 2016', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente odit eum vel quam inventore et voluptatum accusamus amet cum sunt soluta cumque numquam blanditiis quos, possimus itaque expedita perferendis illum tempore exercitationem debitis ullam. Reiciendis eligendi sint tempora at ab dolores modi sapiente cum doloremque incidunt, facilis tempore sequi quibusdam veritatis iusto tenetur qui, vitae pariatur, hic sed optio aliquam officia deleniti inventore voluptate. Explicabo dicta esse voluptate deserunt quo enim! Atque distinctio quisquam incidunt, numquam illo consectetur perferendis inventore, mollitia cupiditate suscipit ratione, veniam officiis rerum corrupti animi. Ratione culpa officia illo quod. Quae magni iusto esse at tempora perferendis voluptatem voluptates perspiciatis fuga omnis ipsam praesentium id aliquam eligendi laborum adipisci ut impedit et sit quaerat neque doloribus quidem, saepe, explicabo! Sint eaque nulla quo sequi minima accusamus nesciunt porro quaerat</p>\r\n\r\n<p>facilis soluta, dignissimos quis aut amet. Molestias, obcaecati nostrum hic eius labore perspiciatis fugit ab eligendi doloremque eaque atque aspernatur cum provident unde cupiditate? Nisi perferendis fugit explicabo, voluptates eum error harum sit dolorem, sint soluta alias magni earum repudiandae similique hic inventore! Modi dolorem a ut, temporibus eveniet officiis dolores omnis deserunt cumque. Enim nihil natus, pariatur ratione minima illo ex quam incidunt quos aspernatur voluptatum quis explicabo eos, asperiores. Totam atque, nostrum ipsum tempora, odit adipisci magni deleniti ab, laudantium impedit sed explicabo sapiente sunt consequuntur neque dolorem omnis ut ipsa odio hic fugiat cumque eos et. Facere ratione molestiae explicabo labore ab architecto nobis quo animi perspiciatis officia totam autem distinctio deleniti quaerat repellendus reiciendis nisi at, unde corporis, dignissimos eveniet assumenda. Possimus modi nihil quo cupiditate ipsa nostrum dolorum alias fugit cum excepturi nisi distinctio incidunt, aperiam nam neque ut iusto eligendi, iure nesciunt. Est necessitatibus, cum officia quos ipsam error. Voluptates natus quam cumque corporis cupiditate ut voluptatibus illo rerum eius quaerat.</p>'),
(3, 'Самый необходимый набор Gulp Плагинов', '5 сентября 2016', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, iure rem, vero commodi ab sequi alias illum tempora tempore possimus voluptas mollitia minima quisquam omnis, debitis quas quam! Quisquam enim accusamus suscipit sed adipisci culpa, quaerat corporis neque temporibus impedit repellendus atque minus explicabo, magni sequi. Autem tempora maxime omnis repellat enim a sit exercitationem, repellendus ad at dolorum veniam vel blanditiis pariatur consequuntur, non porro dolorem voluptatum eius labore! Harum facere quasi qui commodi beatae iste porro consequatur voluptatibus?\nRatione alias ex repudiandae quia omnis tenetur, ullam dolore id illum in, tempore inventore optio iusto corrupti nam error? Possimus architecto minus quas. Ratione dolores totam, possimus sunt ex, placeat reprehenderit iure. Eligendi nulla, delectus temporibus mollitia! Tempore voluptates a, eligendi delectus excepturi, necessitatibus ipsam omnis. Veritatis rerum eos vel! Molestias minus odit, dicta consequuntur neque cum enim porro excepturi voluptas, nihil, quia fugiat doloribus deserunt reiciendis quaerat possimus. Est.</p>');

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(9) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'awaiting'
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `skills`
--

CREATE TABLE IF NOT EXISTS `skills` (
  `id` int(5) NOT NULL,
  `skills` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `skills`
--

INSERT INTO `skills` (`id`, `skills`) VALUES
(1, 'html:90/css:90/JavaScript:91/php:90/mysql:91/node_npm:91/git:91/gulp:91/bower:91');

-- --------------------------------------------------------

--
-- Структура таблицы `works`
--

CREATE TABLE IF NOT EXISTS `works` (
  `id` int(10) NOT NULL,
  `image_src` varchar(100) NOT NULL,
  `title_ru` varchar(200) NOT NULL,
  `title_en` varchar(200) NOT NULL,
  `technologies` varchar(200) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `works`
--

INSERT INTO `works` (`id`, `image_src`, `title_ru`, `title_en`, `technologies`, `url`) VALUES
(1, 'work_1.png', 'Сайт школы онлайн образования', 'Online school website', 'html, css, javascript', 'https://www.facebook.com/AleksandrLychyk'),
(3, 'work_2.png', 'Сайт круче первого номер 2', 'The site is steeper than the first number 2', 'html html html', 'https://www.facebook.com/AleksandrLychyk'),
(4, 'work_0.jpg', 'Интернет магазин ', 'Online shop', 'jquery jquery jquery', 'https://www.facebook.com/AleksandrLychyk');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT для таблицы `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `works`
--
ALTER TABLE `works`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
