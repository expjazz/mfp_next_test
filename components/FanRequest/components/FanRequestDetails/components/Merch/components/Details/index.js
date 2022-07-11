import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Image, FlexCenter } from 'styles/CommonStyled';
import { LinkText } from 'styles/TextStyled';
import ImagePreview from 'components/ImagePreview';
import ReceiptDisplay from '../../../ReceiptDisplay';
import { generateReceipt } from './util';
import { Layout, DetailWrapper, DetailHead, DetailDesc } from './styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Details = props => {
  const { data: entityData } = useGetPartner()
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { t } = useTranslation();
  const { product_request_details: reqDetails, celebrity } = props.reqDetails;
  const [preview, setPreview] = useState(null);

  const previewImage = src => () => {
    setPreview(src);
  };

  const modalClose = () => {
    setPreview(null);
  };

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
        {reqDetails.product.product_image &&
          reqDetails.product.product_image.length > 0 && (
            <FlexCenter
              className={`image-wrap ${props.starMode ? 'star-hide-mob' : ''}`}
            >
              <Image
                className="image"
                image={reqDetails.product.product_image[0]}
                onClick={previewImage(reqDetails.product.product_image[0])}
              />
            </FlexCenter>
          )}
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
        receiptArray={generateReceipt({...props.reqDetails, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})[props.requestType]}
      />
      {!props.starMode && props.requestType === 'open' && (
        <FlexCenter className="order-action">
          <LinkText onClick={props.cancelBooking}>{t('common.cancel_request')}</LinkText>
        </FlexCenter>
      )}
      {preview && (
        <ImagePreview
          src={preview}
          open={preview !== null}
          onClose={modalClose}
        />
      )}
    </Layout>
  );
};

Details.propTypes = {
  reqDetails: PropTypes.object.isRequired,
  requestType: PropTypes.string,
  cancelBooking: PropTypes.func.isRequired,
  starMode: PropTypes.bool,
};
Details.defaultProps = {
  starMode: false,
  requestType: '',
};

export default Details;
