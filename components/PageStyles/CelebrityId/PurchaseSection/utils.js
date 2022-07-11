// import { requestTypesKeys } from 'src/constants/requestTypes';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { isEmpty } from 'src/utils/dataStructures';

export const getAvtar = avatar => {
  if (avatar) {
    return avatar.thumbnail_url || avatar.image_url;
  }
  return '';
};

const entity = value => value
export const reqTypes = {
  shoutout: {
    key: 'shoutout',
    trackKey: 'Shoutout',
    types: [requestTypesKeys.shoutout],
  },
  chat: {
    key: 'chat',
    trackKey: 'DirectMessage',
    types: [requestTypesKeys.message],
  },
  social: {
    key: 'social',
    trackKey: 'Social',
    types: [requestTypesKeys.socialShoutout],
  },
  live: {
    key: 'live',
    trackKey: 'LiveCall',
    types: ['live'],
  },
  fun: {
    key: 'fun',
    trackKey: 'FunStuff',
    types: [requestTypesKeys.digitalGoods],
  },
  merch: {
    key: 'merch',
    trackKey: 'Merch',
    types: [requestTypesKeys.products],
  },
  commercial: {
    key: 'commercial',
    trackKey: 'Commercial',
    types: [requestTypesKeys.commercial, requestTypesKeys.promotion],
  },
  suggest: {
    key: 'suggest',
  },
  tip: {
    key: 'tip',
  },
};

export const getReqType = reqType => {
  const req = reqTypes[reqType];
  if (req && req.types) {
    return req.types.find(reqItem => entity('products')[reqItem])
      ? reqType
      : null;
  } else if (req && req.key === 'suggest') {
    return entity('allowSuggest') ? reqType : null;
  } else if (req && req.key === 'tip') {
    return reqType;
  }
  return null;
};

// export const updateGA = (starData, request) => {
//   if (window.dataLayer) {
//     const couponData = window.dataLayer.find(
//       ({ event }) => event === 'Promo Code Set',
//     );
//     const promotionalCode =
//       request && request.promoCode ? request.promoCode : 'Unknown';
//     const orderNumber =
//       request && request.booking ? request.booking : 'Unknown';
//     setPurchaseEcGa(
//       { userDetails: starData.userData, celebDetails: starData.celbData },
//       orderNumber,
//       promotionalCode,
//       request.amount,
//       request.category,
//     );
//   }
// };

const requestOptions = [
  {
    label: 'shoutout',
    value: ['personalised_video', 'announcement', 'question_answer'],
    types: [requestTypesKeys.shoutout],
  },
  {
    label: 'chat',
    value: ['direct_message'],
    types: [requestTypesKeys.message],
  },
  {
    label: 'social',
    value: ['social_shout_out'],
    types: [requestTypesKeys.socialShoutout],
  },
  { label: 'live', value: ['live'], types: ['live'] },
  {
    label: 'fun',
    value: ['fun_stuff'],
    types: [requestTypesKeys.digitalGoods],
  },
  { label: 'merch', value: ['products'], types: [requestTypesKeys.products] },
  {
    label: 'commercial',
    value: ['commercial', 'social_promotions'],
    types: [requestTypesKeys.commercial, requestTypesKeys.promotion],
  },
];

const isProdValid = types => {
  return types.find(type => entity('products')[type]);
};

export const getActiveOptions = (activeServices = {}, live = false) => {
  if (!isEmpty(activeServices)) {
    return requestOptions
      .filter(productItem => {
        const productTypes = productItem.value;
        const typesList = productItem.types;
        if (isProdValid(typesList)) {
          if (live && productItem.label === 'live')
            return requestOptions.find(type => type.label === 'live').value;
          return productTypes.find(type => activeServices[type]);
        }
        return false;
      })
      .map(prod => prod.label);
  }
  return [];
};

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
      talent: starData.userData.nick_name
        ? starData.userData.nick_name
        : `${starData.userData.first_name} ${starData.userData.last_name}`,
      product: title,
      amount: rate,
    });
  }
};
