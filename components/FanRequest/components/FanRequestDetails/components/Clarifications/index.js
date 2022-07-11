import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DescriptionP } from 'styles/TextStyled';
import { clarifyStatus } from 'src/constants/requestTypes/clarifications';
import TextArea from 'components/TextArea';
import Loader from 'components/Loader';
import CommentItem from 'components/CommentItem';
import SecondaryButton from 'components/SecondaryButton';
import { requestTypesKeys } from 'src/constants/requestTypes';
import CommDetails from './components/CommDetails';
import { Wrap } from './styled';
import { clarifiy } from 'src/services/myfanpark/bookingActions';

const Clarifications = props => {
  const { t } = useTranslation();
  const {
    booking_id: bookId,
    celebrity_first_name: celebFirstName,
    message_status: messageStatus,
  } = props.bookData;

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInput, toggleInput] = useState(
    clarifyStatus[messageStatus] === 'waiting_clarify',
  );
  const [messageList, updateMessList] = useState([]);

  const messageHandle = async type => {
    const loadFunc = type === 'list' ? setLoading : props.loaderAction;
    if (type !== 'list' && !message.trim()) {
      return props.updateToast({
        value: true,
        message: t('common.enter_message'),
        variant: 'error',
      });
    }

    try {
      loadFunc(true);
      const resp = await clarifiy(bookId, message);
      if (resp.success) {
        updateMessList(resp.data.messages);
        setMessage('');
        props.fetchUserDetails(props.userDetails.id);
      }
      if (type !== 'list') {
        props.onClarify();
        toggleInput(false);
        props.updateToast({
          value: true,
          message: t('my_videos.clarification_sent'),
          variant: 'success',
        });
      }
    } catch (e) {
      if (type !== 'list')
        props.updateToast({
          value: true,
          message: t('my_videos.clarification_failed'),
          variant: 'error',
        });
    }
    loadFunc(false);
  };

  const responseChange = event => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    messageHandle('list');
  }, []);

  const renderComments = () => {
    return messageList.map(messageItem => (
      <CommentItem
        type="comment"
        isPublic
        disableAction
        user={messageItem.name}
        time={messageItem.created_date}
        visible
        commentDetails={{
          comments: messageItem.message,
          user: {
            image_url: messageItem.image
              ? messageItem.image.thumbnail_url || messageItem.image.image_url
              : '',
          },
        }}
        classes={{ root: 'comment-root', comment: 'comment-section' }}
        receive={messageItem.message_type !== 1} // star message
      />
    ));
  };

  return (
    <Wrap
      isCommercial={props.bookData.request_type === requestTypesKeys.commercial}
    >
      {props.bookData.request_type === requestTypesKeys.commercial && (
        <CommDetails bookItem={props.bookData} />
      )}
      {renderComments()}
      {messageList.length === 0 && !loading && (
        <DescriptionP>{t('my_videos.no_clarification_request')}</DescriptionP>
      )}
      {showInput && (
        <React.Fragment>
          <DescriptionP className="description">
            {t('my_videos.clarification_request', {
              celebName: celebFirstName,
            })}
          </DescriptionP>
          <TextArea
            autoSize
            inputProps={{
              onChange: responseChange,
              value: message,
              maxLength: 500,
              placeholder: t('common.reply_here'),
              className: 'textarea',
            }}
          />
          <SecondaryButton className="send-btn" onClick={messageHandle}>
            {t('common.send')}
          </SecondaryButton>
        </React.Fragment>
      )}
      {loading && <Loader />}
    </Wrap>
  );
};

Clarifications.propTypes = {
  bookData: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  onClarify: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loaderAction: state => dispatch(loaderAction(state)),
  updateToast: obj => dispatch(updateToast({ ...obj, global: false })),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default Clarifications
