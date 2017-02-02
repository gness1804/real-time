const socket = io();

let profile = JSON.parse(localStorage.getItem('profile'));
const questionTitle = $('#question-title-input');
const firstChoiceTitle = $('#first-choice-input');
const secondChoiceTitle = $('#second-choice-input');
const thirdChoiceTitle = $('#third-choice-input');
const fourthChoiceTitle = $('#fourth-choice-input');
let githubId;
let githubPhoto;
let pagePassword;

(
  () => {
    axios.get('/login').then((response) => {
      loginId = response.data.loginID;
      domain = response.data.domain;
      pagePassword = response.data.pagePassword;
      authenticateUser(loginId, domain);
    }).catch(console.error('There was a problem retrieving your credentials.'));
  }
)()

const authenticateUser = (loginId, domain) => {

  const lock = new Auth0Lock(loginId, domain, {
    auth: {
      responseType: 'token',
    },
  });

  const authMaster = {

    handleAuthentication: function (authResult) {
      lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          console.error('There was a problem setting up the profile.');
          return;
        }

      localStorage.setItem('accessToken', authResult.accessToken);
      localStorage.setItem('profile', JSON.stringify(profile));

      })
    },

    logIn: function () {
      lock.show();
    },

    logOut: function () {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('profile');
      window.location.reload();
    },

  }

  $('#log-in-button').on('click', () => {
    authMaster.logIn();
  });

  $('#log-out-button').on('click', () => {
    authMaster.logOut();
  });

  lock.on('authenticated', (authResult) => {
    authMaster.handleAuthentication(authResult);
    activateLoggedInDisplay();
    setTimeout(() => {
      setLoggedInMode();
    }, 8000);
  })
}
