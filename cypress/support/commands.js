Cypress.Commands.add('signup', () => {
    cy.visit('http://localhost:3000/signin');
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
  });
  