describe('order can be made', function () {

  const dataTransfer = new DataTransfer;

  before(function () {
    cy.visit('http://localhost:3000');
    cy.wait(1000)
  });

  it('should allow adding items to cart', function () {
    cy.get('[class^=burger-ingredients_card__]').first().as('bun-ingredient');
    cy.get('[class^=burger-ingredients_card__]').eq(5).as('main-ingredient');
    cy.get('[class^=burger-constructor_constructorelementmiddle__]').as('droptarget');

    cy.get('@bun-ingredient')
      .trigger('dragstart', { dataTransfer });

    cy.get('@droptarget')
      .trigger('drop', { dataTransfer });

      cy.get('@main-ingredient')
      .trigger('dragstart', { dataTransfer });

    cy.get('@droptarget')
      .trigger('drop', { dataTransfer });
  });

  it('should allow opening an ingredient modal', function () {
    cy.get('[class^=burger-ingredients_card__]').eq(3).click();
    cy.wait(500)
    cy.location('pathname').should('eq', '/ingredients/60d3b41abdacab0026a733cd')
    cy.get('[class^=modal]').should('exist');
  });

  it('should allow closing the modal window', function () {
    cy.get('[class^=modal-header_modalheaderclose__]').click()
  });
  
  it('should allow logging in and making the order', function () {
    cy.contains('Оформить заказ').click()
    cy.wait(1000)
    cy.get('[class^=input]').eq(1).type('ndreij@yandex.ru')
    cy.get('input[type=password]').type('practicum')
    cy.contains('Войти').click()
    cy.contains('Оформить заказ').click()
    cy.wait(15000)
    cy.get('[class^=modal]').should('contain', 'Ваш заказ начали готовить')
    
  });

}); 