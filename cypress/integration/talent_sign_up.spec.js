import Hashids from 'hashids'

Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));
const userData = {
  country_code: "55",
  email: "expeditojazz+12232413@gmail.com",
  first_name: "cypress",
  last_name: "testing",
  password: "foobara2",
  phone_number: "987864738",
  referral_code: "",
  role: "R1002",
}

const celebProfile = {
  availability: true,
  description: "",
  profile_video: "",
  weekly_limits: 100,
}

const headers = {
  'entity-id': 'STARSONA-US-1',
  'entity-token': 'ee9be549-85d0-4562-846c-d9c8ecdd3284',
  device: 'web'
}

const jarvisHeader = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDMzNCwibmFtZSI6IkV4cGVkaXRvIEFuZHJhZGUiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwic3ViIjoiNSIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTYzODM5MDcwMiwiZXhwIjoxNjY5OTI2NzAyLCJqdGkiOiIxMTkyMzUyOS05MGI5LTQyZDgtODY2ZC1iMzYyNTc1NmRlZDYifQ.3bqXlx5pKfQJp7KVVP2sZz2V0yNTu4Sf0OjoZ5PMUuI'
}

context('Talent Signup', {
  defaultCommandTimeout: 10000
},() => {
  describe('Integration test', () => {
    it ('Sets a correct price on final signup', () => {
      cy.intercept('https://app.staging.starsona.com/api/v2/user/is_celebrity_completed/').as('celebComplete')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/register/').as('celebRegister')
      cy.intercept('https://app.staging.starsona.com/api/v1/user/signed_url/?extension=jpeg&key=profile_images&file_type=image').as('celebImage')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/profileimages/').as('celebS3Image')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/user_details*').as('updateProfile')
      cy.intercept('https://app.staging.starsona.com/api/v2/user/services/').as('register')
      cy.visit('/')
      cy.contains('LOGIN', { matchCase: false }).click({ force: true })
      cy.contains('Register', { matchCase: false }).click({ force: true })
      cy.contains(`famous and want to create a`, { matchCase: false }).click({ force: true })
      cy.get('input[type=email]').type(`expeditojazz+${(Math.random() + 1).toString(36).substring(8)}@gmail.com`)
      cy.get('input[type=password]').type('foobara2')
      cy.contains('Sign up', { matchCase: false }).click({ force: true })
      cy.wait('@celebComplete')
      cy.get('input[name=firstName]').type('Cypress')
      cy.get('input[name=lastName]').type('Testing')
      cy.get('input#for-phno').type(`+1347${Math.floor(Math.random() * 10000000)}`)
      cy.get('input[name=confirmPassword]').type('foobara2')
      cy.contains('Continue', { matchCase: false }).click({ force: true })
      cy.wait('@celebRegister')
      cy.contains('Take a profile picture', { matchCase: false }).click({ force: true })
      cy.wait(5000)
      cy.contains('Snap pic', { matchCase: false }).click({ force: true })
      cy.wait(1000)
      cy.contains('I like it, continue').forceClick()
      cy.wait('@celebImage')
      cy.wait('@celebS3Image')
      cy.contains('Continue', { matchCase: false }).click({ force: true })
      cy.get('input[inputmode=numeric]').type(3)
      cy.wait(5000)
      cy.contains('Submit', { matchCase: false }).click({ force: true })
      // cy.wait('@updateProfile')
      // cy.wait('@register')
      cy.url().should('include', '/manage/storefront/services/personalized-videos')
      cy.contains(203)
    })

    // it ('Gets an email on admin approval', () => {
    //   cy.createInbox().then(inbox => {
    //     console.log(inbox);
    //     const user = userData
    //     user.email = inbox.emailAddress
    //     user.phone_number = `+55${Math.floor(Math.random() * 1000000000)}`
    //     cy.request({
    //       url: 'https://app.staging.starsona.com/api/v2/user/register/',
    //       method: 'POST',
    //       body: user,
    //       headers,
    //     }).then(resp => {
    //       console.log('=======', resp);
    //       expect(resp.body.status).to.equal(200)
    //       expect(resp.body.data.user.authentication_token).to.be.a('string')
    //       expect(resp.body.data.user.email).to.equal(inbox.emailAddress)
    //       const token = resp.body.data.user.authentication_token
    //       const { id } = resp.body.data.user
    //       cy.request({
    //         url: 'https://app.staging.starsona.com/api/v2/user/celebrity_profile/',
    //         method: 'POST',
    //         body: celebProfile,
    //         headers: {
    //           ...headers,
    //           Authorization: `token ${token}`
    //         }
    //       }).then(resp => {
    //           expect(resp.body.status).to.equal(200)
    //           expect(resp.body.data).to.have.property('celebrity')
    //           const hashid = new Hashids('', 8)
    //           cy.request({
    //             url: 'https://app.staging.starsona.com/api/v1/partner_admin/users/pending_approval/',
    //             headers: jarvisHeader,
    //             body: {
    //               star: hashid.decode(id),
    //               talent_status: "live"
    //             }
    //           }).then(resp => {
    //             expect(resp.body.status).to.equal(200)
    //             console.log(resp, 'jarvis');
    //             cy.waitForLatestEmail(inbox.id).then(email => {
    //               console.log(email);
    //             })
    //           })
    //       })
    //     })
    //   })
    // })
  })
})