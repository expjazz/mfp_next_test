import React from 'react';
// import { connect } from 'react-redux';
// import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartLight } from '@fortawesome/pro-light-svg-icons';
// import { toggleLogin } from 'store/shared/actions/toggleModals';
// import { loaderAction, updateToast } from 'store/shared/actions/commonActions';
// import {
//   followCelebrity,
//   updateFavouritesQueue,
// } from 'store/shared/actions/followCelebrity';
import { FollButton } from './styled';
import { useTranslation } from 'next-i18next';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { generalLoader, toggleLogin, updateFavouritesQueue, updateToast, useGeneral } from 'src/context/general';
import { followCelebrity } from 'src/services/myfanpark/celebActions';
import { useQueryClient } from 'react-query';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';

const FollowButton = ({
	// followCelebrity,
	isStar,
	followText,
	unFollowText,
	className,
	heartSymbol,
}) => {
	const { t } = useTranslation();
	const { data: fanData } = useFetchLoggedUser();
	const isLoggedIn = !!fanData;
	const [state, dispatch] = useGeneral();
	const queryClient = useQueryClient();
	const {data: celebrityData} = useGetCelebrityData();
	const isFollow = celebrityData?.user.is_follow;
	const userId = celebrityData?.user.id;
	const toFollow = payload => updateFavouritesQueue(dispatch, payload);
	const followCelebrityAction = () => {
		if (isLoggedIn) {
			generalLoader(dispatch, true);
			followCelebrity(userId, !isFollow, false, false, celebrityData, queryClient, isLoggedIn)
			// (celebrityId, follow, cancelUpdate, onSuccess, celebrityData, queryClient) => {

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
	const followTextVal = followText || t('common.follow');
	const unfollowTextVal = unFollowText || t('common.unfollow');
	return (
		<React.Fragment>
			{!heartSymbol && (
				<FollButton
					disabled={isStar}
					className={className}
					secondary
					onClick={followCelebrityAction}
				>
					{isFollow ? unfollowTextVal : followTextVal}
				</FollButton>
			)}
			{heartSymbol && !isStar && (
				<FontAwesomeIcon
					onClick={followCelebrityAction}
					icon={isFollow ? faHeart : faHeartLight}
					className="fallow-heart"
				/>
			)}
		</React.Fragment>
	);
};

FollowButton.defaultProps = {
	className: '',
	heartSymbol: false,
};

FollowButton.propTypes = {
	className: PropTypes.string,
	isStar: PropTypes.bool.isRequired,
	followCelebrity: PropTypes.func.isRequired,
	isFollow: PropTypes.bool.isRequired,
	toggleLogin: PropTypes.func.isRequired,
	userId: PropTypes.string.isRequired,
	heartSymbol: PropTypes.bool,
};

// const mapStateToProps = state => ({
//   userId: state.starDetails.celebDetails.userDetails.id,
//   isStar: state.userDetails.isStar,
//   isFollow: state.starDetails.celebDetails.userDetails.is_follow,
//   isLoggedIn: state.session.isLoggedIn,
// });

// const mapDispatchToProps = dispatch => ({
//   followCelebrity: (celebId, follow) =>
//     dispatch(followCelebrity(celebId, follow)),
//   loaderAction: state => dispatch(loaderAction(state)),
//   updateToast: obj => dispatch(updateToast(obj)),
//   updateFavouritesQueue: (celebId, follow) =>
//     dispatch(updateFavouritesQueue(celebId, follow)),
//   toggleLogin: (state, options) => dispatch(toggleLogin(state, options)),
// });

export default FollowButton;
