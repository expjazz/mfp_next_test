import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
import BrowseStarsLayoutContainer from '../../../../../components/PageStyles/BrowseStars/Layout/LayoutContainer';
import BrowseStarsLayoutContent from '../../../../../components/PageStyles/BrowseStars/Layout/LayoutContent';
import { getBookingsFrontPageDefault } from '../../../../../components/PageStyles/V3Home/components/bookings/constants';
import { i18n } from '../../../../../next-i18next.config';
import { localeEntity } from '../../../../../src/services/entities/localeEntity';
import { getConfig, getEntity, getProfessions, getTagDetails } from '../../../../../src/services/myfanpark';

function TagBrowseStars() {

	return (
		<div>
      tag
		</div>
	);
}

TagBrowseStars.getLayout = page => (
	<BrowseStarsLayoutContainer {...page.props} >
		{page}
	</BrowseStarsLayoutContainer>
);

export async function getStaticPaths() {
	const paths = [];
	const domains = getDeliveryPaths();
	domains.forEach(domain => {
		getBookingsFrontPageDefault.forEach(tag => {
			i18n.locales.forEach(locale => {
				if (domain.locale === locale) {
					paths.push({ params: { tagSlug: tag.url?.split('/')[1], site: domain.params.site }, locale });
				}
			});
		});
	});

	return {
		paths,
		fallback: 'blocking'
	};
}

export async function getStaticProps(context) {
	const { params, locale } = context;
	const resp = await getTagDetails(params.tagSlug.toLowerCase());
	if (resp?.error || !resp?.data || !resp.data?.tags) {
		return {
			notFound: true
		};
	}
	const selectedTag = {
		name: resp.data.tags.name,
		id: resp.data.tags.id,
		desc: resp.data.tags.description,
		label: resp.data.tags.name,
		image: resp.data.tags.image,
		entities: resp.data.tags.entities ? resp.data.tags.entities.map(row => row.entity_id) : [],
		start_date: resp.data.tags.start_date,
		end_date: resp.data.tags.end_date,
		availability: resp.data.tags.availability
	};

	const { site } = params;
	const { partnerData, currencyData, languageData } = await getEntity(site, locale);
	const entityId = partnerData.entity_id;
	const entityToken = partnerData.public_token;

	const queryClient = new QueryClient();

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
	return {
		props: {
			locale,
			partnerData: { entityId, entityToken },
			selectedTag,
			subProfessions,
			configData: config,
			allProfessions: professions,
			dehydratedState: dehydrate(queryClient),
			...(await serverSideTranslations(locale, ['common', 'footer'])),

		},
		revalidate: 60
	};
}


export default TagBrowseStars;


