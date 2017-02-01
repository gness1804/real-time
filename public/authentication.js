const socket = io();
const profile = JSON.parse(localStorage.getItem('profile'));
let githubId;
let githubPhoto;

const questionTitle = $('#question-title-input');
const firstChoiceTitle = $('#first-choice-input');
const secondChoiceTitle = $('#second-choice-input');
const thirdChoiceTitle = $('#third-choice-input');
const fourthChoiceTitle = $('#fourth-choice-input');


(function getCredentials(){
  axios.get('/login').then((response) => {
    loginId = response.data.loginID;
    domain = response.data.domain;
    authenticateUser(loginId, domain);
  }).catch(console.error('There was a problem retrieving your credentials.'));
})()

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
  })

  $('#submit-question').on("click", () => {
    if (!questionTitle.val() || !firstChoiceTitle.val() || !secondChoiceTitle.val() || !thirdChoiceTitle.val() || !fourthChoiceTitle.val()) {
      document.querySelector('#user-notification').innerText = 'Please enter in valid values for all fields.'
      return;
    }
    axios.post('/question', {
      questionId: Date.now(),
      title: questionTitle.val(),
      firstChoice: firstChoiceTitle.val(),
      secondChoice: secondChoiceTitle.val(),
      thirdChoice: thirdChoiceTitle.val(),
      fourthChoice: fourthChoiceTitle.val(),
      userId: profile.userId,
    });
    document.querySelector('#user-notification').innerText = 'You have successfully submitted a question.'
  });

  socket.on('usersCount', (count) => {
    document.querySelector('#users-count-display').innerText = count;
  });

  const buttons = document.querySelectorAll('.answer-button');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
      socket.send('vote', {
        vote: this.innerText,
        githubId,
        githubPhoto,
      });
    });
  }

  socket.on('allVotes', (votes) => {
    let voteCount = votes.length;
    document.querySelector('#vote-count-display').innerText = `Total votes: ${votes.length}`
    //need tally of total of each choice selected
    document.querySelector('#vote-each-user-display').innerHTML = '';
    votes.forEach((vote) => {
      $('#vote-each-user-display').append(`
        <img src="${vote.githubPhoto}"/>
        <p>vote: ${vote.vote}</p>
      `);
    });
  });


}
