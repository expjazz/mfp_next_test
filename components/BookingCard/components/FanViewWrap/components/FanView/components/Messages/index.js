/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import MessageList from '../../../../../../../MessageList';
import ActionBar from '../../../../../../../ActionBar';
import { Wrapper } from './styled';

const Messages = props => {
  const { t } = useTranslation();
  const [actionTabActive, setActionTab] = useState(false);
  const { direct_message_details } = props.bookingData;
  const tipPayment = (type, value) => {
    if (type === 'tip') {
      locStore.setItem(
        'req_data',
        JSON.stringify({
          returnUrl: window.location.pathname,
          amount: value,
          bookingId: props.bookingData.id,
          noback: true,
          userId: props.bookingData.celebrity_vanity,
          promoCode: {},
        }),
      );
      props.toggleBookingModal(false);
      props.history.push({
        pathname: `/${props.bookingData.celebrity_vanity}/tip`,
      });
    } else {
      props.onCompleteAction(type, value);
    }
    setActionTab(false);
  };

  const actionActive = value => {
    setActionTab(value);
  };

  const getActionBar = () => {
    if (direct_message_details.message_status === 2) {
      return (
        <section className="action-wrapper" key="message-list-action-bar-fan">
          <ActionBar
            initialSelection
            bookingId={props.bookingData.booking_id}
            disableRating={props.bookingData.has_rating}
            disableReaction
            rateProps={{
              onSuccessMsg: t('common.conversation_rated'),
            }}
            disableComment
            shareDisable
            disableTips={false}
            onAction={tipPayment}
            beforeShare={() => {}}
            commentDetails={{
              maxLength: 104,
              thresholdLimit: 97,
            }}
            shareDetails={{}}
            onSelectAction={() => {}}
            actionActive={actionActive}
          />
        </section>
      );
    }
    return null;
  };

  return (
    <Wrapper actionTabActive={actionTabActive}>
      {direct_message_details.conversations &&
        direct_message_details.conversations.length > 0 && (
          <MessageList
            bookingData={props.bookingData}
            fetchCelebDetails={props.fetchCelebDetails}
            loaderAction={props.loaderAction}
            updateToast={props.updateToast}
            getSuccess={props.getSuccess}
            scrollRef={props.scrollRef}
            setTabHeadHide={props.setTabHeadHide}
            getActionBar={getActionBar}
            showModalSuccess={props.showModalSuccess}
            updateRequestData={props.updateRequestData}
          ></MessageList>
        )}
    </Wrapper>
  );
};

Messages.propTypes = {
  bookingData: PropTypes.object.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  onCompleteAction: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  getSuccess: PropTypes.func,
  scrollRef: PropTypes.object,
  setTabHeadHide: PropTypes.func,
  showModalSuccess: PropTypes.func,
  updateRequestData: PropTypes.func,
  history: PropTypes.object.isRequired,
};
Messages.defaultProps = {
  getSuccess: () => {},
  scrollRef: {},
  setTabHeadHide: () => {},
  showModalSuccess: () => {},
  updateRequestData: () => {},
};

export default Messages;
