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
      var data = window.hm.getData(form);
      //пройдемся по импутам но пропустим id текущей формы
      var
        errors = [],
        mail = '';
      for(var i=1; i<data.length; i++){
        var
          currenId = data[i][0],
          currentData = data[i][1];

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
        var answer = true;
        //если оштбок нет отравим запрос на сервер

        //если от сервера прийдет положительный ответ
        if (answer === true) {
          window.hm.popUp('УСПЕШНО ОТПРАВЛЕНО!', 3000);
          clear(form);
        }

      }else{window.hm.popUp(errors);}
      
    }else if($(evt.target).attr('id') === 'reset'){
      clear(form);
    }
  });
};