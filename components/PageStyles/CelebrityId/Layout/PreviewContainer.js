import axios from 'axios';
import Loader from 'components/Loader';
import OutterLoader from 'components/OutterLoader';
import { useConfigPartner, useGetCelebFeaturedVideos, useGetCelebFunStuff, useGetCelebProducts, useGetCelebReactionsFull, useGetCelebrityData, useGetCelebSimilarStars, useGetCelebSocial, useGetCelebTopProducts, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';
import React from 'react'
import { localeEntity } from 'src/services/entities/localeEntity';
import PreviewContent from './PreviewContent';
import StarShowLayoutContainer from './StarShowLayoutContainer';

function StarPreviewContainer(props) {
  const router = useRouter()
  const { query: { celebrityId }, locale } = router


    const { entityId, entityToken } = localeEntity(locale);

    axios.interceptors.request.use(config => {
      config.headers['entity-id'] = entityId
      config.headers['entity-token'] = entityToken
    })

    const { data: userData, isLoading } = useFetchLoggedUser()

    const { isLoading: partnerLoading } = useGetPartner()
    const { isLoading: celebLoading , data: celebData} = useGetCelebrityData()
    const { isLoading: featuredVideosLoading } = useGetCelebFeaturedVideos()
    const { isLoading: funStuffLoading } = useGetCelebFunStuff()
    const { isLoading: socialLoading } = useGetCelebSocial()
    const { isLoading: reactionsFull } = useGetCelebReactionsFull()
    const { isLoading: productsLoading } = useGetCelebProducts()
    const { isLoading: topProductsLoading } = useGetCelebTopProducts()
    const { isLoading: configLoading } = useConfigPartner()
    const { isLoading: similarLoading } = useGetCelebSimilarStars()

  //   await queryClient.prefetchQuery


  //   await queryClient.prefetchQuery(['celebritySimilarStars', celebrityId], () => getCelebritySimilarStars({ celebrityId }, 10, 0))

  //   await queryClient.prefetchQuery([celebrityId, 'allPromoImgs'], () => fetchAllPromoImgs(celebrityId))
  //   const professions = await getProfessions()

  //   const localProps = {
  //     partnerData: { entityId, entityToken },
  //     professions,

  //   }
  if (partnerLoading ||
      isLoading ||
      celebLoading ||
      featuredVideosLoading ||
      funStuffLoading ||
      socialLoading ||
      reactionsFull ||
      productsLoading ||
      topProductsLoading ||
      configLoading ||
      !celebData) {
        return <OutterLoader />
      }
      return (
      <StarShowLayoutContainer {...props} >
        {/* <h2>test</h2> */}
        <PreviewContent {...props} {...props.pageProps} />
      </StarShowLayoutContainer>
  )
}

export default StarPreviewContainer
