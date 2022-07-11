import styled from '@emotion/styled';
import { Wrapper } from '../styled';

export const SwitchWrap = styled.section`
  margin-left: 32px;
  margin-top: 15px;
  .switch-child {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    .alert-switch {
      display: block;
      width: 67px;
      margin-right: 10px;
      .switch-input {
        &:not(:checked) + .slider {
          background-color: ${props => props.theme.veryLightPink};
          &:before {
            transform: translateX(102%);
          }
        }
      }
      .slider {
        width: 67px;
        background-color: ${props => props.theme.switchGreen};
        &:before {
          min-width: 26px;
          padding: 0;
          background-color: ${props => props.theme.pureWhite} !important;
        }
      }
    }
  }
`;

export const Wrap = styled(Wrapper)`
  .termsWrapper {
    display: flex;
    padding-bottom: 30px;
    &:last-child {
      padding-bottom: 0;
    }
  }
  .main-text {
    font-family: Gilroy-Bold;
  }
  .note {
    padding-bottom: 13px;
  }
  .save-button {
    margin-top: 20px;
  }
`;

export const Timezone = styled.div`
  padding-top: 20px;
  .title {
    font-family: Gilroy;
    font-size: 14px;
    padding-bottom: 5px;
    display: block;
  }
  .drop-custom-scroll {
    max-height: 230px !important;
  }
`;
