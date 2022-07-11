import moment from "moment";
import { requestTypesKeys } from "../../../src/constants/requestTypes";
import { serviceKeys } from "./constants";

const requestOptions = [
  {label: 'shoutout', url: 'shoutout', value: [requestTypesKeys.shoutout, requestTypesKeys.event, requestTypesKeys.qa]},
  {label: 'chat', url: 'chat', value: [requestTypesKeys.message]},
  {label: 'social', url: 'social', value: [requestTypesKeys.socialShoutout]},
  {label: 'live', url: 'live', value: [requestTypesKeys.digitalGoods]},
  {label: 'fun', url: 'fun', value: [requestTypesKeys.digitalGoods]},
  {label: 'merch', url: 'merch', value: [requestTypesKeys.products]},
  {label: 'commercial', url: 'commercial', value: [requestTypesKeys.commercial, requestTypesKeys.promotion]},
]

const isProdValid = (key, types) => {
  return true
  // return types.find(type => entity('products')[key === 'live' ? 'live' : type]);
}


export const getActiveOptions = (activeServices={}, live=false, fun=false) => {
  return requestOptions.filter(productItem => {
    const productTypes = productItem.value;
    if (isProdValid(productItem.label, productTypes)) {
      if (productItem.label === 'live') {
        return live ? activeServices['live'] : false;
      } else if (productItem.label === 'fun') {
        return fun ? productTypes.find(type => activeServices[type]) : false;
      }
      return productTypes.find(type => activeServices[type]);
    }
  });
}

export const isProductActive = (cat, services) => {
  return services[serviceKeys[cat]];
}

export const getUserAge = (date) => {
  return moment().diff(moment(date), 'years')
}
