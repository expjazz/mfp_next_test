/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Input from 'components/TextInput';
import { FlexCenter } from 'styles/CommonStyled';
import Button from 'components/SecondaryButton';
import PhoneNumber from 'components/PhoneNumber';
import Tooltip from 'components/ToolTip';
import { Heading } from 'styles/TextStyled';
import { FormContainer, InputLabel, PhoneWrap } from './styled';
import { Container, Wrapper } from '../styled';
import { isEmpty } from 'src/utils/dataStructures';
import useFetchLoggedUser from 'customHooks/sessionUtils/useFetchLoggedUser';

const AccountInfo = props => {
  const { data: userData } = useFetchLoggedUser()
  const { t } = useTranslation();
  const phoneRef = useRef(null);
  const [country, setCountry] = useState('US');
  const {
    mobile_country_code,
    mobile_number,
  } = userData?.user?.notification_settings;
  const [formData, updateFormData] = useState({
    firstName: userData?.user?.first_name,
    lastName: userData?.user?.last_name,
    email: userData?.user?.email,
    phoneNumber: mobile_number
      ? `+${mobile_country_code}${mobile_number}`
      : '3456',
  });
  const [errorObject, updateErrorObj] = useState({
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    formValid: false,
    phoneNumberErr: false,
  });
  const [emailErr, setEmailErr] = useState(false);

  const validateEmail = email => {
    const regX = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (regX.test(email)) {
      return false;
    }
    return true;
  };

  const validateFields = (state, event, errorState) => {
    let isValid = false;
    const { value } = event.target;
    if (state === 'email') {
      isValid = validateEmail(value);
      setEmailErr(isValid);
    }
    if (state === 'phoneNumber') {
      if (!isEmpty(value)) isValid = !isValidPhoneNumber(value);
    } else {
      isValid = isEmpty(value);
    }
    updateErrorObj({
      ...errorObject,
      [errorState]: isValid,
    });
  };

  const inputChange = ({ state }) => event => {
    updateFormData({
      ...formData,
      [state]: event.target.value,
    });
  };

  const handleBlur = ({ state, errorState }) => event => {
    validateFields(state, event, errorState);
  };

  const validateForm = () => {
    let phoneValid = true;
    if (!isEmpty(formData.phoneNumber)) {
      phoneValid = isValidPhoneNumber(formData.phoneNumber);
    }
    const formValid = [
      !isEmpty(formData.firstName),
      !isEmpty(formData.lastName),
      !validateEmail(formData.email),
      phoneValid,
    ].every(condition => condition);

    updateErrorObj({ ...errorObject, formValid });
  };

  const countryChange = value => {
    setCountry(value);
  };

  const numberChange = number => {
    updateFormData({
      ...formData,
      phoneNumber: number,
    });
  };

  const verifyPhone = (shouldVerify) => {
    const {
      mobile_country_code,
      mobile_number,
    } = userData?.user?.notification_settings;
    const oldMon = `+${mobile_country_code}${mobile_number}`;

    if ((!isEmpty(formData.phoneNumber) && formData.phoneNumber !== oldMon) || shouldVerify) {
      const codeNumber = phoneRef.current.props.metadata.countries[country][0];
      const phoneNumber = formData.phoneNumber.substring(
        codeNumber.length + 1,
        formData.phoneNumber.length,
      );
      props.generateOTP(phoneNumber, codeNumber, country);
    }
  }

  const saveChanges = () => {
    const isEqual = formData.firstName === userData?.user?.first_name &&
      formData.lastName === userData?.user?.last_name &&
      formData.email.trim() === userData?.user?.email.trim()
    if (
      !isEqual
    ) {
      props.handleAccountSave({
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim(),
      });
    }

    verifyPhone();

  };

  const tooltipWrapper = (text, isTooltip, fun) => {
    if (isTooltip) {
      return <Tooltip title={text}>{fun()}</Tooltip>;
    }
    return fun();
  };

  useEffect(() => {
    validateForm();
  }, [
    errorObject.firstNameErr,
    errorObject.lastNameErr,
    errorObject.emailErr,
    errorObject.formValid,
    errorObject.phoneNumberErr,
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phoneNumber,
  ]);

  useEffect(() => {
    const {
      mobile_country_code,
      mobile_number,
    } = userData?.user?.notification_settings;
    updateFormData({
      ...formData,
      phoneNumber: !isEmpty(mobile_number)
        ? `+${mobile_country_code}${mobile_number}`
        : '9876',
    });
  }, [
    userData?.user?.notification_settings.mobile_country_code,
    userData?.user?.notification_settings.mobile_number,
  ]);

  const getTextInput = ({
    label,
    state,
    value,
    errorMsg,
    error,
    errorState,
    nativeProps,
    wrapperClass,
  }) => {
    return (
      <section
        className={`inputWrapper ${wrapperClass}`}
        key={`accountinfo-${state}`}
      >
        <Input
          inputProps={{
            nativeProps,
            defaultProps: {
              value,
              onChange: inputChange({ state, errorState }),
              onBlur: handleBlur({ state, errorState }),
              error,
            },
            labelObj: {
              label,
              errorMsg,
            },
          }}
        />
      </section>
    );
  };

  const getTooltipInput = () => {
    return getTextInput({
      label: props.labels.emailHead,
      state: 'email',
      value: formData.email,
      error: emailErr,
      errorState: 'emailErr',
      errorMsg: t('star_settings.accountInfo.email_error'),
      wrapperClass: 'email-wrapper',
    });
  };
  return (
    <Container className="set-wrap">
      <Wrapper>
        <Heading
          className="inner-head"
          data-web={props.webHead}
          data-mob={props.mobHead}
        ></Heading>
        <FormContainer>
          <InputLabel
            error={errorObject.firstNameErr || errorObject.lastNameErr}
          >
            {errorObject.firstNameErr ||
              (errorObject.lastNameErr && props.labels.nmError)}
          </InputLabel>

          {getTextInput({
            label: props.labels.firstNameLbl,
            state: 'firstName',
            value: formData.firstName,
            error: errorObject.firstNameErr,
            errorMsg: t('star_settings.accountInfo.firstname_error'),
            errorState: 'firstNameErr',
            nativeProps: {},
            wrapperClass: 'custom-wrap',
          })}

          {getTextInput({
            label: props.labels.lastNameLbl,
            state: 'lastName',
            value: formData.lastName,
            error: errorObject.lastNameErr,
            errorMsg: t('star_settings.accountInfo.lastname_error'),
            errorState: 'lastNameErr',
            nativeProps: {},
            wrapperClass: 'lsnm-wrp',
          })}

          {tooltipWrapper(
            props.tooltip.emailTooltipText,
            props.tooltip.emailTooltip,
            getTooltipInput,
          )}

          {props.allowPhone && (
            <PhoneWrap
              error={errorObject.phoneNumberErr}
              valid={!isEmpty(formData.phoneNumber)}
            >
              <PhoneNumber
                numProps={{
                  phoneRef,
                  label:
                    errorObject.phoneNumberErr && !isEmpty(formData.phoneNumber)
                      ? props.labels.phError
                      : props.labels.phoneLabel,
                  placeholder: '',
                  value: formData.phoneNumber,
                  countryChange,
                  onChange: numberChange,
                  notValid:
                    errorObject.phoneNumberErr &&
                    !isEmpty(formData.phoneNumber),
                  onBlur: handleBlur({
                    state: 'phoneNumber',
                    errorState: 'phoneNumberErr',
                  }),
                  country,
                }}
                renderCTA={() => !userData?.user?.notification_settings.mobile_verified && (
                  !errorObject.phoneNumberErr || isEmpty(formData.phoneNumber)
                ) ? (
                  <Button type="button" className='verify-cta' onClick={() => verifyPhone(true)}>
                    {t('common.verify')}
                  </Button>
                ) : null}
              ></PhoneNumber>
            </PhoneWrap>
          )}
        </FormContainer>
        <FlexCenter>
          <Button
            className="save-btn fan-save-btn"
            disabled={!errorObject.formValid}
            isDisabled={!errorObject.formValid}
            onClick={saveChanges}
          >
            {props.labels.buttonLbl}
          </Button>
        </FlexCenter>
      </Wrapper>
    </Container>
  );
};

AccountInfo.propTypes = {
  userDetails: PropTypes.object.isRequired,
  handleAccountSave: PropTypes.func.isRequired,
  webHead: PropTypes.string,
  mobHead: PropTypes.string,
  labels: PropTypes.object.isRequired,
  tooltip: PropTypes.object,
  allowPhone: PropTypes.bool,
  generateOTP: PropTypes.func.isRequired,
};

AccountInfo.defaultProps = {
  webHead: '',
  mobHead: '',
  tooltip: {},
  allowPhone: false,
};

export default AccountInfo;
