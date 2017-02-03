const postNewQuestion = () => {
  axios.post('/question', {
    questionId: Date.now(),
    title: questionTitle.val(),
    firstChoice: firstChoiceTitle.val(),
    secondChoice: secondChoiceTitle.val(),
    thirdChoice: thirdChoiceTitle.val(),
    fourthChoice: fourthChoiceTitle.val(),
  });
  document.querySelector('#user-notification').innerHTML = `
  <div>
  <p>
  You have successfully submitted a question. To respond to the question, visit <a href="https://real-time-gness.herokuapp.com/question">https://real-time-gness.herokuapp.com/question</a>
  .</p>
  `
}

$('#submit-question').on("click", () => {

  const oneOrMoreFieldIsEmpty = !questionTitle.val() || !firstChoiceTitle.val() || !secondChoiceTitle.val() || !thirdChoiceTitle.val() || !fourthChoiceTitle.val();

  if (oneOrMoreFieldIsEmpty) {
    document.querySelector('#user-notification').innerText = 'Please enter in valid values for all fields.';
    document.querySelector('#user-notification').styles.color = '#F00';
    return;
  }

  postNewQuestion();
  clearInputFields();

});

socket.on('usersCount', (count) => {
  document.querySelector('#users-count-display').innerText = count;
});

const buttons = document.querySelectorAll('.answer-button');

(
  () => {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        socket.send('vote', {
          vote: this.innerText,
          githubId,
          githubPhoto,
        });
      });
    }
  }
)()

const displayVotesOnPage = (votes) => {
  votes.forEach((vote) => {
    $('#vote-each-user-display').append(`
      <div class="each-vote">
        <img id="each-vote-user-image" src="${vote.githubPhoto}"/>
        <p id="each-vote-user-vote">vote: ${vote.vote}</p>
      </div>
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
        <p>Total votes for ${key}: ${votesObj[key]}</p>
      `)
    }
  }
}

socket.on('allVotes', (votes) => {
  const voteCount = votes.length;
  document.querySelector('#vote-count-total-display').innerText = `Total votes: ${votes.length}`
  document.querySelector('#vote-each-user-display').innerHTML = '';
  document.querySelector('#vote-tally-display').innerHTML = '';
  displayVotesOnPage(votes);
  displayTallyOfVoteChoices(votes);
});
