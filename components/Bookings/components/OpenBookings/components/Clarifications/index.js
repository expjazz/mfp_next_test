import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
import TextArea from 'components/TextArea';
import Loader from 'components/Loader';
import CommentItem from 'components/CommentItem';
import SecondaryButton from 'components/SecondaryButton';
// import { useMedia } from 'customHooks/domUtils';
// import { clarifiy } from 'services/request';
// import { updateBookingsList } from '../../../../actions/getBookingsList';
import { Wrap } from './styled';
import { cloneDeep } from 'src/utils/dataStructures';
import { useMediaQuery } from '@material-ui/core';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
import { clarifiy } from 'src/services/myfanpark/bookingActions';

const Clarifications = props => {
  const { t } = useTranslation();
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, {...payload, global: true})
  const { booking_id: bookId } = props.bookItem;
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageList, updateMessList] = useState([]);
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const onUpdateBook = () => {
    const bookingData = cloneDeep(props.bookItem);
    bookingData.message_status = 2; // awaiting clarification
    props.updateBookingList(bookId, bookingData);
  };

  const messageHandle = async type => {
    const loadFunc = type === 'list' ? setLoading : loaderAction;
    if (type !== 'list' && !message.trim()) {
      return localUpdateToast({
        value: true,
        message: t('open_bookings.clarification.noMsgError'),
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
        onUpdateBook();
        localUpdateToast({
          value: true,
          message: t('open_bookings.clarification.success'),
          variant: 'success',
        });
      }
    } catch (e) {
      if (type !== 'list')
        localUpdateToast({
          value: true,
          message: t('open_bookings.clarification.reqError'),
          variant: 'error',
        });
    }
    loadFunc(false);
  };

  const responseChange = event => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    if (messageList.length) {
      if (!isDesktop) {
        const objDiv = document.getElementById('request-display');
        if (objDiv) {
          objDiv.scrollTop = objDiv.scrollHeight;
        }
      }
    }
  }, [messageList.length]);

  useEffect(() => {
    messageHandle('list');
  }, [bookId]);

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
        receive={messageItem.message_type === 2} // fan message
      />
    ));
  };

  return (
    <Wrap key={bookId} className={props.rootclass}>
      <span className="title">
        {t('open_bookings.clarification.title', {
          to: props.bookItem.fan_first_name,
        })}
      </span>
      {renderComments()}
      <TextArea
        autoSize
        inputProps={{
          onChange: responseChange,
          value: message,
          maxLength: 500,
          placeholder: t('open_bookings.clarification.placeholder'),
          className: 'textarea',
        }}
      />
      <SecondaryButton className="send-btn" onClick={messageHandle}>
        {t('open_bookings.clarification.btnLbl')}
      </SecondaryButton>
      {loading && <Loader />}
    </Wrap>
  );
};

Clarifications.propTypes = {
  bookItem: PropTypes.object.isRequired,
  updateToast: PropTypes.func.isRequired,
  updateBookingsList: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
};

// const mapDispatchToProps = dispatch => ({
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: obj => dispatch(updateToast({ ...obj, global: false })),
//   updateBookingsList: (id, data) => dispatch(updateBookingsList(id, data)),
// });

export default Clarifications
