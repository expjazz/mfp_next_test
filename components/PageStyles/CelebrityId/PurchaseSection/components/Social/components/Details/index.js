/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation, Trans } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { isEmpty } from 'src/utils/dataStructures';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { DescriptionP } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import Input from 'components/TextInput';
import LangSelector from 'components/LangSelector';
import PromoDisplay from 'components/PromoDisplay';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { sendSocialShoutout } from 'src/services/';
// import { useAddToLiveCart, useOptileParser } from 'customHooks/domUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { callSmartLook } from 'services/analytics/smartLook';
import {
	getDiscount,
	getDiscountedPrice,
	hasDiscount,
} from 'src/utils/paymentUtils';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { bookingInitiate } from 'services/request';
// import Login from 'components/Login&Signup';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
// import { setCheckoutProgressEcGa } from 'utils/ga';
// import LoginHandler from '../../../LoginHandler';
// import { gaEvent } from '../../../../utils';
// import Payment from './Payment';
// import { StarContext } from '../../../../StarContext';
// import { socialIcons } from '../../../utils';
import { socialIcons } from '../../../utils';
// import { HeadingH2B, CharCount } from '../../../styled';
import { Container, Center } from './styled';
import { Trans, useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { SubTitle, RateBold, PromoWrap, CharityText,} from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { HeadingH2B, CharCount } from '../../../../styled';
import LoginHandler from 'components/LoginHandler';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { sendSocialShoutout, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import SocialPayment from './Payment';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGeneral } from 'src/context/general';
import { useRouter } from 'next/router';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';

const entity = value => value;

function SocialDetails({ selected, usStates, ...props }) {
	const { t } = useTranslation();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const reqDataString = null;
	const reqData = reqDataString ? JSON.parse(reqDataString) : {};
	const { data: entityData } = useGetPartner();
	const [link, setLink] = useState(reqData.link || '');
	const [info, setInfo] = useState(reqData.info || '');
	const [lang, setLang] = useState(reqData.lang || {});
	const [formError, setFormError] = useState(false);
	const [linkerror, setLinkerror] = useState(false);
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

	const backHandler = () => {
		if (step === 2) {
			setStep(1);
		} else {
			props.backHandler();
		}
	};

	const hasDis = hasDiscount(
		'Social Media Interactions',
		props.starData.celbData.discount,
	);
	const { data: celebrityData } = useGetCelebrityData();
	const addToCart = useAddToLiveCart(
		celebrityData,
		'social',
		selected ? selected.amount : null,
		{
			social_media: selected.social_media,
			title: selected.title,
		},
	);

	const discount = useMemo(() => {
		const amount = hasDis
			? getDiscountedPrice(
				'Social Media Interactions',
				props.starData.celbData.discount,
				selected.amount,
			)
			: getDiscount(
				requestTypesKeys.socialShoutout,
				promoCode,
				selected.amount,
			);
		return amount || amount === 0 ? amount : selected.amount;
	}, [selected.amount, promoCode]);

	const inputChange = ({ target: { value } }) => {
		addToCart();
		setLink(value);
		setFormError(false);
	};

	const textHandler = event => {
		setInfo(event.target.value);
	};

	const languageChange = language => {
		setLang(language);
	};

	const validateForm = value => {
		const linkVal = value ? value.trim('') : '';
		const regex = new RegExp(
			`^(https:\/\/){0,1}(www.){0,1}${socialIcons(t)[selected.social_media].url}`,
		);
		if (!regex.test(linkVal.toLowerCase()) || linkVal.includes(' ')) {
			return false;
		}
		return true;
	};

	const linkBlur = ({ target: { value } }) => {
		if (validateForm(value)) {
			setLinkerror(false);
		} else {
			setLinkerror(true);
		}
	};

	const paymentSuccess = (optileData, zeroPay = false) => {
		if (
			(zeroPay && optileData.reference) ||
      (optileData.reference && reqData.bookingId === optileData.reference)
		) {
			props.createCharge(
				{
					starsona: optileData.reference,
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
						rate: selected.amount,
					};
					gaEvent({
						event: 'payment-success',
						optileData,
						reqData: {
							promoCode: optileData.promoCode || reqData.promoCode.code,
						},
						currencyData: props.currencyData,
						starData: props.starData,
						title: props.title,
						rate: selected.amount,
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
											name: selected.title,
											price: selected.amount,
											category: 'Social',
											quantity: 1,
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
					);
				},
				() => toggContent(true),
			);
		} else {
			toggContent(true);
		}
	};

	const { data: userData } = useFetchLoggedUser();
	const dispatch = useGeneral()[1];
	// const zeroPayment = bookingID => {
	//     zeroPayBooking(
	//       {
	//         amount: discount,
	//         reference: bookingID,
	//         promoCode: promoCode?.code,
	//       },
	//       dispatch,
	//       userData?.user.authentication_token
	//     );

	// };

	const localCurrency = useCurrencyData();
	const router = useRouter();
	const zeroPayment = bookingID => {
		zeroPayBooking(
			{
				amount: discount,
				reference: bookingID,
				promoCode: promoCode.code,
				originalPrice: selected?.amount,
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

	const onSubmit = async () => {
		try {
			props.loaderAction(true);
			const payload = {
				social_media_title: selected.id,
				link,
				language: lang.id,
				description: info,
				request_type: requestTypesKeys.socialShoutout,
			};
			const method =
        reqData.resp && reqData.resp.booking ? 'request_edit' : 'request';
			const id =
        reqData.resp && reqData.resp.booking
        	? reqData.resp.booking
        	: props.starData.userData.id;
			sendSocialShoutout(method, id, payload).then(resp => {
				props.loaderAction(false);
				if (resp && resp.booking) {
					// updateLocalStore({
					//   info,
					//   lang,
					//   link,
					//   resp,
					// });
					updateBookingId(resp.booking);
					setStep(2);
				} else if (!resp) {
					props.loaderAction(false);
					props.updateToast({
						value: true,
						message: t('common.commonApiError'),
						variant: 'error',
						global: true

					});
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
		} catch (e) {
			props.loaderAction(false);
			props.updateToast({
				value: true,
				message: t('common.commonApiError'),
				variant: 'error',
				global: true
			});
		}
	};

	const onContinue = () => {
		if (validateForm(link) && isBookable) {
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
				rate: selected.amount,
			});
			callSmartLook('track', 'payment-failure', {
				optileData,
				reqData: {
					promoCode: optileData.promoCode || reqData.promoCode.code,
				},
				currencyData: props.currencyData,
				starData: props.starData,
				title: props.title,
				rate: selected.amount,
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
	//   try {
	//     setCheckoutProgressEcGa(
	//       {
	//         userDetails: props.starData.userData,
	//         celebDetails: props.starData.celbData,
	//       },
	//       1,
	//       selected.amount,
	//     );
	//   } catch (error) {
	//     //
	//   }
	// }, []);

	// useEffect(() => {
	//   if (props.isLoggedIn)
	//     bookingInitiate({
	//       celebrity: props.starData.userData.id,
	//       request_type: requestTypesKeys.socialShoutout,
	//       id: selected.id,
	//     });
	// }, [props.isLoggedIn]);

	// useEffect(() => {
	//   window.scrollTo(0, 0);
	// }, []);

	// if (!showContent) {
	//   return null;
	// }

	useEffect(() => {
		if (props.isLoggedIn)
			bookingInitiate({
				celebrity: props.starData.userData.id,
				request_type: requestTypesKeys.socialShoutout,
				id: selected.id,
			});
	}, [props.isLoggedIn]);
	return (
		<>
			<FontAwesomeIcon
				icon={faChevronLeft}
				onClick={backHandler}
				className="web-back back-top"
			/>

			<Container>
				{step === 1 && (
					<Center disabled={!isBookable}>
						<HeadingH2B className="social-head">
							{selected.social_media} {t('common.experience')}
						</HeadingH2B>
						<RateBold>
							{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(discount),
								false,
								false,
							)}
						</RateBold>
						<span className="sub-head head-gap">{selected.title}</span>
						<DescriptionP className="desc-sub" id="formtop">
							{selected.description}
						</DescriptionP>
						<SubTitle>{t('common.requestDet')}</SubTitle>
						<Input
							inputProps={{
								defaultProps: {
									value: link,
									onChange: inputChange,
									onBlur: linkBlur,
									error: formError || (linkerror && link !== ''),
								},
								nativeProps: {
									'data-cy': 'purchase-social-link'
								},
								labelObj: {
									label:
                    linkerror && link !== '' ? (
                    	t('common.social_link')
                    ) : (
                    	<Trans i18nKey="purchase_flow.commercial.public_link">
                        Add your public $
                    		{selected.social_media.charAt(0).toUpperCase() +
                          selected.social_media.slice(1)}{' '}
                        link
                    	</Trans>
                    ),
									errorMsg:
                    linkerror &&
                    link !== '' &&
                    t('purchase_flow.commercial.valid_url', {
                    	social_media: selected.social_media,
                    }),
								},
							}}
						/>

						<span className="sub-head sub-gap">
							{t('purchase_flow.additional_request')}
						</span>
						<TextArea
							autoSize
							inputProps={{
								placeholder: t('purchase_flow.request_info', {
									talentSingle: entityData?.partnerData.talent_singular_name,
								}),
								value: info,
								onChange: textHandler,
								className: 'text-area',
								maxLength: 500,
							}}
						/>
						<CharCount>
							{t('purchase_flow.char_remains', { length: 500 - info.length })}
						</CharCount>
						<LangSelector
							language={lang}
							onSelectLang={languageChange}
							starName={props.starData.userData.shortName}
							starDefaultLang={props.starData.celbData.languages.find(lang => lang.default)}
							langList={props.starData.celbData.languages}
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
											rate={selected.amount}
											celebId={props.starData.userData.id}
											promoObj={promoCode}
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
						<SocialPayment
							social={selected}
							info={info}
							hasDis={hasDis}
							t={t}
							finalPrice={discount}
							promoDet={promoCode}
							fanData={props.fanData}
							starData={props.starData}
							bookingId={bookingId}
							zeroPayment={zeroPayment}
							onOptileFail={() => setStep(1)}
						/>
					</Center>
				)}
			</Container>
		</>
	);
}





export default SocialDetails;
