import { testUrl, testInput, testCircle, testStringReverseBtn, stateDefault, stateModified, stateChanging } from "../constants";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('StringComponent', () => {
  beforeEach(() => {
    cy.visit(testUrl + '/recursion');
  });

  it('disables the button when the input is empty', () => {
    cy.get(testInput).should('be.empty');
    cy.get(testStringReverseBtn).should('be.disabled');
  });

  it('reverses the string correctly with animation', () => {
    const inputString = 'qwerty';
    const reversedString = inputString.split('').reverse().join('');

    cy.get(testInput).type(inputString);
    cy.get(testStringReverseBtn).should('not.be.disabled');

    cy.get(testStringReverseBtn).click();

    cy.get(testCircle).should('have.length', inputString.length);

    cy.get(testCircle).each((circle, index) => {
      cy.wrap(circle).should('have.css', 'border-color', stateChanging);
      cy.wrap(circle).should('have.text', reversedString[index]);
      cy.wait(DELAY_IN_MS);
      cy.wrap(circle).should('have.css', 'border-color', stateModified);
    });
  });
});
