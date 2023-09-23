import { testUrl } from "../constants";

describe('App works', () => {
  it('started and works correctly', () => {
    cy.visit(testUrl);
  })
})