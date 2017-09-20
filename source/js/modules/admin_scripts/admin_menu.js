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