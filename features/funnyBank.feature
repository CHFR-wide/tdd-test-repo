Feature: Banking

    Scenario: Transfering money between two accounts
        Given Two existing bank accounts with enough funds
        When We want to transfer money from one to another
        Then The recipient should have the sender's money

    Scenario: Transfering money without enough funds
        Given Two existing bank accounts without enough funds
        When We want to transfer money we do not have
        Then The transfer should fail with a funds error

    Scenario: Transfering money from a non-existant account
        Given A non existant sender and an existing recipient
        When We want to transfer money from a non existant account
        Then The transfer should fail with a sender not found error

    Scenario: Transfering money to a non-existant account
        Given An existing sender and a non existant recipient
        When We want to transfer money to a non existant account
        Then The transfer should fail with a recipient not found error