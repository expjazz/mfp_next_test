import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import fitty from 'fitty';
// import { getShortName } from 'src/utils/dataToStringFormatter';
// import { isEmpty } from 'src/utils/dataStructures';
import Button from '../../../../SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { NotificationCount } from 'styles/CommonStyled';
// import { useMedia } from 'customHooks/domUtils';
// import { toggleLogin } from 'store/shared/actions/toggleModals';
import { faBars, faUserCircle, faChevronLeft } from '@fortawesome/pro-light-svg-icons';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons';
// import CategorySection from './components/CategorySection';
// import PersonalDrawer from 'components/PersonalDrawer';
import { HeadWrap, UserDet, MenuWrap, UserName, UserPhoto, ActionHead } from './styled';
import { useMediaQuery } from '@material-ui/core';
// import { NotificationCount } from '../../../../styles/CommonStyled';
import { isEmpty } from '../../../../../src/utils/dataStructures';
import { getInititals, getShortName } from '../../../../../src/utils/dataToStringFormatter';
import { useTranslation } from 'next-i18next';
import { NotificationCount } from '../../../../../styles/CommonStyled';
import { useRouter } from 'next/router';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { getAvtar } from '../../PurchaseSection/utils';
import { toggleLogin, useGeneral } from 'src/context/general';
import dynamic from 'next/dynamic';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import ContactInitials from 'components/ContactInitials';
import { isVodacom } from 'customHooks/domUtils';

const CategorySection = dynamic(() => import('./components/CategorySection'));


const StarHeader = (props) => {
	const {
		userValue,
		// isLoggedIn,
		hasActionHead,
		showSticky,
		forwardRef,
		history,
		celebDetails,
		editMode,
		onBack,
		toggleEditMode,
		digitalGoodsList,
		notificationCount,
		celebValue,
	} = props;
	const isMobile = useMediaQuery('(max-width: 1279px)');
	const { data: star } = useGetCelebrityData();
	const userDetails = star?.user;
	const [showDrawer, toggDrawer] = useState(false);
	const { data: loggedUser, isStar } = useFetchLoggedUser();
	const [_, dispatch] = useGeneral();
	const isLoggedIn = !!loggedUser;
	const router = useRouter();
	const renderNotCount = () => {
		const notfCount =
      loggedUser?.celebrity_details?.pending_requests_count || notificationCount;
		return notfCount ? (
			<NotificationCount className="notf-count">{notfCount}</NotificationCount>
		) : null;
	};

	const renderUserPhoto = () => {
		const hasRequests =
    loggedUser?.celebrity_details?.pending_requests_count || notificationCount;
		if (isMobile && hasRequests) {
			return renderNotCount();
		}
		return <UserPhoto src={getAvtar(loggedUser.user.avatar_photo)} alt="star-pic" />;
	};

	const autoFitText = () => {
		try {
			if (document.getElementById(`header-name-${userDetails.id}`)) {
				fitty(`#header-name-${userDetails.id}`, {
					minSize: 10,
					maxSize: 21,
				});
			}
		} catch (e) {}
	};

	const onDetClick = () => {
		if (!isLoggedIn) {
			toggleLogin(dispatch, { active: true, options: { noRedirect: true } });
		} else {
			router.push(isStar ? '/manage' : '/fan-manage');
		}
	};

	useEffect(() => {
		document.fonts.ready.then(() => {
			autoFitText();
		});
		autoFitText();
	}, [userDetails?.starName, showSticky, onBack]);
	const { t } = useTranslation();
	const handleProfilePhoto = () => {
		if (isLoggedIn && isVodacom() && !loggedUser?.user.avatar_photo) {
			return <ContactInitials>
				{getInititals(loggedUser.user.first_name, loggedUser.user.last_name)}
			</ContactInitials>;
		}
		return isLoggedIn && loggedUser?.user.avatar_photo ? (
			renderUserPhoto()
		) : (
			<FontAwesomeIcon className="circle-icon" icon={faUserCircle} />
		);
	};
	return (
		<React.Fragment>
			{hasActionHead && (
				<ActionHead>
					<span
						className="back-lbl-wrp"
						onClick={() => router.push('/manage')}
						role="presentation"
					>
						<FontAwesomeIcon icon={faArrowLeft} className="back-icon" />{' '}
						<span className="back-label">{t('common.menu')}</span>
					</span>
					<Button className="action-btn" onClick={toggleEditMode}>
						{editMode ? t('star_profile.viewProfile') : t('common.edit')}
					</Button>
				</ActionHead>
			)}
			<HeadWrap
				itemprop=""
				itemtype="http://schema.org/WPHeader"
				role="header"
				className="star-header"
				ref={forwardRef}
				showSticky={showSticky}
				hasActionHead={hasActionHead}
				hasDiscount={!isEmpty(celebDetails.discount) || !isEmpty(celebDetails?.promocode)}
			>
				{/* {showDrawer && isMobile && (
          <PersonalDrawer
            userDetails={userDetails}
            celebDetails={celebDetails}
            digitalGoodsList={digitalGoodsList}
            onClose={() => toggDrawer(false)}
          />
        )} */}
				{showDrawer && isMobile && (
					<CategorySection
						dynamicFilters={props.dynamicFilters}
						professions={props.professionsList}
						entityData={props.entityData}
						entity={props.entity}
						handleBackClick={() => toggDrawer(false)}
					/>
				)}
				<span className='nav-wrap'>
					{
						onBack &&
              <FontAwesomeIcon
              	icon={faChevronLeft}
              	onClick={() => router.back()}
              	className="back-btn"
              />
					}
					<MenuWrap className='ham-wrap'>
						<FontAwesomeIcon
							className="ham-icon"
							icon={faBars}
							onClick={() => toggDrawer(true)}
						/>
					</MenuWrap>
				</span>
				{showSticky && (
					<span className="head-name" id={`header-name-${userDetails.user_id}`}>
						{userDetails.starName}
					</span>
				)}
				<UserDet onClick={onDetClick}>
					{handleProfilePhoto()}
					{isLoggedIn && !isMobile && (
						<React.Fragment>
							<UserName>
								{getShortName(loggedUser.user.nick_name, loggedUser.user.first_name)}
							</UserName>
							{renderNotCount()}
						</React.Fragment>
					)}
				</UserDet>
			</HeadWrap>
		</React.Fragment>
	);
};

StarHeader.defaultProps = {
	userDetails: {},
	celebDetails: {},
};

StarHeader.propTypes = {
	userValue: PropTypes.object.isRequired,
	celebValue: PropTypes.object.isRequired,
	isLoggedIn: PropTypes.bool.isRequired,
	userDetails: PropTypes.object,
	isStar: PropTypes.bool.isRequired,
	celebDetails: PropTypes.object,
	history: PropTypes.object.isRequired,
	toggleLogin: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
//   userValue: state.userDetails.settings_userDetails,
//   notificationCount: state.userDetails.notificationCount,
//   celebValue: state.userDetails.settings_celebrityDetails,
//   isStar: state.userDetails.isStar,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleLogin: state => dispatch(toggleLogin(state)),
// });

export default StarHeader;
