import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import { DescriptionP } from 'styles/TextStyled';
import Dropdown from 'components/Dropdown';
import RequestTemplates from 'components/RequestTemplates';
import TextArea from 'components/TextArea';
// import { requestTypesKeys } from 'src/constants/requestTypes';
import Checkbox from 'components/Checkbox';
import LangSelector from 'components/LangSelector';
import PromoDisplay from 'components/PromoDisplay';
import { FlexCenter } from 'styles/CommonStyled';
// import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import {
	getDiscount,
	hasDiscount,
	getDiscountedPrice,
} from 'src/utils/paymentUtils';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { setCheckoutProgressEcGa } from 'utils/ga';
import Button from 'components/SecondaryButton';
import Payment from '../Payment';
// import LoginHandler from '../../../../LoginHandler';
import { HeadingH2, CharCount } from '../../../../styled';
// import { StarContext } from '../../../../../StarContext';
import {
	SubTitle,
	RateBold,
	PromoWrap,
	CharityText,
} from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { Container, Center, FormWrap } from '../styled';
import { useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { audioRecordHandler, clearAll, editGeneralState, resetRecording, updateBookingData, useGeneral } from 'src/context/general';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { useRouter } from 'next/router';
import { useFetchOccasions, useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import LoginHandler from 'components/LoginHandler';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useGetLocalAmount, useCurrencyData } from 'customHooks/currencyUtils';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import { zeroPayBooking } from 'src/services/myfanpark/bookingActions';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';

const validationFields = {
	1: ['hostName'],
	2: ['hostName', 'specification'],
	3: ['hostName', 'specification'],
	4: ['hostName', 'specification'],
	5: ['hostName', 'specification'],
	6: ['specification'],
	7: ['specification'],
	8: ['hostName'],
};

const entity = value => value;
function Form(props) {
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const localCurrency = useCurrencyData();
	const { data: entityData } = useGetPartner();
	const { data: fanData } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const [state, dispatch] = useGeneral();
	const { bookingData } = state.purchaseFlow;
	const { data: occList } = useFetchOccasions(props.partnerData.entityId, props.title === 'shoutout' ? 1 : 2);
	const optionsList = [...occList.popOccasions, ...occList.occasions].map(item => ({
		label: item.title,
		key: item.id,
	}));
	// const updateBookingData = bookingData => {
	//   editGeneralState(dispatch, { payload: { ...state.purchaseFlow, bookingData, }, key: 'purchaseFlow' })
	// }
	// const audioRecordHandler = audioFlags => {
	//   editGeneralState(dispatch, { payload: { ...state.commonReducer, audioFlags, }, key: 'commonReducer' })
	// }
	// const resetRecording = key => {
	//   const temp = { ...state.audioRecorder.recorded  }
	//   temp[key] = null
	//   editGeneralState(dispatch, { paylaod: { recorded: { ...temp } } })
	// }
	const { t } = useTranslation();
	const { occasions = [], popularOccasions = [] } = { ...props };
	const [FormData, setFormData] = useState(() => {
		if (!isLoggedIn) {
			return bookingData;
		} else {
			return {
				...bookingData,
				// user: 'Myself',
				userName: fanData?.user?.first_name
			};
		}
	});
	// useEffect(() => {
	//   if (isLoggedIn) {
	//     setFormData({
	//       ...FormData,
	//       user: 'Myself',
	//       userName: fanData?.user?.first_name
	//     })
	//   }
	// }, [isLoggedIn])
	const [otherSelected, setOtherSelected] = useState(
		bookingData.otherSelected,
	);
	const [formError, validateForm] = useState(true);
	const [lang, setLang] = useState({});
	const isBookable = useGetCelebrityData()?.data?.isBookable && isCelebLocStorage();
	const { promoCode, updatePromoCode, scrollToElem } = useContext(
		StarContext,
	);

	const hasDis = hasDiscount(
		'Video shoutouts',
		props.starData.celbData.discount,
	);

	const discount = useMemo(() => {
		const amount = hasDis
			? getDiscountedPrice(
				'Video shoutouts',
				props.starData.celbData.discount,
				props.starData.celbData.rate,
			)
			: getDiscount(
				requestTypesKeys.shoutout,
				promoCode,
				props.starData.celbData.rate,
			);
		return amount || amount === 0 ? amount : props.starData.celbData.rate;
	}, [props.starData.celbData.rate, promoCode]);
	const getTemp = occasion => {
		return {
			user: 'someoneElse',
			enableAudioRecorder: false,
			hostName: '',
			userName: '',
			relationshipValue: '',
			specification: '',
			date: null,
			eventName: '',
			validSelf: false,
			requestId: '',
			occasion,
			importantInfo: '',
			scriptText: '',
		};
	};

	const getRelationAndType = occasion => {
		let type = null;
		let result = [];
		if (occasion.key !== 18 && occasion.label !== 'Other') {
			result = [...occList.popOccasions, ...occList.occasions].filter(item => {
				if (item.id === occasion.key) {
					type = item.template_type;
					return item;
				}
				return {};
			});
			setOtherSelected(false);
		} else {
			setOtherSelected(true);
		}
		let relations = [];
		const curObj = result.find(relation => relation.id === occasion.key);
		if (curObj && curObj.relationships && curObj.relationships.length > 0) {
			relations = curObj.relationships;
		}
		return { templateType: type, relationship: relations };
	};

	const onSelectOccasion = occasion => {
		const relationAndTypeObj = getRelationAndType(occasion);
		setFormData({
			...FormData,
			...relationAndTypeObj,
			...getTemp(occasion),
			...(isLoggedIn ? {
				// user: 'Myself',
				userName: fanData?.user?.first_name
			} : {})
		});
		updateBookingData(dispatch, {
			...relationAndTypeObj,
			...getTemp(occasion),
			...(isLoggedIn ? {
				// user: 'Myself',
				userName: fanData?.user?.first_name
			} : {})
		});

		clearAll(dispatch);
		audioRecordHandler(dispatch, { recording: false, playing: false });
		validateForm(true);
	};

	const handleInputChange = (data, type) => {
		setFormData({
			...FormData,
			enableAudioRecorder: true,
			[type]: data,
		});
		updateBookingData(dispatch, {
			...bookingData,
			...FormData,
			otherSelected: Boolean(type === 'scriptText' && data),
			[type]: data,
		});
		if (type === 'hostName') {
			resetRecording(dispatch, 'for');
		} else if (type === 'userName') {
			resetRecording(dispatch, 'from');
		}
	};

	const infoChange = ({ target: { value } }) => {
		handleInputChange(value, 'importantInfo');
	};

	const getScript = ({ target: { value } }) => {
		handleInputChange(value, 'scriptText');
	};

	const updateUserToMyself = () => {
		const temp = {
			...FormData,
			user: 'Myself',
			enableAudioRecorder: true,
			hostName: fanData?.user.first_name || 'YOU',
			validSelf: true,
			userName: '',
			relationshipValue: '',
			specification: '',
			date: null,
			eventName: '',
			relationship: [],
			importantInfo: '',
			scriptText: '',
		};
		setFormData({
			...temp,
		});
		clearAll(dispatch);
		audioRecordHandler(dispatch, { recording: false, playing: false });
		updateBookingData(dispatch, {
			...temp,
		});
	};

	useEffect(() => {
		if (isLoggedIn && FormData?.hostName === 'YOU') {
			const temp = {
				...FormData,
				hostName: fanData?.user.first_name
			};
			setFormData(temp);
			updateBookingData(dispatch, {
				...temp,
			});
		}
	}, [isLoggedIn]);

	const validateFields = fields => {
		return fields.every(condition => condition);
	};

	const validateOnMyself = () => {
		const { hostName, specification, templateType } = {
			...FormData,
		};
		if ([1, 8].includes(templateType)) {
			return validateFields([hostName !== '']);
		} else if ([2, 3, 4, 5].includes(templateType)) {
			return validateFields([hostName !== '', specification !== '']);
		} else if ([6, 7].includes(templateType)) {
			return validateFields([specification !== '']);
		}
		return false;
	};

	const validateOnSomeoneElse = () => {
		const { hostName, specification, templateType } = {
			...FormData,
		};
		if ([1, 8].includes(templateType)) {
			return validateFields([hostName !== '']);
		} else if ([2, 3, 4, 5].includes(templateType)) {
			return validateFields([hostName !== '', specification !== '']);
		} else if ([6, 7].includes(templateType)) {
			return validateFields([specification !== '']);
		}
		return false;
	};

	const onContinue = (validate = true) => {
		if (!isEmpty(FormData.occasion) && otherSelected && validate) {
			if (FormData.scriptText !== '') {
				props.onSubmit({ lang, promoCode, discount });
			} else {
				validateForm(false);
				scrollToElem(document.getElementById('formtop'));
			}
		} else if (FormData.templateType) {
			let isValid = true;
			if (FormData.user === 'Myself') {
				isValid = validateOnMyself();
				if (isValid) {
					props.onSubmit({ lang, promoCode, discount });
				} else if (validate) {
					validateForm(isValid);
					scrollToElem(document.getElementById('formtop'));
				}
			} else if (FormData.user === 'someoneElse') {
				isValid = validateOnSomeoneElse();
				if (isValid) {
					props.onSubmit({ lang, promoCode, discount });
				} else if (validate) {
					validateForm(isValid);
					scrollToElem(document.getElementById('formtop'));
				}
			}
		}
	};

	const zeroPayment = bookingID => {
		zeroPayBooking(
			{
				amount: discount,
				reference: bookingID,
				promoCode: promoCode.code,
				originalPrice: props.starData.celbData.rate,
				currency: localCurrency?.abbr,
				localAmount: numberToDecimalWithFractionTwo(
					getLocalAmount(discount),
					false,
					false,
				)
			},
			dispatch,
			fanData?.user.authentication_token
		).then(bool => {
			if (bool) {
				router.push(`/${router.query?.celebrityId}/thankyou?zero_pay=true`);
			}
		});
	};
	const onSelectLang = language => {
		setLang(language);
	};

	const handleCheck = checked => {
		editGeneralState(dispatch, { payload: { ...state.purchaseFlow, bookingData: { ...bookingData, privateVideo: checked } }, key: 'purchaseFlow' });
	};

	const { data: celebrityData } = useGetCelebrityData();

	const addToCart = useAddToLiveCart(
		celebrityData,
		'announcement',
		celebrityData?.celebrity_details.discount || null,
	);

	useEffect(() => {
		if (isLoggedIn)
			bookingInitiate({
				celebrity: props.starData.userData.id,
				request_type: router.asPath.includes('event') ? requestTypesKeys.event: requestTypesKeys.shoutout,
				id: null,
			});
	}, [isLoggedIn]);

	useEffect(() => {
		validateOnMyself();
	}, [FormData.validSelf]);

	// useEffect(() => {
	//   try {
	//     setCheckoutProgressEcGa(
	//       {
	//         userDetails: props.starData.userData,
	//         celebDetails: props.starData.celbData,
	//       },
	//       1,
	//       props.starData.celbData.rate,
	//     );
	//   } catch (error) {
	//     //
	//   }
	// }, []);

	useEffect(() => {
		if (bookingData.resp && bookingData.resp.booking) {
			setFormData(bookingData);
			setLang(bookingData.language);
			setOtherSelected(bookingData.otherSelected);
		}
	}, [bookingData.resp]);


	const onDropListRender = (list, remProps) => {
		// occList.popOccasions, ...occList.occasions
		return (
			<React.Fragment>
				{list.map((item, index) => {
					return (
						<React.Fragment key={item.value}>
							{occList.popOccasions.length > 0 && index === 0 && (
								<li className="dropdown-heading">
									{t('purchase_flow.most_popular')}
								</li>
							)}
							{occList.occasions.length > 0 && occList.popOccasions.length === index && (
								<li className="dropdown-heading">
									{t('purchase_flow.more_occassions')}
								</li>
							)}
							<remProps.Component
								tabIndex="0"
								className={`droplist-item ${occList.popOccasions.length &&
                  index === occList.popOccasions.length - 1 &&
                  'occasion-divider'}`}
								onClick={remProps.onClick(item)}
								onKeyUp={remProps.onKeyUp(item)}
								key={item.value}
							>
								{item.label}
							</remProps.Component>
						</React.Fragment>
					);
				})}
			</React.Fragment>
		);
	};
	const router = useRouter();
	const title = router.asPath.includes('event') ? t('purchase_flow.announcement.title') : t('purchase_flow.shoutout.title');
	const description = router.asPath.includes('event') ? t('purchase_flow.description.title') : t('purchase_flow.description.title');

	return (
		<Container>
			{props.step === 1 && (
				<Center disabled={!isBookable}>
					<HeadingH2>{title}</HeadingH2>
					<RateBold>
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(discount),
							false,
							false,
						)}
					</RateBold>
					<DescriptionP id="formtop">
						{t('purchase_flow.shoutout.description', {
							purchaserPlural: entityData?.partnerData.talent_plural_name,
						})}
					</DescriptionP>
					<SubTitle>{t('common.requestDet')}</SubTitle>
					<Dropdown
						options={optionsList}
						selected={FormData.occasion}
						labelKey="label"
						valueKey="key"
						placeHolder={t('purchase_flow.announcement.what_occassion')}
						className="custom"
						listRender={onDropListRender}
						classes={{ scrollbar: 'scroll-wrap', list: 'drop-list' }}
						onChange={occasion => onSelectOccasion(occasion)}
					/>

					<FormWrap>
						{!isEmpty(FormData.occasion) && !otherSelected && (
							<React.Fragment>
								<RequestTemplates
									templateType={FormData.templateType}
									bookingData={FormData}
									t={t}
									audioRecorder={props.audioRecorder}
									saveAudioRecording={props.saveAudioRecording}
									resetRecording={resetRecording}
									handleInputChange={handleInputChange}
									updateUserToMyself={updateUserToMyself}
									occasion={FormData.occasion.key}
									occasionName={FormData.occasion.label}
									formError={!formError}
									validationFields={validationFields[FormData.templateType]}
								/>
							</React.Fragment>
						)}
						{otherSelected && (
							<React.Fragment>
								<TextArea
									autoSize
									inputProps={{
										placeholder: t('purchase_flow.shoutout.enter_script'),
										rows: '5',
										value: FormData.scriptText,
										onChange: getScript,
										className: 'other-text',
										maxLength: 350,
									}}
									errorField={!formError}
								></TextArea>
								<CharCount>
									{t('purchase_flow.char_remains', {
										length: 350 - FormData.scriptText.length,
									})}
								</CharCount>
							</React.Fragment>
						)}

						{!isEmpty(FormData.occasion) && !otherSelected && (
							<React.Fragment>
								<TextArea
									autoSize
									inputProps={{
										className: 'text-area',
										placeholder: t('purchase_flow.shoutout.add_info', {
											talentSingle: entityData?.partnerData.talent_singular_name,
										}),
										maxLength: 350,
										value: FormData.importantInfo,
										onChange: infoChange,
									}}
								></TextArea>
								<CharCount>
									{t('purchase_flow.char_remains', {
										length: 350 - FormData.importantInfo.length,
									})}
								</CharCount>
							</React.Fragment>
						)}
						<LangSelector
							language={lang}
							onSelectLang={onSelectLang}
							starName={props.starData.userData.shortName}
							starDefaultLang={props.starData.celbData.languages.find(lang => lang.default)}
							langList={props.starData.celbData.languages}
						/>
						<Checkbox
							className="check-prvt"
							placeholder={t('purchase_flow.announcement.video_private')}
							onChange={handleCheck}
							checked={bookingData.privateVideo}
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
											rate={props.starData.celbData.rate}
											celebId={props.starData.userData.id}
											promoObj={promoCode}
											updatePromoCode={updatePromoCode}
										/>
									)}
								</PromoWrap>
							) : null}
					</FormWrap>
					<LoginHandler onComplete={onContinue}>
						{(shouldProceed, onAction) => (
							<FlexCenter className="btn-wrp">
								<Button
									disabled={
										!shouldProceed || isEmpty(FormData.occasion) || !isBookable
									}
									isDisabled={
										!shouldProceed || isEmpty(FormData.occasion) || !isBookable
									}
									onClick={onAction}
								>
									{t('common.next')}
								</Button>
							</FlexCenter>
						)}
					</LoginHandler>
				</Center>
			)}
			{props.step === 2 && (
				<Center>
					<Payment
						{...props}
						hasDis={hasDis}
						formData={FormData}
						promoDet={promoCode}
						finalPrice={discount}
						lang={lang}
						zeroPayment={zeroPayment}
						onOptileFail={props.setStep}
						isLoggedIn={!!fanData}
					/>
				</Center>
			)}
		</Container>
	);
}

Form.propTypes = {
	starData: PropTypes.object.isRequired,
	bookingData: PropTypes.object.isRequired,
	audioRecorder: PropTypes.object.isRequired,
	updateBookingData: PropTypes.func.isRequired,
	clearAll: PropTypes.func.isRequired,
	saveAudioRecording: PropTypes.func.isRequired,
	onContinue: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	step: PropTypes.number.isRequired,
	promoDetails: PropTypes.object,
	zeroPayment: PropTypes.func.isRequired,
	bookingId: PropTypes.string,
	setStep: PropTypes.func.isRequired,
};

Form.defaultProps = {
	promoDetails: {},
	bookingId: '',
};

export default Form;

// {/* <LoginHandler onComplete={onContinue}>
// {(shouldProceed, onAction) => (
//   <FlexCenter className="btn-wrp">
//     <Button
//       disabled={
//         !shouldProceed || isEmpty(FormData.occasion) || !isBookable
//       }
//       isDisabled={
//         !shouldProceed || isEmpty(FormData.occasion) || !isBookable
//       }
//       onClick={onAction}
//     >
//       {t('common.next')}
//     </Button>
//   </FlexCenter>
// )}
// </LoginHandler> */}