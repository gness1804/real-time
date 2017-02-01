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
