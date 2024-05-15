describe('View sport field', () => {
  before('login', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');
  });

  it('should accept proposal', () => {
    // Intercept the network request that fetches the data
    cy.intercept('GET', 'http://localhost:8081/sportfieldproposals?state=0').as(
      'fetchData'
    );

    cy.get('[data-cy="menu-item-Sportplatz-Anträge"]').click();

    // Wait for the network request to complete
    cy.wait('@fetchData');

    cy.get('table')
      .contains('td', 'Marker test')
      .then((tableCell) => {
        const tableRow = tableCell.closest('tr');
        cy.wrap(tableRow).find('.pi-check').click();
      });

    cy.get('[data-cy="menu-item-Karte"]').click();

    cy.get('#map').click(900, 895);
    cy.get('[data-pc-section=header]').should('contain', 'Marker test');
  });
});
