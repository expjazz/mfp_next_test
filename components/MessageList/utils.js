export const gaEvent = ({
  event,
  optileData,
  reqData,
  currencyData,
  starData,
  title,
  rate,
}) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event,
      bookingID: optileData.reference,
      realAmount: parseInt(rate, 10),
      localAmount: optileData.amount,
      promoCode: reqData.promoCode,
      localCurrency: currencyData.abbr,
      talent: starData.userDetails.nick_name
        ? starData.userDetails.nick_name
        : `${starData.userDetails.first_name} ${starData.userDetails.last_name}`,
      product: title,
      amount: rate,
    });
  }
};
