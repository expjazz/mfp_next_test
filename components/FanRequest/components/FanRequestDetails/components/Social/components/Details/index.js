import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FlexCenter } from 'styles/CommonStyled';
import { LinkText } from 'styles/TextStyled';
import ReceiptDisplay from '../../../ReceiptDisplay';
import { generateReceipt } from './util';
import {
  Layout,
  DetailWrapper,
  DetailHead,
  DetailDesc,
  LinkItem,
} from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Details = props => {
  const { t } = useTranslation();
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { data: entityData } = useGetPartner()
  const {
    social_request_details: socialDetails = {},
    celebrity,
  } = props.reqDetails;

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
        receiptArray={generateReceipt({...props.reqDetails, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})[props.requestType]}
      />
      {!props.starMode && props.requestType === 'open' && (
        <FlexCenter className="order-action">
          <LinkText onClick={props.cancelBooking}>
            {t('common.cancel_request')}
          </LinkText>
        </FlexCenter>
      )}
    </Layout>
  );
};

Details.propTypes = {
  reqDetails: PropTypes.object.isRequired,
  cancelBooking: PropTypes.func.isRequired,
  requestType: PropTypes.string,
  starMode: PropTypes.bool,
};
Details.defaultProps = {
  starMode: false,
  requestType: '',
};

export default Details;
