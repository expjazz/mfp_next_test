import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/SecondaryButton';
import { useTranslation } from 'next-i18next';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, toggleLogin, updateFavouritesQueue, updateToast, useGeneral } from 'src/context/general';
import { useQueryClient } from 'react-query';
import { followCelebrity } from 'src/services/myfanpark/celebActions';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';

function Follow({ starData, ...props }) {
  const { t } = useTranslation();
  const { data: fanData, isStar } = useFetchLoggedUser()
  const isLoggedIn = !!fanData
  const [state, dispatch] = useGeneral()
  const queryClient = useQueryClient()
  const {data: celebrityData} = useGetCelebrityData()
  const isFollow = celebrityData?.user.is_follow
  const userId = celebrityData?.user.id
  const followMe = () => {

    if (isLoggedIn) {
      generalLoader(dispatch, true);
      followCelebrity(userId, !isFollow, false, false, celebrityData, queryClient)
      .then(res => {
        generalLoader(dispatch, false);
        if (!res || !res.data || !res.data.success) {
          updateToast(dispatch, {
            value: true,
            message: res.message,
            variant: 'error',
            global: true
          });
        }
      })
      .catch(err => {
        generalLoader(dispatch, false);
        updateToast(dispatch, {
          value: true,
          message: err.message,
          variant: 'error',
          global: true
        });
      });
    } else {
      updateFavouritesQueue(dispatch, {celebId: userId, follow: !isFollow});
      toggleLogin(dispatch, {active: true, options: { noRedirect: true }});
    }
  };
  return (
    <Button
      secondary
      className="share-page"
      onClick={followMe}
      disabled={isStar}
      isDisabled={isStar}
    >
      {celebrityData?.user.is_follow ? t('common.unfollow') : t('common.follow')}
    </Button>
  );
}

Follow.propTypes = {
  starData: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
  loaderAction: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  isStar: PropTypes.bool.isRequired,
};
Follow.defaultProps = {
  isLoggedIn: false
};


export default Follow
