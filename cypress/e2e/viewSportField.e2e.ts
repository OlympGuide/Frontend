describe('View sport field', () => {
  before('Log in user', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');
  });

  it('should ', () => {
    cy.get('#map').click(900, 895);

    cy.get('[data-pc-section=header]').should('contain', 'Marker test');
    cy.get('[data-pc-section=content]').should(
      'contain',
      'This is the marker test'
    );

    cy.get('[data-cy=button-reserve]').should('contain.text', 'Reservieren');
  });
});
