(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
$(document).ready(function () {

  require('./modules/slider.js')();
  require('./modules/blog_page/blog.js')();
  require('./modules/show_hide_menu.js')();
  require('./modules/paralax.js')();
  require('./modules/communication_form.js')();
  require('./modules/admin_scripts/login_form.js')();
  require('./modules/admin_scripts/admin_menu.js')();
  require('./modules/admin_scripts/admin_form_processing.js')();
  require('./modules/preloader.js')();

// плавный скрол
  $('a[href^="#"]').click(function(){
    var elementClick = $(this).attr('href');
    //если елемента с нужным id нету, двигаемся к тегу а с нужным именем
    var elementDirection = ($(elementClick).length > 10)? $(elementClick) : $('a[name='+elementClick.substr(1)+']');
    var destination = elementDirection.offset().top;  //узнаем место назначения 
    $('html, body').animate({scrollTop: destination}, 1000);  //двигаем к ниму
    return false;                     
  });


//перевернуть плашку
  $('#to-main-but, #authorization-button').on('click',function(){
    $('#plate').toggleClass('plate-front');
  });


//skills persent
  (function(){
    var
      target = $('.my-skills-box-ceenter'),
      windowHeigth = $(window).height();

    if(target.length > 0) {
      var
        skills = $('.my-skills__item'),
        data;

      target = target.offset().top;
      $(window).on('scroll', function(){
        var winScrollTop = $(window).scrollTop();
        if (winScrollTop+windowHeigth/10*7 > target) {
          skills.each(function(){
            var $this = $(this);
            data = $this.attr('data-skill');
            if (data == 0) {data = 1;}
            data =  parseInt( 722*(data/100) );
            $this.find('.sector').css({'stroke-dasharray':data+' 722'});
          });
        }
      });
    }
  })();


//pop_up
  window.hm = {};
  window.hm.popUp = function popUp(message, time){
    if (time == undefined) {time = 5000;}
    $('#pop_up-content').html(message);
    $('#pop_up').addClass('show');
    setTimeout(function(){
      $('#pop_up').removeClass('show');
    }, time);
  };

  (function(){
    $('#pop_up-button').on('click', function(){
      $('#pop_up').removeClass('show');
    });
  })();


//удалик фрейм с картой на мобильных
  if ($(window).width() <= 416) {
    $('.section-contacts iframe').remove();
  }


/*
берёт данные с формы полученой в качестве параметра и сформируем обьект данных
с двома свойствами, formId и data в котором храниться масив с данными
для дальнейшей обработки или отправки на сервер
*/
  window.hm.getData = function getData(form){
    var
      formId = form.attr('id'),
      inputs = form.find('input, textarea');

    var obj = {
      formId: formId,
      data:[]
    };
    inputs.each(function(){
      var that = $(this), curentData = [that.attr('id'), that.val().trim()];
      obj.data[obj.data.length] = curentData;
    });
    return obj;
  };

//скрыть не нужную ссылку вцепленую хостингом
  (function cleanPage(){
    var badCont = $('.cbalink');
    if (badCont.length > 0 ) {
      badCont.css({'display':'none'});
    }
  })();

});
},{"./modules/admin_scripts/admin_form_processing.js":2,"./modules/admin_scripts/admin_menu.js":3,"./modules/admin_scripts/login_form.js":4,"./modules/blog_page/blog.js":5,"./modules/communication_form.js":6,"./modules/paralax.js":7,"./modules/preloader.js":8,"./modules/show_hide_menu.js":9,"./modules/slider.js":10}],2:[function(require,module,exports){
module.exports = function(){
  if ($('.admin-form').length < 1){return;}
  //изменим цвет popUp для админки
  $('#pop_up').css({'background-color':'#00A78E'});
  var
    formAboutMe = $('#admin-about-me'),
    formBlog = $('#admin-blog'),
    formWorks = $('#admin-works');  

  //проверяем вводится ли в input число если нет чистим его
  formAboutMe.find('input').on('input', function(){
    var value = parseInt( $(this).val() );
    if ( isNaN(value) ) {$(this).val('');}
  });
  

  formAboutMe.find('#admin-about-me__save').on('click', function(){
    var data = window.hm.getData(formAboutMe);
    sendData(data);
  });


  formBlog.find('#admin-blog__save').on('click', function(){
    var data = window.hm.getData(formBlog);

    if (data.data[0][1] == '' || data.data[2][1] == '') {
      window.hm.popUp('Поля название и содержание обезательны для заполнения', 3000);
      return;
    }
    sendData(data);
  });


  var files = '';
  $('input[type=file]').change(function(){
    files = this.files;
  });


  formWorks.find('#admin-works__save').on('click', function(){
    var
      dataObj = window.hm.getData(formWorks),
      data = JSON.stringify(dataObj),
      objFormData = new FormData();
   
    $.each( files, function( key, value ){
      objFormData.append( key, value );
    });
    objFormData.append('data', data);
    
    if (dataObj.data[0][1] == '' || dataObj.data[2][1] == '' || dataObj.data[3][1] == '') {
      window.hm.popUp('Все поля обезательны к заполнению', 3000);
      return;
    }
    sendFile(objFormData);
  
  });


  function sendData(data){
    $.ajax({
      url: 'queries.php?',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function( data ){
        if ( data) {
          window.hm.popUp('Сохранено', 1500);
          //console.log(data);  
        }else{
          window.hm.popUp('Ошибка сохранения', 2000);
          //console.log(data);  
        }
           
      },
      error: function( jqXHR, textStatus ){
        window.hm.popUp('Ошибка', 2000);
        console.log('ОШИБКИ AJAX запроса: ' + textStatus );
      }
    });
  }


  function sendFile(data){
    $.ajax({
      url: 'queries.php',
      type: 'POST',
      data: data,
      cache: false,
      dataType: 'json',
      processData: false, // Не обрабатываем файлы (Don't process the files)
      contentType: false, // Так jQuery скажет серверу что это строковой запрос
      success: function( data ){
        if ( data) {
          window.hm.popUp('Сохранено', 1500);
          //console.log(data); 
        }else{
          window.hm.popUp('Ошибка сохранения', 2000);
          //console.log(data);  
        }
      },
      error: function( jqXHR, textStatus, errorThrown ){
        console.log('ОШИБКИ AJAX запроса: ' + textStatus );
      }
    });
  }
};
},{}],3:[function(require,module,exports){
module.exports =  function(){
  var 
    adminForms = $('.admin-form'),
    menList = $('.admin-nav__item');

  menList.click(function(){
    var that = this;
    if ($(that).hasClass('active')) {
      return;
    }else{
      $(that).siblings().removeClass('active');
      $(that).addClass('active');
      showForm();
    }
  });
 
  function showForm(){
    var count = 0;
    //функцыя покажет нужную форму и скроет не нужную решения принимаеться на основе активного елемента меню
    menList.each(function(){
      var that = this;
      if ( $(that).hasClass('active') ) {
        $(adminForms[count]).css('display', 'block');
      }else{
        $(adminForms[count]).css('display', 'none');
      }
      count++;  
    });
  }
  adminForms.css('display', 'none');
  showForm();
  
};
},{}],4:[function(require,module,exports){
module.exports = function(){
  var loginData = {};
  $('#login-nav__enter').on('click', function(){
    var
      loginForm = $('#login-form'),
      errors = [];

    loginData.login = loginForm.find('#login').val().trim(),
    loginData.pass = loginForm.find('#password').val().trim(),
    loginData.human = loginForm.find('#loginform_check').prop('checked'),
    loginData.exactlyHuman = loginForm.find('#radio_yes').prop('checked');
      
    for(var property in loginData){
      var propLalue = loginData[property];
      if ( propLalue === false || propLalue === true) {
        //значет это чекбоксы
        if (propLalue == false) {
          errors[1] = 'Пожоже что вы робот!<br>';
        }
      }else{
        //значет это строки
        var strLength = propLalue.length;
        if (strLength < 4 || strLength > 14) {
          errors[0] = 'Длинна логина и пароля должна быть от 4 до 14 символов!<br>';
        }
      }
    }
    if (errors.length > 0) {
      var message = '';
      errors.forEach(function(item){
        message += (item) ? item+'\n':' ';
        //console.log(item);
      });
      window.hm.popUp(message);
      return false;
    }
    //дале работа за сервером
  });
};
},{}],5:[function(require,module,exports){
module.exports = function(){
  var
    not_fixed = true,
    arrow_none = true,
    target = $('#section-articles'),
    articles = $('.article'),
    asideItem = $('.blog_aside__item'),
    asideList = $('.blog_aside__list'),
    aside = $('.blog_aside'),
    asideLoistButton = asideList.find('#blog_aside__list_button'),
    winHeight = $(window).height(),
    winScrollTop = '';
    
  if (target.length > 0) {
    $(window).on('scroll', function(){
      winScrollTop = $(window).scrollTop();
      fixet_nav();
      inWindow(articles, asideItem);
      showArrow();
    });
  }
  //позыцыонирование навигации
  function fixet_nav(){
   
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
  ///////////////////gпоказать скрыть боковое меню/////////////////////////////
  asideLoistButton.click(function(){
    var left = parseInt( aside.css('left') );
    if (left<0) {
      asideList.css({'left':'0px'});
      aside.css({'left': '0'});
    }else{
      asideList.css({'left':'-300px'});
      aside.css({'left': '-300px'});
    }
  });
  ///////////////////gпоказать скрыть боковое меню/////////////////////////////

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
  var savedIndexNumber = 0, currentIndexNumber = 0;
  function inWindow(articles, asideItem){
    var
      indent = parseInt( $(articles[0]).css('margin-bottom') ),
      currentEls = $(articles),
      result = [],
      offsetTop;

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
};
},{}],6:[function(require,module,exports){
module.exports = function(){

  //очистка формы, параметр форма в виде jquery обьект
  function clear(form){
    var inputs = form.find('input, textarea');

    inputs.each(function(){
      $(this).val('');
    });
  }

  
  var formBox = $('#contact-form-box');
  if (formBox.length < 1) {return;}
  var
    form = formBox.find('#contact-form'),
    buttons = formBox.find('.contact-form__buttons');

  //активные или не активные кнопки формы
  function toggleFormActive(buttons, data){
    if (data) {
      buttons.on('click', function(evt){
        sendMessege(evt);
      });
    }else{buttons.off();}
  }

  toggleFormActive(buttons, true);


  function sendMessege(evt){
    if ( $(evt.target).attr('id') === 'send-message' ) {
      var
        dataObj = window.hm.getData(form),
        dataArr = dataObj.data;
      //пройдемся по импутам но пропустим id текущей формы
      var
        errors = [],
        mail = '';
      for(var i=1; i<dataArr.length; i++){
        var
          currenId = dataArr[i][0],
          currentData = dataArr[i][1];

        if (currenId == 'mail') {mail = currentData;}

        if (currentData.length < 1) {
          var massege = [ ['name','Имя'], ['mail', 'Email'], ['message', 'Сообщение'] ];
          var currenInput = '';
          //посмотрим ссобщения с от имени какого поля нужно вывести
          massege.forEach(function(element){
            if (currenId === element[0]) {currenInput = element[1];}
          });
          errors[errors.length] = currenInput+' не может быть пустым! <br>';
        }
      }
      var r = /^\w+@\w+\.\w{2,4}$/i;
      if (errors.length < 1 && !r.test(mail) ){
        errors[errors.length] = 'Не коректный e-mail!';
      }
      if (errors.length < 1) {
        //если оштбок нет данные запрос на сервер
        sendMessage(dataObj);
        $('#send-message').attr('value', 'Подождите');
        //блоканем форму
        toggleFormActive(buttons, false);
      }else{window.hm.popUp(errors);}
      
    }else if($(evt.target).attr('id') === 'reset'){
      clear(form);
    }
  }


  function sendMessage(data){
    $.ajax({
      url: 'queries.php?',
      type: 'POST',
      data: data,
      //dataType: 'json',
      success: function( data ){
        if (data === 'true') {
          window.hm.popUp('Сообщение отправлено!', 3000);
          clear(form);
        }else{
          window.hm.popUp('ОШИБКА ОТПРАВКИ!', 3000);
        }
      },
      error: function( jqXHR, textStatus ){
        console.log('ОШИБКИ AJAX запроса: ' + textStatus );
      },
      complete: function(){
        $('#send-message').attr('value', 'Отправить');
        toggleFormActive(buttons, true);
      }
    });
  }

};
},{}],7:[function(require,module,exports){
module.exports = function () {
  var
    layer = $('.parallax').find('.parallax__layer'),
    layerScroll = $('.parallax_scroll').find('.parallax__layer');
  $(window).on('mousemove', function (e) { 
    var
      mouse_dx = (e.pageX), // Узнаем положение мышки по X
      mouse_dy = (e.pageY), // Узнаем положение мышки по Y
      w = (window.innerWidth / 2) - mouse_dx, // Вычисляем для x перемещения
      h = (window.innerHeight / 2) - mouse_dy; // Вычисляем для y перемещения

    layer.map(function (key, value) {
      var
        widthPosition = w * (key / 100), // Вычисляем коофицент смешения по X
        heightPosition = h * (key / 100); // Вычисляем коофицент смешения по Y

      $(value).css({
        'transform': 'translate3d(' + widthPosition + 'px, ' + heightPosition + 'px, 0)'
      });
    });
  });
  var windowHeigth = $(window).height();
  $(window).on('scroll', function(){
    var winScrollTop = $(window).scrollTop();
    if (windowHeigth > winScrollTop) {
      layerScroll.map(function (key, value){
        var bias = winScrollTop * (key/20);
        $(value).css({
          'transform': 'translate3d(0, ' + -bias +'px, 0)'
        });
      });
    } else{return;}
  });
};  
},{}],8:[function(require,module,exports){
module.exports = function () {
  $('.about-wrapper, .blog-wrapper, .index-wrapper, .works-wrapper, .admin-wrapper').css({'display':'none'});
  var imgs = [];
  $.each($('*'), function () {
    var $this = $(this),
      background = $this.css('background-image'),
      img = $this.is('img');
    if (background != 'none') {
      var path = background.replace('url("', '').replace('")', '');

      imgs.push(path);
    }
    if (img) {
      path = $this.attr('src');
      imgs.push(path);
    }
  });
  var percents = 1;
  for (var i = 0; i < imgs.length; i++) {
    var image = $('<img>', {
      attr: {
        src : imgs[i]
      }
    });
    image.load(function () {
      setPercents(imgs.length, percents);
      percents++;
    });
    image.error(function () {
      setPercents(imgs.length, percents);
      percents++;
    });
  }
  //ЕСЛИ КАРТИНОК НЕТ 
  if(imgs.length === 0){
    setPercents(1,1);
  }
  function setPercents(total, current) {
    var percent = Math.ceil(current / total * 100);
    if (percent >= 100) {
      $('.about-wrapper, .blog-wrapper, .index-wrapper, .works-wrapper, .admin-wrapper').css({'display':'block'});
      $('.plate-front').addClass('animate_plate');
      $('.loader-wrapper').fadeOut(1500, function(){
        setTimeout(function(){
          $('.plate-front').removeClass('animate_plate');
        }, 2000);
      });
    }
    $('.loader__percent').text(percent + '%');
  }
};
},{}],9:[function(require,module,exports){
module.exports = function(){
  var
    transition = 300,
    menuButton = $('#menu-button');

  menuButton.click(function(){
    var close = $('.curtain-left').hasClass('closeCurtainsL');
    if(close){
      close_menu();
    }else{
      show_menu();
    }
  });
  function close_menu(){
    menuButton.removeClass('menu-button-close');
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
  var
    arr = $('.main-nav-list-item'),
    arr_length = arr.length;

  function show_menu(){
    menuButton.addClass('menu-button-close');
    $(arr).find('a').css({'transform': 'scale(0)', 'transition-duration':transition+'ms'});
    var current = 0;
    $('.curtain-left').addClass('closeCurtainsL');
    $('.curtain-right').addClass('closeCurtainsR');
    setTimeout(function(){
      $('#main-nav').addClass('block');
      var timerId = setInterval(function(){
        var a = $(arr[current]).find('a');
        a.css({'transform':'scale(1)'});
        if (current >= arr_length-1) {
          clearTimeout(timerId);
        }
        current++;
      }, transition/2); 

    }, transition);
  }
}
},{}],10:[function(require,module,exports){
//анимирования текста в слайдере
module.exports = function(){
  var timeout = 600;
  (function(){
    var
      descriptions = $('.slider__image-description'),
      titles = descriptions.find('h2'),
      technologists = descriptions.find('p');
      //функция подготовит текст к анимации порубает на отдельные буквы все что надо
    function fraction(e){
      e.forEach(function(item){
        item.each(function(){
          var
            that = $(this),
            string = that.text();
          that.html(string.replace(/./g, '<span class="letter">$&</span>'));
          //присвоем каждой букве необходимую задержку перед анимацией
          var
            letters = that.find('span'),
            dealy = 0;
          letters.each(function(){
            var
              that = $(this),
              leterLength = letters.length;
            that.css({'animation-delay':dealy+'ms'});
            dealy += parseInt(timeout / leterLength, 10);
          });
        });
      }); 
      return;
    }
    fraction([titles, technologists]);
  })();
  
  function textAnimate(that){
    var
      letterList = that.find('.letter'),
      listLength = letterList.length,
      i = 0;

    (function showLetter(){
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
      i++;
      (function(){
        if (i < listLength) {
          showLetter();
        }else{
          letterList.addClass('showLetter');
        }
      })();
    })();
  }
//конец анимирования текста в слайдере

//смена изображений и описания в слайдере
  (function(){
    $('.slider__bottom-preview li, .slider__top-preview li, .slider__images-list').css({'transition-duration':timeout+'ms'});
    $('.slider__images-list').css({ 'transition-duration':timeout/2+'ms'});
    var buttons = $('.slider__buttons-bottom, .slider__buttons-top');
    buttons.on('click', function(evt){
      callSlider(evt);
    });
    function callSlider(evt){
      //удалим обработчик
      buttons.off();
      setTimeout(function(){
        //вернём обработчик
        buttons.on('click', function(evt){callSlider(evt);});
      },timeout*1.5);
      slider(evt);
    }
    function changeDescription(i){
      var
        desc = $('.slider__image-description').clone(),
        title = $(desc[i]).find('h2').addClass('animateText'),
        technologies = $(desc[i]).find('p').addClass('animateText'),
        link = $(desc[i]).find('a');

      $('.work-description__title h2').replaceWith(title);
      $('.work-description__technologies p').replaceWith(technologies);
      $('.work-description__botton a').replaceWith(link);
      textAnimate($('.animateText'));
    }
    //уставим описание текущей работы
    changeDescription(0);
    var imageList  = $('.slider__images-list');
    function slider(evt){
      var images, arrLenght, botton, prev, prevLeft, prevRight, prev1Left,prev2Left,
        prev1Right, prev2Right, currentLeftLi, nextLeftLi, currentRightLi, nextRightLi;

      images     = imageList.find('li');
      arrLenght  = images.length;
      botton     = $(evt.currentTarget).attr('class');
      prev       = $('.slider__buttons');
      prevLeft   = prev.find('.slider__bottom-preview li');
      prevRight  = prev.find('.slider__top-preview li');
      prev1Left  = $(prevLeft[1]);
      prev2Left  = $(prevLeft[0]);
      prev1Right = $(prevRight[1]);
      prev2Right = $(prevRight[0]);
        
      //узнаем текущий и следующий елементы превьюх, текущий тот что видим, а следующийелемент тот что пока что скрыт 
      if (prev1Left.position().top > prev2Left.position().top) {
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
      //узнаем текущий и следующий елементы превьюх, текущий тот что видим, а следу
      //узнаем текущий и следующий елементы превьюх, текущий тот который на виду, а следующийелемент тот что пока что скрыт
      if (prev1Right.position().top < prev2Right.position().top) {
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
              currentElement.css({'transition-duration':'0ms', 'transform':'translateY(0)'});
            }else if (prev == 'right') {
              currentElement = newSrc(currentElement, newLi);
              currentElement.css({'transition-duration':'0ms', 'transform':'translateY(100%)'});
            }
          }, timeout);
        }
        function move(direction, currentElement, nextElement){
          if (currentElement === undefined || nextElement === undefined) {
            currentElement = currentLi;
            nextElement = nextLi;
          }
          nextElement.css({'transition-duration':timeout+'ms'});
          if (direction == 'bot') {
            currentElement.css({'transform':'translateY(200%)'});
            nextElement.css({'transform':'translateY(100%)'});
          }else if(direction == 'top'){
            currentElement.css({'transform':'translateY(-100%)'});
            nextElement.css({'transform':'translateY(0)'});  
          } 
        }
      }
  //функция меняет катринку и h1 в li элементте
      function newSrc(oldLi, newLi){
        var
          tmpSrc = $(newLi).find('img').attr('src'),
          tmpH1 = $(newLi).find('h1').html();
        //заменим адрес к картинке
        oldLi.find('img').attr({'src':tmpSrc});
        //заменим контент в h1
        oldLi.find('h1').html(tmpH1);
        return oldLi;
      }
      changeMainImage();
    }
  })();
};
},{}]},{},[1]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuXG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9zbGlkZXIuanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvYmxvZ19wYWdlL2Jsb2cuanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvc2hvd19oaWRlX21lbnUuanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvcGFyYWxheC5qcycpKCk7XG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9jb21tdW5pY2F0aW9uX2Zvcm0uanMnKSgpO1xuICByZXF1aXJlKCcuL21vZHVsZXMvYWRtaW5fc2NyaXB0cy9sb2dpbl9mb3JtLmpzJykoKTtcbiAgcmVxdWlyZSgnLi9tb2R1bGVzL2FkbWluX3NjcmlwdHMvYWRtaW5fbWVudS5qcycpKCk7XG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9hZG1pbl9zY3JpcHRzL2FkbWluX2Zvcm1fcHJvY2Vzc2luZy5qcycpKCk7XG4gIHJlcXVpcmUoJy4vbW9kdWxlcy9wcmVsb2FkZXIuanMnKSgpO1xuXG4vLyDQv9C70LDQstC90YvQuSDRgdC60YDQvtC7XG4gICQoJ2FbaHJlZl49XCIjXCJdJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICB2YXIgZWxlbWVudENsaWNrID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgLy/QtdGB0LvQuCDQtdC70LXQvNC10L3RgtCwINGBINC90YPQttC90YvQvCBpZCDQvdC10YLRgywg0LTQstC40LPQsNC10LzRgdGPINC6INGC0LXQs9GDINCwINGBINC90YPQttC90YvQvCDQuNC80LXQvdC10LxcbiAgICB2YXIgZWxlbWVudERpcmVjdGlvbiA9ICgkKGVsZW1lbnRDbGljaykubGVuZ3RoID4gMTApPyAkKGVsZW1lbnRDbGljaykgOiAkKCdhW25hbWU9JytlbGVtZW50Q2xpY2suc3Vic3RyKDEpKyddJyk7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gZWxlbWVudERpcmVjdGlvbi5vZmZzZXQoKS50b3A7ICAvL9GD0LfQvdCw0LXQvCDQvNC10YHRgtC+INC90LDQt9C90LDRh9C10L3QuNGPIFxuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6IGRlc3RpbmF0aW9ufSwgMTAwMCk7ICAvL9C00LLQuNCz0LDQtdC8INC6INC90LjQvNGDXG4gICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgICAgICAgICAgIFxuICB9KTtcblxuXG4vL9C/0LXRgNC10LLQtdGA0L3Rg9GC0Ywg0L/Qu9Cw0YjQutGDXG4gICQoJyN0by1tYWluLWJ1dCwgI2F1dGhvcml6YXRpb24tYnV0dG9uJykub24oJ2NsaWNrJyxmdW5jdGlvbigpe1xuICAgICQoJyNwbGF0ZScpLnRvZ2dsZUNsYXNzKCdwbGF0ZS1mcm9udCcpO1xuICB9KTtcblxuXG4vL3NraWxscyBwZXJzZW50XG4gIChmdW5jdGlvbigpe1xuICAgIHZhclxuICAgICAgdGFyZ2V0ID0gJCgnLm15LXNraWxscy1ib3gtY2VlbnRlcicpLFxuICAgICAgd2luZG93SGVpZ3RoID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXG4gICAgaWYodGFyZ2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHZhclxuICAgICAgICBza2lsbHMgPSAkKCcubXktc2tpbGxzX19pdGVtJyksXG4gICAgICAgIGRhdGE7XG5cbiAgICAgIHRhcmdldCA9IHRhcmdldC5vZmZzZXQoKS50b3A7XG4gICAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3aW5TY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgICAgIGlmICh3aW5TY3JvbGxUb3Ard2luZG93SGVpZ3RoLzEwKjcgPiB0YXJnZXQpIHtcbiAgICAgICAgICBza2lsbHMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICAgIGRhdGEgPSAkdGhpcy5hdHRyKCdkYXRhLXNraWxsJyk7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAwKSB7ZGF0YSA9IDE7fVxuICAgICAgICAgICAgZGF0YSA9ICBwYXJzZUludCggNzIyKihkYXRhLzEwMCkgKTtcbiAgICAgICAgICAgICR0aGlzLmZpbmQoJy5zZWN0b3InKS5jc3MoeydzdHJva2UtZGFzaGFycmF5JzpkYXRhKycgNzIyJ30pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKCk7XG5cblxuLy9wb3BfdXBcbiAgd2luZG93LmhtID0ge307XG4gIHdpbmRvdy5obS5wb3BVcCA9IGZ1bmN0aW9uIHBvcFVwKG1lc3NhZ2UsIHRpbWUpe1xuICAgIGlmICh0aW1lID09IHVuZGVmaW5lZCkge3RpbWUgPSA1MDAwO31cbiAgICAkKCcjcG9wX3VwLWNvbnRlbnQnKS5odG1sKG1lc3NhZ2UpO1xuICAgICQoJyNwb3BfdXAnKS5hZGRDbGFzcygnc2hvdycpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICQoJyNwb3BfdXAnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH0sIHRpbWUpO1xuICB9O1xuXG4gIChmdW5jdGlvbigpe1xuICAgICQoJyNwb3BfdXAtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICQoJyNwb3BfdXAnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH0pO1xuICB9KSgpO1xuXG5cbi8v0YPQtNCw0LvQuNC6INGE0YDQtdC50Lwg0YEg0LrQsNGA0YLQvtC5INC90LAg0LzQvtCx0LjQu9GM0L3Ri9GFXG4gIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSA0MTYpIHtcbiAgICAkKCcuc2VjdGlvbi1jb250YWN0cyBpZnJhbWUnKS5yZW1vdmUoKTtcbiAgfVxuXG5cbi8qXG7QsdC10YDRkdGCINC00LDQvdC90YvQtSDRgSDRhNC+0YDQvNGLINC/0L7Qu9GD0YfQtdC90L7QuSDQsiDQutCw0YfQtdGB0YLQstC1INC/0LDRgNCw0LzQtdGC0YDQsCDQuCDRgdGE0L7RgNC80LjRgNGD0LXQvCDQvtCx0YzQtdC60YIg0LTQsNC90L3Ri9GFXG7RgSDQtNCy0L7QvNCwINGB0LLQvtC50YHRgtCy0LDQvNC4LCBmb3JtSWQg0LggZGF0YSDQsiDQutC+0YLQvtGA0L7QvCDRhdGA0LDQvdC40YLRjNGB0Y8g0LzQsNGB0LjQsiDRgSDQtNCw0L3QvdGL0LzQuFxu0LTQu9GPINC00LDQu9GM0L3QtdC50YjQtdC5INC+0LHRgNCw0LHQvtGC0LrQuCDQuNC70Lgg0L7RgtC/0YDQsNCy0LrQuCDQvdCwINGB0LXRgNCy0LXRgFxuKi9cbiAgd2luZG93LmhtLmdldERhdGEgPSBmdW5jdGlvbiBnZXREYXRhKGZvcm0pe1xuICAgIHZhclxuICAgICAgZm9ybUlkID0gZm9ybS5hdHRyKCdpZCcpLFxuICAgICAgaW5wdXRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKTtcblxuICAgIHZhciBvYmogPSB7XG4gICAgICBmb3JtSWQ6IGZvcm1JZCxcbiAgICAgIGRhdGE6W11cbiAgICB9O1xuICAgIGlucHV0cy5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdGhhdCA9ICQodGhpcyksIGN1cmVudERhdGEgPSBbdGhhdC5hdHRyKCdpZCcpLCB0aGF0LnZhbCgpLnRyaW0oKV07XG4gICAgICBvYmouZGF0YVtvYmouZGF0YS5sZW5ndGhdID0gY3VyZW50RGF0YTtcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4vL9GB0LrRgNGL0YLRjCDQvdC1INC90YPQttC90YPRjiDRgdGB0YvQu9C60YMg0LLRhtC10L/Qu9C10L3Rg9GOINGF0L7RgdGC0LjQvdCz0L7QvFxuICAoZnVuY3Rpb24gY2xlYW5QYWdlKCl7XG4gICAgdmFyIGJhZENvbnQgPSAkKCcuY2JhbGluaycpO1xuICAgIGlmIChiYWRDb250Lmxlbmd0aCA+IDAgKSB7XG4gICAgICBiYWRDb250LmNzcyh7J2Rpc3BsYXknOidub25lJ30pO1xuICAgIH1cbiAgfSkoKTtcblxufSk7XG59LHtcIi4vbW9kdWxlcy9hZG1pbl9zY3JpcHRzL2FkbWluX2Zvcm1fcHJvY2Vzc2luZy5qc1wiOjIsXCIuL21vZHVsZXMvYWRtaW5fc2NyaXB0cy9hZG1pbl9tZW51LmpzXCI6MyxcIi4vbW9kdWxlcy9hZG1pbl9zY3JpcHRzL2xvZ2luX2Zvcm0uanNcIjo0LFwiLi9tb2R1bGVzL2Jsb2dfcGFnZS9ibG9nLmpzXCI6NSxcIi4vbW9kdWxlcy9jb21tdW5pY2F0aW9uX2Zvcm0uanNcIjo2LFwiLi9tb2R1bGVzL3BhcmFsYXguanNcIjo3LFwiLi9tb2R1bGVzL3ByZWxvYWRlci5qc1wiOjgsXCIuL21vZHVsZXMvc2hvd19oaWRlX21lbnUuanNcIjo5LFwiLi9tb2R1bGVzL3NsaWRlci5qc1wiOjEwfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKCQoJy5hZG1pbi1mb3JtJykubGVuZ3RoIDwgMSl7cmV0dXJuO31cclxuICAvL9C40LfQvNC10L3QuNC8INGG0LLQtdGCIHBvcFVwINC00LvRjyDQsNC00LzQuNC90LrQuFxyXG4gICQoJyNwb3BfdXAnKS5jc3MoeydiYWNrZ3JvdW5kLWNvbG9yJzonIzAwQTc4RSd9KTtcclxuICB2YXJcclxuICAgIGZvcm1BYm91dE1lID0gJCgnI2FkbWluLWFib3V0LW1lJyksXHJcbiAgICBmb3JtQmxvZyA9ICQoJyNhZG1pbi1ibG9nJyksXHJcbiAgICBmb3JtV29ya3MgPSAkKCcjYWRtaW4td29ya3MnKTsgIFxyXG5cclxuICAvL9C/0YDQvtCy0LXRgNGP0LXQvCDQstCy0L7QtNC40YLRgdGPINC70Lgg0LIgaW5wdXQg0YfQuNGB0LvQviDQtdGB0LvQuCDQvdC10YIg0YfQuNGB0YLQuNC8INC10LPQvlxyXG4gIGZvcm1BYm91dE1lLmZpbmQoJ2lucHV0Jykub24oJ2lucHV0JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciB2YWx1ZSA9IHBhcnNlSW50KCAkKHRoaXMpLnZhbCgpICk7XHJcbiAgICBpZiAoIGlzTmFOKHZhbHVlKSApIHskKHRoaXMpLnZhbCgnJyk7fVxyXG4gIH0pO1xyXG4gIFxyXG5cclxuICBmb3JtQWJvdXRNZS5maW5kKCcjYWRtaW4tYWJvdXQtbWVfX3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGRhdGEgPSB3aW5kb3cuaG0uZ2V0RGF0YShmb3JtQWJvdXRNZSk7XHJcbiAgICBzZW5kRGF0YShkYXRhKTtcclxuICB9KTtcclxuXHJcblxyXG4gIGZvcm1CbG9nLmZpbmQoJyNhZG1pbi1ibG9nX19zYXZlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBkYXRhID0gd2luZG93LmhtLmdldERhdGEoZm9ybUJsb2cpO1xyXG5cclxuICAgIGlmIChkYXRhLmRhdGFbMF1bMV0gPT0gJycgfHwgZGF0YS5kYXRhWzJdWzFdID09ICcnKSB7XHJcbiAgICAgIHdpbmRvdy5obS5wb3BVcCgn0J/QvtC70Y8g0L3QsNC30LLQsNC90LjQtSDQuCDRgdC+0LTQtdGA0LbQsNC90LjQtSDQvtCx0LXQt9Cw0YLQtdC70YzQvdGLINC00LvRjyDQt9Cw0L/QvtC70L3QtdC90LjRjycsIDMwMDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZW5kRGF0YShkYXRhKTtcclxuICB9KTtcclxuXHJcblxyXG4gIHZhciBmaWxlcyA9ICcnO1xyXG4gICQoJ2lucHV0W3R5cGU9ZmlsZV0nKS5jaGFuZ2UoZnVuY3Rpb24oKXtcclxuICAgIGZpbGVzID0gdGhpcy5maWxlcztcclxuICB9KTtcclxuXHJcblxyXG4gIGZvcm1Xb3Jrcy5maW5kKCcjYWRtaW4td29ya3NfX3NhdmUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyXHJcbiAgICAgIGRhdGFPYmogPSB3aW5kb3cuaG0uZ2V0RGF0YShmb3JtV29ya3MpLFxyXG4gICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YU9iaiksXHJcbiAgICAgIG9iakZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgIFxyXG4gICAgJC5lYWNoKCBmaWxlcywgZnVuY3Rpb24oIGtleSwgdmFsdWUgKXtcclxuICAgICAgb2JqRm9ybURhdGEuYXBwZW5kKCBrZXksIHZhbHVlICk7XHJcbiAgICB9KTtcclxuICAgIG9iakZvcm1EYXRhLmFwcGVuZCgnZGF0YScsIGRhdGEpO1xyXG4gICAgXHJcbiAgICBpZiAoZGF0YU9iai5kYXRhWzBdWzFdID09ICcnIHx8IGRhdGFPYmouZGF0YVsyXVsxXSA9PSAnJyB8fCBkYXRhT2JqLmRhdGFbM11bMV0gPT0gJycpIHtcclxuICAgICAgd2luZG93LmhtLnBvcFVwKCfQktGB0LUg0L/QvtC70Y8g0L7QsdC10LfQsNGC0LXQu9GM0L3RiyDQuiDQt9Cw0L/QvtC70L3QtdC90LjRjicsIDMwMDApO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBzZW5kRmlsZShvYmpGb3JtRGF0YSk7XHJcbiAgXHJcbiAgfSk7XHJcblxyXG5cclxuICBmdW5jdGlvbiBzZW5kRGF0YShkYXRhKXtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogJ3F1ZXJpZXMucGhwPycsXHJcbiAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oIGRhdGEgKXtcclxuICAgICAgICBpZiAoIGRhdGEpIHtcclxuICAgICAgICAgIHdpbmRvdy5obS5wb3BVcCgn0KHQvtGF0YDQsNC90LXQvdC+JywgMTUwMCk7XHJcbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpOyAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB3aW5kb3cuaG0ucG9wVXAoJ9Ce0YjQuNCx0LrQsCDRgdC+0YXRgNCw0L3QtdC90LjRjycsIDIwMDApO1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCBqcVhIUiwgdGV4dFN0YXR1cyApe1xyXG4gICAgICAgIHdpbmRvdy5obS5wb3BVcCgn0J7RiNC40LHQutCwJywgMjAwMCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ9Ce0KjQmNCR0JrQmCBBSkFYINC30LDQv9GA0L7RgdCwOiAnICsgdGV4dFN0YXR1cyApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICBmdW5jdGlvbiBzZW5kRmlsZShkYXRhKXtcclxuICAgICQuYWpheCh7XHJcbiAgICAgIHVybDogJ3F1ZXJpZXMucGhwJyxcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIHByb2Nlc3NEYXRhOiBmYWxzZSwgLy8g0J3QtSDQvtCx0YDQsNCx0LDRgtGL0LLQsNC10Lwg0YTQsNC50LvRiyAoRG9uJ3QgcHJvY2VzcyB0aGUgZmlsZXMpXHJcbiAgICAgIGNvbnRlbnRUeXBlOiBmYWxzZSwgLy8g0KLQsNC6IGpRdWVyeSDRgdC60LDQttC10YIg0YHQtdGA0LLQtdGA0YMg0YfRgtC+INGN0YLQviDRgdGC0YDQvtC60L7QstC+0Lkg0LfQsNC/0YDQvtGBXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCBkYXRhICl7XHJcbiAgICAgICAgaWYgKCBkYXRhKSB7XHJcbiAgICAgICAgICB3aW5kb3cuaG0ucG9wVXAoJ9Ch0L7RhdGA0LDQvdC10L3QvicsIDE1MDApO1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTsgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB3aW5kb3cuaG0ucG9wVXAoJ9Ce0YjQuNCx0LrQsCDRgdC+0YXRgNCw0L3QtdC90LjRjycsIDIwMDApO1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTsgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCBqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24gKXtcclxuICAgICAgICBjb25zb2xlLmxvZygn0J7QqNCY0JHQmtCYIEFKQVgg0LfQsNC/0YDQvtGB0LA6ICcgKyB0ZXh0U3RhdHVzICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufTtcbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24oKXtcclxuICB2YXIgXHJcbiAgICBhZG1pbkZvcm1zID0gJCgnLmFkbWluLWZvcm0nKSxcclxuICAgIG1lbkxpc3QgPSAkKCcuYWRtaW4tbmF2X19pdGVtJyk7XHJcblxyXG4gIG1lbkxpc3QuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIGlmICgkKHRoYXQpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9ZWxzZXtcclxuICAgICAgJCh0aGF0KS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgJCh0aGF0KS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgIHNob3dGb3JtKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiBcclxuICBmdW5jdGlvbiBzaG93Rm9ybSgpe1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIC8v0YTRg9C90LrRhtGL0Y8g0L/QvtC60LDQttC10YIg0L3Rg9C20L3Rg9GOINGE0L7RgNC80YMg0Lgg0YHQutGA0L7QtdGCINC90LUg0L3Rg9C20L3Rg9GOINGA0LXRiNC10L3QuNGPINC/0YDQuNC90LjQvNCw0LXRgtGM0YHRjyDQvdCwINC+0YHQvdC+0LLQtSDQsNC60YLQuNCy0L3QvtCz0L4g0LXQu9C10LzQtdC90YLQsCDQvNC10L3RjlxyXG4gICAgbWVuTGlzdC5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgaWYgKCAkKHRoYXQpLmhhc0NsYXNzKCdhY3RpdmUnKSApIHtcclxuICAgICAgICAkKGFkbWluRm9ybXNbY291bnRdKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgJChhZG1pbkZvcm1zW2NvdW50XSkuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgfVxyXG4gICAgICBjb3VudCsrOyAgXHJcbiAgICB9KTtcclxuICB9XHJcbiAgYWRtaW5Gb3Jtcy5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gIHNob3dGb3JtKCk7XHJcbiAgXHJcbn07XG59LHt9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXtcclxuICB2YXIgbG9naW5EYXRhID0ge307XHJcbiAgJCgnI2xvZ2luLW5hdl9fZW50ZXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyXHJcbiAgICAgIGxvZ2luRm9ybSA9ICQoJyNsb2dpbi1mb3JtJyksXHJcbiAgICAgIGVycm9ycyA9IFtdO1xyXG5cclxuICAgIGxvZ2luRGF0YS5sb2dpbiA9IGxvZ2luRm9ybS5maW5kKCcjbG9naW4nKS52YWwoKS50cmltKCksXHJcbiAgICBsb2dpbkRhdGEucGFzcyA9IGxvZ2luRm9ybS5maW5kKCcjcGFzc3dvcmQnKS52YWwoKS50cmltKCksXHJcbiAgICBsb2dpbkRhdGEuaHVtYW4gPSBsb2dpbkZvcm0uZmluZCgnI2xvZ2luZm9ybV9jaGVjaycpLnByb3AoJ2NoZWNrZWQnKSxcclxuICAgIGxvZ2luRGF0YS5leGFjdGx5SHVtYW4gPSBsb2dpbkZvcm0uZmluZCgnI3JhZGlvX3llcycpLnByb3AoJ2NoZWNrZWQnKTtcclxuICAgICAgXHJcbiAgICBmb3IodmFyIHByb3BlcnR5IGluIGxvZ2luRGF0YSl7XHJcbiAgICAgIHZhciBwcm9wTGFsdWUgPSBsb2dpbkRhdGFbcHJvcGVydHldO1xyXG4gICAgICBpZiAoIHByb3BMYWx1ZSA9PT0gZmFsc2UgfHwgcHJvcExhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgLy/Qt9C90LDRh9C10YIg0Y3RgtC+INGH0LXQutCx0L7QutGB0YtcclxuICAgICAgICBpZiAocHJvcExhbHVlID09IGZhbHNlKSB7XHJcbiAgICAgICAgICBlcnJvcnNbMV0gPSAn0J/QvtC20L7QttC1INGH0YLQviDQstGLINGA0L7QsdC+0YIhPGJyPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICAvL9C30L3QsNGH0LXRgiDRjdGC0L4g0YHRgtGA0L7QutC4XHJcbiAgICAgICAgdmFyIHN0ckxlbmd0aCA9IHByb3BMYWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHN0ckxlbmd0aCA8IDQgfHwgc3RyTGVuZ3RoID4gMTQpIHtcclxuICAgICAgICAgIGVycm9yc1swXSA9ICfQlNC70LjQvdC90LAg0LvQvtCz0LjQvdCwINC4INC/0LDRgNC+0LvRjyDQtNC+0LvQttC90LAg0LHRi9GC0Ywg0L7RgiA0INC00L4gMTQg0YHQuNC80LLQvtC70L7QsiE8YnI+JztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xyXG4gICAgICBlcnJvcnMuZm9yRWFjaChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICBtZXNzYWdlICs9IChpdGVtKSA/IGl0ZW0rJ1xcbic6JyAnO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaXRlbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB3aW5kb3cuaG0ucG9wVXAobWVzc2FnZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8v0LTQsNC70LUg0YDQsNCx0L7RgtCwINC30LAg0YHQtdGA0LLQtdGA0L7QvFxyXG4gIH0pO1xyXG59O1xufSx7fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyXHJcbiAgICBub3RfZml4ZWQgPSB0cnVlLFxyXG4gICAgYXJyb3dfbm9uZSA9IHRydWUsXHJcbiAgICB0YXJnZXQgPSAkKCcjc2VjdGlvbi1hcnRpY2xlcycpLFxyXG4gICAgYXJ0aWNsZXMgPSAkKCcuYXJ0aWNsZScpLFxyXG4gICAgYXNpZGVJdGVtID0gJCgnLmJsb2dfYXNpZGVfX2l0ZW0nKSxcclxuICAgIGFzaWRlTGlzdCA9ICQoJy5ibG9nX2FzaWRlX19saXN0JyksXHJcbiAgICBhc2lkZSA9ICQoJy5ibG9nX2FzaWRlJyksXHJcbiAgICBhc2lkZUxvaXN0QnV0dG9uID0gYXNpZGVMaXN0LmZpbmQoJyNibG9nX2FzaWRlX19saXN0X2J1dHRvbicpLFxyXG4gICAgd2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgd2luU2Nyb2xsVG9wID0gJyc7XHJcbiAgICBcclxuICBpZiAodGFyZ2V0Lmxlbmd0aCA+IDApIHtcclxuICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcclxuICAgICAgd2luU2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICBmaXhldF9uYXYoKTtcclxuICAgICAgaW5XaW5kb3coYXJ0aWNsZXMsIGFzaWRlSXRlbSk7XHJcbiAgICAgIHNob3dBcnJvdygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8v0L/QvtC30YvRhtGL0L7QvdC40YDQvtCy0LDQvdC40LUg0L3QsNCy0LjQs9Cw0YbQuNC4XHJcbiAgZnVuY3Rpb24gZml4ZXRfbmF2KCl7XHJcbiAgIFxyXG4gICAgdmFyIHRhcmdldFBvcyA9IHRhcmdldC5vZmZzZXQoKS50b3A7XHJcblxyXG4gICAgaWYod2luU2Nyb2xsVG9wID49IHRhcmdldFBvcyAmJiBub3RfZml4ZWQpe1xyXG4gICAgICB2YXIgdG9wID0gJChhc2lkZUxpc3QpLnBvc2l0aW9uKCkudG9wO1xyXG4gICAgICB2YXIgbGVmdCA9ICQoYXNpZGVMaXN0KS5vZmZzZXQoKS5sZWZ0O1xyXG4gICAgICAkKGFzaWRlTGlzdCkuY3NzKHsncG9zaXRpb24nOidmaXhlZCcsICd0b3AnOiB0b3ArJ3B4JywgJ2xlZnQnOiBsZWZ0KydweCd9KTtcclxuICAgICAgbm90X2ZpeGVkID0gZmFsc2U7XHJcbiAgICB9ZWxzZSBpZih3aW5TY3JvbGxUb3AgPCB0YXJnZXRQb3MgJiYgIW5vdF9maXhlZCkge1xyXG4gICAgICAkKGFzaWRlTGlzdCkuY3NzKHsncG9zaXRpb24nOidzdGF0aWMnfSk7XHJcbiAgICAgIG5vdF9maXhlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy9n0L/QvtC60LDQt9Cw0YLRjCDRgdC60YDRi9GC0Ywg0LHQvtC60L7QstC+0LUg0LzQtdC90Y4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIGFzaWRlTG9pc3RCdXR0b24uY2xpY2soZnVuY3Rpb24oKXtcclxuICAgIHZhciBsZWZ0ID0gcGFyc2VJbnQoIGFzaWRlLmNzcygnbGVmdCcpICk7XHJcbiAgICBpZiAobGVmdDwwKSB7XHJcbiAgICAgIGFzaWRlTGlzdC5jc3MoeydsZWZ0JzonMHB4J30pO1xyXG4gICAgICBhc2lkZS5jc3MoeydsZWZ0JzogJzAnfSk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgYXNpZGVMaXN0LmNzcyh7J2xlZnQnOictMzAwcHgnfSk7XHJcbiAgICAgIGFzaWRlLmNzcyh7J2xlZnQnOiAnLTMwMHB4J30pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy9n0L/QvtC60LDQt9Cw0YLRjCDRgdC60YDRi9GC0Ywg0LHQvtC60L7QstC+0LUg0LzQtdC90Y4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICAvL9C/0L7QutCw0LfQsNGC0Ywg0YHQutGA0YvRgtGMINGB0YLRgNC10LvQutGDINCy0LLQtdGA0YVcclxuICBmdW5jdGlvbiBzaG93QXJyb3coKXtcclxuICAgIGlmICh3aW5IZWlnaHQgPD0gd2luU2Nyb2xsVG9wICYmIGFycm93X25vbmUpIHtcclxuICAgICAgJCgnLmFycm93LXRvcCcpLmNzcyh7J2Rpc3BsYXknOidibG9jayd9KTtcclxuICAgICAgYXJyb3dfbm9uZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih3aW5IZWlnaHQgPiB3aW5TY3JvbGxUb3AgJiYgIWFycm93X25vbmUpe1xyXG4gICAgICAkKCcuYXJyb3ctdG9wJykuY3NzKHsnZGlzcGxheSc6J25vbmUnfSk7XHJcbiAgICAgIGFycm93X25vbmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICAvL9C/0L7QutGA0LDRgdC40YIg0LXQu9C10LzQtdC90YIg0L3QsNCy0LjQs9Cw0YbQuNC+0L3QvdC+0LPQviDQvNC10L3RjiDQutC+0YLQvtGA0YvQuSDRgdC+0YLQstC10YLRgdGC0LLRg9C10YIg0YLQtdC60YPRidC10Lkg0YHRgtCw0YLQuFxyXG4gIHZhciBzYXZlZEluZGV4TnVtYmVyID0gMCwgY3VycmVudEluZGV4TnVtYmVyID0gMDtcclxuICBmdW5jdGlvbiBpbldpbmRvdyhhcnRpY2xlcywgYXNpZGVJdGVtKXtcclxuICAgIHZhclxyXG4gICAgICBpbmRlbnQgPSBwYXJzZUludCggJChhcnRpY2xlc1swXSkuY3NzKCdtYXJnaW4tYm90dG9tJykgKSxcclxuICAgICAgY3VycmVudEVscyA9ICQoYXJ0aWNsZXMpLFxyXG4gICAgICByZXN1bHQgPSBbXSxcclxuICAgICAgb2Zmc2V0VG9wO1xyXG5cclxuICAgIGN1cnJlbnRFbHMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgZWxlbWVudCA9ICQodGhpcyk7XHJcbiAgICAgIG9mZnNldFRvcCA9IGVsZW1lbnQub2Zmc2V0KCkudG9wO1xyXG4gICAgICBvZmZzZXRUb3AgPSBwYXJzZUludChvZmZzZXRUb3ApO1xyXG4gICAgICBpZiggd2luU2Nyb2xsVG9wK2luZGVudCoyID4gb2Zmc2V0VG9wICl7XHJcbiAgICAgICAgcmVzdWx0LnB1c2godGhpcyk7XHJcbiAgICAgICAgY3VycmVudEluZGV4TnVtYmVyID0gcmVzdWx0Lmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKCBzYXZlZEluZGV4TnVtYmVyICE9PSBjdXJyZW50SW5kZXhOdW1iZXIpIHtcclxuICAgICAgc2F2ZWRJbmRleE51bWJlciA9IGN1cnJlbnRJbmRleE51bWJlcjtcclxuICAgICAgJChhc2lkZUl0ZW0pLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgJChhc2lkZUl0ZW1bY3VycmVudEluZGV4TnVtYmVyXSkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcbn0se31dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG5cclxuICAvL9C+0YfQuNGB0YLQutCwINGE0L7RgNC80YssINC/0LDRgNCw0LzQtdGC0YAg0YTQvtGA0LzQsCDQsiDQstC40LTQtSBqcXVlcnkg0L7QsdGM0LXQutGCXHJcbiAgZnVuY3Rpb24gY2xlYXIoZm9ybSl7XHJcbiAgICB2YXIgaW5wdXRzID0gZm9ybS5maW5kKCdpbnB1dCwgdGV4dGFyZWEnKTtcclxuXHJcbiAgICBpbnB1dHMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAkKHRoaXMpLnZhbCgnJyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIFxyXG4gIHZhciBmb3JtQm94ID0gJCgnI2NvbnRhY3QtZm9ybS1ib3gnKTtcclxuICBpZiAoZm9ybUJveC5sZW5ndGggPCAxKSB7cmV0dXJuO31cclxuICB2YXJcclxuICAgIGZvcm0gPSBmb3JtQm94LmZpbmQoJyNjb250YWN0LWZvcm0nKSxcclxuICAgIGJ1dHRvbnMgPSBmb3JtQm94LmZpbmQoJy5jb250YWN0LWZvcm1fX2J1dHRvbnMnKTtcclxuXHJcbiAgLy/QsNC60YLQuNCy0L3Ri9C1INC40LvQuCDQvdC1INCw0LrRgtC40LLQvdGL0LUg0LrQvdC+0L/QutC4INGE0L7RgNC80YtcclxuICBmdW5jdGlvbiB0b2dnbGVGb3JtQWN0aXZlKGJ1dHRvbnMsIGRhdGEpe1xyXG4gICAgaWYgKGRhdGEpIHtcclxuICAgICAgYnV0dG9ucy5vbignY2xpY2snLCBmdW5jdGlvbihldnQpe1xyXG4gICAgICAgIHNlbmRNZXNzZWdlKGV2dCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfWVsc2V7YnV0dG9ucy5vZmYoKTt9XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGb3JtQWN0aXZlKGJ1dHRvbnMsIHRydWUpO1xyXG5cclxuXHJcbiAgZnVuY3Rpb24gc2VuZE1lc3NlZ2UoZXZ0KXtcclxuICAgIGlmICggJChldnQudGFyZ2V0KS5hdHRyKCdpZCcpID09PSAnc2VuZC1tZXNzYWdlJyApIHtcclxuICAgICAgdmFyXHJcbiAgICAgICAgZGF0YU9iaiA9IHdpbmRvdy5obS5nZXREYXRhKGZvcm0pLFxyXG4gICAgICAgIGRhdGFBcnIgPSBkYXRhT2JqLmRhdGE7XHJcbiAgICAgIC8v0L/RgNC+0LnQtNC10LzRgdGPINC/0L4g0LjQvNC/0YPRgtCw0Lwg0L3QviDQv9GA0L7Qv9GD0YHRgtC40LwgaWQg0YLQtdC60YPRidC10Lkg0YTQvtGA0LzRi1xyXG4gICAgICB2YXJcclxuICAgICAgICBlcnJvcnMgPSBbXSxcclxuICAgICAgICBtYWlsID0gJyc7XHJcbiAgICAgIGZvcih2YXIgaT0xOyBpPGRhdGFBcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgY3VycmVuSWQgPSBkYXRhQXJyW2ldWzBdLFxyXG4gICAgICAgICAgY3VycmVudERhdGEgPSBkYXRhQXJyW2ldWzFdO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVuSWQgPT0gJ21haWwnKSB7bWFpbCA9IGN1cnJlbnREYXRhO31cclxuXHJcbiAgICAgICAgaWYgKGN1cnJlbnREYXRhLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgIHZhciBtYXNzZWdlID0gWyBbJ25hbWUnLCfQmNC80Y8nXSwgWydtYWlsJywgJ0VtYWlsJ10sIFsnbWVzc2FnZScsICfQodC+0L7QsdGJ0LXQvdC40LUnXSBdO1xyXG4gICAgICAgICAgdmFyIGN1cnJlbklucHV0ID0gJyc7XHJcbiAgICAgICAgICAvL9C/0L7RgdC80L7RgtGA0LjQvCDRgdGB0L7QsdGJ0LXQvdC40Y8g0YEg0L7RgiDQuNC80LXQvdC4INC60LDQutC+0LPQviDQv9C+0LvRjyDQvdGD0LbQvdC+INCy0YvQstC10YHRgtC4XHJcbiAgICAgICAgICBtYXNzZWdlLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW5JZCA9PT0gZWxlbWVudFswXSkge2N1cnJlbklucHV0ID0gZWxlbWVudFsxXTt9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGVycm9yc1tlcnJvcnMubGVuZ3RoXSA9IGN1cnJlbklucHV0Kycg0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC/0YPRgdGC0YvQvCEgPGJyPic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHZhciByID0gL15cXHcrQFxcdytcXC5cXHd7Miw0fSQvaTtcclxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPCAxICYmICFyLnRlc3QobWFpbCkgKXtcclxuICAgICAgICBlcnJvcnNbZXJyb3JzLmxlbmd0aF0gPSAn0J3QtSDQutC+0YDQtdC60YLQvdGL0LkgZS1tYWlsISc7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVycm9ycy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgLy/QtdGB0LvQuCDQvtGI0YLQsdC+0Log0L3QtdGCINC00LDQvdC90YvQtSDQt9Cw0L/RgNC+0YEg0L3QsCDRgdC10YDQstC10YBcclxuICAgICAgICBzZW5kTWVzc2FnZShkYXRhT2JqKTtcclxuICAgICAgICAkKCcjc2VuZC1tZXNzYWdlJykuYXR0cigndmFsdWUnLCAn0J/QvtC00L7QttC00LjRgtC1Jyk7XHJcbiAgICAgICAgLy/QsdC70L7QutCw0L3QtdC8INGE0L7RgNC80YNcclxuICAgICAgICB0b2dnbGVGb3JtQWN0aXZlKGJ1dHRvbnMsIGZhbHNlKTtcclxuICAgICAgfWVsc2V7d2luZG93LmhtLnBvcFVwKGVycm9ycyk7fVxyXG4gICAgICBcclxuICAgIH1lbHNlIGlmKCQoZXZ0LnRhcmdldCkuYXR0cignaWQnKSA9PT0gJ3Jlc2V0Jyl7XHJcbiAgICAgIGNsZWFyKGZvcm0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKGRhdGEpe1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgdXJsOiAncXVlcmllcy5waHA/JyxcclxuICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAvL2RhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCBkYXRhICl7XHJcbiAgICAgICAgaWYgKGRhdGEgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgd2luZG93LmhtLnBvcFVwKCfQodC+0L7QsdGJ0LXQvdC40LUg0L7RgtC/0YDQsNCy0LvQtdC90L4hJywgMzAwMCk7XHJcbiAgICAgICAgICBjbGVhcihmb3JtKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIHdpbmRvdy5obS5wb3BVcCgn0J7QqNCY0JHQmtCQINCe0KLQn9Cg0JDQktCa0JghJywgMzAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBlcnJvcjogZnVuY3Rpb24oIGpxWEhSLCB0ZXh0U3RhdHVzICl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ9Ce0KjQmNCR0JrQmCBBSkFYINC30LDQv9GA0L7RgdCwOiAnICsgdGV4dFN0YXR1cyApO1xyXG4gICAgICB9LFxyXG4gICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcjc2VuZC1tZXNzYWdlJykuYXR0cigndmFsdWUnLCAn0J7RgtC/0YDQsNCy0LjRgtGMJyk7XHJcbiAgICAgICAgdG9nZ2xlRm9ybUFjdGl2ZShidXR0b25zLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufTtcbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyXHJcbiAgICBsYXllciA9ICQoJy5wYXJhbGxheCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKSxcclxuICAgIGxheWVyU2Nyb2xsID0gJCgnLnBhcmFsbGF4X3Njcm9sbCcpLmZpbmQoJy5wYXJhbGxheF9fbGF5ZXInKTtcclxuICAkKHdpbmRvdykub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7IFxyXG4gICAgdmFyXHJcbiAgICAgIG1vdXNlX2R4ID0gKGUucGFnZVgpLCAvLyDQo9C30L3QsNC10Lwg0L/QvtC70L7QttC10L3QuNC1INC80YvRiNC60Lgg0L/QviBYXHJcbiAgICAgIG1vdXNlX2R5ID0gKGUucGFnZVkpLCAvLyDQo9C30L3QsNC10Lwg0L/QvtC70L7QttC10L3QuNC1INC80YvRiNC60Lgg0L/QviBZXHJcbiAgICAgIHcgPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAtIG1vdXNlX2R4LCAvLyDQktGL0YfQuNGB0LvRj9C10Lwg0LTQu9GPIHgg0L/QtdGA0LXQvNC10YnQtdC90LjRj1xyXG4gICAgICBoID0gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIpIC0gbW91c2VfZHk7IC8vINCS0YvRh9C40YHQu9GP0LXQvCDQtNC70Y8geSDQv9C10YDQtdC80LXRidC10L3QuNGPXHJcblxyXG4gICAgbGF5ZXIubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgIHZhclxyXG4gICAgICAgIHdpZHRoUG9zaXRpb24gPSB3ICogKGtleSAvIDEwMCksIC8vINCS0YvRh9C40YHQu9GP0LXQvCDQutC+0L7RhNC40YbQtdC90YIg0YHQvNC10YjQtdC90LjRjyDQv9C+IFhcclxuICAgICAgICBoZWlnaHRQb3NpdGlvbiA9IGggKiAoa2V5IC8gMTAwKTsgLy8g0JLRi9GH0LjRgdC70Y/QtdC8INC60L7QvtGE0LjRhtC10L3RgiDRgdC80LXRiNC10L3QuNGPINC/0L4gWVxyXG5cclxuICAgICAgJCh2YWx1ZSkuY3NzKHtcclxuICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKCcgKyB3aWR0aFBvc2l0aW9uICsgJ3B4LCAnICsgaGVpZ2h0UG9zaXRpb24gKyAncHgsIDApJ1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIHZhciB3aW5kb3dIZWlndGggPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHdpblNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgIGlmICh3aW5kb3dIZWlndGggPiB3aW5TY3JvbGxUb3ApIHtcclxuICAgICAgbGF5ZXJTY3JvbGwubWFwKGZ1bmN0aW9uIChrZXksIHZhbHVlKXtcclxuICAgICAgICB2YXIgYmlhcyA9IHdpblNjcm9sbFRvcCAqIChrZXkvMjApO1xyXG4gICAgICAgICQodmFsdWUpLmNzcyh7XHJcbiAgICAgICAgICAndHJhbnNmb3JtJzogJ3RyYW5zbGF0ZTNkKDAsICcgKyAtYmlhcyArJ3B4LCAwKSdcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2V7cmV0dXJuO31cclxuICB9KTtcclxufTsgIFxufSx7fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAkKCcuYWJvdXQtd3JhcHBlciwgLmJsb2ctd3JhcHBlciwgLmluZGV4LXdyYXBwZXIsIC53b3Jrcy13cmFwcGVyLCAuYWRtaW4td3JhcHBlcicpLmNzcyh7J2Rpc3BsYXknOidub25lJ30pO1xyXG4gIHZhciBpbWdzID0gW107XHJcbiAgJC5lYWNoKCQoJyonKSwgZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgYmFja2dyb3VuZCA9ICR0aGlzLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxyXG4gICAgICBpbWcgPSAkdGhpcy5pcygnaW1nJyk7XHJcbiAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgdmFyIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcblxyXG4gICAgICBpbWdzLnB1c2gocGF0aCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaW1nKSB7XHJcbiAgICAgIHBhdGggPSAkdGhpcy5hdHRyKCdzcmMnKTtcclxuICAgICAgaW1ncy5wdXNoKHBhdGgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHZhciBwZXJjZW50cyA9IDE7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgaW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgYXR0cjoge1xyXG4gICAgICAgIHNyYyA6IGltZ3NbaV1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpbWFnZS5sb2FkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgc2V0UGVyY2VudHMoaW1ncy5sZW5ndGgsIHBlcmNlbnRzKTtcclxuICAgICAgcGVyY2VudHMrKztcclxuICAgIH0pO1xyXG4gICAgaW1hZ2UuZXJyb3IoZnVuY3Rpb24gKCkge1xyXG4gICAgICBzZXRQZXJjZW50cyhpbWdzLmxlbmd0aCwgcGVyY2VudHMpO1xyXG4gICAgICBwZXJjZW50cysrO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8v0JXQodCb0Jgg0JrQkNCg0KLQmNCd0J7QmiDQndCV0KIgXHJcbiAgaWYoaW1ncy5sZW5ndGggPT09IDApe1xyXG4gICAgc2V0UGVyY2VudHMoMSwxKTtcclxuICB9XHJcbiAgZnVuY3Rpb24gc2V0UGVyY2VudHModG90YWwsIGN1cnJlbnQpIHtcclxuICAgIHZhciBwZXJjZW50ID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcbiAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgJCgnLmFib3V0LXdyYXBwZXIsIC5ibG9nLXdyYXBwZXIsIC5pbmRleC13cmFwcGVyLCAud29ya3Mtd3JhcHBlciwgLmFkbWluLXdyYXBwZXInKS5jc3MoeydkaXNwbGF5JzonYmxvY2snfSk7XHJcbiAgICAgICQoJy5wbGF0ZS1mcm9udCcpLmFkZENsYXNzKCdhbmltYXRlX3BsYXRlJyk7XHJcbiAgICAgICQoJy5sb2FkZXItd3JhcHBlcicpLmZhZGVPdXQoMTUwMCwgZnVuY3Rpb24oKXtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAkKCcucGxhdGUtZnJvbnQnKS5yZW1vdmVDbGFzcygnYW5pbWF0ZV9wbGF0ZScpO1xyXG4gICAgICAgIH0sIDIwMDApO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgICQoJy5sb2FkZXJfX3BlcmNlbnQnKS50ZXh0KHBlcmNlbnQgKyAnJScpO1xyXG4gIH1cclxufTtcbn0se31dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gIHZhclxyXG4gICAgdHJhbnNpdGlvbiA9IDMwMCxcclxuICAgIG1lbnVCdXR0b24gPSAkKCcjbWVudS1idXR0b24nKTtcclxuXHJcbiAgbWVudUJ1dHRvbi5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgdmFyIGNsb3NlID0gJCgnLmN1cnRhaW4tbGVmdCcpLmhhc0NsYXNzKCdjbG9zZUN1cnRhaW5zTCcpO1xyXG4gICAgaWYoY2xvc2Upe1xyXG4gICAgICBjbG9zZV9tZW51KCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgc2hvd19tZW51KCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZnVuY3Rpb24gY2xvc2VfbWVudSgpe1xyXG4gICAgbWVudUJ1dHRvbi5yZW1vdmVDbGFzcygnbWVudS1idXR0b24tY2xvc2UnKTtcclxuICAgICQoJy5jdXJ0YWluLWxlZnQsIC5jdXJ0YWluLXJpZ2h0LCAjbWFpbi1uYXYnKS5jc3MoeydvcGFjaXR5JzowfSk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICQoJy5jdXJ0YWluLWxlZnQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc0wnKTtcclxuICAgICAgJCgnLmN1cnRhaW4tcmlnaHQnKS5yZW1vdmVDbGFzcygnY2xvc2VDdXJ0YWluc1InKTtcclxuICAgICAgJCgnI21haW4tbmF2JykucmVtb3ZlQ2xhc3MoJ2Jsb2NrJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkKCcuY3VydGFpbi1sZWZ0LCAuY3VydGFpbi1yaWdodCwgI21haW4tbmF2JykuY3NzKHsnb3BhY2l0eSc6MX0pO1xyXG4gICAgICB9LCB0cmFuc2l0aW9uKTsgXHJcbiAgICB9LCB0cmFuc2l0aW9uKTtcclxuICB9XHJcbiAgdmFyXHJcbiAgICBhcnIgPSAkKCcubWFpbi1uYXYtbGlzdC1pdGVtJyksXHJcbiAgICBhcnJfbGVuZ3RoID0gYXJyLmxlbmd0aDtcclxuXHJcbiAgZnVuY3Rpb24gc2hvd19tZW51KCl7XHJcbiAgICBtZW51QnV0dG9uLmFkZENsYXNzKCdtZW51LWJ1dHRvbi1jbG9zZScpO1xyXG4gICAgJChhcnIpLmZpbmQoJ2EnKS5jc3Moeyd0cmFuc2Zvcm0nOiAnc2NhbGUoMCknLCAndHJhbnNpdGlvbi1kdXJhdGlvbic6dHJhbnNpdGlvbisnbXMnfSk7XHJcbiAgICB2YXIgY3VycmVudCA9IDA7XHJcbiAgICAkKCcuY3VydGFpbi1sZWZ0JykuYWRkQ2xhc3MoJ2Nsb3NlQ3VydGFpbnNMJyk7XHJcbiAgICAkKCcuY3VydGFpbi1yaWdodCcpLmFkZENsYXNzKCdjbG9zZUN1cnRhaW5zUicpO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAkKCcjbWFpbi1uYXYnKS5hZGRDbGFzcygnYmxvY2snKTtcclxuICAgICAgdmFyIHRpbWVySWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBhID0gJChhcnJbY3VycmVudF0pLmZpbmQoJ2EnKTtcclxuICAgICAgICBhLmNzcyh7J3RyYW5zZm9ybSc6J3NjYWxlKDEpJ30pO1xyXG4gICAgICAgIGlmIChjdXJyZW50ID49IGFycl9sZW5ndGgtMSkge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdXJyZW50Kys7XHJcbiAgICAgIH0sIHRyYW5zaXRpb24vMik7IFxyXG5cclxuICAgIH0sIHRyYW5zaXRpb24pO1xyXG4gIH1cclxufVxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy/QsNC90LjQvNC40YDQvtCy0LDQvdC40Y8g0YLQtdC60YHRgtCwINCyINGB0LvQsNC50LTQtdGA0LVcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB0aW1lb3V0ID0gNjAwO1xyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgdmFyXHJcbiAgICAgIGRlc2NyaXB0aW9ucyA9ICQoJy5zbGlkZXJfX2ltYWdlLWRlc2NyaXB0aW9uJyksXHJcbiAgICAgIHRpdGxlcyA9IGRlc2NyaXB0aW9ucy5maW5kKCdoMicpLFxyXG4gICAgICB0ZWNobm9sb2dpc3RzID0gZGVzY3JpcHRpb25zLmZpbmQoJ3AnKTtcclxuICAgICAgLy/RhNGD0L3QutGG0LjRjyDQv9C+0LTQs9C+0YLQvtCy0LjRgiDRgtC10LrRgdGCINC6INCw0L3QuNC80LDRhtC40Lgg0L/QvtGA0YPQsdCw0LXRgiDQvdCwINC+0YLQtNC10LvRjNC90YvQtSDQsdGD0LrQstGLINCy0YHQtSDRh9GC0L4g0L3QsNC00L5cclxuICAgIGZ1bmN0aW9uIGZyYWN0aW9uKGUpe1xyXG4gICAgICBlLmZvckVhY2goZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgaXRlbS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgdGhhdCA9ICQodGhpcyksXHJcbiAgICAgICAgICAgIHN0cmluZyA9IHRoYXQudGV4dCgpO1xyXG4gICAgICAgICAgdGhhdC5odG1sKHN0cmluZy5yZXBsYWNlKC8uL2csICc8c3BhbiBjbGFzcz1cImxldHRlclwiPiQmPC9zcGFuPicpKTtcclxuICAgICAgICAgIC8v0L/RgNC40YHQstC+0LXQvCDQutCw0LbQtNC+0Lkg0LHRg9C60LLQtSDQvdC10L7QsdGF0L7QtNC40LzRg9GOINC30LDQtNC10YDQttC60YMg0L/QtdGA0LXQtCDQsNC90LjQvNCw0YbQuNC10LlcclxuICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICBsZXR0ZXJzID0gdGhhdC5maW5kKCdzcGFuJyksXHJcbiAgICAgICAgICAgIGRlYWx5ID0gMDtcclxuICAgICAgICAgIGxldHRlcnMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICB0aGF0ID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICBsZXRlckxlbmd0aCA9IGxldHRlcnMubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGF0LmNzcyh7J2FuaW1hdGlvbi1kZWxheSc6ZGVhbHkrJ21zJ30pO1xyXG4gICAgICAgICAgICBkZWFseSArPSBwYXJzZUludCh0aW1lb3V0IC8gbGV0ZXJMZW5ndGgsIDEwKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTsgXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGZyYWN0aW9uKFt0aXRsZXMsIHRlY2hub2xvZ2lzdHNdKTtcclxuICB9KSgpO1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHRleHRBbmltYXRlKHRoYXQpe1xyXG4gICAgdmFyXHJcbiAgICAgIGxldHRlckxpc3QgPSB0aGF0LmZpbmQoJy5sZXR0ZXInKSxcclxuICAgICAgbGlzdExlbmd0aCA9IGxldHRlckxpc3QubGVuZ3RoLFxyXG4gICAgICBpID0gMDtcclxuXHJcbiAgICAoZnVuY3Rpb24gc2hvd0xldHRlcigpe1xyXG4gICAgICB2YXIgY3VycmVudExldHRlciA9ICQobGV0dGVyTGlzdFtpXSkuaHRtbCgpO1xyXG4gICAgIC8v0LXRgdC70Lgg0Y3RgtC+INC/0YDQvtCx0LXQuyDQt9Cw0LTQsNC00LjQvCDQtdC80YMg0YTQuNC60YHQuNGA0L7QstCw0L3QvdGD0Y4g0YjQuNGA0LjQvdGDINC40L3QsNGH0LUg0L/QvtGC0L7QvCDQvtC9INGB0L/Qu9GO0YnQuNGC0YzRgdGPIFxyXG4gICAgICBpZiAoY3VycmVudExldHRlciA9PT0gJyAnKSB7XHJcbiAgICAgICAgdmFyIGxldHRlcldpZHRoID0gJChsZXR0ZXJMaXN0W2ldKS53aWR0aCgpO1xyXG4gICAgICAvL9C10YHQu9C4INGI0LjRgNC40L3QsCDQv9GA0L7QsdC10LvQsCA9IDAsINC30L3QsNGH0LjRgiDRjdGC0L4g0LrQvtC90LXRhiDRgdGC0YDQvtC60Lgg0Lgg0L3Rg9C20L3QviDQstGB0YLQsNCy0LjRgtGMINC10LvQtdC80LXQvdGCINC/0LXRgNC10L3QvtGB0LAg0YHRgtGA0L7QutC4XHJcbiAgICAgICAgaWYgKGxldHRlcldpZHRoID09IDApIHtcclxuICAgICAgICAgICQobGV0dGVyTGlzdFtpXSkuYWZ0ZXIoJzxicj4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJChsZXR0ZXJMaXN0W2ldKS53aWR0aChsZXR0ZXJXaWR0aCk7XHJcbiAgICAgIH1cclxuICAgICAgaSsrO1xyXG4gICAgICAoZnVuY3Rpb24oKXtcclxuICAgICAgICBpZiAoaSA8IGxpc3RMZW5ndGgpIHtcclxuICAgICAgICAgIHNob3dMZXR0ZXIoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgIGxldHRlckxpc3QuYWRkQ2xhc3MoJ3Nob3dMZXR0ZXInKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pKCk7XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuLy/QutC+0L3QtdGGINCw0L3QuNC80LjRgNC+0LLQsNC90LjRjyDRgtC10LrRgdGC0LAg0LIg0YHQu9Cw0LnQtNC10YDQtVxyXG5cclxuLy/RgdC80LXQvdCwINC40LfQvtCx0YDQsNC20LXQvdC40Lkg0Lgg0L7Qv9C40YHQsNC90LjRjyDQsiDRgdC70LDQudC00LXRgNC1XHJcbiAgKGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcuc2xpZGVyX19ib3R0b20tcHJldmlldyBsaSwgLnNsaWRlcl9fdG9wLXByZXZpZXcgbGksIC5zbGlkZXJfX2ltYWdlcy1saXN0JykuY3NzKHsndHJhbnNpdGlvbi1kdXJhdGlvbic6dGltZW91dCsnbXMnfSk7XHJcbiAgICAkKCcuc2xpZGVyX19pbWFnZXMtbGlzdCcpLmNzcyh7ICd0cmFuc2l0aW9uLWR1cmF0aW9uJzp0aW1lb3V0LzIrJ21zJ30pO1xyXG4gICAgdmFyIGJ1dHRvbnMgPSAkKCcuc2xpZGVyX19idXR0b25zLWJvdHRvbSwgLnNsaWRlcl9fYnV0dG9ucy10b3AnKTtcclxuICAgIGJ1dHRvbnMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtcclxuICAgICAgY2FsbFNsaWRlcihldnQpO1xyXG4gICAgfSk7XHJcbiAgICBmdW5jdGlvbiBjYWxsU2xpZGVyKGV2dCl7XHJcbiAgICAgIC8v0YPQtNCw0LvQuNC8INC+0LHRgNCw0LHQvtGC0YfQuNC6XHJcbiAgICAgIGJ1dHRvbnMub2ZmKCk7XHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAvL9Cy0LXRgNC90ZHQvCDQvtCx0YDQsNCx0L7RgtGH0LjQulxyXG4gICAgICAgIGJ1dHRvbnMub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZ0KXtjYWxsU2xpZGVyKGV2dCk7fSk7XHJcbiAgICAgIH0sdGltZW91dCoxLjUpO1xyXG4gICAgICBzbGlkZXIoZXZ0KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNoYW5nZURlc2NyaXB0aW9uKGkpe1xyXG4gICAgICB2YXJcclxuICAgICAgICBkZXNjID0gJCgnLnNsaWRlcl9faW1hZ2UtZGVzY3JpcHRpb24nKS5jbG9uZSgpLFxyXG4gICAgICAgIHRpdGxlID0gJChkZXNjW2ldKS5maW5kKCdoMicpLmFkZENsYXNzKCdhbmltYXRlVGV4dCcpLFxyXG4gICAgICAgIHRlY2hub2xvZ2llcyA9ICQoZGVzY1tpXSkuZmluZCgncCcpLmFkZENsYXNzKCdhbmltYXRlVGV4dCcpLFxyXG4gICAgICAgIGxpbmsgPSAkKGRlc2NbaV0pLmZpbmQoJ2EnKTtcclxuXHJcbiAgICAgICQoJy53b3JrLWRlc2NyaXB0aW9uX190aXRsZSBoMicpLnJlcGxhY2VXaXRoKHRpdGxlKTtcclxuICAgICAgJCgnLndvcmstZGVzY3JpcHRpb25fX3RlY2hub2xvZ2llcyBwJykucmVwbGFjZVdpdGgodGVjaG5vbG9naWVzKTtcclxuICAgICAgJCgnLndvcmstZGVzY3JpcHRpb25fX2JvdHRvbiBhJykucmVwbGFjZVdpdGgobGluayk7XHJcbiAgICAgIHRleHRBbmltYXRlKCQoJy5hbmltYXRlVGV4dCcpKTtcclxuICAgIH1cclxuICAgIC8v0YPRgdGC0LDQstC40Lwg0L7Qv9C40YHQsNC90LjQtSDRgtC10LrRg9GJ0LXQuSDRgNCw0LHQvtGC0YtcclxuICAgIGNoYW5nZURlc2NyaXB0aW9uKDApO1xyXG4gICAgdmFyIGltYWdlTGlzdCAgPSAkKCcuc2xpZGVyX19pbWFnZXMtbGlzdCcpO1xyXG4gICAgZnVuY3Rpb24gc2xpZGVyKGV2dCl7XHJcbiAgICAgIHZhciBpbWFnZXMsIGFyckxlbmdodCwgYm90dG9uLCBwcmV2LCBwcmV2TGVmdCwgcHJldlJpZ2h0LCBwcmV2MUxlZnQscHJldjJMZWZ0LFxyXG4gICAgICAgIHByZXYxUmlnaHQsIHByZXYyUmlnaHQsIGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGksIGN1cnJlbnRSaWdodExpLCBuZXh0UmlnaHRMaTtcclxuXHJcbiAgICAgIGltYWdlcyAgICAgPSBpbWFnZUxpc3QuZmluZCgnbGknKTtcclxuICAgICAgYXJyTGVuZ2h0ICA9IGltYWdlcy5sZW5ndGg7XHJcbiAgICAgIGJvdHRvbiAgICAgPSAkKGV2dC5jdXJyZW50VGFyZ2V0KS5hdHRyKCdjbGFzcycpO1xyXG4gICAgICBwcmV2ICAgICAgID0gJCgnLnNsaWRlcl9fYnV0dG9ucycpO1xyXG4gICAgICBwcmV2TGVmdCAgID0gcHJldi5maW5kKCcuc2xpZGVyX19ib3R0b20tcHJldmlldyBsaScpO1xyXG4gICAgICBwcmV2UmlnaHQgID0gcHJldi5maW5kKCcuc2xpZGVyX190b3AtcHJldmlldyBsaScpO1xyXG4gICAgICBwcmV2MUxlZnQgID0gJChwcmV2TGVmdFsxXSk7XHJcbiAgICAgIHByZXYyTGVmdCAgPSAkKHByZXZMZWZ0WzBdKTtcclxuICAgICAgcHJldjFSaWdodCA9ICQocHJldlJpZ2h0WzFdKTtcclxuICAgICAgcHJldjJSaWdodCA9ICQocHJldlJpZ2h0WzBdKTtcclxuICAgICAgICBcclxuICAgICAgLy/Rg9C30L3QsNC10Lwg0YLQtdC60YPRidC40Lkg0Lgg0YHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGC0Ysg0L/RgNC10LLRjNGO0YUsINGC0LXQutGD0YnQuNC5INGC0L7RgiDRh9GC0L4g0LLQuNC00LjQvCwg0LAg0YHQu9C10LTRg9GO0YnQuNC50LXQu9C10LzQtdC90YIg0YLQvtGCINGH0YLQviDQv9C+0LrQsCDRh9GC0L4g0YHQutGA0YvRgiBcclxuICAgICAgaWYgKHByZXYxTGVmdC5wb3NpdGlvbigpLnRvcCA+IHByZXYyTGVmdC5wb3NpdGlvbigpLnRvcCkge1xyXG4gICAgICAgIGN1cnJlbnRMZWZ0TGkgPSBwcmV2MUxlZnQ7XHJcbiAgICAgICAgbmV4dExlZnRMaSA9IHByZXYyTGVmdDtcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgY3VycmVudExlZnRMaSA9IHByZXYyTGVmdDtcclxuICAgICAgICBuZXh0TGVmdExpID0gcHJldjFMZWZ0O1xyXG4gICAgICB9XHJcbiAgICAgIC8v0KHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGCINGBINC70LXQstCwINC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y5cclxuICAgICAgbmV4dExlZnRMaSA9IG5ld1NyYyhuZXh0TGVmdExpLCBpbWFnZXNbYXJyTGVuZ2h0LTJdKTtcclxuICAgICAgLy/QtdGB0LvQuCDQvdCw0LbQsNC7INC60L3QvtC/0LrRgyDQvdCw0LfQsNC0INC+0L3QsCDQttC1INCyINC90LjQt1xyXG4gICAgICBmdW5jdGlvbiBiYWNrKCl7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy/Qv9C10YDQtdC60LjQvdC10Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDRgSDQutC+0L3QsCDQsiDQvdCw0YfQsNC70L5cclxuICAgICAgICAgIGltYWdlTGlzdC5wcmVwZW5kKGltYWdlc1thcnJMZW5naHQtMV0pO1xyXG4gICAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XHJcbiAgICAgICAgfSwgdGltZW91dC8yKTtcclxuICAgICAgICBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGksICdib3R0b20nLCBpbWFnZXNbYXJyTGVuZ2h0LTNdKTtcclxuICAgICAgfVxyXG4gICAgICAvL9GD0LfQvdCw0LXQvCDRgtC10LrRg9GJ0LjQuSDQuCDRgdC70LXQtNGD0Y7RidC40Lkg0LXQu9C10LzQtdC90YLRiyDQv9GA0LXQstGM0Y7RhSwg0YLQtdC60YPRidC40Lkg0YLQvtGCINGH0YLQviDQstC40LTQuNC8LCDQsCDRgdC70LXQtNGDXHJcbiAgICAgIC8v0YPQt9C90LDQtdC8INGC0LXQutGD0YnQuNC5INC4INGB0LvQtdC00YPRjtGJ0LjQuSDQtdC70LXQvNC10L3RgtGLINC/0YDQtdCy0YzRjtGFLCDRgtC10LrRg9GJ0LjQuSDRgtC+0YIg0LrQvtGC0L7RgNGL0Lkg0L3QsCDQstC40LTRgywg0LAg0YHQu9C10LTRg9GO0YnQuNC50LXQu9C10LzQtdC90YIg0YLQvtGCINGH0YLQviDQv9C+0LrQsCDRh9GC0L4g0YHQutGA0YvRglxyXG4gICAgICBpZiAocHJldjFSaWdodC5wb3NpdGlvbigpLnRvcCA8IHByZXYyUmlnaHQucG9zaXRpb24oKS50b3ApIHtcclxuICAgICAgICBjdXJyZW50UmlnaHRMaSA9IHByZXYxUmlnaHQ7XHJcbiAgICAgICAgbmV4dFJpZ2h0TGkgPSBwcmV2MlJpZ2h0O1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBjdXJyZW50UmlnaHRMaSA9IHByZXYyUmlnaHQ7XHJcbiAgICAgICAgbmV4dFJpZ2h0TGkgPSBwcmV2MVJpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIC8v0KHQu9C10LTRg9GO0YnQuNC5INC10LvQtdC80LXQvdGCINGBINC/0YDQsNCy0LAg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gICAgICBuZXh0UmlnaHRMaSA9IG5ld1NyYyhuZXh0UmlnaHRMaSwgaW1hZ2VzWzJdKTtcclxuICAgICAgLy/QtdGB0LvQuCDQvdCw0LbQsNC7INCy0L/QtdGR0LQg0L7QvdCwINC20LUg0LLQstC10YDRhVxyXG4gICAgICBmdW5jdGlvbiBmb3J3YXJkKCl7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgLy/Qv9C10YDQtdC60LjQvdC10Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDRgSDQvdCw0YfQsNC70LAg0LIg0LrQvtC90LXRhlxyXG4gICAgICAgICAgaW1hZ2VMaXN0LmFwcGVuZChpbWFnZXNbMF0pO1xyXG4gICAgICAgICAgaW1hZ2VMaXN0LnRvZ2dsZUNsYXNzKCdvcGFjaXR5Jyk7XHJcbiAgICAgICAgfSwgdGltZW91dC8yKTtcclxuICAgICAgICBjaGFuZ2VQcmV2aWV3KGN1cnJlbnRSaWdodExpLCBuZXh0UmlnaHRMaSwgJ3RvcCcsIGltYWdlc1szXSk7XHJcbiAgICAgIH0gICBcclxuICAvL9C80LXQvdGP0LXQvCDQs9C70LDQstC90L7QtSDQuNC30L7QsdGA0LDQttC10L3QuNC1XHJcbiAgICAgIGZ1bmN0aW9uIGNoYW5nZU1haW5JbWFnZSgpe1xyXG4gICAgICAgIGltYWdlTGlzdC50b2dnbGVDbGFzcygnb3BhY2l0eScpO1xyXG4gICAgICAgIGlmIChib3R0b24gPT0gJ3NsaWRlcl9fYnV0dG9ucy1ib3R0b20nKSB7XHJcbiAgICAgICAgICBiYWNrKCk7XHJcbiAgICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbihhcnJMZW5naHQtMSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICBmb3J3YXJkKCk7XHJcbiAgICAgICAgICBjaGFuZ2VEZXNjcmlwdGlvbigxKTtcclxuICAgICAgICB9IFxyXG4gICAgICB9ICBcclxuICAvL9C80LXQvdGP0Lwg0L/RgNC10LLRjtGF0YMg0L/QsNGA0LDQvNC10YLRgNGLOiDRgtC10LrRg9GJ0LDRjyDQu9C4LCDRgdC70LXQtNGD0Y7RidCw0Y8g0YLQsCDQvdCwINC60L7RgtC+0YDRg9GOINGB0LXRh9Cw0YEg0LfQsNC80LXQvdC10YLRgdGPINGC0LXQutGD0YnQsNGPLCDQvdCw0L/RgNCw0LLQu9C10L3QuNC1INC00LLQuNC20LXQvdC40Y8g0LDQvdC40LzQsNGG0YvQuCxcclxuICAvL9C90L7QstCw0Y8g0LvQuCDRgtC+0LXRgdGC0Ywg0YEg0L3QvtCy0YvQvCDQuNC30L7QsdGA0LDQttC10L3QuNC10Lwg0Lgg0LLQvtC30LzQvtC20L3QviDQvtC/0LjRgdCw0L3QuNC10Lwg0L7QvdCwINC30LDQvNC10L3QtdGCINGC0YMg0LvQuCDQutC+0YLQvtGA0YPRjiDQvNGLINGB0LTQstC40L3QuNC8INC40Lcg0LfQvtC90Ysg0LLQuNC00LjQvNC+0YHRgtC4XHJcbiAgICAgIGZ1bmN0aW9uIGNoYW5nZVByZXZpZXcoY3VycmVudExpLCBuZXh0TGksIGRpcmVjdGlvbiwgbmV3TGkpeyAgXHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAnYm90dG9tJykge1xyXG4gICAgICAgICAgbW92ZSgnYm90Jyk7XHJcbiAgICAgICAgICBwcmV3QmFjaygnbGVmdCcpO1xyXG4gICAgICAgICAgIC8vINC60LvQuNC60L3Rg9C70Lgg0L/QviDQu9C10LLQvtC5INC60L3QvtC/0LrQtSDQt9C90LDRh9C40YIg0LzQtdC90Y/QtdC8INC30L3QsNGH0LXQvdC40Y8g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4g0LTQu9GPINGB0LvQtdC00YPRjtGJ0LjQs9C+INC10LvQtdC80LXQvdGC0LAg0L/RgNCw0LLQvtC5INC60L3QvtC/0LrQtVxyXG4gICAgICAgICAgbmV4dFJpZ2h0TGkgPSBuZXdTcmMobmV4dFJpZ2h0TGksIGltYWdlc1swXSk7XHJcbiAgICAgICAgICBtb3ZlKCd0b3AnLCBjdXJyZW50UmlnaHRMaSwgbmV4dFJpZ2h0TGkpO1xyXG4gICAgICAgICAgcHJld0JhY2soJ3JpZ2h0JywgY3VycmVudFJpZ2h0TGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09ICd0b3AnKSB7XHJcbiAgICAgICAgICBtb3ZlKCd0b3AnKTtcclxuICAgICAgICAgIHByZXdCYWNrKCdyaWdodCcpO1xyXG4gICAgICAgICAgLy8g0LrQu9C40LrQvdGD0LvQuCDQv9C+INC/0YDQsNCy0L7QuSDQutC90L7Qv9C60LUg0LfQvdCw0YfQuNGCINC80LXQvdGP0LXQvCDQt9C90LDRh9C10L3QuNGPINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOINC00LvRjyDRgdC70LXQtNGD0Y7RidC40LPQviDQtdC70LXQvNC10L3RgtCwINC90LAg0LvQtdCy0L7QuSDQutC90L7Qv9C60LVcclxuICAgICAgICAgIG5leHRMZWZ0TGkgPSBuZXdTcmMobmV4dExlZnRMaSwgaW1hZ2VzWzBdKTtcclxuICAgICAgICAgIG1vdmUoJ2JvdCcsIGN1cnJlbnRMZWZ0TGksIG5leHRMZWZ0TGkpO1xyXG4gICAgICAgICAgcHJld0JhY2soJ2xlZnQnLCBjdXJyZW50TGVmdExpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/QstC+0LfQstGA0LLRidCw0LXRgiDRgdC60YDRi9GC0L7QtSDQv9GA0LXQstGOINC90LAg0YHRgtCw0YDRgtC+0LLQvtGOINC/0L7Qt9C40YbRi9GOLCDQv9Cw0YDQsNC80LXRgtGA0Ysg0LrQsNC60L7QtSDQv9GA0LXQstGM0Y4g0LvQtdCy0L7QtSDQuNC70Lgg0L/RgNCw0LLQvtC1LCDQuCDQvdC1INC+0LHQtdC30LDRgtC10LvRjNC90YvQuSDRgtC10LrRg9GJ0LjQudGN0LvQtdC80L3RglxyXG4gICAgICAgIGZ1bmN0aW9uIHByZXdCYWNrKHByZXYsIGN1cnJlbnRFbGVtZW50KXtcclxuICAgICAgICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50ID0gY3VycmVudExpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYgKHByZXYgPT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSBuZXdTcmMoY3VycmVudEVsZW1lbnQsIG5ld0xpKTtcclxuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzonMG1zJywgJ3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoMCknfSk7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmIChwcmV2ID09ICdyaWdodCcpIHtcclxuICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IG5ld1NyYyhjdXJyZW50RWxlbWVudCwgbmV3TGkpO1xyXG4gICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zaXRpb24tZHVyYXRpb24nOicwbXMnLCAndHJhbnNmb3JtJzondHJhbnNsYXRlWSgxMDAlKSd9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSwgdGltZW91dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoZGlyZWN0aW9uLCBjdXJyZW50RWxlbWVudCwgbmV4dEVsZW1lbnQpe1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50ID09PSB1bmRlZmluZWQgfHwgbmV4dEVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IGN1cnJlbnRMaTtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQgPSBuZXh0TGk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0cmFuc2l0aW9uLWR1cmF0aW9uJzp0aW1lb3V0Kydtcyd9KTtcclxuICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT0gJ2JvdCcpIHtcclxuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQuY3NzKHsndHJhbnNmb3JtJzondHJhbnNsYXRlWSgyMDAlKSd9KTtcclxuICAgICAgICAgICAgbmV4dEVsZW1lbnQuY3NzKHsndHJhbnNmb3JtJzondHJhbnNsYXRlWSgxMDAlKSd9KTtcclxuICAgICAgICAgIH1lbHNlIGlmKGRpcmVjdGlvbiA9PSAndG9wJyl7XHJcbiAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50LmNzcyh7J3RyYW5zZm9ybSc6J3RyYW5zbGF0ZVkoLTEwMCUpJ30pO1xyXG4gICAgICAgICAgICBuZXh0RWxlbWVudC5jc3Moeyd0cmFuc2Zvcm0nOid0cmFuc2xhdGVZKDApJ30pOyAgXHJcbiAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIC8v0YTRg9C90LrRhtC40Y8g0LzQtdC90Y/QtdGCINC60LDRgtGA0LjQvdC60YMg0LggaDEg0LIgbGkg0Y3Qu9C10LzQtdC90YLRgtC1XHJcbiAgICAgIGZ1bmN0aW9uIG5ld1NyYyhvbGRMaSwgbmV3TGkpe1xyXG4gICAgICAgIHZhclxyXG4gICAgICAgICAgdG1wU3JjID0gJChuZXdMaSkuZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgICAgICB0bXBIMSA9ICQobmV3TGkpLmZpbmQoJ2gxJykuaHRtbCgpO1xyXG4gICAgICAgIC8v0LfQsNC80LXQvdC40Lwg0LDQtNGA0LXRgSDQuiDQutCw0YDRgtC40L3QutC1XHJcbiAgICAgICAgb2xkTGkuZmluZCgnaW1nJykuYXR0cih7J3NyYyc6dG1wU3JjfSk7XHJcbiAgICAgICAgLy/Qt9Cw0LzQtdC90LjQvCDQutC+0L3RgtC10L3RgiDQsiBoMVxyXG4gICAgICAgIG9sZExpLmZpbmQoJ2gxJykuaHRtbCh0bXBIMSk7XHJcbiAgICAgICAgcmV0dXJuIG9sZExpO1xyXG4gICAgICB9XHJcbiAgICAgIGNoYW5nZU1haW5JbWFnZSgpO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcbn07XG59LHt9XX0se30sWzFdKTtcbiJdLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
