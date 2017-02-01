// const profile = JSON.parse(localStorage.getItem('profile'));
// const socket = io();
// let githubId;
// let githubPhoto;
//
// $('#log-in-button').on('click', () => {
//   authMaster.logIn();
// });
//
// $('#log-out-button').on('click', () => {
//   authMaster.logOut();
// });
//
//   lock.on('authenticated', (authResult) => {
//     authMaster.handleAuthentication(authResult);
//     activateLoggedInDisplay();
//   })
//
// const token = localStorage.getItem('accessToken');
// if (token) {
//   activateLoggedInDisplay();
//   document.querySelector('#user-notification').innerText = `Hello, ${profile.name}`;
//   githubId = profile.userId;
//   githubPhoto = profile.picture;
//   $('#user-photo-main').attr("src", profile.picture);
// } else {
//   activateLoggedOutDisplay();
//   document.querySelector('#user-notification').innerText = 'You are logged out.';
//   githubId = '';
//   githubPhoto = '';
// }
//
// //need data validation here if user does not enter info in one or more boxes
// $('#submit-question').on("click", () => {
//   axios.post('/question', {
//     questionId: Date.now(),
//     title: $('#question-title-input').val(),
//     firstChoice: $('#first-choice-input').val(),
//     secondChoice: $('#second-choice-input').val(),
//     thirdChoice: $('#third-choice-input').val(),
//     fourthChoice: $('#fourth-choice-input').val(),
//     userId: profile.userId,
//   });
// });
//
// socket.on('usersCount', (count) => {
//   document.querySelector('#users-count-display').innerText = count;
// });
//
// const buttons = document.querySelectorAll('.answer-button');
//
// for (let i = 0; i < buttons.length; i++) {
//   buttons[i].addEventListener('click', function () {
//     socket.send('vote', {
//       vote: this.innerText,
//       githubId,
//       githubPhoto,
//     });
//   });
// }
//
// socket.on('allVotes', (votes) => {
//   let voteCount = votes.length;
//   document.querySelector('#vote-count-display').innerText = `Total votes: ${votes.length}`
//   //need tally of total of each choice selected
//   document.querySelector('#vote-each-user-display').innerHTML = '';
//   votes.forEach((vote) => {
//     $('#vote-each-user-display').append(`
//       <img src="${vote.githubPhoto}"/>
//       <p>vote: ${vote.vote}</p>
//     `);
//   });
// });
