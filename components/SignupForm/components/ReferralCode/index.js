import React, { useState } from 'react';
// import i18n from 'i18next';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import Input from 'components/TextInput';
// import { validatePromo } from 'services';
// import { generalLoader } from 'store/shared/actions/commonActions';
import SecondaryButton from 'components/SecondaryButton';
import ReferralCodeWrapper from './styled';
import { validatePromo } from 'src/services/myfanpark/celebActions';

export const ReferralCode = (props) => {
  const { t, ready } = useTranslation();
  const [value, updateValue] = useState(props.signupDetails.referral || props.referralValue);
  const [valid, setValid] = useState(!!props.signupDetails.referral);
  const [errMsg, setErrMsg] = useState('');

  const checkReferralCodeRequired = async () => {
    const priceEmpty = !value;
    if (priceEmpty) {
      const referralCodeMsg = t('common.fields.referralBlank');
      setErrMsg(referralCodeMsg);
      setValid(false);
      return false;
    }

    try {
      props.generalLoader(true);
      const promoResp = await validatePromo(value);
      if (promoResp.success) {
        setValid(true);
        props.generalLoader(false);
        setErrMsg('');
      }
      return promoResp.success;
    } catch (exception) {
      const referralCodeMsg = t('common.fields.enterReferral');
      setErrMsg(referralCodeMsg);
      props.generalLoader(false);
      setValid(false);
      return false;
    }
  };

  const onSubmitReferralCode = async () => {
    if (await checkReferralCodeRequired()) {
      props.submitReferral(value);
    }
  };

  return ready && (
    <ReferralCodeWrapper>
      <ReferralCodeWrapper.ComponentWrapper>
        <ReferralCodeWrapper.OptionWrapper>
            <ReferralCodeWrapper.HeaderText>
              {props.title}
            </ReferralCodeWrapper.HeaderText>
            <ReferralCodeWrapper.Description>{props.description}</ReferralCodeWrapper.Description>
            {props.error ?
            <ReferralCodeWrapper.Description error={props.error}>
              {props.error}
            </ReferralCodeWrapper.Description> : null }
            <ReferralCodeWrapper.WrapsInput>
            <Input
              type='text'
              name='referral'
              inputProps={{
                defaultProps: {
                  error: !!errMsg,
                  value,
                  classes: {
                    root: 'input-root',
                  },
                  onChange: event =>
                  updateValue(event.target.value)
                },
                labelObj: {
                  label: props.placeholder,
                  errorMsg: errMsg,
                },
              }}
            />
            {/* <TextInput
              error={!!props.error}
              placeholder={props.placeholder}
              type={props.type}
              name={props.name}
              value={props.value}
              onBlur={props.onBlur}
              onChange={props.onChange}
            /> */}
          </ReferralCodeWrapper.WrapsInput>
        </ReferralCodeWrapper.OptionWrapper>
        <ReferralCodeWrapper.ButtonWrapper className="align-center">
          <SecondaryButton
            id="referralCode"
            onClick={onSubmitReferralCode}>
            {props.primary_button}
          </SecondaryButton>
        </ReferralCodeWrapper.ButtonWrapper>
      </ReferralCodeWrapper.ComponentWrapper>
    </ReferralCodeWrapper>
  )
};

ReferralCode.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  referralValue: PropTypes.string,
  primary_button: PropTypes.string,
  generalLoader: PropTypes.func.isRequired,
  submitReferral: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};
ReferralCode.defaultProps = {
  error: '',
  referralValue: '',
  placeholder: 'common.referralCode',
  description: '',
  primary_button: 'common.continue',
  submitReferral: () => {},
  title: 'common.referralCode',
};

// const mapStateToProps = state => ({
//   signupDetails: state.signupDetails,
// });

// const mapProps = dispatch => ({
//   generalLoader: state => dispatch(generalLoader(state)),
// });

export default ReferralCode
