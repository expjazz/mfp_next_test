/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'next-i18next';
// import { isEmpty, cloneDeep } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
// import { bookingInitiate } from 'services/request';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { requestProduct } from 'services/';
// import { useAddToLiveCart, useOptileParser } from 'customHooks/domUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import {
	getDiscount,
	getDiscountedPrice,
	hasDiscount,
} from 'src/utils/paymentUtils';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { callSmartLook } from 'services/analytics/smartLook';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Description } from 'styles/TextStyled';
import TextArea from 'components/TextArea';
import Button from 'components/SecondaryButton';
import { FlexCenter } from 'styles/CommonStyled';
import Input from 'components/TextInput';
// import Login from 'components/Login&Signup';
import LangSelector from 'components/LangSelector';
import PromoDisplay from 'components/PromoDisplay';
import Dropdown from 'components/Dropdown';
import PhoneNumber from 'components/PhoneNumber';
import ImagePreview from 'components/ImagePreview';
// import { getprops.countryList } from 'store/shared/actions/getCommonData/getprops.countryList';
// import { setCheckoutProgressEcGa } from 'utils/ga';
// import LoginHandler from '../../../LoginHandler';
// import { gaEvent } from '../../../../utils';
// import Payment from './Payment';
// import { StarContext } from '../../../../StarContext';
// import { HeadingH2B, CharCount } from '../../../styled';
import { Container, Image, ImageWrap, Center } from './styled';
// import { SubTitle, RateBold, PromoWrap, CharityText } from '../../../../styled';
import { cloneDeep, isEmpty } from 'src/utils/dataStructures';
import { useTranslation } from 'next-i18next';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { SubTitle, RateBold, PromoWrap, CharityText } from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { HeadingH2B, CharCount } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { useCurrencyData, useGetLocalAmount } from 'customHooks/currencyUtils';
import LoginHandler from 'components/LoginHandler';
import ProductPayment from './Payment';
import { requestProduct, zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGeneral } from 'src/context/general';
import { useRouter } from 'next/router';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';
function ProductForm({ product, usStates, ...props }) {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();

	const { t } = useTranslation();
	const reqDataString = null;
	const reqData = reqDataString ? JSON.parse(reqDataString) : {};
	const phoneRef = useRef(null);
	const [lang, setLang] = useState(reqData.lang || {});
	const [formError, setFormError] = useState(false);
	const [preview, setPreview] = useState(null);
	const [validPh, setValidPh] = useState(false);
	const [regCountry, setRegCountry] = useState(
		reqData.regCountry || {
			name: '',
			provinces: [],
		},
	);
	const [formData, setFormData] = useState({
		shipping_full_name: reqData.shipping_full_name || '',
		shipping_address_1: reqData.shipping_address_1 || '',
		shipping_address_2: reqData.shipping_address_2 || '',
		shipping_city: reqData.shipping_city || '',
		shipping_state:
      (reqData.shipping_state && reqData.shipping_state.code) || {},
		shipping_country: reqData.shipping_country || '',
		shipping_zip_code: reqData.shipping_zip_code || '',
		shipping_phone: reqData.shipping_phone || '',
		description: reqData.description || '',
		country: reqData.country || 'US',
	});
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
		'Personalized Merch',
		props.starData.celbData.discount,
	);

	const discount = useMemo(() => {
		const amount = hasDis
			? getDiscountedPrice(
				'Personalized Merch',
				props.starData.celbData.discount,
				product.price,
			)
			: getDiscount(requestTypesKeys.products, promoCode, product.price);
		return amount || amount === 0 ? amount : product.price;
	}, [product.price, promoCode]);

	const getStateObj = state => {
		if (state && props.entityData.product_us_validation) {
			return usStates.find(stateVal => stateVal.code === state);
		} else if (state && !isEmpty(regCountry.country_name)) {
			return regCountry.provinces.find(stateVal => stateVal.code === state);
		}
		return '';
	};

	const [country, setCountry] = useState('US');
	const [selectedState, setState] = useState(
		reqData.selectedState || getStateObj(formData.shipping_state),
	);

	const inputChangeDesc = event => {
		setFormData({ ...formData, description: event.target.value });
	};

	const languageChange = language => {
		setLang(language);
	};

	const validateFields = value => {
		return !isValidPhoneNumber(value);
	};

	const validateForm = () => {
		const valid = [
			product.allow_customization ? !isEmpty(formData.description) : true,
			!isEmpty(formData.shipping_full_name),
			!isEmpty(formData.shipping_address_1),
			!isEmpty(formData.shipping_city),
			!isEmpty(formData.shipping_state),
			!isEmpty(formData.shipping_zip_code),
			!validateFields(formData.shipping_phone),
			...(!props.entityData.product_us_validation
				? [!isEmpty(formData.shipping_country)]
				: []),
		].every(condition => condition);
		return valid;
	};

	const { data: celebrityData } = useGetCelebrityData();
	const addToCart = useAddToLiveCart(celebrityData, 'merch', product.price, {
		id: product.numeric_id,
		title: product.title,
	});
	const inputChange = state => event => {
		addToCart();
		const {
			target: { value },
		} = event;
		setFormData({ ...formData, [state]: value });
	};

	const numberChange = number => {
		// addToCart();
		setFormData({
			...formData,
			shipping_phone: number,
		});
	};

	const onCountryChange = stateValue => {
		// addToCart();
		setFormData({
			...formData,
			shipping_country: stateValue.country_name,
			shipping_state: '',
		});
		setState({});
		setRegCountry({
			...stateValue,
			provinces: stateValue.provinces
				? stateValue.provinces.map(prov => ({ state: prov, code: prov }))
				: [],
		});
	};

	const onStateChange = stateValue => {
		setFormData({ ...formData, shipping_state: stateValue.code });
		setState(stateValue);
	};

	const countryChange = value => {
		// addToCart();
		if (value) {
			setCountry(value);
		}
	};

	const previewImage = src => () => {
		setPreview(src);
	};

	const modalClose = () => {
		setPreview(null);
	};

	const handleBlurPh = event => {
		setValidPh(isValidPhoneNumber(event.target.value));
	};

	const paymentSuccess = (optileData, zeroPay = false) => {
		// console.log(toDo)
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
				originalPrice: product?.price,
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
	const onRequestAddress = payload => {
		try {
			props.loaderAction(true);
			const req = {
				...payload,
				language: lang.id,
				product_id: product.product_id,
			};
			const method =
        reqData.resp && reqData.resp.booking ? 'request_edit' : 'request';
			const id =
        reqData.resp && reqData.resp.booking
        	? reqData.resp.booking
        	: props.starData.userData.id;
			requestProduct(method, id, req).then(resp => {
				props.loaderAction(false);
				if (resp.booking) {
					// updateLocalStore({
					//   ...payload,
					//   lang,
					//   resp,
					//   shipping_state: getStateObj(formData.shipping_state),
					//   regCountry,
					//   selectedState,
					// });
					updateBookingId(resp.booking);
					setStep(2);
				} else {
					props.updateToast({
						value: true,
						message: resp.message,
						variant: 'error',
					});
				}
			});
		} catch (e) {
			props.loaderAction(false);
			props.updateToast({
				value: true,
				message: t('common.commonApiError'),
				variant: 'error',
			});
		}
	};

	const onContinue = () => {
		if (validateForm() && isBookable) {
			onRequestAddress({ ...formData, country });
		} else {
			setFormError(true);
			if (product.allow_customization && !formData.description) {
				scrollToElem(document.getElementById('merch-title'));
			} else {
				scrollToElem(document.getElementById('formtop'));
			}
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
				rate: product.price,
			});
			callSmartLook('track', 'payment-failure', {
				optileData,
				reqData: {
					promoCode: optileData.promoCode || reqData.promoCode.code,
				},
				currencyData: props.currencyData,
				starData: props.starData,
				title: props.title,
				rate: product.price,
			});
			props.updateToast({
				value: true,
				message:
          optileData && optileData.interactionReason === 'NETWORK_FAILURE'
          	? t('common.optile_network_failure')
          	: t('common.optile_default_error'),
				variant: 'error',
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
	//       product.price,
	//     );
	//   } catch (error) {
	//     //
	//   }
	// }, []);

	useEffect(() => {
		const ph = document.getElementsByClassName(
			'react-phone-number-input__phone',
		);
		if (ph && ph[0]) ph[0].tabIndex = 7;
	}, []);

	// useEffect(() => {
	//   if (props.isLoggedIn)
	//     bookingInitiate({
	//       celebrity: props.starData.userData.id,
	//       request_type: requestTypesKeys.products,
	//       id: product.product_id,
	//     });
	// }, [props.isLoggedIn]);

	// useEffect(() => {
	//   // window.scrollTo(0, 0);
	//   if (!props.props.countryList.length) {
	//     getprops.countryList();
	//   }
	// }, []);

	// const props.countryList = useMemo(() => {
	//   function swap(x) {
	//     return x;
	//   }
	//   if (props.props.countryList.length) {
	//     const list = cloneDeep(props.props.countryList);
	//     const ind1 = list.findIndex(
	//       item => item.country_name === 'United States',
	//     );
	//     const ind2 = list.findIndex(
	//       item => item.country_name === 'Tanzania, United Republic of',
	//     );
	//     list[ind2] = swap(list[ind1], (list[ind1] = list[ind2]));
	//     return list;
	//   }
	//   return props.props.countryList;
	// }, [props.props.countryList.length]);

	const getTextInput = ({
		state,
		value,
		nativeProps,
		label,
		isValidate = true,
	}) => {
		return (
			<div className="input-wrapper">
				<Input
					inputProps={{
						nativeProps: {
							...nativeProps,
							'data-cy': state,
						},
						defaultProps: {
							value,
							onChange: inputChange(state),
							error: isValidate && formError && value === '',
						},
						labelObj: {
							label,
						},
					}}
				/>
			</div>
		);
	};

	// if (!showContent) {
	//   return null;
	// }
	useEffect(() => {
		if (props.isLoggedIn)
			bookingInitiate({
				celebrity: props.starData.userData.id,
				request_type: requestTypesKeys.products,
				id: product.product_id,
			});
	}, [props.isLoggedIn]);
	return (
		<React.Fragment>
			<FontAwesomeIcon
				icon={faChevronLeft}
				onClick={backHandler}
				className="web-back back-top"
			/>

			{step === 1 && (
				<Container>
					<Center disabled={!isBookable}>
						{product.product_image && product.product_image.length > 0 && (
							<ImageWrap>
								<FontAwesomeIcon
									icon={faExpandArrowsAlt}
									className="expand"
									onClick={previewImage(product.product_image[0])}
								/>
								<Image
									src={product.product_image[0]}
									onClick={previewImage(product.product_image[0])}
								/>
							</ImageWrap>
						)}
						<HeadingH2B id="merch-title">{product.title}</HeadingH2B>
						<RateBold>
							{getLocalSymbol()}
							{numberToDecimalWithFractionTwo(
								getLocalAmount(discount),
								false,
								false,
							)}
						</RateBold>
						<Description>{product.description}</Description>
						<SubTitle>{t('common.requestDet')}</SubTitle>
						{product.allow_customization && (
							<React.Fragment>
								<Description className="desc-sub">
									{product.customization_details}
								</Description>
								<TextArea
									autoSize
									inputProps={{
										placeholder: t('purchase_flow.merch.placeholder'),
										value: formData.description,
										onChange: inputChangeDesc,
										maxLength: 500,
									}}
									errorField={formError && formData.description === ''}
								></TextArea>
								<CharCount>
									{t('purchase_flow.char_remains', {
										length: 500 - formData.description.length,
									})}
								</CharCount>
							</React.Fragment>
						)}
						<div className="info-head" id="formtop">
							<SubTitle className="shipping-head">
								{t('purchase_flow.shipping_info')}
							</SubTitle>
							<Description className="info">
								{t('purchase_flow.merch.description')}
							</Description>
						</div>
						<div className="input-container">
							{getTextInput({
								state: 'shipping_full_name',
								value: formData.shipping_full_name,
								nativeProps: { type: 'text', maxLength: 50, tabIndex: '1' },
								label: t('common.full_name'),
							})}
							{getTextInput({
								state: 'shipping_address_1',
								value: formData.shipping_address_1,
								nativeProps: { type: 'text', tabIndex: '2' },
								label: t('common.address'),
								wrapperCls: 'empty-input',
							})}
							{getTextInput({
								state: 'shipping_address_2',
								value: formData.shipping_address_2,
								nativeProps: { type: 'text', tabIndex: '3' },
								label: t('common.address_more'),
								isValidate: false,
							})}

							{getTextInput({
								state: 'shipping_city',
								value: formData.shipping_city,
								nativeProps: { type: 'text', maxLength: 50, tabIndex: '4' },
								label: t('common.city'),
							})}
							{!props.entityData.product_us_validation ? (
								<Dropdown
									rootClass="country-drop"
									selected={regCountry}
									classes={{ list: 'drop-list' }}
									options={props.countryList}
									labelKey="country_name"
									valueKey="country_name"
									onChange={onCountryChange}
									label={t('common.country')}
									className="cus-drop"
									searchable
									nativeProps={{ type: 'text', tabIndex: '5', 'data-cy': 'country_name' }}
									inputError={formError && isEmpty(regCountry.country_name)}
								/>
							) : null}
							<div className="input-wrapper two-input">
								<Dropdown
									rootClass="state-drop"
									selected={selectedState}
									classes={{ list: 'drop-list' }}
									options={
										!props.entityData.product_us_validation
											? regCountry.provinces
											: usStates
									}
									labelKey="state"
									valueKey="code"
									onChange={onStateChange}
									label={t('common.state-province')}
									className="cus-drop"
									searchable
									nativeProps={{ type: 'text', tabIndex: '5',  'data-cy': 'state_name' }}
									inputError={formError && isEmpty(selectedState)}
								/>
								{getTextInput({
									state: 'shipping_zip_code',
									value: formData.shipping_zip_code,
									nativeProps: { type: 'text', tabIndex: '6' },
									label: props.entityData.product_us_validation
										? 'Zip Code'
										: 'Postal code',
								})}
							</div>

							<PhoneNumber
								numProps={{
									phoneRef,
									label:
                    formError && !validPh
                    	? 'Enter a valid number'
                    	: 'Phone Number',
									placeholder: '',
									value: formData.shipping_phone,
									countryChange,
									onChange: numberChange,
									onBlur: handleBlurPh,
									country,
									notValid:
                    formError && (!validPh || formData.shipping_phone === ''),
								}}
							></PhoneNumber>
						</div>
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
											rate={product.price}
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
					{preview && (
						<ImagePreview
							src={preview}
							open={preview !== null}
							onClose={modalClose}
						/>
					)}
				</Container>
			)}

			{step === 2 && (
				<Center>
					<ProductPayment
						product={product}
						hasDis={hasDis}
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
		</React.Fragment>
	);
}

ProductForm.propTypes = {
	product: PropTypes.object.isRequired,
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	loaderAction: PropTypes.func.isRequired,
	contryList: PropTypes.array.isRequired,
	updateToast: PropTypes.func.isRequired,
	backHandler: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {};

// const mapStateToProps = state => ({
//   entityData: state.entity.data,
//   props.countryList: state.commonData.props.countryList.data,
// });

// const mapDispatchToProps = dispatch => ({
//   getprops.countryList: () => dispatch(getprops.countryList()),
// });

export default ProductForm;
