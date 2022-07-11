import { useMediaQuery } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import React, { createRef, useRef, useState } from 'react'
import { requestTypesKeys } from '../../../../../src/constants/requestTypes';
import { purchaseUrl } from '../../../../../src/constants/url/purchaseUrl';
import TopProducts from '../TopProducts';
import ListComp from './components/ListComp';
import { Wrap, Content, ContentWrap } from './styled';
import Button from '../../../../SecondaryButton'
import { LinkText } from '../../../../../styles//TextStyled';
import CardDisplay from '../../../../CardDisplay';
import { SmallHeading } from '../../styled';
import SimilarStars from '../SimilarStars';
import Link from 'next/link';
import { useGetCelebrityData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

function PostSection({
  shoutVideos,
  detailsLoading,
  userId,
  reactionVideos,
  fetchCelebVideosList,
  isFollow,
  isBookable,
  setShowHow,
  toggleBookingModal,
  topProds,
  similarStars
}) {
  const { t } = useTranslation()
  const { data: celebData } = useGetCelebrityData()
  const celebDetails = celebData?.celebrity_details
  const userDetails = celebData?.user
  const { data: entityData } = useGetPartner()
  const { isStar } = useFetchLoggedUser()
  const firstPostRef = useRef(null);
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const [posts, setPosts] = useState({
    data: [],
    offset: 0,
    limit: 5,
    count: -1,
    loading: false,
  })
  const renderPost = (postItem, postsRef) => {
    return postItem ? (
      <h1>post</h1>
    ) : null
  }
  const [postsRef, setPostsRef] = useState(posts.data.map(() => createRef()));

  return (
    <Wrap>
      <ContentWrap>
        <section className='left-section'>
          <TopProducts
            topProds={topProds || []}
            disabledSubHead
            userId={userId}
            availability={celebDetails.availability}
            promoCode={celebDetails.promocode}
            discount={celebDetails.discount}
            celebId={userDetails.id}
            // fanEmail={} waiting for logged user
            isStar={isStar}
            userDetails={userDetails}
          />
        </section>
        <section className="right-section">
          {
            (shoutVideos?.data?.length > 0 || celebDetails.profile_video) ? (
             <Content>
              <ListComp
                  list={shoutVideos}
                  isBookable={isBookable}
                  featuredItem={celebDetails.profile_video && celebDetails.profile_video ? {
                    type: 'video',
                    thumbnail: celebDetails.thumbnail,
                    url: celebDetails.profile_video,
                    isWelcome: true,
                  } : null}
                  toggleBookingModal={toggleBookingModal}
                  followText={t('star_profile.videoFollow')}
                  isFollow={isFollow}
                  onFetch={(offset, refresh) => fetchCelebVideosList(userId, offset, refresh)}
                  renderFooterCTA={() => isBookable ? (

                                    <>
                                      <Link
                                        href={`/${userId}${purchaseUrl[requestTypesKeys.shoutout]}`}
                                        passHref
                                      >
                                        <a>
                                          <Button className='sh-btn' disabled={!isBookable} secondary={!isDesktop}>
                                              {t("star_profile.getShout")}
                                          </Button>
                                        </a>
                                      </Link>
                                      <a className='how-works' onClick={() => setShowHow(true)}>
                                        {t('common.howDoesWork')}?
                                      </a>
                                    </>
                                    ) : (
                                    <>
                                      <span
                                        href={`/${userId}${purchaseUrl[requestTypesKeys.shoutout]}`}
                                        passHref
                                      >
                                          <Button className='sh-btn' disabled={!isBookable} secondary={!isDesktop}>
                                              {t("star_profile.getShout")}
                                          </Button>
                                      </span>
                                      <a className='how-works' onClick={() => setShowHow(true)}>
                                        {t('common.howDoesWork')}?
                                      </a>
                                    </>
                                    )}
                  />
             </Content>
            ) : !isDesktop ? <Content><TopProducts
                userId={userId}
                filterAmount={3}
                topProds={topProds || []}
                availability={celebDetails.availability}
                promoCode={celebDetails.promocode}
                discount={celebDetails.discount}
                celebId={userDetails.id}
                // fanEmail={} waiting for logged user
                isStar={isStar}
                userDetails={userDetails}
              /></Content> : null
          }
          {
            posts.data[0] ?
              <Content className='post-section' ref={firstPostRef}>
                {
                  renderPost(posts.data[0], postsRef[0])
                }
              </Content>
            : null
          }
          <Content>
            <SmallHeading className='main-heading'>
              { t('common.howSiteWorks',  { site: entityData?.partnerData.partner_name }) }
            </SmallHeading>
            <CardDisplay
              className='card-display'
              starName={userDetails.starName}
              responseTime={celebDetails.responseTime}
            />
          </Content>
          {
            posts.data[1] ?
              <Content className='post-section'>
                {
                  renderPost(posts.data[1], postsRef[1])
                }
              </Content>
            : null
          }
          <Content className="bottom-border">
            <SmallHeading className='main-heading'>{t('common.suggestionsFor')}</SmallHeading>
            <SimilarStars
              celebId={userDetails.id}
              userId={userDetails.user_id}
              dataList={similarStars}
            />
          </Content>
          {
            posts.data[2] ?
              <Content className='post-section'>
                {
                  renderPost(posts.data[2], postsRef[2])
                }
              </Content>
            : null
          }
          <Content noTopPadding>
            {
              reactionVideos.data.length >= 2  ?
                <React.Fragment>
                  <ListComp
                    list={reactionVideos}
                    isFollow={isFollow}
                    toggleBookingModal={toggleBookingModal}
                    followText={t('star_profile.reactionFollow')}
                    onFetch={(offset, refresh) => fetchCelebReactionsList(userId, offset, refresh)}
                    renderFooterCTA={() => isBookable ? (

                      <>
                        <Link
                          href={`/${userId}${purchaseUrl[requestTypesKeys.shoutout]}`}
                          passHref
                        >
                          <a>
                            <Button className='sh-btn' disabled={!isBookable} secondary={!isDesktop}>
                                {t("star_profile.getShout")}
                            </Button>
                          </a>
                        </Link>
                        <a className='how-works' onClick={() => setShowHow(true)}>
                          {t('common.howDoesWork')}?
                        </a>
                      </>
                    ) : (
                      <>
                        <span
                          href={`/${userId}${purchaseUrl[requestTypesKeys.shoutout]}`}
                          passHref
                        >
                            <Button className='sh-btn' disabled={!isBookable} secondary={!isDesktop}>
                                {t("star_profile.getShout")}
                            </Button>
                        </span>
                        <a className='how-works' onClick={() => setShowHow(true)}>
                          {t('common.howDoesWork')}?
                        </a>
                      </>
                    )}
                  />
                </React.Fragment>
              :
                null
            }
          </Content>
          {
            posts.data[3] ?
              <Content className='post-section'>
                {
                  renderPost(posts.data[3], postsRef[3])
                }
              </Content>
            : null
          }
          {!isDesktop && (<Content>
          <TopProducts
            disabledSubHead
            userId={userId}
            filterAmount={3}
            topProds={topProds || []}
            availability={celebDetails.availability}
            promoCode={celebDetails.promocode}
            discount={celebDetails.discount}
            celebId={userDetails.id}
            // fanEmail={} waiting for logged user
            isStar={isStar}
            userDetails={userDetails}
          />
          </Content>)}
        </section>
      </ContentWrap>
    </Wrap>
  )
}

export default PostSection

//   availability: state.starDetails.celebDetails.celebrityDetails.availability,
//   promoCode: state.starDetails.celebDetails.celebrityDetails.promocode,
//   discount: state.starDetails.celebDetails.celebrityDetails.discount,
//   celebId: state.starDetails.celebDetails.userDetails.id,
//   isStar: state.userDetails.settings_userDetails.isStar,
//   fanEmail: state.userDetails.settings_userDetails.email,
//   userDetails: state.starDetails.celebDetails.userDetails,