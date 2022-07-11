import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { InputHeading } from 'styles/TextStyled';
import { Form } from '../styled';

export const FormContainer = styled(Form)`
  .labelHead {
    ${media.mobileScreen} {
      display: block;
      margin: 0 auto;
    }
  }
  .ph-number-wrapper {
    position: relative;
    .verify-cta {
      position: absolute;
      top: 6px;
      right: 8px;
      min-height: auto;
      min-width: auto;
      padding: 5px 10px;
    }
  }
  .react-phone-number-input {
    background-color: ${props => props.theme.pureWhite};
  }
  .email-wrapper {
    padding-top: 10px;
  }
  .lsnm-wrp {
    padding-top: 10px;
  }
  .notchedOutline {
    height: auto;
  }
`;

export const InputLabel = styled(InputHeading)`
  color: ${props => (props.error ? '#980100' : props.theme.greyishBrown)};
`;

export const PhoneWrap = styled.section`
  padding-top: 10px;
`;
