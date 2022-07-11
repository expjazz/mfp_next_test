import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DescriptionP } from 'styles/TextStyled';
import Loader from 'components/Loader';
import CommentItem from 'components/CommentItem';
import { clarifyStatus } from 'src/constants/requestTypes/clarifications';
// import { clarifiy } from 'src/services/request';
import TextArea from 'components/TextArea';
import { FlexCenter } from 'styles/CommonStyled';
import { requestTypesKeys } from 'src/constants/requestTypes';
import SecondaryButton from 'components/SecondaryButton';
import CommDetails from './components/CommDetails';
import { Wrap } from './styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { clarifiy } from 'src/services/myfanpark/bookingActions';

const Clarifications = props => {
  const { t } = useTranslation();
  const { booking_id: bookId, message_status: messageStatus } = props.bookData;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageList, updateMessList] = useState([]);
  const [showInput, toggleInput] = useState(
    clarifyStatus[messageStatus] === 'waiting_clarify',
  );

  const responseChange = event => {
    setMessage(event.target.value);
  };

  const onUpdateBook = () => {
    const bookingData = cloneDeep(props.bookData);
    bookingData.message_status = 1; // send clarification
    props.updateRequestData(bookingData);
  };

  const messageHandle = async type => {
    const loadFunc = type === 'list' ? setLoading : props.loaderAction;
    try {
      loadFunc(true);
      const resp = await clarifiy(bookId, message);
      if (resp.success) {
        updateMessList(resp.data.messages);
        setMessage('');
      }
      if (type !== 'list') {
        onUpdateBook();
        toggleInput(false);
        props.updateToast({
          value: true,
          message: t('common.clari_req'),
          variant: 'success',
        });
      }
    } catch (e) {
      if (type !== 'list')
        props.updateToast({
          value: true,
          message: t('common.clari_fail'),
          variant: 'error',
        });
    }
    loadFunc(false);
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
        receive={
          props.starMode
            ? messageItem.message_type === 2
            : messageItem.message_type === 1
        }
      />
    ));
  };

  return (
    <Wrap>
      {props.bookData.request_type === requestTypesKeys.commercial && (
        <CommDetails bookItem={props.bookData} />
      )}
      {renderComments()}
      {messageList.length === 0 && !loading && (
        <DescriptionP className="description">
          {t('common.no_clari')}
        </DescriptionP>
      )}
      {showInput && (
        <React.Fragment>
          <TextArea
            autoSize
            inputProps={{
              onChange: responseChange,
              value: message,
              maxLength: 500,
              placeholder: t('common.addMessage'),
              className: 'textarea',
            }}
          />
          <FlexCenter className="clari-btn">
            <SecondaryButton
              className="send-btn"
              onClick={messageHandle}
              disabled={isEmpty(message)}
              isDisabled={isEmpty(message)}
            >
              {t('common.send')}
            </SecondaryButton>
          </FlexCenter>
        </React.Fragment>
      )}
      {loading && <Loader />}
    </Wrap>
  );
};

Clarifications.propTypes = {
  bookData: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  starMode: PropTypes.bool.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateRequestData: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateToast: obj => dispatch(updateToast(obj)),
});

export default Clarifications
