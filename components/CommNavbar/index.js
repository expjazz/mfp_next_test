import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { NotificationCount } from 'styles/CommonStyled';
import Search from 'components/Search';
import { getShortName } from 'src/utils/dataToStringFormatter';
// import { setSignupFlow } from 'store/shared/actions/setSignupFlow';
// import { toggleSignup, toggleLogin } from 'store/shared/actions/toggleModals';

import {
	Widget,
	Container,
	WidgetImg,
	WidgetButton,
	StyledText,
	LinksWrapper,
	SignupWrapper,
	NavbarWrapper,
	UserPhoto,
	SearchWrap,
	LinksContainer,
} from './styled';
import { useRouter } from 'next/router';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { toggleLogin, toggleSignup, useGeneral } from 'src/context/general';
import { setSignupFlow } from 'src/context/session';
import { isVodacom } from 'customHooks/domUtils';

//   isLoggedIn: state.session.isLoggedIn,
//   userValue: state.userDetails.settings_userDetails,
//   entityData: state.entity.data,
//   celebValue: state.userDetails.settings_celebrityDetails,
//   notificationCount: state.userDetails.notificationCount,
//   isStar: state.userDetails.isStar,

const CommNavbar = () => {
	const { data: userData } = useFetchLoggedUser();
	const { data: entityData } = useGetPartner();
	const dispatch = useGeneral()[1];
	const isLoggedIn = !!userData;
	const userValue = userData?.user;
	const celebValue = userData?.celebrity_details;
	const isStar = userData?.celebrity_details && !isEmpty(userData?.celebrity_details);
	const notificationCount = userData?.notificationCount || 0;
	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const router = useRouter();
	const renderNotCount = () => {
		const notfCount = celebValue?.pending_requests_count || notificationCount;
		return notfCount ? <NotificationCount className='notf-count'>{notfCount}</NotificationCount> : null;
	};

	const renderUserPhoto = () => {
		const hasRequests = celebValue?.pending_requests_count || notificationCount;
		if (isMobile && hasRequests) {
			return renderNotCount();
		}
		return (
			<React.Fragment>
				<UserPhoto src={userValue.avatarPhoto} alt='star-pic' />
				<span className='user-name'>
					{userValue &&
          getShortName(
          	userValue.nick_name,
          	userValue.first_name,
          )}
				</span>
				{hasRequests ? renderNotCount() : null}
			</React.Fragment>
		);
	};

	const renderUser = () => {
		return (
			<React.Fragment>
				{userValue?.avatarPhoto && renderUserPhoto()}
			</React.Fragment>
		);
	};

	return (
		<Widget className="widget-section">
			<Container>
				<NavbarWrapper>
					<Link href="/" passHref>
						<WidgetImg href="/" className="widget widget-image">
							<img src={entityData?.partnerData?.logo} alt="" width="188" height="48" />
						</WidgetImg>
					</Link>
					<LinksWrapper>
						<LinksContainer>
							<Link passHref href={`/${entityData?.partnerData?.talentsUrlPrefix}/product`}>
								<WidgetButton href={`/${entityData?.partnerData?.talentsUrlPrefix}/product`}>
									<StyledText highlight={router.asPath === `/${entityData?.partnerData?.talentsUrlPrefix}/product`}>{t('common.product')}</StyledText>
								</WidgetButton>
							</Link>
							<Link href={`/${entityData?.partnerData?.talentsUrlPrefix}/pricing`}  passHref>
								<WidgetButton href={`/${entityData?.partnerData?.talentsUrlPrefix}/pricing`}>
									<StyledText highlight={router.asPath === `/${entityData?.partnerData?.talentsUrlPrefix}/pricing`}>{t('common.pricing')}</StyledText>
								</WidgetButton>
							</Link>
							<Link href={`/${entityData?.partnerData?.talentsUrlPrefix}/promotion`} passHref>

								<WidgetButton href={`/${entityData?.partnerData?.talentsUrlPrefix}/promotion`}>
									<StyledText highlight={router.asPath === `/${entityData?.partnerData?.talentsUrlPrefix}/promotion`}>{t('common.promotion')}</StyledText>
								</WidgetButton>
							</Link>
						</LinksContainer>
					</LinksWrapper>

					<SearchWrap>
						<Search
							entityData={entityData?.partnerData}
							classes={{
								root: 'search-root'
							}}
						/>
					</SearchWrap>
					<SignupWrapper onClick={() => {
						if (isLoggedIn) {
							router.push('/manage');
						}
					}}>
						{
							!isLoggedIn ?
								<React.Fragment>
									{
										!isVodacom() && (

											<WidgetButton
												href={false}
												className="bg-blue"
												onClick={() => {
													setSignupFlow(dispatch, { role: 'star' });
													toggleSignup(dispatch, true);
												}}
											>
												<StyledText>{t('common.signup')}</StyledText>
											</WidgetButton>
										)
									}
									<WidgetButton
										href={false}
										className="bg-blue"
										onClick={() => {
											toggleLogin(dispatch, true);
										}}
									>
										<StyledText>{t('common.login')}</StyledText>
									</WidgetButton>
								</React.Fragment>
								: renderUser()
						}
					</SignupWrapper>
				</NavbarWrapper>
			</Container>
		</Widget>
	);
};

// CommNavbar.defaultProps = {
//   location: {},
// }

// CommNavbar.propTypes = {
//   location: PropTypes.object,
// }

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
//   userValue: state.userDetails.settings_userDetails,
//   entityData: state.entity.data,
//   celebValue: state.userDetails.settings_celebrityDetails,
//   notificationCount: state.userDetails.notificationCount,
//   isStar: state.userDetails.isStar,
// })

// const mapDispatchToProps = dispatch => ({
//   setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
//   toggleSignup: state => dispatch(toggleSignup(state)),
//   toggleLogin: state => dispatch(toggleLogin(state)),
// })

export default CommNavbar;