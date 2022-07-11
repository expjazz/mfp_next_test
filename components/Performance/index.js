import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';
import dynamic from 'next/dynamic';
import ErrorHandler from 'components/ErrorHandler';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import BackHeader from 'components/BackHeader';
import Modal from 'components/Modal';
import MenuList from 'components/MenuList';
import MoboList from 'components/MoboList';
import { FlexBoxSB } from 'styles/CommonStyled';
import { Description, LinkText, Heading } from 'styles/TextStyled';
import { getSelectedRoute } from './utils';
import {
  Layout,
  ContentWrapper,
  MWrap,
  ModalContainer,
  Li,
  Text,
} from './styled';
import { getlinks } from './Constants/constants';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { useDashboardData, useGetPartner } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, toggleBookingModal, updateToast, useGeneral } from 'src/context/general';
import { isEmpty } from 'src/utils/dataStructures';
import { toggleActivityVisibility } from 'src/services/myfanpark';
import { useQueryClient } from 'react-query';

const Analytics = dynamic(() =>
    import(
      'components/PerformanceComponents/Analytics'
    ),
  )

const FanInformation = dynamic(() =>
    import(
      'components/PerformanceComponents/FanInformation'
    ),
  )

const Earnings = dynamic(() =>
    import(
      'components/PerformanceComponents/Earnings'
    ),
  )

const Performance = props => {
  const router = useRouter()
  const [state, dispatch] = useGeneral()
  const loaderAction = payload => generalLoader(dispatch, payload)
  const localUpdateToast = payload => updateToast(dispatch, payload)
  const { data: dashBoardData } = useDashboardData()
  const { data: userData } = useFetchLoggedUser()
  const celbDetails = userData?.celebrity_details
  const userDetails = userData?.user
  const { data: entityData } = useGetPartner()
  const disbursement = celbDetails?.disbursement

  const pathname = router.asPath
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()
  const isModalView = useMediaQuery('(min-width:832px) and (max-width: 1279px)');
  const webView = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(max-width: 831px)');
  const [showModalBack, setModalBack] = useState(true);
  const [routeParams, setRouteParams] = useState();

  const goBack = () => {
    if (pathname === '/manage/performance')
      router.push('/manage', undefined, { shallow: true });
    else router.push('/manage/performance', undefined, { shallow: true });
  };

  const modalClose = () => {
    router.push('/manage/performance', undefined, { shallow: true });
  };

  const modalBackHandler = value => {
    setModalBack(value);
  };

  const { t } = useTranslation();
  const customLi = link => {
    return (
      <Li>
        <FontAwesomeIcon icon={link.moboIcon} />
        <Text>{link.moboLinkName}</Text>
        <FlexBoxSB className="flex-start">
          <span
            data-val={t('common.total_earnings')}
            className="earnings headLbl"
          >
            {getLocalSymbol()}
            {numberToDecimalWithFractionTwo(
              getLocalAmount(dashBoardData?.total_earnings),
              false,
              false,
            )}
          </span>
          <span
            data-val={t('common.pending_pay')}
            className="payments headLbl"
          >
            {getLocalSymbol()}{numberToDecimalWithFractionTwo(
              getLocalAmount(dashBoardData?.pending_payments),
              false,
              false,
            )}
          </span>
        </FlexBoxSB>
      </Li>
    );
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
                label={t('common.review')}
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

  const Wrap = webView || isModalView ? MWrap : React.Fragment;

  // useEffect(() => {
  //   props.getDashboardData();
  // }, []);

  useEffect(() => {
    setRouteParams(getSelectedRoute(pathname));
  }, [pathname]);

  const redirect = useMemo(() => {
    if (webView && pathname === '/manage/performance')
      return true;
    return false;
  }, [webView, pathname])

  useEffect(() => {
    if (redirect) {
      router.push(
        getlinks({
          t,
          customLi,
          entityData: entityData?.partnerData,
          fullPlan:
          (disbursement && disbursement.starsona_cut === 18) ||
          entityData?.partnerData.entity_id !== 'STARSONA-US-1',
        })[0].url,
        undefined,
        { shallow: true }
        )
      }
  }, [webView, pathname])
  const localToggleBookingModal = (active, bookingData, starMode, backLabel) => {
    toggleBookingModal(dispatch, active, bookingData, starMode, backLabel)
  }

  const queryClient = useQueryClient()
  const visibilityChange = (activityId, callback = () => {}) => toggleActivityVisibility(activityId, callback, queryClient, dispatch)
  const getRoutes = () => {
    switch(pathname) {
      case '/manage/performance/earnings':
        return getComponent(
          <ErrorHandler>
            <Earnings
              {...props}
              toggleBookingModal={localToggleBookingModal}
              entityData={entityData?.partnerData}
              dashBoardData={dashBoardData}
              disbursement={disbursement}
              userDetails={userDetails}
              celbDetails={celbDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              modalBackHandler={modalBackHandler}
              toggleActivityVisibility={visibilityChange}
            />
          </ErrorHandler>
        )
      case '/manage/performance/analytics':
        return getComponent(
          <ErrorHandler>
            <Analytics
              {...props}
              toggleBookingModal={localToggleBookingModal}
              entityData={entityData?.partnerData}
              dashBoardData={dashBoardData}
              disbursement={disbursement}
              userDetails={userDetails}
              celbDetails={celbDetails}
              loaderAction={loaderAction}
              updateToast={localUpdateToast}
              modalBackHandler={modalBackHandler}
              toggleActivityVisibility={visibilityChange}
            />
          </ErrorHandler>,
        )
      default:
        if (pathname.includes('/manage/performance/fan-information') &&
        ((disbursement && disbursement.starsona_cut === 18) ||
        entityData?.partnerData.entity_id !== 'STARSONA-US-1')) {
          return getComponent(
            <ErrorHandler>
              <FanInformation
                {...props}
                entityData={entityData?.partnerData}
                dashBoardData={dashBoardData}
                disbursement={disbursement}
                userDetails={userDetails}
                celbDetails={celbDetails}
                loaderAction={loaderAction}
                updateToast={localUpdateToast}
                modalBackHandler={modalBackHandler}
                toggleActivityVisibility={visibilityChange}
              />
            </ErrorHandler>,
          )
        }
        null
    }
  }
  return (
    <Layout
      showMenu={pathname === '/manage/performance'}
    >
      {(showModalBack || !isMobile) && (
        <BackHeader
          backHandler={isMobile ? goBack : null}
          label={t('common.review')}
          heading={isMobile ? t('earnings.performance.review_earning') : ''}
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
                  {t('earnings.performance.review_earning')}
                </Heading>
                <MenuList
                  links={getlinks({
                    t,
                    customLi,
                    entityData: entityData?.partnerData,
                    fullPlan:
                      (disbursement &&
                        disbursement.starsona_cut === 18) ||
                      entityData?.partnerData.entity_id !== 'STARSONA-US-1',
                  })}
                  noteText={t('earnings.performance.earnings_desc')}
                  classNames={{ root: 'menu-layout' }}
                  shallow
                ></MenuList>
              </React.Fragment>
            )}

            {isMobile &&
              pathname === '/manage/performance' && (
                <MoboList
                  links={getlinks({
                    t,
                    customLi,
                    entityData: entityData?.partnerData,
                    fullPlan:
                      (disbursement &&
                        disbursement.starsona_cut === 18) ||
                      entityData?.partnerData.entity_id !== 'STARSONA-US-1',
                  })}
                />
              )}
          </React.Fragment>
          {disbursement &&
            disbursement.starsona_cut !== 18 &&
            (pathname === '/manage/performance' ||
              !isMobile) &&
            entityData?.partnerData.entity_id === 'STARSONA-US-1' && (
              <div className="warning-info">
                <Description className="info">
                  {t('earnings.performance.warning_info', {
                    purchaserPlural: entityData?.partnerData.purchaser_plural_name,
                  })}
                  <LinkText className="link">
                    <a
                      href={`${window.location.origin}/${entityData?.partnerData.talentsUrlPrefix}/pricing`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('common.get_details')}
                    </a>
                  </LinkText>
                </Description>
              </div>
            )}
        </Wrap>
        {!isEmpty(celbDetails) && getRoutes()}
      </ContentWrapper>
    </Layout>
  );
};

Performance.propTypes = {
  history: PropTypes.object.isRequired,
  celbDetails: PropTypes.object,
  disbursement: PropTypes.object,
  dashBoardData: PropTypes.object,
  entityData: PropTypes.object.isRequired,
  getDashboardData: PropTypes.func.isRequired,
};
Performance.defaultProps = {
  celbDetails: {},
  disbursement: {},
  dashBoardData: {},
};

export default Performance
