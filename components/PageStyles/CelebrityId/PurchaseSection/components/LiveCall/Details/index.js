/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
// import { bookingInitiate } from 'services/request';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import {
	getDiscount,
	getDiscountedPrice,
	hasDiscount,
} from 'src/utils/paymentUtils';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { callSmartLook } from 'services/analytics/smartLook';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { DescriptionP } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import ImagePreview from 'components/ImagePreview';
import LangSelector from 'components/LangSelector';
import PromoDisplay from 'components/PromoDisplay';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import { useGeneral } from 'src/context/general';
// import { sendDigitalGoods } from 'services/';
// import Login from 'components/Login&Signup';
// import { setCheckoutProgressEcGa } from 'utils/ga';
// import LoginHandler from '../../../LoginHandler';
// import { gaEvent } from '../../../../utils';
// import Payment from './Payment';
// import { StarContext } from '../../../../StarContext';
// import { HeadingH2B, CharCount } from '../../../styled';
// import { SubTitle, RateBold, PromoWrap, CharityText } from '../../../../styled';
import {
	Container,
	Center,
	DetailsWrap,
	LineDesc,
	Image,
	ImageWrap,
} from './styled';
import { useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { StarContext } from '../../../StarContext';
import { HeadingH2B, CharCount } from '../../../styled';
import { SubTitle, RateBold, PromoWrap, CharityText } from '../../../outterStyled';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import LoginHandler from 'components/LoginHandler';
import FunPayment from '../../FunStuff/components/Details/Payment';
import { sendDigitalGoods, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';

function LiveCallForm({ funStuff, ...props }) {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();

	const { t } = useTranslation();
	const reqDataString = null;
	const reqData = reqDataString ? JSON.parse(reqDataString) : {};
	const [info, setInfo] = useState(reqData.info || '');
	const [lang, setLang] = useState(reqData.lang || {});
	const [formError, setFormError] = useState(false);
	const [preview, setPreview] = useState(null);
	const [step, setStep] = useState(1);
	const [bookingId, updateBookingId] = useState('');
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
		'Fun stuff service',
		props.starData.celbData.discount,
	);

	const discount = useMemo(() => {
		const amount = hasDis
			? getDiscountedPrice(
				'Fun stuff service',
				props.starData.celbData.discount,
				funStuff.price,
			)
			: getDiscount(requestTypesKeys.digitalGoods, promoCode, funStuff.price);
		return amount || amount === 0 ? amount : funStuff.price;
	}, [funStuff.price, promoCode]);

	const { data: celebrityData } = useGetCelebrityData();
	const addToCart = useAddToLiveCart(celebrityData, 'live-call', funStuff.price, {
		id: funStuff.numeric_id,
		title: funStuff.title,
	});
	const textHandler = event => {
		addToCart();
		setInfo(event.target.value);
	};

	const previewImage = src => () => {
		setPreview(src);
	};

	const languageChange = language => {
		setLang(language);
	};

	const modalClose = () => {
		setPreview(null);
	};

	const validateForm = () => {
		if (info.trim() === '') {
			return false;
		}
		return true;
	};

	const paymentSuccess = (optileData, zeroPay = false) => {
		alert('to do');
	};

	const { data: userData } = useFetchLoggedUser();
	const dispatch = useGeneral()[1];
	// const zeroPayment = bookingID => {
	//     zeroPayBooking(
	//       {
	//         amount: discount,
	//         reference: bookingID,
	//         promoCode: promoCode.code,
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
				originalPrice: funStuff?.price,
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
				description: info,
				fun_stuff_id: funStuff.fun_stuff_id,
				language: lang.id,
			};
			const method =
        reqData.resp && reqData.resp.booking ? 'request_edit' : 'request';
			const id =
        reqData.resp && reqData.resp.booking
        	? reqData.resp.booking
        	: props.starData.userData.id;
			sendDigitalGoods(method, id, payload).then(resp => {
				props.loaderAction(false);
				if (resp.booking) {
					// updateLocalStore({
					//   info,
					//   lang,
					//   link,
					//   resp,
					// });
					updateBookingId(resp.booking);
					// triggerOptile(true);
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
		if (validateForm() && isBookable) {
			onSubmit();
		} else {
			setFormError(true);
			scrollToElem(document.getElementById('formtop'));
		}
	};

	const paymentFailed = optileData => {
		alert('to do');
	};



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
				request_type: requestTypesKeys.digitalGoods,
				id: funStuff.fun_stuff_id,
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
						{(funStuff.sample_image || funStuff.sample_image_original) && (
							<ImageWrap>
								<FontAwesomeIcon
									icon={faExpandArrowsAlt}
									className="expand"
									onClick={previewImage(
										funStuff.sample_image || funStuff.sample_image_original,
									)}
								/>
								<Image
									src={funStuff.sample_image || funStuff.sample_image_original}
									onClick={previewImage(
										funStuff.sample_image || funStuff.sample_image_original,
									)}
								/>
							</ImageWrap>
						)}
						<HeadingH2B>
							{funStuff.title}
							{funStuff.meeting_duration
								? ` - ${funStuff.meeting_duration} minutes`
								: ''}
						</HeadingH2B>
						<RateBold>
							{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(discount),
								false,
								false,
							)}
						</RateBold>
						<DescriptionP id="formtop">{funStuff.description}</DescriptionP>
						<SubTitle>{t('common.requestDet')}</SubTitle>
						<span className="sub-head not-bold">
							{t('purchase_flow.live_call.description')}
						</span>
						<TextArea
							autoSize
							inputProps={{
								placeholder:
                  formError && info === ''
                  	? t('purchase_flow.fun_stuff.additional_info')
                  	: t('purchase_flow.fun_stuff.add_request'),
								value: info,
								onChange: textHandler,
								className: 'text-area',
								maxLength: 500,
							}}
							errorField={formError && info === ''}
						/>
						<CharCount>
							{t('purchase_flow.char_remains', { length: 500 - info.length })}
						</CharCount>

						{props.starData.celbData.off_limit_topics && (
							<DetailsWrap>
								<span className="sub-head">
									{t('common.off_limit_topics')}{' '}
									<LineDesc>
										{props.starData.celbData.off_limit_topics}
									</LineDesc>
								</span>
							</DetailsWrap>
						)}
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
												{t('purchase_flow.card_note')}
											</CharityText>
										) : null}
									{!hasDis && (
										<PromoDisplay
											rate={funStuff.price}
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
						<FunPayment
							funStuff={funStuff}
							hasDis={hasDis}
							details={info}
							starNM={props.starNM}
							promoDet={promoCode}
							finalPrice={discount}
							fanData={props.fanData}
							starData={props.starData}
							bookingId={bookingId}
							zeroPayment={zeroPayment}
							onOptileFail={() => setStep(1)}
						/>
					</Center>
				)}
				{preview && (
					<ImagePreview
						src={preview}
						open={preview !== null}
						onClose={modalClose}
					/>
				)}
			</Container>
		</>
	);
}

LiveCallForm.propTypes = {
	funStuff: PropTypes.object.isRequired,
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	loaderAction: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	backHandler: PropTypes.func.isRequired,
};

LiveCallForm.defaultProps = {};

export default LiveCallForm;
