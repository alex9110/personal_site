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