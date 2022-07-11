import styled from '@emotion/styled';
import { CtaButton } from '../../styled';

export const Wrap = styled.section`
  width: 100%;
  display: flex;
  padding: 0 10px;
  position: relative;
  margin: 10px 0;
  justify-content: center;
  align-items: center;
  ${CtaButton} {
    &:first-child {
      ${props => props.fullWidth ? `
        flex: 1;
      `: `
        margin-right: 10px;
      `}
    }
  }
  .sec-btn {
    border-radius: 0;
    padding-top: 2px;
    text-transform: uppercase;
    font-family: Gilroy-Bold;
    cursor: pointer;
    font-size: 14px;
    ${props => !props.fullWidth ? `
      width: 150px;
    ` : `width: 100%`};
    text-align: center;
    color: ${props => props.theme.pureWhite};
    background: ${props =>
    props.theme.links ? props.theme.links : props.theme.flatBlue};
  }
  .how-it-works {
    ${props => !props.fullWidth && `
      position: absolute;
      left: calc(50% + 153px);
    `}
    margin-left: 9px;
    font-size: 20px;
    color: ${props => props.theme.greyishBrown};
    cursor: pointer;
  }
  @media(min-width: 1280px) {
    flex-direction: column;
    padding: 0;
    align-items: flex-end;
    .how-it-works {
      margin-right: auto;
    }
    ${CtaButton} {
      &:first-child {
        margin: 0;
        margin-bottom: 10px;
      }
    }
    .sec-btn {
      width: 246px;
    }
  }
`;
