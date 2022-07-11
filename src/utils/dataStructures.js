import { cloneDeep as clone, isEqual as isEqualLodash } from 'lodash'
export const isEmpty = object => {
  if (!object) return true
  if (Array.isArray(object)) {
    return !object.length
  }
  if (typeof object === 'object') {
    return object ? !Object.keys(object).length : false;
  }
}

export const cloneDeep = object => clone(object)

export function times(n, iteratee) {
  const MAX_SAFE_INTEGER = 9007199254740991
  const MAX_ARRAY_LENGTH = 4294967295

  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return []
  }
  let index = -1
  const length = Math.min(n, MAX_ARRAY_LENGTH)
  const result = new Array(length)
  while (++index < length) {
    result[index] = iteratee(index)
  }
  index = MAX_ARRAY_LENGTH
  n -= MAX_ARRAY_LENGTH
  while (++index < n) {
    iteratee(index)
  }
  return result
}

export const isEqual = (first, second) => isEqualLodash(first, second)

const getReasonData = (parentObj) => {
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


export const processConfig = (config) => {

  const newConfig = { ...config };
  const tips = config.tip_amounts ? config.tip_amounts.split(',') : [];
  const requestFeedback = (config.request_feedback ? config.request_feedback.split(',') : []);
  const declineComments = config.decline_comments ? config.decline_comments.split(',') : [];
  const supportTopics  = config.topics ? config.topics.topics.map((topic) => {
    return ({
      label: topic,
      value: topic,
    })
  }) : [];
  let videoDecline = config.video_call_decline_reasons ? config.video_call_decline_reasons.video_call_decline_reasons.map((reason) => {
    return ({
      label: reason,
      value: reason,
    })
  }) : [];
  let categoryArticles  = config.category_article ? config.category_article.map((category) => {
    return ({
      label: category.category_title,
      value: category.category_id,
    })
  }): [];
  let categoryIdeas  = config.category_idea ? config.category_idea.map((category) => {
    return ({
      label: category.category_title,
      value: category.category_id,
    })
  }): [];
  categoryIdeas = [{ label: 'All', value: '' }, ...categoryIdeas];
  categoryArticles = [{ label: 'All', value: '' }, ...categoryArticles];
  const cancelReasons  = config.cancel_booking_reasons ? config.cancel_booking_reasons.cancel_booking_reasons.map((reason) => {
    return ({
      label: reason,
      value: reason,
    })
  }): [];
  const newProductDecline = config.star_decline_reasons ? getReasonData(config.star_decline_reasons) : {};
  const newProductCancel = config.fan_cancel_reasons ? getReasonData(config.fan_cancel_reasons) : {};
  const commercialCancel  = config.commercial_cancel_reasons ? config.commercial_cancel_reasons.commercial_cancel_reasons.map((reason) => {
    return ({
      label: reason,
      value: reason,
    })
  }): [];
  newConfig.tipAmounts = tips;
  newConfig.newProductDecline = newProductDecline;
  newConfig.newProductCancel = newProductCancel;
  newConfig.supportTopics = supportTopics;
  newConfig.videoDecline = videoDecline;
  newConfig.cancelReasons = cancelReasons;
  newConfig.requestFeedback = requestFeedback;
  newConfig.declineComments = declineComments;
  newConfig.commercialCancel = commercialCancel;
  newConfig.articleCategories = categoryArticles;
  newConfig.ideaCategories = categoryIdeas;

  return newConfig
}