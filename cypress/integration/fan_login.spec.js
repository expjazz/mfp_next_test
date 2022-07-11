Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Fan Log in', () => {
  describe('Integration login', {
    defaultCommandTimeout: 10000
  }, () => {
    it ('logs in on tips', () => {
      cy.intercept('https://app.staging.starsona.com/api/v2/user/is_celebrity_completed/').as('celebComplete')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/register/').as('fanRegister')
      // cy.intercept('https://app.staging.starsona.com/api/v1/user/signed_url/?extension=jpeg&key=profile_images&file_type=image').as('celebImage')
      // cy.intercept('https://app.staging.starsona.com/api/v2/user/profileimages/').as('celebS3Image')
      // cy.intercept('https://app.staging.starsona.com/api/v2/user/user_details*').as('updateProfile')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/services/').as('register')
      cy.visit('/testsuit/tip')
      cy.contains('login').forceClick()
      cy.get('input[type=text]').type('expeditojazz+1234@gmail.com')
      cy.get('input[type=password]').type('foobara2')
      cy.wait(1000)
      cy.get('button').contains('Login').forceClick()
      cy.contains('Payment Details')
    })
  })
})