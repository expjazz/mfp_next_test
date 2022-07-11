import React from 'react';
import { useTranslation } from 'react-i18next';
import { numberToDollarFormatter } from 'src/utils/dataformatter';
import { requestTypesKeys } from 'src/constants/requestTypes';
import CommentItem from 'components/CommentItem';
import { Bold } from './styled';

const CommDetails = ({ bookItem, ...props }) => {
  const { t } = useTranslation();

  const renderComment = type => {
    const commentDetails = {};
    const commercialDetails = bookItem.commercial_details || {};
    let userName = '';
    let time = '';
    let receive = true;
    if (type === 'fan') {
      userName = bookItem.fan_first_name;
      time = bookItem.created_date;
      commentDetails.user = {
        image_url: bookItem.fan_photo && (bookItem.fan_photo.thumbnail_url || bookItem.fan_photo.image_url )
      };
      commentDetails.comments = t('common.commercialCard.fanBudget', {
        fanRequest: commercialDetails.fan_request,
        budget: numberToDollarFormatter(commercialDetails.fan_budget),
      });
    } else {
      userName = bookItem.celebrity_first_name;
      time = commercialDetails.star_approved_date;
      receive = false;
      commentDetails.user = {
        image_url: bookItem.avatar_photo && (bookItem.avatar_photo.thumbnail_url || bookItem.avatar_photo.image_url ),
      };
      commentDetails.comments = t('common.commercialCard.starPrice', {
        starPrice: commercialDetails.star_reply,
        amount: numberToDollarFormatter(commercialDetails.star_price),
      });
    }
    return (
      <CommentItem
        type='comment'
        user={userName}
        time={time}
        commentDetails={commentDetails}
        disableAction
        classes={{ root: 'comment-root', comment: 'comment-section' }}
        receive={receive}
      />
    )
  }

  return (
    <React.Fragment>
      {bookItem.request_type === requestTypesKeys.commercial &&
      bookItem.commercial_details && bookItem.commercial_details.star_approved && (
        <React.Fragment>
          { renderComment('common.fan') }
          { renderComment('common.star') }
          <Bold>
            {t('common.commercialCard.termsDescription', {amount: numberToDollarFormatter(bookItem.commercial_details.star_price)})}
          </Bold>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default CommDetails;
