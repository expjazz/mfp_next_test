import { useRouter } from 'next/router';
import { dehydrate } from 'react-query/hydration'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient } from 'react-query';
import React, { useEffect } from 'react';
import CommFooter from 'components/CommFooter';
import CommNavbar from 'components/CommNavbar';
import { Banner } from 'components/LegacyHeader/styled';
import ArtistContainer from 'components/SignupPageComponents/components/ArtistContainer/ArtistContainer';
import Concierge from 'components/SignupPageComponents/components/Concierge/Concierge';
import Sponsers from 'components/SignupPageComponents/components/Sponsers/Sponsers';
import Stars from 'components/SignupPageComponents/components/Stars/Stars';
import Storefront from 'components/SignupPageComponents/components/Storefront/Storefront';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { Wrapper } from 'components/SignupPageComponents/styled'
import { toggleSignup, useGeneral } from 'src/context/general';
import { setSignupFlow } from 'src/context/session';
import { getDeliveryPaths } from 'src/utils/getDomainPaths';
import { getEntity } from 'src/services/myfanpark';
function Signup() {
  const { isLoggedIn } = useFetchLoggedUser()
  const router = useRouter()
  const dispatch = useGeneral()[1]
  const localSetSignupFlow = payload => setSignupFlow(dispatch, payload)
  const localToggleSignup = payload => toggleSignup(dispatch, payload)
  useEffect(() => {
    if (!isLoggedIn) {
      const queryString = router.query;
      if (queryString.role === 'star') {
        localSetSignupFlow({
          role: 'star',
          disableRoleChange: true,
        });
      } else if (queryString.role === 'fan') {
        localSetSignupFlow({
          role: 'fan',
          disableRoleChange: true,
        });
      }
      localToggleSignup(true);
    }
    const queryString = router.query
    if (queryString.migrated === 'true' && !isLoggedIn) {
      // props.setDemoUser(true);
      localToggleSignup(true);
    }
  }, []);

  return (
    <Wrapper className="home">
      <CommNavbar />
      <Banner />
      <Storefront />
      <ArtistContainer />
      <Stars />
      <Concierge />
      <Sponsers />
      <CommFooter />
    </Wrapper>
  );
}

export default Signup;

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
