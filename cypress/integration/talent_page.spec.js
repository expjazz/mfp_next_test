Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Talent visit', () => {
  describe('Unapproved talent', () => {
    it ('shows an 404 for unaproved talent', () => {
      const firstName = (Math.random() + 1).toString(36).substring(4)
      const lastName = (Math.random() + 1).toString(36).substring(4)
      cy.createNewTalentWithoutApproval({ firstName, lastName })
        .then(celeb => {
          console.log('-----', celeb)
          // cy.visit(`/${celeb.user.user_id}`)
          cy.visit('/expeditoandrade6')
          cy.url().should('include', '404')
        })
    })

    it ('allows pending celeb to see its page before approced', () => {
      cy.unapprovedTalentLogin()
      cy.visit('/expeditoandrade6')
      cy.url().should('include', 'expeditoandrade6')
    })

    it ('does not show unapproved page even with other talent logged in', () => {
      cy.talentLogin()
      cy.visit('/expeditoandrade6')
      cy.url().should('include', '404')
    })
  })
})