import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-light-svg-icons';
import ShareButton from 'components/ShareButton';
import { DescriptionP } from 'styles/TextStyled';
import RequestFlowPopup from '../../../RequestFlowPopup';
import { ShareContent } from './constants';
import { Layout, Wrapper } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const PaymentSuccess = ({
  showPaymentSuccess,
  changePaymentSuccess,
  starName,
  userId,
}) => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
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
            <h2 className="success-head">{t('common.completeMsg.successMsg')}</h2>
            <DescriptionP className="desc">
              {t('common.completeMsg.note')}
            </DescriptionP>
            <ShareButton
              secondary
              buttonText={t('common.sharePage')}
              classes={{
                button: `share-btn`,
              }}
              shareUrl={`${window.location.origin}/${userId}`}
              content={ShareContent(starName, `${window.location.origin}/${userId}`, t, entityData?.partnerData)}
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
