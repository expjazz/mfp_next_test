import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '../../../TextField';
import PrimaryButton from '../../../PrimaryButton';
import ReferralCodeWrapper from './styled';

export const ReferralCode = (props) =>(
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
            <TextInput
              error={!!props.error}
              placeholder={props.placeholder}
              type={props.type}
              name={props.name}
              value={props.value}
              onBlur={props.onBlur}
              onChange={props.onChange}
            />
          </ReferralCodeWrapper.WrapsInput>
        </ReferralCodeWrapper.OptionWrapper>
        <ReferralCodeWrapper.ButtonWrapper className="align-center">
          <PrimaryButton
            id="referralCode"
            onClick={props.onPrimaryButtonClick}>
            {props.primary_button}
          </PrimaryButton>
        </ReferralCodeWrapper.ButtonWrapper>
      </ReferralCodeWrapper.ComponentWrapper>
    </ReferralCodeWrapper>
  );

ReferralCode.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  primary_button: PropTypes.string,
  onPrimaryButtonClick: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
};
ReferralCode.defaultProps = {
  error: '',
  placeholder: 'common.what_is_referrel_code',
  description: '',
  type: 'text',
  name: 'referralCode',
  value: '',
  onBlur: () => { },
  onChange: () => { },
  primary_button: 'Continue',
  onPrimaryButtonClick: () => { },
  title: 'Referral code',
};
