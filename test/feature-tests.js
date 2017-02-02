const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

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

   //add info in one or two input fields but not all; submit should still fail

  });
});

test.describe('Question answer page', function () {

});
