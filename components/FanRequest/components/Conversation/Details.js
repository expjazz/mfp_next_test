import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import { getTime } from 'src/utils/timeUtils';
import { Li, Image, Content, Text } from './styled';

function Details(props) {
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
          <div className="flex-content align-top">
            <Image image={star.thumbnail_url || star.image_url} />
            <Content>
              <Text>
                <span className="name">{star.name} </span>
                {!isEmpty(details.conversation) &&
                  (details.conversation.message_reply
                    ? details.conversation.message_reply
                    : details.conversation.message_request)}
              </Text>
            </Content>
          </div>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <span className="time">{getTime(activity.created_at, true)}</span>
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
