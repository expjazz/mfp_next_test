import isEqual from 'lodash/isEqual'
import { requestTypesKeys } from 'src/constants/requestTypes';

const productsList = (t) => [
  {
    label: t('common.experiences.shoutouts'),
    key: [requestTypesKeys.shoutout, requestTypesKeys.event, requestTypesKeys.qa],
  }, {
    label: t('common.experiences.dm'),
    key: [requestTypesKeys.message],
  }, {
    label: t('common.experiences.socialInt'),
    key: [requestTypesKeys.socialShoutout],
  }, {
    label: t('common.experiences.fun'),
    key: [requestTypesKeys.digitalGoods],
  },{
    label: t('common.experiences.merch'),
    key: [requestTypesKeys.products],
  }, {
    label: t('common.experiences.commShout'),
    key: [requestTypesKeys.commercial, requestTypesKeys.promotion],
  }
]

export const getProdList = (offerData=[], t) => {
  if (offerData[0] && offerData[0].label === 'All products') {
    return productsList(t).map(prodItem => prodItem.label).join(', ');
  }
  const typeList = offerData.map((offerItem) =>  offerItem.related_request_type);
  const typeArray = productsList(t).filter(prodItem => {
    return typeList.find(typeItem => isEqual(typeItem, prodItem.key));
  })
  return typeArray.map(typeItem => typeItem.label).join(', ');
}
