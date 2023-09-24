import { DELAY_IN_MS } from "../../src/constants/delays";
import { testUrl, testInput, testAddBtn, stateDefault, stateModified, stateChanging  } from "../constants";

describe('Queue Page', () => {
  beforeEach(() => {
    cy.visit(testUrl + '/queue');
  });

  it('disables the "Добавить" button when the input is empty', () => {
    cy.get(testInput).should('be.empty');
    cy.get(testAddBtn).should('be.disabled');
  });

  it('adds an element to the queue and validates animation', () => {
    cy.get(testInput).type('42');
    cy.get(testAddBtn).click();

    cy.get('[data-testid=circle]').should('have.css', 'border-color', stateChanging);
    cy.get('[data-testid=circle]').should('have.length', 1);
    cy.wait(DELAY_IN_MS);
    cy.get('[data-testid=circle]').should('have.css', 'border-color', stateDefault);
  });

  it('removes an element from the queue', () => {
    cy.get(testInput).type('42');
    cy.get(testAddBtn).click();

    cy.get('[data-testid=delete-button]').click();

    cy.get('[data-testid=queue-item]').should('not.exist');
  });

  it('clears the queue when "Очистить" button is clicked', () => {
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

    cy.get('[data-testid=queue-item]').should('have.length', 0);
  });
});
