Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Talent manage page', () => {
  beforeEach(() => {
    cy.talentLogin()
    cy.intercept('**api/v2/request/celebrity_commercial_request/').as('newCommercial')
    cy.intercept('https://app.staging.starsona.com/api/v2/user/user_details/**').as('userUpdate')
  })
  // describe('It creates tags and categories', {
  //   defaultCommandTimeout: 60000
  // },() => {
  //   it ('creates a tag', () => {
  //     cy.intercept('https://app.staging.starsona.com/api/v2/user/user_details/**').as('updateUser')
  //     cy.intercept('https://app.staging.starsona.com/api/v2/user/tags/').as('createTag')
  //     cy.visit('/manage/storefront/profile/industry')
  //     const tagName = `test-tag-${(Math.random() + 1).toString(36).substring(8)}`
  //     cy.get('[data-cy=tagsField]').type(tagName)
  //     cy.contains('Create test-tag').forceClick()
  //     cy.contains('Save').forceClick()
  //     cy.wait('@updateUser')
  //     cy.wait('@createTag')
  //     cy.wait('@updateUser')
  //     cy.contains(tagName)
  //   })
  // })

  describe('It changes the profile', {
    defaultCommandTimeout: 10000,
    viewportWidth: 1440,
  }, () => {
    it ('marks the profile as hidden', () => {
      cy.activateTalent()
      cy.visit('/manage/storefront/profile/name-photo')
      cy.get('.slider').forceClick()
      cy.get('.react-datepicker__input-container input').type('01/01/2033', { force: true })
      cy.get('.react-datepicker__day--selected').forceClick()
      cy.contains('submit').forceClick()
      cy.wait('@userUpdate')
      cy.contains('Your update was successful')
      cy.fanLogin()
      cy.visit('/testsuit/chat')
      cy.contains("continue our conversation").parent().should('have.attr', 'disabled')
    })
  })
})