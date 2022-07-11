/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
// import { useTranslation, Trans } from 'next-';
// import { bookingInitiate } from 'services/request';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { DescriptionP, LinkText } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import CommentItem from 'components/CommentItem';
import LangSelector from 'components/LangSelector';
import PromoDisplay from 'components/PromoDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import {
	getDiscount,
	getDiscountedPrice,
	hasDiscount,
} from 'src/utils/paymentUtils';
// import { sendDirectMessage } from 'services/index';
// import { callSmartLook } from 'services/analytics/smartLook';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
// import { setCheckoutProgressEcGa } from 'utils/ga';
// import {
//   generateProductId,
//   useAddToLiveCart,
//   useMedia,
//   useOptileParser,
// } from 'src/utils/domUtils';
import smoothScroll from 'src/utils/smoothScroll';
import { getShortName } from 'src/utils/dataToStringFormatter';
// import LoginHandler from '../../../LoginHandler';
// import { gaEvent } from '../../../../utils';
// import Payment from './Payment';
// import { StarContext } from '../../../../StarContext';
// import { HeadingH2, CharCount } from '../../../styled';
import { Container, Center } from './styled';
// import { SubTitle, PromoWrap, CharityText, RateBold } from '../../../../styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useTranslation, Trans } from 'next-i18next';
import { HeadingH2, CharCount } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { SubTitle, PromoWrap, CharityText, RateBold } from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { useRouter } from 'next/router';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { useMediaQuery } from '@material-ui/core';
import { useGetLocalAmount, useCurrencyData } from 'customHooks/currencyUtils';
import LoginHandler from 'components/LoginHandler';
import { sendDirectMessage, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import MessagePayment from './Payment';
import { useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';
// const entity = value => value
function Message(props) {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { t } = useTranslation();
	const reqDataString = null;
	const reqData = {};
	const router = useRouter();
	const [message, setMessage] = useState(reqData?.message || '');
	const { data: userData } = useFetchLoggedUser();
	const [lang, setLang] = useState(reqData?.lang || {});
	const textRef = useRef(null);
	const [formError, setFormError] = useState(false);
	const [bookingId, updateBookingId] = useState('');
	const [step, setStep] = useState(1);
	const isBookable = useGetCelebrityData()?.data?.isBookable && isCelebLocStorage();
	const {
		showContent,
		promoCode,
		updatePromoCode,
		updateLocalStore,
		toggContent,
		scrollToElem,
	} = useContext(StarContext);
	const isMobile = useMediaQuery('(max-width: 831px)');

	const rate =
    props.starData &&
    props.starData.celbData &&
    props.starData.celbData.rate_limit &&
    props.starData.celbData.rate_limit.length > 0 &&
    props.starData.celbData.rate_limit.find(
    	limit => limit.type === requestTypesKeys.message,
    );

	const hasDis = hasDiscount(
		'Direct Messages',
		props.starData.celbData.discount,
	);

	const discount = useMemo(() => {
		const amount = hasDis
			? getDiscountedPrice(
				'Direct Messages',
				props.starData.celbData.discount,
				rate.rate,
			)
			: getDiscount(requestTypesKeys.message, promoCode, rate.rate);
		return amount || amount === 0 ? amount : rate.rate;
	}, [rate, promoCode]);

	const backHandler = () => {
		if (step === 2) {
			setStep(1);
		} else {
			router.back();
		}
	};

	const messageChange = event => {
		addToCart();
		setMessage(event.target.value);
	};

	const languageChange = language => {
		setLang(language);
	};

	const paymentSuccess = (optileData, zeroPay = false) => {
		if (
			(zeroPay && optileData.reference) ||
      (optileData.reference && reqData.bookingId === optileData.reference)
		) {
			props.createCharge(
				{
					starsona: bookingId || optileData.reference,
					amount: optileData.amount,
					promocode: optileData.promoCode || reqData.promoCode.code,
					type: 'booking',
					currency: props.currencyData.abbr,
					optile_data: { paymentGateway: 'Optile', ...optileData },
				},
				() => {
					const eventData = {
						optileData,
						reqData: {
							promoCode: optileData.promoCode || reqData.promoCode.code,
						},
						currencyData: props.currencyData,
						starData: props.starData,
						title: props.title,
						rate: rate ? rate.rate : '',
						realAmount: rate ? parseInt(rate.rate, 10) : 0,
					};
					gaEvent({
						event: 'payment-success',
						...eventData,
					});
					callSmartLook('track', 'payment-success', eventData);
					if (window.dataLayer) {
						window.dataLayer.push({
							ecommerce: {
								purchase: {
									actionField: {
										id: optileData.transactionId, // Transaction ID. Required
										revenue: optileData.amount,
										coupon: optileData.promoCode || reqData.promoCode.code,
									},
									products: [
										{
											name: 'DirectMessage',
											price: rate.rate,
											category: 'DirectMessage',
											quantity: 1,
											product_id: generateProductId('dm', {
												star: props.starData.userData,
											}),
											coupon: '', // Optional fields may be omitted or set to empty string.
										},
									],
								},
							},
						});
					}
					toggContent(true);
					props.onSuccess(
						reqData.resp,
						optileData.amount,
						optileData.promoCode || reqData.promoCode.code,
						reqData.returnUrl,
					);
				},
				() => {
					toggContent(true);
				},
			);
		} else {
			toggContent(true);
		}
	};

	const dispatch = useGeneral()[1];
	const localCurrency = useCurrencyData();
	const { data: celebrityData } = useGetCelebrityData();
	const addToCart = useAddToLiveCart(celebrityData, 'dm', props?.discount || null);


	const zeroPayment = bookingID => {
		zeroPayBooking(
			{
				amount: discount,
				reference: bookingID,
				promoCode: promoCode.code,
				originalPrice: rate.rate,
				currency: localCurrency?.abbr,
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
				router.push(`/${router.query?.celebrityId}/thankyou?zero_pay=true`);
			}
		});
	};
	// const zeroPayment = bookingID => {
	//   zeroPayBooking(
	//     {
	//       amount: discount,
	//       reference: bookingID,
	//       promoCode: promoCode.code,
	//       originalPrice: rate.rate,
	//       currency: localCurrency?.abbr,
	//       localAmount: numberToDecimalWithFractionTwo(
	//         getLocalAmount(discount),
	//         false,
	//         false,
	//       )
	//     },
	//     // zeroPayBooking(
	//     //   {
	//     //     amount: discount,
	//     //     reference: bookingID,
	//     //     promoCode: promoCode?.code,
	//     //   },
	//       dispatch,
	//       userData?.user.authentication_token
	//     );

	// };

	const onSubmit = () => {
		props.loaderAction(true);
		const method =
      reqData.resp && reqData.resp.booking ? 'request_edit' : 'request';
		const id =
      reqData.resp && reqData.resp.booking
      	? reqData.resp.booking
      	: props.starData.userData.id;

		sendDirectMessage(method, message, id, lang.id).then(resp => {
			props.loaderAction(false);
			if (resp && resp.booking) {
				// updateLocalStore({
				//   ...reqData,
				//   message,
				//   lang,
				//   resp,
				// });
				updateBookingId(resp.booking);
				setStep(2);
			} else {
				props.loaderAction(false);
				props.updateToast({
					value: true,
					message: resp.message,
					variant: 'error',
					global: true
				});
			}
		});
	};

	const onContinue = () => {
		if (message.trim() !== '' && isBookable) {
			onSubmit();
		} else {
			setFormError(true);
			scrollToElem(document.getElementById('formtop'));
		}
	};

	const paymentFailed = optileData => {
		toggContent(true);
		if (optileData.reference && reqData.bookingId === optileData.reference) {
			gaEvent({
				event: 'payment-failure',
				optileData,
				reqData: {
					promoCode: optileData.promoCode || reqData.promoCode.code,
				},
				currencyData: props.currencyData,
				starData: props.starData,
				title: props.title,
				rate: rate ? rate.rate : '',
			});
			callSmartLook('track', 'payment-failure', {
				optileData,
				reqData: {
					promoCode: optileData.promoCode || reqData.promoCode.code,
				},
				currencyData: props.currencyData,
				starData: props.starData,
				title: props.title,
				rate: rate ? rate.rate : '',
			});
			props.updateToast({
				value: true,
				message:
          optileData && optileData.interactionReason === 'NETWORK_FAILURE'
          	? t('common.optile_network_failure')
          	: t('common.optile_default_error'),
				variant: 'error',
				global: true
			});
		}
	};


	// useEffect(() => {
	//   if (props.isLoggedIn)
	//     bookingInitiate({
	//       celebrity: props.starData.userData.id,
	//       request_type: requestTypesKeys.message,
	//       id: null,
	//     });
	// }, [props.isLoggedIn]);

	const starNM = useMemo(() => {
		return getShortName(
			props.starData.userData.nick_name,
			props.starData.userData.first_name,
		);
	}, []);

	const onInputClick = () => {
		if (isMobile) {
			setTimeout(() => {
				smoothScroll(textRef.current, 200); // header offset
			}, 500);
		}
	};

	const getPlaceholder = () => {
		if (formError) {
			return t('purchase_flow.direct_message.placeholder');
		}
		return props.conversation
			? t('purchase_flow.continue_conversation')
			: t('purchase_flow.start_conversation', { starNM });
	};

	const fanNM = useMemo(() => {
		return getShortName(props.fanData?.nick_name, props.fanData?.first_name);
	}, []);

	// if (!showContent) {
	//   return null;
	// }

	return (
		<React.Fragment>
			{step === 2 && (
				<FontAwesomeIcon
					icon={faChevronLeft}
					onClick={backHandler}
					className="web-back back-top"
				/>
			)}

			<Container>
				{step === 1 && (
					<Center disabled={!isBookable}>
						<HeadingH2>
							{props.conversation
								? t('purchase_flow.lets_continue')
								: t('purchase_flow.direct_message.lets_chat')}
						</HeadingH2>
						<RateBold>
							{getLocalSymbol()}
							{props.discount}
						</RateBold>
						<DescriptionP className="desc-sub" id="formtop">
							<Trans
								i18nKey="purchase_flow.direct_message.description"
								values={{
									amount: props.discount,
									currency: getLocalSymbol(),
								}}
							>
                Ask a question, get advice, or just say hi
								<strong>for $2</strong>. You’re not charged until you get a
                response.
							</Trans>
						</DescriptionP>
						{props.conversation && (
							<React.Fragment>
								<a
									href={`/fan-manage/my-videos?type=conversation&request_id=${props.conversation.booking_id}&from=request`}
								>
									<LinkText className="conv-link">
										{t('purchase_flow.direct_message.see_conversation')}
									</LinkText>
								</a>
								<CommentItem
									type="comment"
									activityId="00"
									disableAction
									user={fanNM}
									time={props.conversation.created_date}
									visible
									commentDetails={{
										comments: props.conversation.message_request,
										user: { image_url: props.fanData?.avatar },
									}}
									classes={{
										root: 'message-wrap',
										comment: 'comment-container',
									}}
									receive
								/>
								<CommentItem
									type="comment"
									activityId="00"
									disableAction
									user={starNM}
									time={props.conversation.fulfilled_date}
									visible
									commentDetails={{
										comments: props.conversation.message_reply,
										user: { image_url: props.starData.avatar },
									}}
									classes={{
										root: 'message-wrap',
										comment: 'comment-container',
									}}
									receive={false}
								/>
							</React.Fragment>
						)}
						<SubTitle>{t('common.requestDet')}</SubTitle>
						<div ref={textRef}>
							<TextArea
								autoSize
								inputProps={{
									placeholder: getPlaceholder(),
									value: message,
									onClick: onInputClick,
									onChange: messageChange,
									maxLength: 500,
								}}
								errorField={formError && message === ''}
							/>
						</div>
						<CharCount>
							{t('purchase_flow.char_remains', {
								length: 500 - message.length,
							})}
						</CharCount>
						{props.starData.celbData.off_limit_topics ? (
							<React.Fragment>
								<span className="sub-head">{t('purchase_flow.off_limit')}</span>
								<DescriptionP>
									{props.starData.celbData.off_limit_topics}
								</DescriptionP>
							</React.Fragment>
						) : null}
						<LangSelector
							language={lang}
							starName={props.starData.userData.shortName}
							starDefaultLang={props.starData.celbData.languages.find(lang => lang.default)}
							langList={props.starData.celbData.languages}
							onSelectLang={languageChange}
						/>
						{(!isEmpty(props.starData.celbData.charity) &&
              props.starData.celbData.charity[0]) ||
            !hasDis ? (
								<PromoWrap>
									{!isEmpty(props.starData.celbData.charity) &&
                props.starData.celbData.charity[0] ? (
											<CharityText>
												{t('common.proceedGo', {
													charity:
                        typeof props.starData.celbData.charity === 'string'
                        	? props.starData.celbData.charity
                        	: props.starData.celbData.charity[0].charity,
												})}
											</CharityText>
										) : null}
									{!hasDis && (
										<PromoDisplay
											rate={rate.rate}
											promoObj={promoCode}
											celebId={props.starData.userData.id}
											updatePromoCode={updatePromoCode}
										/>
									)}
								</PromoWrap>
							) : null}
						<LoginHandler onComplete={onContinue}>
							{(shouldProceed, onAction) => (
								<FlexCenter className="btn-wrp">
									<Button
										disabled={!shouldProceed || !isBookable}
										isDisabled={!shouldProceed || !isBookable}
										onClick={onAction}
									>
										{t('common.next')}
									</Button>
								</FlexCenter>
							)}
						</LoginHandler>
					</Center>
				)}
				{step === 2 && (
					<Center>
						<MessagePayment
							fanData={props.fanData}
							hasDis={hasDis}
							message={message}
							rate={rate.rate}
							finalPrice={discount}
							promoDet={promoCode}
							starData={props.starData}
							bookingId={bookingId}
							zeroPayment={zeroPayment}
							onOptileFail={() => setStep(1)}
						/>
					</Center>
				)}
			</Container>
		</React.Fragment>
	);
}

Message.propTypes = {
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	loaderAction: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
};

Message.defaultProps = {};

export default Message;
