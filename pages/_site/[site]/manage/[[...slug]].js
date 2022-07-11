import ManageStyled, { RightContentWrapper, UploadListStyled, ModalContainer } from 'components/PageStyles/ManageStar/styled'
import { isBrowser, isPipt, notPipt, useResizeObserver } from 'customHooks/domUtils'
import useFetchLoggedUser, { useLogout, useProfileLogout } from 'customHooks/sessionUtils/useFetchLoggedUser'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  faHome,
  faArrowSquareRight,
  faNetworkWired,
} from '@fortawesome/pro-light-svg-icons';
import { locStorage } from 'src/utils/localStorageUtils'
import StarManageHeader from 'components/StarManageHeader'
import { useTranslation } from 'next-i18next'
import MenuInner from 'components/MenuList'
import { useDashboardData, useGetPartner } from 'customHooks/reactQueryHooks'
import { getLinks, getStoreSubMenu } from 'components/PageStyles/ManageStar/constants'
import { useMediaQuery } from '@material-ui/core'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { localeEntity } from 'src/services/entities/localeEntity'
import { getAllProfessions, getConfig, getEntity, getProfessions } from 'src/services/myfanpark'
import { dehydrate } from 'react-query/hydration'
import { QueryClient, useQueryClient } from 'react-query'
import BackHeader from 'components/BackHeader'
import PageStatus from 'components/PageStatus'
import ConciseCard from 'components/StarCard/ConciseCard'
import { getStarName } from 'src/utils/dataToStringFormatter'
import MenuList from 'components/SideMenu'
import dynamic from 'next/dynamic'
import PageContainer from 'components/PageStyles/ManageStar/PageContainer'
import { updateNotification, updateNotificationViewed, updateUserDetails } from 'src/services/myfanpark/celebActions'
import { confirmSave, generalLoader, toggleFullView, updateToast, useGeneral } from 'src/context/general'
import ConfirmSave from 'components/ConfirmSave'
import ErrorHandler from 'components/ErrorHandler'
import Toast from 'components/Toast'
import { cloneDeep } from 'src/utils/dataStructures';
import UploadComponent from 'components/UploadComponent'
import UploadList from 'components/UploadList'

const External = dynamic(() => import('components/SettingsComponents/External'), {
  ssr: false
})

const Bookings = dynamic(() => import('components/Bookings'), {
  ssr: false
})

const Dashboard = dynamic(() => import('components/Dashboard'), {
  ssr: false
})

const Promote = dynamic(() => import('components/Promote'), {
  ssr: false
})

const ManageStarProfile = dynamic(() => import('components/manageStarProfile/manageStarProfile.component'), {
  ssr: false
})

const Settings = dynamic(() => import('components/StarSettings'), {
  ssr: false
})

const RecentActivity = dynamic(() => import('components/RecentActivity'), {
  ssr: false
})

const Service = dynamic(() => import('components/Services'), {
  ssr: false
})

const Suggestions = dynamic(() => import('components/Suggestion'), {
  ssr: false
})

const Performance = dynamic(() => import('components/Performance'), {
  ssr: false
})

const Marketing = dynamic(() => import('components/Marketing'), {
  ssr: false
})

function ManageCelebrity() {
  const logout = useProfileLogout()
  const router = useRouter()
  const { slug } = router.query
  const { data: entityData } = useGetPartner()
  const pathname = router.asPath
  const [firstRender, setFirstRender] = useState(true)
  const isMobile = useMediaQuery('(max-width: 831px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { t } = useTranslation()
  const { data: userData } = useFetchLoggedUser()
  const celbData = userData?.celebrity_details || userData?.celelebrity_details
  const { data: dashboardData } = useDashboardData()
  const [headerHeight, updateHeaderHeight] = useState(0)
  const [headerRef, setHeaderRef] = useState(null)
  const isStar = !!userData && userData.celebrity_details
  // const redirect = useMemo(() => {
  //   if (
  //     pathname === '/manage' && !isMobile && !firstRender.current
  //   ) {
  //     return true;
  //   }
  //   return false;
  // }, [pathname, firstRender])
  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false
  //   }
  // }, [])
  const userName = getStarName(
    userData?.user.nick_name,
    userData?.user?.first_name,
    userData?.user?.last_name
  )
  const getHeaderHeight = size => {
    if (headerHeight !== size.height && size.height) {
      updateHeaderHeight(size.height);
    }
  };

  useResizeObserver({ current: headerRef }, getHeaderHeight)
  useEffect(() => {
    if (!locStorage.getItem('data')) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    if (!!userData && !userData?.celebrity_details) {
      router.push('/browse-stars')
    }
  }, [userData])

  useEffect(() => {
    if (
      pathname === '/manage' && !isMobile && !firstRender
    ) {
      router.push('/manage/dashboard', undefined, { shallow: true })
    }
  }, [pathname, firstRender])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    }
  }, [pathname])

  let links = [
    {
      linkName: t('common.home'),
      key: 'Home',
      url: '/manage',
      icon: faHome,
    },
    ...getLinks({
      t,
      reqCount: celbData?.request_count?.all_request_count || 0,
      isMobile,
      // sugCount: celbData.new_fan_suggesions,
      sugCount: celbData?.new_fan_suggesions || 0,
      entityData: entityData?.partnerData,
      userDetails: userData?.user,
    }),
  ];


  const starNM = getStarName(
    userData?.user.nick_name,
    userData?.user.first_name,
    userData?.user.last_name
  )

  const queryClient = useQueryClient()
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const localUserDetailsUpdateHandler = obj => {
    const userData = queryClient.getQueryData(['loggedUser'])
    const temp = cloneDeep(userData?.user)
    temp.notification_settings = { ...temp.notification_settings, ...obj };
    const newUser = {
      user: temp,
      celebrity_details: userData?.celebrity_details
    }
    updateUserDetails(
      temp.id,
      newUser,
      undefined,
      false,
      false,
      payload => updateToast(dispatch, payload),
      payload => generalLoader(dispatch, payload),
      userData,
      queryClient,
      t,
      true
      )
  }
  const localUpdateUserDetails = (id, obj, callBack, globalToast = false) => {
    updateUserDetails(
      id,
      obj,
      callBack,
      globalToast,
      false,
      payload => updateToast(dispatch, payload),
      payload => generalLoader(dispatch, payload),
      userData,
      queryClient,
      t,
      true
      )
  }

  const localConfirmSave = payload => {
    confirmSave(dispatch, payload)
  }

  const localUpdateNotification = obj => {
    updateNotification(
      obj,
      true,
      false,
      true,
      dispatch,
      queryClient
    )
  }

  const localUpdateViewed = () => {
    updateNotificationViewed(queryClient)
  }


  return (
    <ManageStyled
      headerHeight={headerHeight}
      noMenu={pathname === '/manage'}
    >
      {isStar ? (
        <StarManageHeader
          links={[...links,
            {
                        linkName: `${entityData?.partnerData?.purchaserSingleCap} ${t(
                          'common.experience',
                        )}`,
                        key: 'fan-experience',
                        url: '/browse-stars',
                        icon: faNetworkWired,
                        arrow: false,
                      }
          ,{
                        linkName: t('common.logout'),
                        key: 'logout',
                        'sel-url': '',
                        icon: faArrowSquareRight,
                        onClick: logout,
                      },]}
          forwardRef={setHeaderRef}
        />
      ) : null}

      {
        isMobile && pathname === '/manage/storefront' && (
          <>
            <ErrorHandler>
              <Toast custom />
            </ErrorHandler>{isMobile && <h2 className="star-name">{getStarName(userData?.user?.nick_name, userData?.user?.first_name, userData?.user?.last_name)}</h2>}
            <BackHeader
              backHandler={() => router.push('/manage', undefined, {shallow: true})}
              label={t('common.menu')}
              rootClass="mob-store-back"
              noHelp
              heading={`${t('starmange_mainlinks.manageYourPage', {
                page: entityData?.partnerData.storeNameSmall,
              })}`}
              headerCls="mobo-head"
            />
              <MenuInner
                links={getStoreSubMenu(
                  t,
                  isMobile,
                  celbData?.new_fan_suggesions,
                  entityData?.partnerData,
                )}
                shallow
                classNames={{ root: 'store-list' }}
                change={celbData?.new_fan_suggesions}
              />

            {userData?.celebrity_details?.admin_approved && (
              <PageStatus
                updateUserDetails={localUpdateUserDetails}
              />
            )}
          </>
        )
      }

      <ManageStyled.Container
        headerHeight={headerHeight}
        // uploadEnabled={props.showUploadBar}>
        uploadEnabled={false}
      >
        {
          isStar && isMobile && (
            <ManageStyled.CardWrapper
            hidden={router.asPath !== '/manage'}
            >
              {isMobile && <h2 className="star-name">{getStarName(userData?.user?.nick_name, userData?.user?.first_name, userData?.user?.last_name)}</h2>}
              <ConciseCard
                data={dashboardData}
                celebDetails={celbData}
              />
            </ManageStyled.CardWrapper>
          )
        }
        {(router.asPath === '/manage' || !isMobile) ? (
          <ManageStyled.SidebarWrapper>
            {!isMobile && <h2 className="star-name">{starNM}</h2>}
            <MenuList
              change={`${celbData?.request_count?.all_request_count || 0}${celbData?.new_fan_suggesions}`}
              shallow
              links={[
                ...getLinks({
                  t,
                  reqCount: celbData?.request_count?.all_request_count || 0,
                  isMobile,
                  sugCount: celbData?.new_fan_suggesions || 0,
                  entityData: entityData?.partnerData,
                  userDetails: userData?.user,
                }),

                ...(() => {
                  if (
                    !isMobile &&
                    notPipt(userData?.user)
                  ) {
                    return [
                      {
                        linkName: `${entityData?.partnerData?.purchaserSingleCap} ${t(
                          'common.experience',
                        )}`,
                        key: 'fan-experience',
                        url: '/browse-stars',
                        icon: faNetworkWired,
                        arrow: false,
                      },
                      {
                        linkName: t('common.logout'),
                        key: 'logout',
                        'sel-url': '',
                        icon: faArrowSquareRight,
                        onClick: logout,
                      },
                    ];
                  } else if (
                    !isMobile &&
                    isPipt(userData?.user)
                  ) {
                    return [
                      {
                        linkName: t('common.logout'),
                        key: 'logout',
                        'sel-url': '',
                        icon: faArrowSquareRight,
                        onClick: logout,
                      },
                    ];
                  }
                  return [];
                })(),
              ]}
              classNames={{ root: 'menu-layout' }}
            ></MenuList>
          </ManageStyled.SidebarWrapper>
        ) : null}
        <RightContentWrapper>

          {
            (pathname !== '/manage/storefront' || !isMobile) && (
              <ErrorHandler>
                <Toast custom />
              </ErrorHandler>
            )
          }
          <ManageStyled.RightContent>
            {
              pathname === '/manage/dashboard' && (
                <Dashboard
                  celebDetails={userData?.celebrity_details}
                  loaderAction={loaderAction}
                  updateToast={localUpdateToast}
                />
              )
            }

            {
              pathname === '/manage/external' && (
                <External />
              )
            }

            {
              pathname.includes('/manage/bookings') && (
                <Bookings />
              )
            }

            {
              slug?.[0] === 'promote' && (
                <Promote
                  loaderAction={loaderAction}
                  updateToast={localUpdateToast}
                />
              )
            }

            {
              slug?.[0] === 'storefront' && slug?.[1] === 'profile' && (
                <ManageStarProfile
                  confirmSave={localConfirmSave}
                  updateUserDetails={localUpdateUserDetails}
                  saved={state?.commonReducer?.confirmSave}
                  links={[
                {
                  linkName: t('common.home'),
                  key: 'Home',
                  url: '/manage',
                  icon: faHome,
                },
                ...getLinks({
                  t,
                  reqCount: celbData?.request_count?.all_request_count || 0,
                  isMobile,
                  sugCount: celbData?.new_fan_suggesions || 0,
                  entityData: entityData?.partnerData,
                  userDetails: userData?.user,
                }),
                {
                        linkName: `${entityData?.partnerData?.purchaserSingleCap} ${t(
                          'common.experience',
                        )}`,
                        key: 'fan-experience',
                        url: '/browse-stars',
                        icon: faNetworkWired,
                        arrow: false,
                      },
                {
                  linkName: t('common.logout'),
                  key: 'logout',
                  'sel-url': '',
                  icon: faArrowSquareRight,
                  onClick: logout,
                },
              ]}
                />
              )
            }
            {
              slug?.[0] === 'settings' && (
                <Settings
                  userDetailsUpdateHandler={localUserDetailsUpdateHandler}
                  updateUserDetails={localUpdateUserDetails}
                  updateNotification={localUpdateNotification}
                  updateNotificationViewed={localUpdateViewed}
                  saved={state?.commonReducer?.confirmSave}
                />
              )
            }

            {
              slug?.[0] === 'recent-activity' && (
                <RecentActivity />
              )
            }
            {
              slug?.[0] === 'storefront' && slug?.[1] === 'services' && (
                <Service
                  saved={state?.commonReducer?.confirmSave}
                />
              )
            }

            {
              slug?.[0] === 'storefront' && slug?.[1] === 'fan-suggestions' && (
                <Suggestions />
              )
            }

            {

              slug?.[0] === 'performance' && (
                <Performance />
              )
            }

            {
              slug?.[0] === 'tools' && (
                <Marketing />
              )
            }

            {/* <Switch>
              <Route path="/manage/dashboard" component={Dashboard} />
              <Route path="/manage/bookings" component={Bookings} />
              <Route path="/manage/promote" component={Promote} />
              <Route path="/manage/tools" component={Marketing} />
              <Route
                path="/manage/storefront/profile"
                render={propsChildren => (
                  <ManageStarProfile
                    {...propsChildren}
                    links={[
                      {
                        linkName: t('common.home'),
                        key: 'Home',
                        url: '/manage',
                        icon: faHome,
                      },
                      ...getLinks({
                        t,
                        reqCount: celbData.request_count.all_request_count,
                        isMobile,
                        sugCount: celbData.new_fan_suggesions,
                        entityData: props.entityData,
                        userDetails: props.userDetails.settings_userDetails,
                      }),
                      {
                        linkName: t('common.logout'),
                        key: 'logout',
                        'sel-url': '',
                        icon: faArrowSquareRight,
                        onClick: logout,
                      },
                    ]}
                  />
                )}
              />
              <Route path="/manage/settings" component={Settings} />
              <Route
                path="/manage/recent-activity"
                component={RecentActivity}
              />
              <Route path="/manage/referral" component={ReferralProgram} />
              <Route path="/manage/storefront/services" component={Service} />
              <Route path="/manage/performance" component={Performance} />
              <Route
                path="/manage/storefront/fan-suggestions"
                render={propsChildren => (
                  <Fansuggestions
                    {...propsChildren}
                    userDetails={props.userDetails}
                  />
                )}
              />
            </Switch> */}
            {!isDesktop && <UploadComponent />}
            {state.resumableUpload?.fullUploadView && (
              <UploadListStyled
                open
                fullScreen
                onClose={() => toggleFullView(dispatch, false)}
                disableBackdropClick
                BackdropProps={{
                  invisible: true,
                  style: {
                    position: 'static',
                  },
                }}
                headerHeight={headerHeight}
                classes={{
                  root: 'dialog-root',
                  paper: 'body',
                  paperScrollPaper: 'paperScroll',
                }}
              >
                <BackHeader
                  noHelp={!isMobile}
                  closeHandler={() => toggleFullView(dispatch, false)}
                />
                <ModalContainer>
                  <UploadList />
                </ModalContainer>
              </UploadListStyled>
            )}
            {pathname === '/manage' && isMobile && (
              <div className="mob-footer">
                <img
                  src={entityData?.partnerData?.logo}
                  className="site-logo"
                  alt="logo"
                />
                <span>{t('common.starsonaPowered')}</span>
              </div>
            )}
          </ManageStyled.RightContent>
        </RightContentWrapper>
      </ManageStyled.Container>

    </ManageStyled>
  )
}

ManageCelebrity.getLayout = page => (
  <PageContainer {...page.props} >
    {page}
  </PageContainer>
)

export default ManageCelebrity

export async function getServerSideProps({locale, params: { site }}) {
  // const { partnerData, currencyData, languageData } = await getEntity(site, locale)
  // const entityId = partnerData.entity_id
  // const entityToken = partnerData.public_token

  // axios.interceptors.request.use(config => {
  //   config.headers['entity-id'] = entityId
  //   config.headers['entity-token'] = entityToken
  // })

  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(['partnerData', site, locale], () => getEntity(site, locale))
  // await queryClient.prefetchQuery('config', () => getConfig(entityId, entityToken))
  // await queryClient.prefetchQuery('professions', () => getAllProfessions())
  return {
    props: {
      // dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    }
  }

}
