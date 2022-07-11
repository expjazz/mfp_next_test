import React, { useState, useRef } from 'react';
// import { isEmpty } from 'src/utils/dataStructures';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Heading, Description } from 'styles/TextStyled';
import Button from '../SecondaryButton';
import { TextInput } from '../TextField';
import { FlexCenter, BackArrow, CloseButton } from '../../styles/CommonStyled';
import { Layout, Content, FloatLabel } from './styled';
// import { generateOtp, validateOtp } from '../../services/otpGenerate';
import { isEmpty } from 'src/utils/dataStructures';

const GetPhoneNumber = props => {
  const { t } = useTranslation();
  const router = useRouter()
  const [phoneNoState, setPhoneNoState] = useState({
    countryCode: '',
    value: '',
    phoneNumberVerify: 'Verify',
    resentConfirmation: false,
    phoneNumberOriginal: '',
    otpEnterPopup: props.switched ? props.switched : false,
    otpErrorMessage: '',
    phNo1: '',
    phNo2: '',
    phNo3: '',
    phNo4: '',
  });
  const [errors, setErrors] = useState({
    phone: false,
  });
  const [country, setCountry] = useState('US');
  const phoneRef = useRef(null);
  const phNum1 = useRef(null);
  const phNum2 = useRef(null);
  const phNum3 = useRef(null);
  const phNum4 = useRef(null);
  const backArrowClick = () => {
    if (props.onBack) {
      props.onBack();
    } else if (phoneNoState.otpEnterPopup) {
      setPhoneNoState({
        ...phoneNoState,
        otpEnterPopup: false,
      });
      props.disableClose(false);
    } else {
      props.onBack(false);
    }
  };
  const closePhoneNum = () => {
    if (props.onClose) {
      props.onClose();
    } else if (phoneNoState.otpEnterPopup) {
      setPhoneNoState({
        ...phoneNoState,
        otpEnterPopup: false,
      });
      props.disableClose(false);
    } else {
      props.closePhoneNum(phoneNoState.otpEnterPopup);
    }
  };
  const checkAllValidity = () => {
    const { value } = phoneNoState;
    let phoneValid = true;
    if (!isValidPhoneNumber(value)) {
      phoneValid = false;
    }
    return phoneValid;
  };

  const countryChange = value1 => setCountry(value1);

  const submitNotification = type => {
    if (props.resendOtp) {
      props.resendOtp();
    } else {
      const codeNumber = phoneNoState.countryCode
        ? phoneNoState.countryCode
        : phoneRef.current.props.metadata.countries[country][0];
      const originalNumber = phoneNoState.value.substring(
        codeNumber.length + 1,
        phoneNoState.value.length,
      );
      if (type === 'reSent') {
        generateOtp(originalNumber, phoneNoState.countryCode).then(resp => {
          if (resp.success) {
            setPhoneNoState({
              ...phoneNoState,
              resentConfirmation: true,
            });
          }
        });
      } else if (
        checkAllValidity() &&
        phoneNoState.phoneNumberVerify === 'Verify'
      ) {
        generateOtp(originalNumber, codeNumber)
          .then(resp => {
            if (resp.success) {
              setPhoneNoState({
                ...phoneNoState,
                otpEnterPopup: true,
                resentConfirmation: false,
                phoneNumberOriginal: originalNumber,
                countryCode: codeNumber,
              });
              props.disableClose(true);
            }
          })
          .catch(error => {});
      } else if (phoneNoState.phoneNumberVerify === 'Verified') {
        props.onComplete();
      }
    }
  };

  const validateOnBlur = key => () => {
    const errors = {};
    const numericRegex = RegExp('/^[0-9]+$/');
    if (key === 'phNo1' || key === 'phNo2' || key === 'phNo3') {
      errors.phone =
        !numericRegex.test(phoneNoState.phNo1) ||
        !numericRegex.test(phoneNoState.phNo2) ||
        !numericRegex.test(phoneNoState.phNo3) ||
        phoneNoState.phNo1.length +
          phoneNoState.phNo2.length +
          phoneNoState.phNo3.length !==
          10;
    }
    setErrors(errors);
  };

  const handleFieldChange = (fieldType, fieldValue) => {
    if (fieldValue.length <= 1) {
      setPhoneNoState({
        ...phoneNoState,
        [fieldType]: fieldValue,
      });
      setErrors({ ...errors, [fieldType]: false });
      if (fieldType === 'phNo1' && fieldValue.length === 1) {
        phNum2.current.focus();
      } else if (fieldType === 'phNo2' && fieldValue.length === 1) {
        phNum3.current.focus();
      } else if (fieldType === 'phNo3' && fieldValue.length === 1) {
        phNum4.current.focus();
      }
    }
  };

  const validateFields = () => {
    let { phone } = errors;
    const numericRegex = RegExp('/^[0-9]+$/');
    if (
      numericRegex.test(phoneNoState.phNo1) ||
      numericRegex.test(phoneNoState.phNo2) ||
      numericRegex.test(phoneNoState.phNo3) ||
      numericRegex.test(phoneNoState.phNo4) ||
      phoneNoState.phNo1.length +
        phoneNoState.phNo2.length +
        phoneNoState.phNo3.length +
        phoneNoState.phNo4.length !==
        4
    ) {
      phone = true;
    } else {
      phone = false;
    }
    setPhoneNoState({
      ...phoneNoState,
    });
    setErrors({ ...phoneNoState.errors, phone });
    return !phone;
  };

  const submitOTPForm = () => {
    if (validateFields()) {
      const accountDetails = {
        phone: `${phoneNoState.phNo1}${phoneNoState.phNo2}${phoneNoState.phNo3}${phoneNoState.phNo4}`,
      };
      if (props.verifyOtp) {
        props.verifyOtp(accountDetails.phone);
      } else {
        validateOtp(
          phoneNoState.phoneNumberOriginal,
          phoneNoState.countryCode,
          accountDetails.phone,
        )
          .then(resp => {
            if (resp.success) {
              setPhoneNoState({
                ...phoneNoState,
                loading: false,
                phoneNumberVerify: 'Verified',
                otpEnterPopup: false,
                otpErrorMessage: '',
                phNo1: '',
                phNo2: '',
                phNo3: '',
                phNo4: '',
              });
              props.onComplete();
              props.disableClose(false);
            } else if (
              resp.status == '400' &&
              resp.response.data.error.code === 1006
            ) {
              setPhoneNoState({
                ...phoneNoState,
                otpErrorMessage: resp.response.data.error.message,
              });
            } else if (
              resp.status == '400' &&
              resp.response.data.error.code === 1009
            ) {
              setPhoneNoState({
                ...phoneNoState,
                otpErrorMessage:
                  resp.response.data.error.message.verification_code[0],
              });
            }
          })
          .catch(e => {
            props.updateToast({
              value: true,
              message: t('common.refresh_error'),
              variant: 'error',
            });
          });
      }
    } else {
      setPhoneNoState({
        ...phoneNoState,
        otpErrorMessage: t('common.enterCode'),
      });
    }
  };

  const phoneLast4digits = phoneNoState.phoneNumberOriginal.substring(
    phoneNoState.phoneNumberOriginal.length - 4,
  );

  const backHandler = (event, elm) => {
    if (event.keyCode === 8) {
      elm.current.focus();
    }
  };
  const maxLength = 1;
  return (
    <Layout>
      {
        !router.asPath.includes('thankyou') && (
          <>
            <BackArrow className="leftArrow" onClick={backArrowClick} />
            <CloseButton className="close" onClick={closePhoneNum} />
          </>
        )
      }
      {phoneNoState.otpEnterPopup ? (
        <Content>
          <Heading className="otpTitle">{props.otptitle}</Heading>
          <Description>
            {props.otp_sub_title}
            {!isEmpty(props.last4) ? props.last4 : phoneLast4digits}.
          </Description>
          <Content.OTPWrapper>
            <Content.WrapsInput>
              <TextInput
                type="number"
                name="phNo1"
                inputRef={phNum1}
                value={phoneNoState.phNo1}
                nativeProps={{
                  pattern: '[0-9]*',
                  inputmode:"numeric",
                  autoFocus: true,
                }}
                onChange={event => {
                  handleFieldChange('phNo1', event.target.value);
                }}
                onBlur={validateOnBlur('phNo1')}
                onKeyUp={event => backHandler(event, phNum1)}
              />
            </Content.WrapsInput>
            <Content.WrapsInput>
              <TextInput
                type="number"
                name="phNo2"
                inputRef={phNum2}
                value={phoneNoState.phNo2}
                nativeProps={{
                  pattern: '[0-9]*',
                  inputmode:"numeric"
                }}
                onChange={event => {
                  handleFieldChange('phNo2', event.target.value);
                }}
                onBlur={validateOnBlur('phNo2')}
                onKeyUp={event => backHandler(event, phNum1)}
              />
            </Content.WrapsInput>
            <Content.WrapsInput>
              <TextInput
                type="number"
                name="phNo3"
                inputRef={phNum3}
                value={phoneNoState.phNo3}
                nativeProps={{
                  pattern: '[0-9]*',
                  inputmode:"numeric"
                }}
                onChange={event => {
                  handleFieldChange('phNo3', event.target.value);
                }}
                onBlur={validateOnBlur('phNo3')}
                onKeyUp={event => backHandler(event, phNum2)}
              />
            </Content.WrapsInput>
            <Content.WrapsInput>
              <TextInput
                type="number"
                name="phNo4"
                inputRef={phNum4}
                value={phoneNoState.phNo4}
                nativeProps={{
                  pattern: '[0-9]*',
                  inputmode:"numeric"
                }}
                onChange={event => {
                  handleFieldChange('phNo4', event.target.value);
                }}
                onBlur={validateOnBlur('phNo4')}
                onKeyUp={event => backHandler(event, phNum3)}
              />
            </Content.WrapsInput>
          </Content.OTPWrapper>
          <Content.Error>
            {!isEmpty(props.error) ? props.error : phoneNoState.otpErrorMessage}
          </Content.Error>
          <Content.OtpSubTitleWrapper>
            <Description className="ques">{props.otp_receive_code}</Description>
            <Content.Resend onClick={() => submitNotification('reSent')}>
              {' '}
              &nbsp;{t('common.resent')}
            </Content.Resend>
          </Content.OtpSubTitleWrapper>
          <Layout.ButtonWrapper className="align-center">
            <Button
              className="SubmitPhoneNoBtn"
              onClick={() => submitOTPForm()}
            >
              {t('common.verify')}
            </Button>
          </Layout.ButtonWrapper>
        </Content>
      ) : (
        <React.Fragment>
          <FlexCenter>
            <Layout.Image imageUrl={props.image_url} />
          </FlexCenter>
          <Content>
            <h1 className="firstTitle">{props.title1}</h1>
            {props.title2 && <h1 className="orderSuccess">{props.title2}</h1>}
            <p className="note">{props.description}</p>
            <Layout.Phonenumber>
              <FloatLabel valid={!isEmpty(phoneNoState.value)}>
                <PhoneInput
                  id="for-phno"
                  country="US"
                  placeholder=""
                  ref={phoneRef}
                  value={phoneNoState.value}
                  onCountryChange={countryChange}
                  onChange={number =>
                    setPhoneNoState({
                      ...phoneNoState,
                      value: number,
                      phoneNumberVerify: 'Verify',
                    })
                  }
                />
                <label htmlFor="for-phno">{t('common.phoneLabel')}</label>
              </FloatLabel>
              <div className="errorElement">
                {phoneNoState.value !== '' &&
                phoneNoState.value !== undefined &&
                !isValidPhoneNumber(phoneNoState.value)
                  ? t('common.fields.invalidPhone')
                  : undefined}
                {phoneNoState.value === undefined && t('common.fields.reqPhone')}
              </div>
            </Layout.Phonenumber>
            <Layout.ButtonWrapper className="align-center">
              <Button className="SubmitPhoneNoBtn" onClick={submitNotification}>
                {t('common.continue')}
              </Button>
            </Layout.ButtonWrapper>
            <span
              className="skip"
              onClick={props.onComplete}
              role="presentation"
            >
              {t('common.skip')}
            </span>
          </Content>
        </React.Fragment>
      )}
    </Layout>
  );
};

GetPhoneNumber.propTypes = {};

export default GetPhoneNumber;
