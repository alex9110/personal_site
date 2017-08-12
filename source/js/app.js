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
  ///////////////////////portfolio header///////////////////////////
  // var transition = parseFloat($('.curtain-left').css('transition').replace('all','')) *1000 ;
  var transition = 300;
  $('#menu-button').click(function(){
  //получим значения transition сделаем с ним нужные манипуляцыи что бы получить его в милисекундах
    var close = $('.curtain-left').hasClass('closeCurtainsL');
   // console.log(close);
    if(close){
      close_menu();
    }else{
      show_menu();
    }
  });
  function close_menu(){
    $('.curtain-left, .curtain-right, #main-nav, .main-nav-list-item').css({'opacity':0});
    setTimeout(function(){
      $('.curtain-left').removeClass('closeCurtainsL');
      $('.curtain-right').removeClass('closeCurtainsR');
      $('#main-nav').removeClass('block');
      setTimeout(function(){
        $('.curtain-left, .curtain-right, #main-nav').css({'opacity':1});
      }, transition); 
    }, transition);
  }

  function show_menu(){
    var arr = $('.main-nav-list-item');
    var arr_length = arr.length;
    var current = 0;
    $('.curtain-left').addClass('closeCurtainsL');
    $('.curtain-right').addClass('closeCurtainsR');
    setTimeout(function(){
      $('#main-nav').addClass('block');
      var timerId = setInterval(function(){
        $(arr[current]).css({'opacity': 1});
         // console.log(arr[current], arr_length);   
        if (current >= arr_length-1) {
          clearTimeout(timerId);
        }
        current++;
      }, transition); 

    }, transition);
  }


  ///////////////////////portfolio header///////////////////////////
});