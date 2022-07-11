import React from 'react';
import PropTypes from 'prop-types';
// import times from 'lodash/times';
import StarBlock from 'components/StarBlock';
import StarCard from '../StarCard';
import FavoriteListStyled from './styled';
import { useMediaQuery } from '@material-ui/core';
import { withScroll } from 'components/withScroll';
import { times } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import { useCurrencyData } from 'customHooks/currencyUtils';

const FavoritesListing = props => {
  const currencyData = useCurrencyData()
  const { data: entityData } = useGetPartner()
  const isDesktop = useMediaQuery('(min-width: 832px)');
  const renderLoader = () => {
    let loadingLength = 2;
    if (
      document.body.getBoundingClientRect().width >= 1280 ||
      window.innerWidth >= 1280
    ) {
      loadingLength = 5;
    } else if (
      document.body.getBoundingClientRect().width >= 375 ||
      window.innerWidth >= 375
    ) {
      loadingLength = 3;
    }
    const loadingArray = times(loadingLength, String);
    return loadingArray.map((loader, index) => (
      <FavoriteListStyled.Content key={index}>
        <FavoriteListStyled.LoadingIcon />
      </FavoriteListStyled.Content>
    ));
  };

  return (
    <FavoriteListStyled>
      {props.dataList.map(data => (
        <FavoriteListStyled.Content key={data.id}>
          {!isDesktop ? (
            <StarCard
              star={data}
              onCloseClick={props.onCloseClick}
              onPrimaryBtnClick={props.onStarPurchase}
            />
          ) : (
            <StarBlock
              star={data}
              professions={[]}
              entityData={entityData?.partnerData}
              type="star-card"
              currencyData={currencyData}
            />
          )}
        </FavoriteListStyled.Content>
      ))}
      {props.loading && renderLoader()}
    </FavoriteListStyled>
  );
};

FavoritesListing.defaultProps = {
  onCloseClick: () => {},
  onStarPurchase: () => {},
};

FavoritesListing.propTypes = {
  dataList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onCloseClick: PropTypes.func,
  onStarPurchase: PropTypes.func,
};

export default withScroll(FavoritesListing);
