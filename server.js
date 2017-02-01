const express = require('express');
const http = require('http');
const jwt = require('express-jwt');
const socketIo = require('socket.io');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app)
   .listen(port, () => {
      console.log(`Listening on port ${port}.`);
  });
const bodyParser = require('body-parser');
const path = require('path');
const io = socketIo(server);

require('dotenv').config();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!process.env.AUTH0_CLIENT_ID || !process.env.AUTH0_SECRET) {
  throw new Error('Make sure you have AUTH0_CLIENT_ID and AUTH0_SECRET in your .env file');
}

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Real Time: Polling Done Right';

app.locals.question = {
  questionId: null,
  title: '',
  choices: [],
  creatorId: null,
  responses: [],
};

const authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID,
});

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/login', (request, response) => {
  response.send({
    loginID: process.env.AUTH0_USER_KEY,
    domain: process.env.AUTH0_DOMAIN,
  });
});

app.post('/question', (request, response) => {
  const question = request.body;

  app.locals.question.questionId = request.body.questionId;
  app.locals.question.title = request.body.title;
  app.locals.question.choices.push(
    {
      choiceId: Math.floor(Math.random() * 100000),
      choiceName: request.body.firstChoice,
    },
    {
      choiceId: Math.floor(Math.random() * 100000),
      choiceName: request.body.secondChoice,
    },
    {
      choiceId: Math.floor(Math.random() * 100000),
      choiceName: request.body.thirdChoice,
    },
    {
      choiceId: Math.floor(Math.random() * 100000),
      choiceName: request.body.fourthChoice,
    }
  );
  app.locals.question.creatorId = request.body.userId;

  response.json({
    question: app.locals.question,
  });
});

app.get('/question', (request, response) => {

  const questionPageHTML = `
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <link rel="stylesheet" style="text/css" href="styles.css"/>
        <link rel="stylesheet" style="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.css"/>
        <title>Real Time</title>
      </head>
      <body>
        <h1>Real Time: Polling Done Right</h1>

        <button
        id="log-in-button">Log In</button>

        <button
        id="log-out-button">Log Out</button>

        <section id="question-container">

        <h3>Answer The Question!</h3>

        <p id="user-notification"></p>

        <h2>${app.locals.question.title}</h2>

        <button id="${app.locals.question.choices[0].choiceId}" class="answer-button">${app.locals.question.choices[0].choiceName}</button>

        <button id="${app.locals.question.choices[1].choiceId}" class="answer-button">${app.locals.question.choices[1].choiceName}</button>

        <button id="${app.locals.question.choices[2].choiceId}" class="answer-button">${app.locals.question.choices[2].choiceName}</button>

        <button id="${app.locals.question.choices[3].choiceId}" class="answer-button">${app.locals.question.choices[3].choiceName}</button>

        <p id="users-count-display"></p>
        <section id="vote-count-display"></section>
        <section id="vote-each-user-display"></section>

        </section>

      <script src="https://cdn.auth0.com/js/lock/10.8/lock.min.js"></script>
      <script src="https://cdn.auth0.com/js/lock/10.9.1/lock.min.js"></script>
      <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
      <script src="/socket.io/socket.io.js"></script>
      <script src="authentication.js"></script>
      <script src="display.js"></script>
      <script src="core-functionality.js"></script>
      </body>
      </body>
    </html>

  `;

  response.send(questionPageHTML);
});

io.on('connection', (socket) => {
  console.log(`A user has connected and there are now ${io.engine.clientsCount} users present.`);

  io.sockets.emit('usersCount', `There are ${io.engine.clientsCount} users present.`);

  socket.on('message', (channel, message) => {
    if (channel === 'vote') {
      const vote = {
        vote: message.vote,
        githubId: message.githubId,
        githubPhoto: message.githubPhoto,
      };
      app.locals.question.responses.push(vote);
      io.sockets.emit('allVotes', app.locals.question.responses);
    }
  });

  socket.on('disconnect', () => {
    console.log(`A user has left the room and there are now ${io.engine.clientsCount} users present.`);
  });
});
