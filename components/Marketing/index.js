import React, { useEffect, useState, lazy, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ErrorHandler from 'components/ErrorHandler';
import BackHeader from 'components/BackHeader';
import Modal from 'components/Modal';
import { getSelectedRoute } from './utils';
import { Layout, ContentWrapper, ModalContainer } from './styled';
import dynamic from 'next/dynamic';
import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useFetchConcienge, useGetPartner } from 'customHooks/reactQueryHooks';

const StarConcierge = dynamic(() => import('./components/StarConcierge'))

const Marketing = props => {
  const { t } = useTranslation()
  const { data: concierge } = useFetchConcienge()
  const { data: entityData } = useGetPartner()
  const router = useRouter()
  const pathname = router.asPath
  const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
  const webView = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [routeParams, setRouteParams] = useState();

  const goBack = () => {
    router.back();
  };

  const modalClose = () => {
    router.back.push('/manage');
  };

  const getComponent = component => {
    if (isModalView) {
      return (
        <Modal open onClose={modalClose}>
          <ModalContainer>
            <BackHeader
              backHandler={modalClose}
              closeHandler={modalClose}
              label={t('common.menu')}
              noHelp
            />
            {component}
          </ModalContainer>
        </Modal>
      );
    }
    return component;
  };

  useEffect(() => {
    // props.fetchStarConcierge();
  }, []);

  useEffect(() => {
    setRouteParams(getSelectedRoute(pathname));
  }, [pathname]);

  const redirect = useMemo(() => {
    if (webView && pathname === '/manage/tools')
      return true;
    return false;
  }, [webView, pathname])

  if (redirect) return <Redirect to="/manage/tools/star-concierge" />;
  return (
    <Layout showMenu={pathname === '/manage/tools'}>
      {isMobile && (
        <BackHeader
          backHandler={isMobile ? goBack : null}
          label={t('common.menu')}
          heading={t('common.marketingHeading')}
          headerCls="header-label"
          noHelp
        />
      )}

      <ContentWrapper>
        {
          pathname === '/manage/tools/star-concierge' && (
            getComponent(
              <ErrorHandler>
                <StarConcierge
                  {...props}
                  concierge={
                    concierge.data && concierge.data.email ? concierge.data : {
                      first_name: entityData?.partnerData.contact_name,
                      profile_image: null,
                      email: entityData?.partnerData.contact_email,
                      mobile_number: entityData?.partnerData.contact_phone,
                    }
                  }
                  entityData={entityData?.partnerData}
                />
              </ErrorHandler>,
              )
            )
        }
      </ContentWrapper>
    </Layout>
  );
};

Marketing.propTypes = {
  history: PropTypes.object.isRequired,
  concierge: PropTypes.object.isRequired,
  entityData: PropTypes.object.isRequired,
  fetchStarConcierge: PropTypes.func.isRequired,
  configData: PropTypes.object.isRequired,
};
Marketing.defaultProps = {};

export default Marketing
