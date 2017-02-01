const token = localStorage.getItem('accessToken');

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

const setLoggedInMode = () => {
  document.querySelector('#user-notification').innerText = `Hello, ${profile.name}`;
  githubId = profile.userId;
  githubPhoto = profile.picture;
  $('#user-photo-main').attr("src", profile.picture);
}

const setLoggedOutMode = () => {
  document.querySelector('#user-notification').innerText = 'You are logged out.';
  githubId = '';
  githubPhoto = '';
}

if (token) {
  activateLoggedInDisplay();
  setLoggedInMode();
} else {
  activateLoggedOutDisplay();
  setLoggedOutMode();
}
