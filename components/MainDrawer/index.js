import React from 'react';
// import { useTranslation } from 'next-i18next';
// import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimes,
} from '@fortawesome/pro-light-svg-icons';
// import { updateCategory } from 'pages/landing/actions/updateFilters';
import {
	Logo,
	Wrapper,
	CategoryList,
	CategoryItem,
} from './styled';
import { useTranslation } from 'next-i18next';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const MainDrawer = ({
	onClose,
	professionsList,
	updateCategory,
}) => {
	const { t } = useTranslation();
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
	const { data: entityData } = useGetPartner();
	const getUrl = (title, value, subCategories, slug) => {
		if (title !== 'Featured' && entityData?.partnerData?.entity_id !== 'SUPERSPORT-ZA-1') {
			return `/category-list/${slug}`;
		}
		return '/browse-stars';
	};

	return (
		<Wrapper
			anchor='left'
			open
			onClose={onClose}
			classes={{
				paper: 'drawer-paper'
			}}
		>
			<Logo
				src={entityData?.partnerData?.logo}
				alt={`${entityData?.partnerData.partner_name}_logo`}
			/>
			<FontAwesomeIcon
				onClick={onClose}
				icon={faTimes}
				className="close-icon"
			/>
			<CategoryList>
				<CategoryItem
					onClick={updateMainCategory('Featured', 0, [], '')}
					data-value="Featured"
				>
					<a href={getUrl('Featured', 0, [])} className="category-label">
						{t('common.featuredCap')}
					</a>
				</CategoryItem>
				{professionsList.map(profession => {
					return (
						<CategoryItem
							key={profession.id}
							onClick={updateMainCategory(
								profession.title,
								profession.id,
								profession.child,
								profession.slug,
							)}
							data-value={profession.title}
						>
							<a
								href={getUrl(
									profession.title,
									profession.id,
									profession.child,
									profession.slug,
								)}
								className="category-label"
							>
								{profession.entity_title ? profession.entity_title : profession.title}
							</a>
						</CategoryItem>
					);
				})}
				<CategoryItem className="about">
					<a href="/about" className="category-label">
						{t('common.aboutSite', { siteName: entityData?.partnerData.partner_name })}
					</a>
				</CategoryItem>
			</CategoryList>
		</Wrapper>
	);
};

// const mapStateToProps = state => ({
//   professionsList: state.professionsList.professions,
// })

// const mapDispatchToProps = dispatch => ({
//   updateCategory: (label, value, subCategories, slug) =>
//     dispatch(updateCategory(label, value, subCategories, slug)),
// });

export default MainDrawer;
