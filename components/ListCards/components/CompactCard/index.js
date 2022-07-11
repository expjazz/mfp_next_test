import React from 'react';
import { useTranslation } from 'next-i18next';
import moment from 'moment';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
import { getFor } from 'src/utils/dataformatter';
import { TickText } from 'styles/CommonStyled';
import { getCallTime, isCallReady, isCallCompleted } from 'src/utils/videoCall';
import SampleLabel from 'components/SampleLabel';
import { clarifyStatus } from 'src/constants/requestTypes/clarifications';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { requestTypes } from 'src/constants/requestTypes';
import { BoldTextM } from '../../styled';
import { getTime } from 'src/utils/timeUtils';
import CompactStyled from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const CompactCard = props => {
  const { t } = useTranslation();
  const { bookData } = props;
  const { data: entityData } = useGetPartner()
  const { data: user } = useFetchLoggedUser()
  const checkOther = occasion => {
    if (bookData.occasion_id !== 18 && bookData.occasion_id !== 24) {
      return (
        <BoldTextM className="title-custom">
          {t('open_bookings.bookingFor', {
            occasion: bookData.occasion,
            type: occasion,
          })}
        </BoldTextM>
      );
    }
    let occasionCaps = '';
    if (!isEmpty(occasion))
      occasionCaps = occasion.charAt(0).toUpperCase() + occasion.slice(1);
    return (
      <BoldTextM className="title-custom">
        {t('open_bookings.bookingForAlt', {
          type: occasionCaps,
        })}{' '}
      </BoldTextM>
    );
  };

  const getTitle = title => {
    return <BoldTextM className="title-custom">{title} </BoldTextM>;
  };

  const renderTitle = () => {
    switch (requestTypes[bookData.request_type]) {
      case 'Q&A':
        return getTitle(t('compact_card.question_from'));
      case 'Shout-out':
        return checkOther(t('bookings.shoutout'));
      case 'Commercial':
        return getTitle(t('compact_card.com_awaiting_response'));
      case 'Message':
        return getTitle(t('compact_card.dm_for'));
      case 'Social Shout-out':
        return getTitle(t('compact_card.social_media_interaction_for'));
      case 'Social Promotion':
        return getTitle(t('compact_card.social_media_promotion_from'));
      case 'digitalGoods': {
        const { fun_stuff_request_details: funDetails } = bookData;
        if (funDetails.delivery_method === deliveryMethods.videoCalls) {
          return getTitle(t('compact_card.live_call_for'));
        }
        return getTitle(t('compact_card.fun_req_for'));
      }
      case 'Products':
        return getTitle(t('compact_card.merch_purchase_for'));
      default:
        return checkOther(t('bookings.announcement'));
    }
  };

  const renderStatus = () => {
    const { fun_stuff_request_details: funDetails } = bookData;
    if (
      funDetails.delivery_method === deliveryMethods.videoCalls &&
      funDetails.meeting_date
    ) {
      if (
        isCallReady(funDetails.meeting_date) &&
        !isCallCompleted(
          funDetails.meeting_date,
          funDetails.fun_stuff.meeting_duration,
        )
      ) {
        return t('compact_card.start_call');
      } else if (isCallCompleted(funDetails.meeting_date, 0))
        return t('compact_card.requires_action');
      return t('compact_card.scheduled');
    } else if (
      !bookData.practice_booking &&
      clarifyStatus[bookData.message_status] === 'waiting_clarify'
    ) {
      return t('compact_card.waiting_on_clarification');
    } else if (
      !bookData.practice_booking &&
      clarifyStatus[bookData.message_status] === 'clarify_receive'
    ) {
      return t('compact_card.clarification_received');
    } else if (
      requestTypes[bookData.request_type] === 'Products' &&
      (bookData.complete_status === 'in_progress' ||
        bookData.complete_status === 'almost_finished')
    ) {
      return t('compact_card.need_to_ship');
    } else if (
      requestTypes[bookData.request_type] === 'digitalGoods' &&
      funDetails.delivery_method === deliveryMethods.videoCalls &&
      bookData.complete_status !== 'in_progress'
    ) {
      return t('compact_card.to_be_scheduled');
    } else if (
      requestTypes[bookData.request_type] === 'digitalGoods' &&
      funDetails.delivery_method === deliveryMethods.videoCalls &&
      bookData.complete_status === 'in_progress'
    ) {
      return t('common.scheduled');
    }
    return t('common.toDo');
  };

  const renderTime = time => {
    const actualTimeObject = moment();
    const currentTimeObject = moment(time).add(
      parseInt(props.expiration, 0),
      'days',
    );
    const timeDifference = currentTimeObject.diff(actualTimeObject, 'hours');
    const { fun_stuff_request_details: funDetails } = bookData;
    if (
      requestTypes[bookData.request_type] === 'digitalGoods' &&
      funDetails.delivery_method === deliveryMethods.videoCalls &&
      funDetails.meeting_date
    ) {
      if (
        isCallReady(funDetails.meeting_date) &&
        !isCallCompleted(
          funDetails.meeting_date,
          funDetails.fun_stuff.meeting_duration,
        )
      ) {
        return t('compact_card.join_call');
      } else if (
        isCallCompleted(
          funDetails.meeting_date,
          funDetails.fun_stuff.meeting_duration,
        )
      ) {
        return '';
      }
      return (
        <React.Fragment>{getCallTime(funDetails.meeting_date, entityData?.partnerData)}</React.Fragment>
      );
    }
    // Removing timeDifference > 48 per https://starsona.freshrelease.com/ws/PM/tasks/PM-2638
    // } else if (timeDifference > 48) {
    //   // does not expires in 48 hours
    //   return <span className="time">{getTime(time)}</span>;
    // }

    const dt = moment(currentTimeObject);
    const now = moment();
    const months = now.diff(dt, 'months');
    dt.add(months, 'months');
    const days = now.diff(dt, 'days');
    dt.add(days, 'days');
    const hours = now.diff(dt, 'hours');
    dt.add(hours, 'hours');
    const minutes = now.diff(dt, 'minutes') || 1;

    if (months) {
      return (
        <span className="time expiring">
          {t('common.expiring_time', {
            time: Math.abs(months),
            text: Math.abs(months) > 1 ? t('common.months') : t('common.month'),
          })}
        </span>
      );
    } else if (days) {
      return (
        <span className="time expiring">
          {t('common.expiring_time', {
            time: Math.abs(days),
            text: Math.abs(days) > 1 ? t('common.days') : t('common.day'),
          })}
        </span>
      );
    } else if (hours) {
      return (
        <span className="time expiring">
          {t('common.expiring_time', {
            time: Math.abs(hours),
            text: Math.abs(hours) > 1 ? t('common.hours') : t('common.hour'),
          })}
        </span>
      );
    }
    return (
      <span className="time expiring">
        {t('common.expiring_time', {
          time: Math.abs(minutes),
          text:
            Math.abs(minutes) > 1 ? t('common.minutes') : t('common.minute'),
        })}
      </span>
    );
  };

  let bookingDate =
    (bookData.request_details && bookData.request_details.date) ||
    bookData.active_to;
  if (bookingDate) {
    [bookingDate] = bookingDate.split('T');
  }
  return (
    <CompactStyled
      selected={props.selected}
      onClick={props.onClick}
      id={props.keyValue}
      initialSelected={props.initialSelected}
    >
      <span className="sample-label">
        <span className="duewrp">
          {renderTitle()}
          {bookingDate && (
            <span className="due">
              {t('due_by_date', {
                date: moment(bookingDate).format(
                  user?.user?.partner_data?.base_date_format || 'MM/DD/YYYY',
                ),
              })}
            </span>
          )}
        </span>
        <CompactStyled.UserName>{getFor(bookData)}</CompactStyled.UserName>
        {bookData.practice_booking && <SampleLabel />}
      </span>
      <CompactStyled.DetailsWrapper>
        <TickText className="tick-text">{renderStatus()}</TickText>
        {!bookData.practice_booking && (
          <span className="time-text">{renderTime(bookData.created_date)}</span>
        )}
      </CompactStyled.DetailsWrapper>
    </CompactStyled>
  );
};

CompactCard.defaultProps = {
  bookData: {},
};

CompactCard.propTypes = {
  bookData: PropTypes.object,
  selected: PropTypes.bool.isRequired,
  expiration: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  initialSelected: PropTypes.bool.isRequired,
  keyValue: PropTypes.string.isRequired,
};

export { CompactCard };
