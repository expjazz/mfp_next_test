import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fitty from 'fitty';
// import { purchaseUrl } from 'constants/url';
import { purchaseUrl } from '../../../../src/constants/url';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { fetchCelebDetails } from 'pages/starProfile/actions/getCelebDetails';
// import { requestTypesKeys } from 'src/constants/requestTypes';
// import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { numberToDecimalWithFractionTwo } from '../../../../src/utils/dataformatter';
import MoreOption from './styled';
// import { toggleLogin } from '../../../../store/shared/actions/toggleModals';
// import {
//   followCelebrity,
//   updateFavouritesQueue,
//   setMoreOptions,
// } from '../../../../store/shared/actions/followCelebrity';
import { useTranslation } from 'next-i18next';
import { isEmpty } from '../../../../src/utils/dataStructures';
import { requestTypesKeys } from '../../../../src/constants/requestTypes';
import { useGetLocalAmount } from '../../../../customHooks/currencyUtils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { useFanFavorites } from 'customHooks/reactQueryHooks';
import { followCelebrity } from 'src/services/myfanpark/celebActions';
import { toggleLogin, updateFavouritesQueue, useGeneral } from 'src/context/general';

const MoreOptions = props => {
	const router = useRouter();
	const [getLocalSymbol, getLocalAmount] = useGetLocalAmount();
	const { data: fanFavorite, refetch: fanFavoriteRefetch } = useFanFavorites()[0];
	const followStatus = !!fanFavorite?.data?.find(item => item.user_id === props.userId);
	const { data: isLoggedIn } = useFetchLoggedUser();
	const dispatch = useGeneral()[1];
	const { t } = useTranslation();


	const handleBooking = type => async event => {
		event.preventDefault();
		event.stopPropagation();
		if (!props.isStarRole) {
			router.push(`/${props.userId}`);
			// props.history.push(`/${props.userId}`);
		}
	};

	const onTagClick = event => {
		event.preventDefault();
		event.stopPropagation();
		router.push(`/tag/${props.popularTag.slug}`);
	};

	const followCelebrityAction = event => {
		event.preventDefault();
		event.stopPropagation();
		if (!props.isStarRole) {
			props.setMoreOptions(true);
			if (isLoggedIn) {
				followCelebrity(props.userId, !followStatus, false, () => {
					fanFavoriteRefetch();
				});
			} else {
				updateFavouritesQueue(dispatch, {celebId: props.userId, follow: !followStatus});
				toggleLogin(dispatch, {active: true, options: { noRedirect: true }});
			}
		}
	};

	const findRateObj = type => {
		return props.rateLimit.find(item => item.type === type) || {};
	};

	const isServiceActive = (type, requestType) => {
		if (requestType === requestTypesKeys.shoutout) {
			return (
				!isEmpty(props.services) &&
        props.services[type] &&
        Boolean(props.remainingLimit)
			);
		} else if (requestType === requestTypesKeys.message) {
			return (
				!props.pendingMessage &&
        !isEmpty(props.services) &&
        props.services[type] &&
        Boolean(findRateObj(requestType).remaining_limit)
			);
		}
		return (
			!isEmpty(props.services) &&
      props.services[type] &&
      Boolean(findRateObj(requestType).remaining_limit)
		);
	};

	const getServiceRate = requestType => {
		if (requestType === requestTypesKeys.shoutout) {
			return props.starRate;
		}
		return `${getLocalSymbol()}${numberToDecimalWithFractionTwo(
			getLocalAmount(findRateObj(requestType).rate),
			false,
			false,
		)}`;
	};

	const autoFitText = () => {
		fitty('.auto-fit', {
			minSize: 10,
			maxSize: 19,
			multiLine: true,
		});
	};

	useEffect(() => {
		autoFitText();
	});

	return (
		<MoreOption>
			{!props.isStarRole &&
        isServiceActive('personalised_video', requestTypesKeys.shoutout) && (
				<MoreOption.OptionWrapper>
					<div className="wrap first-option">
						<Link
							href={`/${props.userId}${purchaseUrl[requestTypesKeys.shoutout]}`}
							className="auto-fit"
						>
							<a className="auto-fit">
								{t('common.book_shoutout_for', { value: props.starRate })}
							</a>
						</Link>
					</div>
				</MoreOption.OptionWrapper>
			)}
			{!props.isStarRole &&
        isServiceActive('direct_message', requestTypesKeys.message) && (
				<MoreOption.OptionWrapper>
					<div className="wrap">
						<Link
							href={`/${props.userId}${purchaseUrl[requestTypesKeys.message]}`}
						>

							<a
								className="auto-fit"
							>
								{t('common.book_message_for', {
									value: getServiceRate(requestTypesKeys.message),
								})}
							</a>
						</Link>
					</div>
				</MoreOption.OptionWrapper>
			)}
			<MoreOption.OptionWrapper>
				<div className="wrap">
					<Link
						className="auto-fit"
						href={`/${props.userId}`}
						onClick={() => props.onClose()}
					>
						<a>
							{t('common.view_store')}
						</a>
					</Link>
				</div>
			</MoreOption.OptionWrapper>
			{!props.isStarRole && (
				<MoreOption.OptionWrapper onClick={followCelebrityAction}>
					<div className="wrap">
						{followStatus ? t('common.unfollowUppercamel') : t('common.followtext')}
					</div>
				</MoreOption.OptionWrapper>
			)}
			<MoreOption.OptionWrapper dynamicData onClick={onTagClick}>
				<div className="wrap">
					{t('common.viewAll')} {props.popularTag.name}{' '}
					{props.entityData.talent_plural_name?.toLowerCase() || props.entityData.talent_singular_name?.toLowerCase() || 'talent' }
				</div>
			</MoreOption.OptionWrapper>
		</MoreOption>
	);
};

MoreOptions.propTypes = {
	history: PropTypes.object.isRequired,
	popularTag: PropTypes.object,
	services: PropTypes.object,
	isLoggedIn: PropTypes.bool.isRequired,
	fetchCelebDetails: PropTypes.func.isRequired,
	followCelebrity: PropTypes.func.isRequired,
	updateFavouritesQueue: PropTypes.func.isRequired,
	toggleLogin: PropTypes.func.isRequired,
	setMoreOptions: PropTypes.func.isRequired,
	isfollow: PropTypes.bool.isRequired,
	isStarRole: PropTypes.bool.isRequired,
	rateLimit: PropTypes.object,
	userId: PropTypes.string.isRequired,
	pendingMessage: PropTypes.bool,
	starRate: PropTypes.number,
	remainingLimit: PropTypes.number,
};

MoreOptions.defaultProps = {
	popularTag: {},
	rateLimit: {},
	pendingMessage: false,
	services: {},
	starRate: 0,
	remainingLimit: 0,
};

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
//   isStarRole: state.session.starRole,
//   currencyData: state.entity.currencyData,
// });
// const mapDispatchToProps = dispatch => ({
//   fetchCelebDetails: (id, templateId) =>
//     dispatch(fetchCelebDetails(id, templateId)),
//   updateFavouritesQueue: (celebId, follow) =>
//     dispatch(updateFavouritesQueue(celebId, follow)),
//   followCelebrity: (celebId, follow, cancelUpdate, onSuccess) =>
//     dispatch(followCelebrity(celebId, follow, cancelUpdate, onSuccess)),
//   toggleLogin: state => dispatch(toggleLogin(state)),
//   setMoreOptions: state => dispatch(setMoreOptions(state)),
// });

export default MoreOptions;
