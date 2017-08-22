'use strict';
$(document).ready(function () {
  ////////////////// плавный скрол ///////////////////////////
  $('a[href^="#"]').click(function(){
    var elementClick = $(this).attr('href');
    var destination = $(elementClick).offset().top;  //узнаем место назначения 
    $('html, body').animate({scrollTop: destination}, 1000);  //двигаем к ниму
    return false;                     
  });
  ////////////////// плавный скрол ///////////////////////////
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
  var transition = 300;
  $('#menu-button').click(function(){
    var close = $('.curtain-left').hasClass('closeCurtainsL');
    if(close){
      close_menu();
    }else{
      show_menu();
    }
  });
  function close_menu(){
    $('#menu-button').removeClass('menu-button-close');
    $('.curtain-left, .curtain-right, #main-nav').css({'opacity':0});
    setTimeout(function(){
      $('.curtain-left').removeClass('closeCurtainsL');
      $('.curtain-right').removeClass('closeCurtainsR');
      $('#main-nav').removeClass('block');
      setTimeout(function(){
        $('.curtain-left, .curtain-right, #main-nav').css({'opacity':1});
      }, transition); 
    }, transition);
  }
 
  var arr = $('.main-nav-list-item');
  var arr_length = arr.length;
  var fontSize = $(arr[0]).css('font-size');
  function show_menu(){
    $('#menu-button').addClass('menu-button-close');
    $(arr).find('a').css('font-size', '0');
    var current = 0;
    $('.curtain-left').addClass('closeCurtainsL');
    $('.curtain-right').addClass('closeCurtainsR');
    setTimeout(function(){
      $('#main-nav').addClass('block');
      var timerId = setInterval(function(){
        var a = $(arr[current]).find('a');
        a.animate({'font-size':fontSize}, {
          duration:transition
        });
        if (current >= arr_length-1) {
          clearTimeout(timerId);
        }
        current++;
      }, transition/2); 

    }, transition);
  }
  ///////////////////////end portfolio header///////////////////////////

   /////////////////////////////анимирования текста в слайдере///////////////////////////////
  var timeout = 1000;
  function textAnimate(){
    $.fn.animateText = function() {
      return this.each(function(){
        var $this = $(this);
        var string = $this.text();
        $this.html(string.replace(/./g, '<span class="letter">$&</span>'));
        showText($this);
      });
      
    };
    function showText($this){

      var letterList = $this.find('.letter');

      var listLength = letterList.length;
      var i = 0;
      function showLetter(){
        var currentLetter = $(letterList[i]).html();
       //если это пробел зададим ему фиксированную ширину иначе потом он сплющиться 
        if (currentLetter === ' ') {
          var letterWidth = $(letterList[i]).width();
        //если ширина пробела = 0, значит это конец строки и нужно вставить елемент переноса строки
          if (letterWidth == 0) {
            $(letterList[i]).after('<br>');
          }
          $(letterList[i]).width(letterWidth);
        }
        //добавим клас с анимацией
        $(letterList[i]).addClass('showLetter');
        i++;
        setTimeout(function(){
          if (i < listLength) {
            showLetter();
          } 
        }, timeout/listLength/2);
      }
      showLetter();
    }
    $('.animateText').animateText();
  }
   /////////////////////////////конец анимирования текста в слайдере///////////////////////////////

  /////////////////////////start slider/////////////////////////////////
  
  $('.slider__bottom-preview li, .slider__top-preview li, .slider__images-list').css({'transition':timeout+'ms'});
  $('.slider__images-list').css({ 'transition':timeout/2+'ms'});
  var buttons = $('.slider__buttons-bottom, .slider__buttons-top');
  buttons.on('click', function(evt){
    //удалим обработчик
    buttons.off();
    slider(evt);
    setTimeout(function(){
      //вернём обработчик
      buttons.on('click', function(evt){slider(evt);});
    },timeout); 
  });
  function changeDescription(i){
    var desc = $('.slider__image-description').clone();
    var title = $(desc[i]).find('h2').addClass('animateText');
    var technologies = $(desc[i]).find('p').addClass('animateText');
    $('.work-description__title h2').replaceWith(title);
    $('.work-description__technologies p').replaceWith(technologies);
    textAnimate();
  }
  function slider(evt){
    var botton     = $(evt.currentTarget).attr('class'),
      images     = $('li.slider__images-item'),
      arrLenght  = images.length,
      imageList  = $('.slider__images-list'),
      prev1Left  = $('.slider__bottom-preview li:last-child'),
      prev2Left  = $('.slider__bottom-preview li:first-child'),
      prev1Right = $('.slider__top-preview li:last-child'),
      prev2Right = $('.slider__top-preview li:first-child'),
      currentLeftLi, nextLeftLi, currentRightLi, nextRightLi;
    //узнаем текущий и следующий елементы превьюх, текущий тот что видим, а следующийелемент тот что пока что скрыт 
    if ( parseInt(prev1Left.css('top')) > parseInt(prev2Left.css('top'))) {
      currentLeftLi = prev1Left;
      nextLeftLi = prev2Left;
    }else{
      currentLeftLi = prev2Left;
      nextLeftLi = prev1Left;
    }
    //Следующий елемент с лева значение по умолчанию
    nextLeftLi = newSrc(nextLeftLi, images[arrLenght-2]);
    //если нажал кнопку назад она же в низ
    function back(){
      setTimeout(function(){
        //перекинем изображение с кона в начало
        imageList.prepend(images[arrLenght-1]);
        imageList.toggleClass('opacity');
      }, timeout/2);
      changePreview(currentLeftLi, nextLeftLi, 'bottom', images[arrLenght-3]);
    }
    //узнаем текущий и следующий елементы превьюх, текущий тот который на виду, а следующийелемент тот что пока что скрыт
    if (parseInt(prev1Right.css('top')) < parseInt(prev2Right.css('top'))) {
      currentRightLi = prev1Right;
      nextRightLi = prev2Right;
    }else{
      currentRightLi = prev2Right;
      nextRightLi = prev1Right;
    }
    //Следующий елемент с права значение по умолчанию
    nextRightLi = newSrc(nextRightLi, images[2]);
    //если нажал впеёд она же вверх
    function forward(){
      setTimeout(function(){
        //перекинем изображение с начала в конец
        imageList.append(images[0]);
        imageList.toggleClass('opacity');
      }, timeout/2);
      changePreview(currentRightLi, nextRightLi, 'top', images[3]);
    }   
//меняем главное изображение
    function changeMainImage(){
      imageList.toggleClass('opacity');
      if (botton == 'slider__buttons-bottom') {
        back();
        changeDescription(arrLenght-1);
      }else{
        forward();
        changeDescription(1);
      } 
    }  
//меням превюху параметры: текущая ли, следующая та на которую сечас заменется текущая, направление движения анимацыи,
//новая ли тоесть с новым изображением и возможно описанием она заменет ту ли которую мы сдвиним из зоны видимости
    function changePreview(currentLi, nextLi, direction, newLi){  
      if (direction == 'bottom') {
        move('bot');
        prewBack('left');
         // кликнули по левой кнопке значит меняем значения по умолчанию для следующиго елемента правой кнопке
        nextRightLi = newSrc(nextRightLi, images[0]);
        move('top', currentRightLi, nextRightLi);
        prewBack('right', currentRightLi);
      }
      if (direction == 'top') {
        move('top');
        prewBack('right');
        // кликнули по правой кнопке значит меняем значения по умолчанию для следующиго елемента на левой кнопке
        nextLeftLi = newSrc(nextLeftLi, images[0]);
        move('bot', currentLeftLi, nextLeftLi);
        prewBack('left', currentLeftLi);
      }
      //возврвщает скрытое превю на стартовою позицыю, параметры какое превью левое или правое, и не обезательный текущийэлемнт
      function prewBack(prev, currentElement){
        if (currentElement === undefined) {
          currentElement = currentLi;
        }
        setTimeout( function(){
          if (prev == 'left') {
            currentElement = newSrc(currentElement, newLi);
            currentElement.css({'transition':'0ms', 'top':'0'});
          }else if (prev == 'right') {
            currentElement = newSrc(currentElement, newLi);
            currentElement.css({'transition':'0ms', 'top':'100%'});
          }
        }, timeout);
      }
      function move(direction, currentElement, nextElement){
        if (currentElement === undefined || nextElement === undefined) {
          currentElement = currentLi;
          nextElement = nextLi;
        }
        nextElement.css({'transition':timeout+'ms'});
        if (direction == 'bot') {
          currentElement.css({'top':'200%'});
          nextElement.css({'top':'100%'});
        }else if(direction == 'top'){
          currentElement.css({'top': '-100%'});
          nextElement.css({'top':'0'});  
        } 
      }
    }
//функцbя меняет катринку и h1 в li элементте
    function newSrc(oldLi, newLi){
      var tmpSrc = $(newLi).find('img').attr('src');
      var tmpH1 = $(newLi).find('h1').html();
      //заменим адрес к картинке
      oldLi.find('img').attr({'src':tmpSrc});
      //заменим контент в h1
      oldLi.find('h1').html(tmpH1);
      return oldLi;
    }
    changeMainImage();
  }
   ////////////////////////end slider/////////////////////////////////

   
  


});