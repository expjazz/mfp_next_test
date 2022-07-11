import React from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
// import { isEmpty } from 'src/utils/dataStructures';
import { getDiscount, getDiscountedPrice } from 'src/utils/paymentUtils';
import { numberToDecimalWithFractionTwo } from 'src/utils/dataformatter';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { purchaseUrl } from 'src/constants/url';
import SecondaryButton from 'components/SecondaryButton';
// import { getLocalAmount } from 'utils/currencyUtils';
import { Wrap } from './styled';
import { CtaButton } from '../../styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useMediaQuery } from '@material-ui/core';
import { useGetCelebrityData } from 'customHooks/reactQueryHooks';
import Link from 'next/link';
import { useGetLocalAmount } from 'customHooks/currencyUtils';
import { getRateLimits } from 'src/constants/stars/celebrityId';
import { isCelebLocStorage } from 'src/utils/localStorageUtils';


const ReqCTA = ({
  setShowHow,
  ...props
}) => {
  const { t } = useTranslation();
  const [getLocalSymbol, getLocalAmount] = useGetLocalAmount()

  const isMobile = useMediaQuery('(max-width: 1279px)');
  const { data: celebrityData } = useGetCelebrityData()
  const isBookable = celebrityData?.isBookable && isCelebLocStorage()
  const celebDetails = celebrityData?.celebrity_details
  const userId = celebrityData?.user.user_id
  const {
    promocode: promoDetails,
    discount: discountObj,
    rate,
  } = celebDetails;
  const rateLimits = getRateLimits(celebDetails)
  const { personalised_video: shActive, direct_message: dmActive } =
    celebDetails.services || {};
  const shRate = rate;
  const dmRate = rateLimits[requestTypesKeys.message]
    ? rateLimits[requestTypesKeys.message].rate
    : 0;  let shDiscount = 0;
  let dmDiscount = 0;
  if (!isEmpty(discountObj)) {
    shDiscount = getDiscountedPrice('Video shoutouts', discountObj, rate);
    if (!shDiscount) {
      shDiscount = getDiscount(requestTypesKeys.shoutout, promoDetails, rate);
    }
  } else {
    shDiscount = getDiscount(requestTypesKeys.shoutout, promoDetails, rate);
  }
  if (!isEmpty(discountObj)) {
    dmDiscount = getDiscountedPrice('Direct Messages', discountObj, dmRate);
    if (!dmDiscount) {
      dmDiscount = getDiscount(requestTypesKeys.shoutout, promoDetails, dmRate);
    }
  } else {
    dmDiscount = getDiscount(requestTypesKeys.shoutout, promoDetails, dmRate);
  }

  if (!dmActive && !shActive) {
    return null;
  }

  const getTextKey = (mobKey, deskKey) => {
    if (!dmActive || !shActive || !isMobile) {
      return deskKey;
    }
    return mobKey;
  };

  const renderButton = (rateAmount, textKey, text, link, category) => {
    return (
      <Link
        href={link}
        passHref
      >

      <CtaButton
        disabled={!isBookable}
        {...props}
      >
        <SecondaryButton className="sec-btn" disabled={!isBookable}>
          <Trans
            i18nKey={textKey}
            values={{
              amount: numberToDecimalWithFractionTwo(rateAmount, false, false),
              currency: getLocalSymbol(),
            }}
          >
            {text}
            {numberToDecimalWithFractionTwo(rateAmount, false, false)}
          </Trans>
        </SecondaryButton>
      </CtaButton>
      </Link>
    );
  };

  return (
    <Wrap fullWidth={!dmActive || !shActive || !isMobile}>
      {shActive &&
        renderButton(
          getLocalAmount(shDiscount || shRate),
          getTextKey('star_profile.shoutoutCTAMob', 'star_profile.shoutoutCTA'),
          'Request a shoutout',
          `/${userId}${purchaseUrl[requestTypesKeys.shoutout]}`,
          'shoutout',
        )}
      {dmActive &&
        renderButton(
          getLocalAmount(dmDiscount || dmRate),
          getTextKey('star_profile.chatCTAMob', 'star_profile.chatCTA'),
          'Request a DM',
          `/${userId}${purchaseUrl[requestTypesKeys.message]}`,
          'dm',
        )}
      {isMobile && (
        <FontAwesomeIcon
          className="how-it-works"
          icon={faInfoCircle}
          onClick={() => setShowHow(true)}
        />
      )}
    </Wrap>
  );
};

// const mapStateToProps = state => ({
//   celebDetails: state.starDetails.celebDetails.celebrityDetails,
//   userDetails: state.userDetails.settings_userDetails,
//   userId: state.starDetails.celebDetails.userDetails.user_id,
//   currencyData: state.entity.currencyData,
// });

export default ReqCTA
