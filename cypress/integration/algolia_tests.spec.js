import Hashids from 'hashids'
Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Algolia Search', () => {
  describe('Searchs for talents', () => {
    beforeEach(() => {
      cy.intercept('**algolia.net**').as('algolia')
    })
    it ('Shows a newly created and approved talent', () => {
      const firstName = (Math.random() + 1).toString(36).substring(4)
      const lastName = (Math.random() + 1).toString(36).substring(4)
      cy.createNewTalent({ firstName, lastName })
      cy.wait(5000)
      cy.visit('/')
      cy.get('[data-icon=search]').first().forceClick()
      cy.get('#search-term').type(firstName)
      // cy.wait('@algolia')
      cy.contains(lastName)
    })

    it ('Shows an old talent', () => {
      cy.visit('/')
      cy.get('[data-icon=search]').first().forceClick()
      cy.get('#search-term').type('Mark')
      cy.contains('Turner')
    })
  })
})