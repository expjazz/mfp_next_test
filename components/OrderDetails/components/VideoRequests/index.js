import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import dompurify from 'dompurify';
import moment from 'moment';
// import { withRouter } from 'react-router-dom';
import ToolTip from 'components/ToolTip';
import Checkbox from 'components/Checkbox';
import { isEmpty } from 'src/utils/dataStructures';
import { findCompletedVideo, getFor, checkFromName } from 'src/utils/dataformatter';
// import { hideVideoFromProfile, makeVideoPrivate } from 'services/request';
import { FlexBoxSB } from 'styles/CommonStyled';
import ReceiptDisplay from '../ReceiptDisplay';
import OrderStyled, {
  DetailWrapper,
  DetailHead,
  DetailDesc,
} from '../../styled';
import { getOccasion, generateReceipt } from './utils';
import { Layout, CheckboxWrapper } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { hideVideoFromProfile, makeVideoPrivate } from 'src/services/myfanpark/bookingActions';

const VideoRequests = props => {
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const { data: entityData } = useGetPartner()
  const router = useRouter()
  const { t } = useTranslation();
  const { bookingData, starMode, requestType } = props;
  const {
    occasion,
    request_details: requestDetails = {},
    celebrity,
  } = bookingData;
  const commercialDetails = bookingData.commercial_details || {};

  const setIntitialCheckBox = () => {
    if (starMode) {
      return !bookingData.video_visibility;
    }
    return !bookingData.public_request;
  };

  const [checkBox, setCheckBox] = useState(setIntitialCheckBox());

  const onCheckBoxChange = async check => {
    let hideResponse;
    const prevCheck = checkBox;
    setCheckBox(check);
    try {
      if (starMode) {
        const completedVideo = findCompletedVideo(bookingData);
        hideResponse = await hideVideoFromProfile(completedVideo.video_id);
      } else {
        hideResponse = await makeVideoPrivate(bookingData.booking_id, check);
        props.onCheckboxChange(!check);
      }
    } catch (e) {
      setCheckBox(prevCheck);
      props.updateToast({
        value: true,
        message: t('common.something_wrong'),
        variant: 'error',
      });
    }
  };

  const getRelation = () => {
    if (
      bookingData.request_details.relationship &&
      typeof bookingData.request_details.relationship === 'object'
    ) {
      return `${bookingData.request_details.relationship.title}`;
    } else if (bookingData.request_details.relationship) {
      return `${bookingData.request_details.relationship}`;
    }
  };

  const getScriptDetails = () => {
    const date = bookingData.request_details.date ? bookingData.request_details.date.split('T')[0] : null;
    return `<span class="script-details">
        <span>
          ${t('common.occasion')}
          ${!isEmpty(bookingData.occasion) ? bookingData.occasion : ''}
        </span>
        ${date ?
          `<span>
          ${t('common.date')} ${moment(date).format(
            entityData?.partnerData?.base_date_format,
          )}
          </span>` : ''}
        ${
          getFor(bookingData)
            ? `<span>${t('common.for')}  ${getFor(bookingData)}</span>`
            : ''
        }
        ${
          checkFromName(bookingData)
            ? `<span>
          ${t('common.from')} ${checkFromName(bookingData)}
            ${getRelation() && `<span> (${getRelation()})</span>`}
          </span>`
            : ''
        }
        ${
          bookingData.request_details.for_what
            ? `<span>
          ${t('common.for_what')}: ${bookingData.request_details.for_what}
          </span>`
            : ''
        }
        ${
          bookingData.request_details.event_title
            ? `<span>
          ${t('common.event')}: ${bookingData.request_details.event_title}
          </span>`
            : ''
        }
      </span>`;
  };

  const getScript = () => {
    if (requestDetails.templateType === 'other') {
      return requestDetails.booking_statement;
    }
    return getScriptDetails();
  };

  return (
    <Layout
      isCommercial={
        !starMode &&
        requestType === 'commercial-open' &&
        commercialDetails.star_approved
      }
    >
      <div className="content-data">
        <DetailWrapper>
          <DetailHead>{t('common.order_item')}</DetailHead>
          {!starMode && <DetailDesc>{celebrity}</DetailDesc>}
          <DetailDesc>
            {getOccasion(occasion)[bookingData.request_type]}
          </DetailDesc>
          {commercialDetails.star_reply && (
            <DetailDesc>{commercialDetails.star_reply}</DetailDesc>
          )}
        </DetailWrapper>
        {requestDetails ? (
          <React.Fragment>
            {getScript() && (
              <DetailWrapper>
                <DetailHead>{t('common.requst')}</DetailHead>
                <DetailDesc
                  dangerouslySetInnerHTML={{
                    __html: dompurify.sanitize(getScript()),
                  }}
                />
              </DetailWrapper>
            )}
            {requestDetails.important_info ? (
              <DetailWrapper>
                <DetailHead>{t('common.additional_info')}</DetailHead>
                <DetailDesc>
                  {requestDetails.important_info || t('common.none')}
                </DetailDesc>
              </DetailWrapper>
            ) : null}
          </React.Fragment>
        ) : null}
        {commercialDetails.fan_request && (
          <DetailWrapper>
            <DetailHead>{t('common.requst')}</DetailHead>
            <DetailDesc>{commercialDetails.fan_request}</DetailDesc>
          </DetailWrapper>
        )}
        <ReceiptDisplay
          detailClasses={{
            title: 'detail-title',
          }}
          receiptArray={generateReceipt({...bookingData, getLocalAmount, getLocalSymbol, entityData: entityData?.partnerData})(starMode)[requestType]}
        />
        {requestType !== 'cancelled' && (
          <CheckboxWrapper>
            <Checkbox checked={checkBox} onChange={onCheckBoxChange} />
            <span className="check-text ">
              {starMode ? (
                t('common.hide_from_profile')
              ) : (
                <ToolTip
                  title={t('common.tooltip_title', {
                    talent: entityData?.partnerData?.talent_singular_name,
                    siteName: entityData?.partnerData?.partner_name,
                    purchaser: entityData?.partnerData?.purchaser_plural_name,
                  })}
                >
                  <span>{t('common.make_video_private')}</span>
                </ToolTip>
              )}
            </span>
          </CheckboxWrapper>
        )}
      </div>
      {!props.starMode &&
        (requestType === 'open' || requestType === 'commercial-open') && (
          <FlexBoxSB className="order-action">
            <OrderStyled.TextButton onClick={props.cancelBooking}>
              {t('common.cancel_request')}
            </OrderStyled.TextButton>
          </FlexBoxSB>
        )}
    </Layout>
  );
};

VideoRequests.defaultProps = {
  moreOptions: [],
};

VideoRequests.propTypes = {
  moreOptions: PropTypes.array,
  loaderAction: PropTypes.func.isRequired,
  cancelBooking: PropTypes.func.isRequired,
  starMode: PropTypes.bool.isRequired,
};

export default VideoRequests
