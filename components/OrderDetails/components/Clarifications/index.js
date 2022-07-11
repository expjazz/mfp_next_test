import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { DescriptionP } from 'styles/TextStyled';
import { clarifyStatus } from 'src/constants/requestTypes/clarifications';
// import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import TextArea from 'components/TextArea';
import Loader from 'components/Loader';
import CommentItem from 'components/CommentItem';
import SecondaryButton from 'components/SecondaryButton';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { clarifiy } from 'services/request';
import CommDetails from './components/CommDetails';
import { Wrap } from './styled';

const Clarifications = props => {
  const {
    booking_id: bookId,
    celebrity_first_name: celebFirstName,
    message_status: messageStatus,
  } = props.bookData;
  const { t } = useTranslation();
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
      }
      if (type !== 'list') {
        props.onClarify();
        toggleInput(false);
        props.updateToast({
          value: true,
          message: t('common.clarificationSent'),
          variant: 'success',
        });
      }
    } catch (e) {

      if (type !== 'list')
        props.updateToast({
          value: true,
          message:t('common.clari_fail'),
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
        receive={messageItem.message_type === 1} // star message
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
        <DescriptionP>{t('common.no_clari')}</DescriptionP>
      )}
      {showInput && (
        <React.Fragment>
          <DescriptionP className="description">
            {
              t('common.clarifiRequest', {
                user:celebFirstName
              })
            }
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
};

// const mapDispatchToProps = dispatch => ({
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: obj => dispatch(updateToast(obj)),
// });

export default Clarifications
