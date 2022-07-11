import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import { getTabsList, getSelectedTab, showLang } from '../../utils';
import RequestHeader from '../RequestHeader';
import Completed from '../Completed';
import Details from './components/Details';
import Clarification from '../Clarifications';
import { Layout } from './styled';

function FunStuff(props) {
  const { t } = useTranslation();
  const { reqDetails, defLangId } = props;

  const renderView = tab => {
    if (props.success) {
      return (
        <div className="success-wrap">
          <span className="success-title">{t('my_videos.tip_sent')}</span>
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
          {reqDetails.fun_stuff_request_details.delivery_method ===
          deliveryMethods.videoCalls
            ? t('my_videos.live_call_request', {
                celebrity: reqDetails.celebrity,
              })
            : t('my_videos.funstuff_item_from', {
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

FunStuff.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  reqDetails: PropTypes.object.isRequired,
  defLangId: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onClarify: PropTypes.func.isRequired,
  requestType: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  success: PropTypes.bool,
  userDetails: PropTypes.object.isRequired,
};

FunStuff.defaultProps = {
  requestType: '',
  success: false,
};
export default FunStuff;
