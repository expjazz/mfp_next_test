/* eslint-disable camelcase */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'src/utils/dataStructures';
import { LinkText } from 'styles/TextStyled';
import MessageList from 'components/MessageList';
import { Wrapper } from './styled';

const Conversation = props => {
  const { t } = useTranslation();
  const { direct_message_details } = props.bookData;
  const [full, setFull] = useState(false);

  const onUpdateData = data => {
    // props.onUpdateData(data.id, data);
  };

  const seeFullConv = () => {
    setFull(true);
  };

  const onCompleteAction = (type, data) => {
    if (type === 'rating') {
      const temp = cloneDeep(props.bookData);
      temp.has_rating = true;
      onUpdateData(temp);
    } else {
      props.onFanCompleteAction(type, data);
    }
  };

  const reqDetails = useMemo(() => {
    const temp = cloneDeep(props.bookData);
    if (full) {
      return props.bookData;
    }
    const conv = temp.direct_message_details.conversations.slice(
      Math.max(temp.direct_message_details.conversations.length - 2, 0),
    );
    temp.direct_message_details.conversations = conv;
    return temp;
  }, [props.bookData.id, full, JSON.stringify(props.bookData.direct_message_details)]);

  return (
    <Wrapper>
      {direct_message_details.conversations &&
        direct_message_details.conversations.length > 2 &&
        !full && (
          <LinkText className="see-full-link" onClick={seeFullConv}>
            {t('my_videos.see_full_conversation')}
          </LinkText>
        )}
      {/* {direct_message_details.conversations &&
        direct_message_details.conversations.length > 0 && ( */}
          <MessageList
            {...props}
            fromFan
            bookingData={reqDetails}
            loaderAction={props.loaderAction}
            updateToast={props.updateToast}
            getSuccess={props.getSuccess}
            showModalSuccess={props.paySuccess}
            updateRequestData={onUpdateData}
            onCompleteAction={onCompleteAction}
          ></MessageList>
        {/* )} */}
    </Wrapper>
  );
};

Conversation.propTypes = {
  bookData: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  getSuccess: PropTypes.func,
  paySuccess: PropTypes.func,
  onFanCompleteAction: PropTypes.func.isRequired,
};
Conversation.defaultProps = {
  getSuccess: () => {},
  paySuccess: () => {},
};

export default Conversation;
