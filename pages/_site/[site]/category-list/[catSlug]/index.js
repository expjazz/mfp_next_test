import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import HeaderV3 from '../../../../../components/HeaderV3';
import { findCategory } from '../../../../../components/PageStyles/BrowseStars/utils';
import { i18n } from '../../../../../next-i18next.config';
import { editGeneralState, useGeneral } from '../../../../../src/context/general';
import { localeEntity } from '../../../../../src/services/entities/localeEntity';
import { getConfig, getEntity, getProfessions } from '../../../../../src/services/myfanpark';
import { locStorage } from '../../../../../src/utils/localStorageUtils';
import {
	Layout,
	List,
	ListItem,
	FlexItem,
	Image,
	HighlightText,
} from '../../../../../components/PageStyles/BrowseStars/CategoryList/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';
import LegacyHeader from 'components/LegacyHeader';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useCurrencyData } from 'customHooks/currencyUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
function CategoryListPage(props) {
	const { isStar } = useFetchLoggedUser();
	const { subCategory } = props;
	const [state, dispatch] = useGeneral();
	const router = useRouter();
	const { t } = useTranslation();
	const isMobile = useMediaQuery('(max-width: 831px)');
	// const isMobile = false
	const staticRender = useRef(true);
	useEffect(() => {
		if (!isMobile && !staticRender.current) {
			router.push(`/category/${subCategory.slug}`);
		}
		if (staticRender.current) {
			staticRender.current = false;
		}
	});

	useEffect(() => {
		if (!isMobile) return;
		if (subCategory) {
			router.prefetch(`/category/${subCategory.slug}`);
		}
		if (subCategory &&
      subCategory.child &&
      subCategory.child.length > 0) {
			subCategory.child.forEach(cat => {
				router.prefetch(`/category/${cat?.slug}`);
			});
		}
	}, []);

	const headerRef = useRef(null);
	const searchRef = useRef(null);
	const { entityId, entityToken } = props.partnerData;
	const { data: { partnerData  } } = useGetPartner();
	const currencyData = useCurrencyData();
	return (
		<>
			<LegacyHeader
				forwardRef={headerRef}
				// navRef={headNavRef}
				classes={{
					innerContent: 'inner-head',
				}}
				professionsList={props.allProfessions}
				onBackClick={() => router.back()}
				showBack
				showBanner
				entityData={partnerData}
				currencyData={currencyData}
				languageData={props.partnerData.language}
				smallEntitySelect
				dynamicFilters={''}
				t={t}
				config={props.configData}
				suggestionsList={[]}
				celebDetails={{}}
				searchRef={searchRef}
				smallEntitySelect
				showCategories
				userValue={{
					error: '',
					fromSocialMedia: false,
					isStar,
					loading: false,
					role: '',
					settings_celebrityDetails: {},
					settings_userDetails: {},
					userDataLoaded: false
				}}
				searchProps={{
					placeholder: 'Search for your favorite Talent' }}
			/>
			<Layout>
				{subCategory && (
					<span className="title-link">
						<h1 className="cat-heading">{subCategory.title}</h1>
						<HighlightText onClick={() => {router.push(`/category/${subCategory.slug}`);}}>{t('common.viewAll')}</HighlightText>
					</span>
				)}
				<List>
					{subCategory &&
            subCategory.child &&
            subCategory.child.length > 0 &&
            subCategory.child.map(cat => {
            	return (
            		<ListItem key={cat.slug} onClick={() => {router.push(`/category/${cat.slug}`);}}>
            			<FlexItem>
            				<FlexItem>
            					<Image image={cat.top_celebrity_image} />
            					<span className="cat-item">{cat.title}</span>
            				</FlexItem>
            				<FontAwesomeIcon icon={faChevronRight} />
            			</FlexItem>
            		</ListItem>
            	);
            })}
				</List>
			</Layout>
		</>  );
}

export async function getStaticPaths() {
	const professions = await getProfessions();
	const paths = [];
	const domains = getDeliveryPaths();
	domains.forEach(domain => {
		professions.forEach(prof => {
			i18n.locales.forEach(locale => {
				if (domain.locale === locale) {
					paths.push({ params: { catSlug: prof.slug, site: domain.params.site }, locale });
				}
			});
		});
	});
	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps({params, locale}) {

	const queryClient = new QueryClient();

	const { site } = params;
	const { partnerData, currencyData, languageData } = await getEntity(site, locale);
	const entityId = partnerData.entity_id;
	const entityToken = partnerData.public_token;
	const { algolia_index: algoliaIndex } = partnerData;
	await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData });

	const config = await getConfig(entityId, entityToken);

	// await queryClient.prefetchQuery(['algolia', algoliaIndex], () => algoliaQueryPerIndex(algoliaIndex))
	const professions = await getProfessions();
	let subProfessions = [];
	if (professions) {
		professions.forEach(prof => {
			subProfessions = [...subProfessions, ...prof.child];
		});
	}
	const selectedCategory = findCategory(params.catSlug, professions, subProfessions);
	return {
		props: {
			locale,
			partnerData: { entityId, entityToken },
			subCategory: selectedCategory,
			subProfessions,
			configData: config,
			allProfessions: professions,
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),

		},
		revalidate: 60,
	};
}

export default CategoryListPage;
