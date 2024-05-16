describe('View sport field', () => {
  beforeEach('Log in user', () => {
    cy.login('cypress@olympguide.ch', 'CypressTest1$');
  });

  it('should decline the proposal', () => {
    // Intercept the network request that fetches the data
    cy.intercept('GET', 'http://localhost:8081/sportfieldproposals?state=0').as(
      'fetchData'
    );

    cy.get('[data-cy="menu-item-Sportplatz-Anträge"]')
      .should('be.visible')
      .click();

    // Wait for the network request to complete
    cy.wait('@fetchData');
    cy.wait(2000);

    cy.get('table')
      .contains('td', 'Sportfield test')
      .then((tableCell) => {
        const tableRow = tableCell.closest('tr');
        cy.wrap(tableRow).find('.pi-times').click();
      });
    cy.get('table').contains('td', 'Sportfield test').should('not.exist');
  });

  it('should check out all columns of a row', () => {
    cy.visit('/');

    cy.intercept('GET', 'http://localhost:8081/sportfieldproposals?state=0').as(
      'fetchData'
    );

    cy.get('[data-cy="menu-item-Sportplatz-Anträge"]')
      .should('be.visible')
      .click();
    cy.wait('@fetchData');

    cy.wait(2000);
    cy.get('table').contains('td', 'Marker test');
    cy.get('table').contains('td', 'This is the marker test');
    cy.get('table').contains('td', '47.488470002922504');
    cy.get('table').contains('td', '8.726320266723635');
    cy.get('table').contains('td', 'cypress@olympguide.ch');
    cy.get('table').contains('td', 'Open');
  });

  it('should accept proposal', () => {
    cy.visit('/');

    cy.intercept('GET', 'http://localhost:8081/sportfieldproposals?state=0').as(
      'fetchData'
    );

    cy.get('[data-cy="menu-item-Sportplatz-Anträge"]')
      .should('be.visible')
      .click();
    cy.wait('@fetchData');
    cy.wait(2000);
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
