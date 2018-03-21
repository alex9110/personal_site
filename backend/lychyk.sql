-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 21 2018 г., 21:56
-- Версия сервера: 10.0.32-MariaDB-0+deb8u1
-- Версия PHP: 7.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lychyk`
--

-- --------------------------------------------------------

--
-- Структура таблицы `admins`
--

CREATE TABLE `admins` (
  `id` int(5) NOT NULL,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `admins`
--

INSERT INTO `admins` (`id`, `login`, `password`) VALUES
(1, 'admin', 'secret');

-- --------------------------------------------------------

--
-- Структура таблицы `blog`
--

CREATE TABLE `blog` (
  `id` int(10) NOT NULL,
  `title` varchar(200) NOT NULL,
  `data` varchar(100) NOT NULL,
  `article` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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

CREATE TABLE `messages` (
  `id` int(9) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'awaiting'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `message`, `status`) VALUES
(26, 'G', 's@mail.com', 'Ggg', 'awaiting'),
(25, 'Санька', 'x@mail.ru', 'Привет, мне нужен сайт', 'awaiting'),
(27, 'G', 's@mail.com', 'Ggg', 'awaiting'),
(28, 'G', 's@mail.com', 'Ggg', 'awaiting'),
(29, 'G', 's@mail.com', 'Ggg', 'awaiting'),
(30, 'G', 's@mail.com', 'Ggg', 'awaiting'),
(31, 'Александр Лычик', 'cania9110@gmail.com', 'тест', 'awaiting'),
(32, 'Александр Лычик', 'cania9110@gmail.com', 'hay is a test', 'awaiting'),
(33, 'Анжела', 'anzelka122@gmail.com', 'Привіт', 'awaiting'),
(43, 'Саня', 'lychyk9110@gmail.com', 'тест после замены пароля', 'awaiting'),
(35, 'Санька', 'cania9110@gmail.com', 'http://contactcenterkiev.com/?page_id=884&lang=ru', 'awaiting'),
(36, 'Александр Лычик', 'cania9110@gmail.com', 'тест тест тест', 'awaiting'),
(37, 'Александр Лычик', 'cania9110@gmail.com', 'https://rabota.ua/company2870159/vacancy6936898', 'awaiting'),
(38, 'Саня', 'cania9110@gmail.com', 'Привет это просто тест)))', 'awaiting'),
(39, 'Test', 'lychyk@gmail.com', 'https://www.facebook.com/serafima.litvinova?ref=br_rs', 'awaiting'),
(40, 'test', 'test@mail.ru', 'test', 'awaiting'),
(41, 'Alex', 'cania9110@gmail.com', 'Проверка связи', 'awaiting'),
(42, 'Vasia', 'secret@gmail.com', 'Test', 'awaiting');

-- --------------------------------------------------------

--
-- Структура таблицы `skills`
--

CREATE TABLE `skills` (
  `id` int(5) NOT NULL,
  `skills` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `skills`
--

INSERT INTO `skills` (`id`, `skills`) VALUES
(1, 'html:95/css:95/JavaScript:80/php:40/mysql:40/node_npm:40/git:60/gulp:65/bower:85');

-- --------------------------------------------------------

--
-- Структура таблицы `works`
--

CREATE TABLE `works` (
  `id` int(10) NOT NULL,
  `image_src` varchar(100) NOT NULL,
  `title_ru` varchar(200) NOT NULL,
  `title_en` varchar(200) NOT NULL,
  `technologies` varchar(200) NOT NULL,
  `url` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `works`
--

INSERT INTO `works` (`id`, `image_src`, `title_ru`, `title_en`, `technologies`, `url`) VALUES
(9, 'work59d68b5cb7050.png', 'Страничка фитнес клуба', 'Fitness club page', 'html5 css3 jquery', 'https://alex9110.github.io/fitness/'),
(8, 'work59d688d0905c3.png', 'целевая страница продажы автомобильных ковриков', 'landing page sales of car mats', 'html5 scc3', 'https://alex9110.github.io/car.mats.lok/'),
(1, 'work59d3df7cbd1fc.png', 'сайт + cms портфолио фотографа', 'site + cms photographer portfolio', 'JQUERY AJAX PHP MYSQL', 'http://h-nazarenko.ru/'),
(10, 'work59ff33e6d928b.png', 'Photo wall', 'Photo wall', 'gulp sass java script & jquery', 'https://alex9110.github.io/photo_wall/'),
(11, 'work59ff34eda0d69.png', 'Landing page', 'Landing page', 'html5 css3', 'https://alex9110.github.io/landing_panto_max/'),
(15, 'work59ff35a71e76d.png', 'water smile', 'water smile', 'html5 css3 gulp sass', 'https://alex9110.github.io/water_smile/'),
(3, 'work5a709d77828f3.png', 'Landing Page Imira', 'Landing Page Imira', 'pug scss gulp bower', 'https://alex9110.github.io/imira/'),
(2, 'work5a70a6dbd6aca.png', 'Landing Page Inflamaya', 'Landing Page Inflamaya', 'html5 css3 java script', 'https://alex9110.github.io/inflamaya/'),
(16, 'work5a70a77a4274f.png', 'Landing Page CallCenter', 'Landing Page CallCenter', 'pag sass java script', 'https://alex9110.github.io/cont_c/');

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
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT для таблицы `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `works`
--
ALTER TABLE `works`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
