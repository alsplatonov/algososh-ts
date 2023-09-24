import { testUrl, testInput, testAddBtn, testCircle, stateDefault, stateModified, stateChanging } from "../constants";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Stack Page', () => {
  beforeEach(() => {
    cy.visit(testUrl + '/stack');
  });

  it('disables the "Добавить" button when the input is empty', () => {
    cy.get(testInput).should('be.empty');
    cy.get(testAddBtn).should('be.disabled');
  });

  it('adds an element to the stack and validates animation', () => {
    cy.get(testInput).type('42');
    cy.get(testAddBtn).click();

    cy.get(testCircle).should('have.css', 'border-color', stateChanging);
    cy.get(testCircle).should('have.length', 1);
    cy.wait(DELAY_IN_MS);
    cy.get(testCircle).should('have.css', 'border-color', stateDefault);
  });


  it('deletes an element from the stack', () => {

    cy.get(testInput).type('42');
    cy.get(testAddBtn).click();

    cy.get('[data-testid=delete-button]').click();

    cy.get('[data-testid=stack-item]').should('not.exist');
  });

  it('clears the stack when "Очистить" button is clicked', () => {

    cy.get(testInput).type('1');
    cy.get(testAddBtn).click();
    cy.wait(DELAY_IN_MS);
    cy.get(testInput).type('2');
    cy.get(testAddBtn).click();
    cy.wait(DELAY_IN_MS);
    cy.get(testInput).type('3');
    cy.get(testAddBtn).click();
    cy.wait(DELAY_IN_MS);

    cy.get('[data-testid=clear-button]').click();


    cy.get('[data-testid=stack-item]').should('have.length', 0);
  });
});
