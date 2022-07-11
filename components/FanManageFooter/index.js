import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Footer, Logo } from './styled';
import { useLogout } from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useMediaQuery } from '@material-ui/core';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { isVodacom } from 'customHooks/domUtils';

function FanManageFooter(props) {
	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const { data: entityData } = useGetPartner();
	const logout = useLogout();
	if (isMobile) {
		if (isVodacom()) {
			return (
				<Footer>
					<a href="/manage" passHref>
						<Logo src={entityData?.partnerData.logo} alt="logo"></Logo>
					</a>
					<span>
						{entityData?.partnerData['connect_email'] ? (
							<a
								target="_blank"
								rel="noopener noreferrer"
								className="foot-link"
								href={`mailto: ${entityData?.partnerData['connect_email']}`}
							>
								<span>{t('common.about.contact')}</span>
							</a>
						) : null}
						<span className="divider">|</span>
						<a href="/terms-service">
							<span>{t('common.about.termsShort')} </span>
						</a>
						<span className="divider">|</span>
						<a href="/privacy-policy">
							<span>{t('common.about.privacyShort')}</span>
						</a>
					</span>
					<span className="cmpny">{t('common.poweredBy')}</span>
				</Footer>
			);
		}
		return (
			<Footer>
				<Link href="/manage" passHref>
					<Logo src={entityData?.partnerData.logo} alt="logo"></Logo>
				</Link>
				<span>
					{entityData?.partnerData['connect_email'] ? (
						<a
							target="_blank"
							rel="noopener noreferrer"
							className="foot-link"
							href={`mailto: ${entityData?.partnerData['connect_email']}`}
						>
							<span>{t('common.about.contact')}</span>
						</a>
					) : null}
					<span className="divider">|</span>
					<Link href="/terms-service">
						<a>
							<span>{t('common.about.termsShort')} </span>
						</a>
					</Link>
					<span className="divider">|</span>
					<Link href="/privacy-policy">
						<a>
							<span>{t('common.about.privacyShort')}</span>
						</a>
					</Link>
				</span>
				<span className="cmpny">{t('common.poweredBy')}</span>
			</Footer>
		);
	}
	return (
		<Footer>
			<span className="logo-wrp">
				<span className="acnt">{t('common.myAccount')}</span>
				<Link href="/manage" className="logo" passHref>
					<Logo src={entityData?.partnerData.logo} alt="logo"></Logo>
				</Link>
			</span>
			<span className="link-wrp">
				<span className="links">
					<span onClick={logout} role="presentation">
						{t('common.signout')}
					</span>
					<span className="terms">
						<Link href="/terms-service">
							<a>
								<span>{t('common.about.termsShort')}</span>
							</a>
						</Link>
						<Link href="/privacy-policy">
							<a>
								<span>{t('common.about.privacyShort')}</span>
							</a>
						</Link>
					</span>
				</span>
				<span className="cmpny">{t('common.poweredBy')}</span>
			</span>
		</Footer>
	);
}

// FanManageFooter.propTypes = {
//   logOut: PropTypes.func.isRequired,
//   history: PropTypes.object.isRequired,
//   entityData: PropTypes.object.isRequired,
// };

// const mapStateToProps = state => ({
//   entityData: state.entity.data,
// });

// const mapDispatchToProps = dispatch => ({
//   logOut: () => dispatch(logOutUser()),
// });

export default FanManageFooter;
