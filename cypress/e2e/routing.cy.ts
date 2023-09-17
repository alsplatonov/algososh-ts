describe('Routing works correctly', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('main page load', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('string page load', () => {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Строка');
  });

  it('fibonacci page load', () => {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('sorting page load', () => {
    cy.visit('http://localhost:3000/sorting');
    cy.contains('Сортировка массива');
  });

  it('stack page load', () => {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Стек');
  });

  it('queue page load', () => {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Очередь');
  });

  it('list page load', () => {
    cy.visit('http://localhost:3000/list');
    cy.contains('Связный список');
  });

});

