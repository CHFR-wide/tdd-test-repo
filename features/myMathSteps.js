const { When, Then } = require('@cucumber/cucumber')
const MyMath = require('../src/myMath')
const assert = require('assert')

When('we add one and one together', () => {
  const math = new MyMath()
  this.result = math.sum(1, 1)
})

Then('we should receive two', () => {
  assert.equal(this.result, 2)
})

When('we try to add a number and text', () => {
  const math = new MyMath()
  this.mathFun = () => math.sum(1, 'abcd')
})

Then('we should get an error', () => {
  assert.throws(this.mathFun)
})
