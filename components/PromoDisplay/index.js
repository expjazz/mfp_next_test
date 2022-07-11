import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
// import { isEmpty } from 'src/utils/dataStructures';
// import { useTranslation } from 'next-i18next';
import Button from 'components/SecondaryButton';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
// import { loaderAction } from 'store/shared/actions/commonActions';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { validatePromocode } from 'services/validatePromocode';
import CloseIcon from 'components/CloseIcon';
import Input from 'components/TextInput';
import { LinkText } from 'styles/TextStyled';
import { PromoWrap, InputWrap, PromoError, InputWrapper, Bold } from './styled';
import { useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { generalLoader, useGeneral } from 'src/context/general';
import { validatePromocode } from 'src/services/myfanpark/productActions';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';

// const getLocalAmount = value => value

const PromoDisplay = (props) => {
	const {
		rate,
		celebId,
		onSubmit,
		promoObj,
		updatePromoCode,
	} = props;
	const { t } = useTranslation();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const [state, dispatch] = useGeneral();
	const loaderAction = payload => generalLoader(dispatch, payload);
	const [promoCode, setPromoCode] = useState(!isEmpty(promoObj) ? promoObj.code : '');
	const [showEdit, toggEdit] = useState(false);
	const [promoError, setPromoError] = useState('');
	const { data: celebrityData} = useGetCelebrityData();
 	const onPromoCodeChange = event => {
		setPromoCode(event.target.value);
	};
	const getPromoDiscount = () => {
		if (!isEmpty(promoObj) && promoObj.type === 'percentage') {
			return `${numberToDecimalWithFractionTwo(promoObj.discount, false, false)}% off discount`;
		} else if (!isEmpty(promoObj)) {
			return `${getLocalSymbol()}${numberToDecimalWithFractionTwo(getLocalAmount(promoObj.discount), false, false)} off discount`;
		}
	};

	const onButtonClick = async () => {
		loaderAction(true);
		try {
			const promoResp = await validatePromocode(
				promoCode,
				rate,
				celebId,
			);
			if (promoResp.success) {
				updatePromoCode(promoResp.data.promocode);
				toggEdit(false);
				if (window.dataLayer) {
					window.dataLayer.push({
						event: 'Promo Code Set',
						promotionalCode: promoResp.data.promocode.code,
					});
				}
			}
		} catch (exception) {
			if (exception.response && exception.response.data) {
				setPromoError(exception.response.data.error?.message);
			} else {
				setPromoError(t('common.commonApiError'));
			}
		}
		loaderAction(false);
		// alert('in progress')
	};

	const clearPromo = () => {
		setPromoCode('');
		updatePromoCode({});
		toggEdit(false);
	};

	useEffect(()=>{
		if(!isEmpty(promoObj) && promoObj.id !== celebrityData?.celebrity_details?.promocode?.id){
			validatePromocode(
				promoCode,
				rate,
				celebId,
			).then((res)=>{
				if(!res.success){
					clearPromo();
				}
			}).catch(()=>{
				clearPromo();
			});
		}
	},[]);

	const renderUI = () => {
		if (showEdit) {
			return (
				<React.Fragment>
					<InputWrap>
						<InputWrapper>
							<Input
								inputProps={{
									defaultProps: {
										value: promoCode,
										onChange: onPromoCodeChange,
									},
									labelObj: {
										label: t('common.promo_code'),
									},
									nativeProps: {
										'data-cy': 'promo'
									}
								}}
							/>
							{
								!isEmpty(promoObj) &&
                  <CloseIcon
                  	className='promo-close'
                  	onClick={clearPromo}
                  />
							}
						</InputWrapper>
						<Button
							className='cta-btn'
							onClick={onButtonClick}
						>
              Add
						</Button>
					</InputWrap>
					<PromoError>{promoError}</PromoError>
				</React.Fragment>
			);
		} else if (!isEmpty(promoObj)) {
			return (
				<span>
          Promo code: {getPromoDiscount()} (<Bold>{promoObj.code}</Bold>) <LinkText onClick={() => toggEdit(true)}>Change</LinkText>
				</span>
			);
		}
		return (
			<span
				className='promo-head'
				role="presentation"
				onClick={() => toggEdit(true)}
			>
        Use a promo code
			</span>
		);
	};

	return (
		<PromoWrap className='promo-wrap'>
			{renderUI()}
		</PromoWrap>
	);
};

PromoDisplay.defaultProps = {
	onSubmit: () => {},
	promoObj: {},
	updatePromoCode: () => {}
};

PromoDisplay.propTypes = {
	rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onSubmit: PropTypes.func,
	promoObj: PropTypes.object,
	updatePromoCode: PropTypes.func,
	loaderAction: PropTypes.func.isRequired,
	celebId: PropTypes.string.isRequired,
};

export default PromoDisplay;
