/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isEmpty } from 'src/utils/dataStructures';
import { useTranslation } from 'react-i18next';
import { sendDirectMessage } from 'src/services/';
import DetailItem from 'components/DetailItem';
import QuickComment from 'components/QuickComment';
import CommentBox from 'components/CommentBox';
import Conversation from 'components/Conversations';
import { getShortName } from 'src/utils/dataToStringFormatter';
import StarViewStyled from '../../styled';
import { Wrapper, Image } from './styled';

const Messages = props => {
  const {
    direct_message_details: messageDetails,
    avatar_photo: avatarPhoto,
    booking_id: bookingId,
  } = props.bookingData;
  const [conversations, updateConversation] = useState(
    messageDetails.conversations,
  );
  const { t } = useTranslation();
  const [inputVal, setInputVal] = useState('');
  const [stopEditable, setStopEditable] = useState(false);

  const submitMsg = type => async message => {
    if (message !== '') {
      try {
        props.loaderAction(true);
        const resp = await sendDirectMessage(type, message, bookingId);
        if (resp.booking && resp.details) {
          updateConversation(resp.details.conversations);
          props.loaderAction(false);
          if (type === 'edit') setStopEditable(!stopEditable);
          setInputVal('');
        } else {
          props.loaderAction(false);
          props.updateToast({
            value: true,
            message: resp.message,
            variant: 'error',
          });
        }
      } catch (e) {
        props.loaderAction(false);
      }
    }
  };

  const submitMessage = comment => {
    submitMsg('comment')(comment.trim());
  };

  const onChangeComment = value => {
    setInputVal(value);
  };

  const editMessage = message => {
    submitMsg('edit')(message.trim());
  };

  const scrollToBottom = () => {
    document
      .getElementById('first-to-bottom')
      .scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    document
      .getElementById('bottom-to-first')
      .scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <div id="bottom-to-first" />
      <DetailItem
        classes={{
          root: 'detail-wrapper',
          detailDesc: 'detail-description',
        }}
        heading={t('common.started')}
        description={moment(messageDetails.created_date).format('MMM D, YYYY')}
      />
      {!isEmpty(conversations) && conversations.length > 0 && (
        <Conversation
          conversations={conversations}
          user={getShortName(
            props.bookingData.celebrity_nick_name,
            props.bookingData.celebrity_first_name,
          )}
          fanFirstName={props.bookingData.fan_first_name}
          fanPhoto={props.bookingData.fan_photo}
          avatarPhoto={avatarPhoto}
          editMessage={editMessage}
          bookingId={bookingId}
          Image={Image}
          stopEditable={stopEditable}
          isStarview
          scrollToBottom={scrollToBottom}
          scrollToTop={scrollToTop}
        />
      )}
      <div id="first-to-bottom" />

      {/* {!celebCancelledStatusList.includes(props.bookingData.request_status) && (
        <React.Fragment>
          <StarViewStyled.CommentWrapper>
            <CommentBox
              classes={{ root: 'comment-box' }}
              onSubmit={submitMsg('comment')}
              onChange={onChangeComment}
            />
            <QuickComment
              bookingId={props.bookingData.booking_id}
              fanName={props.bookingData.fan_first_name}
              onSubmit={submitMessage}
              notSend
              classes={{ root: 'quick-comment' }}
            />
          </StarViewStyled.CommentWrapper>
        </React.Fragment>
      )} */}
    </Wrapper>
  );
};

Messages.propTypes = {
  bookingData: PropTypes.object.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
};

export default Messages;
