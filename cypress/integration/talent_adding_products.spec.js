Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Talent adding and updating products', {
  defaultCommandTimeout: 30000,
  failOnStatusCode: false
}, () => {
  beforeEach(() => {
    cy.talentLogin()
    cy.intercept('**api/v2/request/celebrity_commercial_request/').as('newCommercial')
  })

  describe('Creates commercial offerings', () => {
    beforeEach(() => {
      cy.intercept('**api/v2/request/commercial_request/').as('commercialReq')
    })
    it ('creates an offering with a minimum price', () => {
      cy.visit('/manage/storefront/services/commercial/video-shoutout')
      cy.contains('Add offering').forceClick()
      cy.contains('Select an offering').forceClick()
      cy.contains('Voiceovers').forceClick()
      cy.get('input[data-cy=commercial-price]').type(32)
      cy.contains('Create').forceClick()
      cy.wait('@newCommercial')
      cy.contains('Successfully inserted')
    })

    it ('creates an offering without a minimum price', () => {
      cy.visit('/manage/storefront/services/commercial/video-shoutout')
      cy.contains('Add offering').forceClick()
      cy.contains('Select an offering').forceClick()
      cy.contains('Video review').forceClick()
      // cy.get('input[data-cy=commercial-price]').type(32)
      cy.contains('Create').forceClick()
      cy.wait('@newCommercial')
      cy.contains('Successfully inserted')
    })

    it ('allows a fan to purchase from a commercial that has price with a value above of the minimum', () => {
      cy.fanLogin()
      cy.visit('/testsuit/commercial')
      cy.contains('Voiceovers').forceClick()
      cy.get('input[data-cy=commercialFanBudget]').type(33, { force: true })
      cy.get('textarea').type('Cypress testing')
      cy.contains('send request').forceClick()
      cy.wait('@commercialReq')
      cy.url().should('include', 'thankyou')
      cy.url().should('include', 'commercial=true')
    })
    it ('allows a fan to purchase from a commercial that has price with a value below of the minimum', () => {
      cy.fanLogin()
      cy.visit('/testsuit/commercial')
      cy.contains('Voiceovers').forceClick()
      cy.get('input[data-cy=commercialFanBudget]').type(31, { force: true })
      cy.get('textarea').type('Cypress testing')
      cy.contains('send request').forceClick()
      cy.wait('@commercialReq')
      cy.url().should('include', 'thankyou')
      cy.url().should('include', 'commercial=true')
    })

    // it ('allows a fan to purchase from a commercial that has no price', () => {
    //   cy.fanLogin()
    //   cy.visit('/testsuit/commercial')
    //   cy.contains('Video review').forceClick()
    //   cy.get('input[data-cy=commercialFanBudget]').type(31, { force: true })
    //   cy.get('textarea').type('Cypress testing')
    //   cy.contains('send request').forceClick()
    //   cy.wait('@commercialReq')
    //   cy.url().should('include', 'thankyou')
    //   cy.url().should('include', 'commercial=true')
    // })
  })
})