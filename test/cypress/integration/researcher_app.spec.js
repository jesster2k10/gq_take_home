/// <reference types="cypress" />

context('Researcher App', () => {
  beforeEach(() => {
    cy.visit('/setup')
  })

  it('should create a new coupoun', () => {
    const code = `c${new Date().getTime()}`;

    cy.intercept('POST', '**/incentives', {
      id: 'test_id',
      code,
      is_redeemable: true,
      is_redeemed: true,
      created_at: new Date().toString(),
      updated_at: new Date().toString(),
      max_redemptions: 1,
    }).as('createIncentive');

    cy.get('[data-testid="incentives-form__code"]').type(code)
    cy.get('[data-testid="incentives-form__submit"]').click()
    cy.wait('@createIncentive').its('response.statusCode').should('be.oneOf', [200, 304]).then(() => {
      cy
        .get('[data-testid="incentives-table"] [data-testid="incentive-table-row"]')
        .get('[data-testid="incentive-table-row__code"]')
        .last()
        .should('have.attr', 'value', code)
      })
    })
})