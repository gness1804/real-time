const token = localStorage.getItem('accessToken');

const activateLoggedInDisplay = () => {
  $('#pre-login-headline').hide();
  $('#log-in-button').hide();
  $('#log-out-button').show();
  $('#question-container').show();
}

const activateLoggedOutDisplay = () => {
  $('#pre-login-headline').show();
  $('#log-in-button').show();
  $('#log-out-button').hide();
  $('#question-container').hide();
}

const setLoggedInMode = () => {
  document.querySelector('#notification-logged-in-or-out').innerText = `Hello, ${profile.name}`;
  githubId = profile.userId;
  githubPhoto = profile.picture;
  $('#user-photo-main').attr("src", profile.picture);
}

const setLoggedOutMode = () => {
  document.querySelector('#notification-logged-in-or-out').innerText = 'You are logged out.';
  githubId = '';
  githubPhoto = '';
}

const clearInputFields = () => {
  document.querySelector('#question-title-input').value = '';
  document.querySelector('#first-choice-input').value = '';
  document.querySelector('#second-choice-input').value = '';
  document.querySelector('#third-choice-input').value = '';
  document.querySelector('#fourth-choice-input').value = '';
};

if (token) {
  activateLoggedInDisplay();
  setLoggedInMode();
} else {
  activateLoggedOutDisplay();
  setLoggedOutMode();
}

if (typeof window === 'undefined') {
  module.exports = clearInputFields();
}
