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