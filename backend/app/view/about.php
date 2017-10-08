<?php 
  require_once 'view_elements/elements.class.php';

  $elements = new Elements();
  echo ( $elements->get_head('About') );
  echo $elements->get_svg_sprite();

  global $lang;
  $text =['ru'=>['autor_name'=>'Александр Лычик','autor_description'=>'Личный сайт веб-разработчика', 'about_me'=>'Обо мне', 'about_me2'=>'Кто я', 'about_me_desc'=>'<p>Я веб-разработчик. Мне 26 лет. Я занимаюсь разработкой веб приложений. Мне нравится делать интересные и современные проэкты.</p><p>Этот сайт я сделал в рамках обучения на одном из курсов. Чуть позже я освежу в нём свой контент. А пока посмотрите, как тут всё класно и красиво!</p>', 'my_skills'=>'Чем я могу быть вам <br> полезен', 'my_skills_desc'=>'Больше всего меня привлекает Front End разработка, но я также знаком и могу решать несложные задачи на Backend. Но давайте по порядку.', 'contacts'=>'Контакты', 'contacts_address'=>'г. Хмельницкий'], 

  'en'=>['autor_name'=>'Aleksandr Lychyk','autor_description'=>'Personal website of the developer', 'about_me'=>'About me', 'about_me2'=>'Who I am', 'about_me_desc'=>"<p>I'm a web developer. I am 26. I'm developing web applications. I like to make interesting and modern projects.</p><p>This site I did as part of the training on one of the courses. A little later I will refresh my content in it, but for now you can see how everything is cool and beautiful!</p>", 'my_skills'=>'How can I help you', 'my_skills_desc'=>"I'm most attracted to Front End development, but I'm also familiar and can solve simple tasks on Backend. But let's start in order.", 'contacts'=>'Contacts', 'contacts_address'=>'Khmelnytsky city']];
 ?>
  <body>
    <?php
      echo $elements->preloader;
      echo $elements->pop_up;
    ?>
    <div class="about-wrapper">
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
                <div class="ava ava_bigger"><img class="ava__img" src="/assets/img/ava.png" alt="avatar"/></div>
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
      </section>
      <section class="section-about">
        <div class="about-me">
          <div class="about-me__title"><a id="second-section" name="second-section"></a>
            <h2><?php echo $text[$lang]['about_me']; ?></h2>
          </div>
          <div class="about-me-description-box">
            <div class="about-me-center-box"> 
              <div class="about-me-photo"><img class="ava__img" src="/assets/img/ava.png" alt="avatar"/></div>
              <div class="about-me-description">
                <h2><?php echo $text[$lang]['about_me2']; ?></h2>
                <?php echo $text[$lang]['about_me_desc']; ?>
              </div>
            </div>
          </div>
        </div>
        <section class="my-skills">
          <div class="my-skills__title">
            <h2><?php echo $text[$lang]['my_skills']; ?></h2>
          </div>
          <div class="my-skills__desk">
            <p><?php echo $text[$lang]['my_skills_desc']; ?></p>
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
      <section class="section-contacts">
       <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24687.600579271893!2d26.973534949240314!3d49.428487933235786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1507061790240" width="100%" height="130%" frameborder="0" style="border:0" allowfullscreen></iframe>
        <div class="contacts">
          <div class="contacts__title">
            <h3><?php echo $text[$lang]['contacts']; ?></h3>
          </div>
          <ul class="contacts__list">
            <li class="contacts__item">alexandrlychik
              <svg>
                <use xlink:href="#skype_icon"></use>
              </svg>
            </li>
            <li class="contacts__item">lychyk9110@gmail.com
              <svg>
                <use xlink:href="#envelope_icon"></use>
              </svg>
            </li>
            <li class="contacts__item">+380960834315
              <svg>
                <use xlink:href="#phone_icon"></use>
              </svg>
            </li>
            <li class="contacts__item"><?php echo $text[$lang]['contacts_address']; ?>
              <svg>
                <use xlink:href="#map_marker_icon"></use>
              </svg>
            </li>
          </ul>
        </div>
      </section>
      <?php echo $elements->get_footer($lang); ?>
    </div>
    <?php echo $elements->scripts_connect; ?>
  </body>
</html>