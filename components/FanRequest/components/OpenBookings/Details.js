import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation, Trans } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { getTime } from 'src/utils/timeUtils';
import {
  celebCompletedStatusList,
  celebCancelledStatusList,
} from 'src/constants/requestStatusList';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { orderStatVal, statusReq } from './constants';
import { Li, Image, Content, Text } from './styled';

function Details(props) {
  const { t } = useTranslation();
  const [isSeen, updateSeen] = useState(props.isRead);
  const { activity = {} } = props;
  const { extra_details: details = {} } = activity;
  const { star_image: star = {} } = details;

  useEffect(() => {
    let timeout = null;
    if (!isSeen) {
      timeout = setTimeout(() => {
        updateSeen(true);
      }, 10000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const getRequestText = () => {
    if (details.scheduled_date) {
      return t('common.scheduled');
    }
    return statusReq.indexOf(details.request_type) >= 0 && details.complete_status !== undefined
      ? orderStatVal[details.complete_status]
      : orderStatVal[1];
  }

  const RenderText = booking => {
    if (requestTypesKeys.qa === details.request_type) {
      return (
        <Trans
          i18nKey="stream_open.live_question_answer"
          values={{
            name: star.name,
          }}
        >
          QA requested from <span className="tal-name">{}</span>
        </Trans>
      );
    } else if (requestTypesKeys.shoutout === details.request_type) {
      return (
        <Trans
          i18nKey="stream_open.personalised_video"
          values={{
            name: star.name,
          }}
        >
          Video shoutout requested from <span className="tal-name">{}</span>
        </Trans>
      );
    } else if (requestTypesKeys.event === details.request_type) {
      return (
        <Trans
          i18nKey="stream_open.announcement"
          values={{
            name: star.name,
          }}
        >
          Announcement requested from <span className="tal-name">{}</span>
        </Trans>
      );
    } else if (requestTypesKeys.commercial === details.request_type) {
      return (
        <Trans
          i18nKey="stream_open.commercial_personalised_video"
          values={{
            name: star.name,
            title: booking.title,
          }}
        >
          {} business request sent to <span className="tal-name">{}</span>
        </Trans>
      );
    } else if (requestTypesKeys.message === details.request_type) {
      return <Trans i18nKey="stream_open.dm_message"></Trans>;
    } else if (requestTypesKeys.socialShoutout === details.request_type) {
      return (
        <Trans
          i18nKey="stream_open.social_interaction"
          values={{
            name: star.name,
          }}
        >
          Social media interaction requested from
          <span className="tal-name">{}</span>
        </Trans>
      );
    } else if (requestTypesKeys.promotion === details.request_type) {
      return (
        <Trans
          i18nKey="stream_open.commercial_social_interaction"
          values={{
            name: star.name,
          }}
        >
          Social media promotion requested from
          <span className="tal-name">{}</span>
        </Trans>
      );
    } else if (requestTypesKeys.digitalGoods === details.request_type) {
      return (
        <React.Fragment>
          {booking.title ? (
            <React.Fragment>
              {booking.delivery_method === deliveryMethods.videoCalls ? (
                <Trans
                  i18nKey="stream_open.live_call"
                  values={{
                    name: star.name,
                    duration: booking.meeting_length,
                  }}
                >
                  <span>{}</span> minute live call requested from
                  <span className="tal-name">{}</span>
                </Trans>
              ) : (
                <Trans
                  i18nKey="stream_open.fun_stuff"
                  values={{
                    name: star.name,
                    title: booking.title,
                  }}
                >
                  <span>{}</span> requested from
                  <span className="tal-name">{}</span>
                </Trans>
              )}
            </React.Fragment>
          ) : (
            t('bookings.fun_stuff_item')
          )}
        </React.Fragment>
      );
    } else if (requestTypesKeys.products === details.request_type) {
      return (
        <Trans
          i18nKey="stream_open.merch"
          values={{
            name: star.name,
            title: booking.title,
          }}
        >
          <span>{}</span> requested from
          <span className="tal-name">{}</span>
        </Trans>
      );
    }
    return '';
  };

  return (
    <React.Fragment>
      <Li
        key={activity.id}
        onClick={() => {
          props.getSelected(details);
          // if (props.onMarkAsRead && !props.isRead)
          //   props.onMarkAsRead(props.group);
        }}
        isRead={isSeen}
      >
        <span className="status">
          {celebCompletedStatusList.includes(details.request_status) &&
            t(t('completed'))}
          {celebCancelledStatusList.includes(details.request_status) &&
            t('common.cancelledCap')}
        </span>
        <div className="flex-content">
          <div className="flex-content">
            <Image image={star.thumbnail_url || star.image_url} />

            <Content>
              <Text>{RenderText(details)}</Text>
              {requestTypesKeys.message === details.request_type && (
                <Content bgColor>
                  <Text>
                    <span className="name">{star.name} </span>
                    {!isEmpty(details.conversation) &&
                      (details.conversation.message_reply
                        ? details.conversation.message_reply
                        : details.conversation.message_request)}
                  </Text>
                </Content>
              )}
              <span className="time">
                {t('stream_open.status', {
                  talent: props.entityData?.talentSingleCap,
                  req_status_text: getRequestText(),
                  req_expiry_date: moment(details.req_expiry_date).format(
                    'MMM D, YYYY',
                  ),
                })}
              </span>
              <span className="time">{getTime(activity.created_at, true)}</span>
            </Content>
          </div>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </Li>
    </React.Fragment>
  );
}

Details.propTypes = {
  activity: PropTypes.object.isRequired,
  getSelected: PropTypes.func.isRequired,
  // onMarkAsRead: PropTypes.oneOfType([PropTypes.func, null]),
  // group: PropTypes.string,
  isRead: PropTypes.bool,
};
Details.defaultProps = {
  // onMarkAsRead: null,
  // group: '',
  isRead: true,
};

export default Details;
