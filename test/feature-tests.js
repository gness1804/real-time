var assert    = require('assert');
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

test.describe('Input fields', () => {
  //  this.timeout(15000)

  test.beforeEach(function() {
      driver.get('http://localhost:3000');
    });

  test.it('application should render five input fields on landing page', () => {

    var inputFields = driver.findElements({tagName: 'input'}).then(function (select) {
      assert.equal(select.length, 5)
    })

  });
});
