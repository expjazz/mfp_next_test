import React from 'react';
// import { withRouter, Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import { addClickDynamicLink } from 'store/shared/actions/getDynamicFilters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes} from '@fortawesome/pro-light-svg-icons';
// import { useMedia } from 'customHooks/domUtils';
// import { updateCategory } from 'pages/landing/actions/updateFilters';
import CategoryStyled, { NavWrap, Wrap, BackIcon, Banner } from './styled';
import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useGetPartner, useGetProfessions } from 'customHooks/reactQueryHooks';
import Link from 'next/link';

const CategorySection = props => {
	const { t } = useTranslation();
	const { data: entityData } = useGetPartner();
	const router = useRouter();
	const isMobile = useMediaQuery('(max-width: 831px)');
	const { data: professionsData } = useGetProfessions();
	const professionsList = professionsData?.professions || props.professionsList;
	const updateMainCategory = (title, value, subCategories, slug) => () => {
		if (window.dataLayer) {
			window.dataLayer.push({
				event: 'more-categories-option',
				category_value: title,
			});
		}
		if (props.showCategories) {
			props.closeCategories();
		}
		// if (title === 'Featured') {
		//   props.updateCategory(title, value, subCategories, slug);
		// }
	};

	const getUrl = (title, value, subCategories, slug) => {
		if (title !== 'Featured') {
			if (isMobile && entityData?.partnerData?.entity_id !== 'SUPERSPORT-ZA-1') {
				return `category-list/${slug}`;
			}
			return `category/${slug}`;
		}
		return 'browse-stars';
	};

	const getTagUrl = slug => {
		return `/tag/${slug}`;
	};
	const isSmallScreen = useMediaQuery('(max-width: 831px)');
	const handleContent = () => {
		return (
			<React.Fragment>
				<CategoryStyled.Item
					onClick={updateMainCategory('Featured', 0, [], '')}
					data-value="Featured"
				>
					<Link href={'/browse-stars'} className="category-label">
						<a>
							{t('common.allTalent')}
						</a>
					</Link>
				</CategoryStyled.Item>
				{professionsList.map(profession => {
					return (
						<CategoryStyled.Item
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
								href={`/${getUrl(
									profession.title,
									profession.id,
									profession.child,
									profession.slug,
								)}`}
								className="category-label"
							>
								<a>
									{profession.entity_title ? profession.entity_title : profession.title}
								</a>
							</Link>
						</CategoryStyled.Item>
					);
				})}
				{!isSmallScreen && props.dynamicFilters.length > 0 ? (
					<span className="separator" />
				) : null}
				{props.dynamicFilters.map(link => (
					<CategoryStyled.Item
						key={link.slug}
						onClick={() => {
							updateMainCategory(
								link.label,
								link.value,
								link.label,
								link.tag ? link.tag.slug : link.slug,
							);
							addClickDynamicLink({
								entity: props.entity,
								dynamic_link: link.value,
							});
						}}
						data-value={link.label}
					>
						<Link
							href={getTagUrl(link.tag ? link.tag.slug : link.slug)}
							className="category-label"
						>
							<a>
								{link.label}
							</a>
						</Link>
					</CategoryStyled.Item>
				))}
				<CategoryStyled.Item className="about">
					<a href={`${process.env.NEXT_PUBLIC_WEB_BASE_URL}about`} className="category-label">
						{t('common.aboutSite', { siteName: props.entityData?.partner_name || entityData?.partnerData.partner_name })}
					</a>
				</CategoryStyled.Item>
			</React.Fragment>
		);
	};
	return (
		<Wrap
			anchor="left"
			open
			onClose={props.handleBackClick}
			classes={{
				paper: 'drawer-paper',
			}}
		>
			<NavWrap
				id="access"
				role="navigation"
				aria-label="Primary Menu"
				itemscope=""
				itemtype="http://schema.org/SiteNavigationElement"
			>
				<CategoryStyled.Header>
					<BackIcon>
						<FontAwesomeIcon
							icon={faChevronLeft}
							className='back-icon'
							onClick={props.handleBackClick}
						/>
					</BackIcon>
					<Link href="/" className="cat-head-logo">
						<a className="cat-head-logo">
							<Banner
								src={props.entityData?.logo_reverse || entityData?.partnerData.logo_reverse}
								alt={`${props.partnerData?.partner_name || entityData?.partnerData.partner_name}_logo`}
							/>
						</a>
					</Link>
					<FontAwesomeIcon
						onClick={props.handleBackClick}
						icon={faTimes}
						className="close-icon"
					/>
				</CategoryStyled.Header>
				<CategoryStyled>
					{handleContent()}
				</CategoryStyled>
			</NavWrap>
		</Wrap>
	);
};


CategorySection.propTypes = {
	professionsList: PropTypes.object.isRequired,
	category: PropTypes.object.isRequired,
	updateCategory: PropTypes.func.isRequired,
	showCategories: PropTypes.bool.isRequired,
	closeCategories: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	dynamicFilters: PropTypes.array,
};

// const mapStateToProps = state => ({
//   category: state.filters.category,
//   professionsList: state.professionsList,
//   entity: state.entity.data.entity_id,
//   entityData: state.entity.data,
// });

// const mapDispatchToProps = dispatch => ({
//   updateCategory: (label, value, subCategories, slug) =>
//     dispatch(updateCategory(label, value, subCategories, slug)),
// });

export default CategorySection;
