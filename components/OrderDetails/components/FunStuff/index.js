import React from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { FlexCenter } from 'styles/CommonStyled';
import { getRedirectURL } from 'customHooks/domUtils';
import ReceiptDisplay from '../ReceiptDisplay';
import { generateReceipt } from './util';
import { Layout, Link, Image, CustomDetailWrap } from './styled';
import OrderStyled, {
  DetailWrapper,
  DetailHead,
  DetailDesc,
} from '../../styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useGetLocalAmount } from 'customHooks/currencyUtils';

const FunStuffDetails = props => {
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  const {
    fun_stuff_request_details: { fun_stuff: funDetails },
    fun_stuff_request_details: funStuff,
    celebrity,
  } = props.bookingData;

  return (
    <Layout>
      <DetailWrapper>
        <DetailHead>{t('common.ordered_item')}:</DetailHead>
        {!props.starMode && <DetailDesc>{celebrity}</DetailDesc>}
        <DetailDesc className="capitalise">{funDetails.title}</DetailDesc>
        <DetailDesc>{funDetails.description}</DetailDesc>
        <DetailDesc>{funDetails.required_info}</DetailDesc>
      </DetailWrapper>
      {funStuff.description && (
        <CustomDetailWrap reduceMargin={funStuff.fan_url || funStuff.fan_image}>
          <DetailHead>{t('common.request')}:</DetailHead>
          <DetailDesc>
            {funDetails.description ? funStuff.description : ''}
          </DetailDesc>
        </CustomDetailWrap>
      )}
      {funStuff.fan_url && (
        <CustomDetailWrap reduceMargin={funStuff.fan_image} sameLine>
          <DetailHead>{t('common.link')}:</DetailHead>
          <DetailDesc>
            <Link href={getRedirectURL(funStuff.fan_url)} target="_blank">
              {funStuff.fan_url}
            </Link>
          </DetailDesc>
        </CustomDetailWrap>
      )}
      {funStuff.fan_image && (
        <CustomDetailWrap>
          <DetailHead>{t('common.photo_uploaded')}:</DetailHead>
          <DetailDesc>
            <Image src={funStuff.fan_image} alt={`${entityData?.partnerData?.purchaser_singular_name} image`} />
          </DetailDesc>
        </CustomDetailWrap>
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
