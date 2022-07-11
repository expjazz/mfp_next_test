import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { Image, FlexCenter } from 'styles/CommonStyled';
import ReceiptDisplay from '../ReceiptDisplay';
import { generateReceipt } from './util';
import { Layout } from './styled';
import OrderStyled, {
  DetailWrapper,
  DetailHead,
  DetailDesc,
} from '../../styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const FunStuffDetails = props => {
  const { t } = useTranslation();
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { data: entityData } = useGetPartner()
  const { product_request_details: reqDetails, celebrity } = props.bookingData;
  return (
    <Layout>
      <DetailWrapper className="image-wrapper">
        <span>
          <DetailHead>{t('common.ordered_item')}:</DetailHead>
          {!props.starMode && <DetailDesc>{celebrity}</DetailDesc>}
          <DetailDesc className="capitalise">
            {reqDetails.product.title}
          </DetailDesc>
          <DetailDesc>{reqDetails.product.description}</DetailDesc>
        </span>
        <FlexCenter
          className={`image-wrap ${props.starMode ? 'star-hide-mob' : ''}`}
        >
          <Image
            className="image"
            image={
              reqDetails.product.product_image &&
              reqDetails.product.product_image.length > 0
                ? reqDetails.product.product_image[0]
                : null
            }
          />
        </FlexCenter>
      </DetailWrapper>
      {reqDetails.description && (
        <DetailWrapper>
          <DetailHead>{t('common.request')}:</DetailHead>
          <DetailDesc>{reqDetails.description}</DetailDesc>
        </DetailWrapper>
      )}
      <ReceiptDisplay
        detailClasses={{
          title: 'detail-title',
        }}
        receiptArray={({...props.bookingData, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})[props.requestType]}
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

FunStuffDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  requestType: PropTypes.string,
  cancelBooking: PropTypes.func.isRequired,
  starMode: PropTypes.bool,
};
FunStuffDetails.defaultProps = {
  starMode: false,
  requestType: '',
};

export default FunStuffDetails;
