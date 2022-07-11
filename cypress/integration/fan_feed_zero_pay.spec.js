import axios from 'axios';
import 'cypress-iframe'
import { capitalize } from 'lodash';
import { optileObj } from '../support/optileUtils';
Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));
// Cypress.config('defaultCommandTimeout', 10000);


const generalReqDetails = 'Cypress Testing'
context('Fan Feed', () => {
  before(() => {
    console.log(cy.config())
    cy.request({
      url: `${cy.config().ENDPOINT}v2/user/cancel_user_bookings/`,
      method: 'GET',
      headers: {
        'authorization': `token ${cy.config().FAN_TOKEN}`,
        device: 'web',
        'Accept': 'application/json'
      }
    }).then(resp => console.log('=======', resp, cy.config()))
  })

  beforeEach(() => {
    cy.fanLogin()
  })

  describe('actions with zero pay for simple bookings',{
    defaultCommandTimeout: 30000
  } ,() => {

    it ('gets a notification for a shoutout with zero pay', () => {
      // Creating the booking
      cy.visit('/testsuit/shoutout/shoutout')
      cy.contains('What is the occasion?').click({force: true})
      cy.get('li[tabindex=0]').contains('Birthday').click({force: true})
      cy.get('span').contains('This video is for me!').click({force: true})
      cy.get('.promo-head').click({force: true})
      cy.get('input[data-cy=promo]').type('ILOVEDOGS')
      cy.get('button').contains('Add').click({force: true})
      cy.get('button').contains('Next').click({force: true})
      cy.get('button[data-cy=pay-btn]', {timeout: 30000}).contains('Pay').click({force: true})
      // Checking if it is in the fan feed
      cy.url().should('include', '/thankyou')
      cy.url().should('include', '/thankyou')
      cy.wait(5000)
      cy.visit('/fan-manage/my-videos')
      // Checking to see if the found booking matches the created one
      cy.get('.time').contains('a minute ago').siblings('p').contains('Video shoutout requested from')
      cy.get('.time').contains('a minute ago').click({force: true})
      cy.get('span').contains('testsuit')
      cy.contains('Occasion: Birthday')
      cy.contains(`For: ${cy.config().FAN_NAME}`)
    })

    it ('gets a notification for a dm with zero pay', {
      defaultCommandTimeout: 30000
    },() => {
      // Creating the booking
      const testString = 'Cypress testing'
      cy.visit('/testsuit/chat')
      cy.get('textarea').type(testString)
      cy.get('.promo-head').click({force: true})
      cy.get('input[data-cy=promo]').type('ILOVEDOGS')
      cy.get('button').contains('Add').click({force: true})
      cy.get('button').contains('Next').click({force: true})
      cy.get('button[data-cy=pay-btn]', {timeout: 30000}).contains('Pay').click({force: true})
      // Checking if it is in the fan feed
      cy.url().should('include', '/thankyou')
      cy.wait(5000)
      cy.visit('/fan-manage/my-videos')
      // Checking to see if the found booking matches the created one
      cy.get('.time').contains('a minute ago').siblings('p').contains('DM requested').click({force: true})
      cy.get('p').contains(testString)
      cy.contains(`DM's`).forceClick()
      cy.contains(testString)
    })


  it ('gets a notification for a social booking with zero pay', {
    defaultCommandTimeout: 30000
  },() => {
    // Creating the booking
      cy.visit('/testsuit/social')
        // fiding a social item to visit
      cy.contains('GET STARTED').first().click({force: true})


      //Filling the form
      const socialUrl = 'www.instagram.com/cypressTesting'
      cy.get('input[data-cy=purchase-social-link]').type(socialUrl)
      cy.get('.promo-head').click({force: true})
      cy.get('input[data-cy=promo]').type('ILOVEDOGS')
      cy.get('button').contains('Add').click({force: true})
      // Paying
      cy.get('button').contains('Next').click({force: true})
      cy.get('button[data-cy=pay-btn]', {timeout: 30000}).contains('Pay').click({force: true})
      cy.url().should('include', '/thankyou')
      cy.url().should('include', '/thankyou')
      cy.wait(5000)
      cy.visit('/fan-manage/my-videos')
    //  Checking to see if the found booking matches the created one
      cy.get('.time').contains('a minute ago').siblings('p').contains('Social media interaction requested from')
      cy.get('.time').contains('a minute ago').click({force: true})
        // checking fan feed
      cy.contains(socialUrl)
    })

    it ('gets a notification for a live call booking', {
      defaultCommandTimeout: 30000
    },() => {
      // Creating booking
      cy.visit('/testsuit/live')
      // finding live call to visit
      cy.contains('GET STARTED').first().click({force: true})

      //Waiting for the page to be generated
      const liveCallContent = 'cypress testing'
      // Filling up the form and paying
      cy.get('textarea').type(liveCallContent)
      cy.get('.promo-head').click({force: true})
      cy.get('input[data-cy=promo]').type('ILOVEDOGS')
      cy.get('button').contains('Add').click({force: true})
      cy.get('button').contains('Next').click({force: true})
      cy.get('button[data-cy=pay-btn]', {timeout: 30000}).contains('Pay').click({force: true})
      cy.url().should('include', '/thankyou')
      cy.url().should('include', '/thankyou')
      cy.wait(5000)
      cy.visit('/fan-manage/my-videos')
      //  Checking to see if the found booking matches the created one
      cy.get('.time').contains('a minute ago').siblings('p').contains('live call requested from')
      cy.get('.time').contains('a minute ago').click({force: true})
      cy.contains(liveCallContent)
    })

    it ('gets a notification for a fun stuff of type video recording',{
      defaultCommandTimeout: 30000
    } ,() => {
      cy.visit('/testsuit/fun')
      cy.get('h2', {timeout: 15000}).contains('Video recording').click({force: true})
      cy.url().should('include', '/video-recording')
      cy.get('textarea').type(generalReqDetails)
      cy.get('.promo-head').click({force: true})
      cy.get('input[data-cy=promo]').type('ILOVEDOGS')
      cy.get('button').contains('Add').click({force: true})
      cy.get('button').contains('Next').click({force: true})
      cy.get('button[data-cy=pay-btn]', {timeout: 30000}).contains('Pay').click({force: true})
      cy.url({timeout: 30000}).should('include', '/thankyou')
      cy.url().should('include', '/thankyou')
      cy.wait(5000)
      cy.visit('/fan-manage/my-videos')
      cy.get('.time', {timeout: 40000}).contains('a minute ago').siblings('p').contains('Video recording requested')
      cy.get('.time').contains('a minute ago').click({force: true})
      cy.contains('Video recording', {timeout: 10000})
      cy.contains(generalReqDetails)
    })

    it ('gets a notification for a merch booking',{
      defaultCommandTimeout: 30000
    } ,() => {
      cy.visit('/testsuit/merch')
      cy.get('h2', {timeout: 15000}).contains('Merch test').click({force: true})
      cy.url().should('include', '/merch-test')
      cy.get('input[data-cy=shipping_full_name]').type('Cypress the tester')
      cy.get('input[data-cy=shipping_address_1]').type('Cypress avenue')
      cy.get('input[data-cy=shipping_address_2]').type('apto')
      cy.get('input[data-cy=shipping_city]').type('Cypress')
      cy.get('input[data-cy=country_name]').type('Portugal')
      cy.get('input[data-cy=shipping_full_name]').click({force: true})
      cy.get('input[data-cy=state_name]').type('Lisboa')
      cy.get('input[data-cy=shipping_zip_code]').type('11894-432')
      cy.get('#for-phno').type(3476532853)
      cy.get('.promo-head').click({force: true})
      cy.get('input[data-cy=promo]').type('ILOVEDOGS')
      cy.get('button').contains('Add').click({force: true})
      cy.get('button').contains('Next').click({force: true})
      cy.get('button[data-cy=pay-btn]', {timeout: 30000}).contains('Pay').click({force: true})
      cy.url({timeout: 30000}).should('include', '/thankyou')
      cy.url().should('include', '/thankyou')
      cy.wait(5000)
      cy.visit('/fan-manage/my-videos')
      cy.get('.time', {timeout: 40000}).contains('a minute ago').siblings('p').contains('Merch test requested from')
      cy.get('.time').contains('a minute ago').click({force: true})
      cy.contains('Merch test', { timeout: 10000 })
    })

  })

  describe('Commercial bookings notifications', () => {
    it ('gets a notification when the commercial booking is approved in jarvis', () => {
      cy.generateCommercial()
      cy.visit('/fan-manage/my-videos')
      cy.get('.time', {timeout: 40000}).contains('a minute ago').siblings('p').contains('Voiceovers business')
    })

    it ('gets a notification if talent accepts the price', () => {
      cy.commercialApproval().then(resp => {
        console.log(resp)
        cy.wait(5000)
        cy.visit('/fan-manage/my-videos')
        cy.contains('a minute ago').parent().parent().parent().parent().contains('TIME TO PAY - PRICE ACCEPTED')
      })
    })

    it ('gets a notification if talent demands a different price', () => {
      const cancelReason = 'Cypress reason'
      cy.commercialApproval(400, cancelReason).then(resp => {
        console.log(resp)
        cy.wait(5000)
        cy.visit('/fan-manage/my-videos')
        cy.contains('a minute ago').parent().parent().parent().parent().contains('TIME TO PAY - NEW PRICE')
        cy.contains(cancelReason)
      })
    })
  })

  describe('It gets clarification notifications', () => {
    it ('gets a notification in the general feed', () => {
      cy.generateClarification().then(({message}) => {
        cy.wait(5000)
        cy.visit('/fan-manage/my-videos')
        cy.contains(message).parent().parent().parent().parent().parent().contains('CLARIFICATION REQUESTED')
      })
    })

    it ('responds to a clarification', () => {
      cy.generateClarification().then(({message}) => {
        cy.wait(5000)
        cy.intercept('https://app.staging.starsona.com/api/v2/request/clarification/').as('clarification')
        cy.visit('/fan-manage/my-videos')
        const clarificationResponse = 'Clarification response'
        cy.contains(message).parent().parent().parent().parent().parent().contains('CLARIFICATION REQUESTED').forceClick()
        cy.get('textarea').type(clarificationResponse)
        cy.contains('Send').forceClick()
        // cy.wait('@clarification')
        cy.contains('Clarification sent')
      })
    })
  })

  describe('redirects to the correct page', () => {
    it ('allows fan to create a dm', () => {
      cy.generateDmAndFulfill().then(({response}) => {
        cy.visit('/fan-manage/my-videos')
        cy.intercept('https://app.staging.starsona.com/api/v2/request/stargramz/**').as('getDm')
        cy.contains(response).forceClick()
        cy.wait('@getDm')
        cy.get('textarea').type('DM')
        cy.contains('SUBMIT').forceClick()
        cy.contains('PAYMENT DETAILS')
      } )
    })
  })
})