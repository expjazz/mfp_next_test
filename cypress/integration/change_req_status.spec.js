
const talentToken = 'fdb6331e8e9bc97627bef1d543b2d7b227e977d8'
Cypress.on("uncaught:exception", err => !err.message.includes("ResizeObserver"));

context('Change request status', () => {
  before(() => {
    cy.cancelAllBookingsPerUser(talentToken)
  })
  beforeEach(() => {
    localStorage.setItem('data', JSON.stringify({"user":{"first_name":"test","last_name":"suite","nick_name":"testsuit","id":"1aMZkBbW","email":"test_suite@gmail.com","authentication_token":"fdb6331e8e9bc97627bef1d543b2d7b227e977d8","status":1,"sign_up_source":1,"images":[{"id":"BeX7Nldy","image_url":"https://dxjnh2froe2ec.cloudfront.net/images/profile/FILE_1642629277GTEKTWD9.jpeg","thumbnail_url":"https://dxjnh2froe2ec.cloudfront.net/images/profile/thumbnail_FILE_1642629277GTEKTWD9.jpeg","photo":"FILE_1642629277GTEKTWD9.jpeg","thumbnail":"thumbnail_FILE_1642629277GTEKTWD9.jpeg","medium_thumbnail":null,"medium_thumbnail_url":null}],"profile_photo":null,"avatar_photo":{"id":"BeX7Nldy","image_url":"https://dxjnh2froe2ec.cloudfront.net/images/profile/FILE_1642629277GTEKTWD9.jpeg","thumbnail_url":"https://dxjnh2froe2ec.cloudfront.net/images/profile/thumbnail_FILE_1642629277GTEKTWD9.jpeg","photo":"FILE_1642629277GTEKTWD9.jpeg","thumbnail":"thumbnail_FILE_1642629277GTEKTWD9.jpeg","medium_thumbnail":null,"medium_thumbnail_url":null},"show_nick_name":true,"completed_fan_unseen_count":0,"fresh_desk_jwt":"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiZGV2X3VzZXIiLCJlbWFpbCI6ImRldmVtYWlsQGVtYWlsLmNvbSIsImV4cCI6MTY0MjY5NTExNn0.R3yRvA4oIiaJTsuwG8IMgJK2bVuvoO2_zlqZO4w5_Ng","getstream_token":"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTEzNjcifQ.w66J47BuaF2XPtH_Gcq-jWPomB4RfN-CdyzMCckYiUU","role_details":{"id":"1aK8qRbQ","role_code":"R1002","role_name":"Celebrity","is_complete":true},"celebrity":true,"partner_data":{"partner_entity_domain":"https://staging.ttwithme.com","entity_id":"STARSONA-US-1","name":"Starsona - US","region_id":"STARSONA-US","base_date_format":"MM/DD/YYYY"},"show_fan_home":true,"notification_settings":{"id":10032,"user":"1aMZkBbW","timezone":"Europe/Lisbon","timezone_name":null,"celebrity_starsona_request":true,"celebrity_starsona_message":true,"celebrity_account_updates":true,"fan_account_updates":true,"fan_starsona_messages":true,"fan_starsona_videos":true,"fan_email_starsona_videos":true,"email_notification":false,"secondary_email":null,"mobile_country_code":"1","mobile_number":"3473453324","mobile_notification":true,"mobile_verified":false,"verification_uuid":null,"is_viewed":false,"whatsapp_notification":false}},"celebrity_details":{"pending_requests_count":18,"weekly_limits":100,"rate":"32.00","description":"","in_app_price":"31.99","rating":"0.00","follow_count":0,"charity_visibility":true,"availability":true,"featured":false,"remaining_limit":99,"stripe_user_id":null,"check_payments":false,"activation_date":null,"inactivated_date":null,"allow_comment":true,"allow_reaction":true,"allow_rating":true,"off_limit_topics":null,"page_design":false,"related_videos":[],"profession_details":[]}}))
    cy.intercept('**/api/v2/request/request_list/**').as('bookings')
    cy.intercept('https://starsona-stb-usea1.s3-accelerate.amazonaws.com/').as('s3Upload')
  })

  it ('allows you to change the progress', () => {
    cy.generateFunStuff()
    cy.visit('/manage/bookings')
    cy.wait('@bookings')
    cy.contains('Fun Stuff item request for', { matchCase: false }).click({ force: true })
    cy.get('[data-cy=change-status]').parent()
      .trigger('mousedown', { which: 1, force: true })
      .trigger('mousemove', { clientX: 3400, clientY: 0, force: true})
      .trigger('mouseup', { force: true })
    // cy.drag('[data-cy=change-status]', '[data-cy="almost_finished"]')
    cy.contains('Status updated', { matchCase: false })
  })
})