import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import ConciseCard from 'components/StarCard/ConciseCard';
// import ActivityCard from 'components/ListCards/components/Activities';
import BackHeader from 'components/BackHeader';
// import { useMedia } from 'customHooks/domUtils';
import Promotion from 'components/PromotionCard';
import { Heading } from 'styles/TextStyled';
import Loader from 'components/Loader';
import { Layout, Wrapper, Social } from './styled';
import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import ActivityCard from 'components/ListCards/components/Activities';
import { useDashboardData } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const Dashboard = props => {
  const { data: dashboardData, isLoading: dashboardLoading } = useDashboardData()
  const { data: userData } = useFetchLoggedUser()
  const { t } = useTranslation();
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width: 831px)');
  const loader = dashboardLoading
  const getDashboardSuccess = () => {
    setLoader(false);
  };
  const goBack = () => {
    router.push('/manage', undefined, { shallow: true });
  };
  const buttonClickHandler = card => {
    router.push(card.data.url, undefined, { shallow: true });
  };
  const promoteClick = () => {
    router.push('/manage/promote', undefined, { shallow: true });
  };
  useEffect(() => {
    // setLoader(true);
    // if (window.FreshworksWidget) {
    //   window.FreshworksWidget('hide', 'launcher');
    // }
    // props.fetchUserDetails(props.userDetails.user_id);
    // props.getDashboardData(getDashboardSuccess);
  }, []);

  return (
    <Layout>
      {isMobile ? (
        <BackHeader
          rootClass="dash-header"
          backHandler={goBack}
          label={t('common.menu')}
          heading={t('dashboard.mainHeading')}
          noHelp
        />
      ) : (
        <Heading className="top-heading">{t('dashboard.mainHeading')}</Heading>
      )}
      <Wrapper>
        <section className="middle-section">
          {loader && <Loader class="custom-loader" />}
          <ConciseCard
            data={dashboardData}
            celebDetails={props.celebDetails}
          />
          {dashboardData && Object.keys(dashboardData).length > 0 && (
            <ActivityCard
              data={dashboardData}
              buttonClick={buttonClickHandler}
              promoteClick={promoteClick}
              userDetails={userData || {}}
            />
          )}
        </section>
        <Social>
          <Promotion
            history={props.history}
            loaderAction={props.loaderAction}
            config={props.config}
            userDetails={userData || {}}
            updateToast={props.updateToast}
            celebDetails={props.celebDetails || {}}
          />
        </Social>
      </Wrapper>
    </Layout>
  );
};

Dashboard.defaultProps = {};

Dashboard.propTypes = {
  getDashboardData: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  dashBoardData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired,
  fetchUserDetails: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  celebDetails: PropTypes.object.isRequired,
};

export default Dashboard;
