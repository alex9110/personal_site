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

  buttons.on('click', function(evt){
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
      }else{window.hm.popUp(errors);}
      
    }else if($(evt.target).attr('id') === 'reset'){
      clear(form);
    }
  });

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
      }
    });
  }

};