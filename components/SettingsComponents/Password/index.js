/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordRegex } from 'src/constants/regex/formRegex';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-regular-svg-icons';
import Input from 'components/TextInput';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import { Heading, Description } from 'styles/TextStyled';
import { Container } from '../styled';
import { FormContainer, Wrap } from './styled';
import { isEmpty } from 'src/utils/dataStructures';

const Password = props => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, updateFormData] = useState({
    password: '',
    confirmPasswd: '',
  });

  const [errorObject, updateErrorObj] = useState({
    passwordErr: false,
    confirmPasswdErr: false,
    formValid: false,
    passwordSame: false,
  });

  const showPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = value => {
    const regX = passwordRegex;
    if (regX.test(value)) {
      return true;
    }
    return false;
  };

  const validateFields = (event, errorState) => {
    const { value } = event.target;
    const state = errorState === 'passwordErr' ? 'confirmPasswd' : 'password';
    updateErrorObj({
      ...errorObject,
      [errorState]: !validatePassword(value),
      passwordSame: formData[state] !== value && !isEmpty(formData[state]),
    });
  };

  const inputChange = ({ state }) => event => {
    updateFormData({
      ...formData,
      [state]: event.target.value,
    });
  };

  const handleBlur = ({ errorState }) => event => {
    validateFields(event, errorState);
  };

  const saveChanges = () => {
    props.passwordUpdate({ new_password: formData.password });
  };

  const validateForm = () => {
    const formValid = [
      validatePassword(formData.password),
      validatePassword(formData.confirmPasswd),
      formData.password === formData.confirmPasswd,
    ].every(condition => condition);
    updateErrorObj({ ...errorObject, formValid });
  };

  useEffect(() => {
    validateForm();
  }, [
    errorObject.passwordErr,
    errorObject.confirmPasswdErr,
    errorObject.formValid,
    errorObject.passwordSame,
    formData.password,
    formData.confirmPasswd,
  ]);

  useEffect(() => {
    if (
      errorObject.passwordSame &&
      !errorObject.passwordErr &&
      !errorObject.confirmPasswdErr
    ) {
      props.updateToast({
        value: true,
        message: t('star_settings.password.mismatch_error'),
        variant: 'error',
        global: false,
      });
    }
  }, [
    errorObject.passwordSame,
    errorObject.passwordErr,
    errorObject.confirmPasswdErr,
  ]);

  const getInput = ({ label, state, value, error, errorState, isShow }) => {
    return (
      <section className="inputWrapper" key={`password-${state}`}>
        <Input
          inputProps={{
            defaultProps: {
              value,
              onChange: inputChange({ state, errorState }),
              onBlur: handleBlur({ state, errorState }),
              type: isShow && showPassword ? 'text' : 'password',
              error: (errorObject[errorState] && value !== '') || error,
            },
            labelObj: {
              label,
              errorMsg: errorObject[errorState]
                ? t('star_settings.password.enter_valid_password')
                : '',
            },
          }}
        />
        {isShow && (
          <FontAwesomeIcon
            icon={faEye}
            onClick={showPasswordClick}
            className="show-password"
          />
        )}
      </section>
    );
  };

  return (
    <Container className="set-wrap">
      <Wrap>
        <Heading className="inner-head">{props.webHead}</Heading>
        <FormContainer autoComplete="off">
          {getInput({
            label: props.labels.password,
            state: 'password',
            value: formData.password,
            error: errorObject.passwordErr || errorObject.passwordSame,
            errorState: 'passwordErr',
            isShow: props.showPasswd,
          })}

          {getInput({
            label: props.labels.confirmPasswd,
            state: 'confirmPasswd',
            value: formData.confirmPasswd,
            error: errorObject.confirmPasswdErr || errorObject.passwordSame,
            errorState: 'confirmPasswdErr',
          })}
        </FormContainer>
        <Description className="note">
          {t('star_settings.password.password_needs_to')}
          <ul>
            <li className="password-note">
              &nbsp;{t('star_settings.password.needs_letter')}
            </li>
            <li className="password-note">
              &nbsp;{t('star_settings.password.needs_number')}
            </li>
            <li className="password-note">
              &nbsp;{t('star_settings.password.needs_eight_char')}
            </li>
          </ul>
        </Description>
        <FlexCenter>
          <Button
            disabled={!errorObject.formValid}
            isDisabled={!errorObject.formValid}
            onClick={saveChanges}
          >
            {props.labels.buttonLbl}
          </Button>
        </FlexCenter>
      </Wrap>
    </Container>
  );
};

Password.propTypes = {
  passwordUpdate: PropTypes.func.isRequired,
  webHead: PropTypes.string,
  labels: PropTypes.object.isRequired,
  showPasswd: PropTypes.bool,
};
Password.defaultProps = {
  webHead: '',
  showPasswd: false,
};

export default Password;
