import axios from "axios";
import Hashids from 'hashids'

const { optileObj } = require("./optileUtils");
const jarvisHeader = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMDMzNCwibmFtZSI6IkV4cGVkaXRvIEFuZHJhZGUiLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwic3ViIjoiNSIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTYzODM5MDcwMiwiZXhwIjoxNjY5OTI2NzAyLCJqdGkiOiIxMTkyMzUyOS05MGI5LTQyZDgtODY2ZC1iMzYyNTc1NmRlZDYifQ.3bqXlx5pKfQJp7KVVP2sZz2V0yNTu4Sf0OjoZ5PMUuI'
}

const obj = {
  celebrity: '1aMZkBbW',
  language: 'olejRejN',
  'Content-Disposition': 'attachment',
  occasion: 5,
  public_request: true,
  request_details: JSON.stringify({"stargramto":"Expedito","stargramfrom":"","relationship":"","show_relationship":true,"from_where":"","for_what":"","important_info":"","date":"","event_title":"","event_guest_honor":"","booking_statement":"","is_myself":true,"templateType":1}),
  request_type: 1,
}

const cypressCreditCardMsg = 'Cypress credit card msg'
const instagramLink = "www.instagram.com/cypres_testing"
const messageObj = {
  celebrity: "1aMZkBbW",
  language: "olejRejN",
  message: cypressCreditCardMsg,
  type: "request",
}

const socialMediaObj = {
  celebrity: "1aMZkBbW",
  description: "",
  language: "olejRejN",
  link: instagramLink,
  request_type: 6,
  social_media_title: "pmbk5ezJ",
  type: "request",
}

const funStuffDescription = 'Cypress fun stuff'

const liveCallObj = {
  celebrity: "1aMZkBbW",
  description: funStuffDescription,
  fun_stuff_id: "LDdw6Rb1",
  language: "olejRejN",
  type: "request",
}

const commercialObj = (id = "46dBlYa7", budget = "43.00") => ({
  celebrity: "1aMZkBbW",
  commercial_offering_id: id,
  fan_budget: budget,
  fan_request: "test",
  type: "request",
})

const funStuffObj = (id = "X7axW9ey") =>  ({
  celebrity: "1aMZkBbW",
  description: funStuffDescription,
  fun_stuff_id: id,
  language: "olejRejN",
  type: "request",
})

const merchObj = {
  celebrity: "1aMZkBbW",
  country: "US",
  description: "",
  language: "olejRejN",
  product_id: "MYerEkdO",
  shipping_address_1: "cypress st",
  shipping_address_2: "apt",
  shipping_city: "Lisboa",
  shipping_country: "Portugal",
  shipping_full_name: "cypress",
  shipping_phone: "+13475831145",
  shipping_state: "Lisboa",
  shipping_zip_code: "345223",
  type: "request",
}


const authHeaders = {
  'authorization': 'token 9e1271fd992b5a02d02eede828944a993ea5e712',
  device: 'web',
  'Accept': 'application/json'
}

const authHeadersTalent = {
  'authorization': 'token fdb6331e8e9bc97627bef1d543b2d7b227e977d8',
  device: 'web',
  'Accept': 'application/json'
}

export const generateDm = () => {
  return cy.request({
    url: 'https://app.staging.starsona.com/api/v2/message/direct_message/',
    method: 'POST',
    body: messageObj,
    headers: authHeaders
  }).then(resp => {
    expect(resp.status).to.eq(200)
    expect(resp.body.data.booking).to.be.a('string')
    expect(resp.body.data).to.have.property('details')
    const request = {
      id: resp.body.data.booking,
      ...resp.body.data.details,
      rate: resp.body.data.details.rate.toFixed(2)
    }
    // generating optile obj
    cy.request({
      url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
      method: 'POST',
      body: {
        amount: request.rate,
        currency: 'USD',
        starsona: request.id,
        type: 'booking',
        optile_data: optileObj(parseFloat(request.rate), request.id)
      },
      headers: authHeaders
    }).then(resp => {
        expect(resp.status).to.eq(200)
        expect(Object.keys(resp.body.data).length).to.be.greaterThan(0)

        // test the charge api call
        cy.request({
          url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
          method: 'POST',
          body: {
            account: { verificationCode: '123' },
            browserData: {
              browserScreenHeight: 1117,
              browserScreenWidth: 1728,
              colorDepth: 30,
              javaEnabled: false,
              language: "pt-BR",
              timezone: "Europe/Lisbon"
              }
          },
          headers: authHeaders
        }).then(opt => {
          expect(opt.body.resultInfo).to.equal('Approved')
      })
    })
  })
}

export const cancelAllBookingsPerUser = (token = '9e1271fd992b5a02d02eede828944a993ea5e712') => {
  return cy.request({
    url: 'https://app.staging.starsona.com/api/v2/user/cancel_user_bookings/',
    method: 'GET',
    headers: {
      'authorization': `token ${token}`,
      device: 'web',
      'Accept': 'application/json'
    }})
}

export const generateShoutout = () => {
  const formData = new FormData()
  Object.keys(obj).forEach(key => {
    console.log(key, obj[key])
    formData.append(key, obj[key])
  })

  // Testing booking creation API
  return new Cypress.Promise((resolve, reject) => {
  axios({
    url: 'https://app.staging.starsona.com/api/v1/request/stargramz/',
    method: 'POST',
    data: formData,
    // form: true,
    headers: {
      'authorization': 'token 9e1271fd992b5a02d02eede828944a993ea5e712',
      device: 'web',
      // 'Content-Type': 'multipart/form-data; Boundary=XXX',
      'Accept': 'application/json'
    }
  }).then(resp => {
    const request = resp.data.data.stargramz_response
    expect(request).to.exist
    expect(request.id).to.be.a('string')

    // Testing optile_pay_types API
    axios({
      url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
      method: 'POST',
      data: {
        amount: request.order_details.amount,
        currency: 'USD',
        starsona: request.id,
        type: 'booking',
        optile_data: optileObj(parseFloat(request.order_details.amount), request.id)
      },
      headers: {
        'authorization': 'token 9e1271fd992b5a02d02eede828944a993ea5e712',
        device: 'web',
        'Accept': 'application/json'
      }
    }).then(opt => {
      expect(opt.data.status).to.equal(200)
      // Testing charge api call from optile

      axios({
        url: `https://api.sandbox.oscato.com/pci/v1/${opt.data.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
        method: 'POST',
        data: {
          account: { verificationCode: '123' },
          browserData: {
            browserScreenHeight: 1117,
            browserScreenWidth: 1728,
            colorDepth: 30,
            javaEnabled: false,
            language: "pt-BR",
            timezone: "Europe/Lisbon"
          }
        },
        headers: {
          'authorization': 'token 9e1271fd992b5a02d02eede828944a993ea5e712',
          device: 'web',
          'Accept': 'application/json'
        }
      }).then(opt => {
        expect(opt.data.resultInfo).to.equal('Approved')
        resolve()
        })
      })
    })
  })
}

export const generateSocialMedia = () => {
  return cy.request({
    url: 'https://app.staging.starsona.com/api/v2/social_media/social_media_request/',
    method: 'POST',
    body: socialMediaObj,
    headers: authHeaders
  }).then(resp => {
      expect(resp.status).to.eq(200)
      expect(resp.body.data.booking).to.be.a('string')
      const request = {
        id: resp.body.data.booking,
        amount: '8.00'
      }
      cy.request({
        url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
        method: 'POST',
        body: {
          amount: request.amount,
          currency: 'USD',
          starsona: request.id,
          type: 'booking',
          optile_data: optileObj(parseFloat(request.amount), request.id)
        },
        headers: authHeaders
      }).then(resp => {
          expect(resp.status).to.eq(200)
          expect(Object.keys(resp.body.data).length).to.be.greaterThan(0)
          cy.request({
            url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
            method: 'POST',
            body: {
              account: { verificationCode: '123' },
              browserData: {
                browserScreenHeight: 1117,
                browserScreenWidth: 1728,
                colorDepth: 30,
                javaEnabled: false,
                language: "pt-BR",
                timezone: "Europe/Lisbon"
                }
            },
            headers: authHeaders
          }).then(opt => {
              expect(opt.body.resultInfo).to.equal('Approved')
              return request
          })
      })
    })
}

export const generateFunStuff = (id = "X7axW9ey") => {
  return cy.request({
    url: 'https://app.staging.starsona.com/api/v2/fun_stuff/request_fun_stuff/',
    method: 'POST',
    body: funStuffObj(id),
    headers: authHeaders
  }).then(resp => {
    expect(resp.status).to.eq(200)
    expect(resp.body.data.booking).to.be.a('string')
    const request = {
      id: resp.body.data.booking,
      amount: '32.00'
    }
    cy.request({
      url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
      method: 'POST',
      body: {
        amount: request.amount,
        currency: 'USD',
        starsona: request.id,
        type: 'booking',
        optile_data: optileObj(parseFloat(request.amount), request.id)
      },
      headers: authHeaders
    }).then(resp => {
        expect(resp.status).to.eq(200)
        expect(Object.keys(resp.body.data).length).to.be.greaterThan(0)
        cy.request({
          url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
          method: 'POST',
          body: {
            account: { verificationCode: '123' },
            browserData: {
              browserScreenHeight: 1117,
              browserScreenWidth: 1728,
              colorDepth: 30,
              javaEnabled: false,
              language: "pt-BR",
              timezone: "Europe/Lisbon"
              }
          },
          headers: authHeaders
        }).then(opt => {
            expect(opt.body.resultInfo).to.equal('Approved')
            cy.wait(5000)
        })
    })
  })
}

export const generateAudioFunStuff = () => generateFunStuff("zPdyW7aQ")

export const generateTextFunStuff = () => generateFunStuff('w9aAEOav')

export const fileUploadFunStuff = () => generateFunStuff('46dBGXe7')

export const photoUploadFunStuff = () => generateFunStuff('xkazgYbJ')

export const generateMerch = () => {
  return cy.request({
    url: 'https://app.staging.starsona.com/api/v2/products/request_product/',
    method: 'POST',
    body: merchObj,
    headers: authHeaders
  }).then(resp => {
    expect(resp.status).to.eq(200)
    expect(resp.body.data.booking).to.be.a('string')
    const request = {
      id: resp.body.data.booking,
      amount: '32.00'
    }
    cy.request({
      url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
      method: 'POST',
      body: {
        amount: request.amount,
        currency: 'USD',
        starsona: request.id,
        type: 'booking',
        optile_data: optileObj(parseFloat(request.amount), request.id)
      },
      headers: authHeaders
    }).then(resp => {
        expect(resp.status).to.eq(200)
        expect(Object.keys(resp.body.data).length).to.be.greaterThan(0)
        cy.request({
          url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
          method: 'POST',
          body: {
            account: { verificationCode: '123' },
            browserData: {
              browserScreenHeight: 1117,
              browserScreenWidth: 1728,
              colorDepth: 30,
              javaEnabled: false,
              language: "pt-BR",
              timezone: "Europe/Lisbon"
              }
          },
          headers: authHeaders
        }).then(opt => {
            expect(opt.body.resultInfo).to.equal('Approved')

        })
    })
  })
}

export const generateCommercial = (id = "46dBlYa7", budget = "43.00") => {
  return cy.request({
    method: 'POST',
    body: commercialObj(id, budget),
    url: 'https://app.staging.starsona.com/api/v2/request/commercial_request/',
    headers: authHeaders,
  }).then(resp => {
      expect(resp.status).to.eq(200)
      expect(resp.body.data.stargramz_response.id).to.be.a('string')
      const commercialId = resp.body.data.stargramz_response.id
      const hashid = new Hashids('', 8)
      cy.request({
        url: 'https://staging.auth.myfanpark.com/api/v1/partner_admin/bookings/pending_approve/?entity_id=STARSONA-US-1',
        headers: jarvisHeader,
        body: {
          approval_type: "commercial",
          id: [hashid.decode(commercialId)[0]]
        }
      }).then(resp => {
        expect(resp.status).to.eq(200)
        return { id: commercialId }
      })
  })
}

export const commercialApproval = (price = 43, feedback = '') => {
  return generateCommercial().then(({id}) => {
    cy.request({
      url: 'https://app.staging.starsona.com/api/v2/request/commercial_request/',
      method: 'POST',
      headers: authHeadersTalent,
      body: {
        booking_id: id,
        star_price: price,
        star_response: feedback,
        type: "response",
      }
    }).then(resp => resp)
  })
}

export const generateClarification = () => {
  return generateSocialMedia().then(({id}) => {
    return cy.request({
      url: 'https://app.staging.starsona.com/api/v2/request/clarification/',
      method: 'POST',
      body: {
        message: "cypress testing",
        request: id
      },
      headers: authHeadersTalent
    }).then(resp => {
      expect(resp.status).to.eq(200)
      return {
        message: 'cypress testing'
      }
    })
  })
}

export const generateDmAndFulfill = () => {
  const message = (Math.random() + 1).toString(36).substring(4)
  const response = (Math.random() + 1).toString(36).substring(4)
  return cy.request({
    url: 'https://app.staging.starsona.com/api/v2/message/direct_message/',
    method: 'POST',
    body: {
        ...messageObj,
        message,
    },
    headers: authHeaders
  }).then(resp => {
    expect(resp.status).to.eq(200)
    expect(resp.body.data.booking).to.be.a('string')
    expect(resp.body.data).to.have.property('details')
    const request = {
      id: resp.body.data.booking,
      ...resp.body.data.details,
      rate: resp.body.data.details.rate.toFixed(2)
    }
    // generating optile obj
    cy.request({
      url: 'https://app.staging.starsona.com/api/v2/payments/optile_pay_types/',
      method: 'POST',
      body: {
        amount: request.rate,
        currency: 'USD',
        starsona: request.id,
        type: 'booking',
        optile_data: optileObj(parseFloat(request.rate), request.id)
      },
      headers: authHeaders
    }).then(resp => {
        expect(resp.status).to.eq(200)
        expect(Object.keys(resp.body.data).length).to.be.greaterThan(0)

        // test the charge api call
        cy.request({
          url: `https://api.sandbox.oscato.com/pci/v1/${resp.body.data.identification.longId}/accounts/60df17768270c92633726a92a/charge`,
          method: 'POST',
          body: {
            account: { verificationCode: '123' },
            browserData: {
              browserScreenHeight: 1117,
              browserScreenWidth: 1728,
              colorDepth: 30,
              javaEnabled: false,
              language: "pt-BR",
              timezone: "Europe/Lisbon"
              }
          },
          headers: authHeaders
        }).then(opt => {
          expect(opt.body.resultInfo).to.equal('Approved')
          cy.wait(5000)
          cy.request({
            url: 'https://app.staging.starsona.com/api/v2/message/direct_message/',
            method: 'POST',
            body: {
              booking_id: request.id,
              message: response,
              type: "response"
            },
            headers: authHeadersTalent
          }).then(() => {
            return {
              response,
              message
            }
          })
      })
    })
  })
}