import styled from '@emotion/styled';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Container = styled(Card)`
  width: 100%;
  height: 100%;
  border-radius: 0;
  background: ${props => props.theme.pureWhite};
  box-shadow: none !important;
  display: flex;
  justify-content: center;
  padding: 0 15px 35px 15px;

  ${media.modalView} {
    padding: 15px 50px 35px;
  }

  ${media.largeScreen} {
    background: ${props => props.theme.white};
    padding: 30px 50px 35px;
    height: auto;
    margin-top: 8px;
    max-width: 661px;
  }

  .inner-head {
    ${media.mobileScreen} {
      margin: 15px 0 0;
      font-size: 20px;
      padding-bottom: 3px;

      p {
        margin-top: 3px;
      }
    }
    &:before {
      content: attr(data-mob);
      ${media.webView} {
        content: attr(data-web);
      }
    }
  }
  .MuiFormControl .notchedOutline {
    background-color: ${props => props.theme.pureWhite};
  }
  .input-field {
    z-index: 10;
  }
`;

export const Wrapper = styled.section`
  width: 100%;
  .save-btn {
    margin-top: 10px;
  }
  .desc-info {
    text-align: left;
    padding-bottom: 10px;
    ${media.webView} {
      padding-bottom: 0;
      padding-top: 10px;
    }
  }
`;

export const Form = styled.form`
  padding-top: 10px;
  ${media.mobileScreen} {
    padding-top: 0;
  }
  .error-msg {
    font-size: 12px;
    color: #990000;
    font-family: Gilroy-Medium;
    margin-top: 5px;
    display: block;
  }
`;
