import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import { localeEntity } from 'src/services/entities/localeEntity';
import {  getEntity, getEntityPaths } from 'src/services/myfanpark';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { dehydrate } from 'react-query/hydration';
import axios from 'axios';
import { i18n } from 'next-i18next.config';
import SuperCharge from 'components/ProductLayout/components/SuperCharge/SuperCharge';
import Engage from 'components/ProductLayout/components/Engage/Engage';
import DanielleSection from 'components/ProductLayout/components/DanielleSection/DanielleSection';
import Features from 'components/ProductLayout/components/Features/Features';
import Experts from 'components/ProductLayout/components/Experts/Experts';
import CommFooter from 'components/CommFooter';
import { Wrapper } from 'components/ProductLayout/styled';
import CommNavbar from 'components/CommNavbar';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';

function ProductLayout() {
	return (
		<Wrapper className="Product">
			<CommNavbar />
			<SuperCharge />
			<Engage />
			<DanielleSection />
			<Features />
			<Experts />
			<CommFooter />
		</Wrapper>
	);
}

export default ProductLayout;

export async function getStaticPaths() {
	const array = ['talent'];
	const paths = [];
	const domains = getDeliveryPaths();
	domains.forEach(domain => {
		i18n.locales.forEach(locale => {
			if (domain.locale === locale) {
				array.forEach(celebrityId => {
					paths.push({
						params: {
							celebrityId,
							locale,
							site: domain.params.site
						}
					});
				});
			}
		});
	});
	return {
		paths,
		fallback: 'blocking',
	};
}

export async function getStaticProps(props) {
	const { params: { celebrityId, site }, locale } = props;

	try {

		const { partnerData, currencyData, languageData } = await getEntity(site, locale);
		const entityId = partnerData.entity_id;
		const entityToken = partnerData.public_token;

		const queryClient = new QueryClient();

		await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale));
		const entity = await getEntityPaths(entityId, entityToken);
		const array = ['talent', ...entity.map(row => row.entities[0]?.talent_plural_name)];
		if (!array.includes(celebrityId)) {
			return {
				notFound: true
			};
		}
		// await queryClient.prefetchQuery('config', () => getConfig(entityId, entityToken))

		// const professions = await getProfessions()

		return {
			props: {
				dehydratedState: dehydrate(queryClient),
				partnerData: { entityId, entityToken },
				entity,
				...(await serverSideTranslations(locale, ['common', 'footer'])),

			},
			revalidate: 60,
		};
	} catch (e) {
		return {
			props: {
				error: e.message,
				...(await serverSideTranslations(locale, ['common', 'footer'])),
			}
		};
	}
}