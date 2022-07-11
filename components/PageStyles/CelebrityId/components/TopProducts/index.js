import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { useTranslation } from 'next-i18next';
// import RequestCard from 'components/RequestCard';
// import { purchaseUrl } from 'constants/url';
// import { accountStatus } from 'constants/requestTypes/accountStatus';
// import { updateToast } from 'store/shared/actions/commonActions';
// import { getStarTopProducts } from 'services/userManagement/starDetails';
import { formatTopProds, reqTypes } from './utils';
import { Wrap } from './styled';
// import { SmallHeading } from '../../styled';
import RequestCard from '../../../../RequestCard';
import { SmallHeading } from '../../../../PageStyles/CelebrityId/styled';
import { useTranslation } from 'next-i18next';
import { purchaseUrl } from '../../../../../src/constants/url';
import { accountStatus } from '../../../../../src/constants/stars/accountStatus';
import { useRouter } from 'next/router';
import { useGetCelebTopProducts } from 'customHooks/reactQueryHooks';

const TopProducts = props => {
  const router = useRouter()
  const { t } = useTranslation();
  // const [topProds, setTopProds] = useState([]);
  const { data: celebrityTopProducts } = useGetCelebTopProducts()
  const topProds = formatTopProds(celebrityTopProducts || [])

  // useEffect(() => {
  //   getStarTopProducts(props.userId).then(resp => {
  //     if (resp) {
  //       if (props.filterAmount)
  //         setTopProds(formatTopProds(resp).slice(0, props.filterAmount));
  //       else setTopProds(formatTopProds(resp));
  //     }
  //   });
  // }, [props.userId]);

  const onCardClick = product => () => {
    const baseUrl = `/${props.userId}${purchaseUrl[product.request_type]}`;
    if (product.slug) {
      router.push(`${baseUrl}/${product.slug}`);
    } else {
      router.push(baseUrl);
    }
  };

  return (
    <Wrap>
      <SmallHeading className="featured-heading">
        {t('star_profile.featuredExp')}
      </SmallHeading>
      <div className="star-products">
        {topProds?.length > 0 && (
          <React.Fragment>
            {topProds.map(prod => (
              <RequestCard
                key={prod.title}
                onClick={onCardClick(prod)}
                soldOut={
                  prod.limit ? prod.limit <= prod.sold + prod.in_progress : false
                }
                updateToast={props.updateToast}
                data={{
                  celbId: props.celebId,
                  title: prod.title,
                  type: prod.request_type,
                  subHead: !props.disabledSubHead ? t('common.featuredCap') : '',
                  rType: reqTypes[prod.request_type],
                  promoDetails: props.promoCode,
                  discountObj: props.discount,
                  image: prod.image,
                  webpImage: prod.webpImage,
                  amount: prod.rate,
                  isStar: props.isStar,
                  desc: prod.description,
                  productId: prod.id,
                  btnLabel:
                    prod.limit &&
                    prod.limit - (prod.sold + prod.in_progress) > 0 &&
                    prod.limit - (prod.sold + prod.in_progress) < 10
                      ? t('common.buy_now_left', {
                          count: prod.limit - (prod.sold + prod.in_progress),
                        })
                      : t('common.buy_now'),
                  availability:
                    props.userDetails.talent_status === accountStatus.live || props.userDetails.talent_status === accountStatus.hidden,
                  fanEmail: props.fanEmail,
                }}
              />
            ))}
          </React.Fragment>
        )}
      </div>
    </Wrap>
  );
};

// const mapStateToProps = state => ({
//   availability: state.starDetails.celebDetails.celebrityDetails.availability,
//   promoCode: state.starDetails.celebDetails.celebrityDetails.promocode,
//   discount: state.starDetails.celebDetails.celebrityDetails.discount,
//   celebId: state.starDetails.celebDetails.userDetails.id,
//   isStar: state.userDetails.settings_userDetails.isStar,
//   fanEmail: state.userDetails.settings_userDetails.email,
//   userDetails: state.starDetails.celebDetails.userDetails,
// });

// const mapDispatchToProps = dispatch => ({
//   updateToast: toastObj => dispatch(updateToast(toastObj)),
// });

export default TopProducts
