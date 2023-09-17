
describe('Fibonacci Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('disables the button when the input is empty', () => {
    cy.get('[data-testid=input]').type('{backspace}');
    cy.get('[data-testid=calculate-button]').should('be.disabled');
  });

  it('generates Fibonacci numbers correctly', () => {
    cy.get('[data-testid=input]').type('5');
    cy.get('[data-testid=calculate-button]').click();

 
    cy.get('[data-testid=circle]').should('have.length', 6); // от 0 до 5
  });
});
