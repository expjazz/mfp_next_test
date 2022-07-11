/* eslint-disable camelcase */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { isEmpty } from 'src/utils/dataStructures';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
import { useTranslation } from 'next-i18next';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import {
	getDiscount,
	getDiscountedPrice,
	hasDiscount,
} from 'src/utils/paymentUtils';
import ActionBar from 'components/ActionBar';
import { HeadingH2, LinkText } from 'styles/TextStyled';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { getCelebDetails } from 'services/userManagement/fanDetails';
// import { updateCharge } from 'store/shared/actions/processPayments';
// import { sendDirectMessage } from 'services/index';
// import {
//   generateProductId,
//   useAddToLiveCart,
//   useOptileParser,
// } from 'customHooks/domUtils';
import Conversation from 'components/Conversations';
// import { gaEvent } from './utils';
import Message from './components/Message';
import { Layout, Wrapper, DetailWrapper, DetailWrap } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { sendDirectMessage, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import { locStorage } from 'src/utils/localStorageUtils';
import { isBrowser, isVodacom } from 'customHooks/domUtils';
import { useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const Checkout = dynamic(() => import('components/Checkout'), { ssr: false });
const totalCharCount = 500;

const MessageList = props => {
	const currencyData = useCurrencyData();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: userData } = useFetchLoggedUser();
	const { t } = useTranslation();
	const router = useRouter();
	const reqDataString = isBrowser() ? locStorage.getItem('req_data') : null;
	const reqData = reqDataString ? reqDataString : {};
	const [showDet, toggDet] = useState(false);
	const [paymentDetails, setPaymentDetails] = useState(null);
	const [lang, setLang] = useState(reqData.language || {});
	const [promoCode, setPromoCode] = useState(
		reqData.promoCode && reqData.promoCode.code ? reqData.promoCode.code : {},
	);
	const [message, setMessage] = useState(reqData.message || '');
	const [charCount, setCharCount] = useState(totalCharCount);
	// const [starDetails, setStarDetails] = useState({
	//   userDetails: {},
	//   celebDetails: {},
	//   rate: '',
	// });
	let { data: celebrityData } = useGetCelebrityData(props.fromFan && props.bookingData ? props.bookingData?.celebrity_id : '');
	const rate =
  celebrityData?.celebrity_details.rate_limit &&
  celebrityData?.celebrity_details.rate_limit.length > 0 &&
  celebrityData?.celebrity_details.rate_limit.find(
  	limit => limit.type === requestTypesKeys.message,
  );
	const starDetails = {
		userDetails: celebrityData?.user,
		celebDetails: celebrityData?.celebrity_details,
		rate: rate?.rate || ''
	};

	console.log(starDetails, 'starDetails', rate);

	const {
		direct_message_details: { conversations },
	} = props.bookingData;

	const { direct_message_details: messageDetails } = props.bookingData;

	const scrollToBottom = () => {
		document.getElementById('to-bottom').scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToTop = () => {
		document.getElementById('to-top').scrollIntoView({ behavior: 'smooth' });
	};

	const hasDis = hasDiscount(
		'Direct Messages',
		starDetails?.celebDetails?.discount,
	);
	// const hasDis = false

	const discount = useMemo(() => {
		const amount = hasDis
			? getDiscountedPrice(
				'Direct Messages',
				starDetails.celebDetails.discount,
				starDetails.rate,
			)
			: getDiscount(requestTypesKeys.message, promoCode, starDetails.rate);
		return amount || amount === 0 ? amount : starDetails.rate;
	}, [starDetails, starDetails.rate, promoCode]);

	const messageChange = event => {
		setMessage(event.target.value);
		setCharCount(totalCharCount - event.target.value.length);
	};

	// useEffect(() => {
	//   getCelebDetails(props.bookingData.celebrity_id).then(resp => {
	//     if (resp.user) {
	//       const rate =
	//         resp.celebDetails &&
	//         resp.celebDetails.rate_limit &&
	//         resp.celebDetails.rate_limit.length > 0 &&
	//         resp.celebDetails.rate_limit.find(
	//           limit => limit.type === requestTypesKeys.message,
	//         );
	//       setStarDetails({
	//         userDetails: resp.user,
	//         celebDetails: resp.celebDetails,
	//         rate: rate ? rate.rate : '',
	//       });
	//       if (resp.celebDetails) {
	//         setPromoCode(resp.celebDetails.promocode);
	//       }
	//     }
	//   });
	// }, []);

	const onMessageSubmit = () => {
		props.loaderAction(true);
		sendDirectMessage(
			'request',
			message,
			props.bookingData.celebrity_id,
			lang.id,
		).then(resp => {
			if (resp && resp.booking) {
				props.loaderAction(false);
				console.log({
					rate: discount,
					promoCode,
					bookingId: resp.booking,
					hasDis,
					type: 'booking',
				}, '');
				locStorage.setItem(
					'req_data',
					{
						message,
						bookingId: resp.booking,
						language: lang,
						userId: props.bookingData.celebrity_vanity,
						promoCode: {},
					},
				);
				setPaymentDetails({
					rate: discount,
					promoCode,
					bookingId: resp.booking,
					hasDis,
					type: 'booking',
				});
			} else {
				props.loaderAction(false);
				props.updateToast({
					value: true,
					message: resp.message,
					variant: 'error',
				});
			}
		});
	};

	const dispatch = useGeneral()[1];

	const zeroPayment = bookingID => {
		zeroPayBooking(
			{
				amount: discount,
				reference: bookingID,
				promoCode: promoCode.code,
				originalPrice: starDetails.rate,
				currency: currencyData?.abbr,
				localAmount: numberToDecimalWithFractionTwo(
					getLocalAmount(discount),
					false,
					false,
				)
			},
			dispatch,
			userData?.user.authentication_token
		).then(bool => {
			if (bool) {
				router.push(`/${router.query?.celebrityId || props.reqDetails?.celebrity_vanity}/thankyou?zero_pay=true`);
			}
		});
	};

	const onCompleteAction = (type, data) => {
		if (type === 'tip') {
			setPaymentDetails({
				rate: data,
				bookingId: props.bookingData.id,
				userId: props.bookingData.celebrity_vanity,
				type: 'tip',
			});
		} else {
			props.onCompleteAction(type, data);
		}
	};
	return (
		<Layout className="message-layout">
			<Wrapper hasPay={!isEmpty(paymentDetails)}>
				<div className="conv-wrap">
					<div id="to-top" />
					{!isEmpty(conversations) && conversations.length > 0 && (
						<Conversation
							conversations={conversations}
							user={props.bookingData.celebrity}
							fanFirstName={props.bookingData.fan_first_name}
							fanPhoto={props.bookingData.fan_photo}
							avatarPhoto={props.bookingData.avatar_photo}
							scrollToBottom={scrollToBottom}
							scrollToTop={scrollToTop}
							celebrity={props.bookingData.celebrity}
						/>
					)}
					<div id="to-bottom" />
				</div>
				{!paymentDetails ? (
					<div className="actionbar">
						{props.getActionBar && props.getActionBar()}
						{(messageDetails.message_status === 2 ||
              messageDetails.message_status === 3) && (
							<Message
								submitClick={onMessageSubmit}
								starName={props.bookingData.celebrity}
								haveDirectMessage
								message={message}
								messageChange={messageChange}
								promoCode={promoCode}
								lang={lang}
								setPromoCode={setPromoCode}
								setLang={setLang}
								charCount={charCount}
								celebId={props.bookingData.celebrity_id}
								starPrice={discount}
								loaderAction={props.loaderAction}
								starDetails={starDetails}
								updateToast={props.updateToast}
								bookingData={props.bookingData}
							/>
						)}
						<ActionBar
							initialSelection
							bookingId={props.bookingData.booking_id}
							disableRating={props.bookingData.has_rating}
							disableReaction
							rateProps={{
								onSuccessMsg: t('common.conversation_rated'),
							}}
							disableComment
							shareDisable
							disableTips={false}
							onAction={onCompleteAction}
							beforeShare={() => {}}
							commentDetails={{
								maxLength: 104,
								thresholdLimit: 97,
							}}
							shareDetails={{}}
							onSelectAction={() => {}}
							actionActive={() => {}}
						/>
					</div>
				) : (
					<div className="message-container checkout-wrapper">
						<FontAwesomeIcon
							icon={faArrowLeft}
							className="back-icon"
							onClick={() => setPaymentDetails(null)}
						/>
						<HeadingH2 className="payment-heading">
							{t('common.payment_details_Cap')}
						</HeadingH2>
						<DetailWrapper>
							{paymentDetails.type === 'tip' ? (
								<li className="detail bold">
									<span className="detail-head name">
										{t('common.tip_payment')}
									</span>
									<span className="detail-value">
										{getLocalSymbol()}
										{numberToDecimalWithFractionTwo(
											getLocalAmount(paymentDetails.rate),
											false,
											false,
										)}
									</span>
								</li>
							) : (
								<React.Fragment>
									<li className="detail">
										<span className="detail-head name">
											{t('common.dmWith', {
												starName: props.bookingData.celebrity,
											})}
										</span>
										<span className="detail-value">
											{getLocalSymbol()}
											{numberToDecimalWithFractionTwo(
												getLocalAmount(starDetails.rate),
												false,
												false,
											)}
										</span>
										<DetailWrap show={showDet}>
											<span className="detail-item">
												{t('common.message')}: {message}
											</span>
										</DetailWrap>
										<LinkText
											className="details-cta"
											onClick={() => toggDet(!showDet)}
										>
											{showDet
												? t('common.hideDetails')
												: t('common.showDetails')}
										</LinkText>
									</li>
									{starDetails.rate != discount && (
										<li className="detail">
											<span className="detail-head">
												{t(
													hasDis
														? 'common.discount'
														: 'common.promo_code_discount',
												)}
											</span>
											<span className="detail-value">
                        -{getLocalSymbol()}
												{numberToDecimalWithFractionTwo(
													getLocalAmount(starDetails.rate - discount),
													false,
													false,
												)}
											</span>
										</li>
									)}
									<li className="detail bold">
										<span className="detail-head">{t('common.total')}</span>
										<span className="detail-value">
											{getLocalSymbol()}
											{numberToDecimalWithFractionTwo(
												getLocalAmount(discount),
												false,
												false,
											)}
										</span>
									</li>
								</React.Fragment>
							)}
						</DetailWrapper>
						<Checkout
							promoDetails={
								paymentDetails.hasDis ? {} : paymentDetails.promoCode
							}
							starData={{
								userData: starDetails.userDetails,
								celbData: {
									...starDetails.celebDetails,
									bookingPrice:
                    paymentDetails.type === 'tip'
                    	? getLocalAmount(paymentDetails.rate)
                    	: paymentDetails.rate,
								},
							}}
							onOptileFail={() => setPaymentDetails(null)}
							realReturnUrl={`${window.location.origin}/fan-manage/my-videos/conversation?request_id=${paymentDetails.bookingId}${isVodacom() ? '&vodacom=true' : ''}`}
							bookingId={paymentDetails.bookingId}
							zeroPayment={zeroPayment}
							type={paymentDetails.type}
						/>
					</div>
				)}
			</Wrapper>
		</Layout>
	);
};



MessageList.defaultProps = {
	fromFan: false
};

// export default withRouter(
//   connect(
//     state => ({
//       currencyData: state.entity.currencyData,
//     }),
//     dispatch => ({
//       createCharge: (payload, callBack) => {
//         dispatch(updateCharge(payload, callBack));
//       },
//     }),
//   )(MessageList),
// );

// const MessageList = () => {
//   return <h1>Message List</h1>
// }
export default MessageList;