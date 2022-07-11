import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
import BrowseStarsLayoutContainer from '../../../../../components/PageStyles/BrowseStars/Layout/LayoutContainer';
// import BrowseStarsLayoutContent from '../../../components/PageStyles/BrowseStars/Layout/LayoutContent';
import { findCategory } from '../../../../../components/PageStyles/BrowseStars/utils';
import { i18n } from '../../../../../next-i18next.config';
import { localeEntity } from '../../../../../src/services/entities/localeEntity';
import { getConfig, getEntity, getProfessions } from '../../../../../src/services/myfanpark';
import { isEmpty } from '../../../../../src/utils/dataStructures';

function BrowseCategories() {
  return (
    <div>
      Inside Browse Categories
    </div>
  )
}

BrowseCategories.getLayout = page => (
  <BrowseStarsLayoutContainer {...page.props} >
    {page}
</BrowseStarsLayoutContainer>
)

export async function getStaticPaths() {
  const professions = await getProfessions()
  const paths = []
  const domains = getDeliveryPaths()
  domains.forEach(domain => {
    professions.forEach(prof => {
      i18n.locales.forEach(locale => {
        if (domain.locale === locale) {
          paths.push({ params: { catSlug: prof.slug, site: domain.params.site }, locale })
        }
      })
    })
  })
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({params, locale}) {

  const queryClient = new QueryClient()
  const { site } = params

  const { partnerData, currencyData, languageData } = await getEntity(site, locale)
  const entityId = partnerData.entity_id
  const entityToken = partnerData.public_token
  const { algolia_index: algoliaIndex } = partnerData;
  await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData })

  const config = await getConfig(entityId, entityToken);

  // await queryClient.prefetchQuery(['algolia', algoliaIndex], () => algoliaQueryPerIndex(algoliaIndex))
  const professions = await getProfessions()
  let subProfessions = [];
  if (professions) {
    professions.forEach(prof => {
      subProfessions = [...subProfessions, ...prof.child]
    })
  }
  const selectedCategory = findCategory(params.catSlug, professions, subProfessions)
  if (isEmpty(selectedCategory)) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      locale,
      partnerData: { entityId, entityToken },
      selectedCategory,
      subProfessions,
      configData: config,
      allProfessions: professions,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common', 'footer'])),

    },
    revalidate: 60,
  }
}

export default BrowseCategories
