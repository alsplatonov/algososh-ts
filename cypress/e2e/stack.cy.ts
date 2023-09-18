
import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Stack Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('disables the "Добавить" button when the input is empty', () => {
    cy.get('[data-testid=input]').should('be.empty');
    cy.get('[data-testid=add-button]').should('be.disabled');
  });

  it('adds an element to the stack and validates animation', () => {
    cy.get('[data-testid=input]').type('42');
    cy.get('[data-testid=add-button]').click();

    cy.get('[data-testid=circle]').should('have.css', 'border-color', "rgb(210, 82, 225)");
    cy.get('[data-testid=circle]').should('have.length', 1);
    cy.wait(DELAY_IN_MS);
    cy.get('[data-testid=circle]').should('have.css', 'border-color', "rgb(0, 50, 255)");
  });


  it('deletes an element from the stack', () => {

    cy.get('[data-testid=input]').type('42');
    cy.get('[data-testid=add-button]').click();

    cy.get('[data-testid=delete-button]').click();

    cy.get('[data-testid=stack-item]').should('not.exist');
  });

  it('clears the stack when "Очистить" button is clicked', () => {

    cy.get('[data-testid=input]').type('1');
    cy.get('[data-testid=add-button]').click();
    cy.wait(DELAY_IN_MS);
    cy.get('[data-testid=input]').type('2');
    cy.get('[data-testid=add-button]').click();
    cy.wait(DELAY_IN_MS);
    cy.get('[data-testid=input]').type('3');
    cy.get('[data-testid=add-button]').click();
    cy.wait(DELAY_IN_MS);

    cy.get('[data-testid=clear-button]').click();


    cy.get('[data-testid=stack-item]').should('have.length', 0);
  });
});
