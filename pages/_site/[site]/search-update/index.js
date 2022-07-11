import AddStarCategory from 'components/Search/components';
import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getAllProfessions, getConfig, getEntity, getProfessions } from 'src/services/myfanpark';
import { localeEntity } from 'src/services/entities/localeEntity';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';

function SearchUpdate() {
	return (
		<AddStarCategory />
	);
}

export default SearchUpdate;

export async function getStaticPaths() {
	const paths = getDeliveryPaths();
	return {
		paths,
		fallback: 'blocking'
	};
}

export async function getStaticProps({ locale, params: { site } }) {

	const { partnerData, currencyData, languageData } = await getEntity(site, locale);
	const entityId = partnerData.entity_id;
	const entityToken = partnerData.public_token;
	const queryClient = new QueryClient();


	// const { algolia_index: algoliaIndex } = partnerData;
	await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale));

	const config = await getConfig(entityId, entityToken);
	// const users = partnerData.v3_experiences?.data?.map(row => row.id) || partnerData.v3_experiences.map(row => row.id)
	// await queryClient.prefetchQuery('v3Users', () => getV3Users({users}))
	// await queryClient.prefetchQuery(['algolia', algoliaIndex], () => algoliaQueryPerIndex(algoliaIndex))
	await queryClient.prefetchQuery('professions', () => getAllProfessions(), {
		initialData: {
			professions: [],
			subcategories: [],
			allProfessions: []
		}
	});
	return {
		props: {
			locale,
			partnerData: { entityId, entityToken },
			configData: config,
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),

		},
		revalidate: 60,
	};
}
