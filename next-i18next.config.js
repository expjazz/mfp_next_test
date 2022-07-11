const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: process.env.ENV === 'staging' ? ['en-US', 'en-CA'] : ['en-ZA', 'en-US', 'de', 'en-CA', 'en-NG', 'en-IN'],
    localePath: path.resolve('./public/locales')
  },
}