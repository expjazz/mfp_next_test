import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActorContainer,
  Container,
  Thumb,
  Overlay,
  Desc,
  ActorOverlay,
  ActorDetail,
} from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const DanielleSection = () => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  return (
    <ActorContainer>
      <div className="row">
        <Container>
          <Overlay>
            <Thumb width="165" height="165" src={'/images/danielle.jpg'} alt="" />
          </Overlay>
          <Desc>
            <p>
              {t('product.DanielleSection.text', {siteName:entityData?.partnerData?.siteName})}
            </p>
          </Desc>
          <ActorOverlay></ActorOverlay>
          <ActorDetail>
            <p>
              {t('product.DanielleSection.name')}
              <i>
                <span style={{ fontWeight: 'normal' }}>
                  , {t('product.DanielleSection.proffession')}
                </span>
              </i>
              <br />
            </p>
          </ActorDetail>
        </Container>
      </div>
    </ActorContainer>
  );
};

export default DanielleSection;
