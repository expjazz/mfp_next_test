/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { getFor } from 'src/utils/dataformatter';
import { requestTypes } from 'src/constants/requestTypes';
import { HeadingBold } from './styled';

const BookingTitle = ({ requestData, secondary }) => {
  const { t } = useTranslation();
  const checkOther = occasion => {
    if (requestData.occasion_id !== 18 && requestData.occasion_id !== 24) {
      return (
        <HeadingBold secondary={secondary}>
          {
            t('common.booking_title.shoutoutTitle1', {
              occasion: requestData.occasion,
              type: occasion,
              for: getFor(requestData),
            })
          }
        </HeadingBold>
      );
    }
    let occasionCaps = '';
    if (!isEmpty(occasion))
      occasionCaps = occasion.charAt(0).toUpperCase() + occasion.slice(1);
    return (
      <HeadingBold secondary={secondary}>
        {
          t('common.booking_title.shoutoutTitle2', {
            occasion: occasionCaps,
            for: getFor(requestData),
          })
        }
      </HeadingBold>
    );
  };

  if (requestTypes[requestData.request_type] === 'Q&A') {
    return (
      <HeadingBold secondary={secondary}>
        {t('common.booking_title.answer_qa',{requestData:requestData.fan_first_name})}
      </HeadingBold>
    );
  } else if (requestTypes[requestData.request_type] === 'Commercial') {
    return (
      <HeadingBold secondary={secondary}>
        {t('common.booking_title.commercial_request',{requestData:requestData.fan_first_name})}
      </HeadingBold>
    );
  } else if (requestTypes[requestData.request_type] === 'Shout-out') {
    return checkOther(t('common.shoutout'));
  } else if (requestTypes[requestData.request_type] === 'Social Shout-out') {
    return (
      <HeadingBold secondary={secondary}>
        {t('common.booking_title.social_shoutout',{requestData:requestData.fan_first_name})}
      </HeadingBold>
    );
  } else if (requestTypes[requestData.request_type] === 'Social Promotion') {
    return (
      <HeadingBold secondary={secondary}>
        {t('common.booking_title.social_promotion',{requestData:requestData.fan_first_name})}
      </HeadingBold>
    );
  } else if (requestTypes[requestData.request_type] === 'digitalGoods') {
    return (
      <HeadingBold secondary={secondary}>
         {t('common.booking_title.fun_stuff',{requestData:requestData.fan_first_name})}
      </HeadingBold>
    );
  } else if (requestTypes[requestData.request_type] === 'Products') {
    return (
      <HeadingBold secondary={secondary}>
        {t('common.booking_title.merch_purchase',{requestData:requestData.fan_first_name})}
      </HeadingBold>
    );
  } else if (requestTypes[requestData.request_type] === 'Message') {
    return (
      <HeadingBold secondary={secondary}>
        {t('common.booking_title.direct_message',{requestData:requestData.fan_first_name})}
      </HeadingBold>
    );
  }

  return checkOther(t('common.announcement'));
};

BookingTitle.defaultProps = {
  requestData: {},
  secondary: false,
};

BookingTitle.propTypes = {
  requestData: PropTypes.object,
  secondary: PropTypes.bool,
};

export default BookingTitle;
