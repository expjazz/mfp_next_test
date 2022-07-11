import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
	faQuestionCircle,
	faStar,
	faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import { getShortName } from 'src/utils/dataToStringFormatter';
import { getUserImage } from 'src/utils/dataformatter';
import { faBars } from '@fortawesome/pro-light-svg-icons';
import MobDrawer from './components';
import {
	Container,
	Wrapper,
	Logo,
	FanProf,
	Count,
	IconWrap,
	IconLabel,
	IconContainer,
	Counter,
	CallIcon,
} from './styled';
import { useMediaQuery } from '@material-ui/core';
import { openHelp } from 'customHooks/domUtils';
import { useRouter } from 'next/router';
import { toggleLogin } from 'src/context/general';

function FanManageHeader({ isLoggedIn, userValue, celebValue, links, dispatch, entityData, ...props }) {
	const router = useRouter();
	const { t, ready } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [drawer, setDrawer] = useState(false);

	const openDrawer = () => {
		setDrawer(!drawer);
	};

	const onProfClick = () => {
		if (!isLoggedIn) {
			toggleLogin(dispatch, {active: true, options: { preventStarLogin: true, noRedirect: true }});
		} else {
			router.push('/fan-manage');
		}
	};

	const getImage = () => {
		return (
			<CallIcon>
				<FontAwesomeIcon icon={faStar} />
			</CallIcon>
		);
	};

	const getProfImage = () => {
		const url = getUserImage(userValue?.avatar_photo);
		if (url) {
			return <img src={url} alt="user" className="user-imgae" />;
		}
		return <FontAwesomeIcon icon={faUserCircle} />;
	};


	const renderNotCount = () => {
		const notfCount =
      celebValue?.pending_requests_count || props.notificationCount;
		return notfCount ? (
			<Counter>
				<Count className="notf-count">{notfCount}</Count>{' '}
				<IconLabel className="req-lbl">{t('common.alerts')}</IconLabel>
			</Counter>
		) : null;
	};

	const getContent = () => {
		return (
			<React.Fragment>
				<FanProf onClick={onProfClick}>
					{!isMobile && getProfImage()}
					{isLoggedIn && (
						<React.Fragment>
							{!isMobile && (
								<span className="fan-name">
									{getShortName(userValue.nick_name, userValue.first_name)}
								</span>
							)}
							{renderNotCount()}
						</React.Fragment>
					)}
				</FanProf>
			</React.Fragment>
		);
	};
	return (
		ready && (
			<React.Fragment>
				<Container ref={props.forwardRef}>
					<Wrapper>
						{!isMobile && (
							<Link href="/fan-manage">
								<a>
									<Logo src={entityData.logo_reverse} alt="logo"></Logo>
								</a>
							</Link>
						)}
						{isMobile && (
							<span className="ham-wrp">
								<FontAwesomeIcon icon={faBars} onClick={openDrawer} />
								<span className="company">{entityData?.partner_name}</span>
							</span>
						)}
						<IconContainer>
							<IconWrap onClick={openHelp}>
								<FontAwesomeIcon icon={faQuestionCircle} />
								<IconLabel>{t('common.help')}</IconLabel>
							</IconWrap>
							<Link href="/browse-stars">
								<IconWrap>
									{getImage()}
									<IconLabel>
										{isMobile
											? `${entityData?.talentsPluralCap}`
											: `${t('fan_header.browseText', {
												star: entityData?.talentsPluralCap,
											})}`}
									</IconLabel>
								</IconWrap>
							</Link>
						</IconContainer>
						{getContent()}
					</Wrapper>
				</Container>
				{drawer && isMobile && (
					<MobDrawer links={links} onClose={openDrawer} origin="/fan-manage" />
				)}
			</React.Fragment>
		)
	);
}



// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
//   userValue: state.userDetails.settings_userDetails,
//   celebValue: state.userDetails.settings_celebrityDetails,
//   notificationCount: state.userDetails.notificationCount,
//   entityData: state.entity.data,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleLogin: (state, options) => dispatch(toggleLogin(state, options)),
// });

export default FanManageHeader;
