import React, { useState, useRef } from 'react';
// import { useTranslation } from 'next-i18next';
// import { Link } from 'react-router-dom';
// import { useMedia, getRedirectURL } from 'customHooks/domUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPhoneVolume } from '@fortawesome/pro-light-svg-icons';
// import { updateCategory } from 'pages/landing/actions/updateFilters';
// import { setSignupFlow } from 'store/shared/actions/setSignupFlow';
// import EntitySelector from 'components/EntitySelector';
// import { FlexBoxSB } from 'styles/CommonStyled';
// import WhatsappService from 'components/WhatsappService';
// import { toggleLogin, toggleSignup } from 'store/shared/actions/toggleModals';
// import MainDrawer from 'components/MainDrawer';
import SocialList from './components/SocialList';
import {
	FooterWrap,
	LeftCol,
	RightCol,
	SectionWrapper,
	ListItem,
	TermsWrap,
	ColWrapper,
	CatWrap,
	Logo,
	SearchWrapper,
} from './styled';
import { useTranslation } from 'next-i18next';
import { useMediaQuery } from '@material-ui/core';
import { getRedirectURL, isVodacom } from '../../customHooks/domUtils';
import { FlexBoxSB } from '../../styles/CommonStyled';
import MainDrawer from '../MainDrawer';
import Search from '../Search';
import EntitySelector from '../EntitySelector';
import Link from 'next/link';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import WhatsappService from 'components/WhatsappService';
import { useGetProfessions } from 'customHooks/reactQueryHooks';

const StarFooter = ({
	userDetails,
	celebDetails,
	hideCategory,
	hideSearch,
	toggleLogin,
	// professionsList,
	setSignupFlow,
	entityData,
	toggleSignup,
	languageData,
	currencyData,
	...props
}) => {
	const { t } = useTranslation();
	const { data: fanData, isStar } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const isMobile = useMediaQuery('(max-width: 831px)');
	const [showDrawer, toggDrawer] = useState(false);
	const termsRef = useRef(null);
	// const entity = value => value
	const { data: professionsData } = useGetProfessions();
	const professionsList = professionsData?.professions || props.professionsList;
	const updateMainCategory = (title, value, subCategories, slug) => () => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'more-categories-option',
				category_value: title,
			});
		}
		if (title === 'Featured') {
			updateCategory(title, value, subCategories, slug);
		}
	};

	const onSearchFocus = event => {
		event.preventDefault();
		if (termsRef.current && isMobile) {
			setTimeout(() => {
				window.scrollTo(
					0,
					window.scrollY - termsRef.current.clientHeight + 100,
				); // compensate for header height
			}, 1000);
		}
	};

	const getUrl = (title, value, subCategories, slug) => {
		if (title !== 'Featured' && entityData?.partnerData?.entity_id !== 'SUPERSPORT-ZA-1') {
			return `/category-list/${slug}`;
		}
		return '/browse-stars';
	};

	const renderFooterLink = (linkData, entityKey) => {
		return entityData[entityKey] ? (
			<ListItem normalFont>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href={getRedirectURL(entityData[entityKey])}
				>
					{linkData.title}
				</a>
			</ListItem>
		) : null;
	};

	const bool = false;
	const professionLength = 12;

	return (
		<FooterWrap className='star-footer'>
			{showDrawer && isMobile && (
				<MainDrawer
					onClose={() => toggDrawer(false)}
					professionsList={professionsList}
				/>
			)}
			<ColWrapper>
				<LeftCol className='footer-left-section'>
					<SectionWrapper className="experiences">
						{
							!isVodacom() && (

								<SocialList socialLinks={userDetails.social_links} />
							)
						}
					</SectionWrapper>
					<SectionWrapper>
						<span className="heading">{t('common.myAccount')}</span>
						<ul>
							<ListItem>
								{!isLoggedIn ? (
									<React.Fragment>
										<span role="presentation" onClick={() => toggleLogin(true)}>
											{t('common.log_in')}
										</span>
                    &nbsp;/&nbsp;
										<span
											role="presentation"
											onClick={() => {
												setSignupFlow({ role: 'fan' });
												toggleSignup(true, { alternateSignup: true });
											}}
										>
											{t('common.create_account')}
										</span>
									</React.Fragment>
								) : (
									<Link href={isStar ? '/manage' : '/fan-manage'}>
										<a>
											{t('common.manage_dashboard', {
												type: isStar ? `${entityData?.talent_plural_name}` : 'Fan',
											})}
										</a>
									</Link>
								)}
							</ListItem>
							<ListItem onClick={() => {
								if (window.FreshworksWidget) {
									window.FreshworksWidget('open');
								}
							}}>
								{t('common.help')}
							</ListItem>
							{!isLoggedIn && (
								<ListItem
									onClick={() => {
										setSignupFlow({ role: 'star' });
										toggleSignup(true);
									}}
								>
									{t(entityData?.entity_id !== 'SUPERSPORT-ZA-1' ? 'common.are_you_a_talent' : 'common.are_you_a_talent_supersport', {
										talent: entityData?.talent_singular_name,
										store: entityData?.partner_name,
									})}
								</ListItem>
							)}
						</ul>
						{!hideSearch && (
							<SearchWrapper>
								<Search
									entityData={entityData}
									placeholder={`Search other ${entityData?.talent_plural_name}`}
									disableUserSuggest
									inputProps={{
										onClick: onSearchFocus,
									}}
									classes={{
										root: 'search-root',
										inputRoot: 'search-input-root',
										searchList: 'suggestion-wrap',
									}}
								/>
								{/* <FontAwesomeIcon
									className="ham-icon"
									icon={faBars}
									onClick={() => toggDrawer(true)}
								/> */}
							</SearchWrapper>
						)}
					</SectionWrapper>
					{!isMobile && !hideCategory && (
						<SectionWrapper>
							<span className="heading">
								{t('common.browse_other', {
									talent: entityData?.talent_plural_name.toLowerCase(),
								})}
							</span>
							<CatWrap>
								{professionsList.slice(0, professionLength).map(profession => {
									return (
										<ListItem
											key={profession.id}
											onClick={updateMainCategory(
												profession.title,
												profession.id,
												profession.child,
												profession.slug,
											)}
											data-value={profession.title}
										>
											<Link
												href={getUrl(
													profession.title,
													profession.id,
													profession.child,
													profession.slug,
												)}
												className="category-label"
											>
												{profession.entity_title ? profession.entity_title : profession.title}
											</Link>
										</ListItem>
									);
								})}
							</CatWrap>
						</SectionWrapper>
					)}
					{
						(bool && (entityData?.contact_phone || entityData?.contact_whatsapp)) ?
							<SectionWrapper>
								<span className="heading">{t('common.questionsCap')}</span>
								<ul>
									{
										entityData?.contact_whatsapp ?
											<ListItem>
												<WhatsappService
													number={entityData?.contact_whatsapp}
												>
													{
														(onClick) => (
															<span className='subText' role='presentation' onClick={onClick}>
																{t('common.contactWhatsapp')}
																<img width={35} height={35} alt='whatsapp' src="images/whatsapp.svg" />
															</span>
														)
													}
												</WhatsappService>
											</ListItem>
											: null
									}
									{
										entityData?.contact_phone ?
											<ListItem>
												<a href={`tel:${entityData?.contact_phone}`} className='subText'>
													{t('common.contactPhone')}
													<FontAwesomeIcon className='phone-icon' icon={faPhoneVolume} />
												</a>
											</ListItem>
											: null
									}
								</ul>
							</SectionWrapper>
							: null}
				</LeftCol>
				<RightCol>
					<SectionWrapper className="bottom-blk" ref={termsRef}>
						<div className="logo-wrapper">
							<a href="/">
								<Logo src={entityData?.logo} alt="logo" />
							</a>
							<EntitySelector
								fullView
								currencyData={currencyData}
								languageData={languageData}
								entityData={entityData}
							/>
						</div>
						<span className="copy-right">
              @{new Date().getFullYear()} {entityData?.legal_name} {t('common.fan_experiences')}
						</span>
						<span className="faint-heading">{t('common.poweredBy')}</span>
						<FlexBoxSB>
							<TermsWrap>
								<ListItem normalFont>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href={'/terms-service'}
									>
										<a
											target="_blank"
											rel="noopener noreferrer"
										>
											{t('common.about.termsHeading')}
										</a>
									</Link>

								</ListItem>
								<ListItem normalFont>
									<Link
										target="_blank"
										rel="noopener noreferrer"
										href={'/privacy-policy'}
									>
										<a>
											{t('common.about.privacyHeading')}
										</a>
									</Link>
								</ListItem>
								{/* {renderFooterLink({ title: t('common.about.blog') }, 'blog_url')}
								{renderFooterLink({ title: t('common.about.careers') }, 'career_url')} */}
								{!isVodacom() &&  renderFooterLink({ title: t('common.about.press') }, 'press_url')}
							</TermsWrap>
						</FlexBoxSB>
					</SectionWrapper>
				</RightCol>
			</ColWrapper>
		</FooterWrap>
	);
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
//   isStar: state.userDetails.isStar,
//   professionsList: state.professionsList.professions,
//   entityData: state.entity.data,
// });

// const mapDispatchToProps = dispatch => ({
//   toggleLogin: (state, options) => dispatch(toggleLogin(state, options)),
//   toggleSignup: (state, options) => dispatch(toggleSignup(state, options)),
//   setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
//   updateCategory: (label, value, subCategories, slug) =>
//     dispatch(updateCategory(label, value, subCategories, slug)),
// });

export default StarFooter;
