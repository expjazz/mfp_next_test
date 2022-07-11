import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { QueryClient, useQuery } from 'react-query';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { dehydrate } from 'react-query/hydration';
// import { getConfig, getEntity, getProfessions } from '../src/services/myfanpark'
import { editGeneralState, useGeneral } from '../../../../src/context/general';
import { localeEntity } from '../../../../src/services/entities/localeEntity';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { fetchCelebrityList, getConfig, getEntity, getProfessions, getSalesMessages } from '../../../../src/services/myfanpark';
import HeaderV3 from '../../../../components/HeaderV3';
import CategoryPageStyled from '../../../../components/PageStyles/BrowseStars/styled';
import { queryParamUpdater } from '../../../../src/utils/urlUtils';
import { useRouter } from 'next/router';
import MetaGenerator from '../../../../components/PageStyles/BrowseStars/components/MetaGenerator';
import FilterSection from '../../../../components/PageStyles/BrowseStars/components/FilterSection';
import { prioSort } from '../../../../components/PageStyles/BrowseStars/constants';
import { useData, useFilters } from '../../../../components/PageStyles/BrowseStars/services/useFilters';
// import StarListing from '../../components/StarListing'
import { isBrowser } from '../../../../customHooks/domUtils';
import RowMessage from '../../../../components/PageStyles/BrowseStars/components/RowMessage';
import TagGenerator from '../../../../components/PageStyles/BrowseStars/components/TagGenerator';
import BrowseStarsLayoutContent from '../../../../components/PageStyles/BrowseStars/Layout/LayoutContent';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';

function BrowseStars(props) {
	return <p>inside</p>;
}

BrowseStars.getLayout = page => (
	<BrowseStarsLayoutContent {...page.props} >
		{page}
	</BrowseStarsLayoutContent>
);

export async function getStaticPaths() {
	const paths = getDeliveryPaths();
	return {
		paths,
		fallback: 'blocking'
	};
}


export async function getStaticProps({locale, params: { site }}) {
	const { partnerData, currencyData, languageData } = await getEntity(site, locale);
	const entityId = partnerData.entity_id;
	const entityToken = partnerData.public_token;
	const queryClient = new QueryClient();


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
	await queryClient.setQueryData('professions', {
		professions,
		subCategories: subProfessions,
		allProfessions: professions,
	});
	return {
		props: {
			locale,
			partnerData: { entityId, entityToken },
			configData: config,
			allProfessions: professions,
			subProfessions,
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),

		},
	};
}

export default BrowseStars;
