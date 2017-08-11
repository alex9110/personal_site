$(function() {
  var not_fixed = true;
  var arrow_none = true;
  var target = $('#section-articles'); 
  var articles = $('.article');
  var nav_items = $('.nav_articles__item');
  var winHeight = $(window).height();
  var winScrollTop = '';
  $(window).on('scroll', function(){

    winScrollTop = $(window).scrollTop();
    fixet_nav();
    inWindow(articles, nav_items);
    showArrow();
    
  });
  //позыцыонирование навигации
  function fixet_nav(){
    if (target.length > 0) {
      var targetPos = target.offset().top;

      if(winScrollTop >= targetPos && not_fixed){
        var top = $('#nav_articles__list').position().top;
        var left = $('#nav_articles__list').offset().left;
        $('#nav_articles__list').css({'position':'fixed', 'top': top+'px', 'left': left+'px'});
        not_fixed = false;
      }else if(winScrollTop < targetPos && !not_fixed) {
        $('#nav_articles__list').css({'position':'static'});
        not_fixed = true;
      }
    }
  }
  //показать скрыть стрелку вверх
  function showArrow(){
    if (winHeight <= winScrollTop && arrow_none) {
      $('.arrow-top').css({'display':'block'});
      arrow_none = false;
    }
    else if(winHeight > winScrollTop && !arrow_none){
      $('.arrow-top').css({'display':'none'});
      arrow_none = true;
    }
  }
  //покрасит елемент навигационного меню который сответствует текущей стати
  var savedIndexNumber = 0;
  var currentIndexNumber = 0;
  function inWindow(articles, nav_items){

    var indent = parseInt( $(articles[0]).css('margin-bottom') );
    var currentEls = $(articles);
    var result = [];
    var offsetTop;

    currentEls.each(function(){
      var element = $(this);
      offsetTop = element.offset().top;
      offsetTop = parseInt(offsetTop);
      
      if( winScrollTop+indent*2 > offsetTop ){
        result.push(this);
        currentIndexNumber = result.length - 1;
      }

    });
    if ( savedIndexNumber !== currentIndexNumber) {
      savedIndexNumber = currentIndexNumber;
      $(nav_items).removeClass('active');
      $(nav_items[currentIndexNumber]).addClass('active');
    }
  }
});