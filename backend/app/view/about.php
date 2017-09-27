<?php 
  require_once 'view_elements/elements.class.php';
  $head = new Head();
  $common = new Сommon_elements();
  echo ( $head->get_head('Welcome') );
  echo $head->get_svg_sprite();
 ?>
  <body>
    <?php
      echo $head->preloader;
      echo $head->pop_up;
    ?>
    <div class="about-wrapper">
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
      </section>
      <section class="section-about">
        <div class="about-me">
          <div class="about-me__title"><a id="second-section" name="second-section"></a>
            <h2>Обо мне</h2>
          </div>
          <div class="about-me-description-box">
            <div class="about-me-center-box"> 
              <div class="about-me-photo"><img class="ava__img" src="/assets/img/ava.jpg" alt="avatar"/></div>
              <div class="about-me-description">
                <h2>Кто я</h2>
                <p>Я веб разработчик. мне 25 лет. Я занимаюсь разработкой современных веб приложений. Мне нравится делать интересные и современные проэкты.</p>
                <p>Этот сайт я сделал в рамках обучения в школе онлайн образования LoftSchool. Чуть позже я освежу в нём свой контент. А пока посмотрите, как тут всё класно и красиво!</p>
              </div>
            </div>
          </div>
        </div>
        <section class="my-skills">
          <div class="my-skills__title">
            <h2>Чем я могу быть вам <br> полезен</h2>
          </div>
          <div class="my-skills__desk">
            <p>Больше всего меня привлекает Frontend разработка, но я также знаком и могу решать не сложные задачи на Backend. Но давайте по порядку.</p>
          </div>
          <div class="my-skills-box">
            <div class="my-skills-box-ceenter">
              <div class="my-skills-list-box">
                <h3>Frontend</h3>
                <ul class="my-skills-list">
                  <li class="my-skills__item" data-skill="<?php echo($skills['html']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>HTML 5</span>
                  </li>
                  <li class="my-skills__item" data-skill="<?php echo($skills['css']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>CSS3</span>
                  </li>
                  <li class="my-skills__item" data-skill="<?php echo($skills['JavaScript']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>JavaScript &amp; jQuery</span>
                  </li>
                </ul>
              </div>
              <div class="my-skills-list-box">
                <h3>Backend</h3>
                <ul class="my-skills-list">
                  <li class="my-skills__item" data-skill="<?php echo($skills['php']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>php</span>
                  </li>
                  <li class="my-skills__item" data-skill="<?php echo($skills['mysql']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>mySQL</span>
                  </li>
                  <li class="my-skills__item" data-skill="<?php echo($skills['node_npm']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>Node JS &amp; npm</span>
                  </li>
                </ul>
              </div>
              <div class="my-skills-list-box">
                <h3>WorkFlow</h3>
                <ul class="my-skills-list">
                  <li class="my-skills__item" data-skill="<?php echo($skills['git']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>Git</span>
                  </li>
                  <li class="my-skills__item" data-skill="<?php echo($skills['gulp']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>Gulp</span>
                  </li>
                  <li class="my-skills__item" data-skill="<?php echo($skills['bower']); ?>"><svg width="300" height="300" class="g-circles" viewBox="0 0 300 300">
<circle r="115" cx="150" cy="150" stroke="#DFDCD5" fill="none" />
<circle r="115" cx="150" cy="150" stroke="#19C2AB" transform="rotate(-90 150 150)" class="sector" /> 
</svg><span>Bower</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section class="section-contacts"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12893.01146647684!2d26.822865102193937!3d50.11815420750371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1503751968027" width="100%" height="130%" frameborder="0" style="border:0" allowfullscreen></iframe>
        <div class="contacts">
          <div class="contacts__title">
            <h3>Контакты</h3>
          </div>
          <ul class="contacts__list">
            <li class="contacts__item">skype
              <svg>
                <use xlink:href="#skype_icon"></use>
              </svg>
            </li>
            <li class="contacts__item">lychyk9110gmail.com
              <svg>
                <use xlink:href="#envelope_icon"></use>
              </svg>
            </li>
            <li class="contacts__item">+380960834315
              <svg>
                <use xlink:href="#phone_icon"></use>
              </svg>
            </li>
            <li class="contacts__item">г. Киев ул. Пушкина дом Калатушкина
              <svg>
                <use xlink:href="#map_marker_icon"></use>
              </svg>
            </li>
          </ul>
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