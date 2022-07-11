import { isEmpty } from "lodash"
import Hashids from 'hashids'

const userData = {
  country_code: "55",
  email: `expeditojazz+${(Math.random() + 1).toString(36).substring(8)}@gmail.com`,
  first_name: "cypress",
  last_name: "testing",
  password: "foobara2",
  phone_number: `+55${Math.floor(Math.random() * 1000000000)}`,
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

/**
 *
 * @param name An object containing first and last name for defining the new user
 */
export const createNewTalent = (name = {}) => {
  if (!isEmpty(name)) {
    userData.first_name = name.firstName
    userData.last_name = name.lastName
  }
  const user = userData
  cy.request({
    url: 'https://app.staging.starsona.com/api/v2/user/register/',
    method: 'POST',
    body: user,
    headers,
  }).then(resp => {
    expect(resp.body.status).to.equal(200)
    expect(resp.body.data.user.authentication_token).to.be.a('string')
    expect(resp.body.data.user.email).to.equal(userData.email)
    const token = resp.body.data.user.authentication_token
    const { id } = resp.body.data.user
    cy.request({
      url: 'https://app.staging.starsona.com/api/v2/user/celebrity_profile/',
      method: 'POST',
      body: celebProfile,
      headers: {
        ...headers,
        Authorization: `token ${token}`
      }
    }).then(resp => {
        expect(resp.body.status).to.equal(200)
        expect(resp.body.data).to.have.property('celebrity')
        const hashid = new Hashids('', 8)
        cy.request({
          url: 'https://app.staging.starsona.com/api/v1/partner_admin/users/pending_approval/',
          headers: jarvisHeader,
          method: 'POST',
          body: {
            star: hashid.decode(id)[0],
            talent_status: "live"
          }
        }).then(resp => {
          expect(resp.body.status).to.equal(200)
        })
    })
  })
}

export const createNewTalentWithoutApproval = (name = {}) => {
  if (!isEmpty(name)) {
    userData.first_name = name.firstName
    userData.last_name = name.lastName
  }
  const user = userData
  cy.request({
    url: 'https://app.staging.starsona.com/api/v2/user/register/',
    method: 'POST',
    body: user,
    headers,
  }).then(resp => {
    expect(resp.body.status).to.equal(200)
    expect(resp.body.data.user.authentication_token).to.be.a('string')
    expect(resp.body.data.user.email).to.equal(userData.email)
    const token = resp.body.data.user.authentication_token
    const { user: createdUser } = resp.body.data
    cy.request({
      url: 'https://app.staging.starsona.com/api/v2/user/celebrity_profile/',
      method: 'POST',
      body: celebProfile,
      headers: {
        ...headers,
        Authorization: `token ${token}`
      }
    }).then(resp => {
        expect(resp.body.status).to.equal(200)
        expect(resp.body.data).to.have.property('celebrity')
        console.log(resp.body.data);
        return { ...resp.body.data, user: createdUser }
    })
  })
}

export const activateTalent = () => {
  cy.request({
    url: 'https://app.staging.starsona.com/api/v2/user/user_details/1aMZkBbW/',
    body: {
      celebrity_details: {activation_date: null, talent_status: "live"},
      user_details: {}
    },
    method: 'PUT',
    headers: {
      ...headers,
      'authorization': 'token fdb6331e8e9bc97627bef1d543b2d7b227e977d8',
    }
  }).then(resp => {
    expect(resp.body.status).to.equal(200)
  })
}