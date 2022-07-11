import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTimes } from '@fortawesome/pro-light-svg-icons';
import CategoryStyled, { NavWrap } from './styled';
import HeaderSection from '../../styled';
// import { useMedia } from '../../../../customHooks/domUtils';
import HorizontalListing from '../../../HorizontalListing';
import { useTranslation } from 'next-i18next';
import { useMediaQuery } from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGeneral } from 'src/context/general';
import { useGetProfessions } from 'customHooks/reactQueryHooks';

const CategorySection = props => {
	const isMobile = useMediaQuery('(max-width: 831px)');
	const state = useGeneral()[0];
	const router = useRouter();
	const { t } = useTranslation();
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
		if (title === 'Featured') {
			props.updateCategory(title, value, subCategories, slug);
		}
	};

	const getUrl = (title, value, subCategories, slug) => {
		if (title !== 'Featured') {
			if (isMobile) {
				return `category-list/${slug}`;
			}
			return `category/${slug}`;
		}
		return 'browse-stars';
	};

	const getTagUrl = slug => {
		return `/tag/${slug}`;
	};

	const entity = value => value;
	const isSmallScreen = useMediaQuery('(max-width: 831px)');
	const handleContent = () => {
		return (
			<React.Fragment>
				<CategoryStyled.Item
					onClick={updateMainCategory('Featured', 0, [], '')}
					selected={
						state.filters?.category?.label === 'Featured' &&
            (router.asPath === '/browse-stars' ||
              /^\/category/.test(router.asPath) ||
              /^\/category-list/.test(router.asPath))
					}
					data-value="Featured"
				>
					<Link href={'/browse-stars'} className="category-label">
						<a className="category-label">
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
							selected={
								(state.filters?.category?.label === profession.title || state.filters?.category?.selected?.find(cat => cat.title === profession.title)) &&
                (router.asPath === '/browse-stars' ||
                  /^\/category/.test(router.asPath) ||
                  /^\/category-list/.test(router.asPath))
							}
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
								<a className="category-label">
									{profession.entity_title ? profession.entity_title : profession.title}
								</a>
							</Link>
						</CategoryStyled.Item>
					);
				})}
				{!isSmallScreen && props.dynamicFilters?.length > 0 ? (
					<span className="separator" />
				) : null}
				{/* {props.dynamicFilters.map(link => (
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
            selected={
              props.category.label === link.label &&
              (props.location.pathname === '/browse-stars' ||
                /^\/category/.test(props.location.pathname) ||
                /^\/category-list/.test(props.location.pathname))
            }
            data-value={link.label}
          >
            <a
              to={getTagUrl(link.tag ? link.tag.slug : link.slug)}
              className="category-label"
            >
              {link.label}
            </a>
          </CategoryStyled.Item>
        ))} */}
				<CategoryStyled.Item className="about">
					<Link href="/about" className="category-label">
						<a className="category-label">
							{t('common.aboutSite', { siteName: props.entityData?.partner_name })}
						</a>
					</Link>
				</CategoryStyled.Item>
			</React.Fragment>
		);
	};
	return (
		<React.Fragment>
			<NavWrap
				id="access"
				role="navigation"
				aria-label="Primary Menu"
				itemscope=""
				itemtype="http://schema.org/SiteNavigationElement"
			>
				{props.showCatHeader && (
					<CategoryStyled.Header>
						<HeaderSection.BackIcon overlayMode={props.overlayMode}>
							<FontAwesomeIcon
								icon={faChevronLeft}
								onClick={props.handleBackClick}
							/>
						</HeaderSection.BackIcon>
						<Link href="/" className="cat-head-logo">
							<a className="cat-head-logo">
								<HeaderSection.ImgLogo
									src={props.entityData.logo_reverse}
									alt={`${props.entityData?.partner_name}_logo`}
								/>
							</a>
						</Link>
						<FontAwesomeIcon
							onClick={props.handleBackClick}
							icon={faTimes}
							className="close-icon"
						/>
					</CategoryStyled.Header>
				)}
				<CategoryStyled>
					{isSmallScreen ? (
						handleContent()
					) : (
						<HorizontalListing
							classes={{
								arrowWrapper: 'cat-arrows',
								root: 'cat-list-root'
							}}
							scrollProps={{
								autoHeight: true,
								autoHeightMax: 57,
							}}
							dataList={['Featured', ...professionsList]}
							getItem
						>
							<section className="cat-list-wrap">{handleContent()}</section>
						</HorizontalListing>
					)}
				</CategoryStyled>
			</NavWrap>
		</React.Fragment>
	);
};

CategorySection.propTypes = {
	professionsList: PropTypes.object.isRequired,
	category: PropTypes.object.isRequired,
	updateCategory: PropTypes.func.isRequired,
	showCategories: PropTypes.bool.isRequired,
	closeCategories: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	dynamicFilters: PropTypes.array.isRequired,
};

CategorySection.defaultProps = {
	updateCategory: () => {  },
};

// const mapStateToProps = state => ({
//   category: state.filters.category,
//   entityData: state.entity.data,
// });

// const mapDispatchToProps = dispatch => ({
//   updateCategory: (label, value, subCategories, slug) =>
//     dispatch(updateCategory(label, value, subCategories, slug)),
// });

export default CategorySection;