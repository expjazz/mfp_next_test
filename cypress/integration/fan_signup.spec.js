Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Fan Signup', () => {
  describe('Integration signup', {
    defaultCommandTimeout: 10000
  }, () => {
    it ('sign up', () => {
      cy.intercept('https://app.staging.starsona.com/api/v2/user/is_celebrity_completed/').as('celebComplete')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/register/').as('fanRegister')
      // cy.intercept('https://app.staging.starsona.com/api/v1/user/signed_url/?extension=jpeg&key=profile_images&file_type=image').as('celebImage')
      // cy.intercept('https://app.staging.starsona.com/api/v2/user/profileimages/').as('celebS3Image')
      // cy.intercept('https://app.staging.starsona.com/api/v2/user/user_details*').as('updateProfile')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/services/').as('register')
      cy.visit('/')
      cy.contains('LOGIN', { matchCase: false }).click({ force: true })
      cy.contains('Register', { matchCase: false }).click({ force: true })
      cy.contains(`Are you a purchaser`, { matchCase: false }).click({ force: true })
      cy.get('input[type=email]').type(`expeditojazz+${(Math.random() + 1).toString(36).substring(7)}@gmail.com`)
      cy.get('input[type=password]').type('foobara2')
      cy.contains('Sign up', { matchCase: false }).click({ force: true })
      cy.wait('@celebComplete')
      cy.get('input[name=firstName]').type('Cypress')
      cy.get('input[name=lastName]').type('Testing')
      cy.get('input#for-phno').type(`+1347${Math.floor(Math.random() * 10000000)}`)
      cy.get('input[name=confirmPassword]').type('foobara2')
      cy.contains('Sign up', { matchCase: false }).click({ force: true })
      cy.wait('@fanRegister')
      cy.contains('Welcome to', { matchCase: false })
      cy.contains('Browse', { matchCase: false })
    })
  })
})