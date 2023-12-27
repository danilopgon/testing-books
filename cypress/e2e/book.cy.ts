describe('Book test', () => {
  it('should have a title', () => {
    cy.visit('#/book/1');

    cy.get('h1').should('contain', 'Book 2');
  });

  it('should have a subtitle', () => {
    cy.visit('#/book/1');

    cy.get('h2').should('contain', 'Author name 2');
  });

  it('form should be fillable', () => {
    cy.visit('#/book/1');

    cy.get('input[formControlName="name"]').type('Name');
    cy.get('input[formControlName="author"]').type('Author');
    cy.get('input[formControlName="description"]').type('Description');
    cy.get('input[formControlName="price"]').type('10');
  });

  it('form should send a PUT request that changes the book data', () => {
    cy.visit('#/book/1');

    cy.get('input[formControlName="name"]').type('Name');
    cy.get('input[formControlName="author"]').type('Author');
    cy.get('input[formControlName="description"]').type('Description');
    cy.get('input[formControlName="price"]').type('10');

    cy.intercept('PUT', '/book/*', {
      statusCode: 200,
      body: {
        id: '1',
        name: 'Name',
        author: 'Author',
        description: 'Description',
        price: 10,
        photoUrl: 'assets/img/book.png',
      },
    }).as('updateBook');

    cy.get('button[type="submit"]').click();

    cy.wait('@updateBook').its('response.statusCode').should('eq', 200);

    cy.get('h1').should('contain', 'Name');
    cy.get('h2').should('contain', 'Author');
    cy.get('p').should('contain', 'Description');
  });

  it('should send a DELETE request that removes the book', () => {
    cy.visit('#/book/1');

    cy.intercept('DELETE', '/book/*', {
      statusCode: 200,
    }).as('deleteBook');

    cy.get('button').contains('Delete').click();

    cy.wait('@deleteBook').its('response.statusCode').should('eq', 200);

    cy.url().should('include', '/home');
  });
});
