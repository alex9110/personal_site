<?php 
  require_once 'view_elements/elements.class.php';
  $head = new Head();
  $common = new Сommon_elements();
  echo ( $head->get_head('Welcome') );
 ?>
  <body>
      <?php
        echo $head->preloader;
        echo $head->pop_up;
      ?>
    <div class="loader-wrapper">
      <div class="loader-box">
        <div class="loader">
          <div class="loader__sircle-box"><span class="loader__sircle loader__sircle_one"></span></div>
          <div class="loader__sircle-box"><span class="loader__sircle loader__sircle_two"></span></div>
          <div class="loader__sircle-box"><span class="loader__sircle loader__sircle_three"></span></div><span class="loader__percent">0%</span>
        </div>
      </div>
    </div>
    <div class="hidden" id="pop_up"><span id="pop_up-button"></span>
      <div id="pop_up-content">какая то ошибка<br> ещё ошибка</div>
    </div>
    <div class="admin-wrapper">
      <div class="admin-wrapper-box">
        <header class="admin-header">
          <div class="admin-header-top-box">
            <h1>Панель администрирования</h1><a href="exit.html" id="admin-exit">Вернуться на сайт</a>
          </div>
          <nav class="admin-nav">
            <ul class="admin-nav__list clearfix">
              <li class="admin-nav__item active">Обо мне</li>
              <li class="admin-nav__item">Блог</li>
              <li class="admin-nav__item">Мои работы</li>
            </ul>
          </nav>
        </header>
        <div class="admin-content">
          <form class="admin-form admin-about-me" id="admin-about-me">
            <h3>Страница "Обо мне"</h3>
            <fieldset class="admin-about-me-box">Frontend
              <label class="admin-about-me-label" for="skill_html">Html 5
                <input type="text" maxlength="3" id="skill_html" <?php echo('value="'.$skills['HTML5'].'"');?>/>
              </label>
              <label class="admin-about-me-label" for="skill_html">CSS3
                <input type="text" maxlength="3" id="skill_css" <?php echo('value="'.$skills['CSS3'].'"');?>/>
              </label>
              <label class="admin-about-me-label" for="skill_html">javaScript
                <input type="text" maxlength="3" id="skill_js" <?php echo('value="'.$skills['JavaScript_&_JQuery'].'"');?>/>
              </label>
            </fieldset>
            <fieldset class="admin-about-me-box">Backend
              <label class="admin-about-me-label" for="skill_html">PHP
                <input type="text" maxlength="3" id="skill_html" <?php echo('value="'.$skills['php'].'"');?>/>
              </label>
              <label class="admin-about-me-label" for="skill_html">mySQL
                <input type="text" maxlength="3" id="skill_html" <?php echo('value="'.$skills['mySQL'].'"');?>/>
              </label>
              <label class="admin-about-me-label" for="skill_html">Node & npm
                <input type="text" maxlength="3" id="skill_css" <?php echo('value="'.$skills['Node_JS_&_npm'].'"');?>/>
              </label>
            </fieldset>
            <fieldset class="admin-about-me-box">Workflow
              <label class="admin-about-me-label" for="skill_html">Git
                <input type="text" maxlength="3" id="skill_html" <?php echo('value="'.$skills['Git'].'"');?>/>
              </label>
              <label class="admin-about-me-label" for="skill_html">Gulp
                <input type="text" maxlength="3" id="skill_css" <?php echo('value="'.$skills['Gulp'].'"');?>/>
              </label>
              <label class="admin-about-me-label" for="skill_html">Bower
                <input type="text" maxlength="3" id="skill_js" <?php echo('value="'.$skills['Bower'].'"');?>/>
              </label>
            </fieldset>
            <div><span id="admin-about-me__save">Сохранить</span></div>
          </form>
          <form class="admin-form admin-blog" id="admin-blog">
            <h3>Страница "Блог"</h3>
            <p>Добавить запись</p>
            <input type="text" placeholder="Название" id="admin-blog__article-title"/>
            <input type="text" placeholder="дата" id="admin-blog__article-data"/>
            <textarea rows="8" cols="50" placeholder="Содержание" id="admin-blog__article-content"></textarea><span id="admin-blog__save">Добавить</span>
          </form>
          <form class="admin-form admin-works" id="admin-works">
            <h3>Страница "Мои работы"</h3>
            <p>Добавить Работу</p>
            <input type="text" placeholder="Название проекта" id="admin-works__project-title"/>
            <input type="text" placeholder="Технологии" id="admin-works__project-technologies"/>
            <input type="text" placeholder="Ссылка" id="admin-works__project-link"/>
            <p>
              <label class="admin-works__project-select-image">Выбрать картинку
                <input type="file" id="admin-works__project-select-image"/>
              </label>
            </p><span id="admin-works__save">Добавить</span>
          </form>
        </div>
      </div>
    </div>
    <?php echo Footer::$scripts_connect; ?>
  </body>
</html>