import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';

export const Layout = styled.div`
  .note {
    font-size: 14px;
    padding-top: 5px;
    text-align: left;
    line-height: 16px;
  }
  .btn-wrapper {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    button {
      margin-bottom: 10px;
    }
  }
  .sidewise {
    display: flex;
    justify-content: space-between;
    .inputWrapper {
      width: 48%;
    }
  }
  .inputWrapper {
    padding-top: 11px;
    ${media.smallScreen} {
      .float-label {
        font-size: 16px;
      }
      .input-label-shrink {
        font-size: 12px;
      }
    }
  }
  .error-msg {
    font-family: Gilroy;
    font-size: 14px;
    padding-top: 5px;
    display: block;
    color: ${props => props.theme.errorRed};
  }
  .ph-number-wrapper {
    margin-top: 10px;
    margin-bottom: 0;
  }
  .phn-head {
    font-size: 14px;
    line-height: 18px;
    font-family: Gilroy-Regular;
    display: block;
    color: #555555;
    padding-top: 10px;
  }
  .phn-head + .ph-number-wrapper {
    margin-top: 5px;
  }
`;
