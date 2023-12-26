describe('Home test ', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');

    cy.title().should('eq', 'BookListApp');
  });

  it('should have a title', () => {
    cy.visit('/');

    cy.get('h1').should('contain', 'Available books');
  });

  it('should have a list of books', () => {
    cy.visit('/');

    //esto podría ser un componente card
    cy.get('h5').should('have.length', 4);
  });
});
