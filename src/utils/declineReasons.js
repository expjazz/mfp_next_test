export const getReasonData = (parentObj) => {
  const obKeys = {
    'direct_messages': 5,
    'social_media_promotion': 6,
    'fun_stuff': 8,
    'products': 9,
    'social_media_commercial': 7,
  };
  const newReasons = {};
  Object.keys(parentObj).forEach(parentKey => {
    newReasons[`${obKeys[parentKey]}`] = parentObj[parentKey].map((reason) => {
      return ({
        label: reason,
        value: reason,
      })
    })
  })
  return newReasons;
}
