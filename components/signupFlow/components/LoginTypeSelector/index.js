import React, {useEffect} from 'react';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import BackHeader from 'components/BackHeader';
import TypeSelectorWrapper from './styled';
import { LOGIN_TYPE } from './constants';
import { useGetPartner } from 'customHooks/reactQueryHooks';
const entity = value => value
export const LoginTypeSelector = props => {
  const { data: entityData } = useGetPartner()

  const { t, ready } = useTranslation();
  useEffect(()=>{
    if (window.dataLayer) {
      window.dataLayer.push({'event': 'On Signup Modal'});
    }
  },[])
  return ready && (
    <TypeSelectorWrapper>
      <BackHeader
        rootClass='selector-header'
        closeHandler={props.onClose}
      />
      <TypeSelectorWrapper.ComponentWrapper>
        <TypeSelectorWrapper.OptionWrapper>
          <TypeSelectorWrapper.HeaderText>
            {LOGIN_TYPE(t, entityData?.partnerData).SIGN_UP_TEXT}
          </TypeSelectorWrapper.HeaderText>
          <TypeSelectorWrapper.Type onClick={() => props.changeSignUpRole('fan')}>
            <TypeSelectorWrapper.Image imageUrl="/images/fan.png"></TypeSelectorWrapper.Image>
            <TypeSelectorWrapper.Label>{LOGIN_TYPE(t, entityData?.partnerData).ROLE_FAN}</TypeSelectorWrapper.Label>
            <TypeSelectorWrapper.Description>{LOGIN_TYPE(t, entityData?.partnerData).FAN_DESCRIPTION}
            </TypeSelectorWrapper.Description>
          </TypeSelectorWrapper.Type>
          <TypeSelectorWrapper.StarText onClick={() => props.changeSignUpRole('star')}>
            {t(entityData?.partnerData?.entity_id !== 'SUPERSPORT-ZA-1' ? 'common.signupFlow.talentSignup' : 'common.signupFlow.talentSignupSportStars', {talent: entityData?.partnerData.talent_singular_name})}
          </TypeSelectorWrapper.StarText>
        </TypeSelectorWrapper.OptionWrapper>
      </TypeSelectorWrapper.ComponentWrapper>
    </TypeSelectorWrapper>
  );
};

LoginTypeSelector.propTypes = {
  changeSignUpRole: PropTypes.func,
  onClose: PropTypes.func,
};
LoginTypeSelector.defaultProps = {
  changeSignUpRole: () => {},
  onClose: () => {},
};
