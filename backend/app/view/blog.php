<?php 
  require_once 'view_elements/elements.class.php';

  $elements = new Elements();
  echo ( $elements->get_head('Blog') );
  echo $elements->get_svg_sprite();

  global $lang;
  $text = [ 'ru'=>['title'=>'Блог', 'title_text'=>'Статьи которые я написал'], 

  'en'=>['title'=>'Blog', 'title_text'=>'Articles I wrote'] ];
 ?>
  <body>
      <?php
        echo $elements->preloader;
        echo $elements->pop_up;
      ?>
    <div class="blog-wrapper">
      <form class="language_but vertical" action="queries.php" method="post">
        <input type="submit" value="en" name="lang">
        <input type="submit" value="ru" name="lang">
      </form>
      <div class="section-header"><a id="hidden-link-top" name="hidden-link-top"></a>
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
                  <h1 class="autor__name"><?php echo $text[$lang]['title']; ?></h1>
                  <h3 class="autor__description"><?php echo $text[$lang]['title_text']; ?></h3>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="arrow-down"><a id="show-works" href="#second-section">
            <svg>
              <use xlink:href="#arrow_down_icon"></use>
            </svg></a></div>
      </div><a id="second-section" name="second-section"></a>
      <section class="section-articles" id="section-articles">
        <section class="section-articles-box">
          <aside class="blog_aside">
            <ul class="blog_aside__list" id="blog_aside__list"><span id="blog_aside__list_button"></span>
              <?php 
                for($i=0; count($articles)>$i; $i++){
                  if ($i === 0) {
                    $active = 'active';
                  }else{$active = '';}
                  echo('<li class="blog_aside__item '.$active.'"><a href="#article'.$i.'">'.$articles[$i]['title'].'</a></li>');
                }
              ?>
            </ul>
          </aside>
          <div class="articles-list">
            <div class="article-list-box">
              <?php 
                for($i=0; count($articles)>$i; $i++){
                  echo('<article class="article"><a name="article'.$i.'"></a>
                <div class="article__header">
                  <h3>'.$articles[$i]['title'].'</h3>
                </div>
                <div class="article__data"><span>'.$articles[$i]['data'].'</span></div>
                <div class="article__text">
                  '.$articles[$i]['article'].'
                </div>
              </article>');
                }
              ?>
            </div>
          </div>
        </section>
      </section>
      <?php echo $elements->get_footer($lang); ?>
    </div>
    <?php echo $elements->scripts_connect; ?>
  </body>
</html>