import React, { useState, lazy, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import Modal from 'components/Modal';
import { Heading } from 'styles/TextStyled';
import MoboList from 'components/MoboList';
import { modalview } from 'react-ga';
import MenuList from 'components/MenuList';
import { Layout, ContentWrapper, MWrap, ModalContainer } from './styled';
import { getLinks } from './Constants/constants';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { isEmpty } from 'src/utils/dataStructures';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useConfigPartner, useGetCommercialTemplates, useGetPartner } from 'customHooks/reactQueryHooks';
import { capitalize, useMediaQuery } from '@material-ui/core';
import { useCurrencyData } from 'customHooks/currencyUtils';
import { messages } from 'src/services/myfanpark/messageServiceActions';
import { confirmSave, generalLoader, updateToast, useGeneral } from 'src/context/general';
import { useQueryClient } from 'react-query';
import { updateUserDetails } from 'src/services/myfanpark/celebActions';
const PersonalizedVideos = dynamic(() =>
    import(
      'components/ServiceComponents/PersonalizedVideos'
    ),
  )

const DirectMessages = dynamic(() =>
    import(
      'components/ServiceComponents/DirectMessages'
    ),
  )

const CommercialSocialMedia = dynamic(() =>
    import(
      'components/ServiceComponents/CommercialSocialMedia'
    ),
  )

const CommercialOfferings = dynamic(() =>
    import(
      'components/ServiceComponents/CommercialOfferings'
    ),
  )

const SocialInteractions = dynamic(() =>
    import(
      'components/ServiceComponents/SocialInteractions'
    ),
  )

const Preferences = dynamic(() =>
    import(
      'components/ServiceComponents/Preferences'
    ),
  )

const FunStuff = dynamic(() =>
    import('components/ServiceComponents/FunStuff'),
  )

const LiveCall = dynamic(() =>
    import('components/ServiceComponents/LiveCall'),
  )


const Products = dynamic(() =>
    import('components/ServiceComponents/Products'),
  )

const SocialExp = dynamic(() =>
    import(
      'components/ServiceComponents/SocialExp'
    ),
  )

const Service = props => {
  const [{ data: commercialTemplates, isLoading }, getCommercialTemplates] = useGetCommercialTemplates()
  const { data: userData } = useFetchLoggedUser()
  const { data: entityData } = useGetPartner()
  const { data: config } = useConfigPartner()
  const [_, dispatch] = useGeneral()
  const queryClient = useQueryClient()
  const currencyData = useCurrencyData()
  const router = useRouter()
  const pathname = router.asPath
  const { t } = useTranslation();
  const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
  const webView = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [showModalBack, setModalBack] = useState(true);

  const modalBackHandler = value => {
    setModalBack(value);
  };

  const goBack = () => {
    if (
      pathname.includes(
        '/manage/storefront/services/preferences',
      )
    ) {
      router.back();
    } else if (
      pathname === '/manage/storefront/services'
    ) {
      if (isMobile) {
        router.push('/manage/storefront', undefined, { shallow: true });
      } else {
        router.push('/manage', undefined, { shallow: true });
      }
    } else router.push('/manage/storefront/services', undefined, { shallow: true });
  };

  const modalClose = () => {
    router.push('/manage/storefront/services', undefined, { shallow: true });
  };

  const getComponent = component => {
    if (isModalView) {
      return (
        <Modal open onClose={modalClose}>
          <ModalContainer>
            {showModalBack && (
              <BackHeader
                backHandler={modalClose}
                closeHandler={modalClose}
                label={
                  pathname.includes(
                    '/manage/storefront/services/preferences',
                  )
                    ? t('services.preference')
                    : `${entityData?.partnerData.storeNameSmall}`
                }
                noHelp
              />
            )}
            {component}
          </ModalContainer>
        </Modal>
      );
    }
    return component;
  };

  const getlabel = () => {
    if (
      pathname.includes(
        '/manage/storefront/services/preferences',
      )
    ) {
      return t('services.preference');
    } else if (
      pathname.includes('/manage/storefront/services/')
    ) {
      return t('services.lbl_experiences');
    }
    return capitalize(entityData?.partnerData.storeNameSmall);
  };

  const Wrap = webView || modalview ? MWrap : React.Fragment;

  // const Wrap = React.Fragment;

  const redirect = useMemo(() => {
    if (
      webView &&
      pathname === '/manage/storefront/services'
    )
      return true;
    return false;
  }, [webView, pathname])

  useEffect(() => {
    if (redirect) {
      router.push(
        getLinks(t, userData?.celebrity_details.services, entityData?.partnerData, userData?.user)[0].url,
        undefined,
        { shallow: true }
      )
    }
  }, [redirect])

  const localMessages = (payload, callback) => {
    messages(payload, callback, dispatch, queryClient, t)
  }

  const localConfirmSave = payload => {
    confirmSave(dispatch, payload)
  }
  const localUpdateUserDetails = (id, obj, callBack, globalToast = false) => {
    // id,
    // obj,
    // callBack,
    // toastGloabal = true,
    // noToast = false,
    // updateToast,
    // loaderAction = () => {},
    // user = {},
    // queryClient = () => {setQueryData: () => {}},
    // t = value => value,
    // isCelebrity = false
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
  // if (redirect)
  //   return (
  //     <Redirect
  //       to={getLinks(t, userData?.celebrity_details.services, entityData?.partnerData, userData?.user)[0].url}
  //     />
  //   );
  const loaderAction = payload => {
    generalLoader(dispatch, payload)
  }
  const localUpdateToast = payload => {
    updateToast(dispatch, {...payload, global: false})
  }

  const updateUserData = ({userDetails, celbDetails}) => {
    queryClient.setQueryData(['loggedUser'], {
      user: userDetails,
      celebrity_details: celbDetails
    })
  }
  const getRoutes = () => {
    switch(pathname) {
      case '/manage/storefront/services/personalized-videos':
        return getComponent(
          <ErrorHandler>
            <PersonalizedVideos {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>,
        )
      case '/manage/storefront/services/direct-messages':
        return getComponent(
          <ErrorHandler>
            <DirectMessages
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>,
        )

      case '/manage/storefront/services/commercial/video-shoutout':
        return getComponent(
          <ErrorHandler>
            <CommercialOfferings
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              modalBackHandler={modalBackHandler}
              getCommercialTemplates={getCommercialTemplates}
              commercialTemplates={commercialTemplates.templateOfferings}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>,
        )
      case '/manage/storefront/services/commercial/social-media':
        return getComponent(
          <ErrorHandler>
            <CommercialSocialMedia {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>
        )
      case '/manage/storefront/services/fun-stuff':
        return getComponent(
          <ErrorHandler>
            <FunStuff
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              modalBackHandler={modalBackHandler}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>
        )
      case '/manage/storefront/services/live-call':
        return getComponent(
          <ErrorHandler>
            <LiveCall
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              modalBackHandler={modalBackHandler}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>
        )
      case '/manage/storefront/services/products':
        return getComponent(
          <ErrorHandler>
            <Products
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              modalBackHandler={modalBackHandler}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>
        )
      case '/manage/storefront/services/social-media':
        return getComponent(
          <ErrorHandler>
            <SocialInteractions
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              modalBackHandler={modalBackHandler}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>,
        )
      case '/manage/storefront/services/social-exp':
        return getComponent(
          <ErrorHandler>
            <SocialExp
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>
        )
      default:
        if (router.query?.slug[2] === 'preferences') {
          return getComponent(
          <ErrorHandler>
            <Preferences
              {...props}
              entityData={entityData?.partnerData}
              userDetails={userData?.user}
              celbDetails={userData?.celebrity_details}
              adminApproved={userData?.celebrity_details?.admin_approved}
              celebActive={userData?.celebrity_details?.availability}
              currencyData={currencyData}
              deliveryTypes={config?.fun_stuff_delivery}
              confirmSave={localConfirmSave}
              messages={localMessages}
              updateUserDetails={localUpdateUserDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              updateUserData={updateUserData}
            />
          </ErrorHandler>)
        }
        return null
    }
  }

  return (
    <Layout
      showMenu={
        pathname === '/manage/storefront/services'
      }
      preferences={
        pathname ===
        '/manage/storefront/services/preferences'
      }
    >
      {(showModalBack || !isMobile) && (
        <BackHeader
          backHandler={isMobile ? goBack : null}
          label={getlabel()}
          heading={
            isMobile
              ? t('services.service_heading', { purchaser: entityData?.partnerData.purchaser_singular_name })
              : ''
          }
          headerCls="header-label"
          noHelp
        />
      )}
      <ContentWrapper>
        <Wrap>
          <React.Fragment>
            {!isMobile && (
              <React.Fragment>
                <Heading className="main-heading">
                  {t('services.service_heading', {
                    purchaser: entityData?.partnerData.purchaser_singular_name,
                  })}
                </Heading>
                <MenuList
                  services={userData?.celebrity_details.services}
                  links={getLinks(
                    t,
                    userData?.celebrity_details.services,
                    entityData?.partnerData,
                    userData?.user
                  )}
                  noteText={t('services.service_menu_note')}
                  classNames={{ root: 'menu-layout' }}
                  tick
                  shallow
                ></MenuList>
              </React.Fragment>
            )}
            {isMobile &&
              pathname ===
                '/manage/storefront/services' && (
                <MoboList
                  links={
                    (getLinks(t, userData?.celebrity_details.services, entityData?.partnerData, userData?.user))
                  }
                />
              )}
          </React.Fragment>
        </Wrap>
        {!isEmpty(userData?.celebrity_details) && getRoutes()
        }
      </ContentWrapper>
    </Layout>
  );
};

Service.propTypes = {
  history: PropTypes.object.isRequired,
  celbDetails: PropTypes.object,
  entityData: PropTypes.object.isRequired,
};
Service.defaultProps = {
  celbDetails: {},
};

export default Service
