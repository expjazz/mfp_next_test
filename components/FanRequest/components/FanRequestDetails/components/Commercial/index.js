import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { LinkText } from 'styles/TextStyled';
import { getTabsList, getSelectedTab, showLang } from '../../utils';
import RequestHeader from '../RequestHeader';
import Completed from '../Completed';
import Details from './components/Details';
import Clarification from '../Clarifications';
import { Layout } from './styled';
import { useRouter } from 'next/router';
import { locStorage } from 'src/utils/localStorageUtils';

function Commercial(props) {
  const router = useRouter()
  const urlParse = router.query;
  const reqDataString = locStorage.getItem('req_data');
  const reqData = reqDataString ? reqDataString : {};
  const { reqDetails, defLangId } = props;
  const { t } = useTranslation();
  const renderView = tab => {
    if (props.success) {
      return (
        <div className="success-wrap">
          <span className="success-title">{t('my_videos.request_sent')}</span>
          <span className="success-msg">
            {t('my_videos.notification_text', {
              celebrity: reqDetails.celebrity,
            })}
          </span>
          <LinkText onClick={props.paymentSuccess} className="view_req">
            {t('common.view_erq_details')}
          </LinkText>
        </div>
      );
    } else if (tab === 'request') {
      return <Completed {...props} />;
    } else if (tab === 'clarify') {
      return (
        <Clarification
          {...props}
          onClarify={props.onClarify}
          bookData={reqDetails}
          userDetails={props.userDetails}
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
          {t('my_videos.commercial_request', {
            celebrity: reqDetails.celebrity,
          })}
        </React.Fragment>
      )}
      fixedTitle={showLang(reqDetails.language, defLangId)}
      onClose={props.closeHandler}
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

Commercial.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  reqDetails: PropTypes.object.isRequired,
  defLangId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onClarify: PropTypes.func.isRequired,
  requestType: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  success: PropTypes.bool,
  paymentSuccess: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};

Commercial.defaultProps = {
  requestType: '',
  success: false,
};
export default Commercial;
