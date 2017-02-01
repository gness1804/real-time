const token = localStorage.getItem('accessToken');

const setLoggedInMode = () => {
  document.querySelector('#user-notification').innerText = `Hello, ${profile.name}`;
  githubId = profile.userId;
  githubPhoto = profile.picture;
  $('#user-photo-main').attr("src", profile.picture);
}

if (token) {
  activateLoggedInDisplay();
  setLoggedInMode();
} else {
  activateLoggedOutDisplay();
  document.querySelector('#user-notification').innerText = 'You are logged out.';
  githubId = '';
  githubPhoto = '';
}
