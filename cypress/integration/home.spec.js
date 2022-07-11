
context('Home Page', () => {
  it ('should have all titles', () => {
    cy.visit('/')

    cy.get('h3').contains('Shop by genre')
    cy.get('h3').contains('Featured')
    cy.get('h3').contains('Popular')
    cy.get('h3').contains('Browse Talent')
  })

  it ('should open the entity meny when clicking', () => {
    cy.get('[data-icon=globe]').click()
    cy.get('span').contains('SETTINGS')
    cy.get('[data-icon=times]').click()
  })

  it ('should be able to log in user', () => {
    cy.get('.auth-button').click()
    cy.get('input[name=email]').type('expeditojazz+1234@gmail.com')
    cy.get('input[name=password]').type('foobara2{enter}')
    cy.wait(5000).then(() => {
      const data = localStorage.getItem('data')
      expect(!!data).to.eql(true)
      expect(Object.keys(JSON.parse(data).user).length).to.be.greaterThan(2)
    })
  })

})