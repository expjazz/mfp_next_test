import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'next-i18next';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Input from 'components/TextInput';
import { FlexCenter } from 'styles/CommonStyled';
import { passwordRegex } from 'src/constants/regex/formRegex';
import Button from 'components/SecondaryButton';
import PhoneNumber from 'components/PhoneNumber';
import { validateEmail } from 'src/utils/dataformatter';
import { LinkText, Description } from 'styles/TextStyled';
import { Layout } from './styled';
import { isEmpty } from 'src/utils/dataStructures';

function FanSignup(props) {
  const { t } = useTranslation();
  const phoneRef = useRef(null);
  const [phoneCountry, setPhoneCountry] = useState(
    props.entityData.country_code || 'US',
  );
  const [formData, updateFormData] = useState(
    props.socialSignup && props.socialData
      ? { ...props.socialData, email: props.socialData.userName }
      : {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          conPasswd: '',
          phNo: '',
        },
  );

  const [formError, setFormError] = useState(false);

  const numberChange = number => {
    updateFormData({
      ...formData,
      phNo: number,
    });
  };

  const countryChange = value => {
    setPhoneCountry(value);
  };

  const validatePassword = value => {
    const regX = passwordRegex;
    if (!isEmpty(value)) {
      if (regX.test(value)) {
        return true;
      }
      return false;
    }
    return true;
  };

  const inputChange = ({ state }) => event => {
    updateFormData({
      ...formData,
      [state]: event.target.value,
    });
  };

  const validateForm = () => {
    const {
      firstName = {},
      lastName = {},
      email = {},
      phone = {},
      password = {},
    } = props.fields;
    const firstNameValid = !firstName.required || !isEmpty(formData.firstName);
    const lastNamevalid = !lastName.required || !isEmpty(formData.lastName);
    const emailValid = !email.required || !validateEmail(formData.email);
    const phoneValid = !phone.required || isValidPhoneNumber(formData.phNo);
    if (firstNameValid && lastNamevalid && emailValid && phoneValid) {
      if (!props.socialSignup && password.required) {
        if (
          validatePassword(formData.password) &&
          validatePassword(formData.conPasswd) &&
          formData.password === formData.conPasswd &&
          isValidPhoneNumber(formData.phNo)
        ) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  };

  const triggerSave = () => {
    if (validateForm()) {
      const codeNumber =
        phoneRef.current.props.metadata.countries[phoneCountry][0];
      const phoneNumber = formData.phNo
        ? formData.phNo.substring(codeNumber.length + 1, formData.phNo.length)
        : '';
      props.signupHandler({
        ...formData,
        phNo: phoneNumber,
        phCode: codeNumber,
      });
    } else {
      setFormError(true);
    }
  };

  const getErrorState = (value, state) => {
    if (state === 'email' && props.fields.email.required) {
      return validateEmail(value);
    } else if (state === 'phNo' && props.fields.phone.required) {
      return !isValidPhoneNumber(value) && t('common.phError');
    } else if (
      (state === 'firstName' && props.fields.firstName.required) ||
      (state === 'lastName' && props.fields.lastName.required)
    ) {
      return value === '';
    }
    return false;
  };

  useEffect(() => {
    updateFormData(
      props.socialSignup && props.socialData
        ? { ...props.socialData, email: props.socialData.userName }
        : {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            conPasswd: '',
            phCode: props.entityData.country_code || 'US',
            phNo: '',
          },
    );
  }, [props.socialSignup, props.socialData.userName]);

  // eslint-disable-next-line react/prop-types
  const getInput = ({ label, state, value, errorState, error, type }) => {
    return (
      <section className="inputWrapper">
        <Input
          inputProps={{
            defaultProps: {
              value,
              onChange: inputChange({ state, errorState }),
              type,
              error: formError && getErrorState(value, state),
            },
            labelObj: {
              label,
              errorMsg: value ? error : '',
            },
          }}
        />
      </section>
    );
  };

  return (
    <Layout className="signup-container">
      <div className="sidewise">
        {props.fields.firstName &&
          getInput({
            label: t('common.fields.firstName'),
            state: 'firstName',
            value: formData.firstName,
            type: 'text',
          })}
        {props.fields.lastName &&
          getInput({
            label: t('common.fields.lastName'),
            state: 'lastName',
            value: formData.lastName,
            type: 'text',
          })}
      </div>

      {props.fields.email &&
        getInput({
          label: t('common.emailHead'),
          state: 'email',
          value: formData.email,
          errorState: 'emailErr',
          type: 'text',
          error: t('common.emailError'),
        })}

      <React.Fragment>
        {props.fields.phone.heading && (
          <span className="phn-head">{props.fields.phone.heading}</span>
        )}
        {props.fields.phone && (
          <PhoneNumber
            numProps={{
              phoneRef,
              label: props.fields.phone.required
                ? t('common.phoneLabel')
                : t('common.fanSignup.optionalPhone'),
              value: formData.phNo,
              countryChange,
              onChange: numberChange,
              country: phoneCountry || 'US',
              notValid: formError && getErrorState(formData.phNo, 'phNo'),
            }}
          />
        )}
      </React.Fragment>

      {!props.socialSignup && props.fields.password && (
        <React.Fragment>
          <div className="sidewise">
            {getInput({
              label: t('common.password'),
              state: 'password',
              value: formData.password,
              type: 'password',
              errorState: 'passwdErr',
              error: t('common.passwordValid.invalidShort'),
            })}
            {getInput({
              label: t('common.confirmPasswd'),
              state: 'conPasswd',
              value: formData.conPasswd,
              type: 'password',
              errorState: 'conPasswdErr',
              error: t('common.passwordValid.invalidShort'),
            })}
          </div>
          <Description className="note">
            <Trans i18nKey="common.fanSignup.description">
              Passwords require at least one capital letter and number.
            </Trans>
          </Description>
        </React.Fragment>
      )}
      {props.showLogin && (
        <Description className="note">
          <Trans i18nKey="common.fanSignup.login_redirect">
            Already have an account,
            <LinkText onClick={props.handleLogin}>Login</LinkText>
          </Trans>
        </Description>
      )}

      <FlexCenter className="btn-wrapper">
        <Button onClick={triggerSave}>{t('common.next')}</Button>
      </FlexCenter>
    </Layout>
  );
}

FanSignup.propTypes = {
  signupHandler: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  socialSignup: PropTypes.bool,
  socialData: PropTypes.object,
  showLogin: PropTypes.bool,
  entityData: PropTypes.object,
  fields: PropTypes.object,
};

FanSignup.defaultProps = {
  socialSignup: false,
  socialData: {},
  showLogin: false,
  entityData: {},
  fields: {
    phone: { required: true },
    firstName: { required: true },
    email: { required: true },
    lastName: { required: true },
    password: { required: true },
  },
};

export default FanSignup
