import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import StarCard from 'components/StarCard';
import BackHeader from 'components/BackHeader';
import Loader from 'components/Loader';
import { LatestCard } from 'components/ListCards';
import { Layout, Wrapper } from './styled';
import { useDashboardData, useRecentActivity } from 'customHooks/reactQueryHooks';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useRouter } from 'next/router';

const RecentActivity = props => {
  const { data: dashboardData } = useDashboardData()
  const { data: userData } = useFetchLoggedUser()
  const router = useRouter()
  const { data: recAct, isLoading } = useRecentActivity()
  const recentActivity = {
    ...recAct,
    loading: isLoading
  }
  const {disbursement} = userData?.celebrity_details
  const [loader, setLoader] = useState(false);
  const getDashboardSuccess = () => {
    setLoader(false);
  };
  const goBack = () => {
    router.push('/manage', undefined, { shallow: true });
  };
  useEffect(() => {
    // setLoader(true);
    // props.fetchRecentActivity();
    // props.getDashboardData(getDashboardSuccess);
  }, []);

  const { t } = useTranslation();

  return (
    <Layout>
      <BackHeader
        rootClass="common-header"
        backHandler={goBack}
        label="Menu"
        heading={t('dashboard.recentActivity')}
        noHelp
      />
      <Wrapper>
        {loader && <Loader class="custom-loader" />}
        <StarCard
          starCut={disbursement.star_cut}
          starsonaCut={disbursement.starsona_cut}
          data={dashboardData}
          hiddenProps={{
            hideCut: true,
            hideEarnings: true,
          }}
          page="dashboard"
        />
      </Wrapper>
      {recentActivity.loading && <Loader />}
      {recentActivity &&
        recentActivity.activityList &&
        recentActivity.activityList.length > 0 &&
        recentActivity.activityList.map(activity => (
          <LatestCard
            activity={activity}
            key={activity.id}
            type={activity.activity_type}
            starMode
          />
        ))}
    </Layout>
  );
};

RecentActivity.defaultProps = {
  disbursement: {},
};

RecentActivity.propTypes = {
  getDashboardData: PropTypes.func.isRequired,
  dashBoardData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  disbursement: PropTypes.object,
  fetchRecentActivity: PropTypes.func.isRequired,
  recentActivity: PropTypes.object.isRequired,
};

export default RecentActivity;
