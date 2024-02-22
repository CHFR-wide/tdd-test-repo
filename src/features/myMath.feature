Feature: Calculations

    Scenario: Add two numbers
        When we add one and one together
        Then we should receive two

    Scenario: Add a number and text
        When we try to add a number and text
        Then we should get an error