import { testUrl, testCircle, testMainInput, testIndexInput, testListItem, testCircleHead, testCircleTail, testCircleSmall,  stateDefault, stateModified, stateChanging } from "../constants";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('List Page', () => {
  beforeEach(() => {
    cy.visit(testUrl + '/list');
  });

  it('should disable add buttons when input is empty', () => {
    cy.get(testMainInput).should('be.empty');
    cy.get('[data-testid=btn-addToHead]').should('be.disabled');
    cy.get('[data-testid=btn-addToTail]').should('be.disabled');
    cy.get(testIndexInput).should('be.empty');
    cy.get('[data-testid=btn-addByIndex]').should('be.disabled');
    cy.get('[data-testid=btn-delByIndex]').should('be.disabled');
  });


  it("rendering default list", () => {

    cy.get(testListItem).each((item) => {
      cy.wrap(item).find(testCircle).should("have.css", "border-color", stateDefault);
    });

    // Проверка метки "head", которая располагается над первым кружочком
    cy.get(testCircleHead).should('contain.text', 'head');

    // Проверка метки "tail", которая располагается под последним кружочком
    cy.get(testCircleTail).should('contain.text', 'tail');
  });


  it('should add an element to the head with different circle colors', () => {
    cy.get(testMainInput).type('111');

    cy.get('[data-testid=btn-addToHead]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testListItem).first().within(() => {
      cy.get(testCircleSmall).should('have.css', 'border-color', stateChanging);
      cy.get(testCircle).should('contain.text', '111');
    });

    cy.get(testListItem).first().within(() => {
      cy.get(testCircle).should(($circle) => {
        const borderColor = $circle.css('border-color');
        expect(borderColor).to.eq(stateModified);
      });
    });

    cy.get(testListItem).first().within(() => {
      cy.get(testCircle).should(($circle) => {
        const borderColor = $circle.css('border-color');
        expect(borderColor).to.eq(stateDefault);
      });
    });

    cy.get(testCircleHead).should('contain.text', 'head');
  });


  it("should add an element to the tail with different circle colors", () => {
    cy.get(testMainInput).type('111');
    cy.get('[data-testid=btn-addToTail]').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testListItem).last().within(() => {
      cy.get(testCircleSmall).should('have.css', 'border-color', stateChanging);
      cy.get(testCircle).should('contain.text', '111');
    });

    cy.get(testCircle).last()
      .should('have.css', 'border-color', stateModified);

    cy.get(testCircle).last()
      .should('contain.text', '111')
      .and('have.css', 'border-color', stateDefault);

    // под этим элементом есть надпись "tail"
    cy.get(testCircleTail).should('contain.text', 'tail');
  });

  it("should add an element by index", () => {
    cy.get(testMainInput).type('111');
    cy.get(testIndexInput).type('3');
    cy.get('[data-testid=btn-addByIndex]').click();

    // Проверяем цвет верхних кружков при перемещении элемента к указанному индексу
    for (let i = 1; i < 3; i++) {
      cy.get(testCircleSmall).eq(i)
        .should('have.css', 'border-color', stateChanging);
    }

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCircle).eq(3)
      .should('contain.text', '111')
      .and('have.css', 'border-color', stateModified);

    cy.get(testCircle).eq(3)
      .should('contain.text', '111')
      .and('have.css', 'border-color', stateDefault);
  });

  it("remove from head", () => {
    // Получаем значение из первого кружочка до его удаления
    cy.get(testCircle).first().invoke('text').then(text => {

      cy.get('[data-testid=btn-delFromHead]').click();
      cy.wait(SHORT_DELAY_IN_MS);

      // Проверяем, что первый элемент списка теперь пуст
      cy.get(testCircle).first()
        .should('not.contain.text', text);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(testCircleHead).should('contain.text', 'head');
    });
  });

  it("remove from tail", () => {
    // Получаем значение из последнего кружочка до его удаления
    cy.get(testCircle).last().invoke('text').then(text => {

      cy.get('[data-testid="btn-delFromTail"]').click();
      cy.wait(SHORT_DELAY_IN_MS);

      // Проверяем, что последний элемент списка теперь пуст
      cy.get(testCircle).last()
        .should('not.contain.text', text);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(testCircleTail).should('contain.text', 'tail');
    });
  });

  it("remove by index", () => {
    let removedItem: string; //удаляемый элемент
    let nextToRemovedItem: string;  //следующий за удаляемым элементом

    cy.get(testCircle).eq(1).invoke('text').then(text => {  //удаляемый
      removedItem = text;

      return cy.get(testCircle).eq(2).invoke('text'); //след. за удаляемым
    }).then(text => {
      nextToRemovedItem = text;

      cy.get(testIndexInput).type(1);

      cy.get('[data-testid=btn-delByIndex]').click();

      for (let i = 0; i <= 1; i++) {
        cy.get(testCircle).eq(i)
          .should('have.css', 'border-color', stateChanging);
        cy.wait(SHORT_DELAY_IN_MS);
      }

      cy.get(testCircle).eq(1)
        .should('contain.text', '')
        .and('have.css', 'border-color', stateDefault);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(testCircle).eq(1) //на место удаленного элемента встал следующий за ним
        .should('contain.text', nextToRemovedItem);

      cy.get('[data-testid="circle-head"]').should('be.visible');
      cy.get('[data-testid="circle-tail"]').should('be.visible');
    });
  });
});
