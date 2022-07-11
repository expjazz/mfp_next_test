import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Container,
  Title,
  ContentWrapper,
  SubTitle,
  Image,
  TeamTitle,
} from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Experts = () => {
  const { data: entityData } = useGetPartner()
  const { t } = useTranslation();
  return (
    <div>
      <Container>
        <div className="content-wrapper">
          <div className="text-wrapper">
            <Title>
              <p>
                {t('product.work_with_experts.title', {siteName:entityData?.partnerData?.siteName})}
              <br />
              </p>
            </Title>

            <SubTitle>
              <p>
                {t('product.work_with_experts.desc', {siteName:entityData?.partnerData?.siteName})}
            </p>
            </SubTitle>
            <ContentWrapper>
              <p>
                <b>{t('product.work_with_experts.concierge', {siteName:entityData?.partnerData?.siteName})}</b>
              </p>
              <p>
                {t('product.work_with_experts.concierge_txt', {siteName:entityData?.partnerData?.siteName})}
              </p>
              <p>
                <br />
              </p>
              <p>
                <b>{t('product.work_with_experts.experienced_advisor')}</b>
              </p>
              <p>
                {t('product.work_with_experts.experienced_advisor_txt', {talentSingle:entityData?.partnerData?.talentSingle, storeNameSmall:entityData?.partnerData?.storeNameSmall, purchaserPlural:entityData?.partnerData?.purchaserPlural})} <br />
              </p>
              <p>
                <br />
              </p>
              <p>
                <b>{t('product.work_with_experts.for_free')}</b>
              </p>
              <p>
                {t('product.work_with_experts.for_free_txt', {talentSingle:entityData?.partnerData?.talentSingle})}
              <br />
              </p>
            </ContentWrapper>
          </div>
          <div className="image-wrapper">
            <Image width="125" height="125" src={'/images/Denise_Walsh_Head_Shot.jpg'} alt="" />
            <Image
              width="166"
              height="166"
              className="MMartin"
              src={'/images/MMartin.jpg'}
              alt=""
            />
            <Image width="125" height="125" className="dee" src={'/images/dee.jpg'} alt="" />
            <Image
              width="200"
              height="200"
              className="Mikaela.jpeg'"
              src={'/images/Mikaela.jpeg'}
              alt=""
            />
            <Image width="189" height="189" className="Gem" src={'/images/Gem.jpg'} alt="" />
            <TeamTitle>
              <i>
                {t('product.work_with_experts.your_team')}<span style={{ fontWeight: 'normal' }}></span>
              </i>
              <br />
            </TeamTitle>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Experts;
