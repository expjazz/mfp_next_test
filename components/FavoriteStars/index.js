import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import BackHeader from 'components/BackHeader';
import FavoritesListing from './components/FavoritesListing';
import FavouriteStyled from './styled';
import { useRouter } from 'next/router';
import { useFanFavorites } from 'customHooks/reactQueryHooks';
import { favoriteStar } from 'src/services/myfanpark/celebActions';
import { useQueryClient } from 'react-query';

const FavoriteStars = props => {
	const { t } = useTranslation();
	const [{data: favouritesList, isLoading}, fetchFavouritesList] = useFanFavorites();
	const router = useRouter();
	const goBack = () => {
		if (router.query?.goBack) {
			router.back();
		} else {
			router.push('/fan-manage');
		}
	};
	const queryClient = useQueryClient();
	const onUnFavoriteStar = star => {
		favoriteStar(star.id, false, queryClient);
	};

	const onStarPurchase = async star => {
		router.push(`/${star.user_id}`);
	};

	useEffect(() => {
		fetchFavouritesList(favouritesList)(0, true);
		return () => {
			// props.favouritesListResetLoaded();
		};
	}, []);


	return (
		<FavouriteStyled>
			<BackHeader
				backHandler={goBack}
				label={t('common.menu')}
				heading={t('fan_manage.links.following')}
				headerCls="header-label"
				noHelp
			/>
			<section className="favorite-listing">
				<FavoritesListing
					customLoader
					dataList={favouritesList?.data || []}
					noDataText={t('common.no_favorited_stars')}
					loading={isLoading}
					offset={favouritesList?.offset}
					fetchData={(offset, refresh) =>
						fetchFavouritesList(favouritesList)(0, true)
					}
					totalCount={favouritesList?.count}
					limit={favouritesList?.limit}
					onCloseClick={onUnFavoriteStar}
					onStarPurchase={onStarPurchase}
				/>
			</section>
		</FavouriteStyled>
	);
};

FavoriteStars.propTypes = {
	history: PropTypes.object.isRequired,
	fetchFavouritesList: PropTypes.func.isRequired,
	favouritesList: PropTypes.object.isRequired,
	favoriteStar: PropTypes.func.isRequired,
	fetchStarDetails: PropTypes.func.isRequired,
	favouritesListResetLoaded: PropTypes.func.isRequired,
};

export default FavoriteStars;
