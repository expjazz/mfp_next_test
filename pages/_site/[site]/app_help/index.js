import React, { useEffect } from 'react'
import Button from 'components/SecondaryButton';
import styled from '@emotion/styled';
import { dehydrate } from 'react-query/hydration'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient } from 'react-query';
import { useTranslation } from 'next-i18next';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
import { getEntity } from 'src/services/myfanpark';

const HelpStyled = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function AppHelp() {
  const { t } = useTranslation();

  useEffect(() => {
    if (window.FreshworksWidget) {
      window.FreshworksWidget('open');
    }
  }, [])

  return (
    <HelpStyled>
      <Button>
        { t('common.appPage') }
      </Button>
    </HelpStyled>
  )
}

export default AppHelp

export async function getStaticPaths() {
  const paths = getDeliveryPaths()
  return {
    paths,
    fallback: 'blocking'
  }
}


export async function getStaticProps({locale, params: { site }}) {

  const queryClient = new QueryClient()


  await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale))
  return {
    props: {
      locale,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common', 'footer'])),

    },
  }
}
