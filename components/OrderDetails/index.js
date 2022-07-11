import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { withRouter } from 'react-router-dom';
// import { isEmpty } from 'src/utils/dataStructures';
import { Scrollbars } from 'react-custom-scrollbars';
import { getShortName } from 'src/utils/dataToStringFormatter';
// import { updateToast, loaderAction } from 'store/shared/actions/commonActions';
// import {
//   paymentFetchSuccess,
//   createCharge,
// } from 'store/shared/actions/processPayments';
import { requestTypesKeys } from 'src/constants/requestTypes';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import TabWrap from 'components/TabWrap';
import { purchaseUrl } from 'src/constants/url';
import RequestFlowPopup from '../RequestFlowPopup';
import ModalHeader from '../ModalHeader';
import {
  openStatusList,
  completedStatusList,
  commercialStatus,
} from 'src/constants/requestStatusList';
// import { useMedia, openHelp } from '../../utils/domUtils';
import BookingTitle from '../BookingTitle';
// import {
//   toggleUpdateBooking,
//   toggleContactSupport,
// } from '../../store/shared/actions/toggleModals';
import { getTabsList, getSelectedTab } from './utils';
import { requestTypes } from 'src/constants/requestTypes';
import OrderStyled, { ModalContent } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { openHelp, useMedia } from 'customHooks/domUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { generalLoader, updateToast, useGeneral } from 'src/context/general';
// import { openStatusList } from 'src/constants/requestStatusList';

const Clarifications = dynamic(() => import('./components/Clarifications'))

const VideoRequests = dynamic(() => import('./components/VideoRequests'))
const MessageDetails = dynamic(() => import('./components/MessageDetails'))
const SocialShoutoutDetails = dynamic(() => import('./components/SocialDetails'))
const FunStuffDetails = dynamic(() => import('./components/FunStuff'))
const ProductDetails = dynamic(() => import('./components/Products'))
const Commercial = dynamic(() => import('./components/Commercial'))

const OrderDetails = props => {
  const dispatch = useGeneral[1]
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, {...payload, global: true})
  const { data: entityData } = useGetPartner()
  const router = useRouter()
  const { t } = useTranslation();
  const { bookingData, starMode } = props;
  const starName = getShortName(
    bookingData.celebrity_nick_name,
    bookingData.celebrity_first_name,
  );
  const isMobile = useMedia('(max-width: 831px)');

  const [requestType, updateRequestType] = useState('');
  const commercialDetails = bookingData.commercial_details || {};

  const renderHeading = () => {
    const requestDetails = bookingData.request_details;
    if (bookingData.request_type === requestTypesKeys.message) {
      return t('common.orderDet.dmTitle', { fan: bookingData.fan_first_name});
    } else if (requestTypes[bookingData.request_type] === 'Q&A') {
      return t('common.orderDet.questionTitle', { fan: bookingData.fan_first_name});
    } else if (requestTypes[bookingData.request_type] === 'Commercial') {
      return t('common.orderDet.commercialTitle', { fan: bookingData.fan_first_name});
    } else if (requestTypes[bookingData.request_type] === 'Social Shout-out') {
      return t('common.orderDet.socialIntTitle', { fan: bookingData.fan_first_name});
    } else if (requestTypes[bookingData.request_type] === 'Social Promotion') {
      return t('common.orderDet.SocialPromTitle', { fan: bookingData.fan_first_name});
    } else if (requestTypes[bookingData.request_type] === 'digitalGoods') {
      return t('common.orderDet.funTitle', { fan: bookingData.fan_first_name});
    } else if (requestTypes[bookingData.request_type] === 'Products') {
      return t('common.orderDet.merchTitle', { fan: bookingData.fan_first_name});
    }
    const hasFrom = requestDetails &&
    requestDetails.is_myself !== undefined &&
    !requestDetails.is_myself;
    return (
      <React.Fragment>
        {
          t(hasFrom ? 'common.bookingPopup.titleGenerator1_from' : 'common.bookingPopup.titleGenerator1', {
            occasion: bookingData.occasion,
            type: requestTypes[bookingData.request_type] === 'Shout-out'
            ? t('common.shoutout')
            : t('common.announcement'),
            for: requestDetails &&
            requestDetails.is_myself !== undefined &&
            !requestDetails.is_myself
              ? requestDetails.stargramto
              : bookingData.fan_first_name,
            from: hasFrom ? requestDetails.stargramto : ''
          })
        }
      </React.Fragment>
    );
  };

  useEffect(() => {
    if (commercialStatus.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('commercial-open');
    } else if (openStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('open');
    } else if (completedStatusList.indexOf(bookingData.request_status) >= 0) {
      updateRequestType('completed');
    } else {
      updateRequestType('cancelled');
    }
  }, []);

  const checkBookingProgress = () => {
    const isItemBooking =
      requestTypes[bookingData.request_type] === 'digitalGoods' ||
      requestTypes[bookingData.request_type] === 'Products';
    const isActive = bookingData.complete_status !== 'not_started';
    return !starMode && isItemBooking && isActive;
  };

  const cancelBooking = () => {
    props.toggleUpdateBooking(
      true,
      bookingData.booking_id,
      starMode,
      bookingData,
      requestId => {
        props.closeModal();
        props.onBookingCancel(requestId);
      },
      checkBookingProgress()
        ? {
            hideDropdown: true,
            heading: t('common.orderDet.cancelMessage', { talent: entityData?.partnerData?.talent_singular_name }),
            headingStyles: { fontSize: '16px' },
            primBtnText: t('common.account_settings.contactsupport'),
            secBtnText: t('common.close'),
            primBtnProps: { secondary: true },
            secBtnProps: { secondary: false },
            primBtnClick: () => {
              props.toggleUpdateBooking(false);
              openHelp();
            },
            secBtnClick: () => props.toggleUpdateBooking(false),
          }
        : {},
    );
  };

  const goToPurchase = () => {
    props.closeModal();
    props.toggleUpdateBooking(
      true,
      bookingData.booking_id,
      starMode,
      bookingData,
      () => {
        props.onBookingCancel();
        props.toggleUpdateBooking(false);
        router.push(
          `/${bookingData.celebrity_vanity}${
            purchaseUrl[requestTypesKeys.commercial]
          }`,
        );
      },
    );
  };

  const modalProps = props.isModal
    ? {
        disableClose: true,
        noPadding: true,
        closePopUp: props.closeModal,
      }
    : {};
  const WrapperComponent = props.isModal ? RequestFlowPopup : React.Fragment;
  const ScrollComponent = props.isModal ? Scrollbars : React.Fragment;
  const getHeaderHead = () => {
    if (bookingData.request_details || bookingData.social_request_details) {
      return <BookingTitle secondary requestData={bookingData} />;
    } else if (!isEmpty(bookingData.commercial_details)) {
      return t('common.orderDet.commercialRequest', { fan: bookingData.fan_first_name });
    }
    return t('common.orderDet.videoShout');
  };

  const getHeaderFan = () => {
    if (!starMode && props.isModal) {
      return (
        <ModalHeader
          arrowVisible={isMobile}
          backArrowHandler={props.closeModal}
          starImage={
            bookingData.avatar_photo &&
            (bookingData.avatar_photo.thumbnail_url ||
              bookingData.avatar_photo.image_url)
          }
          closeHandler={props.closeModal}
          customHeading={getHeaderHead()}
        />
      );
    }
    return null;
  };

  const renderBackHeader = () => {
    return (
      props.isModal &&
      starMode && (
        <BackHeader
          rootClass="order-modal-header"
          backHandler={props.closeModal}
          closeHandler={props.closeModal}
          label={props.backLabel}
        />
      )
    );
  };

  const getHeaderStar = () => {
    if (!props.disableHeader && starMode) {
      return (
        <React.Fragment>
          <OrderStyled.HeaderText
            starMode
            social={
              bookingData.request_type === requestTypesKeys.socialShoutout ||
              bookingData.request_type === requestTypesKeys.promotion
            }
          >
            {renderHeading()}
          </OrderStyled.HeaderText>
        </React.Fragment>
      );
    }
    return null;
  };

  const getScrollProps = className => {
    if (props.isModal)
      return {
        renderView: scrollProps => (
          <div {...scrollProps} className={className} />
        ),
      };
    return {};
  };

  const getComponent = selectedTab => {
    if (selectedTab === 'clarify') {
      return (
        <Clarifications onClarify={props.onClarify} bookData={bookingData} />
      );
    }
    if (bookingData.request_type === requestTypesKeys.message) {
      return (
        <MessageDetails
          bookingData={bookingData}
          starMode={starMode}
          from={props.from}
          loaderAction={loaderAction}
          updateToast={localUpdateToast}
        />
      );
    } else if (
      bookingData.request_type === requestTypesKeys.socialShoutout ||
      bookingData.request_type === requestTypesKeys.promotion
    ) {
      return (
        <SocialShoutoutDetails
          bookingData={bookingData}
          starMode={starMode}
          cancelBooking={cancelBooking}
          requestType={requestType}
          loaderAction={loaderAction}
          updateToast={localUpdateToast}
        />
      );
    } else if (
      bookingData.request_type === requestTypesKeys.digitalGoods &&
      !isEmpty(bookingData.fun_stuff_request_details)
    ) {
      return (
        <FunStuffDetails
          bookingData={bookingData}
          starMode={starMode}
          requestType={requestType}
          cancelBooking={cancelBooking}
          loaderAction={loaderAction}
          updateToast={localUpdateToast}
        />
      );
    } else if (
      bookingData.request_type === requestTypesKeys.products &&
      !isEmpty(bookingData.product_request_details)
    ) {
      return (
        <ProductDetails
          bookingData={bookingData}
          starMode={starMode}
          cancelBooking={cancelBooking}
          requestType={requestType}
          loaderAction={loaderAction}
          updateToast={localUpdateToast}
        />
      );
    } else if (
      bookingData.request_type === requestTypesKeys.commercial &&
      !isEmpty(bookingData.commercial_details)
    ) {
      return (
        <Commercial
          bookingData={bookingData}
          starMode={starMode}
          cancelBooking={cancelBooking}
          requestType={requestType}
          onPaymentSuccess={props.onPaymentSuccess}
          paymentFetchSuccess={props.paymentFetchSuccess}
          createCharge={props.createCharge}
          closeModal={props.closeModal}
          goToPurchase={goToPurchase}
          starName={starName}
          loaderAction={loaderAction}
          updateToast={localUpdateToast}
        />
      );
    }

    return (
      <VideoRequests
        {...props}
        bookingData={bookingData}
        requestType={requestType}
        starMode={starMode}
        starName={starName}
        updateToast={props.updateToast}
        cancelBooking={cancelBooking}
        goToPurchase={goToPurchase}
        closeModal={props.closeModal}
        loaderAction={props.loaderAction}
        onCheckboxChange={props.onCheckboxChange}
        onPaymentSuccess={props.onPaymentSuccess}
        paymentFetchSuccess={props.paymentFetchSuccess}
        createCharge={props.createCharge}
        updateToast={localUpdateToast}
      />
    );
  };

  return (
    <WrapperComponent {...modalProps}>
      <ModalContent isModal={props.isModal} starMode={starMode}>
        {bookingData.request_type !== requestTypesKeys.message &&
          renderBackHeader()}
        {getHeaderStar()}
        {bookingData.request_type !== requestTypesKeys.message &&
          getHeaderFan()}
        <OrderStyled
          starMode={props.starMode}
          isModal={props.isModal}
          isCommercial={
            bookingData.request_type === requestTypesKeys.commercial &&
            !commercialDetails.fan_approved
          }
        >
          <ScrollComponent {...getScrollProps('scroll-shout-details')}>
            {props.isModal ? (
              <TabWrap
                tabsList={getTabsList(bookingData, requestType, t)}
                selected={getSelectedTab(bookingData, t)}
              >
                {selectedTab => (
                  <React.Fragment>
                    <ErrorHandler>{getComponent(selectedTab)}</ErrorHandler>
                  </React.Fragment>
                )}
              </TabWrap>
            ) : (
              <ErrorHandler>{getComponent()}</ErrorHandler>
            )}
          </ScrollComponent>
        </OrderStyled>
      </ModalContent>
    </WrapperComponent>
  );
};


OrderDetails.propTypes = {
  bookingData: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  onPrimaryClick: PropTypes.func,
  disableHeader: PropTypes.bool,
  backLabel: PropTypes.string,
  toggleUpdateBooking: PropTypes.func.isRequired,
  toggleContactSupport: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  starMode: PropTypes.bool,
  history: PropTypes.bool.isRequired,
  disableFooter: PropTypes.bool,
  onCheckboxChange: PropTypes.func,
  isModal: PropTypes.bool,
  onBookingCancel: PropTypes.func,
  onPaymentSuccess: PropTypes.func,
  paymentFetchSuccess: PropTypes.func.isRequired,
  createCharge: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  from: PropTypes.string,
};

// const mapDispatchToProps = dispatch => ({
//   toggleUpdateBooking: (
//     state,
//     requestId,
//     mode,
//     requestData,
//     onSuccess,
//     renderProps,
//   ) =>
//     dispatch(
//       toggleUpdateBooking(
//         state,
//         requestId,
//         mode,
//         requestData,
//         onSuccess,
//         renderProps,
//       ),
//     ),
//   toggleContactSupport: state => dispatch(toggleContactSupport(state)),
//   updateToast: errorObject => dispatch(updateToast(errorObject)),
//   paymentFetchSuccess: data => {
//     dispatch(paymentFetchSuccess(data));
//   },
//   loaderAction: state => dispatch(loaderAction(state)),
//   createCharge: (starsonaId, amount, tokenId, promoCode, callBack) => {
//     dispatch(createCharge(starsonaId, amount, tokenId, promoCode, callBack));
//   },
// });

export default OrderDetails