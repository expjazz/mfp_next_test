/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import ActionBar from '../../../../../../../ActionBar';
import DetailItem from '../../../../../../../DetailItem';
import BookingStyled from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper } from './styled';
import { locStorage } from 'src/utils/localStorageUtils';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Products = props => {
  const { t } = useTranslation();
  const { product_request_details: reqDetails } = props.bookingData;
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const tipPayment = (type, value) => {
    if (type === 'tip') {
      locStorage.setItem(
        'req_data',
        {
          returnUrl: window.location.pathname,
          amount: value,
          bookingId: props.bookingData.id,
          noback: true,
          userId: props.bookingData.celebrity_vanity,
          promoCode: {},
        },
      );
      props.toggleBookingModal(false);
      router.push({
        pathname: `/${props.bookingData.celebrity_vanity}/tip`,
      });
    } else {
      props.onCompleteAction(type, value);
    }
  };

  const shareText = () => {
    return t('common.bookingPopup.fanShareText2', {
      starName: props.bookingData.celebrity,
      purchaser: entityData?.partnerData.talent_plural_name,
      title: reqDetails.product ? reqDetails.product.title : '',
    });
  };

  return (
    <Wrapper>
      <BookingStyled.Layout starMode={false}>
        <BookingStyled.RightSection className="right-section">
          <FanViewStyled.DetailWrapper isPublic={false}>
            <DetailItem
              classes={{
                root: 'detail-header',
                detailHead: 'detail-head',
                detailDesc: 'detail-desc',
              }}
              heading={t('common.status')}
              description="Shipped"
            />
            <DetailItem
              classes={{
                root: 'detail-header',
                detailHead: 'detail-head',
                detailDesc: 'detail-desc',
              }}
              heading={t('common.tracking_number')}
              description={reqDetails.tracking_number}
            />
            <section className="action-root">
              <ActionBar
                initialSelection
                bookingId={props.bookingData.booking_id}
                disableRating={
                  props.isBookingStar || props.bookingData.has_rating
                }
                disableReaction={
                  props.isBookingStar || props.bookingData.has_reaction
                }
                disableComment={
                  props.bookingData.has_comment && !props.isBookingStar
                }
                disableTips={props.isBookingStar}
                rateProps={{
                  onSuccessMsg: 'Request rated',
                }}
                shareDisable={false}
                onAction={tipPayment}
                beforeShare={() => {}}
                commentDetails={{
                  maxLength: 104,
                  thresholdLimit: 97,
                }}
                shareDetails={{
                  smsTitle: shareText(),
                  download: false,
                  title: shareText(),
                  body: shareText(),
                  shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${props.bookingData.celebrity_vanity}`,
                }}
                onSelectAction={() => {}}
              />
            </section>
          </FanViewStyled.DetailWrapper>
          {props.renderCommentList()}
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </Wrapper>
  );
};

Products.propTypes = {
  bookingData: PropTypes.object.isRequired,
  renderCommentList: PropTypes.func.isRequired,
  onCompleteAction: PropTypes.func.isRequired,
  isBookingStar: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default Products;
