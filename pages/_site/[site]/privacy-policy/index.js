import { useGetPartner, useTermsServices } from 'customHooks/reactQueryHooks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useRef, useState } from 'react'
import { QueryClient, useQuery } from 'react-query'
import dompurify from 'isomorphic-dompurify';

import { dehydrate } from 'react-query/hydration'
import { localeEntity } from 'src/services/entities/localeEntity'
import { getConfig, getEntity, getProfessions } from 'src/services/myfanpark'
import { getTermsPolicy } from 'src/services/myfanpark/termsActions'
import { Wrap, Content } from 'components/PageStyles/TermsServices/styled';
import HeaderV3 from 'components/HeaderV3';
import { useCurrencyData } from 'customHooks/currencyUtils';
import { HTMLContentWrapper } from 'styles/CommonStyled';
import { useTranslation } from 'react-i18next'
import FooterComp from 'components/Footer';
import { useGeneral } from 'src/context/general';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
import { axiosFetch } from 'src/services/fetch';
function PrivacyPolicy(props) {
  const [state] = useGeneral()
  const { isStar } = useFetchLoggedUser()
  const { data } = useTermsServices()
  const { data: { partnerData, currencyData } } = useGetPartner()
  const content = data?.terms_content
  const localCurrencyData = useCurrencyData()
  const { t } = useTranslation();
  const [headerHeight, updateHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const searchRef = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      if (headerRef && headerRef.current) {
        updateHeaderHeight(headerRef.current.clientHeight);
      }
    }, 2000);
  }, [headerRef.current]);


  return (
    <Wrap headerHeight={headerHeight}>
      <HeaderV3
        forwardRef={headerRef}
        // navRef={headNavRef}
        classes={{
          innerContent: 'inner-head',
        }}
        professionsList={props.allProfessions}
        showBack
        showBanner
        entityData={partnerData}
        currencyData={currencyData || localCurrencyData}
        languageData={partnerData.language}
        smallEntitySelect
        dynamicFilters={[]}
        t={t}
        config={props.configData}
        suggestionsList={[]}
        searchRef={searchRef}
        hideHamburguer
        showCategories
        userValue={{
          error: '',
          fromSocialMedia: false,
          isStar: false,
          loading: false,
          role: '',
          settings_celebrityDetails: {},
          settings_userDetails: {},
          userDataLoaded: false
        }}
        searchProps={{
          placeholder: 'Search for your favorite Talent' }}
      />
      <h2 className="heading">{t('common.about.privacyHeading')}</h2>
      <HTMLContentWrapper className="wrap-content">
        <Content
          dangerouslySetInnerHTML={{
            __html: dompurify.sanitize(content),
          }}
        />
      </HTMLContentWrapper>
      <FooterComp
        className="footer-root"
        showHiddenLink
        showCat
        filters={state.filters}
        className="partner-footer"
        isStar={isStar}
        professions={props.allProfessions}
        entityData={partnerData}
      />
    </Wrap>
  );
}

export default PrivacyPolicy

export async function getStaticPaths() {
  const paths = getDeliveryPaths()
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({locale, params: { site }}) {
  const { partnerData, currencyData, languageData } = await getEntity(site, locale)
  const entityId = partnerData.entity_id
  const entityToken = partnerData.public_token
  axiosFetch.defaults.headers.common['entity-id'] = partnerData.entity_id
  axiosFetch.defaults.headers.common['entity-token'] = partnerData.public_token
  const queryClient = new QueryClient()
  const professions = await getProfessions()
  let subProfessions = [];
  if (professions) {
    professions.forEach(prof => {
      subProfessions = [...subProfessions, ...prof.child]
    })
  }
  const config = await getConfig(entityId, entityToken)

  await queryClient.setQueryData(['partnerData', site, locale], { partnerData, currencyData, languageData })
  await queryClient.prefetchQuery('terms-service', getTermsPolicy)

  return {
    props: {
      allProfessions: professions,
      subProfessions,
      configData: config,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    }
  }
}
