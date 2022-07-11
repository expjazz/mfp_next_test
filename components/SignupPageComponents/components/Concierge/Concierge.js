import { useMedia } from 'customHooks/domUtils';
import { useGetPartner } from 'customHooks/reactQueryHooks';
import React from 'react';
import { useTranslation} from 'react-i18next';

import {
  ConciergeConatiner,
  KenziCircle,
  KendiDesc,
  Conatiner,
  MainBtn,
  MainP,
  ImgsContainer,
  BannerWrraper,
  KenziContainer,
  FirstImgCont,
  KenziP,
  PrimaryBtn,
} from './styled';

const Concierge = (props) => {
  const { t } = useTranslation();
  const isMobile = useMedia('(max-width: 767px)');
  const { data: entityData } = useGetPartner()
  return (
    <ConciergeConatiner>
      <Conatiner>
        <MainBtn
          href={`mailto: concierge@myfanpark.com?subject=${entityData?.partnerData?.storeNameCaps} registration`}
        >{t('custom_home_layout.connect_concierge')}</MainBtn>
        <div>
          <MainP>
            {t('custom_home_layout.concierge_desc', {siteName:entityData?.partnerData?.siteName, storeNameSmall:entityData?.partnerData?.storeNameSmall})}
            <span style={{ color: 'rgb(255, 132, 94)' }}></span>
          </MainP>
        </div>
        <BannerWrraper>
          <ImgsContainer>
            {
              !isMobile ?
                <FirstImgCont>
                  <img width="226" height="445" src={isMobile ? '/images/signup_page/McKenzie2.png' : '/images/signup_page/McKenzie3.png'} alt="" />
                  <KenziContainer>
                    <KenziCircle>
                      <div><img width="165" height="165" src={'/images/signup_page/MckenzieWestmore.jpg'} alt="" /></div>
                    </KenziCircle>
                    <KendiDesc>
                      <KenziP>
                        {t('custom_home_layout.mcKenzie_name')}
                        <i>
                          <span>{t('custom_home_layout.mcKenzie_proffession')}</span>
                        </i>
                      </KenziP>
                    </KendiDesc>
                  </KenziContainer>
                </FirstImgCont>
              : <img width="226" height="445" src={isMobile ? '/images/signup_page/McKenzie2.png' : '/images/signup_page/McKenzie3.png'} alt="" />
            }
            <img width="226" height="445" src={'/images/signup_page/McKenzie1.png'} alt="" />
            <img width="226" height="445" src={isMobile ? '/images/signup_page/McKenzie3.png' : '/images/signup_page/McKenzie2.png'} alt="" />
          </ImgsContainer>
          {
            isMobile &&
              <KenziContainer>
                <KenziCircle>
                  <div><img width="165" height="165" src={'/images/signup_page/MckenzieWestmore.jpg'} alt="" /></div>
                </KenziCircle>
                <KendiDesc>
                  <KenziP>
                   {t('custom_home_layout.mcKenzie_name')}
                    <i>
                      <span>{t('custom_home_layout.mcKenzie_proffession')}</span>
                    </i>
                    <br />
                  </KenziP>
                </KendiDesc>
                <PrimaryBtn to="/mwestmore" target='_blank' className="show-mob">{t('custom_home_layout.mcKenzie_page')}</PrimaryBtn>
              </KenziContainer>
          }
        </BannerWrraper>
        <PrimaryBtn to="/mwestmore" target='_blank' className="hide-mob">{t('custom_home_layout.mcKenzie_page')}</PrimaryBtn>
      </Conatiner>
    </ConciergeConatiner>
  );
}

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
// })

// const mapDispatchToProps = dispatch => ({
//   setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
//   toggleSignup: state => dispatch(toggleSignup(state)),
// })

export default Concierge
