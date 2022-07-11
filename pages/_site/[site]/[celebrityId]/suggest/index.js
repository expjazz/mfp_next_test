import React, { useEffect, useMemo, useRef, useState } from 'react'
import { QueryClient, useQuery } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getCelebDetails, getCelebrityFunStuff, getCelebrityProducts, getCelebrityReactionsFull, getCelebritySimilarStars, getCelebritySocial, getCelebrityTopProducts, getEntity, getFeaturedVideos, getProfessions } from 'src/services/myfanpark'
import { useRouter } from 'next/router'
import { dehydrate } from 'react-query/hydration'
import axios from 'axios'
import PurchaseStarLayout from 'components/PageStyles/CelebrityId/Layout/Purchase'
import { localeEntity } from 'src/services/entities/localeEntity'
import { getAvtar } from 'components/PageStyles/CelebrityId/PurchaseSection/utils'
// import { CardAndButtonWrapper, CardWrapper, FooterCard, ShoutOutVideoWrapper, Wrapper } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/styled'
import { useTranslation } from 'next-i18next'
import { accountStatus } from 'src/constants/stars/accountStatus'
import { starAllowedServices } from 'components/PageStyles/CelebrityId/constants'
import { deliveryMethods } from 'src/constants/requestTypes/funTypes'
import { getActiveOptions } from 'components/PageStyles/CelebrityId/utils'
import { generalLoader, updateToast, useGeneral } from 'src/context/general'
import { ButtonWrap, CharCount, HeadingH1, Hr, Ul } from 'components/PageStyles/CelebrityId/PurchaseSection/styled'
import { reqList } from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/utils'
import RequestCard from 'components/RequestCard'
import Link from 'next/link'
import { isEmpty } from 'src/utils/dataStructures'
import { Description, LinkText } from 'styles/TextStyled'
import VideoList from 'components/PageStyles/CelebrityId/PurchaseSection/Shoutout/components/VideoList'
import CardSlide from 'components/PageStyles/CelebrityId/PurchaseSection/components/CardSlide'
import { getShortName } from 'src/utils/dataToStringFormatter'
import { requestTypesKeys } from 'src/constants/requestTypes'
import { getRating } from 'src/services/myfanpark/celebActions'
import SharePage from 'components/PageStyles/CelebrityId/PurchaseSection/components/SharePage'
import { useMediaQuery } from '@material-ui/core'
import Follow from 'components/PageStyles/CelebrityId/PurchaseSection/components/Follow'
import { locStorage } from 'src/utils/localStorageUtils'
import { useGetCelebrityData } from 'customHooks/reactQueryHooks'
import { suggestions } from 'src/services/myfanpark/bookingActions'
import SeoHeader from 'components/SeoHeader'
import { getUserImage } from 'src/utils/dataformatter'
import { Wrapper, Content } from 'components/PageStyles/CelebrityId/PurchaseSection/components/Suggestions/styled'
import { FlexCenter, TextArea } from 'styles/CommonStyled'
import Button from 'components/SecondaryButton';
import Login from 'components/Login&Signup'
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser'
import Success from 'components/Success'

function StarSuggest() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const { data: fanData } = useFetchLoggedUser()
  const isLoggedIn = !!fanData
  const [suggestion, setSuggestion] = useState('');
  const router = useRouter()
  const [state, dispatch] = useGeneral()
  const localUpdateToast = payload => updateToast(dispatch, { ...payload, global: true })
  const loaderAction = payload => generalLoader(dispatch, payload)
  const onSuccess = () => {
    // setSuccess(true);
    router.push(`/${router.query.celebrityId}/thankyou?suggest=true`)
  };

  const backHandler = () => {
    router.back();
  };

  const suggestionChange = (e) => {
    const { value } = e?.target
    setSuggestion(value);
  };
  const onSubmit = () => {
    loaderAction(true);
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'submit_suggestions' });
    }
    suggestions('post', celebrityData?.user.user_id, {
      suggestion,
    })
      .then(res => {
        loaderAction(false);
        if (res && res.data) {
          onSuccess();
        } else {
          localUpdateToast({
            value: true,
            message: t('common.commonApiError'),
            variant: 'error',
          });
        }
      })
      .catch(() => {
        loaderAction(false);
        localUpdateToast({
          value: true,
          message: t('common.commonApiError'),
          variant: 'error',
        });
      });
  };

  const { data: celebrityData } = useGetCelebrityData()

  const starNM = useMemo(() => {
    return getShortName(
      celebrityData?.user.nick_name,
      celebrityData?.user.first_name,
    );
  }, []);


  const authSuccess = () => {
    onSubmit();
  };

  // if (success) {
  //   const data = {
  //     successMsg: t('common.thank_you_suggestion'),
  //     note: t('purchase_flow.suggestion_note', { starNM }),
  //   };
  //   return (
  //     <React.Fragment>
  //       <Wrapper reqDisplay>
  //         <Success {...data} noShare backHandler={backHandler} />
  //       </Wrapper>
  //       <Hr />
  //     </React.Fragment>
  //   );
  // }

  return (
    <React.Fragment>
      <Wrapper className="pay-wrp" reqDisplay>
        <Content>
          <HeadingH1>{t('purchase_flow.suggestions.title')}</HeadingH1>
          <Description className="note" center={!isLoggedIn}>
            {t('purchase_flow.suggestions.description', { starNM })}
          </Description>
          <React.Fragment>
            <TextArea
              autoSize
              onChange={suggestionChange}
              inputProps={{
                placeholder: t('purchase_flow.suggestions.placeholder'),
                value: suggestion,
                onChange: suggestionChange,
                maxLength: 500,
              }}
            />
            <CharCount>
              {t('purchase_flow.char_remains', {
                length: 500 - suggestion.length,
              })}
            </CharCount>
            {isLoggedIn && (
              <FlexCenter className="sub-btn">
                <Button
                  disabled={
                    suggestion === '' ||
                    fanData?.celebrity_details ||
                    !celebrityData?.user.talent_status ===
                      accountStatus.live
                  }
                  isDisabled={
                    suggestion === '' ||
                    fanData?.celebrity_details ||
                    !celebrityData?.user.talent_status ===
                      accountStatus.live
                  }
                  onClick={onSubmit}
                >
                  {t('common.submitButton')}
                </Button>
              </FlexCenter>
            )}
          </React.Fragment>
          {!isLoggedIn && (
            <Login
              noSocial
              noPassword
              default="signup"
              authSuccess={authSuccess}
            />
          )}
        </Content>
      </Wrapper>
      <Hr mob />

        <SeoHeader
          title={t('purchase_flow.sug_meta_title')}
          shareImage={getUserImage(celebrityData?.user.avatar_photo)}
          description={""}
          keywords={""}
      />
    </React.Fragment>
  );
}
StarSuggest.getLayout = page => (
  <PurchaseStarLayout pageProps={page.props} >
    {page}
  </PurchaseStarLayout>
)

export async function getStaticPaths() {
  return {
    paths: [
      // { params:  { celebrityId: 'primrose' }, locale: 'en-US' },
      // { params:  { celebrityId: 'primrose' }, locale: 'en-ZA' },
      // { params:  { celebrityId: 'primrose' }, locale: 'en-IN' },
      // { params:  { celebrityId: 'primrose' }, locale: 'en-CA' },
      // { params:  { celebrityId: 'primrose' }, locale: 'de' }
    ],
    fallback: 'blocking',
  }
}

export async function getStaticProps(props) {
  const { params: { celebrityId, site }, locale } = props

  try {

    const { partnerData, currencyData, languageData } = await getEntity(site, locale)
    const entityId = partnerData.entity_id
    const entityToken = partnerData.public_token

    const queryClient = new QueryClient();


    await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale))

    await queryClient.prefetchQuery(['getCelebDetails', celebrityId, false], () => getCelebDetails({ celebrityId, entityId, entityToken }))

    await queryClient.prefetchQuery(['featuredVideos', celebrityId], () => getFeaturedVideos({ celebrityId, limit: 20, offset: 0 }))

    await queryClient.prefetchQuery(['celebrityFunStuff', celebrityId], () => getCelebrityFunStuff({ celebrityId }))

    await queryClient.prefetchQuery(['celebritySocialMedia', celebrityId], () => getCelebritySocial({ celebrityId }))

    await queryClient.prefetchQuery(['celebrityReactionsFull', celebrityId], () => getCelebrityReactionsFull({ celebrityId }, 10, 0))

    await queryClient.prefetchQuery(['celebrityProducts', celebrityId], () => getCelebrityProducts({ celebrityId }))
    await queryClient.prefetchQuery(['celebrityTopProducts', celebrityId], () => getCelebrityTopProducts({ celebrityId }))

    await queryClient.prefetchQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0))
    await queryClient.prefetchQuery(['celebrityFanRating', celebrityId], () => getRating(celebrityId,
      [
        requestTypesKeys.shoutout,
        requestTypesKeys.event,
        requestTypesKeys.qa,
      ].join(','),
    ))
    const professions = await getProfessions()

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        partnerData: { entityId, entityToken },
        professions,
        ...(await serverSideTranslations(locale, ['common', 'footer'])),

    },
    revalidate: 60,
  }
} catch (e) {
    return {
      props: {
        error: e.message
      }
    }
  }
}
export default StarSuggest

