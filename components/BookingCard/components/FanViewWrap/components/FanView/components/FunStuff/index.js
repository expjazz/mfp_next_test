/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import ActionBar from '../../../../../../../ActionBar';
// import { Description } from 'styles/TextStyled';
// import DownloadHandler from 'components/DownloadHandler';
// import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
import TypeChooser from './components/TypeChooser';
import BookingStyled from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper } from './styled';
import ActionBar from '../../../../../../../ActionBar';
import { Description } from '../../../../../../../../styles/TextStyled';
import DownloadHandler from '../../../../../../../DownloadHandler';
import { deliveryMethods } from '../../../../../../../../src/constants/requestTypes/funTypes';
import { locStorage } from 'src/utils/localStorageUtils';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const FunStuff = props => {
  const { t } = useTranslation();
  const { fun_stuff_request_details: funStuffDetails = {} } = props.bookingData;
  const router = useRouter()
  const [actionTabActive, setActionTab] = useState(false);
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

  const actionActive = value => {
    setActionTab(value);
  };

  const onFunClick = downloadUrl => () => {
    if (downloadUrl) {
      props.downloadFunc(downloadUrl);
    }
  };

  const shareText = () => {
    return t('common.bookingPopup.fanShareText2', {
      starName: props.bookingData.celebrity,
      purchaser: entityData?.partnerData.talent_plural_name,
      title: funStuffDetails?.fun_stuff ? funStuffDetails.fun_stuff.title : '',
    });
  };

  return (
    <Wrapper actionTabActive={actionTabActive}>
      <BookingStyled.Layout starMode={false}>
        <BookingStyled.LeftSection className="left-section">
          <TypeChooser
            delivMethod={funStuffDetails.delivery_method}
            bookingData={props.bookingData}
            onFunClick={onFunClick}
            actionTabActive={actionTabActive}
            updateToast={props.updateToast}
          />
          {funStuffDetails.celebrity_reply &&
            funStuffDetails.delivery_method !== deliveryMethods.videoCalls && (
              <Description className="note-info">
                {funStuffDetails.celebrity_reply}
              </Description>
            )}
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection>
          <FanViewStyled.DetailWrapper isPublic={false}>
            {props.bookingData.complete_status === 'completed' && (
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
                    onSuccessMsg: t('common.request_rated'),
                  }}
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
                  actionActive={actionActive}
                  shareDisable={
                    funStuffDetails.delivery_method ===
                    deliveryMethods.videoCalls
                  }
                />
              </section>
            )}
          </FanViewStyled.DetailWrapper>
          {props.renderCommentList()}
        </BookingStyled.RightSection>
      </BookingStyled.Layout>
    </Wrapper>
  );
};

FunStuff.propTypes = {
  bookingData: PropTypes.object.isRequired,
  renderCommentList: PropTypes.func.isRequired,
  onCompleteAction: PropTypes.func.isRequired,
  isBookingStar: PropTypes.bool.isRequired,
  updateToast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default DownloadHandler(FunStuff);
