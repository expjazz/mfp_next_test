import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { ROLES } from 'src/constants/usertype';
// import InstaLogin from 'components/SocialLogin/InstaLogin';
// import TwitterLogin from 'components/SocialLogin/TwitterLogin';
import FanSignup from 'components/FanSignup';
import { Description } from 'styles/TextStyled';
import { Layout } from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { ROLES } from 'src/constants/userType';
import { useMutation, useQueryClient } from 'react-query';
import { registerUser } from 'src/services/myfanpark/loginActions';

function SignupAll(props) {
	const { data } = useGetPartner();
	const queryClient = useQueryClient();
	const signupUser = useMutation(registerUser);
	const { t, ready } = useTranslation();
	const [socialData, setSocialData] = useState({});
	const [socialSignup, setSocialSignup] = useState(false);
	const loginData = type => data => {
		setSocialSignup(true);
		setSocialData(data);
		if (window.dataLayer) {
			window.dataLayer.push({ event: type });
		}
	};
	const signupHandler = data => {
		let a = false;
		if (socialSignup && a) {
			props.socialMediaLogin(
				{ ...socialData, ...data },
				{ preventStarLogin: true },
				props.signupSuccess,
			);
			setSocialData({ ...socialData, ...data });
		} else {
			signupUser.mutate(
				[ { ...data, role: ROLES.fan, extraParams: props.guestMode ? {guest: true} : {} },

					props.signupSuccess,
					queryClient,
					null,
					props.generalLoader,
					props.updateToast
				]
			);
			// props.registerUser(
			//   { ...data, role: ROLES.fan, extraParams: props.guestMode ? {guest: true} : {} },
			//   {
			//     preventStarLogin: true,
			//   },
			//   props.signupSuccess,
			// );
		}
	};

	return (
		ready && (
			<Layout className="signup-wrapper">
				<span className="info-head">{t('common.your_information')}</span>

				<FanSignup
					signupHandler={signupHandler}
					entityData={data?.partnerData}
					handleLogin={props.handleLogin}
					socialData={socialData}
					socialSignup={socialSignup}
					fields={props.fields}
					showLogin={props.showLogin}
				/>
			</Layout>
		)
	);
}


SignupAll.defaultProps = {
	noSocial: false,
	guestMode: false,
};

// const mapStateToProps = state => ({
//   commonError: state.session.error.message,
//   error: state.session.incorrectError,
//   statusCode: state.session.statusCode,
// });

// const mapDispatchToProps = dispatch => ({
//   socialMediaLogin: (socialObject, options, loader, callBack) =>
//     dispatch(socialMediaLogin(socialObject, options, true, callBack)),
//   registerUser: (registerData, loader, callBack) =>
//     dispatch(registerUser(registerData, true, callBack)),
// });

export default SignupAll;

// {!props.noSocial && (
//   <React.Fragment>
//     <div className="social-wrapper">
//       <FbLogin loginData={loginData('Facebook Signup')} />
//       <GoogleLogin loginData={loginData('Google Signup')} />
//       {/* <InstaLogin loginData={loginData('Instagram Signup')} />
//       <TwitterLogin loginData={loginData('Twitter Signup')} /> */}
//     </div>
//     <Description className="or-text">{t('common.or')}</Description>
//   </React.Fragment>
// )}