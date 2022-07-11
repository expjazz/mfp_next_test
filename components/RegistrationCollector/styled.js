import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import Dialog from '@material-ui/core/Dialog';

export const DialogStyled = styled(Dialog)`
  .body {
    ${media.mobileScreen} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 0;
      display: block;
    }
  }
  .paperScroll {
    max-width: 700px;
    background-color: transparent;
    overflow-y: inherit;
    ${media.mobileScreen} {
      max-height: 100%;
      background-color: ${props => props.theme.pureWhite};
      overflow-y: auto;
    }
  }
  .close {
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    top: auto;
    bottom: -24px;
    width: 24px;
    height: 24px;
    ${media.mobileScreen} {
      bottom: auto;
    }
    ::after,
    ::before {
      left: 11px;
      background-color: ${props => props.theme.pureWhite};
    }
  }
`;

export const ModalContainer = styled.div`
  min-height: auto;
  display: flex;
  flex-direction: column;
  color: ${props => props.theme.pureWhite};
`;
export const Top = styled.div`
  background-color: ${props => props.theme.orangePink};
  font-family: Gilroy-Bold;
  text-align: center;
  padding: 20px 40px;
  .offer {
    display: flex;
    justify-content: center;
    font-size: 81px;
    align-items: center;
    line-height: 75px;
    padding-top: 8px;
    .off {
      display: flex;
      flex-direction: column;
      line-height: 30px;
      .percent {
        font-size: 47px;
      }
      .off-text {
        font-size: 21px;
      }
    }
  }
  h1 {
    font-size: 37px;
    line-height: 41px;
    margin-bottom: 10px;
  }
  p {
    font-size: 17px;
  }
`;
export const Bottom = styled.div`
  background-color: ${props => props.theme.flatBlue};
  padding: 20px;
  position: relative;
  .notchedOutline {
    border: none !important;
  }
  .submit-btn {
    background-color: #000;
    border-radius: 0;
    border: none;
    min-height: 43px;
    ${media.mobileScreen} {
      width: 150px;
      margin-top: 10px;
    }
  }
  .input-field {
    background: ${props => props.theme.pureWhite};
  }
  .input-wrapper {
    display: flex;
    ${media.mobileScreen} {
      flex-direction: column;
      align-items: center;
    }
  }
  p {
    font-size: 12px;
    font-family: Gilroy;
    text-align: center;
    padding-top: 15px;
  }
`;
