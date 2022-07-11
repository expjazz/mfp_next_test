import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import {
  StarsContainer,
  Container,
  StarsHead,
  GridImages,
  RoundedThumbnail,
  ImageParagraph,
} from './styled';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Stars = () => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()
  return (
    <StarsContainer>
      <Container>
        <StarsHead>{t('custom_home_layout.other_stars', { talentPlural: entityData?.partnerData?.talentPlural, siteName: entityData?.partnerData?.siteName })}</StarsHead>
        <GridImages>
          <div className="single-img">
            <RoundedThumbnail
              width="126"
              height="126"
              src={'/images/signup_page/kawhileonard.jpg'}
              alt=""
            />
            <div>
              <ImageParagraph>
                {t('custom_home_layout.Kawhi_Leonard')}
              <br />
              </ImageParagraph>
            </div>
          </div>
          <div className="single-img">
            <RoundedThumbnail width="126" height="126" src={'/images/signup_page/tori.jpg'} alt="" />
            <div>
              <ImageParagraph>
                {t('custom_home_layout.Tori_Spelling')}
              <br />
              </ImageParagraph>
            </div>
          </div>
          <div className="single-img">
            <RoundedThumbnail width="126" height="126" src={'/images/signup_page/tboz.jpg'} alt="" />
            <div>
              <ImageParagraph>
                {t('custom_home_layout.T-Boz')}
              <br />
              </ImageParagraph>
            </div>
          </div>
          <div className="single-img">
            <RoundedThumbnail width="126" height="126" src={'/images/signup_page/AndyDick.jpg'} alt="" />
            <div>
              <ImageParagraph>
                {t('custom_home_layout.Andy_Dick')}
              <br />
              </ImageParagraph>
            </div>
          </div>
        </GridImages>
      </Container>
    </StarsContainer>
  );
};

export default Stars;
