const postNewQuestion = () => {
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
}

$('#submit-question').on("click", () => {

  const oneOrMoreFieldIsEmpty = !questionTitle.val() || !firstChoiceTitle.val() || !secondChoiceTitle.val() || !thirdChoiceTitle.val() || !fourthChoiceTitle.val();

  if (oneOrMoreFieldIsEmpty) {
    document.querySelector('#user-notification').innerText = 'Please enter in valid values for all fields.'
    return;
  }

  postNewQuestion();

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

const displayVotesOnPage = (votes) => {
  votes.forEach((vote) => {
    $('#vote-each-user-display').append(`
      <img src="${vote.githubPhoto}"/>
      <p>vote: ${vote.vote}</p>
    `);
  });
}

const displayTallyOfVoteChoices = (votes) => {
  let votesObj = {};
  for (var i = 0; i < votes.length; i++) {
    votesObj[votes[i].vote] = 0;
  }
  for (var i = 0; i < votes.length; i++) {
    votesObj[votes[i].vote] = votesObj[votes[i].vote] + 1;
  }
  for (var key in votesObj) {
    if (votesObj.hasOwnProperty(key)) {
      $('#vote-tally-display').append(`
        <p>${key}: ${votesObj[key]}</p>
      `)
    }
  }
}

// const countVotes = (votes) => {
//   const voteCount = {
//       A: 0,
//       B: 0,
//       C: 0,
//       D: 0
//   };
//
//   for (let vote in votes) {
//     voteCount[votes[vote]]++
//   }
//
//   return voteCount;
// }

socket.on('allVotes', (votes) => {
  const voteCount = votes.length;
  document.querySelector('#vote-count-total-display').innerText = `Total votes: ${votes.length}`
  document.querySelector('#vote-each-user-display').innerHTML = '';
  document.querySelector('#vote-tally-display').innerHTML = '';
  displayVotesOnPage(votes);
  displayTallyOfVoteChoices(votes);
});
