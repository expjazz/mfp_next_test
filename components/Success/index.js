import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
// import { updateNotification } from 'store/shared/actions/updateNotification';
// import { setPasswordSkip } from 'store/shared/actions/siteSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-regular-svg-icons';
import { DescriptionP } from 'styles/TextStyled';
import Loader from 'components/Loader';
import NotifyUser from './components/NotifyUser';
import PasswordValidator from './components/PasswordValidator';
// import { StarContext } from '../../StarContext';
// import SharePage from '../SharePage';
// import { HeadingH2B } from '../styled';
import { Layout, Wrapper } from './styled';
import Link from 'next/link';
import { StarContext } from 'components/PageStyles/CelebrityId/PurchaseSection/StarContext';
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage';
import { HeadingH2B } from 'components/PageStyles/CelebrityId/PurchaseSection/styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';

function Success({
	successMsg,
	note,
	btnLabel,
	backHandler,
	notfSettings,
	updateNotf,
	hasPassword,
	userDataLoaded,
	history,
	setPasswordSkip,
	starDetails,
	changePassword
}) {
	const {t} = useTranslation();
	const { onPurchaseComplete } = useContext(StarContext);
	const router = useRouter();
	const [showConfirm, toggConfirm] = useState(notfSettings.mobile_notification || !notfSettings.mobile_number);
	const { data: loggedUser } = useFetchLoggedUser();
	const onPasswordSuccess = () => {
		router.push('/fan-manage');

	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// useEffect(() => {
	//   if (userDataLoaded) {
	//     toggConfirm((notfSettings.mobile_notification || notfSettings.whatsapp_notification) || !notfSettings.mobile_number);
	//   }
	// }, [userDataLoaded, notfSettings])

	useEffect(() => {
		if (userDataLoaded) {
			if ((notfSettings.mobile_notification && notfSettings.whatsapp_notification) || showConfirm) {
				onPurchaseComplete();
			}
		}
	}, [showConfirm, userDataLoaded]);


	if (showConfirm) {
		return (
			<Layout>
				<Wrapper className="success-wrp">
					{backHandler && (
						<FontAwesomeIcon
							icon={faChevronLeft}
							onClick={backHandler}
							className="web-back success-back"
						/>
					)}
					<HeadingH2B className="success-head">{successMsg}</HeadingH2B>
					<DescriptionP>{note}</DescriptionP>
					<SharePage buttonClass="share-page" btnLabel={btnLabel} />
					{
						!hasPassword &&
              <React.Fragment>
              	<PasswordValidator
              		t={t}
              		onSuccess={onPasswordSuccess}
              		changePassword={changePassword}
              	/>
              	<Link
              		href={`/${starDetails.userData.user_id}`}
              		onClick={() => {
              			setPasswordSkip(true);
              		}}
              	>
              		<a>
              			<span
              				role='presentation'
              				className='skip-wrap'
              			>
              				{t('common.skip')}
              			</span>
              		</a>
              	</Link>
              </React.Fragment>
					}
				</Wrapper>
			</Layout>
		);
	}

	else if (notfSettings.mobile_number || !notfSettings.mobile_verified) {
		return (
			<NotifyUser
				notfSettings={notfSettings}
				t={t}
				updateNotification={updateNotf}
				successMsg={successMsg}
				onSkip={() => toggConfirm(true)}
			/>
		);
	}
	return <Loader />;
}

Success.propTypes = {
	successMsg: PropTypes.string,
	notfSettings: PropTypes.object,
	note: PropTypes.string,
	btnLabel: PropTypes.string,
	backHandler: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	setPasswordSkip: PropTypes.func.isRequired,
};

Success.defaultProps = {
	successMsg: '',
	note: '',
	notfSettings: {},
	btnLabel: '',
	backHandler: false,
};

// const mapStateToProps = state => ({
//   notfSettings: state.userDetails.settings_userDetails.notification_settings,
//   hasPassword: state.userDetails.settings_userDetails.has_password,
//   userDataLoaded: state.userDetails.userDataLoaded,
// })

// const mapDispatchToProps = dispatch => ({
//   updateNotf: obj => {
//     dispatch(updateNotification(obj, true, () => {}, false));
//   },
//   setPasswordSkip: state => dispatch(setPasswordSkip(state)),
// })

export default Success;
