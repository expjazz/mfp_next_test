import React from 'react'
import { dehydrate } from 'react-query/hydration'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient } from 'react-query';
import ResetPasswordForm from 'components/ResetPasswordForm'
import { getDeliveryPaths } from 'src/utils/getDomainPaths'
import { getEntity } from 'src/services/myfanpark';

function ResetPassword() {
  return (
   <ResetPasswordForm />
  )
}

export default ResetPassword

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
