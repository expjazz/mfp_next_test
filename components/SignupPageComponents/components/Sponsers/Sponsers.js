import React from 'react';
import { useTranslation } from 'react-i18next';
import { SponsersContainer, Container, H2, GridImages } from './styled';


const Sponsers = () => {
  const { t } = useTranslation();
  return (
    <SponsersContainer>
      <Container>
        <H2>{t('custom_home_layout.as_seen_on')}</H2>
        <GridImages>
          <img width="69" height="69" className="abc" src={'/images/signup_page/ABC_logo.png'} alt="" />
          <img width="127" height="40" className="cbs" src={'/images/signup_page/cbs.svg'} alt="" />
          <img width="128" height="44" className="oxygen" src={'/images/signup_page/oxygen.png'} alt="" />
          <img width="147" height="45" className="bar" src={'/images/signup_page/barstoolsports.png'} alt="" />
        </GridImages>
      </Container>
    </SponsersContainer>
  );
};

export default Sponsers;
