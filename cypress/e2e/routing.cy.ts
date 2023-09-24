import { testUrl } from "../constants";

describe('Routing works correctly', () => {
  beforeEach(() => {
    cy.visit(testUrl);
  });

  it('main page load', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('string page load', () => {
    cy.visit(testUrl + '/recursion');
    cy.contains('Строка');
  });

  it('fibonacci page load', () => {
    cy.visit(testUrl + '/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('sorting page load', () => {
    cy.visit(testUrl + '/sorting');
    cy.contains('Сортировка массива');
  });

  it('stack page load', () => {
    cy.visit(testUrl + '/stack');
    cy.contains('Стек');
  });

  it('queue page load', () => {
    cy.visit(testUrl + '/queue');
    cy.contains('Очередь');
  });

  it('list page load', () => {
    cy.visit(testUrl + '/list');
    cy.contains('Связный список');
  });

});

