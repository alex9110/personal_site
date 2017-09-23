<?php 
  require_once 'view_elements/elements.class.php';
  $head = new Head();
  $common = new Сommon_elements();
  echo $head->get_head('Welcome');
  echo $head->get_svg_sprite();
 ?>
  <body>
      <?php
        echo $head->preloader;
        echo $head->pop_up;
      ?>     
    <div class="index-wrapper">
      <?php echo $common->paralax ?>
      <span id="authorization-button">Авторизоваться</span>
      <div class="index-content">
        <div class="plate" id="plate">
          <div class="index-content-box plate-front">
            <div class="index-content-main">
              <div class="ava"><img class="ava__img" src="/assets/img/ava.jpg" alt="avatar"/></div>
              <div class="autor">
                <h1 class="autor__name">Александр Лычик</h1>
                <h3 class="autor__description">Личный сайт веб разработчика</h3>
              </div>
              <div class="social">
                <?php echo $common->social_list ?>
              </div>
            </div>
            <nav class="index-nav">
              <ul class="index-nav__list">
                <li class="index-nav__item-works">Мои работы<a href="works.html"></a></li>
                <li class="index-nav__item-about">Обо мне<a href="about.html"></a></li>
                <li class="index-nav__item-blog">Блог<a href="blog.html"></a></li>
              </ul>
            </nav>
          </div>
          <div class="login-wrapper plate-back">
            <div class="login-box">
              <form class="login-form" id="login-form" action="admin.html" method="post">
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
        <p class="index-copyright__autor">© Александр Лычик <span>создано с любовью | 2017<span></p>
      </div>
    </div>
   <?php echo Footer::$scripts_connect; ?>
  </body>
</html>