const assert = require('assert');
const webdriver = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

test.describe('Input fields', () => {

  test.beforeEach(() => {
      driver.get('http://localhost:3000');
    });

  test.it('application should render five input fields on landing page', () => {
    // this.timeout(15000);

    const inputFields = driver.findElements({tagName: 'input'}).then((select) => {
      assert.equal(select.length, 5)
    })

  });

  test.it('input fields should render with correct text', () => {

    driver.findElement({id: 'question-title-input'}).then((button) => {
     return button.getAttribute('placeholder')
   }).then((text) => {
     assert.strictEqual(text, 'Question Title');
   })

   driver.findElement({id: 'second-choice-input'}).then((button) => {
    return button.getAttribute('placeholder')
  }).then((text) => {
    assert.strictEqual(text, 'Second Choice');
  })

  });
});
