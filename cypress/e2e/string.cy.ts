import { DELAY_IN_MS } from "../../src/constants/delays";

describe('StringComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('disables the button when the input is empty', () => {
    cy.get('[data-testid=input]').should('be.empty'); 
    cy.get('[data-testid=reverse-button]').should('be.disabled'); 
  });

  it('reverses the string correctly with animation', () => {
    const inputString = 'qwerty';
    const reversedString = inputString.split('').reverse().join('');

    cy.get('[data-testid=input]').type(inputString);
    cy.get('[data-testid=reverse-button]').should('not.be.disabled'); 

    cy.get('[data-testid=reverse-button]').click();

    cy.get('[data-testid=circle]').should('have.length', inputString.length);

    cy.get('[data-testid=circle]').each((circle, index) => {
      cy.wrap(circle).should('have.css', 'border-color', "rgb(210, 82, 225)"); 
      cy.wrap(circle).should('have.text', reversedString[index]); 
      cy.wait(DELAY_IN_MS); 
      cy.wrap(circle).should('have.css', 'border-color', "rgb(127, 224, 81)"); 
    });
  });
});
