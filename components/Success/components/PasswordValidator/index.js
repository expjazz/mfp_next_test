import React, { useState, useEffect } from 'react';
import { passwordRegex } from 'src/constants/regex/formRegex';
// import { isEmpty } from 'src/utils/dataStructures';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/pro-regular-svg-icons';
import Input from 'components/TextInput';
// import { changePassword } from 'store/shared/actions/changePassword';
import { FlexCenter } from 'styles/CommonStyled';
// import { updateToast } from 'store/shared/actions/commonActions';
import Button from 'components/SecondaryButton';
import { Heading, Description } from 'styles/TextStyled';
import { FormContainer, Wrap } from './styled';
import { isEmpty } from 'src/utils/dataStructures';

const PasswordValidator = ({
  t,
  changePassword,
  onSuccess,
  updateToast

}) => {
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
    changePassword({ new_password: formData.password }, () => {
      onSuccess();
    });
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
      updateToast({
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

  const getPasswordError = () => {
    if (errorObject.passwordSame) {
      return t('common.passwordValid.notMatch')
    }
    return t('common.passwordValid.invalidShort');
  }

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
                ? getPasswordError()
                : '',
            },
          }}
        />
        {
          isShow &&
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={showPasswordClick}
              className="show-password"
            />
        }
      </section>
    );
  };

  return (
    <section className="set-wrap">
      <Wrap>
        <Heading className="inner-head">
          {t('purchase_flow.passwordHeading')}
        </Heading>
        <FormContainer autoComplete="off">
          {getInput({
            label: t('common.password'),
            state: 'password',
            value: formData.password,
            error: errorObject.passwordErr || errorObject.passwordSame,
            errorState: 'passwordErr',
            isShow: true,
          })}

          {getInput({
            label: t('common.confirmPasswd'),
            state: 'confirmPasswd',
            value: formData.confirmPasswd,
            error: errorObject.confirmPasswdErr || errorObject.passwordSame,
            errorState: 'confirmPasswdErr',
          })}
        </FormContainer>
        <Description className="note">
          {t('common.passwordValid.description')}
        </Description>
        <FlexCenter>
          <Button
            disabled={!errorObject.formValid}
            isDisabled={!errorObject.formValid}
            onClick={saveChanges}
          >
            {t('common.save')}
          </Button>
        </FlexCenter>
      </Wrap>
    </section>
  );
};

// const mapDispatchToProps = dispatch => ({
//   changePassword: (data, callBack) => {
//     dispatch(changePassword(data, callBack));
//   },
//   updateToast: toastObj => {
//     dispatch(updateToast({ ...toastObj }));
//   },
// })

export default PasswordValidator
