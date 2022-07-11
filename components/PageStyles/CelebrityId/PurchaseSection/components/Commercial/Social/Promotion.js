import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'next-i18next';
// import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RequestCard from 'components/RequestCard';
// import { accountStatus } from 'src/constants/requestTypes/accountStatus';
import { requestTypesKeys } from 'src/constants/requestTypes';
import { socialIcons } from '../../utils';
// import { Ul, HeadingH1 } from '../styled';
import { PromoWrapper, SocialListWrap, SocialUl, IconWrap } from './styled';
import { useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { Ul, HeadingH1 } from '../../../styled';
import { accountStatus } from 'src/constants/stars/accountStatus';

function Promotion({ promotion, selected, starData, ...props }) {
  const { t } = useTranslation();
  const [socialList, setSocialList] = useState([]);

  const updateSocialList = social => () => {
    const data = promotion.find(
      item => item.social_media === social.social_media,
    );
    if (data) {
      setSocialList(data);
    }
  };

  useEffect(() => {
    if (promotion.length > 0) {
      setSocialList(promotion[0]);
    }
  }, []);

  useEffect(() => {
    if (promotion.length > 0) {
      setSocialList(promotion[0]);
    }
  }, [promotion.length]);

  const renderSocialList = () => {
    return (
      <SocialListWrap>
        <span className="head">{t('purchase_flow.choose_channel')}</span>
        <SocialUl>
          {promotion.length > 0 &&
            promotion.map(social => {
              return (
                <IconWrap
                  key={social.social_media}
                  className={
                    socialList.social_media === social.social_media
                      ? 'active'
                      : ''
                  }
                  onClick={updateSocialList(social)}
                >
                  <FontAwesomeIcon
                    icon={socialIcons(t)[social.social_media].icon}
                  />
                  <li key={social.social_media}>
                    {socialIcons(t)[social.social_media].title}
                  </li>
                </IconWrap>
              );
            })}
        </SocialUl>
      </SocialListWrap>
    );
  };

  return (
    <PromoWrapper>
      <HeadingH1>{t('purchase_flow.social_media')}</HeadingH1>
      {renderSocialList()}
      <Ul>
        {!isEmpty(socialList) &&
          socialList.details.map(social => {
            return (
              <RequestCard
                key={social.id}
                data={{
                  celbId: starData.userData.id,
                  isStar: props.fanData?.celebrity,
                  type: requestTypesKeys.promotion,
                  rType: 'Social Media Promotion',
                  promoDetails: starData.celbData.promocode,
                  discountObj: starData.celbData.discount,
                  title: social.title,
                  image: social.image,
                  desc: social.description,
                  amount: social.amount,
                  localDetails: {
                    amount: social.local_currency_amount,
                    name: social.local_currency,
                    symbol: social.local_currency_symbol,
                  },
                  btnLabel: t('purchase_flow.get_started'),
                  productId: social.id,
                  availability:
                    starData.userData.talent_status === accountStatus.live || starData.userData.talent_status === accountStatus.hidden,
                }}
                onClick={props.socialClick(social)}
                updateToast={props.updateToast}
              />
            );
          })}
      </Ul>
      {renderSocialList()}
    </PromoWrapper>
  );
}

Promotion.propTypes = {
  socialClick: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  promotion: PropTypes.array,
  selected: PropTypes.object,
  starData: PropTypes.object.isRequired,
  fanData: PropTypes.object.isRequired,
};

Promotion.defaultProps = {
  promotion: [],
  selected: {},
};

export default Promotion;
