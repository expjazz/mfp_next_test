/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import ActionBar from '../../../../../../../ActionBar';
// import { Description } from 'styles/TextStyled';
// import DownloadHandler from 'components/DownloadHandler';
// import { deliveryMethods } from 'src/constants/requestTypes/funTypes';
// import { completedStatusList } from 'src/constants/requestStatusList';
import ImageUpload from './components/FileUpload';
import BookingStyled from '../../../../styled';
import FanViewStyled from '../../styled';
import { Wrapper } from './styled';
import { isEmpty } from '../../../../../../../../src/utils/dataStructures';
import { Description } from '../../../../../../../../styles/TextStyled';
import DownloadHandler from '../../../../../../../DownloadHandler';
import { deliveryMethods } from '../../../../../../../../src/constants/requestTypes/funTypes';
import { completedStatusList } from '../../../../../../../../src/constants/requestStatusList';

const Commercial = props => {
  const { t } = useTranslation();
  const { commercial_details: reqDetails = {} } = props.bookingData;
  const [actionTabActive, setActionTab] = useState(false);
  const tipPayment = (type, value) => {
    if (type === 'tip') {
      locStore.setItem(
        'req_data',
        JSON.stringify({
          returnUrl: window.location.pathname,
          amount: value,
          bookingId: props.bookingData.id,
          noback: true,
          userId: props.bookingData.celebrity_vanity,
          promoCode: {},
        }),
      );
      props.toggleBookingModal(false);
      props.history.push({
        pathname: `/${props.bookingData.celebrity_vanity}/tip`,
      });
    } else {
      props.onCompleteAction(type, value);
    }
  };

  const actionActive = value => {
    setActionTab(value);
  };

  const onFunClick = (funFiles, index) => () => {
    if (!isEmpty(reqDetails)) {
      const fileName = funFiles.processed_file_name || funFiles.file_name;
      const type = fileName ? fileName.split(/[.;+_]/).pop() : '';
      const url = {
        bookingId: reqDetails.fun_stuff_request_hash,
        fileNM: funFiles.processed_file_name || funFiles.file_name,
        downloadNM: `${props.bookingData.celebrity.replace(' ', '_')}_${
          reqDetails.fun_stuff_request_id
        }_${index}.${type}`,
        type: `${funFiles.file_type}/${type}`,
      };
      props.downloadFunc(
        `${env('SERVER_URL')}fun_stuff/download/${url.bookingId}?file_name=${
          url.fileNM
        }&download_name=${url.downloadNM}&content_type=${url.type}`,
      );
    }
  };

  const shareText = () => {
    return t('common.bookingPopup.fanShareText1', {
      starName: props.bookingData.celebrity,
      title: reqDetails.fun_stuff ? reqDetails.fun_stuff.title : '',
    });
  };

  return (
    <Wrapper actionTabActive={actionTabActive}>
      <BookingStyled.Layout starMode={false}>
        <BookingStyled.LeftSection className="left-section">
          <ImageUpload
            delivMethod={reqDetails.delivery_method}
            bookingData={props.bookingData}
            onFunClick={onFunClick}
            actionTabActive={actionTabActive}
            updateToast={props.updateToast}
          />
          {reqDetails.celebrity_reply &&
            reqDetails.delivery_method !== deliveryMethods.videoCalls && (
              <Description className="note-info">
                {reqDetails.celebrity_reply}
              </Description>
            )}
        </BookingStyled.LeftSection>
        <BookingStyled.RightSection>
          <FanViewStyled.DetailWrapper isPublic={false}>
            {completedStatusList.indexOf(props.bookingData.request_status) > -1 && (
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
                    reqDetails.delivery_method === deliveryMethods.videoCalls
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

Commercial.propTypes = {
  bookingData: PropTypes.object.isRequired,
  renderCommentList: PropTypes.func.isRequired,
  onCompleteAction: PropTypes.func.isRequired,
  isBookingStar: PropTypes.bool.isRequired,
  updateToast: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default DownloadHandler(Commercial);
