import { testUrl, testInput, testCircle  } from "../constants";

describe('Fibonacci Page', () => {
  beforeEach(() => {
    cy.visit(testUrl + '/fibonacci');
  });

  it('disables the button when the input is empty', () => {
    cy.get(testInput).type('{backspace}');
    cy.get('[data-testid=calculate-button]').should('be.disabled');
  });

  it('generates Fibonacci numbers correctly', () => {
    cy.get(testInput).type('5');
    cy.get('[data-testid=calculate-button]').click();

 
    cy.get(testCircle).should('have.length', 6); // от 0 до 5
  });
});
