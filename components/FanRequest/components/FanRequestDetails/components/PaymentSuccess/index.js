import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import ShareButton from 'components/ShareButton';
import { DescriptionP } from 'styles/TextStyled';
import RequestFlowPopup from 'components/RequestFlowPopup';
import { ShareContent } from './constants';
import { Layout, Wrapper } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const PaymentSuccess = ({
  showPaymentSuccess,
  changePaymentSuccess,
  starName,
  userId,
}) => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  if (showPaymentSuccess) {
    return (
      <RequestFlowPopup
        noPadding
        disableClose
        closePopUp={changePaymentSuccess}
      >
        <Layout>
          <Wrapper className="success-wrp">
            <FontAwesomeIcon
              onClick={changePaymentSuccess}
              icon={faTimes}
              className="close-icon"
            />
            <h2 className="success-head">{t('my_videos.order_complete')}</h2>
            <DescriptionP className="desc">
              {t('my_videos.payment_success')}
            </DescriptionP>
            <ShareButton
              secondary
              buttonText={t('common.sharePage')}
              classes={{
                button: `share-btn`,
              }}
              shareUrl={`${window.location.origin}/${userId}`}
              content={ShareContent(starName, `${window.location.origin}/${userId}`, entityData?.partnerData)}
            />
          </Wrapper>
        </Layout>
      </RequestFlowPopup>
    );
  }
  return null;
};

PaymentSuccess.propTypes = {
  showPaymentSuccess: PropTypes.bool.isRequired,
  changePaymentSuccess: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  starName: PropTypes.string.isRequired,
};

export default PaymentSuccess;
