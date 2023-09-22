
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('List Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('should disable add buttons when input is empty', () => {
    cy.get('[data-testid=main-input]').should('be.empty');
    cy.get('[data-testid=btn-addToHead]').should('be.disabled');
    cy.get('[data-testid=btn-addToTail]').should('be.disabled');
    cy.get('[data-testid=index-input]').should('be.empty');
    cy.get('[data-testid=btn-addByIndex]').should('be.disabled');
    cy.get('[data-testid=btn-delByIndex]').should('be.disabled');
  });


  it("rendering default list", () => {

    cy.get('[data-testid=listItem]').each((item) => {
      cy.wrap(item).find('[data-testid=circle]').should("have.css", "border-color", "rgb(0, 50, 255)");
    });

    // Проверка метки "head", которая располагается над первым кружочком
    cy.get('[data-testid=circle-head]').should('contain.text', 'head');

    // Проверка метки "tail", которая располагается под последним кружочком
    cy.get('[data-testid=circle-tail]').should('contain.text', 'tail');
  });


  it('should add an element to the head with different circle colors', () => {
    cy.get('[data-testid=main-input]').type('111');

    cy.get('[data-testid=btn-addToHead]').click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid=listItem]').first().within(() => {
      cy.get('[data-testid=circleUpSmall]').should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('[data-testid=circle]').should('contain.text', '111');
    });

    cy.get('[data-testid=listItem]').first().within(() => {
      cy.get('[data-testid=circle]').should(($circle) => {
        const borderColor = $circle.css('border-color');
        expect(borderColor).to.eq('rgb(127, 224, 81)');
      });
    });

    cy.get('[data-testid=listItem]').first().within(() => {
      cy.get('[data-testid=circle]').should(($circle) => {
        const borderColor = $circle.css('border-color');
        expect(borderColor).to.eq('rgb(0, 50, 255)');
      });
    });

    cy.get('[data-testid=circle-head]').should('contain.text', 'head');
  });


  it("should add an element to the tail with different circle colors", () => {
    cy.get('[data-testid=main-input]').type('111');
    cy.get('button[data-testid=btn-addToTail]').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid=listItem]').last().within(() => {
      cy.get('[data-testid=circleUpSmall]').should('have.css', 'border-color', 'rgb(210, 82, 225)');
      cy.get('[data-testid=circle]').should('contain.text', '111');
    });

    cy.get('[data-testid=circle]').last()
      .should('have.css', 'border-color', "rgb(127, 224, 81)");

    cy.get('[data-testid=circle]').last()
      .should('contain.text', '111')
      .and('have.css', 'border-color', "rgb(0, 50, 255)");

    // под этим элементом есть надпись "tail"
    cy.get('[data-testid=circle-tail]').should('contain.text', 'tail');
  });

  it("should add an element by index", () => {
    cy.get('[data-testid=main-input]').type('111');
    cy.get('[data-testid=index-input]').type('3');
    cy.get('button[data-testid=btn-addByIndex]').click();

    // Проверяем цвет верхних кружков при перемещении элемента к указанному индексу
    for (let i = 1; i < 3; i++) {
      cy.get('[data-testid=circleUpSmall]').eq(i)
        .should('have.css', 'border-color', "rgb(210, 82, 225)");
    }

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid=circle]').eq(3)
      .should('contain.text', '111')
      .and('have.css', 'border-color', "rgb(127, 224, 81)");

    cy.get('[data-testid=circle]').eq(3)
      .should('contain.text', '111')
      .and('have.css', 'border-color', "rgb(0, 50, 255)");
  });

  it("remove from head", () => {
    // Получаем значение из первого кружочка до его удаления
    cy.get('[data-testid=circle]').first().invoke('text').then(text => {

      cy.get('[data-testid=btn-delFromHead]').click();
      cy.wait(SHORT_DELAY_IN_MS);

      // Проверяем, что первый элемент списка теперь пуст
      cy.get('[data-testid=circle]').first()
        .should('not.contain.text', text);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('[data-testid=circle-head]').should('contain.text', 'head');
    });
  });

  it("remove from tail", () => {
    // Получаем значение из последнего кружочка до его удаления
    cy.get('[data-testid=circle]').last().invoke('text').then(text => {

      cy.get('[data-testid="btn-delFromTail"]').click();
      cy.wait(SHORT_DELAY_IN_MS);

      // Проверяем, что последний элемент списка теперь пуст
      cy.get('[data-testid=circle]').last()
        .should('not.contain.text', text);

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('[data-testid=circle-tail]').should('contain.text', 'tail');
    });
  });

  it("remove by index", () => {
    let removedItem: string; //удаляемый элемент
    let nextToRemovedItem: string;  //следующий за удаляемым элементом

    cy.get('[data-testid=circle]').eq(1).invoke('text').then(text => {  //удаляемый
      removedItem = text;

      return cy.get('[data-testid=circle]').eq(2).invoke('text'); //след. за удаляемым
    }).then(text => {
      nextToRemovedItem = text;

      cy.get('[data-testid=index-input]').type(1);

      cy.get('button[data-testid=btn-delByIndex]').click();

      for (let i = 0; i <= 1; i++) {
        cy.get('[data-testid=circle]').eq(i)
          .should('have.css', 'border-color', "rgb(210, 82, 225)");
        cy.wait(SHORT_DELAY_IN_MS);
      }

      cy.get('[data-testid=circle]').eq(1)
        .should('contain.text', '')
        .and('have.css', 'border-color', "rgb(0, 50, 255)");

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get('[data-testid=circle]').eq(1) //на место удаленного элемента встал следующий за ним
        .should('contain.text', nextToRemovedItem);

      cy.get('[data-testid="circle-head"]').should('be.visible');
      cy.get('[data-testid="circle-tail"]').should('be.visible');
    });
  });
});
