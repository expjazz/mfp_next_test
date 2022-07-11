/**
 * function that returns a formatted title for the payment-success
 * GA event
 * @param {*string} title Title of the product
 * @returns Formatted title according to the payment-success GA event
 */
export const getGaThankyouTitle = title => {
  if (title === 'dm' || title === 'chat') {
    return 'DirectMessage'
  }

  return title
}

/**
 * function that returns a formatted category for the payment-success
 * GA event
 * @param {*string} category Category of the product
 * @returns Formatted category according to the payment-success GA event
 */
 export const getGaThankyouCategory = (category, path = '') => {
  if (category === 'dm') {
    return 'DirectMessage'
  } else if (category === 'social') {
    return 'Social Promotion'
  } else if (category === 'funstuff') {
    if (path.includes('live')) {
      return 'Livecall'
    }
    return 'Funstuff'
  } else if (category === 'merch') {
    return 'Merch'
  } else if (category === 'announcement' || category === 'qa' || category === 'shoutout') {
    return 'Shoutout'
  }

  return category
}