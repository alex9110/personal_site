<?php 
  require_once 'view_elements/elements.class.php';

  $elements = new Elements();
  echo $elements->get_head('Welcome');
  echo $elements->get_svg_sprite();

  global $lang;
  $text = [ 'ru'=>['autor_name'=>'Александр Лычик','autor_description'=>'Личный сайт веб-разработчика', 'works'=>'Мои работы', 'about'=>'Обо мне', 'blog'=>'Блог', 'copyright'=>'© Александр Лычик <span>создано с любовью | 2017<span>'], 

  'en'=>['autor_name'=>'Aleksandr Lychyk','autor_description'=>'Personal website of the developer', 'works'=>'My works', 'about'=>'About me', 'blog'=>'Blog', 'copyright'=>'© Aleksandr Lychyk <span>created with love | 2017<span>'] ];
 ?>
  <body>
      <?php
        echo $elements->preloader;
        echo $elements->pop_up;
      ?>     
    <div class="index-wrapper">
      <form class="language_but" action="queries.php" method="post">
        <input type="submit" value="en" name="lang">
        <input type="submit" value="ru" name="lang">
      </form>
      <?php echo $elements->paralax ?>
      <span id="authorization-button">Авторизоваться</span>
      <div class="index-content">
        <div class="plate" id="plate">
          <div class="index-content-box plate-front">
            <div class="index-content-main">
              <div class="ava"><img class="ava__img" src="/assets/img/ava.png" alt="avatar"/></div>
              <div class="autor">
                <h1 class="autor__name"><?php echo $text[$lang]['autor_name']; ?></h1>
                <h3 class="autor__description"><?php echo $text[$lang]['autor_description']; ?></h3>
              </div>
              <div class="social">
                <?php echo $elements->social_list ?>
              </div>
            </div>
            <nav class="index-nav">
              <ul class="index-nav__list">
                <li class="index-nav__item-works"><?php echo $text[$lang]['works']; ?><a href="works"></a></li>
                <li class="index-nav__item-about"><?php echo $text[$lang]['about']; ?><a href="about"></a></li>
                <li class="index-nav__item-blog"><?php echo $text[$lang]['blog']; ?><a href="blog"></a></li>
              </ul>
            </nav>
          </div>
          <div class="login-wrapper plate-back">
            <div class="login-box">
              <form class="login-form" id="login-form" action="admin" method="post">
                <h1 class="login-form__header">Авторизуйтесь</h1>
                <div class="login-form__login">
                  <label for="login">
                    <svg>
                      <use xlink:href="#login_icon"></use>
                    </svg>
                  </label>
                  <input id="login" maxlength="14" type="text" placeholder="Логин" name="login"/>
                </div>
                <div class="login-form__password">
                  <label for="password">
                    <svg>
                      <use xlink:href="#password_icon"></use>
                    </svg>
                  </label>
                  <input id="password" maxlength="14" type="password" placeholder="Пароль" name="pas"/>
                </div>
                <div class="login-form-checks-wrapper">
                  <p class="checkbox-box">
                    <input type="checkbox" id="loginform_check"/>
                    <label for="loginform_check">Я человек</label>
                  </p>
                  <div class="login-form__radio">
                    <p>Вы точно не робот?</p>
                    <input type="radio" id="radio_yes" name="answer" value="true"/>
                    <label for="radio_yes">Да<span></span></label>
                    <input checked="checked" type="radio" id="radio_no" name="answer" value="false"/>
                    <label for="radio_no">Не уверен</label>
                  </div>
                </div>
              </form>
            </div>
            <nav class="login-nav">
              <ul class="login-nav__list">
                <li class="login-nav__to-main" id="to-main-but">Назад</li>
                <li class="login-nav__enter">Войти
                  <input type="submit" name="login-nav__enter" value="" form="login-form" id="login-nav__enter"/>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="index-copyright">
        <p class="index-copyright__autor"><?php echo $text[$lang]['copyright']; ?></p>
      </div>
    </div>
   <?php echo $elements->scripts_connect; ?>
  </body>
</html><!-- zzz </body><!-->