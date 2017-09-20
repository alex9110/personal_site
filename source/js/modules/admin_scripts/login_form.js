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