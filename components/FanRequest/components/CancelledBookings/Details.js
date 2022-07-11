import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { getTime } from 'src/utils/timeUtils';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { Li, Image, Content, Text } from './styled';

function Details(props) {
  const { t } = useTranslation();
  const [isSeen, updateSeen] = useState(props.isRead);
  const { activity = {} } = props;
  const { extra_details: details = {} } = activity;
  const { star_image: star = {} } = details;

  const getType = () => {
    if (
      [
        requestTypesKeys.shoutout,
        requestTypesKeys.event,
        requestTypesKeys.qa,
      ].includes(details.request_type)
    ) {
      return t('my_videos.fan_cancelled.shout_cancel');
    } else if (details.request_type === requestTypesKeys.socialShoutout) {
      return t('my_videos.fan_cancelled.interact_cancel');
    } else if (details.request_type === requestTypesKeys.promotion) {
      return t('my_videos.fan_cancelled.promotion_cancel');
    } else if (details.request_type === requestTypesKeys.message) {
      return t('my_videos.fan_cancelled.dm_cancel');
    }
    return details.title;
  };

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
        <div className="flex-content">
          <div className="flex-content">
            <Image image={star.thumbnail_url || star.image_url} />
            <Content>
              <Text>
                {details.cancelled_by === 2 || details.cancelled_by === 3 ? (
                  <Trans
                    i18nKey="unabletocomplete"
                    values={{
                      name: star.name,
                      type: getType(),
                    }}
                  >
                    <span className="tal-name">{}</span> cancelled the
                    <span>{}</span> for the following reason:
                  </Trans>
                ) : (
                  <Trans
                    i18nKey="my_videos.fan_cancelled.cancel_message"
                    values={{
                      name: star.name,
                      type: getType(),
                    }}
                  >
                    You cancelled the <span>{}</span> from
                    <span className="tal-name">{}</span>
                    for the following reason:
                  </Trans>
                )}{' '}
                {!isEmpty(details.cancellation_reason) &&
                  details.cancelled_by === 2 &&
                  (details.cancellation_reason.includes('Talent cancellation:')
                    ? details.cancellation_reason.split(
                        'Talent cancellation:',
                      )[1]
                    : details.cancellation_reason)}
                {(details.cancelled_by === 1 || details.cancelled_by === 3) &&
                  `${details.cancellation_reason}`}
              </Text>
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
  // group: PropTypes.object,
  isRead: PropTypes.bool,
};

Details.defaultProps = {
  // onMarkAsRead: null,
  // group: {},
  isRead: true,
};
export default Details;
