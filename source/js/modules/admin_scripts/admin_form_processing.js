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