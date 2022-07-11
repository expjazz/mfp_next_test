/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation, Trans } from 'next-i18next';
import axios from 'axios';
// import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
// import { bookingInitiate } from 'services/request';
import { DescriptionP } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import Input from 'components/TextInput';
import LangSelector from 'components/LangSelector';
import { Dashed, Close, FlexCenter } from 'styles/CommonStyled';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { setCheckoutProgressEcGa } from 'utils/ga';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { callSmartLook } from 'services/analytics/smartLook';
import { getExifData, imageRotation } from 'src/utils/imageProcessing';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { useAddToLiveCart, useOptileParser } from 'customHooks/domUtils';
// import { sendSocialShoutout } from 'services/';
import { awsKeys } from 'src/constants/';
import Button from 'components/SecondaryButton';
import { postReactionMedia } from 'src/services/postReaction';
// import LoginHandler from '../../../../LoginHandler';
// import { gaEvent } from '../../../../../utils';
// import { StarContext } from '../../../../../StarContext';
// import Payment from './Payment';
// import { socialIcons } from '../../../../utils';
import { HeadingH2B, CharCount } from '../../../../../styled';
import { Container, Center, ImageWrapper, ImageSpan } from './styled';

import { Trans, useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import {
	SubTitle,
	RateBold,
	PromoWrap,
	CharityText,
} from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { useRouter } from 'next/router';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import LoginHandler from 'components/LoginHandler';
import SocialCommPayment from './Payment';
import { sendSocialShoutout, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import { socialIcons } from '../../../../utils';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';


function SocialDetails({ selected, usStates, ...props }) {
	useDisableRefetchOnFocus();
	const [getLocalSymbol, getLocalAmount, getUSDAmount] = useGetLocalAmount();
	const { data: entityData } = useGetPartner();
	const { t } = useTranslation();
	const router = useRouter();
	const reqDataString = null;
	const reqData = reqDataString ? JSON.parse(reqDataString) : {};
	const [link, setLink] = useState(reqData.link || '');
	const [info, setInfo] = useState(reqData.info || '');
	const [lang, setLang] = useState(reqData.lang || {});
	const [formError, setFormError] = useState(false);
	const [linkerror, setLinkerror] = useState(false);
	const [promoFile, updatePromoFile] = useState(null);
	const [bookingId, updateBookingId] = useState('');
	const [step, setStep] = useState(1);
	const fileRef = useRef(null);
	const isBookable = useGetCelebrityData()?.data?.isBookable && isCelebLocStorage();
	const {
		showContent,
		updateLocalStore,
		toggContent,
		scrollToElem,
		promoCode
	} = useContext(StarContext);

	const backHandler = () => {
		if (step === 2) {
			setStep(1);
		} else {
			router.back();
		}
	};
	const { data: celebrityData } = useGetCelebrityData();
	const addToCart = useAddToLiveCart(celebrityData, 'commercial', selected.amount);
	const inputChange = ({ target: { value } }) => {
		addToCart();
		setLink(value);
		setFormError(false);
	};

	const textHandler = event => {
		addToCart();
		setInfo(event.target.value);
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

	const onFileChange = () => {
		const { files } = fileRef.current;
		const allowedTypes = /((jpeg)|(jpg)|(png))$/i;
		const file = files[0];
		let inputFile = {};
		if (!allowedTypes.exec(file.type)) {
			props.updateToast({
				value: true,
				message: t('common.file_error'),
				variant: 'error',
				global: true
			});
		} else if (file.size > 10 * 1024 * 1024) {
			// 10MB limit
			props.updateToast({
				value: true,
				message: t('common.file_size_10'),
				variant: 'error',
				global: true
			});
		} else {
			const getFile = async () => {
				inputFile = {
					fileData: file,
					extension: file.type.split('/')[1],
					fileType: 'image',
				};
				const exifData = await getExifData(inputFile.fileData);
				const correctedFile = await imageRotation(file, exifData);
				inputFile.fileData = correctedFile;
				inputFile.fileURL = window.URL.createObjectURL(correctedFile);
				updatePromoFile(inputFile);
			};
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = getFile;
		}
		fileRef.current.value = '';
	};

	const removeImage = () => {
		updatePromoFile(null);
	};

	const promotionalUpload = async file => {
		try {
			const resp = await postReactionMedia(
				awsKeys.promotional,
				file.fileData,
				file.extension,
				file.fileType,
			);
			if (resp) {
				const response = await axios.post(resp.url, resp.formData);
				if (response) {
					return resp.fileName;
				}
			}
		} catch (e) {
			throw e;
		}
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
						rate: selected.price,
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
											name: selected.title,
											price: selected.price,
											category: 'Social Promotion',
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
				() => {
					toggContent(true);
				},
			);
		} else {
			toggContent(true);
		}
	};

	const onSubmit = async () => {
		try {
			props.loaderAction(true);
			const fileName = promoFile ? await promotionalUpload(promoFile) : null;
			const payload = {
				social_media_title: selected.id,
				link,
				description: info,
				language: lang.id,
				request_type: requestTypesKeys.promotion,
				...(requestTypesKeys.promotion === 7 && fileName
					? { promotional_file: fileName }
					: {}),
			};
			const id =
        reqData.resp && reqData.resp.booking
        	? reqData.resp.booking
        	: props.starData.userData.id;
			const method =
        reqData.resp && reqData.resp.booking ? 'request_edit' : 'request';
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

	const { data: userData } = useFetchLoggedUser();

	// const zeroPayment = bookingID => {
	//     zeroPayBooking(
	//       {
	//         amount: selected.price,
	//         reference: bookingID,
	//         promoCode: promoCode?.code,
	//       },
	//       dispatch,
	//       userData?.user.authentication_token
	//     );

	// };
	const localCurrency = useCurrencyData();
	const zeroPayment = bookingID => {
		zeroPayBooking(
			{
				amount: selected.amount,
				reference: bookingID,
				promoCode: promoCode.code,
				originalPrice: selected.amount,
				currency: localCurrency?.abbr,
				localAmount: numberToDecimalWithFractionTwo(
					getLocalAmount(0),
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
			toggContent(true);
			gaEvent({
				event: 'payment-failure',
				optileData,
				reqData: {
					promoCode: optileData.promoCode || reqData.promoCode.code,
				},
				currencyData: props.currencyData,
				starData: props.starData,
				title: props.title,
				rate: selected.price,
			});
			callSmartLook('track', 'payment-failure', {
				optileData,
				reqData: {
					promoCode: optileData.promoCode || reqData.promoCode.code,
				},
				currencyData: props.currencyData,
				starData: props.starData,
				title: props.title,
				rate: selected.price,
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

	// useOptileParser(paymentSuccess, paymentFailed, props.history.location.search);

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
	//       request_type: requestTypesKeys.promotion,
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
				celebrity: props.starData?.userData.id,
				request_type: requestTypesKeys.commercial,
				id: selected?.id,
			});
	}, [props.isLoggedIn]);
	return (
		<React.Fragment>
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
								getLocalAmount(selected.amount),
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

						{promoFile && (
							<ImageWrapper>
								<ImageSpan image={promoFile.fileURL}>
									<Close
										className="close"
										role="presentation"
										onClick={removeImage}
									></Close>
								</ImageSpan>
							</ImageWrapper>
						)}

						{!promoFile && (
							<Dashed htmlFor="funimage" className="upload-btn">
								<input
									className="hidden-upload"
									accept="image/*"
									id="funimage"
									onChange={onFileChange}
									type="file"
									ref={fileRef}
								/>
								{t('purchase_flow.fun_stuff.upload_image')}
							</Dashed>
						)}

						<span className="sub-head">
							{t('purchase_flow.additional_request')}
						</span>
						<TextArea
							autoSize
							inputProps={{
								placeholder: t('purchase_flow.request_info', {
									talentSingle: entityData?.partnerData.talent_plural_name,
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
							starName={props.starData.userData.shortName}
							starDefaultLang={props.starData.celbData.languages.find(lang => lang.default)}
							langList={props.starData.celbData.languages}
							onSelectLang={setLang}
						/>
						{!isEmpty(props.starData.celbData.charity) &&
            props.starData.celbData.charity[0] ? (
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
						<SocialCommPayment
							social={selected}
							fanData={props.fanData}
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


SocialDetails.defaultProps = {};

export default SocialDetails;
