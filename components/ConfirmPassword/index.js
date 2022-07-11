import React, { useState } from 'react';
import { useTranslation, Trans } from 'next-i18next';
import { Description } from 'styles/TextStyled';

import { TextInput } from '../TextField'
import  PrimaryButton from '../PrimaryButton'
import { CloseButton, FlexCenter } from '../../styles/CommonStyled';
import { Layout, Content, FormContainer } from './styled';
import { isEmpty } from 'src/utils/dataStructures';
import { useGetPartner } from 'customHooks/reactQueryHooks';

const ConfirmPassword = props => {
  const { t } = useTranslation();
  const { data: entityData } = useGetPartner()

  const [password, setPassword] = useState({
    value: '',
    isValid: false,
    message: '',
  })

  const [confirmPass, setConfirmPass] = useState({
    value: '',
    isValid: false,
    message: '',
  })

  const [passwordDetails, setPasswordDetails] = useState({
    password: { value: "", isValid: false, message: "" },
    confirmPassword: { value: "", isValid: false, message: "" },
    errorMsg: "",
    redirect: false
  });

  const handleFieldChange = (type) => (event) => {
    if (type === 'password') {
      setPassword({
        ...password,
        value: event.target.value,
      })
    } else {
      setConfirmPass({
        ...password,
        value: event.target.value,
      })
    }
  };

  const checkPassword = () => {
    const pattern = /^(?=.*?[0-9])(?=.*?[a-zA-Z]).{8,}$/; // Accepts values with min 8 characters, at least one number and at least one letter
    if (isEmpty(password.value)) {
      setPassword({
        ...password,
        message: t('common.passwordValid.empty'),
      });
      return false;
    }
    if (!pattern.test(password.value)) {
      setPassword({
        ...password,
          message: t('common.passwordValid.invalid')
      });
      return false;
    }
    setPassword({
      ...password,
      message: "",
      isValid: true,
    });
    if (confirmPass.value) {
      checkConfirmPassword();
    }
    return true;
  };

  const checkConfirmPassword = () => {
    if (
      password.value !== "" &&
      password.value === confirmPass.value
    ) {
      setConfirmPass({
        ...confirmPass,
          message: "",
          isValid: true,
      });
    } else {
      setConfirmPass({
        ...confirmPass,
          message: t('common.passwordValid.notMatch'),
          isValid: false,
      });
    }
  };

  const submitPassword = (e) => {
    e.preventDefault();
    if (checkPassword()) {
      checkConfirmPassword();
      if (password.isValid && confirmPass.isValid) {
        props.onResetPassword(password.value)
      } else {
        checkPassword();
      }
    }
  };

  return(
    <Layout>
      {/* <CloseButton className="close" /> */}
      <Content>
        <h1 className="firstTitle">{props.title1}</h1>
        {props.title2 && <h1 className="orderSuccess">{props.title2}</h1>}
        <FlexCenter className="alignPassword">
          <Description className="note">
            {t('common.passwordValid.description')}
          </Description>
          <FormContainer autoComplete="off">
            <Content.WrapsInput>
              <TextInput
                label={props.input_txt_1}
                type="password"
                name="password"
                value={password.value}
                fullWidth= "true"
                error={password.message}
                onChange={handleFieldChange('password')}
                onBlur={checkPassword}
                InputProps={{
                  classes: {
                    error:'error-field',
                  },
                }}
                InputLabelProps={{
                  classes: {
                    shrink: 'input-label-shrink',
                    root: 'input-label',
                  }
                }}
              />
            </Content.WrapsInput>
            <Layout.ErrorMsg>
              {password.message }
            </Layout.ErrorMsg>
            <Content.WrapsInput>
              <TextInput
                label={props.input_txt_2}
                type="password"
                name="confirmPassword"
                fullWidth= "true"
                error={confirmPass.message}
                value={confirmPass.value}
                onChange={handleFieldChange('confirmPassword')}

                onBlur={checkConfirmPassword}
                InputProps={{
                  classes: {
                    error:'error-field',
                  },
                }}
                InputLabelProps={{
                  classes: {
                    shrink: 'input-label-shrink',
                    root: 'input-label',
                  }
                }}
              />
            </Content.WrapsInput>
          </FormContainer>
          <Layout.ErrorMsg className="error-msg">
            {confirmPass.message}
          </Layout.ErrorMsg>
        </FlexCenter>
          <Content.Terms>
            <Trans
              i18nKey="common.passwordValid.terms"
              values={{
                siteName: entityData?.partnerData.partner_name,
                terms: t('common.about.termsHeading'),
                privacy: t('common.about.privacyHeading'),
              }}
            >
              By creating your password, you agree to {entityData?.partnerData.partner_name}’s <a className='link' href='/terms-service' target="_blank">{t('common.about.termsHeading')}</a> and <a className='link' href="/privacy-policy" target="_blank">{t('common.about.privacyHeading')}</a>.
            </Trans>
          </Content.Terms>
          <Layout.ButtonWrapper completeUserDetails={props.completeUserDetails} className="align-center">
            <PrimaryButton
              className="SubmitPhoneNoBtn"
              onClick={submitPassword}
            >
              {props.button_txt}
            </PrimaryButton>
          </Layout.ButtonWrapper>
        </Content>
      </Layout>
  );
}

export default ConfirmPassword;
