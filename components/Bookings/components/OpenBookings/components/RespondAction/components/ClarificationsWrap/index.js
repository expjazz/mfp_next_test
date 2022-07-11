import React from 'react';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { useTranslation } from 'next-i18next';
import { numberToDollarFormatter } from 'src/utils/dataformatter';
import CommentItem from 'components/CommentItem';
import Clarifications from '../../../Clarifications';
import { Wrap, Bold } from './styled';

const ClarificationsWrap = ({ bookItem, ...props }) => {
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
      commentDetails.comments = `${commercialDetails.fan_request}/nBudget: ${numberToDollarFormatter(commercialDetails.fan_budget)}
      `;
    } else {
      userName = bookItem.celebrity_first_name;
      time = commercialDetails.star_approved_date;
      receive = false;
      commentDetails.user = {
        image_url: bookItem.avatar_photo && (bookItem.avatar_photo.thumbnail_url || bookItem.avatar_photo.image_url ),
      };
      commentDetails.comments = `${commercialDetails.star_reply}/nPrice: ${numberToDollarFormatter(commercialDetails.star_price)}`;
    }
    return (
      <CommentItem
         {...props}
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
    <Wrap key={bookItem.booking_id}>
      {bookItem.request_type === requestTypesKeys.commercial &&
      bookItem.commercial_details && bookItem.commercial_details.star_approved && (
        <React.Fragment>
          { renderComment('fan') }
          { renderComment('star') }
          <Bold>{t('common.commercialCard.termsDescription',{amount:numberToDollarFormatter(bookItem.commercial_details.star_price)})}</Bold>
        </React.Fragment>
      )}
      <Clarifications
        {...props}
        bookItem={bookItem}
      />
    </Wrap>
  )
}

export default ClarificationsWrap;
