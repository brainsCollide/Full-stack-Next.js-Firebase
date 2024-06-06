describe('Sign-In and Access Landing Page', () => {
  it('should sign in successfully and redirect to the landing page', () => {
    cy.signup();

    
    cy.url().should('eq', 'http://localhost:3000/');
    cy.contains('Welcome').should('be.visible');
  });
});
