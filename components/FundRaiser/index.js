import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import FundProgress from 'components/FundProgress';
import moment from 'moment';
// import { getRedirectURL } from 'src/utils/domUtils';
// import { getLocalAmount } from 'utils/currencyUtils';
// import { numberToDecimalWithFractionTwo } from 'utils/dataformatter';
// import StarProfileStyled from '../../styled';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import { isEmpty } from 'src/utils/dataStructures';
import { getRedirectURL } from 'customHooks/domUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import StarProfileStyled from 'components/PageStyles/CelebrityId/styled';


const FundRaiser = () => {
  const { t } = useTranslation();
  const [getLocalSymbol, getLocalAmount]= useGetLocalAmount()
  const { data: userData } = useGetCelebrityData()
  const fundRaiser = userData?.celebrity_details?.fund_raiser
  const onCharityLinkClick = website => () => {
    if (website) {
      window.open(getRedirectURL(website), '_blank');
    }
  };

  if (isEmpty(fundRaiser)) {
    return null;
  }
  return (
    <StarProfileStyled.FundRaiser>
      <span className="charity-text">
        All proceeds until{' '}
        {moment(fundRaiser.end_date).format(
          'MMMM DD, YYYY',
        )}
        , go to{' '}
        <span
          className={
            fundRaiser.website && 'is-link'
          }
          onClick={onCharityLinkClick(
            fundRaiser.website,
          )}
          role="presentation"
        >
          {fundRaiser.charity}
        </span>
      </span>
      <article className="fund-wrap">
        <FundProgress
          classes={{
            root: 'fund-raiser',
            progress: 'progress',
          }}
          goal={fundRaiser.goal_amount}
          acheived={fundRaiser.achieved_amount}
        />
        <span className='goal-text'>
          {t('star_profile.goal_amount')}
          {getLocalSymbol()}
          {numberToDecimalWithFractionTwo(
            getLocalAmount(fundRaiser.goal_amount),
            false, false
          )}
        </span>
      </article>
    </StarProfileStyled.FundRaiser>
  )
}

FundRaiser.propTypes = {
  fundRaiser: PropTypes.object.isRequired,
}

// const mapStateToProps = state => ({
//   fundRaiser: state.starDetails.celebDetails.celebrityDetails.fund_raiser,
// })

export default FundRaiser
