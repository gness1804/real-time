const activateLoggedInDisplay = () => {
  $('#pre-login-headline').hide();
  $('#log-in-button').hide();
  $('#log-out-button').show();
  $('#create-question-wrapper').show();
  $('#question-container').show();
}

const activateLoggedOutDisplay = () => {
  $('#pre-login-headline').show();
  $('#log-in-button').show();
  $('#log-out-button').hide();
  $('#create-question-wrapper').hide();
  $('#question-container').hide();
}
