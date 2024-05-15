describe('View sport field', () => {
  before('create sport field', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');
  });

  it('should ', () => {
    cy.get('#map').click(900, 895);

    cy.get('[data-pc-section=header]').should('contain', 'Marker test');

    cy.get('[data-cy=button-reserve]').should('contain.text', 'Reservieren');
  });
});
