/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { DescriptionP } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import Input from 'components/TextInput';
import {
	getDiscount,
	getDiscountedPrice,
	hasDiscount,
} from 'src/utils/paymentUtils';
import ImagePreview from 'components/ImagePreview';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { Dashed, Close, FlexCenter } from 'styles/CommonStyled';
// import { getLocalAmount } from 'utils/currencyUtils';
import { getExifData, imageRotation } from 'src/utils/imageProcessing';
// import { readDataUrl } from 'src/utils/domUtils';
import LangSelector from 'components/LangSelector';
import PromoDisplay from 'components/PromoDisplay';
// import { sendDigitalGoods } from 'services/';
// import { setCheckoutProgressEcGa } from 'utils/ga';
import { completeURL } from 'src/constants/regex/urlRegex';
import Button from 'components/SecondaryButton';
// import LoginHandler from '../../../LoginHandler';
// import { StarContext } from '../../../../StarContext';
import { maxUploadSize, inputFilter, imageRegex } from './constants';
// import { gaEvent } from '../../../../utils';
import { fileUpload } from './utils';
// import Payment from './Payment';
// import { HeadingH2B, CharCount } from '../../../styled';
// import { SubTitle, RateBold, PromoWrap, CharityText } from '../../../../styled';
import {
	Container,
	Center,
	Image,
	ImageWrap,
	ImageWrapper,
	ImageSpan,
} from './styled';
import { useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { HeadingH2B, CharCount } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { SubTitle, RateBold, PromoWrap, CharityText } from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { useRouter } from 'next/router';
import { isVodacom, readDataUrl, useAddToLiveCart } from 'customHooks/domUtils';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import LoginHandler from 'components/LoginHandler';
import FunPayment from './Payment';
import { sendDigitalGoods, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGeneral } from 'src/context/general';
import { useDisableRefetchOnFocus } from 'customHooks/reactQueryHooks/utils';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';


// const getLocalAmount = value => value
function FunStuffForm({ funStuff, ...props }) {
	useDisableRefetchOnFocus();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data } = useGetPartner();
	const router = useRouter();
	const { t } = useTranslation();
	const reqDataString = null;
	const reqData = reqDataString ? JSON.parse(reqDataString) : {};
	const [info, setInfo] = useState(reqData.info || '');
	const [lang, setLang] = useState(reqData.lang || {});
	const [preview, setPreview] = useState(null);
	const [file, setFile] = useState(null);
	const [baseUrls, setUrl] = useState(
		reqData.resp ? reqData.resp.fan_image_url : null,
	);
	const [link, setLink] = useState(reqData.link || '');
	const [formError, setFormError] = useState(false);
	const [linkerror, setLinkerror] = useState(false);
	const [optileCheckout, triggerOptile] = useState(false);
	const [bookingId, updateBookingId] = useState('');
	const [step, setStep] = useState(1);
	const fileRef = useRef(null);
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

	const fileChange = async event => {
		const newFile = event.target.files;
		if (newFile && imageRegex.test(newFile[0].name.toLowerCase())) {
			if (newFile[0].size / 1024 <= maxUploadSize) {
				readDataUrl(newFile[0]).then(result => {
					setUrl(result);
					setFile(newFile[0]);
				});
				const exifData = await getExifData(newFile[0]);
				const correctedFile = await imageRotation(newFile[0], exifData);
				if (correctedFile && !isVodacom()) {
					await readDataUrl(correctedFile).then(result => {
						setUrl(result);
						setFile(new File([correctedFile], newFile[0].name));
						// triggerOptile(false);
					});
				}
			} else {
				props.updateToast({
					value: true,
					message: t('common.file_size_5'),
					variant: 'error',
					global: true
				});
			}
		} else {
			props.updateToast({
				value: true,
				message: t('purchase_flow.fun_stuff.image_format'),
				variant: 'error',
				global: true
			});
		}
		if (fileRef.current) {
			fileRef.current.value = '';
		}
	};
	const { data: celebrityData } = useGetCelebrityData();
	const addToCart = useAddToLiveCart(celebrityData, 'funstuff', funStuff.price, {
		id: funStuff.numeric_id,
		title: funStuff.title,
	});

	const inputChange = ({ target: { value } }) => {
		addToCart();
		setLink(value);
		triggerOptile(false);
	};

	const languageChange = language => {
		setLang(language);
		triggerOptile(false);
	};

	const linkBlur = ({ target: { value } }) => {
		if (value.trim() && !completeURL.test(value.trim())) {
			setLinkerror(true);
		} else {
			setLinkerror(false);
		}
	};

	const removeImage = () => {
		setFile(null);
		setUrl(null);
	};

	const textHandler = event => {
		// addToCart();
		setInfo(event.target.value);
		triggerOptile(false);
	};

	const previewImage = src => () => {
		setPreview(src);
	};

	const modalClose = () => {
		setPreview(null);
	};

	const validateForm = () => {
		const linkVal = link.trim('');
		if (info.trim() === '' || (linkVal && !completeURL.test(linkVal))) {
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
			let fileName = '';
			if (file) {
				fileName = await fileUpload({
					file,
					file_name: file.name,
					file_type: 'image',
				});
			}
			const payload = {
				description: info,
				language: lang.id,
				...(fileName ? { fan_image: fileName } : {}),
				...(link ? { fan_url: link } : {}),
				fun_stuff_id: funStuff.fun_stuff_id,
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
	//   if (props.isLoggedIn)
	//     bookingInitiate({
	//       celebrity: props.starData.userData.id,
	//       request_type: requestTypesKeys.digitalGoods,
	//       id: funStuff.fun_stuff_id,
	//     });
	// }, [props.isLoggedIn]);

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
		<React.Fragment>
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
						<HeadingH2B>{funStuff.title}</HeadingH2B>
						<RateBold>
							{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(discount),
								false,
								false,
							)}
						</RateBold>
						<div id="formtop">
							<span className="sub-head">
								{t('purchase_flow.fun_stuff.info_request', {
									starNM: props.starNM,
								})}
							</span>
							{funStuff.required_info && (
								<DescriptionP className="desc-sub">
									{funStuff.required_info}
								</DescriptionP>
							)}
						</div>
						<SubTitle>{t('common.requestDet')}</SubTitle>
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
						{baseUrls && (
							<ImageWrapper>
								<ImageSpan image={baseUrls}>
									<Close
										className="close"
										role="presentation"
										onClick={removeImage}
									></Close>
								</ImageSpan>
							</ImageWrapper>
						)}

						{!baseUrls && funStuff.allow_fan_image && (
							<Dashed htmlFor="funimage" className="upload-btn">
								<input
									className="hidden-upload"
									accept={inputFilter}
									id="funimage"
									onChange={fileChange}
									type="file"
									ref={fileRef}
								/>
								{t('purchase_flow.fun_stuff.upload_image')}
							</Dashed>
						)}

						{funStuff.allow_fan_url && (
							<Input
								inputProps={{
									defaultProps: {
										value: link,
										onChange: inputChange,
										onBlur: linkBlur,
										error: formError && linkerror,
									},
									labelObj: {
										label: t('purchase_flow.fun_stuff.link_label', {
											talentSingle: data?.partnerData.talentsSingleCap,
										}),
										errorMsg: formError && linkerror && t('common.valid_url'),
									},
								}}
							/>
						)}

						<DescriptionP className="sub-desc">
							{t('purchase_flow.fun_stuff.description')}
						</DescriptionP>
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
							details={info}
							hasDis={hasDis}
							starNM={props.starNM}
							promoDet={promoCode}
							finalPrice={discount}
							fanData={props.fanData}
							starData={props.starData}
							optileCheckout={optileCheckout}
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
		</React.Fragment>
	);
}


FunStuffForm.defaultProps = {};

export default FunStuffForm;
