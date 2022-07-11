/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
// import { useAddToLiveCart } from 'customHooks/domUtils';
// import { bookingInitiate } from 'services/request';
import { DescriptionP } from 'styles/TextStyled';
import { FlexCenter } from 'styles/CommonStyled';
import TextArea from 'components/TextArea';
import Input from 'components/TextInput';
import Button from 'components/SecondaryButton';
// import Login from 'components/Login&Signup';
import LangSelector from 'components/LangSelector';
// import { commercialBooking } from 'services/';
// import { getLocalAmount, getUSDAmount } from 'utils/currencyUtils';
import { requestTypesKeys } from 'src/constants/requestTypes';
import {
	commaToNumberFormatter,
	numberToCommaFormatter,
	numberToDecimalWithFractionTwo,
} from 'src/utils/dataformatter';
// import LoginHandler from '../../../../LoginHandler';
// import { StarContext } from '../../../../../StarContext';
// import { HeadingH2, CharCount } from '../../../../styled';
// import { SubTitle } from '../../../../../styled';
import { Container, Left } from './styled';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import { SubTitle } from 'components/PageStyles/CelebrityId/PurchaseSection/outterStyled';
import { HeadingH2, CharCount } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import LoginHandler from 'components/LoginHandler';
import { commercialBooking } from 'src/services/myfanpark/bookingActions';
import { bookingInitiate } from 'src/services/myfanpark/productActions';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';
import { useAddToLiveCart } from 'customHooks/domUtils';

const entity = value => value;
function CommercialDetails({ starData, starNM, usStates, ...props }) {
	const [getLocalSymbol, getLocalAmount, getUSDAmount] = useGetLocalAmount();

	const { t } = useTranslation();
	const [message, setMessage] = useState('');
	const [lang, setLang] = useState({});
	const [budget, setBudget] = useState('');
	const [lowBudget, setLowBudget] = useState(false);
	const { isStar } = useContext(StarContext);
	const addToCart = useAddToLiveCart(
		{ starData },
		'commercial',
		props.selected.price,
	);

	const isBookable = useGetCelebrityData()?.data?.isBookable && isCelebLocStorage();

	const messageChange = event => {
		if (event.target.value) {
			addToCart();
		}
		setMessage(event.target.value);
	};

	const budgetChange = event => {
		const pattern = getLocalSymbol();
		const target = event.target.value;
		const { length } = pattern;
		const value =
      target.length > 1
      	? target
      		.split('')
      		.filter(num => num !== ',')
      		.slice(length)
      		.join('')
      	: target;
		if (value === pattern) {
			setBudget('');
		}
		if (/^\d*\.?\d*$/.test(value)) {
			setBudget(value);
			if (
				commaToNumberFormatter(value) >=
        parseFloat(getLocalAmount(props.selected.price))
			) {
				setLowBudget(false);
			}
		}
	};

	const submitClick = () => {
		props.loaderAction(true);
		commercialBooking({
			celebrity: starData.userData.id,
			fan_request: message,
			language: lang.id,
			fan_budget: getUSDAmount(commaToNumberFormatter(budget)).toFixed(2),
			commercial_offering_id: props.selected.commercial_offering_id,
			type: 'request',
		})
			.then(resp => {
				props.loaderAction(false);
				if (resp.success) {
					props.onSuccess(resp);
				} else {
					props.updateToast({
						value: true,
						message: t('common.refresh_error'),
						variant: 'error',
						global: true
					});
				}
			})
			.catch(error => {
				props.loaderAction(false);
				let errorMsg = t('common.refresh_error');
				if (error?.response?.data?.error?.message) {
					if (error?.response?.data?.error?.message.includes('is less than the')) {
						errorMsg = `Your proposed budget is less than the minimum price of ${getLocalSymbol()} ${
							numberToDecimalWithFractionTwo(
								getLocalAmount(props.selected.price),
								false,
								false,
							)
						}  as required by the Talent`;
					} else {
						errorMsg = error?.response?.data?.error?.message;
					}
				}

				props.updateToast({
					value: true,
					message: errorMsg,
					variant: 'error',
					global: true
				});
			});
	};

	const paymentHandler = () => {
		if (
			isBookable &&
      (getLocalAmount(props.selected.price) || getLocalAmount(props.selected.price) === 0) &&
      budget &&
      parseFloat(budget) >= 2 &&
      message.trim() !== ''
		) {

			submitClick();

			// https://starsona.freshrelease.com/ws/PM/tasks/PM-3238 -
			// Removing low budget calculations
		} else {
			setLowBudget(true);
		}

	};

	const authSuccess = () => {
		if (isBookable) paymentHandler();
	};

	// useEffect(() => {
	//   if (props.isLoggedIn)
	//     bookingInitiate({
	//       celebrity: starData.userData.id,
	//       request_type: requestTypesKeys.commercial,
	//       id: null,
	//     });
	// }, [props.isLoggedIn]);

	// useEffect(() => {
	//   window.scrollTo(0, 0);
	// }, []);

	useEffect(() => {
		if (lowBudget) {
			props.updateToast({
				value: true,
				message: (
					<Trans
						i18nKey="purchase_flow.minimum_budget"
						values={{
							symbol: getLocalSymbol(),
							price: numberToDecimalWithFractionTwo(
								getLocalAmount(props.selected.price),
								false,
								false,
							),
						}}
					>
            Your minimum budget must be equivalent or higher to the base fee of
						{getLocalSymbol()}
						{numberToDecimalWithFractionTwo(
							getLocalAmount(2),
							false,
							false,
						)}{' '}
            for a commercial request.
					</Trans>
				),
				variant: 'error',
				global: true
			});
		}
	}, [lowBudget]);

	useEffect(() => {
		if (props.isLoggedIn)
			bookingInitiate({
				celebrity: starData?.userData.id,
				request_type: requestTypesKeys.commercial,
				id: null,
			});
	}, [props.isLoggedIn]);

	return (
		<>
			<FontAwesomeIcon
				icon={faChevronLeft}
				onClick={props.backHandler}
				className="web-back back-top"
			/>
			<Container>
				<Left disabled={!isBookable}>
					<HeadingH2>{`${t('common.commercial_requests')} - ${
						props.selected.title
					}`}</HeadingH2>

					<DescriptionP className="desc-sub">
						{props.selected.description}
					</DescriptionP>
					<React.Fragment>
						<SubTitle className="subtitile">{t('common.requestDet')}</SubTitle>
						<React.Fragment>
							<TextArea
								autoSize
								inputProps={{
									placeholder: t(
										'purchase_flow.commercial.commercial_request_placeholder',
									),
									value: message,
									onChange: messageChange,
									maxLength: 500,
								}}
							></TextArea>
							<CharCount>
								{t('common.char_remains', { length: 500 - message.length })}
							</CharCount>

							<DescriptionP className="desc-sub desc-pad">
								{t('purchase_flow.commercial.budget')}{' '}
								{parseFloat(props.selected.price) > 0 &&
                  t('purchase_flow.commercial.start_price', {
                  	price: `${
                  		getLocalSymbol()
                  	}${numberToDecimalWithFractionTwo(
                  		getLocalAmount(props.selected.price),
                  		false,
                  		false,
                  	)}`,
                  	starNM,
                  })
								}
							</DescriptionP>
							<Input
								inputProps={{
									nativeProps: {
										inputmode: 'numeric',
										pattern: '\\d*',
										'data-cy': 'commercialFanBudget'
									},
									defaultProps: {
										value: `${budget ? getLocalSymbol() : ''}${
											budget ? numberToCommaFormatter(budget) : ''
										}`,
										onChange: budgetChange,
									},
									rootClass: 'muiInput',
									labelObj: {
										label: t('purchase_flow.enter_budget'),
									},
								}}
							/>
							<LangSelector
								language={lang}
								starName={starData.userData.shortName}
								starDefaultLang={starData.celbData.defaultLang}
								langList={starData.celbData.languages}
								onSelectLang={setLang}
							/>
						</React.Fragment>
					</React.Fragment>
					<LoginHandler
						onComplete={paymentHandler}
					>
						{(shouldProceed, onAction) => (
							<FlexCenter className="send-btn">
								<Button
									onClick={onAction}
									disabled={!shouldProceed ||message === '' || budget === '' || !isBookable}
									isDisabled={!shouldProceed ||message === '' || budget === '' || !isBookable}
								>
									{t('common.send_request')}
								</Button>
							</FlexCenter>
						)}
					</LoginHandler>
				</Left>
			</Container>
		</>
	);
}

CommercialDetails.propTypes = {
	fanData: PropTypes.object.isRequired,
	starData: PropTypes.object.isRequired,
	loaderAction: PropTypes.func.isRequired,
	updateToast: PropTypes.func.isRequired,
	backHandler: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
};

CommercialDetails.defaultProps = {};

export default CommercialDetails;
