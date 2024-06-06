import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I sign up', () => {
  cy.visit('http://localhost:3000/signin');
  cy.get('input[name="email"]').type('testuser@example.com');
  cy.get('input[name="password"]').type('password123');
  cy.get('button[type="submit"]').click();
});

Then('the url is {word}', (url) => {
  const fullUrl = `http://localhost:3000/${url}`;
  cy.url().should('eq', fullUrl);
});

Then('I\'m signed in', () => {
  cy.window().its('localStorage.email').should('eq', 'testuser@example.com');
});
