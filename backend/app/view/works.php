<?php 
  require_once 'view_elements/elements.class.php';
  $head = new Head();
  $common = new Сommon_elements();
  echo ( $head->get_head('Welcome') );
  echo $head->get_svg_sprite();
  // echo('<pre>');
  // print_r($works);
  // echo('<pre>');
 ?>
  <body>
      <?php
        echo $head->preloader;
        echo $head->pop_up;
      ?>
    <div class="works-wrapper">
      <section class="section-header"><a id="hidden-link-top" name="hidden-link-top"></a>
        <header class="portfolio_header">
          <?php echo $common->curtains ?>
          <div class="portfolio_header_bg">
            <?php echo $common->paralax_scroll ?>
            <div class="portfolio_header_bg1"></div>
          </div>
          <div class="social social-white">
            <?php echo $common->social_list ?>
          </div>
          <div class="menu-button" id="menu-button"><span></span><span></span><span></span></div>
          <div class="index-content">
            <div class="index-content-box">
              <div class="index-content-main index-content-main_transparent">
                <div class="ava ava_bigger"><img class="ava__img" src="/assets/img/ava.jpg" alt="avatar"/></div>
                <div class="autor">
                  <h1 class="autor__name">Александр Лычик</h1>
                  <h3 class="autor__description">Личный сайт веб разработчика</h3>
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
          <h2>Мои работы</h2>
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
              <div class="work-description__botton">Посмотреть сайт<a href="#"></a>
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
                    <h2>'.$works[$i]['title'].'</h2>
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
            <div class="contact-form__header">Связаться со мной</div>
            <input id="name" type="text" name="name" placeholder="Имя"/>
            <input id="mail" type="email" name="mail" placeholder="Email"/>
            <textarea id="message" type="text" name="message" placeholder="Ваше сообщение"></textarea>
          </form>
          <div class="contact-form__buttons">  
            <input id="send-message" type="button" value="Отправить"/>
            <input id="reset" type="button" value="Очистить"/>
          </div>
          <div class="blur">
            <div class="blur__bg"></div>
          </div>
        </div>
      </section>
      <?php
        $footer = new Footer();
        echo $footer->get_footer();
      ?>
    </div>
    <?php echo Footer::$scripts_connect; ?>
  </body>
</html>