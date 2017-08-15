$(function() {
////////////////////////flip over//////////////////////////////////
  $('#to-main-but, #authorization-button').on('click',function(){
    $('#plate').toggleClass('plate-front');
  });
////////////////////////////flip over////////////////////////////

  var not_fixed = true;
  var arrow_none = true;
  var target = $('#section-articles'); 
  var articles = $('.article');
  var asideItem = $('.blog_aside__item');
  var asideList = $('.blog_aside__list');
  var winHeight = $(window).height();
  var winScrollTop = '';
  $(window).on('scroll', function(){

    winScrollTop = $(window).scrollTop();
    fixet_nav();
    inWindow(articles, asideItem);
    showArrow();
    
  });
  //позыцыонирование навигации
  function fixet_nav(){
    if (target.length > 0) {
      var targetPos = target.offset().top;

      if(winScrollTop >= targetPos && not_fixed){
        var top = $(asideList).position().top;
        var left = $(asideList).offset().left;
        $(asideList).css({'position':'fixed', 'top': top+'px', 'left': left+'px'});
        not_fixed = false;
      }else if(winScrollTop < targetPos && !not_fixed) {
        $(asideList).css({'position':'static'});
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
  function inWindow(articles, asideItem){

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
      $(asideItem).removeClass('active');
      $(asideItem[currentIndexNumber]).addClass('active');
    }
  }
  ///////////////////////start portfolio header///////////////////////////
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
    $('#menu-button').removeClass('menu-button-close');
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
    $('#menu-button').addClass('menu-button-close');
    var arr = $('.main-nav-list-item');
    var arr_length = arr.length;
    var current = 0;
    $('.curtain-left').addClass('closeCurtainsL');
    $('.curtain-right').addClass('closeCurtainsR');
    setTimeout(function(){
      $('#main-nav').addClass('block');
      var timerId = setInterval(function(){
        $(arr[current]).css({'opacity': 1});
        if (current >= arr_length-1) {
          clearTimeout(timerId);
        }
        current++;
      }, transition/2); 

    }, transition);
  }
  ///////////////////////end portfolio header///////////////////////////

  /////////////////////////start slider/////////////////////////////////
  var timeout = 300;
  $('.slider__bottom-preview li, .slider__top-preview li, .slider__images-list').css({ 'transition':timeout+'ms'});
  $('.slider__images-list').css({ 'transition':timeout/2+'ms'});
 
  $('.slider__buttons-bottom, .slider__buttons-top').on('click', function(evt){
    var botton = $(evt.currentTarget).attr('class');
    var images = $('li.slider__images-item');
    var arrLenght = images.length;
    var imageList = $('.slider__images-list');
    var prev1Left = $('.slider__bottom-preview li:last-child');
    var prev2Left = $('.slider__bottom-preview li:first-child');
    var prev1Right = $('.slider__top-preview li:last-child');
    var prev2Right = $('.slider__top-preview li:first-child');
   
//если нажал кнопку назад то есть в низ
    function back(){
     
      setTimeout(function(){
        imageList.prepend(images[arrLenght-1]);
        imageList.toggleClass('opacity');
      }, timeout/2);
 
      var prev1TopLeft = parseInt(prev1Left.css('top'));
      var prev2TopLeft = parseInt(prev2Left.css('top'));

      if (prev1TopLeft>prev2TopLeft) {
        prev2Left.css({'transition':timeout+'ms'});
        changePreview(prev1Left, prev2Left, 'bottom');
      }else{
        prev1Left.css({'transition':timeout+'ms'});
        changePreview(prev2Left, prev1Left, 'bottom');
      }
    }
//если нажал впеёд то есть вверх
    function forward(){
      setTimeout(function(){
        imageList.append(images[0]);
        imageList.toggleClass('opacity');
      }, timeout/2);
      var prev1TopRight = parseInt(prev1Right.css('top'));
      var prev2TopRight = parseInt(prev2Right.css('top'));

      if (prev1TopRight<prev2TopRight) {
        prev2Right.css({'transition':timeout+'ms'});
        changePreview(prev1Right, prev2Right, 'top');
      }else{
        prev1Right.css({'transition':timeout+'ms'});
        changePreview(prev2Right, prev1Right, 'top');
      }
    }
 //левые превюхи
    
//меняем главное изображение
    function changeMainImage(){
      imageList.toggleClass('opacity');

      if (botton == 'slider__buttons-bottom') {
        back();  
      }else{
        forward();
      } 
    }  
//меням превюху
    function changePreview(currentLi, nextLi, direction){ 
      if (direction == 'bottom') {
        currentLi.css({'top':'200%'});
        nextLi.css({'top':'100%'});

        setTimeout( function(){
          var tmpSrc = $(images[arrLenght-3]).find('img').attr('src');
          var tmpH1 = $(images[arrLenght-3]).find('h1').html();
          
          //заменим адрес к картинке
          currentLi.find('img').attr({'src':tmpSrc});
          //заменим контент в h1
          currentLi.find('h1').html(tmpH1);

          currentLi.css({'transition':'0ms', 'top':'0'});

        }, timeout);
      }
      if (direction == 'top') {
        currentLi.css({'top': '-100%'});
        nextLi.css({'top':'0'});

        setTimeout( function(){
          var tmpSrc = $(images[3]).find('img').attr('src');
          var tmpH1 = $(images[3]).find('h1').html();
         
          //заменим адрес к картинке
          currentLi.find('img').attr({'src':tmpSrc});
          //заменим контент в h1
          currentLi.find('h1').html(tmpH1);
        
          currentLi.css({'transition':'0ms', 'top':'200%'});
          $(currentLi).css({'transition':'0ms', 'top':'200%'});
    
        }, timeout);
      }  
    }

    changeMainImage();
    
  });


   ////////////////////////end slider/////////////////////////////////
});