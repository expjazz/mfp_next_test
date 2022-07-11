import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getTime } from 'src/utils/timeUtils';
import {
  numberToCommaFormatter,
  commaToNumberFormatter,
  numberToDecimalWithFractionTwo
} from 'src/utils/dataformatter';
import {
  commercialStatus,
  openStatusList,
  completedStatusList,
} from 'src/constants/requestStatusList';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import Input from 'components/TextInput';
// import { getLocalAmount } from 'utils/currencyUtils';
import { LinkText, DescriptionP, Description } from 'styles/TextStyled';
import CommentItem from '../../../CommentItem';
import TextArea from '../../../TextArea';
import Button from '../../../SecondaryButton';
import { cancelPrefix } from './constants';
import { MediumText, MediumHeading } from '../../styled';
import CommStyled from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { capitalize } from '@material-ui/core';

export const CommercialCard = ({
  data: bookData,
  isCommercial,
  onDeny,
  isOpen,
  onApprove,
  classes,
  onCompleteBooking,
  tabSwitch,
}) => {
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const currencyData = useCurrencyData()
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  const commercialDetails = bookData.commercial_details || {};
  const [amount, updateAmount] = useState(
    numberToCommaFormatter(commercialDetails.fan_budget),
  );
  const [comment, updateComment] = useState('');
  const [requestType, updateRequestType] = useState('');
  const [showHide, setShowHide] = useState('');

  const showHideDetails = () => {
    setShowHide(!showHide);
  };

  const updateField = type => event => {
    if (type === 'comment') {
      updateComment(event.target.value);
    } else {
      const pattern = /(?=.*\d)^\$?(([1-9]\d{0,4}(,\d{3})*)|0)?(\.\d{1,2})?$/;
      const inputValue = commaToNumberFormatter(
        event.target.value.split('$')[1],
      );
      if (
        inputValue !== '0' &&
        (pattern.test(inputValue) || inputValue === '')
      ) {
        updateAmount(numberToCommaFormatter(inputValue));
      }
    }
  };

  const onAction = type => () => {
    if (type === 'approve' || type === 'accept') {
      onApprove(
        type,
        type === 'approve' ? comment : '',
        commaToNumberFormatter(
          type === 'approve' ? amount : commercialDetails.fan_budget,
        ),
      );
    } else {
      onDeny('deny');
    }
  };

  const onBookingComplete = () => {
    onCompleteBooking(bookData.booking_id);
  };

  const renderStatus = () => {
    if (requestType === 'cancelled') {
      return `${cancelPrefix(t)[bookData.cancelled_by]} - ${
        t('open_bookings.commercial.commCancelComment', { comment: bookData.comment , date: moment(bookData.cancelled_time).format('M/D/YYYY') })
      }`;
    } else if (requestType === 'open') {
      return (
        <React.Fragment>
          {
            t('open_bookings.commercial.fanPaid', {
              fanName: bookData.fan_first_name,
              amount: `${getLocalSymbol()}${numberToDecimalWithFractionTwo(
                getLocalAmount(commercialDetails.star_price),
                false,
                false,
              )}`
            })
          }
          {' '}
          <span
            className="highlight-text"
            role="presentation"
            onClick={onBookingComplete}
          >
            {t('common.completeBooking')}
          </span>
        </React.Fragment>
      );
    } else if (
      commercialDetails.star_approved &&
      !commercialDetails.fan_approved &&
      commercialDetails.star_reply === ''
    ) {
      return t('open_bookings.commercial.starAcceptPrice', {
        date: moment(
          commercialDetails.star_approved_date,
        ).format('M/D/YYYY')
      });
    } else if (
      commercialDetails.star_approved &&
      commercialDetails.star_price !== commercialDetails.fan_budget
    ) {
      return t('open_bookings.commercial.pendingReview', { fanName: bookData.fan_first_name });
    } else if (requestType === 'completed') {
      return t('open_bookings.commercial.completedDate', {
        date: moment(bookData.video_created_date).format(
          'M/D/YYYY',
        )
      });
    }
    return null;
  };

  useEffect(() => {
    if (commercialStatus.indexOf(bookData.request_status) >= 0) {
      updateRequestType('commercial');
    } else if (openStatusList.indexOf(bookData.request_status) >= 0) {
      updateRequestType('open');
    } else if (completedStatusList.indexOf(bookData.request_status) >= 0) {
      updateRequestType('completed');
    } else {
      updateRequestType('cancelled');
    }
  }, []);

  const renderComment = type => {
    const commentDetails = {};
    let userName = '';
    let time = '';
    let receive = true;
    if (type === 'fan') {
      userName = bookData.fan_first_name;
      time = bookData.created_date;
      commentDetails.user = {
        image_url:
          bookData.fan_photo &&
          (bookData.fan_photo.thumbnail_url || bookData.fan_photo.image_url),
      };
      commentDetails.comments = t('common.commercialCard.fanBudget', {
        fanRequest: commercialDetails.fan_request,
        amount: `${getLocalSymbol()}${
          numberToDecimalWithFractionTwo(getLocalAmount(commercialDetails.fan_budget), false, false)
        }`,
      });
    } else {
      userName = bookData.celebrity;
      time = commercialDetails.star_approved_date;
      receive = false;
      commentDetails.user = {
        image_url:
          bookData.avatar_photo &&
          (bookData.avatar_photo.thumbnail_url ||
            bookData.avatar_photo.image_url),
      };
      commentDetails.comments = t('common.commercialCard.starPrice', {
        starReply: commercialDetails.star_reply,
        amount: `${getLocalSymbol()}${
          numberToDecimalWithFractionTwo(getLocalAmount(commercialDetails.star_price), false, false)
        }`,
      });
    }
    return (
      <CommentItem
        type="comment"
        user={userName}
        time={time}
        commentDetails={commentDetails}
        disableAction
        classes={{ comment: 'comment-section' }}
        receive={receive}
      />
    );
  };

  return (
    <CommStyled className={classes.root} isCommercial={isCommercial}>
      <span className="header-wrapper">
        {!isOpen && (
          <React.Fragment>
            <MediumText className="header">
              { t('common.requestFrom', { request: bookData.fan_first_name}) }
            </MediumText>
            {!isCommercial && (
              <MediumHeading className="time-display">
                {getTime(bookData.created_date)}
              </MediumHeading>
            )}
          </React.Fragment>
        )}
      </span>
      {!isOpen && (
        <CommStyled.CommentWrapper>
          {renderComment('fan')}
        </CommStyled.CommentWrapper>
      )}
      {requestType === 'commercial' && !commercialDetails.star_approved && (
        <React.Fragment>
          <span className="sub-head">{t('open_bookings.for')}</span>
          <span className="text capitalize">{bookData.fan_first_name}</span>
          <span className="sub-head head-pad">
            {' '}
            {t('open_bookings.interactionRequested')}
          </span>
          <span className="text capitalize">
            {bookData.commercial_details.offering.title}
          </span>
          <LinkText onClick={showHideDetails}>
            {showHide
              ? t('open_bookings.hideCallDetailsProduct')
              : t('open_bookings.showCallDetailsProduct')}
          </LinkText>
          {showHide && (
            <DescriptionP>
              {bookData.commercial_details.offering.description}
            </DescriptionP>
          )}
          <span className="sub-head head-pad">
            {t('open_bookings.preferences', {
              purchaser: capitalize(entityData?.partnerData?.purchaser_singular_name),
            })}
          </span>
          <DescriptionP>{bookData.commercial_details.fan_request}</DescriptionP>
          {
            bookData.commercial_details?.offering?.price !== '0.00' ? (
              <>
                <span className="sub-head head-pad">{t('purchase_flow.commercial.customerBudget')}</span>
                <Description>${bookData.commercial_details.fan_budget}</Description>
                <span className="sub-head head-pad">{t('purchase_flow.commercial.proposedBudget')}</span>
                <Description>${bookData.commercial_details?.offering?.price}</Description>
              </>
            ) : (
              <>
                <span className="sub-head head-pad">{t('purchase_flow.commercial.customerBudget')}</span>
                <Description>${bookData.commercial_details.fan_budget}</Description>
              </>
            )
          }

          <div className="button-wrp">
            <Button
              id="commercial-send"
              className="action-btn"
              onClick={tabSwitch}
              secondary
            >
              {t('open_bookings.commercial.askQuestions')}
            </Button>
            <Button
              id="commercial-send"
              className="action-btn"
              onClick={onAction('accept')}
            >
              {t('open_bookings.commercial.acceptTerms')}
            </Button>
          </div>
          <span className="or-border">
            <span />
            {t('open_bookings.or')}
            <span />
          </span>
        </React.Fragment>
      )}
      {requestType !== 'cancelled' &&
        !commercialDetails.star_approved &&
        requestType === 'commercial' && (
          <CommStyled.ActionSection>
            <span className="title-text">
              {t('open_bookings.commercial.feedbackPrice')}
            </span>
            <TextArea
              inputProps={{
                id: 'commercial-comment',
                placeholder: t('open_bookings.commercial.feedbackPlaceholder'),
                value: comment,
                onChange: updateField('comment'),
              }}
            />
            <Input
              inputProps={{
                defaultProps: {
                  value: `$${amount}`,
                  onChange: updateField('amount'),
                },
                nativeProps: { pattern: '\\d*' },
                labelObj: {
                  label: t('open_bookings.commercial.commercialPrice'),
                },
              }}
            />
            {currencyData?.abbr !== 'USD' && (
              <span className="convert-price has-margin">
                {t('common.approxCurrency', {
                  name: currencyData?.abbr,
                  symbol: currencyData?.symbol,
                  amount: numberToDecimalWithFractionTwo(
                    getLocalAmount(amount),
                    false,
                    false,
                  ),
                })}
              </span>
            )}
            <CommStyled.ButtonWrapper>
              <Button
                id="commercial-send"
                className="action-btn"
                onClick={onAction('approve')}
              >
                {t('open_bookings.commercial.newTermBtnLbl')}
              </Button>
              <LinkText
                id="commercial-deny"
                className="deny-btn highlight-text"
                onClick={onAction('deny')}
                role="presentation"
              >
                {t('open_bookings.declineRequest')}
              </LinkText>
            </CommStyled.ButtonWrapper>
          </CommStyled.ActionSection>
        )}
      {commercialDetails.star_approved && (
        <CommStyled.CommentWrapper>
          {renderComment('star')}
        </CommStyled.CommentWrapper>
      )}
      <CommStyled.StatusDisplay>{renderStatus()}</CommStyled.StatusDisplay>
    </CommStyled>
  );
};

CommercialCard.defaultProps = {
  classes: {},
  data: {},
  isOpen: false,
  isCommercial: false,
  onApprove: () => {},
  onCompleteBooking: () => {},
  onDeny: () => {},
  tabSwitch: () => {},
};

CommercialCard.propTypes = {
  data: PropTypes.object,
  onApprove: PropTypes.func,
  isOpen: PropTypes.bool,
  onDeny: PropTypes.func,
  onCompleteBooking: PropTypes.func,
  classes: PropTypes.object,
  isCommercial: PropTypes.bool,
  tabSwitch: PropTypes.func,
};
