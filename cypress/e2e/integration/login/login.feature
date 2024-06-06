Feature: Login functionality

Scenario: Successful login
  Given I am on the login page
  When I login
  Then the url is /dashboard
  And I'm logged in
