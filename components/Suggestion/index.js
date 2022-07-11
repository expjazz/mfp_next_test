import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import Modal from 'components/Modal';
import { Layout, ContentWrapper, ModalContainer } from './styled';
import dynamic from 'next/dynamic';
import { capitalize, useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const Suggestion = dynamic(() => import('./components/Suggestion'))

const Suggestions = props => {
  const router = useRouter()
  const { data: entityData } = useGetPartner()
  const { data: userData } = useFetchLoggedUser()
  const pathname = router.asPath
  const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
  const webView = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(max-width: 831px)');

  const goBack = () => {
    router.back();
  };

  const modalClose = () => {
    router.push('/manage/storefront');
  };

  const getComponent = component => {
    if (isModalView) {
      return (
        <Modal open onClose={modalClose}>
          <ModalContainer>
            <BackHeader
              backHandler={modalClose}
              closeHandler={modalClose}
              label={capitalize(entityData?.partnerData?.storefront_name)}
              noHelp
            />
            {component}
          </ModalContainer>
        </Modal>
      );
    }
    return component;
  };

  const redirect = useMemo(() => {
    if (webView && pathname === '/manage/storefront')
      return true;
    return false;
  }, [webView, pathname])

  // if (redirect) return <Redirect to="/manage/storefront/fan-suggestions" />;
  return (
    <Layout showMenu={pathname === '/manage/storefront'}>
      {isMobile && (
        <BackHeader
          backHandler={isMobile ? goBack : null}
          label={capitalize(entityData?.partnerData?.storefront_name)}
          heading={`${entityData?.partnerData?.purchaser_plural_name} suggestions`}
          headerCls="header-label"
          noHelp
        />
      )}
      <ContentWrapper>
        {pathname === '/manage/storefront/fan-suggestions' &&
          getComponent(
            <ErrorHandler>
              <Suggestion
                {...props}
                userDetails={userData?.user}
                celbDetails={userData?.celebrity_details}
              />
            </ErrorHandler>,
          )
        }
      </ContentWrapper>
    </Layout>
  );
};

Suggestions.propTypes = {
  history: PropTypes.object.isRequired,
  concierge: PropTypes.object.isRequired,
  fetchStarConcierge: PropTypes.func.isRequired,
  configData: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
};
Suggestions.defaultProps = {};

export default Suggestions
