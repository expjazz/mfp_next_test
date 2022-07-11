import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneNumber from 'components/PhoneNumber';
import Button from 'components/SecondaryButton';
// import { updateNotification } from 'store/shared/actions/updateNotification';
import Login from 'components/Login&Signup';
import { FlexCenter } from 'styles/CommonStyled';
import { ButtonContainer, InfoWrapper } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, toggleLogin, updateToast, useGeneral } from 'src/context/general';
import { useQueryClient } from 'react-query';
import { updateNotification } from 'src/services/myfanpark/noticiationActions';
import { isVodacom } from 'customHooks/domUtils';

const LoginHandler = ({
	children,
	userDetails,
	signupClasses,
	onComplete,
}) => {
	const phoneRef = useRef(null);
	const { data: loggedUserData } = useFetchLoggedUser();
	const notfSettings = loggedUserData?.user?.notification_settings;
	const [state, dispatch] = useGeneral();
	const isLoggedIn = !!loggedUserData;
	const { data } = useGetPartner();
	const queryClient = useQueryClient();
	const [phoneCountry, setPhoneCountry] = useState(data?.partnerData.country_code || 'US');
	const [phoneData, setPhoneData] = useState({
		phNo: '',
	});
	const { t } = useTranslation();

	const countryChange = value => {
		setPhoneCountry(value);
	};

	const numberChange = number => {
		setPhoneData({
			...phoneData,
			phNo: number,
		});
	};

	const isPhoneInvalid = () => {
		if (!phoneData.phNo) {
			return false;
		}
		return !isValidPhoneNumber(phoneData.phNo) && t('common.phError');
	};

	const onContinue = () => {
		if (!notfSettings.mobile_number && !isPhoneInvalid()) {
			const codeNumber = phoneRef.current.props.metadata.countries[phoneCountry][0];
			const phoneNumber = phoneData.phNo.substring(
				codeNumber.length + 1,
				phoneData.phNo.length,
			);
			updateNotification({
				mobile_number: phoneNumber,
				mobile_country_code: codeNumber
			},
			false,
			() => {
				onComplete();
			},
			true,
			!!loggedUserData,
			payload => generalLoader(dispatch, payload),
			payload => updateToast(dispatch, payload),
			queryClient,
			loggedUserData,
			t
			);
		} else {
			onComplete();
		}
		// // onComplete()
	};


	return (
		<React.Fragment>
			{isLoggedIn && !notfSettings?.mobile_number && (
				<InfoWrapper className='login-info-wrap'>
					<span className="phone-info-head">
						{t('common.your_information')}
					</span>
					<PhoneNumber
						numProps={{
							phoneRef,
							emptyValid: true,
							label: t('common.fanSignup.optionalPhone'),
							value: phoneData.phNo,
							countryChange,
							onChange: numberChange,
							country: phoneCountry || 'US',
							notValid: isPhoneInvalid(),
						}}
					/>
				</InfoWrapper>
			)}
			{!isLoggedIn && !isVodacom() && (
				<FlexCenter className={signupClasses.root}>
					<Login
						noSocial
						noPassword
						default="signup"
						authSuccess={onComplete}
						generalLoader={payload => { generalLoader(dispatch, payload); }}
						updateToast={payload => { updateToast(dispatch, payload); }}
						guestMode
					/>
				</FlexCenter>
			)}

			{!isLoggedIn && isVodacom() && (
				<FlexCenter className={signupClasses.root}>
					<ButtonContainer>
						<Button onClick={() => toggleLogin(dispatch, {noRedirect: true})} >
            Login
						</Button>
					</ButtonContainer>
				</FlexCenter>
			)}

			{
				isLoggedIn &&
          children(
          	notfSettings.mobile_number || !isPhoneInvalid(),
          	onContinue,
          )
			}
		</React.Fragment>
	);
};

LoginHandler.defaultProps = {
	isLoggedIn: false,
	onComplete: () => {},
	notfSettings: {},
	signupClasses: {},
};

LoginHandler.propTypes = {
	isLoggedIn: PropTypes.bool,
	notfSettings: PropTypes.object,
	onComplete: PropTypes.func,
	children: PropTypes.func.isRequired,
	signupClasses: PropTypes.string,
};


export default LoginHandler;
