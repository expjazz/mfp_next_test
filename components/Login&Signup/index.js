/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'next-i18next';
// import { updateToast } from 'store/shared/actions/commonActions';
import LoginAll from 'components/LoginAll';
import SignupAll from 'components/SignupAll';
import Button from 'components/SecondaryButton';
import { updateToast, useGeneral } from 'src/context/general';

function Login(props) {
	const { t } = useTranslation();
	const [loginSignup, setLoginSignup] = useState(props.default);
	const dispatch = useGeneral()[1];
	const triggerLoginSignup = value => () => {
		if (props.triggerLogin) props.triggerLogin();
		setLoginSignup(value);
	};
	const localUpdateToast = payload => updateToast(dispatch, payload);
	const signupSuccess = () => {
		if (props.authSuccess) props.authSuccess();
		localUpdateToast({
			value: false,
			message: '',
			variant: '',
			global: true,
		});
	};

	const getLogin = () => {
		return (
			<React.Fragment>
				{loginSignup === '' && (
					<div className="login-btns">
						<Trans
							i18nKey="common.createOrLogin"
							values={{
								create: t('common.createAccount'),
								login: t('common.login'),
							}}
						>
							<Button secondary onClick={triggerLoginSignup('signup')}>
                Create account
							</Button>
							<span className="or-text">or</span>
							<Button secondary onClick={triggerLoginSignup('login')}>
                Log in
							</Button>
						</Trans>
					</div>
				)}

				{loginSignup === 'login' && (
					<LoginAll
						handleNewSignup={triggerLoginSignup('signup')}
						labels={{
							email: t('common.fields.whatEmail'),
							passwd: t('common.fields.whatPassword'),
							buttonLbl: t('common.login'),
							emailErr: t('common.emailError'),
							passwdErr: t('common.passwordValid.invalidShort'),
						}}
						noSocial={props.noSocial}
						noPassword={props.noPassword}
						loginSucess={signupSuccess}
					></LoginAll>
				)}

				{loginSignup === 'signup' && (
					<SignupAll
						handleLogin={triggerLoginSignup('login')}
						noSocial={props.noSocial}
						signupSuccess={signupSuccess}
						updateToast={localUpdateToast}
						generalLoader={props.generalLoader}
						showLogin
						guestMode={props.guestMode}
						{
							...props.guestMode ? {
								fields: {
									phone: {
										heading: t('whatsapp_head')
									},
									firstName: {required: true},
									email: {required: true},
									lastName: {required: true},
								}
							}: {}
						}
					></SignupAll>
				)}
			</React.Fragment>
		);
	};
	return getLogin();
}

Login.propTypes = {
	triggerLogin: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	default: PropTypes.string,
	noSocial: PropTypes.bool,
	guestMode: PropTypes.bool,
	noPassword: PropTypes.bool,
};

Login.defaultProps = {
	triggerLogin: false,
	default: '',
	guestMode: false,
	noSocial: false,
	noPassword: false,
};

export default Login;
