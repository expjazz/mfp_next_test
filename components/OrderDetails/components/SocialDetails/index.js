import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { FlexCenter } from 'styles/CommonStyled';
import ReceiptDisplay from '../ReceiptDisplay';
import { generateReceipt } from './util';
import OrderStyled, {
  DetailWrapper,
  DetailHead,
  DetailDesc,
  LinkItem,
} from '../../styled';
import { Layout } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const SocialShoutoutDetails = props => {
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const {
    social_request_details: socialDetails = {},
    celebrity,
  } = props.bookingData;

  const socialRedirectURL = webUrl => {
    let newWebUrl = webUrl;
    const urlTest = /^((https|http):\/\/)(www.)?/;
    if (!urlTest.test(webUrl)) {
      newWebUrl = `https://${webUrl}`;
    }
    return newWebUrl;
  };

  return (
    <Layout>
      <DetailWrapper>
        <DetailHead>{t('common.order_item')}</DetailHead>
        {!props.starMode && <DetailDesc>{celebrity}</DetailDesc>}
        <DetailDesc className="capitalise">
          {socialDetails.social_media_title.social_media}
        </DetailDesc>
        <DetailDesc>{socialDetails.social_media_title.title}</DetailDesc>
        <DetailDesc>
          {t('common.punlic_link')}{' '}
          <LinkItem
            href={socialRedirectURL(socialDetails.fan_social_media_link)}
            target="_blank"
          >
            {socialDetails.fan_social_media_link}
          </LinkItem>
        </DetailDesc>
      </DetailWrapper>
      {socialDetails.description && (
        <DetailWrapper>
          <DetailHead>{t('common.requst')}</DetailHead>
          <DetailDesc>{socialDetails.description}</DetailDesc>
        </DetailWrapper>
      )}
      <ReceiptDisplay
        detailClasses={{
          title: 'detail-title',
        }}
        receiptArray={generateReceipt({...props.bookingData, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})[props.requestType]}
      />
      {!props.starMode && props.requestType === 'open' && (
        <FlexCenter className="order-action">
          <OrderStyled.TextButton onClick={props.cancelBooking}>
            {t('common.cancel_request')}
          </OrderStyled.TextButton>
        </FlexCenter>
      )}
    </Layout>
  );
};

SocialShoutoutDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  cancelBooking: PropTypes.func.isRequired,
  requestType: PropTypes.string,
  starMode: PropTypes.bool,
};
SocialShoutoutDetails.defaultProps = {
  starMode: false,
  requestType: '',
};

export default SocialShoutoutDetails;
