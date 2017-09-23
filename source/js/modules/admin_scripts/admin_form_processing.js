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
    var errors = [];
    if (errors.length<1) {
      window.hm.popUp('сохранено', 1500);
    }else{window.hm.popUp(errors);}
    var data = window.hm.getData(formAboutMe);
    var response = sendData(data);
    //console.log('response == '+response);
    //console.log(data);
  });
  formBlog.find('#admin-blog__save').on('click', function(){
    var errors = [];
    if (errors.length<1) {
      window.hm.popUp('сохранено', 1500);
    }else{window.hm.popUp(errors);}
    //var data = window.hm.getData(formBlog);

    //console.log(data);
  });
  formWorks.find('#admin-works__save').on('click', function(){
    var errors = [];
    if (errors.length<1) {
      window.hm.popUp('сохранено', 1500);
    }else{window.hm.popUp(errors);}
    //var data = window.hm.getData(formWorks);

    //console.log(data);

  });
  function sendData(data){
    var response = false;
    //console.log(data);
    $.ajax({
      url: 'queries.php?',
      type: 'POST',
      data: data,
     // dataType: 'json',
      success: function( data ){
        console.log(data);
          
      },
      error: function( jqXHR, textStatus ){
        console.log('ОШИБКИ AJAX запроса: ' + textStatus );
      }
    });

    return response;
  }
};