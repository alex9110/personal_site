<?php 
  require_once 'view_elements/elements.class.php';
  
  $elements = new Elements();
  echo ( $elements->get_head('Works') );
  echo $elements->get_svg_sprite();
  
  global $lang;
  $work_title = ($lang === 'en')? 'title_en':'title_ru';


  $text =['ru'=>['autor_name'=>'Александр Лычик','autor_description'=>'Личный сайт веб разработчика', 'works'=>'Мои работы','description_botton'=>'Посмотреть сайт', 'form__header'=>'Связаться со мной', 'placeholder_name'=>'Имя', 'placeholder_mail'=>'Email','placeholder_message'=>'Ваше сообщение', 'button_send'=>'Отправить', 'button_clear'=>'Очистить'], 
  'en'=>['autor_name'=>'Aleksandr Lychyk','autor_description'=>'Personal website of the developer', 'works'=>'My works', 'description_botton'=>'View website', 'form__header'=>'Contact with me', 'placeholder_name'=>'Name', 'placeholder_mail'=>'Email', 'placeholder_message'=>'Your message', 'button_send'=>'Send', 'button_clear'=>'Clear']];
 ?>
  <body>
      <?php
        echo $elements->preloader;
        echo $elements->pop_up;
      ?>
    <div class="works-wrapper">
      <form class="language_but vertical" action="queries.php" method="post">
        <input type="submit" value="en" name="lang">
        <input type="submit" value="ru" name="lang">
      </form>
      <section class="section-header"><a id="hidden-link-top" name="hidden-link-top"></a>
        <header class="portfolio_header">
          <?php echo $elements->get_curtains($lang); ?>
          <div class="portfolio_header_bg">
            <?php echo $elements->paralax_scroll ?>
            <div class="portfolio_header_bg1"></div>
          </div>
          <div class="social social-white">
            <?php echo $elements->social_list ?>
          </div>
          <div class="menu-button" id="menu-button"><span></span><span></span><span></span></div>
          <div class="index-content">
            <div class="index-content-box">
              <div class="index-content-main index-content-main_transparent">
                <div class="ava ava_bigger"><img class="ava__img" src="/assets/img/ava.jpg" alt="avatar"/></div>
                <div class="autor">
                  <h1 class="autor__name"><?php echo $text[$lang]['autor_name']; ?></h1>
                  <h3 class="autor__description"><?php echo $text[$lang]['autor_description']; ?></h3>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="arrow-down"><a id="show-works" href="#second-section">
            <svg>
              <use xlink:href="#arrow_down_icon"></use>
            </svg></a></div>
      </section><a id="second-section" name="second-section"></a>
      <section class="section-works">
        <section class="section-works__title">
          <h2><?php echo $text[$lang]['works']; ?></h2>
        </section>
        <div class="works-box">
          <div class="work-description">
            <div class="work-description-box">
              <div class="work-description__title">
                <h2 class="animateText">Work title</h2>
              </div>
              <div class="work-description__technologies">
                <p class="animateText">description technologies</p>
              </div>
              <div class="work-description__botton"><?php echo $text[$lang]['description_botton']; ?><a href="#"></a>
                <svg>
                  <use xlink:href="#link_icon"></use>
                </svg>
              </div>
            </div>
          </div>
          <div class="slider">
            <div class="slider__image-box">
              <ul class="slider__images-list">
                <?php 
                  for($i=0; count($works)>$i; $i++){

                    echo('<li class="slider__images-item">
                  <div class="slider__image-description">
                    <h2>'.$works[$i][$work_title].'</h2>
                    <p>'.$works[$i]['technologies'].'</p>
                    <a href="'.$works[$i]['url'].'" target="_blank"></a>
                  </div>
                  <img src="/assets/img/works_image/'.$works[$i]['image_src'].'"alt="image"/>
                </li>');

                  } ?>
              </ul>
            </div>
            <div class="slider__buttons">
              <div class="slider__buttons-bottom">
                <ul class="slider__bottom-preview">
                  <?php 
                    echo('<li><img src="/assets/img/works_image/'.$works[count($works)-1]['image_src'].'" alt="image"/></li>
                  <li><img src="/assets/img/works_image/'.$works[count($works)-1]['image_src'].'" alt="work_2"/></li>');
                   ?>
                </ul><span class="icon left">
                  <svg>
                    <use xlink:href="#arrow_down_icon"></use>
                  </svg></span>
              </div>
              <div class="slider__buttons-top">
                <ul class="slider__top-preview">
                  <?php 
                    echo('<li><img src="/assets/img/works_image/'.@$works[1]['image_src'].'" alt="work_2"/></li>
                  <li><img src="/assets/img/works_image/'.@$works[1]['image_src'].'" alt="work_1"/></li>');
                   ?>
                </ul><span class="icon right">
                  <svg>
                    <use xlink:href="#arrow_bottom_icon"></use>
                  </svg></span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="section-contact-form">
        <div class="contact-form-box" id="contact-form-box">
          <form class="contact-form" id="contact-form">
            <div class="contact-form__header"><?php echo $text[$lang]['form__header']; ?></div>
            <input id="name" type="text" name="name" placeholder="<?php echo $text[$lang]['placeholder_name']; ?>"/>
            <input id="mail" type="email" name="mail" placeholder="<?php echo $text[$lang]['placeholder_mail']; ?>"/>
            <textarea id="message" type="text" name="message" placeholder="<?php echo $text[$lang]['placeholder_message']; ?>"></textarea>
          </form>
          <div class="contact-form__buttons">  
            <input id="send-message" type="button" value="<?php echo $text[$lang]['button_send']; ?>"/>
            <input id="reset" type="button" value="<?php echo $text[$lang]['button_clear']; ?>"/>
          </div>
          <div class="blur">
            <div class="blur__bg"></div>
          </div>
        </div>
      </section>
      <?php echo $elements->get_footer($lang); ?>
    </div>
    <?php echo $elements->scripts_connect; ?>
  </body>
</html>