const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

function sendNewQuestion() {
  const questionField = driver.findElement({id: 'question-title-input'});
  const firstChoiceInput = driver.findElement({id: 'first-choice-input'});
  const secondChoiceInput = driver.findElement({id: 'second-choice-input'});
  const thirdChoiceInput = driver.findElement({id: 'third-choice-input'});
  const fourthChoiceInput = driver.findElement({id: 'fourth-choice-input'});
  const submitButton = driver.findElement({id: 'submit-question'});

  questionField.sendKeys('What does foo mean in programming?');
  firstChoiceInput.sendKeys('An error message.');
  secondChoiceInput.sendKeys('A placeholder or dummy name.');
  thirdChoiceInput.sendKeys('Another term for email.');
  fourthChoiceInput.sendKeys('A term for the keyboard.');
  submitButton.click();

  driver.findElement({id: 'user-notification'}).then(function (line) {
   return line.getText()
 }).then(function (text) {
   assert.strictEqual(text, 'You have successfully submitted a question.');
 })
}

function goToAnswerPage() {
  sendNewQuestion();
  driver.get('http://localhost:3000/question');
  driver.executeScript("activateLoggedInDisplay()");
}

test.describe('Landing page', function () {
  this.timeout(15000);

  test.beforeEach(function() {
      driver.get('http://localhost:3000');
    });

  test.it('application should serve the landing page when user visits root url', function () {
    driver.findElement({tagName: 'h1'}).then(function (title) {
     return title.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'Real Time: Polling Done Right');
   })
  });

  test.it('application should render five input fields on landing page', function () {

    const inputFields = driver.findElements({tagName: 'input'}).then(function(select) {
      assert.equal(select.length, 5)
    })

  });

  test.it('input fields should render with correct text', function () {

    driver.findElement({id: 'question-title-input'}).then(function (field) {
     return field.getAttribute('placeholder')
   }).then(function (text) {
     assert.strictEqual(text, 'Question Title');
   })

   driver.findElement({id: 'second-choice-input'}).then(function (field){
    return field.getAttribute('placeholder')
  }).then(function (text){
    assert.strictEqual(text, 'Second Choice');
  })

  driver.findElement({id: 'fourth-choice-input'}).then(function (field) {
   return field.getAttribute('placeholder')
 }).then(function (text){
   assert.strictEqual(text, 'Fourth Choice');
 })

  });

  test.it('submit button should trigger error message if one or more input fields is empty', function () {

    const submitButton = driver.findElement({id: 'submit-question'});
    submitButton.click();

    driver.findElement({id: 'user-notification'}).then(function (button) {
     return button.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'Please enter in valid values for all fields.');
   })

   const questionField = driver.findElement({id: 'question-title-input'});
   questionField.sendKeys('What does foo mean in programming?');

   driver.findElement({id: 'user-notification'}).then(function (line) {
    return line.getText()
  }).then(function (text) {
    assert.strictEqual(text, 'Please enter in valid values for all fields.');
  })

  });

  test.it('submit button should trigger success message when all five input fields have text in them', function () {

    sendNewQuestion();

  })
});

test.describe('Question answer page', function () {

  this.timeout(15000);

  test.beforeEach(function() {
      driver.get('http://localhost:3000');
    });

  test.it('question answer page should be visitable without error when there is a question', function () {
    goToAnswerPage();

    driver.findElement({tagName: 'h1'}).then(function (title) {
     return title.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'Real Time: Polling Done Right');
   })

  });

  test.it('question answer page should display the title of the current question', function () {
    goToAnswerPage();

    driver.findElement({tagName: 'h2'}).then(function (title) {
     return title.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'What does foo mean in programming?');
   })
  });

  test.it('answer page should display four buttons', function () {
    goToAnswerPage();

    const buttons = driver.findElements({className: 'answer-button'}).then(function (select) {
      assert.strictEqual(select.length, 4);
    });
  });

  test.it('clicking a vote button on the answer page should increase the total vote count by one', function () {
    goToAnswerPage();

    const choice = driver.findElement({className: 'first-answer'});

    choice.click();
    choice.click();

    driver.findElement({id: 'vote-count-total-display'}).then(function (title) {
     return title.getText()
   }).then(function (text) {
     assert.strictEqual(text, 'Total votes: 2');
   })
  });

});
