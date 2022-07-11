// import i18n from 'i18next';

const i18n = { t: value => value }

// const i18n changed = {
//   t: value => value
// }
export const highlightDetails = (props, request) => {
  if (!props.starMode && props.type === 'Message' && request.fan_unseen) {
    return ({ text: i18n.t('fan_general_list.new') });
  } else if (props.type === 'Commercial Request' && !props.starMode) {
    return ({ text: i18n.t('latestcard.needs_attention') });
  }
  return null;
}
