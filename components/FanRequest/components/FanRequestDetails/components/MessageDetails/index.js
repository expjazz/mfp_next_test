import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { LinkText } from 'styles/TextStyled';
import { getTabsList, getSelectedTab, showLang } from '../../utils';
import RequestHeader from '../RequestHeader';
import Details from './components/Details';
import Conversation from './components/Conversation';
import { Layout } from './styled';
import { useRouter } from 'next/router';

function Message(props) {
  const { t } = useTranslation();
  const { reqDetails, defLangId } = props;
  const router = useRouter()
  const [msgSuccess, setSuccess] = useState(router.query.listUrl);

  const paySuccess = () => {
    setSuccess(true);
  };

  const onBack = () => {
    props.callRequestDetails(reqDetails.booking_id, true);
    setSuccess(false);
  };

  const renderView = tab => {
    if (msgSuccess) {
      return (
        <div className="success-wrap">
          <span className="success-title">{t('my_videos.chat_sent')}</span>
          <span className="success-msg">
            {t('my_videos.notification_message', {
              celebrity: reqDetails.celebrity,
            })}
          </span>
          <LinkText onClick={onBack}>{t('common.back_conversation')}</LinkText>
        </div>
      );
    } else if (props.success) {
      return (
        <div className="success-wrap">
          <span className="success-title">{t('my_videos.tip_sent')}</span>
        </div>
      );
    } else if (tab === 'conversation') {
      return (
        <Conversation
          msgSuccess={msgSuccess}
          bookData={reqDetails}
          {...props}
          paySuccess={paySuccess}
        />
      );
    }
    return <Details {...props} />;
  };

  return (
    <RequestHeader
      key={reqDetails.booking_id}
      renderHeading={() => (
        <React.Fragment>
          {t('my_videos.conversation_with', {
            celebrity: reqDetails.celebrity,
          })}
        </React.Fragment>
      )}
      onClose={props.closeHandler}
      fixedTitle={showLang(reqDetails.language, defLangId)}
      tabsList={getTabsList({ reqDetails, requestType: props.requestType })}
      selected={getSelectedTab({ reqDetails, requestType: props.requestType })}
      avatar={reqDetails.avatar_photo}
    >
      {selectedTab => (
        <Layout>
          <Scrollbars
            renderView={scrollProps => (
              <div {...scrollProps} id="completed-scroll" />
            )}
          >
            {renderView(selectedTab)}
          </Scrollbars>
        </Layout>
      )}
    </RequestHeader>
  );
}

Message.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  fetchCelebDetails: PropTypes.func.isRequired,
  paymentSuccess: PropTypes.func.isRequired,
  reqDetails: PropTypes.object.isRequired,
  defLangId: PropTypes.string.isRequired,
  requestType: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  success: PropTypes.bool,
  callRequestDetails: PropTypes.func.isRequired,
};

Message.defaultProps = {
  requestType: '',
  success: false,
};
export default Message;
