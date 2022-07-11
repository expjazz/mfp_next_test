Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Purchase flow logged in', () => {
  describe(
    'Shoutout pages',
    () => {
      beforeEach(() => {
        cy.fanLogin()
      })
      it ('should contain the correct forms on shoutout', () => {
        cy.visit('/testsuit/shoutout/shoutout')
        cy.contains('What is the occasion?').forceClick()
        cy.get('li[tabindex=0]').contains('Birthday').forceClick()
        // Input needs to have the value of the logged in user name
        cy.get('input[data-cy=userName]').should('have.value', 'Expedito')
        cy.get('input[data-cy=hostName]').should('be.visible')
        cy.get('[data-cy=shoutout-relationship]').get('input').should('be.visible')
      })
    }
  )
})