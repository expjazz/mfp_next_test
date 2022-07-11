import React from 'react';
import { useTranslation} from 'react-i18next';
import Button from 'components/SecondaryButton';
import { BannerBg, Container, ContentWrapper } from './styled';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';
import { toggleLogin, useGeneral } from 'src/context/general';
import { setSignupFlow } from 'src/context/session';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const Banner = (props) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useFetchLoggedUser()
  const dispatch = useGeneral()[1]
  const { data: entityData } = useGetPartner()
  const localSetSignupFlow = payload => setSignupFlow(dispatch, payload)
  const localToggleLogin = payload => toggleLogin(dispatch, payload)
  return (
    <div id="MwTX1ZDzXuUSn8giN86ltLRfOPbAQExH" className="widget widget-section">
      <BannerBg bannerBg='/images/signup_page/newimage.png'>
        <Container>
          <ContentWrapper isLoggedIn = {isLoggedIn && locStore.getItem('isStar')}>
            <p>{t('custom_home_layout.connect_with', {purchaserPlural:entityData?.partnerData?.purchaserPlural})}</p>
            <p>{t('custom_home_layout.create_joy')}</p>
            <p>{t('custom_home_layout.make_money')}</p>
            {
              !isLoggedIn &&
                <Button
                  onClick={() => {
                    localSetSignupFlow({ role: 'star' });
                    localToggleLogin(true)
                  }}
                  secondary
                  className='common-btn'
                >
                  {t('custom_home_layout.create_page', {storeNameSmall:entityData?.partnerData?.storeNameSmall})}
                </Button>
            }
          </ContentWrapper>

        </Container>
      </BannerBg>
    </div>
  );
}

// const mapStateToProps = state => ({
//   isLoggedIn: state.session.isLoggedIn,
// })

// const mapDispatchToProps = dispatch => ({
//   setSignupFlow: signupDetails => dispatch(setSignupFlow(signupDetails)),
//   toggleSignup: state => dispatch(toggleSignup(state)),
// })

export default Banner
