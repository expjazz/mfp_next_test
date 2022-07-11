import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Title,
  FanTitle,
  FanDesc,
  Image,
  ImageBox,
  SearchIcon,
  AdlerImage,
  AdlerBox,
  AdlerDesc,
  AdlerDetail,
  GrowthTitle,
  GrowthDesc,
  GrowthImg,
  RyanImg,
  RyanDesc,
  RyanBox,
  RyanDetail,
  EducationTitle,
  EducationDesc,
  EducationImg,
  Button,
} from './styled';
import { setSignupFlow } from 'src/context/session';
import { toggleSignup, useGeneral } from 'src/context/general';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Resources = (props) => {
  const { data: entityData } = useGetPartner()
  const dispatch = useGeneral([0])
  const { t } = useTranslation();
  return (
    <div>
      <Container>
        <Title>
          <p>{t('promotion_layout.resources.main_title')}</p>
        </Title>
      </Container>

      <Container className="fan-container">
        <div className="resource-image">
          <Image width="226" height="211" src={'/images/checkout.png'} alt="" />
          <ImageBox></ImageBox>
          <SearchIcon className="fa fa-search widget widget-icon"></SearchIcon>
        </div>
        <div className="resource-content">
          <FanTitle>
            <p>
              {t('promotion_layout.resources.relationship_management', {purchaserSingle:entityData?.partnerData?.purchaserSingle})}
              <br />
            </p>
          </FanTitle>
          <FanDesc>
            <p>
              {t('promotion_layout.resources.relationship_management_desc', {siteName:entityData?.partnerData?.siteName, purchaserPlural:entityData?.partnerData?.purchaserPlural, purchaserPlural:entityData?.partnerData?.purchaserPlural})}
            </p>
          </FanDesc>
        </div>

      </Container>

      <Container className="adler">
        <AdlerDetail>
          <p>
            {t('promotion_layout.resources.Max-Adler')}
            <br />
          </p>
          <p>
            {' '}
            <i>
              <span style={{ fontWeight: 'normal' }}>
                {t('promotion_layout.resources.Max-Adler-proffession')}
              </span>
            </i>
            <br />
          </p>
        </AdlerDetail>
        <div className="comment-box">
          <AdlerBox>
            <AdlerImage width="165" height="165" src={'/images/thumbnail_IMG_581497295454726.jpg'} alt="" />
          </AdlerBox>
          <AdlerDesc>
            <p>{t('promotion_layout.resources.Max-Adler-comments')}</p>
          </AdlerDesc>
        </div>
      </Container>

      <Container className="growth">
        <div className="growth-content">
          <GrowthTitle>
            <p>
              {t('promotion_layout.resources.growth_marketing')}
              <br />
            </p>
          </GrowthTitle>
          <GrowthDesc>
            <p>
              {t('promotion_layout.resources.growth_marketing_dec',{purchaserSingle:entityData?.partnerData?.purchaserSingle})}
            </p>
          </GrowthDesc>
        </div>
        <div className="growth-image">
          <GrowthImg width="293" height="211" src={'/images/Faninfo.png'} alt="" />
        </div>
      </Container>

      <Container className="ryan">
        <div className="ryan-content">
          <RyanDesc>
            <p>
              {t('promotion_layout.resources.Ryan-Carnes-comments', { siteName: entityData?.partnerData?.siteName })}
            </p>
          </RyanDesc>
          <RyanBox>
            <RyanImg width="165" height="165" src={'/images/ryancarnes.jpeg'} alt="" />
          </RyanBox>
        </div>

        <RyanDetail>
          <p>
            {t('promotion_layout.resources.Ryan-Carnes')}
            <br />
          </p>
          <p>
            {' '}
            <i>
              <span style={{ fontWeight: 'normal' }}>
                {t('promotion_layout.resources.Ryan-Carnes-proffession')}
              </span>
            </i>
            <br />
          </p>
        </RyanDetail>
      </Container>

      <Container className="education">
        <div className="education-image">
          <EducationImg width="321" height="247" src={'/images/Marketingtools.png'} alt="" />
        </div>
        <div className="education-content">
          <EducationTitle>
            <p>
              {t('promotion_layout.resources.education_guidance')}
              <br />
            </p>
          </EducationTitle>
          <EducationDesc>
            <p>
              {t('promotion_layout.resources.education_guidance_desc', {purchaserPlural:entityData?.partnerData?.purchaserPlural})}
            </p>
          </EducationDesc>
        </div>
      </Container>

      <Container className="btn">
        <Button
          onClick={() => {
            setSignupFlow(dispatch, { role: 'star' });
            toggleSignup(dispatch, true)
          }}
        >
          <div>{t('promotion_layout.resources.get_started_today')}</div>
        </Button>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
})

const mapDispatchToProps = dispatch => ({
  setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
  toggleSignup: state => dispatch(toggleSignup(state)),
})

export default Resources
