import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import InstaLogin from 'components/SocialLogin/InstaLogin';
// import TwitterLogin from 'components/SocialLogin/TwitterLogin';
import Login from 'components/Login';
import { Heading, Description } from 'styles/TextStyled';
import { Layout } from './styled';
import { loginUser } from 'src/services/myfanpark/loginActions';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, toggleLogin, updateToast, useGeneral } from 'src/context/general';

function LoginAll(props) {

	const { t } = useTranslation();
	const [socialData, setSocialData] = useState({});
	const [state, dispatch] = useGeneral();
	const [notCompleteSocial, setNotCompleteSocial] = useState(false);
	const [resetSuccess, setResetSuccess] = useState(false);
	const [forgot, setForgot] = useState(false);
	const reUpdateToast = payload => updateToast(dispatch, payload);
	const localGeneralLoader = payload => generalLoader(dispatch, payload);
	const [userId, setUserId] = useState('');
	const { data } = useFetchLoggedUser(userId, {
		enabled: !!userId
	});
	const loginData = () => data => {
		setSocialData(data);
		props.socialMediaLogin(
			data,
			{ preventStarLogin: true },
			true,
			props.loginSucess,
		);
	};
	const loginHandler = data => {
		if (notCompleteSocial) {
			props.socialMediaLogin(
				{ ...socialData, userName: data.email.trim() },
				{ preventStarLogin: true },
				true,
				props.loginSucess,
			);
			setSocialData({ ...socialData, userName: data.email.trim() });
		} else {

			loginUser(
				data.email.trim(),
				data.password,
				{
					preventStarLogin: true,
				},
				setUserId,
				props.loginSucess,
				reUpdateToast,
				localGeneralLoader
			);
		}
	};
	useEffect(() => {
		if (props.statusCode === '410') {
			setNotCompleteSocial(true);
		}
	}, [props.statusCode]);

	return (
		<Layout className="login-wrapper">
			<span className="info-head">
				{forgot ? t('common.forgot_passwordCap') : t('common.login_Cap')}
			</span>
			<Login
				loginHandler={loginHandler}
				setResetSuccess={setResetSuccess}
				handleNewSignup={props.handleNewSignup}
				toggleLogin={payload => toggleLogin(dispatch, payload)}
				labels={props.labels}
				notCompleteSocial={notCompleteSocial}
				error={
					props.statusCode === '410' || props.statusCode === '310'
						? t('common.fields.enterEmailContinue')
						: ''
				}
				signupSuccess={props.loginSucess}
				setForgot={() => {
					setForgot(!forgot);
				}}
				forgot={forgot}
			/>
		</Layout>
	);
}

LoginAll.propTypes = {
	handleNewSignup: PropTypes.func.isRequired,
	loginUser: PropTypes.func.isRequired,
	socialMediaLogin: PropTypes.func.isRequired,
	labels: PropTypes.object.isRequired,
	statusCode: PropTypes.string,
	noSocial: PropTypes.bool,
	loginSucess: PropTypes.oneOfType([PropTypes.func, null]),
	toggleLogin: PropTypes.func.isRequired,
};

LoginAll.defaultProps = {
	statusCode: '',
	noSocial: false,
	loginSucess: null,
};

// const mapStateToProps = state => ({
//   commonError: state.session.error.message,
//   error: state.session.incorrectError,
//   statusCode: state.session.statusCode,
// });

// const mapDispatchToProps = dispatch => ({
//   socialMediaLogin: (socialObject, options, loader, callBack) =>
//     dispatch(socialMediaLogin(socialObject, options, loader, callBack)),
//   loginUser: (email, password, loginOptions, loader, callBack) =>
//     dispatch(loginUser(email, password, loginOptions, loader, callBack)),
//   toggleLogin: (state, options) => dispatch(toggleLogin(state, options)),
// });

export default LoginAll;
