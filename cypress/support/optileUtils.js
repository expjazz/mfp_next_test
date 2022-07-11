export const optileObj = (amount, id) => ({
  transactionId: `tr-${Math.random()}${Date.now()}`,
  country: 'US',
  integration: 'HOSTED',
  customer: {
    email: 'expeditojazz+1234@gmail.com',
    registration: {
      id: '60df17768270c92633726a91u',
    },
  },
  payment: {
    amount: parseFloat(amount).toFixed(2),
    currency: 'US',
    reference: JSON.stringify({
      bookingId:
        id,
      promocodeId: '',
      checkout_flow_type: 'nextjs',
      type: 'booking',

    }),
  },
  allowDelete: true,
  style: {
    hostedVersion: 'v3',
    resolution: '3x',
    cssOverride:
      'https://starsona-prb-usea1.s3.amazonaws.com/common/optile_checkout_style.css',
    language: 'en_US',
  },
  preselection: {
    deferral: 'DEFERRED',
  },
  callback: {
    returnUrl: 'https://www.google.com',
    cancelUrl: 'https://www.google.com',
  },
})