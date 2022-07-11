import { useGetPartner } from 'customHooks/reactQueryHooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StoreContainer, StoreHead, Container, SubParagraph } from './styled';

const Storefront = () => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  return (
    <StoreContainer>
      <Container>
        <StoreHead>
          <p>{t('custom_home_layout.personalized_content_title', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}</p>
        </StoreHead>
        <SubParagraph>
          {t('custom_home_layout.personalized_content_desc', {purchaserPlural:entityData?.partnerData?.purchaserPlural, storeNameSmall:entityData?.partnerData?.storeNameSmall})}
          </SubParagraph>
      </Container>
    </StoreContainer>
  );
};

export default Storefront;
