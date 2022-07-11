import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import Tooltip from '../ToolTip';
import { NotificationCount } from '../../styles/CommonStyled';
import { SidebarStyled, MoreBtn } from './styled';
import { useLogout, useProfileLogout } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';

const noImageTooltip = 'Add your picture in the profile section.';

const Sidebar = props => {
	const logout = useProfileLogout();
	const router = useRouter();
	const { t } = useTranslation();
	const pathname = router.asPath;
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [showMore, toggleMore] = useState(false);

	const toggMore = () => {
		toggleMore(true);
	};

	const renderLinkItem = link => {
		if (link.tooltip) {
			return (
				<Tooltip title={link.tooltip} key={link.selectedName}>
					<SidebarStyled.LinkItem
						selected={pathname.includes(link.url)}
						className="sidebar-link-item"
					>
						<Link href={link.url} shallow={props.shallow}>
							<a>
								{link.linkName}
							</a>
						</Link>
						{props.arrow &&
              (!props.favouriteCount || link.selectedName !== 'favorites') && (
							<FontAwesomeIcon
								icon={faChevronRight}
								className="sidebar-arrow"
							/>
						)}
						{link.selectedName === 'favorites' && props.favouriteCount > 0 && (
							<span className="fav-count">{props.favouriteCount}</span>
						)}
					</SidebarStyled.LinkItem>
				</Tooltip>
			);
		}
		return (
			<SidebarStyled.LinkItem
				key={link.selectedName}
				selected={pathname.includes(link.url)}
				className="sidebar-link-item"
			>
				<Link href={link.url} shallow={props.shallow}>
					<a>

						{link.linkName}
						{link.selectedName === 'requests' &&
            props.celebDetails?.pending_requests_count > 0 && (
							<NotificationCount className="notification-count">
								{props.celebDetails?.pending_requests_count || 0}
							</NotificationCount>
						)}
						{link.selectedName === 'myVideos' &&
            props.notificationCount > 0 && (
							<NotificationCount className="notification-count">
								{props.notificationCount}
							</NotificationCount>
						)}
					</a>
				</Link>
				{((props.arrow &&
          (link.selectedName !== 'requests')) ||
          (link.selectedName === 'requests' &&
            props.celebDetails?.pending_requests_count <= 0) ||
          (link.selectedName === 'myVideos' &&
            props.notificationCount <= 0)) && (
					<FontAwesomeIcon icon={faChevronRight} className="sidebar-arrow" />
				)}
			</SidebarStyled.LinkItem>
		);
	};
	return (
		<SidebarStyled>
			{props.userDetails?.avatarPhoto ? (
				<SidebarStyled.AvatarImage
					hidden={props.isStar}
					imageUrl={props.userDetails?.avatarPhoto}
				/>
			) : (
				<Tooltip title={noImageTooltip}>
					<SidebarStyled.AvatarImage
						hidden={props.isStar}
						imageUrl={props.userDetails?.avatarPhoto}
					/>
				</Tooltip>
			)}
			<SidebarStyled.LinkList>
				{!showMore && isMobile && props.mainLinks.length > 0 ? (
					<React.Fragment>
						{props.mainLinks.map(link => renderLinkItem(link))}
						<MoreBtn onClick={toggMore}>more...</MoreBtn>
					</React.Fragment>
				) : (
					props.links.map(link => renderLinkItem(link))
				)}
				{(showMore || !isMobile || props.mainLinks?.length <= 0) && (
					<SidebarStyled.LinkItem
						onClick={logout}
						className="sidebar-link-item"
					>
						<span className="log-out">{t('common.logout')}</span>
						{props.arrow && (
							<FontAwesomeIcon
								icon={faChevronRight}
								className="sidebar-arrow"
							/>
						)}
					</SidebarStyled.LinkItem>
				)}
			</SidebarStyled.LinkList>
		</SidebarStyled>
	);
};

Sidebar.propTypes = {
	userDetails: PropTypes.object.isRequired,
	links: PropTypes.array.isRequired,
	mainLinks: PropTypes.array,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	logOut: PropTypes.func.isRequired,
	isStar: PropTypes.bool.isRequired,
	arrow: PropTypes.bool,
	celebDetails: PropTypes.object.isRequired,
	shallow: PropTypes.bool,
};
Sidebar.defaultProps = {
	arrow: false,
	mainLinks: [],
	shallow: false
};

const mapDispatchToProps = dispatch => ({
	logOut: () => dispatch(logOutUser()),
});

const mapStateToProps = state => ({
	userDetails: state.userDetails.settings_userDetails,
	celebDetails: state.userDetails.settings_celebrityDetails,
	notificationCount: state.userDetails.notificationCount,
	// favouriteCount: state.userDetails.settings_userDetails.favourite_count,
});

export default Sidebar;
