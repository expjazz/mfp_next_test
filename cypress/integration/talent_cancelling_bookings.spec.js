Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Talent cancelling bookings', () => {
  beforeEach(() => {
    cy.talentLogin()
    cy.intercept('**/api/v2/request/request_list/**').as('bookings')
    cy.intercept('**/api/v1/request/change_request_status/').as('cancelBooking')
  })

  it ('cancels a booking without the other reason', () => {
    cy.generateFunStuff()
    cy.visit('/manage/bookings')
    cy.wait('@bookings')
    cy.contains('Fun Stuff item request for', { matchCase: false }).click({ force: true })
    cy.contains('Decline request', { matchCase: false }).click({force: true})
    cy.contains('Select one', { matchCase: false }).click({force: true})
    cy.contains('Unable to complete', { matchCase: false }).click({force: true})
    cy.contains('Submit').click({ force: true })
    cy.wait('@cancelBooking')
    cy.contains('Request declined', { matchCase: false })
  })

  it ('cancels a booking with a small other reason', () => {
    cy.generateFunStuff()
    cy.visit('/manage/bookings')
    cy.wait('@bookings')
    cy.contains('Fun Stuff item request for', { matchCase: false }).click({ force: true })
    cy.contains('Decline request', { matchCase: false }).click({force: true})
    cy.contains('Select one', { matchCase: false }).click({force: true})
    cy.contains('Other', { matchCase: false }).click({force: true})
    cy.get('textarea.reason-textfield').type('This is a small reason')
    cy.contains('Submit').click({ force: true })
    cy.wait('@cancelBooking')
    cy.contains('Request declined', { matchCase: false })
  })

  it ('cancels a booking with a big other reason, without exceding the maximum char limit', () => {
    cy.generateFunStuff()
    cy.visit('/manage/bookings')
    cy.wait('@bookings')
    cy.contains('Fun Stuff item request for', { matchCase: false }).click({ force: true })
    cy.contains('Decline request', { matchCase: false }).click({force: true})
    cy.contains('Select one', { matchCase: false }).click({force: true})
    cy.contains('Other', { matchCase: false }).click({force: true})
    cy.get('textarea.reason-textfield').type('a'.repeat(231))
    cy.contains('0 characters', { matchCase: false })
    cy.contains('Submit').click({ force: true })
    cy.wait('@cancelBooking')
    cy.contains('Request declined', { matchCase: false })
  })
})