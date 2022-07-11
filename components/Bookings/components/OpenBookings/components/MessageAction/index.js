import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import Scrollbars from 'react-custom-scrollbars';
import { FlexCenter } from 'styles/CommonStyled';
import TextArea from 'components/TextArea';
import RequestHeader from 'components/RequestHeader';
import Button from 'components/SecondaryButton';
// import { isEmpty } from 'src/utils/dataStructures';
import { useMedia } from 'customHooks/domUtils';
import Conversation from 'components/Conversations';
// import { sendDirectMessage } from 'services/index';
import { numberToCommaFormatter } from 'src/utils/dataformatter';
import { getShortName } from 'src/utils/dataToStringFormatter';
import {
  MessageActWrap,
  Layout,
  Image,
  CommentInput,
  CommentsWrapper,
} from './styled';
import { LinkButton } from '../../styled';
import { sendDirectMessage } from 'src/services/myfanpark/bookingActions';
import { isEmpty } from 'src/utils/dataStructures';
import { useMediaQuery } from '@material-ui/core';

const MessageAction = props => {
  const { t } = useTranslation();
  const {
    fan_first_name: fanFirstName,
    direct_message_details: messageDetails,
    avatar_photo: avatarPhoto,
    booking_id: bookingId,
    order_details: orderDetails,
  } = props.booking;
  const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
  const [convCompleted, updateConvStatus] = useState(false);
  const [seen, updateSeen] = useState(false);
  const [conversations, updateConversation] = useState(
    messageDetails.conversations,
  );
  const [inputVal, setInputVal] = useState('');
  const [stopEditable, setStopEditable] = useState(false);
  const scrollRef = useRef(null);

  const onNextRequest = () => {
    if (!convCompleted) {
      props.skipRequest();
    } else {
      props.nextRequestHandler(bookingId, true);
    }
  };

  const submitMsg = type => async message => {
    if ((message !== '' && message.length >= 10) || type === 'seen') {
      try {
        props.loaderAction(true);
        const resp = await sendDirectMessage(type, message, bookingId);
        if (resp.booking && resp.details) {
          if (type === 'seen') {
            updateSeen(true);
          }
          updateConversation(resp.details.conversations);
          props.loaderAction(false);
          updateConvStatus(true);
          setInputVal('');
          props.updateBookingList(bookingId);
          if (type === 'edit') setStopEditable(!stopEditable);
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
        props.updateToast({
          value: true,
          message: t('open_bookings.failedCompletionError'),
          variant: 'error',
        });
      }
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current && isModalView) {
      scrollRef.current.scrollToBottom();
    } else {
      document
        .getElementById('bottom-to-first')
        .scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (scrollRef.current && isModalView) {
      scrollRef.current.scrollToTop();
    } else {
      document
        .getElementById('tab-wrapper')
        .scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendMessage = () => {
    submitMsg('response')(inputVal.trim());
  };

  const markViewed = () => {
    submitMsg('seen')('');
  };

  const onChangeComment = event => {
    setInputVal(event.target.value);
  };

  const declineRequest = () => {
    props.toggleUpdateBooking(true, bookingId, true, props.booking);
  };

  const editMessage = message => {
    submitMsg('edit')(message.trim());
  };

  useEffect(() => {
    updateConvStatus(false);
    updateConversation(messageDetails.conversations);
    setInputVal('');
    setStopEditable(false);
  }, [bookingId]);

  useEffect(() => {
    const elmnt = document.getElementById('textarea');
    if (elmnt) elmnt.scrollIntoView();
  }, []);

  return (
    <MessageActWrap>
      <RequestHeader
        key={props.booking.booking_id}
        renderHeading={() => (
          <React.Fragment>
            {t('open_bookings.message.heading', { for: fanFirstName })}{' '}
          </React.Fragment>
        )}
        fixedTitle={props.showLang(props.booking.language)}
        onClose={props.closeHandler}
      >
        {() => <React.Fragment />}
      </RequestHeader>
      <Layout response={!convCompleted}>
        <CommentsWrapper>
          <Scrollbars
            renderView={scrollProps => (
              <div
                {...scrollProps}
                id="scrollbar-content-msg"
                className="message-list-scroll"
              />
            )}
            ref={scrollRef}
          >
            {!isEmpty(conversations) && conversations.length > 0 && (
              <Conversation
                conversations={conversations}
                user={getShortName(
                  props.booking.celebrity_nick_name,
                  props.booking.celebrity_first_name,
                )}
                fanFirstName={props.booking.fan_first_name}
                fanPhoto={props.booking.fan_photo}
                avatarPhoto={avatarPhoto}
                editMessage={editMessage}
                bookingId={props.booking.booking_id}
                Image={Image}
                convCompleted={convCompleted}
                stopEditable={stopEditable}
                scrollToBottom={scrollToBottom}
                scrollToTop={scrollToTop}
              />
            )}

            {convCompleted && orderDetails && orderDetails.amount && !seen && (
              <span className="payment-notfc">
                {t('open_bookings.message.notification', {
                  amount: numberToCommaFormatter(orderDetails.amount),
                })}
              </span>
            )}
          </Scrollbars>
          <div id="bottom-to-first" />
        </CommentsWrapper>
        {messageDetails.message_status === 1 && !convCompleted ? (
          <React.Fragment>
            <CommentInput key={bookingId} id="textarea">
              <TextArea
                className="textarea"
                autoSize
                inputProps={{
                  onChange: onChangeComment,
                  value: inputVal,
                  placeholder: t('open_bookings.message.placeholder', {
                    name: props.booking.fan_first_name,
                  }),
                  maxLength: 1000,
                }}
              />
              <span className="remaining">
                {1000 - inputVal.length} {t('common.charRemaining')}
              </span>
            </CommentInput>
            <FlexCenter className="send-btn">
              <Button
                onClick={sendMessage}
                secondary={convCompleted}
                disabled={inputVal.length < 10}
                isDisabled={inputVal.length < 10}
              >
                {t('open_bookings.message.replyBtnLbl')}
              </Button>

              <LinkButton onClick={markViewed}>
                {t('open_bookings.message.noCharge')}
              </LinkButton>
              {messageDetails.message_status === 1 && (
                <LinkButton onClick={declineRequest}>
                  {t('open_bookings.declineRequest')}
                </LinkButton>
              )}
            </FlexCenter>
          </React.Fragment>
        ) : (
          <FlexCenter className="send-btn">
            <Button onClick={onNextRequest}>
              {t('open_bookings.nextReq')}
            </Button>
          </FlexCenter>
        )}
      </Layout>
    </MessageActWrap>
  );
};

MessageAction.defaultProps = {
  booking: {},
};

MessageAction.propTypes = {
  backArrowHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  nextRequestHandler: PropTypes.func.isRequired,
  skipRequest: PropTypes.func.isRequired,
  booking: PropTypes.object,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  toggleUpdateBooking: PropTypes.func.isRequired,
  updateBookingList: PropTypes.func.isRequired,
};

export default MessageAction;
