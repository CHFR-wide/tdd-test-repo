const { When, Then, Given } = require('@cucumber/cucumber')
const FunnyBank = require('../funnyBank')
const assert = require('assert')
const { BANK_ERRS } = require('../bankErrors')

Given('Two existing bank accounts with enough funds', () => {
  this.bank = new FunnyBank()

  const senderAccount = {
    name: 'YuiDumb',
    balance: 1000
  }
  const recipientAccount = {
    name: 'recipient',
    balance: 500
  }
  this.bank.createAccount(senderAccount)
  this.bank.createAccount(recipientAccount)
})

When('We want to transfer money from one to another', () => {
  this.bank.transfer('YuiDumb', 'recipient', 1000)
})

Then('The recipient should have the sender\'s money', () => {
  const recipient = this.bank.getAccount('recipient')
  assert.equal(recipient.balance, 1500)
})

Given('Two existing bank accounts without enough funds', () => {
  this.bank = new FunnyBank()
  this.transferFunction = () => {}

  const senderAccount = {
    name: 'YuiDumb',
    balance: 500
  }
  const recipientAccount = {
    name: 'recipient',
    balance: 500
  }
  this.bank.createAccount(senderAccount)
  this.bank.createAccount(recipientAccount)
})

When('We want to transfer money we do not have', () => {
  this.transferFunction = () => {
    this.bank.transfer('YuiDumb', 'recipient', 1000)
  }
})

Then('The transfer should fail with a funds error', () => {
  assert.throws(this.transferFunction, new Error(BANK_ERRS.notEnoughFunds))
})

Given('A non existant sender and an existing recipient', () => {
  this.bank = new FunnyBank()
  this.transferFunction = () => {}

  const recipientAccount = {
    name: 'recipient',
    balance: 500
  }
  this.bank.createAccount(recipientAccount)
})

When('We want to transfer money from a non existant account', () => {
  this.transferFunction = () => {
    this.bank.transfer('YuiDumb', 'recipient', 1000)
  }
})

Then('The transfer should fail with a sender not found error', () => {
  assert.throws(this.transferFunction, new Error(BANK_ERRS.senderDoesNotExist))
})

Given('An existing sender and a non existant recipient', () => {
  this.bank = new FunnyBank()
  this.transferFunction = () => {}

  const senderAccount = {
    name: 'YuiDumb',
    balance: 1000
  }
  this.bank.createAccount(senderAccount)
})

When('We want to transfer money to a non existant account', () => {
  this.transferFunction = () => {
    this.bank.transfer('YuiDumb', 'recipient', 1000)
  }
})

Then('The transfer should fail with a recipient not found error', () => {
  assert.throws(this.transferFunction, new Error(BANK_ERRS.recipientDoesNotExist))
})
