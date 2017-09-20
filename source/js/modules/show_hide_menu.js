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