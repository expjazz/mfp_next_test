import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
// import { useMedia } from 'customHooks/domUtils';
// import forgotPassword from 'src/utils/forgotPassword';
// import Api from 'lib/api';
import Input from 'components/TextInput';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import { validateEmail } from 'src/utils/dataformatter';
import { LinkText, Heading, Description } from 'styles/TextStyled';
import { Layout } from './styled';
import Api from 'src/lib/api';
import { useMediaQuery } from '@material-ui/core';
import { isEmpty } from 'src/utils/dataStructures';
import forgotPassword from 'src/utils/forgotPassword';

function Login(props) {
	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [formData, updateFormData] = useState({
		email: '',
		password: '',
	});

	const [forgotMail, setForgotMail] = useState('');
	const [forgotMailErr, setForgotMailErr] = useState('');
	const [resetSucess, setResetSuccess] = useState(false);

	const [errorObject, updateErrorObj] = useState({
		emailErr: false,
		passwdErr: false,
	});

	// tst
	const toggleLogin = () => {
		props.toggleLogin({active: true, options: {
			noRedirect: true,
			onSuccess: props.signupSuccess,
		}});
	};

	const validatePassword = value => {
		if (!isEmpty(value)) {
			return false;
		}
		return true;
	};

	const validateMail = value => {
		return validateEmail(value);
	};

	const validateFields = (value, errorState, fn) => {
		updateErrorObj({
			...errorObject,
			[errorState]: value ? fn(value) : false,
		});
	};

	const handleBlur = ({ errorState, state, value }) => {
		let fn = validatePassword;
		if (state === 'email') {
			fn = validateMail;
		}
		validateFields(value, errorState, fn);
	};

	const inputChange = ({ state, errorState }) => event => {
		updateFormData({
			...formData,
			[state]: event.target.value,
		});
		handleBlur({ state, errorState, value: event.target.value });
	};

	const triggerSave = () => {
		if (
			!validateEmail(formData.email) &&
      (!validatePassword(formData.password) || props.notCompleteSocial)
		) {
			props.loginHandler(formData);
		} else {
			updateErrorObj({
				emailErr: validateMail(formData.email),
				passwdErr: validatePassword(formData.password),
			});
		}
	};

	const forgotPasswd = () => {
		props.setForgot();
	};

	const inputChangeForgot = event => {
		setForgotMail(event.target.value);
	};

	const resetLogin = () => {
		forgotPassword(Api.forgotPassword, { email: forgotMail })
			.then(() => {
				setResetSuccess(true);
				props.setResetSuccess(true);
			})
			.catch(exception => {
				setForgotMailErr(exception.response.data.error.message);
			});
	};
	const resetLoginTrigger = () => {
		props.setForgot();
		setResetSuccess(false);
		props.setResetSuccess(false);
	};

	// eslint-disable-next-line react/prop-types
	const getInput = ({ label, state, value, errorState, error, type }) => {
		return (
			<section className="inputWrapper">
				<Input
					inputProps={{
						defaultProps: {
							value,
							onChange: inputChange({ state, errorState }),
							type,
							error: errorObject[errorState],
						},
						labelObj: {
							label: errorObject[errorState] && isMobile ? '' : label,
							errorMsg: error,
						},
					}}
				/>
			</section>
		);
	};

	return (
		<Layout className="login-container">
			{!props.forgot && (
				<React.Fragment>
					{props.notCompleteSocial && props.error && (
						<span className="error-msg social-error">{props.error}</span>
					)}

					{getInput({
						label: props.labels.email,
						state: 'email',
						value: formData.email,
						error: props.labels.emailErr,
						errorState: 'emailErr',
						labelCls: 'custom-label',
						type: 'text',
					})}
					{!props.notCompleteSocial &&
            getInput({
            	label: props.labels.passwd,
            	state: 'password',
            	value: formData.password,
            	error: props.labels.passwdErr,
            	errorState: 'passwdErr',
            	type: 'password',
            })}

					<FlexCenter className="btn-wrapper">
						<Button onClick={triggerSave}>
							{props.notCompleteSocial ? 'Continue' : props.labels.buttonLbl}
						</Button>
						<span>
							<LinkText onClick={forgotPasswd} className="links">
								{t('common.passwordValid.forgot')}
							</LinkText>
							<span className="bar"> | </span>
							<LinkText onClick={props.handleNewSignup} className="links">
								{t('common.createAccount')}
							</LinkText>
						</span>
						<span
							className="links social_link"
							onClick={toggleLogin}
							role="presentation"
						>
							{t('common.loginviafb')}
						</span>
					</FlexCenter>
				</React.Fragment>
			)}
			{props.forgot && (
				<React.Fragment>
					{!resetSucess && (
						<div className="reset-wrp">
							<Input
								inputProps={{
									defaultProps: {
										value: forgotMail,
										onChange: inputChangeForgot,
										error: !isEmpty(forgotMailErr),
									},
									labelObj: {
										label: t('common.forgotPassword.emailLabel'),
									},
								}}
							/>
							{!isEmpty(forgotMailErr) && (
								<span className="error-msg">{forgotMailErr}</span>
							)}
							<FlexCenter className="btn-wrapper">
								<Button
									disabled={validateEmail(forgotMail)}
									isDisabled={validateEmail(forgotMail)}
									onClick={resetLogin}
								>
									{t('common.continue')}
								</Button>
								<LinkText onClick={resetLoginTrigger}>
									{t('common.log_in')}
								</LinkText>
							</FlexCenter>
						</div>
					)}
					{resetSucess && (
						<React.Fragment>
							<Heading className="heading">
								{t('common.forgotPassword.passwordResetHead')}
							</Heading>
							<Description className="reset-msg">
								{t('common.forgotPassword.passwordResetContent')}
							</Description>
							<FlexCenter className="forgot-btn">
								<Button onClick={resetLoginTrigger}>{t('common.login')}</Button>
							</FlexCenter>
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</Layout>
	);
}

Login.defaultProps = {
	notCompleteSocial: false,
	error: '',
};

export default Login;
