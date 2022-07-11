import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RequestCard from 'components/RequestCard';
import { requestTypesKeys } from 'src/constants/requestTypes';
// import { accountStatus } from 'src/constants/requestTypes/accountStatus';
// import { socialIcons } from '../utils';
import { Ul } from '../../styled';
import { PromoWrapper, SocialListWrap, SocialUl, IconWrap } from './styled';
import { useTranslation } from 'next-i18next';
import { isEmpty } from 'src/utils/dataStructures';
import { accountStatus } from 'src/constants/stars/accountStatus';
import { socialIcons } from '../utils';

function Interaction({ interaction, selected, starData, ...props }) {
  const [socialList, setSocialList] = useState([]);

  const updateSocialList = social => () => {
    const data = interaction.find(
      item => item.social_media === social.social_media,
    );
    if (data) {
      setSocialList(data);
    }
  };

  const renderSocialList = () => {
    return (
      <SocialListWrap>
        <span className="head">{t('purchase_flow.choose_channel')}</span>
        <SocialUl>
          {interaction.length > 0 &&
            interaction.map(social => {
              return (
                <IconWrap
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

  useEffect(() => {
    if (interaction.length > 0) {
      setSocialList(interaction[0]);
    }
  }, []);

  useEffect(() => {
    if (interaction.length > 0) {
      setSocialList(interaction[0]);
    }
  }, [interaction.length]);

  const { t } = useTranslation();
  return (
    <PromoWrapper>
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
                  type: requestTypesKeys.socialShoutout,
                  rType: 'Social Media Interactions',
                  promoDetails: starData.celbData.promocode,
                  discountObj: starData.celbData.discount,
                  image: social.image,
                  title: social.title,
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
                    starData.userData.talent_status === accountStatus.live ||
                    starData.userData.talent_status === accountStatus.hidden,
                }}
                onClick={props.socialClick(social)}
                updateToast={props.updateToast}
              />
            );
          })}
      </Ul>
    </PromoWrapper>
  );
}

Interaction.propTypes = {
  socialClick: PropTypes.func.isRequired,
  updateToast: PropTypes.func.isRequired,
  interaction: PropTypes.array,
  selected: PropTypes.object,
  starData: PropTypes.object.isRequired,
  fanData: PropTypes.object.isRequired,
};

Interaction.defaultProps = {
  interaction: [],
  selected: {},
};

export default Interaction;
