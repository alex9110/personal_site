<?php

class Elements{

  public  $text = [ 'ru'=>['main'=>'Главная', 'works'=>'Мои работы', 'about'=>'Обо мне', 'blog'=>'Блог', 'copyright_left'=>'Я веб разваботчик, из Хмельницкого, и этот сайт я сделал в рамках одного из обучающих курсов, найденых на просторах интернета.', 'copyright_right'=>'© Александр Лычик | создано с любовью'],

  'en'=>['main'=>'Home', 'works'=>'My works', 'about'=>'About me', 'blog'=>'Blog', 'copyright_left'=>"I'm a web developer, from Khmelnitsky, and I made this site in one of the training courses found on the Internet.", 'copyright_right'=>'© Aleksandr Lychyk | created with love'] ];


  public function get_head($title=''){
    return(
      '<!DOCTYPE html>
      <html lang="ru">
        <head>
          <meta charset="utf-8"/>
          <title>'.$title.'</title>
          <meta content="" name="author"/>
          <meta content="" name="description"/>
          <meta content="" name="keywords"/>
          <meta content="width=device-width, initial-scale=1" name="viewport"/>
          <meta content="ie=edge" http-equiv="x-ua-compatible"/>
          <link rel="stylesheet" href="/assets/css/foundation.css"/>
          <link rel="stylesheet" href="/assets/css/app.css"/><!--[if lt IE 9]>
          <script src="http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script><![endif]-->
        </head>'
    );
  }


  public $preloader ='<div class="loader-wrapper">
      <div class="loader-box">
        <div class="loader">
          <div class="loader__sircle-box"><span class="loader__sircle loader__sircle_one"></span></div>
          <div class="loader__sircle-box"><span class="loader__sircle loader__sircle_two"></span></div>
          <div class="loader__sircle-box"><span class="loader__sircle loader__sircle_three"></span></div><span class="loader__percent">0%</span>
        </div>
      </div>
    </div>';
  
  public $pop_up = '<div class="hidden" id="pop_up"><span id="pop_up-button"></span>
      <div id="pop_up-content">какая то ошибка<br> ещё ошибка</div>
    </div>';

  public function get_svg_sprite(){
    return file_get_contents('assets/img/svg/sprite.svg');
  }


  public $paralax ='<div class="parallax">
        <div class="parallax__layer"></div>
        <div class="parallax__layer"></div>
        <div class="parallax__layer"></div>
        <div class="parallax__layer"></div>
        <div class="parallax__layer"></div>
        <div class="parallax__layer"></div>
      </div>';

  public $paralax_scroll = '<div class="parallax_scroll">
              <div class="parallax__layer"></div>
              <div class="parallax__layer"></div>
              <div class="parallax__layer"></div>
              <div class="parallax__layer"></div>
              <div class="parallax__layer"></div>
              <div class="parallax__layer"></div>
            </div>';

  public function get_curtains ($lang = 'ru'){
    if ($lang == 'undefined') {
      $lang = 'ru';
    }
    return('<div class="curtains">
                  <nav class="main-nav" id="main-nav">
                    <ul class="main-nav-list">
                      <li class="main-nav-list-item"><a href="index.html">'.$this->text[$lang]['main'].'</a></li>
                      <li class="main-nav-list-item"><a href="works.html">'.$this->text[$lang]['works'].'</a></li>
                      <li class="main-nav-list-item"><a href="about.html">'.$this->text[$lang]['about'].'</a></li>
                      <li class="main-nav-list-item"><a href="blog.html">'.$this->text[$lang]['blog'].'</a></li>
                    </ul>
                  </nav>
                  <div class="curtain-left"></div>
                  <div class="curtain-right"></div>
                </div>');
  } 

  public $social_list = '<ul class="social__list">
                  <li class="social__item"><a href="https://www.facebook.com/AleksandrLychyk" target="_blank">
                      <svg>
                        <use xlink:href="#fb_icon"></use>
                      </svg></a></li>
                  <li class="social__item"><a href="https://github.com" target="_blank">
                      <svg>
                        <use xlink:href="#git_icon"></use>
                      </svg></a></li>
                  <li class="social__item"><a href="https://www.linkedin.com" target="_blank">
                      <svg>
                        <use xlink:href="#in_icon"></use>
                      </svg></a></li>
                </ul>';



  public $scripts_connect = '<script src="/assets/js/foundation.js"></script>
  <script src="/assets/js/app.js"></script>';

  public function get_footer($lang = 'ru'){
    if ($lang == 'undefined') {
      $lang = 'ru';
    }
    return('<footer class="footer">
      <div class="arrow-top"><a id="show-works" href="#hidden-link-top">
          <svg>
            <use xlink:href="#arrow_bottom_icon"></use>
          </svg></a></div>
      <div class="footer-box">
        <div class="footer-menu">
          <nav class="footer-nav">
            <ul class="footer-nav__list">
              <li class="footer-nav__item"><a href="index.html">'.$this->text[$lang]['main'].'</a></li>
              <li class="footer-nav__item"> <a href="works.html">'.$this->text[$lang]['works'].'</a></li>
              <li class="footer-nav__item"> <a href="about.html">'.$this->text[$lang]['about'].'</a></li>
              <li class="footer-nav__item"> <a href="blog.html">'.$this->text[$lang]['blog'].'</a></li>
            </ul>
          </nav>
          <div class="footer-social">
            <div class="social social-in-circle">
              '.$this->social_list.'
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="footer-copyright__left">Я веб разваботчик, из Хмельницкого, и этот сайт я сделал в рамках одного из обучающих курсов, найденых на просторах интернета.</div>
          <div class="footer-copyright__right">© Александр Лычик | создано с любовью <span> 2017<span> </div>
        </div>
      </div>
    </footer>');
  }


}
