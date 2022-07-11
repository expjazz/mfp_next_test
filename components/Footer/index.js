import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import {
	faFacebookSquare,
	faTwitterSquare,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
	faEnvelopeSquare,
	faPhoneVolume,
} from '@fortawesome/pro-light-svg-icons';
// import EntitySelector from 'components/EntitySelector';
// import WhatsappService from 'components/WhatsappService';
import {
	FooterStyled,
	IconWrapper,
	Anchor,
	StoreIcon,
	StoreIconWrapper,
	// Image
} from './styled';
import { getRedirectURL, isVodacom, useMedia } from '../../customHooks/domUtils';
import Search from '../Search';
import { useTranslation } from 'next-i18next';
import { useGetProfessions } from 'customHooks/reactQueryHooks';
import EntitySelector from 'components/EntitySelector';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import Image from 'next/image';
// import Image from 'next/image';

const FooterComp = ({
	className,
	showSearch,
	showCat,
	showHiddenLink,
	professionsProp,
	isStar,
	// entityData,
	darkMode,
	reverseLogo,
	isV3,
	filters,
	professionCompleteLink
}) => {
	const { t } = useTranslation();
	const { data: outterEntity } = useGetPartner();
	const entityData = outterEntity?.partnerData;
	const professionsArr = useGetProfessions()?.data?.professions;
	const professions = professionsProp ? professionsProp : professionsArr;
	const renderFooterLink = (linkData, entityKey, url = false) => {
		if (url) {
			return <Link href={url ? entityKey : getRedirectURL(entityData[entityKey])} passHref>
				<Anchor
					target={isVodacom() ? '_blank' : '_self'}
					rel="noopener noreferrer"
					className="foot-link"
					href={url ? entityKey : getRedirectURL(entityData[entityKey])}
				>
					{linkData.title}
				</Anchor>
			</Link>;
		}
		return entityData[entityKey] || url ? (
			<Anchor
				target={isVodacom() ? '_blank' : '_self'}
				rel="noopener noreferrer"
				className="foot-link"
				href={url ? entityKey : getRedirectURL(entityData[entityKey])}
			>
				{linkData.title}
			</Anchor>
		) : null;
	};

	const renderFooterIcon = (iconData, entityKey) => {
		return entityData[entityKey] ? (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href={getRedirectURL(entityData[entityKey])}
			>
				<FontAwesomeIcon icon={iconData.icon} className="social-icon-footer" />
			</a>
		) : null;
	};
	const isMobile = useMedia('(max-width: 831px)');
	let profMiddle = professions.length / 2;
	let profEnd = professions.length;
	if (professions.length > 12) {
		profEnd = 12;
		profMiddle = 6;
	}

	/**
   * Function that sets different professions link
   * depending on the media query
   * @param slug the profession slug
   * @returns A link according to the screen size
   */
	const handleProfession = slug => {
		if (isMobile) {
			return `/category-list/${slug}`;
		}

		return `/category/${slug}`;
	};

	return (
		<FooterStyled
			className={className}
			role="contentinfo"
			isV3={isV3}
			itemcope=""
			itemtype="http://schema.org/WPFooter"
		>
			<section className="link-wrapper">
				<div className="link-search-container">

					<Anchor href={'/'} isV3={isV3}>
						<Image layout='fixed' width={100} height={25} src={reverseLogo ? entityData.logo_reverse : entityData.logo} alt="logo" />
					</Anchor>
					{showSearch && (isV3 && !isMobile) && (
						<Search
							darkMode={darkMode}
							entityData={entityData}
							filters={filters}
							t={key => key}
							classes={{ root: 'search-root', searchList: 'suggestion-wrap' }}
						/>
					)}
				</div>
				<div>
					{showSearch && (!isV3 || (isV3 && isMobile)) && (
						<Search
							darkMode={darkMode}
							entityData={entityData}
							filters={filters}
							t={key => key}
							classes={{ root: 'search-root', searchList: 'suggestion-wrap' }}
						/>
					)}
					<span className="link-sec">
						{showCat && (
							<span className="link-col">
								<span className="title">{t('common.about.browseStars')}</span>
								<span className="two-col">
									<span className="link-row-col">
										{professions
											.slice(0, profMiddle)
											.map((profession, index) => (
												<Link
													target="_blank"
													rel="noopener noreferrer"
													className="foot-link"
													href={professionCompleteLink || entityData?.entity_id === 'SUPERSPORT-ZA-1' ? profession.slug : handleProfession(profession.slug)}
													key={index}
													passHref
												>
													<Anchor
														target="_blank"
														rel="noopener noreferrer"
														className="foot-link"
														key={index}
													>
														{profession.entity_title ? profession.entity_title : profession.title}
													</Anchor>
												</Link>
											))}
									</span>
									<span className="link-row-col">
										{professions
											.slice(profMiddle, profEnd)
											.map((profession, index) => (
												<Link
													href={professionCompleteLink || entityData?.entity_id === 'SUPERSPORT-ZA-1' ? profession.slug : handleProfession(profession.slug)}
													passHref
													className="foot-link"
													key={index}
													target="_blank"
												>
													<Anchor
														rel="noopener noreferrer"
														className="foot-link"
														// href={`/category-list/${profession.slug}`}
													>
														{profession.entity_title ? profession.entity_title : profession.title}
													</Anchor>
												</Link>
											))}
									</span>
								</span>
							</span>
						)}
						<span className="link-col">
							<span className="title">{t('common.about.title1')}</span>
							<span className="two-col">
								{entityData.blog_url ||
                entityData.career_url ||
                entityData.press_url ? (
										<span className="link-row-col">
											{/* {renderFooterLink(
												{ title: t('common.about.blog') },
												'blog_url',
											)}
											{renderFooterLink(
												{ title: t('common.about.careers') },
												'career_url',
											)} */}
											{!isVodacom() && renderFooterLink(
												{ title: t('common.about.press') },
												'press_url',
											)}
											{renderFooterLink(
												{ title: 'Talent Info' },
												'/talent/product',
												true
											)}
										</span>
									) : null}
								<span className="link-row-col">
									<Link
										target="_blank"
										rel="noopener noreferrer"
										className="foot-link"
										href={'/terms-service'}
										passHref
									>
										<Anchor
											target="_blank"
											rel="noopener noreferrer"
											className="foot-link"
										>
											{t('common.about.termsHeading')}
										</Anchor>
									</Link>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										className="foot-link"
										href={'/privacy-policy'}
										passHref
									>
										<Anchor
											target="_blank"
											rel="noopener noreferrer"
											className="foot-link"
										>
											{t('common.about.privacyHeading')}
										</Anchor>
									</Link>
									{entityData.connect_email ? (
										<Anchor
											target="_blank"
											rel="noopener noreferrer"
											className="foot-link"
											id="connect-us"
											href={`mailto: ${entityData.connect_email}`}
										>
											{t('common.about.connect')}
										</Anchor>
									) : null}
								</span>
							</span>
						</span>
						{entityData.contact_phone || entityData.contact_whatsapp ? (
							<span className="link-col">
								<span className="title">{t('common.questionsCap')}</span>
								<span className="two-col">
									<span className="link-row-col">
										{entityData.contact_phone ? (
											<a
												href={`tel:${entityData.contact_phone}`}
												className="subText"
											>
												{t('common.contactPhone')}
												<FontAwesomeIcon
													className="icon"
													icon={faPhoneVolume}
												/>
											</a>
										) : null}
									</span>
								</span>
							</span>
						) : null}
					</span>
					{showHiddenLink && (
						<span className="plain-text">
							<Anchor
								target="_blank"
								rel="noopener noreferrer"
								href="/plaintext"
								className="hidden-link"
							>
                Plain text
							</Anchor>
						</span>
					)}
				</div>
			</section>
			<span className="icon-wrapper">
				<div>
					<EntitySelector />
				</div>
				{ !isVodacom() && ( <IconWrapper className="social-media-footer">
					{renderFooterIcon({ icon: faFacebookSquare }, 'facebook_url')}
					{renderFooterIcon({ icon: faTwitterSquare }, 'twitter_url')}
					{renderFooterIcon({ icon: faInstagram }, 'instagram_url')}
					{entityData.connect_email ? (
						<a href={`mailto: ${entityData.connect_email}`}>
							<FontAwesomeIcon
								icon={faEnvelopeSquare}
								className="social-icon-footer"
							/>
						</a>
					) : null}
				</IconWrapper> )}
				{isStar && (
					<StoreIconWrapper>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`https://play.google.com/store/apps/details?id=${process.env.NEXT_PUBLIC_ANDROID_APP_ID}`}
						>
							<StoreIcon
								alt="play store icon"
								src="/images/playstore-download.svg"
								className="first"
							/>
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href={`https://itunes.apple.com/us/app/starsona/id${process.env.NEXT_PUBLIC_IOS_APP_ID}?ls=1&mt=8`}
						>
							<StoreIcon
								alt="app store icon"
								src="/images/appstore-download.svg"
							/>
						</a>
					</StoreIconWrapper>
				)}
			</span>
		</FooterStyled>
	);
};

FooterComp.defaultProps = {
	showCat: false,
	className: '',
	showSearch: false,
	showHiddenLink: false,
	darkMode: false,
	reverseLogo: false,
	isV3: false,
	professionCompleteLink: false
};

FooterComp.propTypes = {
	showCat: PropTypes.bool,
	className: PropTypes.string,
	showSearch: PropTypes.bool,
	entityData: PropTypes.object.isRequired,
	showHiddenLink: PropTypes.bool,
	professions: PropTypes.array.isRequired,
	isStar: PropTypes.bool.isRequired,
	darkMode: PropTypes.bool,
	reverseLogo: PropTypes.bool,
	isV3: PropTypes.bool,
	professionCompleteLink: PropTypes.bool
};

// const mapStateToProps = state => ({
//   professions: state.professionsList.professions,
//   isStar: state.session.starRole,
//   entityData: state.entity.data,
// });

export default FooterComp;
